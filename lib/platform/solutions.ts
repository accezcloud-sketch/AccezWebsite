/**
 * The solutions Accez offers, as data.
 *
 * Accez is one platform with several solutions (today: property management
 * and the service-provider marketplace). Everything that presents them reads
 * this list: the header menus, the homepage, the pricing pages, the legal
 * documents and the sign-in/sign-up links. Adding a solution means adding an
 * entry here (plus its pages); nothing else has to know how many there are.
 */
import { PORTAL_LOGIN, PORTAL_SIGN_UP, PROVIDER_LOGIN, PROVIDER_SIGN_UP } from '@/lib/links'

export interface Bilingual {
  en: string
  ar: string
}

export interface SolutionLink {
  label: Bilingual
  description: Bilingual
  /** Site route (localised by the caller) or an absolute URL. */
  href: string
}

export interface PlatformSolution {
  /** URL-safe id, also used in pricing and legal routes. */
  key: string
  /** The solution's name, e.g. "Property management". */
  name: Bilingual
  /** Who it is for, used as the menu label, e.g. "For property managers". */
  audience: Bilingual
  /** The person's role, e.g. "Property manager" (sign-in menu). */
  role: Bilingual
  /** What they do once signed in. */
  roleSummary: Bilingual
  /** One-sentence description. */
  summary: Bilingual
  /** The solution's main page. */
  href: string
  /** Its pricing page (route without locale). */
  pricingHref: string
  /** One line for the pricing menu, e.g. what the plans start at. */
  pricingNote: Bilingual
  signUpUrl: string
  loginUrl: string
  /** Which version of the legal documents applies (see components/legal/audience.ts). */
  legalAudience: 'pm' | 'sp'
  /** Deeper pages within the solution, for menus. */
  pages: SolutionLink[]
}

export const PLATFORM_SOLUTIONS: PlatformSolution[] = [
  {
    key: 'property-managers',
    name: { en: 'Property management', ar: 'إدارة العقارات' },
    audience: { en: 'For property managers', ar: 'لمديري العقارات' },
    role: { en: 'Property manager', ar: 'مدير العقارات' },
    roleSummary: { en: 'Manage properties, bookings and owners', ar: 'إدارة العقارات والحجوزات والملاك' },
    summary: {
      en: 'Reservations and channels, rent, work orders, owners and payouts, sales and hotels in one system.',
      ar: 'الحجوزات والقنوات والإيجارات وأوامر العمل والملاك والمدفوعات والمبيعات والفنادق في نظام واحد.',
    },
    href: '/modules',
    pricingHref: '/pricing/property-managers',
    pricingNote: { en: 'Plans for operators of every size', ar: 'خطط للمشغّلين بجميع الأحجام' },
    signUpUrl: PORTAL_SIGN_UP,
    loginUrl: PORTAL_LOGIN,
    legalAudience: 'pm',
    pages: [
      {
        label: { en: 'Owners & payouts', ar: 'الملاك والمدفوعات' },
        description: { en: 'Portal, ledger and Stripe payouts', ar: 'بوابة وسجل ومدفوعات' },
        href: '/owners',
      },
      {
        label: { en: 'Sales & projects', ar: 'المبيعات والمشاريع' },
        description: { en: 'Developer projects and pipeline', ar: 'مشاريع المطورين ومسار المبيعات' },
        href: '/sales',
      },
      {
        label: { en: 'Hotels & serviced apartments', ar: 'الفنادق والشقق المخدومة' },
        description: { en: 'Room types and channel manager', ar: 'أنواع الغرف ومدير القنوات' },
        href: '/hotels',
      },
      {
        label: { en: 'All modules', ar: 'كل الوحدات' },
        description: { en: 'Everything the platform runs', ar: 'كل ما تديره المنصة' },
        href: '/modules',
      },
    ],
  },
  {
    key: 'service-providers',
    name: { en: 'Service provider marketplace', ar: 'سوق مقدمي الخدمات' },
    audience: { en: 'For service providers', ar: 'لمقدمي الخدمات' },
    role: { en: 'Service provider', ar: 'مقدم الخدمة' },
    roleSummary: { en: 'Manage your listing and bookings', ar: 'إدارة صفحتك وحجوزاتك' },
    summary: {
      en: 'List your business on the Accez marketplace and get booked by residents, guests and property managers.',
      ar: 'أدرج نشاطك في سوق أكسيز واحصل على حجوزات من السكان والنزلاء ومديري العقارات.',
    },
    href: '/service-providers',
    pricingHref: '/pricing/service-providers',
    pricingNote: { en: 'Free to list, lower fees as you grow', ar: 'الإدراج مجاني، ورسوم أقل مع نموك' },
    signUpUrl: PROVIDER_SIGN_UP,
    loginUrl: PROVIDER_LOGIN,
    legalAudience: 'sp',
    pages: [
      {
        label: { en: 'List on the marketplace', ar: 'أدرج نشاطك في السوق' },
        description: { en: 'How providers get discovered and booked', ar: 'كيف يُكتشف مقدمو الخدمات ويُحجزون' },
        href: '/service-providers',
      },
    ],
  },
]

export function solutionByKey(key: string): PlatformSolution | undefined {
  return PLATFORM_SOLUTIONS.find((s) => s.key === key)
}

export const pick = (b: Bilingual, locale: 'en' | 'ar') => b[locale]
