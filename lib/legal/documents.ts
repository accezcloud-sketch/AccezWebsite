/**
 * The legal documents Accez publishes, and where each version lives.
 *
 * Every document has one version per solution: /terms/property-managers/,
 * /terms/service-providers/, and the same for the Refund and Privacy policies.
 * The menus link to the bare URL (/terms/), a short "who are you?" page with
 * one card per audience that leads to that audience's version.
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
    perSolution: true,
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
    chooserSubtitle: 'Who are you?',
    read: 'Read the',
    versionFor: 'This version is for',
    otherVersion: 'Not you? Read the version',
    alsoApplies: 'Also applies to you',
  },
  ar: {
    chooserSubtitle: 'من أنت؟',
    read: 'اقرأ',
    versionFor: 'هذه النسخة',
    otherVersion: 'لست منهم؟ اقرأ النسخة',
    alsoApplies: 'تنطبق عليك أيضًا',
  },
} as const

export function legalChooserMetadata(key: LegalDocKey, locale: Locale): Metadata {
  const doc = legalDocument(key)
  return staticPageMetadata({ route: key, locale, title: doc.title[locale], description: doc.summary[locale] })
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
