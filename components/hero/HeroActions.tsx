import Link from 'next/link'

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
export default function HeroActions({ primary, secondary, align = 'center' }: { primary: HeroAction; secondary?: HeroAction; align?: 'center' | 'start' }) {
  return (
    <div className={`flex flex-col sm:flex-row flex-wrap gap-3 ${align === 'center' ? 'justify-center' : 'justify-center lg:justify-start'}`}>
      <ActionLink action={primary} className="ui-btn ui-btn-primary w-full sm:w-auto" />
      {secondary && <ActionLink action={secondary} className="ui-btn ui-btn-glass w-full sm:w-auto" />}
    </div>
  )
}
