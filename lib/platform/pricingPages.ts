/**
 * Copy and metadata for the pricing hub (/pricing) and each solution's
 * pricing page (/pricing/<solution>).
 */
import type { Metadata } from 'next'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import type { Locale } from '@/lib/i18n'
import type { PlatformSolution } from './solutions'

export const PRICING_HUB_COPY = {
  en: {
    eyebrow: 'Pricing',
    title: 'Pricing for every side of the platform',
    subtitle: 'Accez is one platform with two solutions, each with its own plans. Choose yours.',
    see: 'See plans',
    startsFree: 'Start free',
  },
  ar: {
    eyebrow: 'الأسعار',
    title: 'أسعار لكل جانب من المنصة',
    subtitle: 'أكسيز منصة واحدة بحلّين، لكل منهما خططه الخاصة. اختر ما يناسبك.',
    see: 'عرض الخطط',
    startsFree: 'ابدأ مجانًا',
  },
} as const

export function pricingHubMetadata(locale: Locale): Metadata {
  const c = PRICING_HUB_COPY[locale]
  return staticPageMetadata({ route: 'pricing', locale, title: locale === 'ar' ? 'الأسعار' : 'Pricing', description: `${c.title}. ${c.subtitle}` })
}

export function solutionPricingMetadata(solution: PlatformSolution, locale: Locale): Metadata {
  const ar = locale === 'ar'
  return staticPageMetadata({
    route: solution.pricingHref,
    locale,
    title: ar ? `الأسعار ${solution.audience.ar}` : `Pricing ${solution.audience.en.replace(/^For /, 'for ')}`,
    description: `${solution.name[locale]}: ${solution.summary[locale]} ${solution.pricingNote[locale]}.`,
  })
}
