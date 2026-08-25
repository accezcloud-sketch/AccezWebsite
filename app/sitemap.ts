import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { localeUrl } from '@/lib/i18n'

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
  // Routes that exist in BOTH languages. /privacy and /terms are English-only
  // (the legal text has no Arabic translation), so they are listed once and
  // deliberately have no /ar counterpart — an Arabic URL serving English legal
  // text would be worse than no Arabic URL at all.
  const bilingual = ['', 'modules', 'owners', 'sales', 'hotels', 'service-providers', 'about', 'support', 'blog']
  const englishOnly = ['privacy', 'terms', 'refund-policy']

  const staticPages: MetadataRoute.Sitemap = [
    ...bilingual.flatMap((route) => [
      { url: localeUrl(route, 'en'), lastModified: STATIC_LAST_MODIFIED },
      { url: localeUrl(route, 'ar'), lastModified: STATIC_LAST_MODIFIED },
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

  return [...staticPages, ...blogPages]
}
