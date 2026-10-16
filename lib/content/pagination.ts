/**
 * Pagination for blog listings (the index and each topic hub).
 * Page 1 lives at the base route; later pages at `<base>/page/<n>`.
 */

export const POSTS_PER_PAGE = 24

export function pageCount(total: number, perPage = POSTS_PER_PAGE): number {
  return Math.max(1, Math.ceil(total / perPage))
}

/** The items on a 1-based page; empty if the page is out of range. */
export function pageItems<T>(items: readonly T[], page: number, perPage = POSTS_PER_PAGE): T[] {
  if (!Number.isInteger(page) || page < 1) return []
  return items.slice((page - 1) * perPage, page * perPage)
}

/** Route of a page, without locale prefix: `blog`, `blog/page/2`, `blog/topic/x/page/3`. */
export function pageRoute(base: string, page: number): string {
  return page <= 1 ? base : `${base}/page/${page}`
}

/** Parses a `[page]` route segment; only canonical integers ≥ 2 are valid (page 1 is the base route). */
export function parsePageParam(value: string): number | null {
  return /^[1-9]\d*$/.test(value) && Number(value) >= 2 ? Number(value) : null
}
