/**
 * Real screenshots of the Accez apps, captured from working accounts.
 * Environment addresses and personal details are hidden before capture, so
 * no screenshot shows where it was taken.
 *
 * Files live in /public/product/<app>/<lang>/<name>-<width>.webp, in two
 * widths for sharp images on every screen. Arabic pages show the Arabic
 * interface where it was captured, otherwise the English one. Each capture
 * shows the whole screen, so heights differ; shot-sizes.json records each
 * one's height (at 1440 wide) and is written when the images are converted.
 * The screens shown side by side in one block are captured at the same
 * window size, so they share one shape and nothing is padded or stretched.
 */
import type { Locale } from '@/lib/i18n'
import SIZES from './shot-sizes.json'

export type ShotApp = 'pm' | 'sp'

export interface Shot {
  app: ShotApp
  name: string
  /** What the screen shows, for people who can't see it. */
  alt: { en: string; ar: string }
  /** Captured in the Arabic interface too. */
  arabic: boolean
}

const shot = (app: ShotApp, name: string, en: string, ar: string, arabic = true): Shot => ({ app, name, alt: { en, ar }, arabic })

export const SHOTS = {
  pmDashboard: shot('pm', 'dashboard', 'Accez property management dashboard: properties, tenants, revenue and occupancy', 'لوحة تحكم إدارة العقارات في أكسيز: العقارات والمستأجرون والإيرادات والإشغال'),
  pmProperty: shot('pm', 'property-overview', 'A property overview with revenue, residents, units and work orders', 'نظرة عامة على عقار: الإيرادات والسكان والوحدات وأوامر العمل'),
  pmCalendar: shot('pm', 'availability-calendar', 'The availability calendar with channel sync, bulk update, import and export', 'تقويم التوفر مع مزامنة القنوات والتحديث الجماعي والاستيراد والتصدير'),
  pmReservation: shot('pm', 'reservation', 'A reservation with its timeline, payment summary and accepted policies', 'حجز مع جدوله الزمني وملخص الدفع والسياسات المقبولة'),
  pmAddons: shot('pm', 'add-ons', 'The add-on catalog: food and beverages, cleaning and transport', 'كتالوج الإضافات: الطعام والمشروبات والتنظيف والنقل'),
  pmSaleUnits: shot('pm', 'sale-units', 'Sale units with their status, price and buyer', 'وحدات البيع مع حالتها وسعرها والمشتري'),
  pmSalesPath: shot('pm', 'sales-path', 'The sales path: each sale moves from new to contract signed', 'مسار المبيعات: تنتقل كل صفقة من جديدة إلى موقّعة'),
  pmSalesRecords: shot('pm', 'sales-records', 'All sale records in one sheet with filters', 'كل سجلات البيع في جدول واحد مع عوامل التصفية'),
  pmUnitsMap: shot('pm', 'units-map', 'Sale units plotted on a map', 'وحدات البيع على الخريطة'),
  pmBilling: shot('pm', 'billing', 'Billing and payments: revenue, invoices, refunds and revenue trends', 'الفوترة والمدفوعات: الإيرادات والفواتير والمبالغ المستردة واتجاهات الإيرادات'),
  pmIntegrations: shot('pm', 'integrations', 'Integrations: Google Tag Manager, Google Analytics, Meta Pixel, Stripe, Tap and SMS', 'التكاملات: Google Tag Manager وGoogle Analytics وMeta Pixel وStripe وTap والرسائل النصية'),
  pmEmails: shot('pm', 'email-templates', 'Email templates for reservation confirmations, check-ins and cancellations', 'قوالب البريد لتأكيد الحجوزات وتسجيل الوصول والإلغاء'),
  spDashboard: shot('sp', 'dashboard', 'Accez service provider dashboard: bookings, revenue, rating and top services', 'لوحة تحكم مقدم الخدمة في أكسيز: الحجوزات والإيرادات والتقييم وأكثر الخدمات طلبًا'),
  spBookings: shot('sp', 'bookings', 'Bookings: accept, start, complete or mark a no-show', 'الحجوزات: القبول والبدء والإكمال أو تسجيل عدم الحضور'),
  spCustomers: shot('sp', 'customers', 'The customer list with visits, lifetime spend and last visit', 'قائمة العملاء مع عدد الزيارات وإجمالي الإنفاق وآخر زيارة'),
  spTeam: shot('sp', 'team', 'The team: each member has a login and their own services', 'الفريق: لكل عضو تسجيل دخول وخدماته الخاصة'),
  spHours: shot('sp', 'hours', 'Business hours with split shifts per day', 'ساعات العمل مع فترات متعددة في اليوم'),
  spPolicies: shot('sp', 'policies', 'Policies: business timezone and upfront deposit', 'السياسات: المنطقة الزمنية للنشاط والعربون المسبق'),
  spCalendar: shot('sp', 'calendar', 'The weekly booking calendar', 'تقويم الحجوزات الأسبوعي'),
  spIntegrations: shot('sp', 'integrations', 'Integrations: Tap payments, Stripe, analytics and SMS', 'التكاملات: مدفوعات Tap وStripe والتحليلات والرسائل النصية'),
} satisfies Record<string, Shot>

export type ShotKey = keyof typeof SHOTS

/** The two image widths produced for every screenshot. */
export const SHOT_WIDTHS = [1400, 2400] as const

export function shotSources(key: ShotKey, locale: Locale) {
  const s: Shot = SHOTS[key]
  const lang = locale === 'ar' && s.arabic ? 'ar' : 'en'
  const url = (w: number) => `/product/${s.app}/${lang}/${s.name}-${w}.webp`
  return {
    src: url(SHOT_WIDTHS[0]),
    srcSet: SHOT_WIDTHS.map((w) => `${url(w)} ${w}w`).join(', '),
    alt: s.alt[locale],
    /** Captured 1440 wide at 2x; the height is the screen's own. */
    width: 1440,
    height: (SIZES as Record<string, number>)[`${s.app}/${lang}/${s.name}`] ?? 900,
  }
}
