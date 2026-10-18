import type { ReactNode } from 'react'
import Link from 'next/link'
import PointerTilt from './PointerTilt'

/**
 * The top of the homepage and of each solution page: text on one side, a
 * product visual on the other, stacked on phones (text first).
 */
export default function HeroLayout({
  eyebrow,
  headline,
  subtitle,
  actions,
  footer,
  visual,
}: {
  eyebrow?: string
  headline: ReactNode
  subtitle: string
  actions?: ReactNode
  /** Below the actions, e.g. the solution doors or a partner strip. */
  footer?: ReactNode
  visual: ReactNode
}) {
  return (
    // On laptops the first screen is filled, so the next section never peeks in.
    <section className="relative overflow-hidden w-full lg:min-h-[100svh] lg:flex lg:items-center" style={{ background: 'var(--section-bg, var(--bg))' }}>
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: '75%', background: 'radial-gradient(125% 75% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)' }}
        aria-hidden="true"
      />
      <div className="page-top relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start w-full min-w-0">
            {eyebrow && (
              <span
                className="anim-fade-up-2 ui-chip mb-5"
              >
                {eyebrow}
              </span>
            )}
            <div className="anim-fade-up-2 w-full mb-5">{headline}</div>
            <p className="anim-fade-up-3 text-muted leading-relaxed w-full max-w-lg mb-8" style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}>
              {subtitle}
            </p>
            {actions && <div className="anim-fade-up-4 w-full mb-10">{actions}</div>}
            {footer && <div className="anim-fade-up-5 w-full">{footer}</div>}
          </div>
          <div className="relative w-full min-w-0 flex justify-center lg:justify-end"><PointerTilt>{visual}</PointerTilt></div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--section-bg, var(--bg)))' }} aria-hidden="true" />
    </section>
  )
}

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export interface HeroAction {
  label: string
  href: string
  external?: boolean
}

function ActionLink({ action, className }: { action: HeroAction; className: string }) {
  // In-page anchors and other sites are plain links; site pages use Link.
  if (action.external || action.href.includes('#')) {
    const ext = action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return <a href={action.href} {...ext} className={className}>{action.label} <Arrow /></a>
  }
  return <Link href={action.href} prefetch={false} className={className}>{action.label} <Arrow /></Link>
}

/** A primary and an optional secondary button, full width on phones. */
export function HeroActions({ primary, secondary }: { primary: HeroAction; secondary?: HeroAction }) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
      <ActionLink action={primary} className="ui-btn ui-btn-primary w-full sm:w-auto" />
      {secondary && <ActionLink action={secondary} className="ui-btn ui-btn-glass w-full sm:w-auto" />}
    </div>
  )
}
