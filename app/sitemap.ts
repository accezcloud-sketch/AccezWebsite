import { MetadataRoute } from 'next'
import { getAllPosts, getPostsByTopic, getPostsForProduct } from '@/lib/blog'
import { newestDate, POST_LISTING_PAGES, sitemapStaticRoutes, staticPageDate } from '@/lib/content/lastModified'
import { TOPICS } from '@/lib/content/topics'
import { localeUrl } from '@/lib/i18n'

export const dynamic = 'force-static'

const baseUrl = 'https://www.accez.cloud'

// Static pages are dated by when their own content last changed (git history,
// see lib/content/lastModified.ts), never by the build time, so the sitemap
// stays byte-identical between builds and crawlers don't re-crawl every URL
// after every deploy. Blog dates fall back to the blog index's date.

// NOTE ON `changeFrequency` AND `priority`:
// Google has stated publicly that it ignores both. They are kept off this
// sitemap deliberately — they created a false impression that crawl behaviour
// was being steered when it wasn't. `lastModified` IS used, so that stays.
//
// URLs include the trailing slash to match `trailingSlash: true` in
// next.config.js and the canonical tags the pages emit. A sitemap that
// disagrees with the canonical wastes a crawl on the redirect.
export default function sitemap(): MetadataRoute.Sitemap {
  // Pages that show a strip of posts change when those posts do.
  const lastModifiedFor = (route: string): string => {
    const own = staticPageDate(route)
    const shows = POST_LISTING_PAGES[route]
    if (!shows) return own
    const posts = shows === 'all' ? getAllPosts() : getPostsForProduct(shows, Number.MAX_SAFE_INTEGER)
    return newestDate(posts, own)
  }
  const blogDate = staticPageDate('blog')

  // Every static route exists in both languages, including the legal pages.
  const staticPages: MetadataRoute.Sitemap = sitemapStaticRoutes().flatMap((route) => {
    const lastModified = lastModifiedFor(route)
    return [
      { url: localeUrl(route, 'en'), lastModified },
      { url: localeUrl(route, 'ar'), lastModified },
    ]
  })

  // Every post exists in both languages: the Arabic translation ships in the
  // same .md file, split on the <!-- AR --> marker.
  const blogPages: MetadataRoute.Sitemap = getAllPosts().flatMap((post) => {
    const lastModified = post.updated || post.date || blogDate
    return [
      { url: localeUrl(`blog/${post.slug}`, 'en'), lastModified },
      { url: localeUrl(`blog/${post.slug}`, 'ar'), lastModified },
    ]
  })

  // Topic hubs change whenever a post in the topic does.
  const topicPages: MetadataRoute.Sitemap = TOPICS.flatMap((topic) => {
    const lastModified = newestDate(getPostsByTopic(topic.key), blogDate)
    return [
      { url: localeUrl(`blog/topic/${topic.key}`, 'en'), lastModified },
      { url: localeUrl(`blog/topic/${topic.key}`, 'ar'), lastModified },
    ]
  })

  return [...staticPages, ...topicPages, ...blogPages]
}
