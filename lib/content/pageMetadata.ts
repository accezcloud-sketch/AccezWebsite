/**
 * Metadata for a simple bilingual page: title, description, canonical with
 * reciprocal hreflang, and Open Graph with the default share image. A page's
 * own openGraph replaces the root layout's, so the image is set explicitly.
 */
import type { Metadata } from 'next'
import { alternatesFor, localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { translations } from '@/translations'

export function staticPageMetadata({
  route,
  locale,
  title,
  description,
}: {
  route: string
  locale: Locale
  title: string
  description: string
}): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(route, locale),
    openGraph: {
      title: `${title} | Accez`,
      description,
      type: 'website',
      url: localeUrl(route, locale),
      siteName: 'Accez',
      ...(locale === 'ar' ? { locale: 'ar_SA' } : {}),
      images: [{ url: `${SITE_URL}/images/og-image.png`, width: 1200, height: 630, alt: title }],
    },
  }
}

/** /pricing: wording from the pricing section's own copy. */
export function pricingPageMetadata(locale: Locale): Metadata {
  const { header, pricing } = translations[locale]
  return staticPageMetadata({
    route: 'pricing',
    locale,
    title: header.pricing,
    description: `${pricing.titleLead} ${pricing.titleAccent}. ${pricing.newSubtitle}`,
  })
}

/** /faq: wording from the FAQ section's own copy. */
export function faqPageMetadata(locale: Locale): Metadata {
  const { faq } = translations[locale]
  return staticPageMetadata({ route: 'faq', locale, title: faq.title, description: faq.subtitle })
}
