'use client'

import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'

export interface LegalSection {
  id: string
  title: string
}

interface LegalLayoutProps {
  title: string
  subtitle: string
  lastUpdated: string
  effectiveDate?: string
  sections: LegalSection[]
  children: ReactNode
}

/**
 * Shared shell for the legal pages.
 *
 * The previous legal pages were built on a light theme (bg-gray-50, white
 * cards, blue links) while every other page on the site is dark. They read as a
 * different website, which is the opposite of what a legal page should do —
 * these are the pages a cautious buyer checks before signing, so they have to
 * look like they belong to the same company.
 *
 * This uses the site's own tokens from globals.css, keeps a sticky contents
 * rail on wide screens, and uses logical properties (ps-/pe-/border-s) so the
 * layout mirrors correctly if these pages are ever localised to Arabic.
 */
export default function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  sections,
  children,
}: LegalLayoutProps) {
  const { language } = useLanguage()

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />

      {/* Masthead */}
      <section className="relative overflow-hidden page-top pb-10">
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '100%',
            background:
              'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)',
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
              style={{
                background: 'var(--accent-dim)',
                border: '1px solid var(--accent-line)',
                color: 'var(--accent-hi)',
              }}
            >
              Legal
            </span>
            <h1
              className="text-white font-bold tracking-tight mb-4"
              style={{
                fontSize: 'clamp(30px, 4.5vw, 46px)',
                fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
                fontWeight: 800,
              }}
            >
              {title}
            </h1>
            <p className="leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
            <div
              className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              {effectiveDate && (
                <span>
                  Effective:{' '}
                  <span style={{ color: 'var(--text)' }}>{effectiveDate}</span>
                </span>
              )}
              <span>
                Last updated: <span style={{ color: 'var(--text)' }}>{lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container mx-auto px-4 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)] gap-10 max-w-6xl mx-auto">
            {/* Contents rail */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <nav aria-label="Contents">
                <h2
                  className="text-xs font-semibold uppercase tracking-[0.14em] mb-4"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Contents
                </h2>
                <ol className="space-y-0">
                  {sections.map((s, i) => (
                    <li
                      key={s.id}
                      style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}
                    >
                      <a
                        href={`#${s.id}`}
                        className="block py-2 text-sm leading-snug transition-colors hover:text-white"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>

                <div
                  className="mt-8 pt-6 flex flex-col gap-2 text-sm"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <a href={localeHref('/terms', language)} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
                    Terms of Service
                  </a>
                  <a href={localeHref('/privacy', language)} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
                    Privacy Policy
                  </a>
                  <a href={localeHref('/refund-policy', language)} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
                    Refund &amp; Cancellation
                  </a>
                </div>
              </nav>
            </aside>

            {/* Document */}
            <article className="legal-doc min-w-0">{children}</article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/** One numbered section of a legal document. */
export function LegalSectionBlock({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 mb-14">
      <h2
        className="text-white font-bold tracking-tight mb-4"
        style={{
          fontSize: 'clamp(20px, 2.4vw, 26px)',
          fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
        }}
      >
        {title}
      </h2>
      <div className="legal-body space-y-4">{children}</div>
    </section>
  )
}

/** A callout for terms a reader must not miss — fees, liability, deadlines. */
export function LegalCallout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warning'
  title?: string
  children: ReactNode
}) {
  const accent = tone === 'warning' ? '#E0A44B' : 'var(--accent)'
  return (
    <div
      className="my-6 rounded-xl p-5"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderInlineStartWidth: 3,
        borderInlineStartColor: accent,
      }}
    >
      {title && (
        <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
          {title}
        </p>
      )}
      <div className="legal-body space-y-3">{children}</div>
    </div>
  )
}

/** Responsive table wrapper — legal docs carry fee and refund tables. */
export function LegalTable({
  head,
  rows,
  caption,
}: {
  head: string[]
  rows: ReactNode[][]
  caption?: string
}) {
  return (
    <figure className="my-6">
      <div
        className="overflow-x-auto rounded-xl"
        style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: 460 }}>
          <thead>
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  className="text-start px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border-hi)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 align-top"
                    style={{
                      color: 'var(--text-muted)',
                      borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border)',
                    }}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
