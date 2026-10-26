import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { providerMarketplaceSchema } from '@/lib/content/siteSchema'
import type { Locale } from '@/lib/i18n'
import type { PlatformSolution } from '@/lib/platform/solutions'
import PropertyManagementPage from './PropertyManagementPage'
import ServiceProviderPage from '@/components/ServiceProviderPage'

/** The provider page reads its language from context, so it takes no props. */
function ServiceProviderSolution() {
  return <ServiceProviderPage />
}

interface SolutionPage {
  Page: ComponentType<{ locale: Locale }>
  title: Record<Locale, string>
  description: Record<Locale, string>
  /** Structured data for the page, if any. */
  schema?: (locale: Locale, description: string) => object
}

/**
 * The page for each platform solution (keys from lib/platform/solutions.ts),
 * served at /solutions/<key>/. A new solution adds its page here.
 */
export const SOLUTION_PAGES: Record<string, SolutionPage> = {
  'property-managers': {
    Page: PropertyManagementPage,
    title: { en: 'Property management solution', ar: 'حل إدارة العقارات' },
    description: {
      en: 'Property management software for Saudi Arabia: reservations synced with Airbnb, Booking.com and Expedia, leases, rent, work orders, sales and payouts.',
      ar: 'برنامج إدارة العقارات في السعودية: حجوزات متزامنة مع Airbnb وBooking.com وExpedia، وعقود الإيجار، والإيجارات، وأوامر العمل، والمبيعات، ومدفوعات الملاك.',
    },
  },
  'service-providers': {
    Page: ServiceProviderSolution,
    title: { en: 'Service provider solution', ar: 'حل مقدمي الخدمات' },
    description: {
      en: 'Take bookings, manage your team and customers, and get found on the Accez marketplace. For barbers, salons, spas, coaches and every appointment business.',
      ar: 'استقبل الحجوزات، وأدر فريقك وعملاءك، ودع العملاء الجدد يجدونك في سوق أكسيز. للحلاقين والصالونات والسبا والمدربين وكل نشاط يعمل بالمواعيد.',
    },
    schema: providerMarketplaceSchema,
  },
}

export function solutionPageMetadata(solution: PlatformSolution, locale: Locale): Metadata {
  const page = SOLUTION_PAGES[solution.key]
  return staticPageMetadata({ route: solution.href, locale, title: page.title[locale], description: page.description[locale] })
}
