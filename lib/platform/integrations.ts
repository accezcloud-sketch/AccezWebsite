/**
 * The services Accez connects to. /integrations/ lists all of them by group;
 * the two groups with screens of their own (booking channels and payments)
 * each have one page at /integrations/<slug>/. Analytics and SMS are only a
 * connection on the integrations screen, so they are listed, not paged:
 * eight near-identical pages would repeat the same screens and text.
 * Only what is true today (owner-confirmed facts and the real integrations
 * screens), and text marks only, no third-party logos.
 */
import { RefreshCw, Layers, Tags, CalendarCheck, CreditCard, Plug, Receipt } from 'lucide-react'
import type { DetailPageData } from './detailPages'
import type { Bilingual } from './solutions'

export type IntegrationGroup = 'channels' | 'payments' | 'analytics' | 'messaging'

/** A page about one group of integrations. */
export interface Integration extends DetailPageData {
  group: IntegrationGroup
  /** Keys of the solutions it is available in (lib/platform/solutions.ts). */
  solutions: string[]
  /** Module pages of the property management solution that use it. */
  modules: string[]
}

/** One service on the /integrations/ list. */
export interface IntegrationService {
  name: Bilingual
  group: IntegrationGroup
  summary: Bilingual
  solutions: string[]
}

export const INTEGRATION_GROUPS: { key: IntegrationGroup; name: Bilingual }[] = [
  { key: 'channels', name: { en: 'Booking channels', ar: 'قنوات الحجز' } },
  { key: 'payments', name: { en: 'Payments', ar: 'المدفوعات' } },
  { key: 'analytics', name: { en: 'Analytics and marketing', ar: 'التحليلات والتسويق' } },
  { key: 'messaging', name: { en: 'Messaging', ar: 'الرسائل' } },
]

export const INTEGRATIONS_HREF = '/integrations'

/** The /integrations/ page itself. */
export const INTEGRATIONS_HUB = {
  name: { en: 'Integrations', ar: 'التكاملات' },
  metaTitle: { en: 'Integrations: booking channels, payments and SMS', ar: 'التكاملات: قنوات الحجز والمدفوعات والرسائل النصية' },
  metaDescription: {
    en: 'Accez integrations: Airbnb, Booking.com and Expedia for property managers, Stripe and Tap payments, Google Analytics, Meta Pixel and SMS through Twilio.',
    ar: 'تكاملات أكسيز: Airbnb وBooking.com وExpedia لمديري العقارات، ومدفوعات Stripe وTap، وGoogle Analytics وMeta Pixel، والرسائل النصية عبر Twilio في الحلين.',
  },
  hero: {
    title: { en: 'Integrations', ar: 'التكاملات' },
    accent: { en: 'that connect to Accez', ar: 'المتصلة بأكسيز' },
    subtitle: { en: 'Booking channels, payments, analytics and SMS, in the solution that uses them.', ar: 'قنوات الحجز والمدفوعات والتحليلات والرسائل النصية، في الحل الذي يستخدمها.' },
  },
  shot: { shot: 'pmIntegrations' as const, title: { en: 'The integrations page', ar: 'صفحة التكاملات' }, text: { en: 'Connect each service from your Accez account.', ar: 'اربط كل خدمة من حسابك في أكسيز.' } },
}

const PM = ['property-managers']
const BOTH = ['property-managers', 'service-providers']

/** Every service, in the order the /integrations/ page lists them. */
export const INTEGRATION_SERVICES: IntegrationService[] = [
  { name: { en: 'Airbnb', ar: 'Airbnb' }, group: 'channels', summary: { en: 'Calendar sync with Airbnb.', ar: 'مزامنة التقويم مع Airbnb.' }, solutions: PM },
  { name: { en: 'Booking.com', ar: 'Booking.com' }, group: 'channels', summary: { en: 'Calendar sync with Booking.com.', ar: 'مزامنة التقويم مع Booking.com.' }, solutions: PM },
  { name: { en: 'Expedia', ar: 'Expedia' }, group: 'channels', summary: { en: 'Calendar sync with Expedia.', ar: 'مزامنة التقويم مع Expedia.' }, solutions: PM },
  { name: { en: 'Stripe', ar: 'Stripe' }, group: 'payments', summary: { en: 'Take payments through Stripe.', ar: 'استلم المدفوعات عبر Stripe.' }, solutions: BOTH },
  { name: { en: 'Tap', ar: 'Tap' }, group: 'payments', summary: { en: 'Take payments through Tap.', ar: 'استلم المدفوعات عبر Tap.' }, solutions: BOTH },
  { name: { en: 'Google Analytics', ar: 'Google Analytics' }, group: 'analytics', summary: { en: 'Connect your own Google Analytics.', ar: 'اربط حساب Google Analytics الخاص بك.' }, solutions: BOTH },
  { name: { en: 'Meta Pixel', ar: 'Meta Pixel' }, group: 'analytics', summary: { en: 'Connect your own Meta Pixel.', ar: 'اربط Meta Pixel الخاص بك.' }, solutions: BOTH },
  { name: { en: 'SMS (Twilio)', ar: 'الرسائل النصية (Twilio)' }, group: 'messaging', summary: { en: 'Text guests, tenants and customers through Twilio.', ar: 'راسل الضيوف والمستأجرين والعملاء عبر Twilio.' }, solutions: BOTH },
]

const FROM_ACCEZ = { icon: Plug, title: { en: 'Connect from Accez', ar: 'اربطه من أكسيز' }, text: { en: 'Set it up on the integrations page.', ar: 'أعدّه من صفحة التكاملات.' } }

export const INTEGRATIONS: Integration[] = [
  {
    slug: 'booking-channels',
    group: 'channels',
    solutions: PM,
    name: { en: 'Airbnb, Booking.com and Expedia', ar: 'Airbnb وBooking.com وExpedia' },
    summary: { en: 'Calendar sync with three booking channels.', ar: 'مزامنة التقويم مع ثلاث قنوات حجز.' },
    metaTitle: { en: 'Airbnb, Booking.com and Expedia integration', ar: 'تكامل Airbnb وBooking.com وExpedia' },
    metaDescription: {
      en: 'Connect Airbnb, Booking.com and Expedia to Accez property management: one availability calendar, bulk price updates and every reservation in one place.',
      ar: 'اربط Airbnb وBooking.com وExpedia بحل إدارة العقارات في أكسيز: تقويم توفر واحد، وتحديث الأسعار دفعة واحدة، وكل الحجوزات في مكان واحد لكل وحداتك.',
    },
    hero: {
      title: { en: 'Airbnb, Booking.com and Expedia', ar: 'Airbnb وBooking.com وExpedia' },
      accent: { en: 'in one calendar', ar: 'في تقويم واحد' },
      subtitle: { en: 'Sync your availability with the three booking channels, in the property management solution.', ar: 'زامن التوفر مع قنوات الحجز الثلاث، في حل إدارة العقارات.' },
    },
    shots: [
      { shot: 'pmCalendar', title: { en: 'Availability calendar', ar: 'تقويم التوفر' }, text: { en: 'Airbnb, Booking.com and Expedia synced from one calendar.', ar: 'Airbnb وBooking.com وExpedia متزامنة من تقويم واحد.' } },
      { shot: 'pmReservation', title: { en: 'Every reservation', ar: 'كل حجز' }, text: { en: 'Each stay with its timeline, payment and accepted policies.', ar: 'كل إقامة مع جدولها الزمني ودفعها والسياسات المقبولة.' } },
    ],
    points: [
      { icon: RefreshCw, title: { en: 'Calendar sync', ar: 'مزامنة التقويم' }, text: { en: 'Your availability, synced with each channel.', ar: 'توفر وحداتك متزامن مع كل قناة.' } },
      { icon: Layers, title: { en: 'Three channels', ar: 'ثلاث قنوات' }, text: { en: 'Airbnb, Booking.com and Expedia in one calendar.', ar: 'Airbnb وBooking.com وExpedia في تقويم واحد.' } },
      { icon: Tags, title: { en: 'Bulk prices', ar: 'الأسعار دفعة واحدة' }, text: { en: 'Update prices for many dates at once.', ar: 'حدّث أسعار تواريخ كثيرة مرة واحدة.' } },
      { icon: CalendarCheck, title: { en: 'Every reservation', ar: 'كل حجز' }, text: { en: 'Timeline, payment and accepted policies.', ar: 'الجدول الزمني والدفع والسياسات المقبولة.' } },
    ],
    faqs: [
      { q: { en: 'Which booking channels does Accez connect to?', ar: 'ما قنوات الحجز التي يتصل بها أكسيز؟' }, a: { en: 'Airbnb, Booking.com and Expedia.', ar: 'Airbnb وBooking.com وExpedia.' } },
      { q: { en: 'Which Accez solution has them?', ar: 'أي حل في أكسيز يتضمنها؟' }, a: { en: 'Property management, through its channel manager.', ar: 'حل إدارة العقارات، من خلال مدير القنوات.' } },
    ],
    modules: ['channel-manager', 'reservations-and-stays'],
    posts: ['the-double-booking-nightmare-how-to-sync-every-channel', 'channel-manager-vs-property-management-system'],
  },
  {
    slug: 'payments',
    group: 'payments',
    solutions: BOTH,
    name: { en: 'Stripe and Tap payments', ar: 'مدفوعات Stripe وTap' },
    summary: { en: 'Take payments through Stripe or Tap.', ar: 'استلم المدفوعات عبر Stripe أو Tap.' },
    metaTitle: { en: 'Stripe and Tap payments integration', ar: 'تكامل مدفوعات Stripe وTap' },
    metaDescription: {
      en: 'Take payments through Stripe or Tap in Accez, for property managers and for service providers. Connect your gateway on the integrations page in minutes.',
      ar: 'استلم المدفوعات عبر Stripe أو Tap في أكسيز، لمديري العقارات ولمقدمي الخدمات. اربط بوابة الدفع من صفحة التكاملات، وتابع الإيرادات والفواتير من حسابك.',
    },
    hero: {
      title: { en: 'Stripe and Tap payments', ar: 'مدفوعات Stripe وTap' },
      accent: { en: 'in Saudi Arabia', ar: 'في السعودية' },
      subtitle: { en: 'Take payments through Stripe or Tap, in property management or as a service provider.', ar: 'استلم المدفوعات عبر Stripe أو Tap، في إدارة العقارات أو كمقدم خدمة.' },
    },
    shots: [
      { shot: 'pmIntegrations', title: { en: 'Property management', ar: 'إدارة العقارات' }, text: { en: 'Stripe and Tap on the integrations page.', ar: 'Stripe وTap في صفحة التكاملات.' } },
      { shot: 'spIntegrations', title: { en: 'Service providers', ar: 'مقدمو الخدمات' }, text: { en: 'Tap and Stripe on the provider integrations page.', ar: 'Tap وStripe في صفحة تكاملات مقدم الخدمة.' } },
      { shot: 'pmBilling', title: { en: 'Billing and payments', ar: 'الفوترة والمدفوعات' }, text: { en: 'Revenue, invoices and refunds for property managers.', ar: 'الإيرادات والفواتير والمبالغ المستردة لمديري العقارات.' } },
    ],
    points: [
      { icon: CreditCard, title: { en: 'Two gateways', ar: 'بوابتا دفع' }, text: { en: 'Take payments through Stripe or Tap.', ar: 'استلم المدفوعات عبر Stripe أو Tap.' } },
      FROM_ACCEZ,
      { icon: Layers, title: { en: 'Both solutions', ar: 'في الحلين' }, text: { en: 'Property management and service providers.', ar: 'إدارة العقارات ومقدمو الخدمات.' } },
      { icon: Receipt, title: { en: 'Billing in one place', ar: 'الفوترة في مكان واحد' }, text: { en: 'Revenue, invoices and refunds for property managers.', ar: 'الإيرادات والفواتير والمبالغ المستردة لمديري العقارات.' } },
    ],
    faqs: [
      { q: { en: 'Which payment gateways does Accez support?', ar: 'ما بوابات الدفع التي يدعمها أكسيز؟' }, a: { en: 'Stripe and Tap.', ar: 'Stripe وTap.' } },
      { q: { en: 'Where do I connect them?', ar: 'أين أربطها؟' }, a: { en: 'On the integrations page of your Accez account.', ar: 'في صفحة التكاملات في حسابك على أكسيز.' } },
    ],
    modules: ['billing-and-payments'],
    posts: ['handling-refunds-and-chargebacks-without-losing-money-or-trust', 'cash-flow-forecasting-for-property-management-businesses'],
  },
]

/** Old one-per-service addresses and where they now lead (also in vercel.json). */
export const RETIRED_INTEGRATION_PAGES: Record<string, string> = {
  airbnb: 'booking-channels',
  'booking-com': 'booking-channels',
  expedia: 'booking-channels',
  stripe: 'payments',
  tap: 'payments',
  'google-analytics': '',
  'meta-pixel': '',
  'twilio-sms': '',
}

export const integrationHref = (slug: string) => `${INTEGRATIONS_HREF}/${slug}`

export function integrationBySlug(slug: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug)
}
