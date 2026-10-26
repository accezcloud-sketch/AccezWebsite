import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { providerMarketplaceSchema } from '@/lib/content/siteSchema'
import type { Locale } from '@/lib/i18n'
import type { PlatformSolution } from '@/lib/platform/solutions'
import PropertyManagementPage from './PropertyManagementPage'
import ServiceProviderPage from '@/components/ServiceProviderPage'

interface SolutionPage {
  Page: ComponentType<{ locale: Locale }>
  /** Structured data for the page, if any. */
  schema?: (locale: Locale, description: string) => object
}

/**
 * The page for each platform solution (keys from lib/platform/solutions.ts),
 * served at /solutions/<key>/. A new solution adds its page here; its search
 * title and description live with the solution's data.
 */
export const SOLUTION_PAGES: Record<string, SolutionPage> = {
  'property-managers': {
    Page: PropertyManagementPage,
  },
  'service-providers': {
    Page: ServiceProviderPage,
    schema: providerMarketplaceSchema,
  },
}

export function solutionPageMetadata(solution: PlatformSolution, locale: Locale): Metadata {
  return staticPageMetadata({ route: solution.href, locale, title: solution.pageTitle[locale], description: solution.pageDescription[locale] })
}
