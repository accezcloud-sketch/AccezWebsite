import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { buildLlmsTxt, type LlmsLink } from '@/lib/content/llms'
import { TOPICS } from '@/lib/content/topics'
import { localeUrl } from '@/lib/i18n'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'
import { metadata as modules } from '../modules/page'
import { metadata as owners } from '../owners/page'
import { metadata as hotels } from '../hotels/page'
import { metadata as sales } from '../sales/page'
import { metadata as providers } from '../service-providers/page'
import { solutionPricingMetadata, pricingHubMetadata } from '@/lib/platform/pricingPages'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import { metadata as faq } from '../faq/page'
import { metadata as about } from '../about/page'
import { metadata as support } from '../support/page'

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

export function GET() {
  const posts = getAllPosts()
  const body = buildLlmsTxt({
    name: SITE_NAME,
    summary: SITE_DESCRIPTION,
    details: [
      'Market: Saudi Arabia. The whole site is available in Arabic at https://www.accez.cloud/ar/.',
      `Accez is one platform with ${PLATFORM_SOLUTIONS.length} solutions: ${PLATFORM_SOLUTIONS.map((s) => `${s.name.en} (${s.audience.en.toLowerCase()})`).join(' and ')}. Each has its own plans and pricing page.`,
    ],
    sections: [
      {
        heading: 'Property management',
        links: [page('modules', modules), page('owners', owners), page('hotels', hotels), page('sales', sales)],
      },
      { heading: 'Service provider marketplace', links: [page('service-providers', providers)] },
      {
        heading: 'Pricing',
        links: [
          page('pricing', pricingHubMetadata('en')),
          ...PLATFORM_SOLUTIONS.map((s) => page(s.pricingHref, solutionPricingMetadata(s, 'en'))),
        ],
      },
      { heading: 'Company and help', links: [page('faq', faq), page('about', about), page('support', support)] },
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
