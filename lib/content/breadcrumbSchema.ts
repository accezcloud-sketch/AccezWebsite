/**
 * BreadcrumbList structured data for a page's visible trail (Home > ... >
 * the page), with canonical URLs in the page's language.
 */
import { localeUrl, type Locale } from '@/lib/i18n'

export interface TrailItem {
  name: string
  /** Route without locale ('' is the homepage). */
  route: string
}

export function breadcrumbSchema(trail: TrailItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: localeUrl(item.route, locale),
    })),
  }
}

export const HOME_CRUMB: Record<Locale, string> = { en: 'Home', ar: 'الرئيسية' }
