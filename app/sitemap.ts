import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

const baseUrl = 'https://accez.cloud'

// Stable last-modified for static pages. Using a fixed date (instead of
// `new Date()`) keeps the sitemap byte-identical between builds, so crawlers
// don't re-crawl every URL after every deploy (which wastes edge requests).
const STATIC_LAST_MODIFIED = '2026-07-01'

export default function sitemap(): MetadataRoute.Sitemap {
  // IMPORTANT: only list pages that actually exist. Previously this listed
  // /pricing, /features and /about — none of which are real routes — so every
  // crawler that read the sitemap generated 404 edge requests. Pricing/features
  // are anchor sections on the home page (/#pricing, /#features), not pages.
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || STATIC_LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
