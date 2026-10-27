/**
 * The solutions Accez offers, as data.
 *
 * Accez is one platform with several solutions (today: property management
 * and the service-provider marketplace). Everything that presents them reads
 * this list: the header menus, the homepage, the pricing pages, the legal
 * documents and the sign-in/sign-up links. Adding a solution means adding an
 * entry here (plus its pages, and its module and customer pages in
 * lib/platform/subpages.ts); nothing else has to know how many there are.
 */
import type { AudienceView } from '@/lib/legal/audience'
import { PORTAL_LOGIN, PORTAL_SIGN_UP, PROVIDER_LOGIN, PROVIDER_SIGN_UP } from '@/lib/links'

export interface Bilingual {
  en: string
  ar: string
}

export interface PlatformSolution {
  /** URL-safe id, also used in pricing and legal routes. */
  key: string
  /** The solution's name, e.g. "Property management solution". */
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
  /** That page's search title, without the " | Accez" suffix (title + suffix within 60 characters). */
  pageTitle: Bilingual
  /** That page's search description (about 140 to 155 characters). */
  pageDescription: Bilingual
  /** Its pricing page (route without locale). */
  pricingHref: string
  /** The pricing page's search description (about 140 to 155 characters). */
  pricingDescription: Bilingual
  /** One line for the pricing menu, e.g. what the plans start at. */
  pricingNote: Bilingual
  signUpUrl: string
  loginUrl: string
  /** The main action for this audience, e.g. book a demo or create an account. */
  primaryAction: { label: Bilingual; href: string; external?: boolean }
  /** Which version of the legal documents applies (see lib/legal/audience.ts). */
  legalAudience: AudienceView
}

export const PLATFORM_SOLUTIONS: PlatformSolution[] = [
  {
    key: 'property-managers',
    name: { en: 'Property management solution', ar: 'حل إدارة العقارات' },
    audience: { en: 'For property managers', ar: 'لمديري العقارات' },
    role: { en: 'Property manager', ar: 'مدير العقارات' },
    roleSummary: { en: 'Manage properties, bookings and owners', ar: 'إدارة العقارات والحجوزات والملاك' },
    summary: {
      en: 'Reservations and channels, leases and rent, work orders, owners and payouts, and sales in one system.',
      ar: 'الحجوزات والقنوات، والعقود والإيجارات، وأوامر العمل، والملاك والمدفوعات، والمبيعات في نظام واحد.',
    },
    href: '/solutions/property-managers',
    pageTitle: { en: 'Property management software for Saudi Arabia', ar: 'برنامج إدارة العقارات في السعودية' },
    pageDescription: {
      en: 'Property management software for Saudi Arabia: reservations synced with Airbnb, Booking.com and Expedia, leases, rent, work orders, sales and payouts.',
      ar: 'برنامج إدارة العقارات في السعودية: حجوزات متزامنة مع Airbnb وBooking.com وExpedia، وعقود الإيجار، والإيجارات، وأوامر العمل، والمبيعات، ومدفوعات الملاك.',
    },
    pricingHref: '/pricing/property-managers',
    pricingDescription: {
      en: 'Plans and prices for Accez property management: reservations, channels, leases, rent, work orders and owner payouts. Compare the plans and choose yours.',
      ar: 'باقات وأسعار أكسيز لإدارة العقارات: الحجوزات والقنوات وعقود الإيجار والإيجارات وأوامر العمل ومدفوعات الملاك. قارن الباقات واختر ما يناسبك.',
    },
    pricingNote: { en: 'From a free plan to Enterprise', ar: 'من الخطة المجانية إلى خطة المؤسسات' },
    signUpUrl: PORTAL_SIGN_UP,
    loginUrl: PORTAL_LOGIN,
    legalAudience: 'pm',
    primaryAction: { label: { en: 'Book a demo', ar: 'اطلب عرضًا توضيحيًا' }, href: '/#contact' },
  },
  {
    key: 'service-providers',
    name: { en: 'Service provider solution', ar: 'حل مقدمي الخدمات' },
    audience: { en: 'For service providers', ar: 'لمقدمي الخدمات' },
    role: { en: 'Service provider', ar: 'مقدم الخدمة' },
    roleSummary: { en: 'Manage your listing and bookings', ar: 'إدارة صفحتك وحجوزاتك' },
    summary: {
      en: 'List your business on the Accez marketplace, publish your services and prices, and take bookings from your own clients and new customers.',
      ar: 'أدرج نشاطك في سوق أكسيز، وانشر خدماتك وأسعارك، واستقبل الحجوزات من عملائك ومن عملاء جدد.',
    },
    href: '/solutions/service-providers',
    pageTitle: { en: 'Service provider booking software in Saudi Arabia', ar: 'برنامج حجز المواعيد لمقدمي الخدمات في السعودية' },
    pageDescription: {
      en: 'Take bookings, manage your team and customers, and list your business on the Accez marketplace. For barbers, salons, spas, coaches and appointment businesses.',
      ar: 'استقبل الحجوزات، وأدر فريقك وعملاءك، واعرض نشاطك في سوق أكسيز. للحلاقين والصالونات والسبا والمدربين وغيرهم من الأنشطة التي تعمل بالمواعيد.',
    },
    pricingHref: '/pricing/service-providers',
    pricingDescription: {
      en: 'Plans and prices for service providers on Accez: a free marketplace listing, bookings, team and customers, with a lower platform fee on higher plans.',
      ar: 'باقات وأسعار مقدمي الخدمات في أكسيز: إدراج مجاني في السوق، والحجوزات، والفريق والعملاء، مع رسوم منصة أقل في الباقات الأعلى.',
    },
    pricingNote: { en: 'Free to list, lower fees on higher plans', ar: 'الإدراج مجاني، ورسوم أقل في الخطط الأعلى' },
    signUpUrl: PROVIDER_SIGN_UP,
    loginUrl: PROVIDER_LOGIN,
    legalAudience: 'sp',
    primaryAction: { label: { en: 'Create a provider account', ar: 'أنشئ حساب مقدم خدمة' }, href: PROVIDER_SIGN_UP, external: true },
  },
]

export function solutionByKey(key: string): PlatformSolution | undefined {
  return PLATFORM_SOLUTIONS.find((s) => s.key === key)
}

/**
 * The solution a page belongs to, from its path (/solutions/<key>/,
 * /pricing/<key>/, /terms/<key>/ ... in either language), or undefined.
 */
export function solutionForPath(pathname: string): PlatformSolution | undefined {
  const segments = pathname.split('/').filter(Boolean)
  return PLATFORM_SOLUTIONS.find((s) => segments.includes(s.key))
}

export const pick = (b: Bilingual, locale: 'en' | 'ar') => b[locale]
