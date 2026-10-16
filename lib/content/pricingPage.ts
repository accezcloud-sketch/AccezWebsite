/**
 * Metadata for the Pricing page, built from the pricing section's existing
 * copy (translations/*.ts), so the page says exactly what the plans say.
 */
import type { Metadata } from 'next'
import { alternatesFor, localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { translations } from '@/translations'

export function pricingPageMetadata(locale: Locale): Metadata {
  const { header, pricing } = translations[locale]
  const title = header.pricing
  const description = `${pricing.titleLead} ${pricing.titleAccent}. ${pricing.newSubtitle}`
  return {
    title,
    description,
    alternates: alternatesFor('pricing', locale),
    openGraph: {
      title: `${title} | Accez`,
      description,
      type: 'website',
      url: localeUrl('pricing', locale),
      siteName: 'Accez',
      ...(locale === 'ar' ? { locale: 'ar_SA' } : {}),
      images: [{ url: `${SITE_URL}/images/og-image.png`, width: 1200, height: 630, alt: title }],
    },
  }
}
