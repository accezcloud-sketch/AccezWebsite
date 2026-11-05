/**
 * The services Accez connects to, all on one page: /integrations/. Each is
 * listed in its group with the solutions it is in. There are no pages per
 * service: they would repeat the same screens and text. Only what is true
 * today (owner-confirmed facts and the product's own screens), and text
 * marks only, no third-party logos.
 */
import type { Bilingual } from './solutions'

export type IntegrationGroup = 'channels' | 'payments' | 'analytics' | 'messaging'

/** One service on the /integrations/ page. */
export interface IntegrationService {
  name: Bilingual
  group: IntegrationGroup
  summary: Bilingual
  solutions: string[]
}

export const INTEGRATION_GROUPS: { key: IntegrationGroup; name: Bilingual }[] = [
  { key: 'channels', name: { en: 'Booking channels and calendars', ar: 'قنوات الحجز والتقاويم' } },
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
    en: 'Accez integrations: Airbnb, Booking.com, Expedia, RoomCloud and iCal for property managers; Stripe and Tap payments, Google Analytics, Meta Pixel and SMS.',
    ar: 'تكاملات أكسيز: Airbnb وBooking.com وExpedia وRoomCloud وiCal لمديري العقارات، ومدفوعات Stripe وTap، وGoogle Analytics وMeta Pixel، والرسائل النصية.',
  },
  hero: {
    title: { en: 'Integrations', ar: 'التكاملات' },
    accent: { en: 'that connect to Accez', ar: 'المتصلة بأكسيز' },
    subtitle: { en: 'Booking channels, payments, analytics and SMS, in the solution that uses them.', ar: 'قنوات الحجز والمدفوعات والتحليلات والرسائل النصية، في الحل الذي يستخدمها.' },
  },
  shot: { shot: 'pmIntegrations' as const, title: { en: 'The integrations page', ar: 'صفحة التكاملات' }, text: { en: 'Connect each service from your Accez account', ar: 'اربط كل خدمة من حسابك في أكسيز' } },
}

const PM = ['property-managers']
const BOTH = ['property-managers', 'service-providers']

/** Every service, in the order the /integrations/ page lists them. */
export const INTEGRATION_SERVICES: IntegrationService[] = [
  { name: { en: 'Airbnb', ar: 'Airbnb' }, group: 'channels', summary: { en: 'Calendar sync with Airbnb', ar: 'مزامنة التقويم مع Airbnb' }, solutions: PM },
  { name: { en: 'Booking.com', ar: 'Booking.com' }, group: 'channels', summary: { en: 'Calendar sync with Booking.com', ar: 'مزامنة التقويم مع Booking.com' }, solutions: PM },
  { name: { en: 'Expedia', ar: 'Expedia' }, group: 'channels', summary: { en: 'Calendar sync with Expedia', ar: 'مزامنة التقويم مع Expedia' }, solutions: PM },
  { name: { en: 'RoomCloud', ar: 'RoomCloud' }, group: 'channels', summary: { en: 'Map your units to RoomCloud rooms and sync availability', ar: 'اربط وحداتك بغرف RoomCloud وزامن التوفر' }, solutions: PM },
  { name: { en: 'iCal calendars', ar: 'تقاويم iCal' }, group: 'channels', summary: { en: 'Import a calendar by iCal link or .ics file', ar: 'استورد تقويمًا برابط iCal أو بملف .ics' }, solutions: PM },
  { name: { en: 'Stripe', ar: 'Stripe' }, group: 'payments', summary: { en: 'Take payments through Stripe', ar: 'استلم المدفوعات عبر Stripe' }, solutions: BOTH },
  { name: { en: 'Tap', ar: 'Tap' }, group: 'payments', summary: { en: 'Take payments through Tap', ar: 'استلم المدفوعات عبر Tap' }, solutions: BOTH },
  { name: { en: 'Google Analytics', ar: 'Google Analytics' }, group: 'analytics', summary: { en: 'Connect your own Google Analytics', ar: 'اربط حساب Google Analytics الخاص بك' }, solutions: BOTH },
  { name: { en: 'Meta Pixel', ar: 'Meta Pixel' }, group: 'analytics', summary: { en: 'Connect your own Meta Pixel', ar: 'اربط Meta Pixel الخاص بك' }, solutions: BOTH },
  { name: { en: 'SMS (Twilio)', ar: 'الرسائل النصية (Twilio)' }, group: 'messaging', summary: { en: 'Text guests, tenants and customers through Twilio', ar: 'راسل الضيوف والمستأجرين والعملاء عبر Twilio' }, solutions: BOTH },
]

/** Where a group sits on the /integrations/ page. */
export const integrationGroupHref = (group: IntegrationGroup) => `${INTEGRATIONS_HREF}#${group}`

export function integrationGroup(key: string) {
  return INTEGRATION_GROUPS.find((g) => g.key === key)
}
