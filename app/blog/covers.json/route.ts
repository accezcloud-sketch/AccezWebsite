import { getAllPosts } from '@/lib/blog'

/**
 * The Unsplash photos already used as blog covers (/blog/covers.json).
 * The n8n blog workflow reads it before choosing a cover, so a new post never
 * reuses another post's photo. Unsplash photo ids are the last 11 characters
 * of the photo page address.
 */
export const dynamic = 'force-static'

export function GET() {
  const ids = new Set<string>()
  for (const post of getAllPosts()) {
    const path = (post.coverImageCreditUrl || '').match(/unsplash\.com\/photos\/([^/?#]+)/)
    if (path && path[1].length >= 11) ids.add(path[1].slice(-11))
  }
  return Response.json({ ids: [...ids].sort() })
}
