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
import { subpageBySlug, subpageHref } from '@/lib/platform/subpages'

export interface ProductCtaContent {
  /** Where the product is explained, e.g. `/solutions/property-managers/sales-and-projects`. */
  route: string
  eyebrow: string
  title: string
  description: string
  learnMore: string
  bookDemo: string
  startFree: string
  /** The service provider box has one button: create a provider account. */
  providerSignUp?: string
}

/** A product page key, or the service provider solution for posts written for providers. */
export type ProductCtaKey = ProductPageKey | 'providers'

/** The page of the property management solution that covers each topic (lib/platform/subpages.ts). */
const PAGE: Record<Exclude<ProductPageKey, 'modules'>, string> = { owners: 'billing-and-payments', sales: 'sales-and-projects', hotels: 'reservations-and-stays' }

export function productCta(key: ProductCtaKey, locale: Locale): ProductCtaContent {
  const modules = MODULES_COPY[locale]
  const ar = locale === 'ar'
  const shared = { learnMore: modules.linked, bookDemo: modules.ctaPrimary, startFree: modules.ctaSecondary }

  if (key === 'providers') {
    const sp = solutionByKey('service-providers')!
    return {
      route: sp.href,
      eyebrow: sp.name[locale],
      title: sp.pageTitle[locale],
      description: sp.pageDescription[locale],
      ...shared,
      providerSignUp: sp.primaryAction.label[locale],
    }
  }

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
    route: subpageHref(subpageBySlug('property-managers', PAGE[key])!),
    eyebrow: ar ? s.eyebrowAr : s.eyebrow,
    title: ar ? s.ctaTitleAr : s.ctaTitle,
    description: ar ? s.subtitleAr : s.subtitle,
    ...shared,
  }
}
