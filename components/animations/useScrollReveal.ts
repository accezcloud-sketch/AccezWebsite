'use client'

import { useEffect, useLayoutEffect, useState, type RefObject } from 'react'
import { useInView } from 'framer-motion'

/**
 * Scroll-triggered entrance animations that never hide server-rendered content.
 *
 * The previous components rendered `opacity: 0` into the static HTML, so every
 * animated section was invisible until JavaScript loaded and the animation ran
 * (69 blocks on the homepage): blank for crawlers that don't run JavaScript,
 * and a later Largest Contentful Paint for everyone.
 *
 * Phases:
 * - `static`: server HTML and the first client render. Content is visible.
 * - `armed`: set before the first paint, only for elements that start below
 *   the fold. They are off-screen, so hiding them causes no flicker.
 * - `revealed`: an armed element scrolled into view; it animates in.
 * Elements already on screen at load stay `static`, as do all elements for
 * readers who prefer reduced motion.
 */
export type RevealPhase = 'static' | 'armed' | 'revealed'

// useLayoutEffect warns during server rendering; it only matters in the browser.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function useScrollReveal(ref: RefObject<Element | null>, margin = '-80px 0px'): RevealPhase {
  const [phase, setPhase] = useState<RevealPhase>('static')
  const inView = useInView(ref, { once: true, margin: margin as `${number}px ${number}px` })

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const { top, bottom } = el.getBoundingClientRect()
    const onScreen = bottom > 0 && top < window.innerHeight
    if (!onScreen) setPhase('armed')
    // Runs once, on mount: only the initial position decides.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (inView && phase === 'armed') setPhase('revealed')
  }, [inView, phase])

  return phase
}
