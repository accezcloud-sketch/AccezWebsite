/**
 * Structured data (schema.org JSON-LD) for the resource pages: each is a
 * WebPage with a BreadcrumbList matching its visible trail, and the
 * calculator is also a free WebApplication. No ratings or reviews: there are
 * none to show.
 */
import { localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { ORGANIZATION_ID } from '@/lib/content/siteSchema'

export interface SchemaCrumb {
  name: string
  /** Route without locale prefix ('' is the homepage). */
  route: string
}

export function breadcrumbSchema(crumbs: SchemaCrumb[], locale: Locale): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: localeUrl(c.route, locale),
    })),
  }
}

export function webPageSchema({
  route, locale, name, description, type = 'WebPage', dateModified,
}: {
  route: string
  locale: Locale
  name: string
  description: string
  type?: 'WebPage' | 'CollectionPage'
  dateModified?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: localeUrl(route, locale),
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    isPartOf: { '@type': 'WebSite', url: SITE_URL },
    publisher: { '@id': ORGANIZATION_ID },
    ...(dateModified ? { dateModified } : {}),
  }
}

export function webApplicationSchema({
  route, locale, name, description,
}: {
  route: string
  locale: Locale
  name: string
  description: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: localeUrl(route, locale),
    inLanguage: locale === 'ar' ? 'ar' : 'en',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'SAR' },
    publisher: { '@id': ORGANIZATION_ID },
  }
}
