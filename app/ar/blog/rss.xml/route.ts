import { getAllPosts } from '@/lib/blog'
import { buildRssFeed } from '@/lib/content/rss'

// The blog's RSS feed, generated at build time.
export const dynamic = 'force-static'

export function GET() {
  return new Response(buildRssFeed(getAllPosts(), 'ar'), {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  })
}
