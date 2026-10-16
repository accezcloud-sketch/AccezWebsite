'use client'

import { useEffect, useRef } from 'react'
import { blogFiltersQuery, parseBlogFilters } from '@/lib/content/blogFilters'

const ALL = 'all'

interface Options {
  tag: string
  category: string
  setTag: (tag: string) => void
  setCategory: (category: string) => void
  knownTags: readonly string[]
  knownCategories: readonly string[]
}

/**
 * Keeps the blog list's tag/category filters in the URL.
 *
 * On load it applies `?tag=` / `?category=` (so the tag chips under a post
 * open a filtered list); afterwards every filter change is written back with
 * `replaceState`, so a filtered view can be shared and survives a reload.
 * The server-rendered HTML is unaffected: it always lists every post.
 */
export function useBlogFiltersInUrl({ tag, category, setTag, setCategory, knownTags, knownCategories }: Options) {
  const appliedFromUrl = useRef(false)

  useEffect(() => {
    // Declared before the read effect on purpose: effects run in order, so on
    // the first pass this one sees the ref still false and skips, instead of
    // overwriting the incoming ?tag= before the state update lands.
    if (!appliedFromUrl.current) return
    const query = blogFiltersQuery({
      tag: tag === ALL ? null : tag,
      category: category === ALL ? null : category,
    })
    const next = `${window.location.pathname}${query}${window.location.hash}`
    if (next !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(null, '', next)
    }
  }, [tag, category])

  useEffect(() => {
    const filters = parseBlogFilters(window.location.search, { tags: knownTags, categories: knownCategories })
    if (filters.tag) setTag(filters.tag)
    if (filters.category) setCategory(filters.category)
    appliedFromUrl.current = true
    // Runs once on mount: the URL is only read on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
