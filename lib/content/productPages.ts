/**
 * The call-to-action content for each product page, assembled from the copy
 * those pages already use. No new marketing wording lives here: titles and
 * descriptions come from lib/content/solutions.ts and modulesCopy.ts, so the
 * blog and the product pages can never drift apart.
 */
import type { Locale } from '@/lib/i18n'
import type { ProductPageKey } from './productMatch'
import { SOLUTIONS } from './solutions'
import { MODULES_COPY } from './modulesCopy'
import { solutionByKey } from '@/lib/platform/solutions'

export interface ProductCtaContent {
  /** Where the product is explained, e.g. `/solutions/property-managers#owners`. */
  route: string
  eyebrow: string
  title: string
  description: string
  learnMore: string
  bookDemo: string
  startFree: string
}

export function productCta(key: ProductPageKey, locale: Locale): ProductCtaContent {
  const modules = MODULES_COPY[locale]
  const ar = locale === 'ar'
  const shared = { learnMore: modules.linked, bookDemo: modules.ctaPrimary, startFree: modules.ctaSecondary }

  if (key === 'modules') {
    return {
      route: solutionByKey('property-managers')!.href,
      eyebrow: modules.eyebrow,
      title: modules.ctaTitle,
      description: modules.subtitle,
      ...shared,
    }
  }

  const s = SOLUTIONS[key]
  return {
    route: `${solutionByKey('property-managers')!.href}#${key}`,
    eyebrow: ar ? s.eyebrowAr : s.eyebrow,
    title: ar ? s.ctaTitleAr : s.ctaTitle,
    description: ar ? s.subtitleAr : s.subtitle,
    ...shared,
  }
}
