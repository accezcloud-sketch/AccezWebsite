'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { AUDIENCE_STORAGE_KEY, type Audience, type AudienceView } from '@/components/legal/audience'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'

/**
 * The audience the reader has selected, plus this document's section map.
 * Sections read both to decide whether to render in full or collapsed.
 */
const AudienceContext = createContext<{ view: AudienceView; map: Record<string, Audience> }>({
  view: 'pm',
  map: {},
})

interface LegalLayoutProps {
  /** Section id -> audience. Anything absent is treated as 'all'. */
  audienceMap?: Record<string, Audience>
  title: string
  subtitle: string
  lastUpdated: string
  effectiveDate?: string
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
  children,
  audienceMap = {},
}: LegalLayoutProps) {
  /**
   * Which version of the document the reader is looking at.
   *
   * Seeded to 'pm' so the server-rendered HTML is deterministic, then
   * corrected from the reader's last choice after mount. Note that BOTH
   * versions are always present in the HTML and the inactive one is hidden in
   * CSS — if the other audience's clauses were dropped from the markup they
   * would be invisible to search engines and to the AI crawlers that never run
   * JavaScript, and a reader could argue a term was never published to them.
   */
  const [view, setView] = useState<AudienceView>('pm')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUDIENCE_STORAGE_KEY)
      if (saved === 'pm' || saved === 'sp') setView(saved)
    } catch {
      // Storage blocked — the default view is still correct.
    }
  }, [])

  const chooseView = (next: AudienceView) => {
    setView(next)
    try {
      localStorage.setItem(AUDIENCE_STORAGE_KEY, next)
    } catch {
      // Preference simply will not persist.
    }
  }
  const { language } = useLanguage()

  /**
   * Chrome labels. These were hardcoded English, so an Arabic reader saw
   * "Legal", "Effective:", "Last updated:", "Contents" and the English policy
   * names on an otherwise fully Arabic page — and those labels sit on the
   * version a Saudi court would read.
   */
  const ar = language === 'ar'
  const L = {
    legal: ar ? 'قانوني' : 'Legal',
    effective: ar ? 'تاريخ النفاذ:' : 'Effective:',
    updated: ar ? 'آخر تحديث:' : 'Last updated:',
    contents: ar ? 'المحتويات' : 'Contents',
    terms: ar ? 'شروط الخدمة' : 'Terms of Service',
    privacy: ar ? 'سياسة الخصوصية' : 'Privacy Policy',
    refund: ar ? 'سياسة الاسترداد والإلغاء' : 'Refund & Cancellation',
    pm: ar ? 'إدارة الأملاك' : 'Property management',
    sp: ar ? 'مقدمو الخدمات' : 'Service provider',
    readingPm: ar
      ? 'أنت تقرأ نسخة إدارة الأملاك من هذه الوثيقة.'
      : 'You are reading the property management version of this document.',
    readingSp: ar
      ? 'أنت تقرأ نسخة مقدّمي الخدمات من هذه الوثيقة.'
      : 'You are reading the service provider version of this document.',
    switchHint: ar ? 'بدّل بالأعلى لعرض النسخة الأخرى.' : 'Switch above to read the other version.',
  }

  const OPTIONS: { value: AudienceView; label: string }[] = [
    { value: 'pm', label: L.pm },
    { value: 'sp', label: L.sp },
  ]

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
          <div className="mx-auto" style={{ maxWidth: 820 }}>
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
              {effectiveDate && effectiveDate !== lastUpdated && (
                <span>
                  {L.effective}{' '}
                  <span style={{ color: 'var(--text)' }}>{effectiveDate}</span>
                </span>
              )}
              <span>
                {L.updated} <span style={{ color: 'var(--text)' }}>{lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container mx-auto px-4 pt-10">
          {/* Single column. The contents rail that used to sit beside this was
              removed: the document reads as one block with a single left and
              right edge, the way a printed contract does. The three sibling
              links it carried are repeated below the document instead. */}
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            {/* Which version you are reading. Two views only — a combined
                view is what made these documents confusing in the first place. */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {view === 'pm' ? L.readingPm : L.readingSp}{' '}
                <span style={{ color: 'var(--text-faint)' }}>{L.switchHint}</span>
              </p>
              <div
                role="group"
                className="inline-flex rounded-lg overflow-hidden shrink-0 ms-auto"
                style={{ border: '1px solid var(--border-hi)' }}
              >
                {OPTIONS.map((o) => {
                  const active = view === o.value
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => chooseView(o.value)}
                      className="px-3.5 py-2 text-sm font-semibold transition-colors"
                      style={{
                        background: active ? 'var(--accent)' : 'transparent',
                        color: active ? '#fff' : 'var(--text-muted)',
                      }}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <AudienceContext.Provider value={{ view, map: audienceMap }}>
              <article className="legal-doc min-w-0" data-audience={view}>
                {children}
              </article>
            </AudienceContext.Provider>

            <nav
              aria-label={L.contents}
              className="mt-16 pt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <a href={localeHref('/terms', language)} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
                {L.terms}
              </a>
              <a href={localeHref('/privacy', language)} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
                {L.privacy}
              </a>
              <a href={localeHref('/refund-policy', language)} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
                {L.refund}
              </a>
            </nav>
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
  const { language } = useLanguage()
  const { map } = useContext(AudienceContext)

  const ar = language === 'ar'
  const audience = map[id] ?? 'all'

  const badge =
    audience === 'pm'
      ? ar
        ? 'يخص إدارة الأملاك'
        : 'Property management only'
      : audience === 'sp'
        ? ar
          ? 'يخص مقدمي الخدمات'
          : 'Service providers only'
        : null

  return (
    <section id={id} data-for={audience} className="scroll-mt-28 mb-14">
      <h2
        className="text-white font-bold tracking-tight mb-2"
        style={{
          fontSize: 'clamp(20px, 2.4vw, 26px)',
          fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
        }}
      >
        {title}
      </h2>
      {badge && (
        <span
          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}
        >
          {badge}
        </span>
      )}
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


/**
 * Wraps a paragraph, list item or callout that speaks to one audience only.
 *
 * Section-level tagging is not enough on its own: measuring the documents
 * showed a third of the Refund policy differs between the two audiences
 * *inside* sections that both need to read. Those are the passages that made
 * a reader ask "is this about me or the other one?".
 *
 * Like whole sections, the content stays in the HTML and is hidden in CSS, so
 * search engines and non-JavaScript crawlers still see both versions.
 */
export function Only({ for: audience, children }: { for: 'pm' | 'sp'; children: ReactNode }) {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const label =
    audience === 'pm'
      ? ar ? 'إدارة الأملاك' : 'Property management'
      : ar ? 'مقدمو الخدمات' : 'Service providers'
  return (
    <div data-for={audience} className="legal-only">
      <span className="legal-only-tag">{label}</span>
      {children}
    </div>
  )
}
