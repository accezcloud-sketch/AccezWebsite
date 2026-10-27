'use client'

import { useEffect } from 'react'
import { classifyClick, trackEvent } from '@/lib/analytics/conversions'
import { rememberCampaign } from '@/lib/analytics/campaign'

/**
 * Records conversion clicks site-wide (sign-up, WhatsApp, Book a demo) from a
 * single listener, so every existing and future button is covered without
 * wiring each one. Renders nothing.
 */
export default function ConversionTracking() {
  useEffect(() => {
    // Remember where this visit came from, for the "Book a demo" Lead.
    rememberCampaign()
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return
      const hit = classifyClick(link.href)
      if (hit) trackEvent(hit.event, { ...hit.params, page_path: window.location.pathname })
    }
    // Capture phase: runs even if a handler further down stops propagation.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
