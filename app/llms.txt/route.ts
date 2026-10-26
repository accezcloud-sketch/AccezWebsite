import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { buildLlmsTxt, type LlmsLink } from '@/lib/content/llms'
import { TOPICS } from '@/lib/content/topics'
import { localeUrl } from '@/lib/i18n'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'
import { solutionPricingMetadata } from '@/lib/platform/pricingPages'
import { PLATFORM_SOLUTIONS, solutionByKey } from '@/lib/platform/solutions'
import { solutionPageMetadata } from '@/components/solutions/solutionPages'
import { PM_PLAN_PRICES } from '@/lib/content/pmPlans'
import { PROVIDER_PRICING_COPY } from '@/lib/content/providerPricing'
import { subpageMetadata } from '@/components/solutions/subpageRoute'
import { subpageHref, subpagesOf } from '@/lib/platform/subpages'
import { INTEGRATIONS, INTEGRATIONS_HREF, integrationHref } from '@/lib/platform/integrations'
import { integrationMetadata } from '@/components/integrations/integrationRoute'
import { integrationsHubMetadata } from '@/components/integrations/IntegrationsHub'
import { metadata as faq } from '../faq/page'
import { metadata as about } from '../about/page'
import { metadata as support } from '../support/page'
import { metadata as regulationsHub } from '../resources/saudi-regulations/page'
import { metadata as calculator } from '../tools/rental-revenue-calculator/page'
import { metadata as downloads } from '../resources/downloads/page'
import { CALCULATOR_ROUTE, checklistRoute, DOWNLOADS_ROUTE, REGULATIONS_HUB_ROUTE } from '@/lib/resources/routes'
import { CHECKLISTS } from '@/lib/resources/checklists'

/**
 * /llms.txt, generated at build time from each page's own title and
 * description, so it always matches what the site says.
 */
export const dynamic = 'force-static'

const titleOf = (m: Metadata) => (typeof m.title === 'string' ? m.title : m.title && 'absolute' in m.title ? m.title.absolute : '')
const page = (route: string, m: Metadata): LlmsLink => ({
  title: titleOf(m),
  url: localeUrl(route, 'en'),
  description: m.description ?? undefined,
})

/** A solution's page, from its registry entry and its own metadata. */
const solutionPage = (key: string): LlmsLink => {
  const solution = solutionByKey(key)!
  return page(solution.href, solutionPageMetadata(solution, 'en'))
}

/** A solution's page followed by its module and customer pages. */
const solutionPages = (key: string): LlmsLink[] => [
  solutionPage(key),
  ...[...subpagesOf(key, 'module'), ...subpagesOf(key, 'audience')].map((p) => page(subpageHref(p), subpageMetadata(p, 'en'))),
]

export function GET() {
  const posts = getAllPosts()
  const body = buildLlmsTxt({
    name: SITE_NAME,
    summary: SITE_DESCRIPTION,
    details: [
      'Market: Saudi Arabia. The whole site is available in Arabic at https://www.accez.cloud/ar/.',
      `Accez is one platform with ${PLATFORM_SOLUTIONS.length} solutions: ${PLATFORM_SOLUTIONS.map((s) => `${s.name.en} (${s.audience.en.toLowerCase()})`).join(' and ')}. Each has its own plans and pricing page.`,
      `Property management plans: Free; Basic SAR ${PM_PLAN_PRICES.basic.monthly}/month; Professional SAR ${PM_PLAN_PRICES.professional.monthly}/month; Enterprise priced for each portfolio.`,
      `Service provider plans: ${PROVIDER_PRICING_COPY.en.plans.map((p) => `${p.name} (${p.price === 'Free' ? 'free' : `${p.price}/month`}, ${p.platformFee} platform fee per booking)`).join('; ')}.`,
    ],
    sections: [
      { heading: 'Property management solution', links: solutionPages('property-managers') },
      { heading: 'Service provider solution', links: solutionPages('service-providers') },
      {
        heading: 'Integrations',
        links: [page(INTEGRATIONS_HREF, integrationsHubMetadata('en')), ...INTEGRATIONS.map((i) => page(integrationHref(i.slug), integrationMetadata(i, 'en')))],
      },
      {
        heading: 'Pricing',
        links: PLATFORM_SOLUTIONS.map((s) => page(s.pricingHref, solutionPricingMetadata(s, 'en'))),
      },
      { heading: 'Company and help', links: [page('faq', faq), page('about', about), page('support', support)] },
      {
        heading: 'Free resources',
        links: [
          page(REGULATIONS_HUB_ROUTE, regulationsHub),
          page(CALCULATOR_ROUTE, calculator),
          page(DOWNLOADS_ROUTE, downloads),
          ...CHECKLISTS.map((c) => ({ title: c.title.en, url: localeUrl(checklistRoute(c.id), 'en'), description: c.summary.en })),
        ],
      },
      {
        heading: 'Blog topics',
        links: TOPICS.map((t) => ({ title: t.label.en, url: localeUrl(`blog/topic/${t.key}`, 'en') })),
      },
      {
        heading: 'Latest articles',
        links: posts.slice(0, 10).map((p) => ({ title: p.title, url: localeUrl(`blog/${p.slug}`, 'en'), description: p.metaDescription || p.excerpt })),
      },
    ],
  })
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
