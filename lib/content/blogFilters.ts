/**
 * Blog-list filters as URL query parameters.
 *
 * The tag chips under every post link to `/blog/?tag=<tag>`. The list page
 * reads that parameter (and `?topic=`) so the reader lands on posts with that tag, not on the
 * full unfiltered list. Pure functions; no DOM or framework.
 */

export interface BlogFilters {
  tag: string | null
  /** Topic key (see lib/content/topics.ts). */
  topic: string | null
}

/**
 * Tags are free text written by the content pipeline, so the same tag shows
 * up as "Property Management" and "property management". Compare them by
 * this key.
 */
export function tagKey(tag: string): string {
  return tag.trim().toLowerCase()
}

/** True when a post's tag list contains `tag`, ignoring case and spacing. */
export function hasTag(tags: readonly string[], tag: string): boolean {
  const wanted = tagKey(tag)
  return tags.some((t) => tagKey(t) === wanted)
}

/** Case-insensitive lookup returning the canonical spelling, or null. */
function matchKnown(value: string | null, known: readonly string[]): string | null {
  if (!value) return null
  const wanted = tagKey(value)
  return known.find((k) => tagKey(k) === wanted) ?? null
}

/**
 * Reads filters from a query string. Unknown values are dropped, so a stale
 * or hand-edited link never produces an empty "no posts found" page.
 */
export function parseBlogFilters(
  search: string,
  known: { tags: readonly string[]; topics: readonly string[] },
): BlogFilters {
  const params = new URLSearchParams(search)
  return {
    tag: matchKnown(params.get('tag'), known.tags),
    topic: matchKnown(params.get('topic'), known.topics),
  }
}

/** Query string for the given filters, e.g. `?tag=rent%20collection`, or `''`. */
export function blogFiltersQuery(filters: Partial<BlogFilters>): string {
  const params = new URLSearchParams()
  if (filters.topic) params.set('topic', filters.topic)
  if (filters.tag) params.set('tag', filters.tag)
  const query = params.toString()
  return query ? `?${query}` : ''
}

export interface FilterablePost {
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  tags: string[]
  topic: string
}

/** Applies the list's topic, tag and text filters. `null` / empty means "any". */
export function filterPosts<P extends FilterablePost>(
  posts: readonly P[],
  { topic, tag, query }: { topic?: string | null; tag?: string | null; query?: string },
): P[] {
  const q = query?.trim() ?? ''
  const qLower = q.toLowerCase()
  return posts.filter(
    (post) =>
      (!topic || post.topic === topic) &&
      (!tag || hasTag(post.tags, tag)) &&
      (!q ||
        post.title.toLowerCase().includes(qLower) ||
        post.excerpt.toLowerCase().includes(qLower) ||
        post.titleAr.includes(q) ||
        post.excerptAr.includes(q)),
  )
}
