/**
 * Copy for the homepage pricing overview, and metadata for each solution's
 * pricing page (/pricing/<solution>). The bare /pricing/ address redirects to
 * the property-manager plans (vercel.json), which is what it always showed.
 */
import type { Metadata } from 'next'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import type { Locale } from '@/lib/i18n'
import type { PlatformSolution } from './solutions'

export const PRICING_OVERVIEW_COPY = {
  en: {
    title: 'Pricing for every side of the platform',
    subtitle: 'Accez is one platform with two solutions, each with its own plans. Choose yours.',
    see: 'See plans',
    startsFree: 'Start free',
  },
  ar: {
    title: 'أسعار لكل جانب من المنصة',
    subtitle: 'أكسيز منصة واحدة بحلّين، لكل منهما خططه الخاصة. اختر ما يناسبك.',
    see: 'عرض الخطط',
    startsFree: 'ابدأ مجانًا',
  },
} as const

export function solutionPricingMetadata(solution: PlatformSolution, locale: Locale): Metadata {
  const ar = locale === 'ar'
  return staticPageMetadata({
    route: solution.pricingHref,
    locale,
    title: ar ? `الأسعار ${solution.audience.ar}` : `Pricing ${solution.audience.en.replace(/^For /, 'for ')}`,
    description: `${solution.name[locale]}: ${solution.summary[locale]} ${solution.pricingNote[locale]}.`,
  })
}
