/**
 * Site-level structured data (schema.org JSON-LD).
 *
 * Every block points at the single Organization defined in app/layout.tsx
 * (`#organization`) instead of restating the company, so search engines see
 * one entity, not several.
 */
import { localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { PROVIDER_PRICING_COPY } from './providerPricing'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

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

/** The product, for the homepage in either language. Prices mirror components/Pricing.tsx. */
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
      lowPrice: 0,
      highPrice: 150,
      offerCount: 4,
      availability: 'https://schema.org/InStock',
      url: localeUrl('pricing', locale),
    },
    featureList: [
      'Reservations & 400+ Channel Sync',
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

/** Monthly provider plan prices in SAR, read from the plans copy ("Free" is 0). */
export function providerPlanPrices(): number[] {
  return PROVIDER_PRICING_COPY.en.plans.map((plan) => Number(plan.price.match(/\d+/)?.[0] ?? 0))
}

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
      url: `${localeUrl('solutions/service-providers', locale)}#provider-pricing`,
    },
  }
}
