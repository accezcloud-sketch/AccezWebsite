/**
 * Site-level structured data (schema.org JSON-LD).
 *
 * Every block points at the single Organization defined in app/layout.tsx
 * (`#organization`) instead of restating the company, so search engines see
 * one entity, not several.
 */
import { localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { solutionByKey } from '@/lib/platform/solutions'
import { providerPlanPrices } from './providerPricing'
import { PM_PLAN_COUNT, pmMonthlyPrices } from './pmPlans'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** The pricing page of one solution, as an absolute URL (bare /pricing/ only redirects). */
export function pricingUrl(solutionKey: string, locale: Locale): string {
  const solution = solutionByKey(solutionKey)
  if (!solution) throw new Error(`Unknown solution: ${solutionKey}`)
  return localeUrl(solution.pricingHref, locale)
}

/** WebSite: the site name Google can show in results, in both languages. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Accez',
    alternateName: 'Accez Cloud',
    url: `${SITE_URL}/`,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': ORGANIZATION_ID },
  }
}

/**
 * The product, for the homepage in either language. The offers are the
 * property-management plans (prices from lib/content/pmPlans.ts, as the
 * plans section shows them), so they point at that pricing page.
 */
export function softwareApplicationSchema(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Accez',
    alternateName: 'Accez Cloud',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description,
    url: localeUrl('', locale),
    inLanguage: locale,
    provider: { '@id': ORGANIZATION_ID },
    // Full rich-result eligibility also needs aggregateRating or review; those
    // are deliberately absent because Accez has no published review data.
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'SAR',
      lowPrice: Math.min(...pmMonthlyPrices()),
      highPrice: Math.max(...pmMonthlyPrices()),
      offerCount: PM_PLAN_COUNT,
      availability: 'https://schema.org/InStock',
      url: pricingUrl('property-managers', locale),
    },
    featureList: [
      'Reservations & channel sync (Airbnb, Booking.com, Expedia)',
      'Rental & Sale Properties',
      'Owner Management & Payouts',
      'Sales & Developer Projects',
      'Contracts & E-signing',
      'Hotels & Serviced Apartments',
      'Work Orders',
      'Service Marketplace',
      'Marketing Campaigns',
    ],
  }
}

export { providerPlanPrices }

/** The service-provider marketplace, for the Service Providers page in either language. */
export function providerMarketplaceSchema(locale: Locale, description: string) {
  const prices = providerPlanPrices()
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: locale === 'ar' ? 'سوق مقدمي الخدمات في أكسيز' : 'Accez Service Provider Marketplace',
    serviceType: 'Online marketplace listing for service providers',
    provider: { '@id': ORGANIZATION_ID },
    areaServed: 'SA',
    description,
    inLanguage: locale,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'SAR',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: 'https://schema.org/InStock',
      url: pricingUrl('service-providers', locale),
    },
  }
}
