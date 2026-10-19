import type { Bilingual } from '@/lib/platform/solutions'
import type { ShotKey } from '@/lib/product/shots'

export interface SolutionShowcase {
  /** The solution's dashboard, shown in the homepage hero. */
  dashboard: ShotKey
  /** A second real screen for its row in the homepage tour. */
  shot: ShotKey
  title: Bilingual
  points: Bilingual[]
}

/**
 * How each platform solution (keys from lib/platform/solutions.ts) is shown on
 * the homepage: real screens, a promise and three things it does. The full
 * story lives on the solution's own page. A new solution adds its entry here.
 */
export const SOLUTION_SHOWCASE: Record<string, SolutionShowcase> = {
  'property-managers': {
    dashboard: 'pmDashboard',
    shot: 'pmCalendar',
    title: { en: 'Run every property from one place', ar: 'أدر كل عقار من مكان واحد' },
    points: [
      { en: 'Reservations synced with Airbnb, Booking.com and Expedia', ar: 'حجوزات متزامنة مع Airbnb وBooking.com وExpedia' },
      { en: 'Sale units, sales path and contracts', ar: 'وحدات البيع ومسار المبيعات والعقود' },
      { en: 'Leases, rent payments and billing', ar: 'عقود الإيجار ودفعات الإيجار والفوترة' },
    ],
  },
  'service-providers': {
    dashboard: 'spDashboard',
    shot: 'spBookings',
    title: { en: 'Your business, booked and organised', ar: 'نشاطك، محجوز ومنظّم' },
    points: [
      { en: 'Bookings from your own clients', ar: 'حجوزات من عملائك' },
      { en: 'Customers with visits and spend', ar: 'العملاء مع الزيارات والإنفاق' },
      { en: 'Calendar, team and business hours', ar: 'التقويم والفريق وساعات العمل' },
    ],
  },
}
