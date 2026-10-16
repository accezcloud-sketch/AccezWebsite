'use client'

import { useEffect, useState } from 'react'
import type { PostCardData } from '@/lib/content/postCard'

const INDEX_URL = '/blog/search-index.json'

/**
 * Loads card data for every post the first time `enabled` becomes true (a
 * reader starts searching or filtering), then keeps it. Returns null until
 * loaded, or if loading fails, so callers can fall back to the posts on the
 * current page.
 */
export function useSearchIndex(enabled: boolean): PostCardData[] | null {
  const [index, setIndex] = useState<PostCardData[] | null>(null)

  useEffect(() => {
    if (!enabled || index) return
    let cancelled = false
    fetch(INDEX_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: PostCardData[] | null) => {
        if (!cancelled && Array.isArray(data)) setIndex(data)
      })
      .catch(() => {
        // Offline or blocked: filtering keeps working on the current page.
      })
    return () => {
      cancelled = true
    }
  }, [enabled, index])

  return index
}
