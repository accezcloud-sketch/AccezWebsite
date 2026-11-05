/**
 * The kinds of customer each solution serves, shown as cards under "Who it
 * is for" on the solution pages. Cards only, with no page each: a page per
 * kind of customer repeated the module pages' screens and text. The two
 * solutions stay separate.
 */
import type { Bilingual } from './solutions'

export interface CustomerType {
  /** Key of the solution (lib/platform/solutions.ts). */
  solution: string
  slug: string
  name: Bilingual
  summary: Bilingual
}

export const CUSTOMER_TYPES: CustomerType[] = [
  { solution: 'property-managers', slug: 'vacation-rentals', name: { en: 'Vacation rentals', ar: 'الإيجارات قصيرة الأجل' }, summary: { en: 'For holiday home, chalet and short stay managers', ar: 'لمديري بيوت العطلات والشاليهات والإقامات القصيرة' } },
  { solution: 'property-managers', slug: 'hotels-and-serviced-apartments', name: { en: 'Serviced apartments', ar: 'الشقق المخدومة' }, summary: { en: 'For serviced apartments and small hospitality properties, run unit by unit', ar: 'للشقق المخدومة ومنشآت الضيافة الصغيرة التي تُدار وحدةً وحدة' } },
  { solution: 'property-managers', slug: 'residential-and-compounds', name: { en: 'Residential and compounds', ar: 'المباني السكنية والمجمعات' }, summary: { en: 'Leases, rent, work orders and resident messages', ar: 'العقود والإيجارات وأوامر العمل ورسائل السكان' } },
  { solution: 'property-managers', slug: 'developers-and-sales-teams', name: { en: 'Developers and sales teams', ar: 'المطورون وفرق المبيعات' }, summary: { en: 'Projects, sale units and the sales path', ar: 'المشاريع ووحدات البيع ومسار المبيعات' } },
  { solution: 'service-providers', slug: 'barbers-and-salons', name: { en: 'Barbers and salons', ar: 'الحلاقون والصالونات' }, summary: { en: 'Bookings, a calendar and your clients', ar: 'الحجوزات والتقويم وعملاؤك' } },
  { solution: 'service-providers', slug: 'spas-and-wellness', name: { en: 'Spas and wellness', ar: 'السبا والعافية' }, summary: { en: 'Services, hours, deposits and gift cards', ar: 'الخدمات والساعات والعربون وبطاقات الهدايا' } },
  { solution: 'service-providers', slug: 'coaches-and-fitness', name: { en: 'Coaches and personal trainers', ar: 'المدربون الشخصيون' }, summary: { en: 'One-to-one sessions, hours and clients, with a listing', ar: 'الجلسات الفردية والساعات والعملاء، مع صفحة في السوق' } },
]

export function customerTypesOf(solution: string): CustomerType[] {
  return CUSTOMER_TYPES.filter((c) => c.solution === solution)
}
