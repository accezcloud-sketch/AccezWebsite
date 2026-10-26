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

/**
 * Site-wide Organization entity.
 *
 * `sameAs` is what lets Google and AI systems resolve every scattered mention
 * of "Accez" — the X account, the LinkedIn page, the YouTube channel — to one
 * entity instead of several unrelated ones. The profiles were already linked in
 * the footer; this is the machine-readable version of the same facts.
 *
 * Rendered server-side as a raw <script> so it appears in the static HTML. Do
 * not switch this to next/script — that injects client-side and would make it
 * invisible to every crawler that doesn't execute JavaScript.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Accez',
    alternateName: 'Accez Cloud',
    legalName: 'Cloud Valley LLC',
    url: 'https://www.accez.cloud',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.accez.cloud/images/accez-logo.png',
    },
    description:
      'All-in-one property operations platform for Saudi Arabia. Reservations, rent, maintenance, owners, sales and hotels in one system, in Arabic and English.',
    // The office shown on the About page and in the contact section.
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Almalqa',
      addressLocality: 'Riyadh',
      addressCountry: 'SA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    sameAs: [
      'https://x.com/accez_cloud',
      'https://www.linkedin.com/company/accez-cloud/',
      'https://www.youtube.com/@accez-cloud',
      'https://www.instagram.com/accez.cloud',
      'https://www.facebook.com/profile.php?id=61569153550177',
    ],
  }
}

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
    // Only features in notes/PRODUCT_FACTS.md (no e-signing, no campaigns).
    featureList: [
      'Reservations and channel sync (Airbnb, Booking.com, Expedia)',
      'Availability calendar',
      'Leases and rent payments',
      'Owners and payouts',
      'Sale units and developer projects',
      'Billing, invoices and refunds',
      'Work orders',
      'Email templates, SMS and one inbox',
      'Service provider marketplace and bookings',
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
