/**
 * Last-modified dates for the sitemap.
 *
 * Every static page carries the date its own content last changed, from
 * page-dates.json (written from git history by `node scripts/page-dates.mjs`;
 * see lib/build/pageDates.mjs). Pages that also list blog posts (homepage,
 * blog index, the property-management page) change whenever a post they show
 * is published or updated, so their date is the later of the two. Nothing
 * uses the build time, so the sitemap stays byte-identical between builds and
 * crawlers aren't sent back to unchanged pages.
 */
import type { ProductPageKey } from './productMatch'
import PAGE_DATES from './page-dates.json'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import { legalVersionRoutes } from '@/lib/legal/documents'
import { routeKey } from '@/lib/build/pageDates.mjs'

export interface DatedPost {
  date: string
  updated?: string
}

/** Pages whose content includes a strip of posts, and which posts they show. */
export const POST_LISTING_PAGES: Record<string, ProductPageKey | 'all'> = {
  '': 'all',
  blog: 'all',
  'solutions/property-managers': 'all',
}

/** The later of two `YYYY-MM-DD` dates. */
const later = (a: string, b: string) => (a > b ? a : b)

/** Most recent publish/update date among the posts, or `fallback` if none is newer. */
export function newestDate(posts: DatedPost[], fallback: string): string {
  return posts.reduce((acc, p) => later(acc, (p.updated || p.date || '').slice(0, 10)), fallback)
}

/** Every static page in the sitemap (both languages each), as route keys. */
export function sitemapStaticRoutes(): string[] {
  return [
    '', 'about',
    'support', 'blog', 'faq', 'terms', 'privacy', 'refund-policy',
    // One page per solution: its page, its pricing, and its version of each per-solution legal document.
    ...PLATFORM_SOLUTIONS.flatMap((s) => [s.href, s.pricingHref]),
    ...legalVersionRoutes(),
  ].map(routeKey)
}

/**
 * The day a static page's own content last changed. Throws for a page with no
 * entry, so a new page cannot silently get a made-up date: add its source
 * files to PAGE_SOURCES (lib/build/pageDates.mjs) and run the script.
 */
export function staticPageDate(route: string, dates: Record<string, string> = PAGE_DATES): string {
  const day = dates[routeKey(route)]
  if (!day) throw new Error(`No last-modified date for "/${routeKey(route)}": add it to PAGE_SOURCES in lib/build/pageDates.mjs and run node scripts/page-dates.mjs`)
  return day
}
