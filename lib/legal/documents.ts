/**
 * The legal documents Accez publishes, and where each version lives.
 *
 * A per-solution document (Terms, Refund) has one URL per solution:
 * /terms/property-managers/, /terms/service-providers/. Its bare URL (/terms/)
 * is a short "which applies to you?" page, so every link published before the
 * split still lands somewhere sensible. A shared document (Privacy) has one URL.
 * /legal/ lists everything, grouped by who it is for.
 */
import type { Metadata } from 'next'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import type { Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS, type Bilingual, type PlatformSolution } from '@/lib/platform/solutions'

export type LegalDocKey = 'terms' | 'refund-policy' | 'privacy'

export interface LegalDocument {
  key: LegalDocKey
  title: Bilingual
  /** One line on what it covers, for the hub and the choosers. */
  summary: Bilingual
  /** One version per solution, or a single document for everyone. */
  perSolution: boolean
}

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    key: 'terms',
    title: { en: 'Terms of Service', ar: 'شروط الخدمة' },
    summary: {
      en: 'The agreement that governs your use of Accez: plans, fees, payments, payouts and liability.',
      ar: 'الاتفاقية التي تحكم استخدامك لأكسيز: الباقات والرسوم والمدفوعات والتحويلات والمسؤولية.',
    },
    perSolution: true,
  },
  {
    key: 'refund-policy',
    title: { en: 'Refund & Cancellation Policy', ar: 'سياسة الاسترداد والإلغاء' },
    summary: {
      en: 'How cancellations, refunds and chargebacks work, and who bears which fees.',
      ar: 'كيف تتم عمليات الإلغاء والاسترداد والاعتراض على المدفوعات، ومن يتحمل أي رسوم.',
    },
    perSolution: true,
  },
  {
    key: 'privacy',
    title: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    summary: {
      en: 'How we collect, use and protect personal data under the Saudi Personal Data Protection Law.',
      ar: 'كيف نجمع البيانات الشخصية ونستخدمها ونحميها وفق نظام حماية البيانات الشخصية السعودي.',
    },
    perSolution: false,
  },
]

export function legalDocument(key: LegalDocKey): LegalDocument {
  const doc = LEGAL_DOCUMENTS.find((d) => d.key === key)
  if (!doc) throw new Error(`Unknown legal document: ${key}`)
  return doc
}

/** Route (without locale) of a document, or of one solution's version of it. */
export function legalHref(key: LegalDocKey, solution?: PlatformSolution): string {
  return solution && legalDocument(key).perSolution ? `/${key}/${solution.key}` : `/${key}`
}

/** The documents that apply to one solution's users, in display order. */
export function legalDocumentsFor(solution: PlatformSolution): { doc: LegalDocument; href: string }[] {
  return LEGAL_DOCUMENTS.map((doc) => ({ doc, href: legalHref(doc.key, solution) }))
}

/** Every per-solution page that has to be generated, e.g. for the sitemap. */
export function legalVersionRoutes(): string[] {
  return LEGAL_DOCUMENTS.filter((d) => d.perSolution).flatMap((d) => PLATFORM_SOLUTIONS.map((s) => legalHref(d.key, s)))
}

export const LEGAL_COPY = {
  en: {
    hubTitle: 'Legal',
    hubSubtitle: 'Accez is one platform with two solutions. Each has its own Terms and Refund policy; the Privacy Policy covers everyone.',
    forEveryone: 'For everyone',
    chooserSubtitle: 'Accez is one platform with two solutions, and each has its own version. Choose the one you use.',
    read: 'Read',
    allDocuments: 'All legal documents',
    versionFor: 'This version is for',
    otherVersion: 'Not you? Read the version',
    alsoApplies: 'Also applies to you',
  },
  ar: {
    hubTitle: 'المستندات القانونية',
    hubSubtitle: 'أكسيز منصة واحدة بحلّين. لكل حل شروط خدمة وسياسة استرداد خاصة به، أما سياسة الخصوصية فتشمل الجميع.',
    forEveryone: 'للجميع',
    chooserSubtitle: 'أكسيز منصة واحدة بحلّين، ولكل منهما نسخته الخاصة. اختر الحل الذي تستخدمه.',
    read: 'اقرأ',
    allDocuments: 'كل المستندات القانونية',
    versionFor: 'هذه النسخة',
    otherVersion: 'لست منهم؟ اقرأ النسخة',
    alsoApplies: 'تنطبق عليك أيضًا',
  },
} as const

export function legalHubMetadata(locale: Locale): Metadata {
  const c = LEGAL_COPY[locale]
  return staticPageMetadata({ route: 'legal', locale, title: c.hubTitle, description: c.hubSubtitle })
}

export function legalChooserMetadata(key: LegalDocKey, locale: Locale): Metadata {
  const doc = legalDocument(key)
  return staticPageMetadata({ route: key, locale, title: doc.title[locale], description: `${doc.summary[locale]} ${LEGAL_COPY[locale].chooserSubtitle}` })
}

/** "Terms of Service for property managers" / "شروط الخدمة لمديري العقارات". */
export function legalVersionTitle(key: LegalDocKey, solution: PlatformSolution, locale: Locale): string {
  const audience = locale === 'ar' ? solution.audience.ar : solution.audience.en.replace(/^For /, 'for ')
  return `${legalDocument(key).title[locale]} ${audience}`
}

export function legalVersionMetadata(key: LegalDocKey, solution: PlatformSolution, locale: Locale): Metadata {
  return staticPageMetadata({
    route: legalHref(key, solution),
    locale,
    title: legalVersionTitle(key, solution, locale),
    description: `${legalDocument(key).summary[locale]} ${solution.name[locale]}.`,
  })
}
