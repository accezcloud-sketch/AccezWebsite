import Link from 'next/link'
import type { ReactNode } from 'react'
import { localeHref, type Locale } from '@/lib/i18n'
import type { PlatformSolution } from '@/lib/platform/solutions'

const COPY = {
  en: { explore: 'Explore', pricing: 'Pricing' },
  ar: { explore: 'استكشف', pricing: 'الأسعار' },
} as const

/**
 * One solution's chapter on the homepage: a numbered band that says who the
 * following sections are for, then those sections. Every solution gets the
 * same band, so none of them reads as an add-on to another.
 */
export default function SolutionChapter({
  solution,
  index,
  locale,
  children,
}: {
  solution: PlatformSolution
  index: number
  locale: Locale
  children: ReactNode
}) {
  const c = COPY[locale]
  const number = String(index + 1).padStart(2, '0')
  const arrow = (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <div id={`solution-${solution.key}`}>
      <div style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16">
          <div
            className="solution-chapter flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-[var(--radius-lg)] px-6 py-5"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span
                className="shrink-0 grid place-items-center rounded-[var(--radius-sm)] font-bold tabular-nums"
                style={{ width: 44, height: 44, background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)', fontFamily: 'var(--font-heading), system-ui, sans-serif' }}
                aria-hidden="true"
              >
                {number}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--accent-hi)' }}>
                  {solution.audience[locale]}
                </p>
                <p className="text-strong font-bold" style={{ fontSize: 19, fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>
                  {solution.name[locale]}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 text-sm font-semibold">
              <Link href={localeHref(solution.href, locale)} prefetch={false} className="inline-flex items-center gap-1.5 hover:text-strong transition-colors" style={{ color: 'var(--accent-hi)' }}>
                {c.explore} {arrow}
              </Link>
              <Link href={localeHref(solution.pricingHref, locale)} prefetch={false} className="text-soft hover:text-strong transition-colors">
                {c.pricing}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
