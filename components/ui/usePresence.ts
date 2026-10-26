'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Keeps a panel mounted while it animates out, for the CSS transitions in
 * globals.css ("Interface motion"). `mounted` says whether to render it (true
 * in the same render that opens it); `shown` goes true one frame later, so
 * the opening transition runs, and false at once on closing, after which
 * `mounted` stays true for `exitMs` so the closing transition can play.
 */
export function usePresence(open: boolean, exitMs: number): { mounted: boolean; shown: boolean } {
  const [shown, setShown] = useState(open)
  const [closing, setClosing] = useState(false)
  const wasOpen = useRef(open)

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      setClosing(false)
      // Two frames: the closed state is painted before the open one.
      let second = 0
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setShown(true))
      })
      return () => {
        cancelAnimationFrame(first)
        cancelAnimationFrame(second)
      }
    }
    setShown(false)
    if (!wasOpen.current) return
    wasOpen.current = false
    setClosing(true)
    const timer = setTimeout(() => setClosing(false), exitMs)
    return () => clearTimeout(timer)
  }, [open, exitMs])

  return { mounted: open || closing, shown: open && shown }
}
