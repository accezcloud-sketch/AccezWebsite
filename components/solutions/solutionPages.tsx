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
      en: 'Property management for vacation rentals, hotels, residential communities and owner portfolios: reservations and 400+ channels, work orders, rental and sale properties, sales and projects, contracts and e-signing, owners and payouts.',
      ar: 'إدارة العقارات للإيجارات السياحية والفنادق والمجمعات السكنية ومحافظ الملاك: الحجوزات وأكثر من 400 قناة، وأوامر العمل، وعقارات الإيجار والبيع، والمبيعات والمشاريع، والعقود والتوقيع الإلكتروني، والملاك والمدفوعات.',
    },
  },
  'service-providers': {
    Page: ServiceProviderSolution,
    title: { en: 'Service provider solution', ar: 'حل مقدمي الخدمات' },
    description: {
      en: 'List your business on the Accez marketplace, take bookings from your own clients and get found by new customers. Barbers, salons, spas, fitness, photography and home services. See provider plans and pricing.',
      ar: 'أدرج نشاطك في سوق أكسيز، واستقبل الحجوزات من عملائك، وليجدك عملاء جدد. حلاقة وصالونات وسبا ولياقة وتصوير وخدمات منزلية.',
    },
    schema: providerMarketplaceSchema,
  },
}

export function solutionPageMetadata(solution: PlatformSolution, locale: Locale): Metadata {
  const page = SOLUTION_PAGES[solution.key]
  return staticPageMetadata({ route: solution.href, locale, title: page.title[locale], description: page.description[locale] })
}
