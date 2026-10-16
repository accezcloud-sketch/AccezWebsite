/**
 * Last-modified dates for the sitemap.
 *
 * Pages that list blog posts (homepage, blog index, product pages) change
 * whenever a post they show is published or updated, so their date follows
 * the newest such post. Everything else keeps a fixed date, so the sitemap
 * stays byte-identical between builds and crawlers aren't sent back to
 * unchanged pages.
 */
import type { ProductPageKey } from './productMatch'

export interface DatedPost {
  date: string
  updated?: string
}

/** Pages whose content includes a strip of posts, and which posts they show. */
export const POST_LISTING_PAGES: Record<string, ProductPageKey | 'all'> = {
  '': 'all',
  blog: 'all',
  modules: 'all',
  owners: 'owners',
  hotels: 'hotels',
  sales: 'sales',
}

/** The later of two `YYYY-MM-DD` dates. */
const later = (a: string, b: string) => (a > b ? a : b)

/** Most recent publish/update date among the posts, or `fallback` if none is newer. */
export function newestDate(posts: DatedPost[], fallback: string): string {
  return posts.reduce((acc, p) => later(acc, (p.updated || p.date || '').slice(0, 10)), fallback)
}
