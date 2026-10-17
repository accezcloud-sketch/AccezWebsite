'use client'

import { useTypewriter } from './useTypewriter'

/**
 * "One platform for <phrase>", the phrase typed in turn.
 *
 * The lead is written once. After it, screen readers and crawlers get every
 * phrase as one plain list ("vacation rentals, hotels and ..."), and the typed
 * line is hidden from assistive technology so nobody hears letters being
 * typed and deleted.
 */
export default function RotatingHeadline({
  lead,
  phrases,
  readAs,
  className = '',
}: {
  lead: string
  phrases: readonly string[]
  /** What follows the lead when read, e.g. "property managers and service providers". */
  readAs: string
  className?: string
}) {
  const { displayText, isTyping } = useTypewriter(phrases)
  return (
    <h1 className={`hero-display text-strong leading-[1.08] tracking-tight w-full min-w-0 ${className}`} style={{ fontSize: 'clamp(30px, 5.2vw, 54px)', fontWeight: 800 }}>
      {lead}{' '}
      <span className="sr-only">{readAs}</span>
      <span className="tw-line" aria-hidden="true">
        <span className="grad-text">{displayText || ' '}</span>
        <span className={`tw-cursor${isTyping ? ' pause' : ''}`} />
      </span>
    </h1>
  )
}
