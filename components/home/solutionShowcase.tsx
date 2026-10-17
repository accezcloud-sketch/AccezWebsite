import type { ComponentType } from 'react'
import type { Bilingual } from '@/lib/platform/solutions'
import PmModulesVisual from '@/components/visuals/PmModulesVisual'
import SpListingVisual from '@/components/visuals/SpListingVisual'

export interface SolutionShowcase {
  Visual: ComponentType
  title: Bilingual
  points: Bilingual[]
}

/**
 * How each platform solution (keys from lib/platform/solutions.ts) is shown on
 * the homepage: a promise, what it covers, and a live visual. The full story
 * lives on the solution's own page. A new solution adds its entry here.
 */
export const SOLUTION_SHOWCASE: Record<string, SolutionShowcase> = {
  'property-managers': {
    Visual: PmModulesVisual,
    title: { en: 'Run every property from one place', ar: 'أدر كل عقار من مكان واحد' },
    points: [
      { en: 'Reservations with a channel manager and calendar sync', ar: 'حجوزات مع مدير قنوات ومزامنة التقويم' },
      { en: 'Work orders, units and leases in one system', ar: 'أوامر العمل والوحدات والعقود في نظام واحد' },
      { en: 'Owner statements and payouts', ar: 'كشوف الملاك ومدفوعاتهم' },
      { en: 'Sales pipelines, contracts and e-signing', ar: 'مسارات المبيعات والعقود والتوقيع الإلكتروني' },
      { en: 'Hotels and serviced apartments', ar: 'الفنادق والشقق المخدومة' },
    ],
  },
  'service-providers': {
    Visual: SpListingVisual,
    title: { en: 'Your business, booked and organised', ar: 'نشاطك، محجوز ومنظّم' },
    points: [
      { en: 'Your own booking page with services, prices and hours', ar: 'صفحة حجز خاصة بك بخدماتك وأسعارك وساعات عملك' },
      { en: 'Bookings from your own clients and new customers', ar: 'حجوزات من عملائك ومن عملاء جدد' },
      { en: 'Your team, schedules and reviews in one dashboard', ar: 'فريقك وجداولك وتقييماتك في لوحة تحكم واحدة' },
      { en: 'Free to list, lower fees as you grow', ar: 'الإدراج مجاني، ورسوم أقل مع نموك' },
    ],
  },
}
