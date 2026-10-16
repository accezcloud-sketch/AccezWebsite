import { getAllPosts } from '@/lib/blog'
import { toPostCardData } from '@/lib/content/postCard'

/**
 * Card data for every post, as a static JSON file (/blog/search-index.json).
 * The paginated blog list loads it only when a reader searches or filters,
 * so search still covers every post while each page ships just its own cards.
 */
export const dynamic = 'force-static'

export function GET() {
  return Response.json(getAllPosts().map(toPostCardData))
}
