/**
 * The services Accez connects to, one page each at /integrations/<slug>/,
 * listed together on /integrations/. Only what is true today: the
 * connection exists, in the solutions named here (owner-confirmed facts and
 * the real integrations screens). No deep claims about what each one does,
 * and text marks only, no third-party logos.
 */
import {
  RefreshCw, Layers, Tags, CalendarCheck,
  CreditCard, Plug, Receipt, BarChart3, Megaphone, MessageSquareText, Users,
} from 'lucide-react'
import type { DetailPageData } from './detailPages'
import type { Bilingual } from './solutions'

export type IntegrationGroup = 'channels' | 'payments' | 'analytics' | 'messaging'

export interface Integration extends DetailPageData {
  group: IntegrationGroup
  /** Keys of the solutions it is available in (lib/platform/solutions.ts). */
  solutions: string[]
  /** Module pages of the property management solution that use it. */
  modules: string[]
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

const CHANNEL_FAQ = (name: string, others: Bilingual) => [
  { q: { en: `Which Accez solution connects to ${name}?`, ar: `أي حل في أكسيز يتصل بـ${name}؟` }, a: { en: 'Property management, through its channel manager.', ar: 'حل إدارة العقارات، من خلال مدير القنوات.' } },
  { q: { en: 'Which other channels are there?', ar: 'ما القنوات الأخرى المتاحة؟' }, a: others },
]

const CHANNEL_SHOTS = (name: string) => [
  { shot: 'pmCalendar' as const, title: { en: 'Availability calendar', ar: 'تقويم التوفر' }, text: { en: `Sync channels, including ${name}, from one calendar.`, ar: `زامن القنوات، ومنها ${name}، من تقويم واحد.` } },
  { shot: 'pmReservation' as const, title: { en: 'Every reservation', ar: 'كل حجز' }, text: { en: 'Each stay with its timeline, payment and accepted policies.', ar: 'كل إقامة مع جدولها الزمني ودفعها والسياسات المقبولة.' } },
]

const BOTH_SOLUTIONS = { icon: Layers, title: { en: 'Both solutions', ar: 'في الحلين' }, text: { en: 'Property management and service providers.', ar: 'إدارة العقارات ومقدمو الخدمات.' } }
const FROM_ACCEZ = { icon: Plug, title: { en: 'Connect from Accez', ar: 'اربطه من أكسيز' }, text: { en: 'Set it up on the integrations page.', ar: 'أعدّه من صفحة التكاملات.' } }

const PAYMENT_SHOTS = [
  { shot: 'pmIntegrations' as const, title: { en: 'Property management', ar: 'إدارة العقارات' }, text: { en: 'Stripe and Tap on the integrations page.', ar: 'Stripe وTap في صفحة التكاملات.' } },
  { shot: 'spIntegrations' as const, title: { en: 'Service providers', ar: 'مقدمو الخدمات' }, text: { en: 'Tap and Stripe on the provider integrations page.', ar: 'Tap وStripe في صفحة تكاملات مقدم الخدمة.' } },
  { shot: 'pmBilling' as const, title: { en: 'Billing and payments', ar: 'الفوترة والمدفوعات' }, text: { en: 'Revenue, invoices and refunds for property managers.', ar: 'الإيرادات والفواتير والمبالغ المستردة لمديري العقارات.' } },
]

const GATEWAYS_FAQ = { q: { en: 'Which payment gateways does Accez support?', ar: 'ما بوابات الدفع التي يدعمها أكسيز؟' }, a: { en: 'Stripe and Tap.', ar: 'Stripe وTap.' } }

const TAG_SHOTS = (name: string) => [
  { shot: 'pmIntegrations' as const, title: { en: 'Property management', ar: 'إدارة العقارات' }, text: { en: `${name} on the integrations page.`, ar: `${name} في صفحة التكاملات.` } },
  { shot: 'spIntegrations' as const, title: { en: 'Service providers', ar: 'مقدمو الخدمات' }, text: { en: `${name} on the provider integrations page.`, ar: `${name} في صفحة تكاملات مقدم الخدمة.` } },
]

export const INTEGRATIONS: Integration[] = [
  {
    slug: 'airbnb',
    group: 'channels',
    solutions: ['property-managers'],
    name: { en: 'Airbnb', ar: 'Airbnb' },
    summary: { en: 'Calendar sync with Airbnb.', ar: 'مزامنة التقويم مع Airbnb.' },
    metaTitle: { en: 'Airbnb integration for Saudi property managers', ar: 'تكامل Airbnb لمديري العقارات في السعودية' },
    metaDescription: {
      en: 'Connect Airbnb to Accez property management and sync your availability calendar, alongside Booking.com and Expedia, with bulk price updates in one place.',
      ar: 'اربط Airbnb بحل إدارة العقارات في أكسيز وزامن تقويم التوفر، إلى جانب Booking.com وExpedia، مع تحديث الأسعار دفعة واحدة من مكان واحد لكل وحداتك.',
    },
    hero: {
      title: { en: 'Airbnb integration', ar: 'تكامل Airbnb' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'Sync your availability calendar with Airbnb, next to Booking.com and Expedia.', ar: 'زامن تقويم التوفر مع Airbnb، إلى جانب Booking.com وExpedia.' },
    },
    shots: CHANNEL_SHOTS('Airbnb'),
    points: [
      { icon: RefreshCw, title: { en: 'Calendar sync', ar: 'مزامنة التقويم' }, text: { en: 'Sync your availability calendar with Airbnb.', ar: 'زامن تقويم التوفر مع Airbnb.' } },
      { icon: Layers, title: { en: 'Three channels', ar: 'ثلاث قنوات' }, text: { en: 'Airbnb, Booking.com and Expedia in one calendar.', ar: 'Airbnb وBooking.com وExpedia في تقويم واحد.' } },
      { icon: Tags, title: { en: 'Bulk prices', ar: 'الأسعار دفعة واحدة' }, text: { en: 'Update prices for many dates at once.', ar: 'حدّث أسعار تواريخ كثيرة مرة واحدة.' } },
    ],
    faqs: CHANNEL_FAQ('Airbnb', { en: 'Booking.com and Expedia.', ar: 'Booking.com وExpedia.' }),
    modules: ['channel-manager', 'reservations-and-stays'],
    posts: ['the-double-booking-nightmare-how-to-sync-every-channel'],
  },
  {
    slug: 'booking-com',
    group: 'channels',
    solutions: ['property-managers'],
    name: { en: 'Booking.com', ar: 'Booking.com' },
    summary: { en: 'Calendar sync with Booking.com.', ar: 'مزامنة التقويم مع Booking.com.' },
    metaTitle: { en: 'Booking.com integration for Saudi property managers', ar: 'تكامل Booking.com لمديري العقارات في السعودية' },
    metaDescription: {
      en: 'Connect Booking.com to Accez property management and sync your availability calendar, alongside Airbnb and Expedia, with bulk price updates in one place.',
      ar: 'اربط Booking.com بحل إدارة العقارات في أكسيز وزامن تقويم التوفر، إلى جانب Airbnb وExpedia، مع تحديث الأسعار دفعة واحدة من مكان واحد لكل وحداتك.',
    },
    hero: {
      title: { en: 'Booking.com integration', ar: 'تكامل Booking.com' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'Sync your availability calendar with Booking.com, next to Airbnb and Expedia.', ar: 'زامن تقويم التوفر مع Booking.com، إلى جانب Airbnb وExpedia.' },
    },
    shots: CHANNEL_SHOTS('Booking.com'),
    points: [
      { icon: RefreshCw, title: { en: 'Calendar sync', ar: 'مزامنة التقويم' }, text: { en: 'Sync your availability calendar with Booking.com.', ar: 'زامن تقويم التوفر مع Booking.com.' } },
      { icon: Layers, title: { en: 'Three channels', ar: 'ثلاث قنوات' }, text: { en: 'Booking.com, Airbnb and Expedia in one calendar.', ar: 'Booking.com وAirbnb وExpedia في تقويم واحد.' } },
      { icon: CalendarCheck, title: { en: 'Every reservation', ar: 'كل حجز' }, text: { en: 'Timeline, payment and accepted policies.', ar: 'الجدول الزمني والدفع والسياسات المقبولة.' } },
    ],
    faqs: CHANNEL_FAQ('Booking.com', { en: 'Airbnb and Expedia.', ar: 'Airbnb وExpedia.' }),
    modules: ['channel-manager', 'reservations-and-stays'],
    posts: ['the-double-booking-nightmare-how-to-sync-every-channel'],
  },
  {
    slug: 'expedia',
    group: 'channels',
    solutions: ['property-managers'],
    name: { en: 'Expedia', ar: 'Expedia' },
    summary: { en: 'Calendar sync with Expedia.', ar: 'مزامنة التقويم مع Expedia.' },
    metaTitle: { en: 'Expedia integration for Saudi property managers', ar: 'تكامل Expedia لمديري العقارات في السعودية' },
    metaDescription: {
      en: 'Connect Expedia to Accez property management and sync your availability calendar, alongside Airbnb and Booking.com, with bulk price updates in one place.',
      ar: 'اربط Expedia بحل إدارة العقارات في أكسيز وزامن تقويم التوفر، إلى جانب Airbnb وBooking.com، مع تحديث الأسعار دفعة واحدة من مكان واحد لكل وحداتك.',
    },
    hero: {
      title: { en: 'Expedia integration', ar: 'تكامل Expedia' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'Sync your availability calendar with Expedia, next to Airbnb and Booking.com.', ar: 'زامن تقويم التوفر مع Expedia، إلى جانب Airbnb وBooking.com.' },
    },
    shots: CHANNEL_SHOTS('Expedia'),
    points: [
      { icon: RefreshCw, title: { en: 'Calendar sync', ar: 'مزامنة التقويم' }, text: { en: 'Sync your availability calendar with Expedia.', ar: 'زامن تقويم التوفر مع Expedia.' } },
      { icon: Layers, title: { en: 'Three channels', ar: 'ثلاث قنوات' }, text: { en: 'Expedia, Airbnb and Booking.com in one calendar.', ar: 'Expedia وAirbnb وBooking.com في تقويم واحد.' } },
      { icon: Tags, title: { en: 'Bulk prices', ar: 'الأسعار دفعة واحدة' }, text: { en: 'Update prices for many dates at once.', ar: 'حدّث أسعار تواريخ كثيرة مرة واحدة.' } },
    ],
    faqs: CHANNEL_FAQ('Expedia', { en: 'Airbnb and Booking.com.', ar: 'Airbnb وBooking.com.' }),
    modules: ['channel-manager', 'reservations-and-stays'],
    posts: ['the-double-booking-nightmare-how-to-sync-every-channel'],
  },
  {
    slug: 'stripe',
    group: 'payments',
    solutions: ['property-managers', 'service-providers'],
    name: { en: 'Stripe', ar: 'Stripe' },
    summary: { en: 'Take payments through Stripe.', ar: 'استلم المدفوعات عبر Stripe.' },
    metaTitle: { en: 'Stripe payments integration in Saudi Arabia', ar: 'تكامل مدفوعات Stripe في السعودية' },
    metaDescription: {
      en: 'Take payments through Stripe in Accez, for property managers and for service providers. Connect it from the integrations page, next to Tap, in a few steps.',
      ar: 'استلم المدفوعات عبر Stripe في أكسيز، لمديري العقارات ولمقدمي الخدمات. اربطه من صفحة التكاملات إلى جانب Tap، وتابع الإيرادات والفواتير من حسابك.',
    },
    hero: {
      title: { en: 'Stripe payments integration', ar: 'تكامل مدفوعات Stripe' },
      accent: { en: 'in Saudi Arabia', ar: 'في السعودية' },
      subtitle: { en: 'Take payments through Stripe, in property management or as a service provider.', ar: 'استلم المدفوعات عبر Stripe، في إدارة العقارات أو كمقدم خدمة.' },
    },
    shots: PAYMENT_SHOTS,
    points: [
      { icon: CreditCard, title: { en: 'Take payments', ar: 'استلم المدفوعات' }, text: { en: 'Payments through Stripe.', ar: 'مدفوعات عبر Stripe.' } },
      FROM_ACCEZ,
      BOTH_SOLUTIONS,
      { icon: Receipt, title: { en: 'Billing in one place', ar: 'الفوترة في مكان واحد' }, text: { en: 'Revenue, invoices and refunds for property managers.', ar: 'الإيرادات والفواتير والمبالغ المستردة لمديري العقارات.' } },
    ],
    faqs: [
      GATEWAYS_FAQ,
      { q: { en: 'Where do I connect Stripe?', ar: 'أين أربط Stripe؟' }, a: { en: 'On the integrations page of your Accez account.', ar: 'في صفحة التكاملات في حسابك على أكسيز.' } },
    ],
    modules: ['billing-and-payments'],
    posts: ['handling-refunds-and-chargebacks-without-losing-money-or-trust', 'cash-flow-forecasting-for-property-management-businesses'],
  },
  {
    slug: 'tap',
    group: 'payments',
    solutions: ['property-managers', 'service-providers'],
    name: { en: 'Tap', ar: 'Tap' },
    summary: { en: 'Take payments through Tap.', ar: 'استلم المدفوعات عبر Tap.' },
    metaTitle: { en: 'Tap payments integration in Saudi Arabia', ar: 'تكامل مدفوعات Tap في السعودية' },
    metaDescription: {
      en: 'Take payments through Tap in Accez, for property managers and for service providers. Connect it from the integrations page, next to Stripe, in a few steps.',
      ar: 'استلم المدفوعات عبر Tap في أكسيز، لمديري العقارات ولمقدمي الخدمات. اربطه من صفحة التكاملات إلى جانب Stripe، وتابع الإيرادات والفواتير من حسابك.',
    },
    hero: {
      title: { en: 'Tap payments integration', ar: 'تكامل مدفوعات Tap' },
      accent: { en: 'in Saudi Arabia', ar: 'في السعودية' },
      subtitle: { en: 'Take payments through Tap, in property management or as a service provider.', ar: 'استلم المدفوعات عبر Tap، في إدارة العقارات أو كمقدم خدمة.' },
    },
    shots: PAYMENT_SHOTS,
    points: [
      { icon: CreditCard, title: { en: 'Take payments', ar: 'استلم المدفوعات' }, text: { en: 'Payments through Tap.', ar: 'مدفوعات عبر Tap.' } },
      FROM_ACCEZ,
      BOTH_SOLUTIONS,
      { icon: Receipt, title: { en: 'Billing in one place', ar: 'الفوترة في مكان واحد' }, text: { en: 'Revenue, invoices and refunds for property managers.', ar: 'الإيرادات والفواتير والمبالغ المستردة لمديري العقارات.' } },
    ],
    faqs: [
      GATEWAYS_FAQ,
      { q: { en: 'Where do I connect Tap?', ar: 'أين أربط Tap؟' }, a: { en: 'On the integrations page of your Accez account.', ar: 'في صفحة التكاملات في حسابك على أكسيز.' } },
    ],
    modules: ['billing-and-payments'],
    posts: ['handling-refunds-and-chargebacks-without-losing-money-or-trust', 'cash-flow-forecasting-for-property-management-businesses'],
  },
  {
    slug: 'google-analytics',
    group: 'analytics',
    solutions: ['property-managers', 'service-providers'],
    name: { en: 'Google Analytics', ar: 'Google Analytics' },
    summary: { en: 'Connect your Google Analytics.', ar: 'اربط حساب Google Analytics.' },
    metaTitle: { en: 'Google Analytics integration for Saudi businesses', ar: 'تكامل Google Analytics للأعمال في السعودية' },
    metaDescription: {
      en: 'Connect Google Analytics to Accez from the integrations page, for property managers and for service providers, next to Meta Pixel, Stripe, Tap and SMS.',
      ar: 'اربط Google Analytics بأكسيز من صفحة التكاملات، لمديري العقارات ولمقدمي الخدمات، إلى جانب Meta Pixel وStripe وTap والرسائل النصية، في خطوات قليلة.',
    },
    hero: {
      title: { en: 'Google Analytics integration', ar: 'تكامل Google Analytics' },
      accent: { en: 'for Saudi businesses', ar: 'للأعمال في السعودية' },
      subtitle: { en: 'Connect Google Analytics from the integrations page, in either Accez solution.', ar: 'اربط Google Analytics من صفحة التكاملات، في أي من حلّي أكسيز.' },
    },
    shots: TAG_SHOTS('Google Analytics'),
    points: [
      { icon: BarChart3, title: { en: 'Your analytics', ar: 'حساب Google Analytics' }, text: { en: 'Connect your own analytics account.', ar: 'اربط حساب التحليلات الخاص بك.' } },
      FROM_ACCEZ,
      BOTH_SOLUTIONS,
    ],
    faqs: [
      { q: { en: 'Is it available to service providers?', ar: 'هل هو متاح لمقدمي الخدمات؟' }, a: { en: 'Yes. It is on the integrations page of both solutions.', ar: 'نعم. تجده في صفحة التكاملات في الحلين.' } },
      { q: { en: 'What else can I connect?', ar: 'ما الذي يمكنني ربطه أيضًا؟' }, a: { en: 'Meta Pixel, Stripe, Tap and SMS through Twilio.', ar: 'Meta Pixel وStripe وTap والرسائل النصية عبر Twilio.' } },
    ],
    modules: [],
    posts: ['the-5-metrics-every-property-manager-should-check-daily'],
  },
  {
    slug: 'meta-pixel',
    group: 'analytics',
    solutions: ['property-managers', 'service-providers'],
    name: { en: 'Meta Pixel', ar: 'Meta Pixel' },
    summary: { en: 'Connect your Meta Pixel.', ar: 'اربط Meta Pixel الخاص بك.' },
    metaTitle: { en: 'Meta Pixel integration for Saudi businesses', ar: 'تكامل Meta Pixel للأعمال في السعودية' },
    metaDescription: {
      en: 'Connect Meta Pixel to Accez from the integrations page, for property managers and for service providers, next to Google Analytics, Stripe, Tap and SMS.',
      ar: 'اربط Meta Pixel بأكسيز من صفحة التكاملات، لمديري العقارات ولمقدمي الخدمات، إلى جانب Google Analytics وStripe وTap والرسائل النصية، في خطوات قليلة.',
    },
    hero: {
      title: { en: 'Meta Pixel integration', ar: 'تكامل Meta Pixel' },
      accent: { en: 'for Saudi businesses', ar: 'للأعمال في السعودية' },
      subtitle: { en: 'Connect Meta Pixel from the integrations page, in either Accez solution.', ar: 'اربط Meta Pixel من صفحة التكاملات، في أي من حلّي أكسيز.' },
    },
    shots: TAG_SHOTS('Meta Pixel'),
    points: [
      { icon: Megaphone, title: { en: 'Your pixel', ar: 'بكسل Meta الخاص بك' }, text: { en: 'Connect your own pixel.', ar: 'اربط البكسل الخاص بك.' } },
      FROM_ACCEZ,
      BOTH_SOLUTIONS,
    ],
    faqs: [
      { q: { en: 'Is it available to service providers?', ar: 'هل هو متاح لمقدمي الخدمات؟' }, a: { en: 'Yes. It is on the integrations page of both solutions.', ar: 'نعم. تجده في صفحة التكاملات في الحلين.' } },
      { q: { en: 'What else can I connect?', ar: 'ما الذي يمكنني ربطه أيضًا؟' }, a: { en: 'Google Analytics, Stripe, Tap and SMS through Twilio.', ar: 'Google Analytics وStripe وTap والرسائل النصية عبر Twilio.' } },
    ],
    modules: [],
    posts: ['building-a-brand-for-your-property-management-company', 'the-5-metrics-every-property-manager-should-check-daily'],
  },
  {
    slug: 'twilio-sms',
    group: 'messaging',
    solutions: ['property-managers', 'service-providers'],
    name: { en: 'SMS (Twilio)', ar: 'الرسائل النصية (Twilio)' },
    summary: { en: 'Send SMS through Twilio.', ar: 'أرسل رسائل نصية عبر Twilio.' },
    metaTitle: { en: 'SMS integration with Twilio in Saudi Arabia', ar: 'تكامل الرسائل النصية عبر Twilio في السعودية' },
    metaDescription: {
      en: 'Send SMS through Twilio from Accez: property managers text guests and tenants, service providers text their customers. Set it up on the integrations page.',
      ar: 'أرسل رسائل نصية عبر Twilio من أكسيز: يراسل مديرو العقارات الضيوف والمستأجرين، ويراسل مقدمو الخدمات عملاءهم. اربطه من صفحة التكاملات في حسابك بسهولة.',
    },
    hero: {
      title: { en: 'SMS integration with Twilio', ar: 'تكامل الرسائل النصية عبر Twilio' },
      accent: { en: 'in Saudi Arabia', ar: 'في السعودية' },
      subtitle: { en: 'Send SMS through Twilio, in property management or as a service provider.', ar: 'أرسل رسائل نصية عبر Twilio، في إدارة العقارات أو كمقدم خدمة.' },
    },
    shots: TAG_SHOTS('SMS (Twilio)'),
    points: [
      { icon: MessageSquareText, title: { en: 'Guests and tenants', ar: 'الضيوف والمستأجرون' }, text: { en: 'Property managers text guests and tenants.', ar: 'يراسل مديرو العقارات الضيوف والمستأجرين.' } },
      { icon: Users, title: { en: 'Your customers', ar: 'عملاؤك' }, text: { en: 'Service providers text their customers.', ar: 'يراسل مقدمو الخدمات عملاءهم.' } },
      FROM_ACCEZ,
    ],
    faqs: [
      { q: { en: 'Which SMS provider does Accez use?', ar: 'ما مزود الرسائل النصية في أكسيز؟' }, a: { en: 'Twilio.', ar: 'خدمة Twilio.' } },
      { q: { en: 'Is SMS in both solutions?', ar: 'هل الرسائل النصية متاحة في الحلين؟' }, a: { en: 'Yes. Property managers and service providers can both send SMS.', ar: 'نعم. يستطيع مديرو العقارات ومقدمو الخدمات إرسال الرسائل النصية.' } },
    ],
    modules: ['team-and-messaging'],
    posts: ['one-inbox-to-rule-them-all-centralizing-property-communications', 'the-guest-messaging-templates-every-vacation-rental-manager'],
  },
]

export const integrationHref = (slug: string) => `${INTEGRATIONS_HREF}/${slug}`

export function integrationBySlug(slug: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.slug === slug)
}
