import { MetadataRoute } from 'next'
import { getAllPosts, getPostsByTopic, getPostsForProduct } from '@/lib/blog'
import { newestDate, POST_LISTING_PAGES } from '@/lib/content/lastModified'
import { TOPICS } from '@/lib/content/topics'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import { localeUrl } from '@/lib/i18n'
import { legalVersionRoutes } from '@/lib/legal/documents'

export const dynamic = 'force-static'

const baseUrl = 'https://www.accez.cloud'

// Stable last-modified for static pages. Using a fixed date (instead of
// `new Date()`) keeps the sitemap byte-identical between builds, so crawlers
// don't re-crawl every URL after every deploy (which wastes edge requests).
const STATIC_LAST_MODIFIED = '2026-07-01'

// NOTE ON `changeFrequency` AND `priority`:
// Google has stated publicly that it ignores both. They are kept off this
// sitemap deliberately — they created a false impression that crawl behaviour
// was being steered when it wasn't. `lastModified` IS used, so that stays.
//
// URLs include the trailing slash to match `trailingSlash: true` in
// next.config.js and the canonical tags the pages emit. A sitemap that
// disagrees with the canonical wastes a crawl on the redirect.
export default function sitemap(): MetadataRoute.Sitemap {
  // Every static route now exists in both languages, including the legal pages.
  const bilingual = [
    '', 'modules', 'owners', 'sales', 'hotels', 'service-providers', 'about',
    'support', 'blog', 'pricing', 'faq', 'terms', 'privacy', 'refund-policy', 'legal',
    // One page per solution: its pricing, and its version of each per-solution legal document.
    ...PLATFORM_SOLUTIONS.map((s) => s.pricingHref),
    ...legalVersionRoutes(),
  ]
  const englishOnly: string[] = []

  // Pages that show a strip of posts change when those posts do.
  const lastModifiedFor = (route: string): string => {
    const shows = POST_LISTING_PAGES[route]
    if (!shows) return STATIC_LAST_MODIFIED
    const posts = shows === 'all' ? getAllPosts() : getPostsForProduct(shows, Number.MAX_SAFE_INTEGER)
    return newestDate(posts, STATIC_LAST_MODIFIED)
  }

  const staticPages: MetadataRoute.Sitemap = [
    ...bilingual.flatMap((route) => [
      { url: localeUrl(route, 'en'), lastModified: lastModifiedFor(route) },
      { url: localeUrl(route, 'ar'), lastModified: lastModifiedFor(route) },
    ]),
    ...englishOnly.map((route) => ({
      url: localeUrl(route, 'en'),
      lastModified: STATIC_LAST_MODIFIED,
    })),
  ]

  // Every post exists in both languages: the Arabic translation ships in the
  // same .md file, split on the <!-- AR --> marker.
  const blogPages: MetadataRoute.Sitemap = getAllPosts().flatMap((post) => {
    const lastModified = post.updated || post.date || STATIC_LAST_MODIFIED
    return [
      { url: localeUrl(`blog/${post.slug}`, 'en'), lastModified },
      { url: localeUrl(`blog/${post.slug}`, 'ar'), lastModified },
    ]
  })

  // Topic hubs change whenever a post in the topic does.
  const topicPages: MetadataRoute.Sitemap = TOPICS.flatMap((topic) => {
    const lastModified = newestDate(getPostsByTopic(topic.key), STATIC_LAST_MODIFIED)
    return [
      { url: localeUrl(`blog/topic/${topic.key}`, 'en'), lastModified },
      { url: localeUrl(`blog/topic/${topic.key}`, 'ar'), lastModified },
    ]
  })

  return [...staticPages, ...topicPages, ...blogPages]
}
