import type { CSSProperties, ReactNode } from 'react'
import Link from 'next/link'

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
    <section className="relative overflow-hidden w-full" style={{ background: 'var(--bg)' }}>
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: '75%', background: 'radial-gradient(125% 75% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)' }}
        aria-hidden="true"
      />
      <div className="page-top relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start w-full min-w-0">
            {eyebrow && (
              <span
                className="anim-fade-up-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
                style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}
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
          <div className="relative w-full min-w-0 flex justify-center lg:justify-end">{visual}</div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }} aria-hidden="true" />
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

function ActionLink({ action, className, style }: { action: HeroAction; className: string; style: CSSProperties }) {
  // In-page anchors and other sites are plain links; site pages use Link.
  if (action.external || action.href.includes('#')) {
    const ext = action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return <a href={action.href} {...ext} className={className} style={style}>{action.label} <Arrow /></a>
  }
  return <Link href={action.href} prefetch={false} className={className} style={style}>{action.label} <Arrow /></Link>
}

/** A primary and an optional secondary button, full width on phones. */
export function HeroActions({ primary, secondary }: { primary: HeroAction; secondary?: HeroAction }) {
  const base = 'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5'
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
      <ActionLink action={primary} className={`${base} text-white`} style={{ background: 'linear-gradient(135deg, var(--accent-solid), var(--accent-solid-hover))', fontSize: 15 }} />
      {secondary && (
        <ActionLink action={secondary} className={`${base} text-soft hover:text-strong`} style={{ background: 'var(--surface-hi)', border: '1px solid var(--border-hi)', fontSize: 15 }} />
      )}
    </div>
  )
}
