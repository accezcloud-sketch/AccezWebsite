'use client'

import { ReactNode, createContext, useContext } from 'react'
import Link from 'next/link'
import {
  appliesTo,
  formatSectionNumber,
  sectionNumbers,
  type Audience,
  type AudienceView,
  type LegalSection,
} from '@/lib/legal/audience'
import { LEGAL_COPY, LEGAL_DOCUMENTS, legalDocumentsFor, legalHref, type LegalDocKey } from '@/lib/legal/documents'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'

/** The version being rendered, and this document's structure. */
const DocumentContext = createContext<{
  view: AudienceView | undefined
  audienceOf: Record<string, Audience>
  numbers: Record<string, number>
}>({ view: undefined, audienceOf: {}, numbers: {} })

interface LegalLayoutProps {
  doc: LegalDocKey
  /** The document's sections in order (lib/legal/audience.ts). */
  sections: LegalSection[]
  /** Which audience's version to render. Absent for a shared document. */
  audience?: AudienceView
  title: string
  subtitle: string
  lastUpdated: string
  effectiveDate?: string
  children: ReactNode
}

const solutionFor = (view: AudienceView) => PLATFORM_SOLUTIONS.find((s) => s.legalAudience === view)

/**
 * Shared shell for the legal pages.
 *
 * A per-audience document is rendered as one version only: the other
 * audience's sections and passages are not in the page at all, the sections
 * are numbered without gaps, and the page says plainly who it is for, with a
 * link to the other version. There is no in-page toggle: each version has its
 * own URL, so the product apps, emails and search results can link straight
 * to the right one, and a reader can never be looking at the wrong half.
 */
export default function LegalLayout({
  doc,
  sections,
  audience,
  title,
  subtitle,
  lastUpdated,
  effectiveDate,
  children,
}: LegalLayoutProps) {
  const { language } = useLanguage()
  const ar = language === 'ar'
  const c = LEGAL_COPY[language]
  const L = {
    effective: ar ? 'تاريخ النفاذ:' : 'Effective:',
    updated: ar ? 'آخر تحديث:' : 'Last updated:',
    related: ar ? 'مستندات ذات صلة' : 'Related documents',
  }

  const solution = audience ? solutionFor(audience) : undefined
  const others = solution ? PLATFORM_SOLUTIONS.filter((s) => s.key !== solution.key) : []
  const related = solution
    ? legalDocumentsFor(solution)
    : LEGAL_DOCUMENTS.map((d) => ({ doc: d, href: legalHref(d.key) }))

  const context = {
    view: audience,
    audienceOf: Object.fromEntries(sections.map((s) => [s.id, s.for ?? 'all'])) as Record<string, Audience>,
    numbers: sectionNumbers(sections, audience),
  }

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
              'radial-gradient(120% 70% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)',
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            {solution && (
              <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--accent-hi)' }}>
                {solution.audience[language]}
              </p>
            )}
            <h1
              className="hero-display text-strong tracking-tight mb-4"
              style={{ fontSize: 'clamp(30px, 4.5vw, 46px)' }}
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

            {/* Who this version is for, in words, and the way to the other one. */}
            {solution && (
              <div
                className="mt-8 rounded-[var(--radius-md)] px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderInlineStartWidth: 3, borderInlineStartColor: 'var(--accent)' }}
              >
                <span style={{ color: 'var(--text)' }}>
                  {c.versionFor} <strong>{solution.audience[language].replace(/^For /, '')}</strong>
                  <span style={{ color: 'var(--text-muted)' }}> · {solution.name[language]}</span>
                </span>
                {others.map((o) => (
                  <Link
                    key={o.key}
                    href={localeHref(legalHref(doc, o), language)}
                    prefetch={false}
                    className="font-medium underline underline-offset-2"
                    style={{ color: 'var(--accent-hi)' }}
                  >
                    {c.otherVersion} {o.audience[language].replace(/^For /, 'for ')}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="pb-20" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container mx-auto px-4 pt-10">
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            <DocumentContext.Provider value={context}>
              <article className="legal-doc min-w-0">{children}</article>
            </DocumentContext.Provider>

            {/* The reader's other documents: the same audience's versions. */}
            <nav
              aria-label={L.related}
              className="mt-16 pt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {related.map(({ doc: d, href }) => (
                <Link
                  key={d.key}
                  href={localeHref(href, language)}
                  prefetch={false}
                  aria-current={d.key === doc ? 'page' : undefined}
                  className="hover:text-strong transition-colors"
                  style={{ color: d.key === doc ? 'var(--text)' : 'var(--text-muted)' }}
                >
                  {d.title[language]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

/** One numbered section of a legal document. Left out of versions it does not apply to. */
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
  const { view, audienceOf, numbers } = useContext(DocumentContext)

  if (!(id in audienceOf)) throw new Error(`Legal section "${id}" is missing from the document's section list`)
  if (!appliesTo(audienceOf[id], view)) return null

  return (
    <section id={id} className="mb-14">
      <h2
        className="hero-display text-strong tracking-tight mb-4"
        style={{ fontSize: 'clamp(20px, 2.4vw, 26px)' }}
      >
        {formatSectionNumber(numbers[id], language)}. {title}
      </h2>
      <div className="legal-body space-y-4">{children}</div>
    </section>
  )
}

/**
 * The number of another section, as it appears in this version ("see section
 * <SectionNo to="fees" />"). Versions number their sections differently, so a
 * written number would be wrong in one of them. Fails the build if the section
 * is not in this version, rather than publishing a reference to nothing.
 */
export function SectionNo({ to }: { to: string }) {
  const { language } = useLanguage()
  const { numbers, view } = useContext(DocumentContext)
  const n = numbers[to]
  if (n === undefined) throw new Error(`Section reference "${to}" is not in the ${view ?? 'shared'} version`)
  return <a href={`#${to}`}>{formatSectionNumber(n, language)}</a>
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

/**
 * A fee or refund table. On phones each row becomes a card, with the column
 * name above each value, instead of a table that runs off the screen.
 */
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
        className="legal-table-wrap overflow-x-auto rounded-xl"
        style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <table className="legal-table w-full text-sm" style={{ borderCollapse: 'collapse' }}>
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
                    data-label={head[j]}
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
 * A paragraph, list item or callout that speaks to one audience only.
 *
 * In a per-audience version it is rendered only in its own audience's
 * version. In a shared document (Privacy) every reader sees it, so it carries
 * a label saying who it is for.
 */
export function Only({
  for: audience,
  as: Tag = 'div',
  children,
}: {
  for: AudienceView
  /** Use "li" inside a list: a <div> between <ul> and <li> is invalid HTML. */
  as?: 'div' | 'li'
  children: ReactNode
}) {
  const { language } = useLanguage()
  const { view } = useContext(DocumentContext)
  if (view !== undefined) return view === audience ? <Tag className="legal-only">{children}</Tag> : null

  const label = solutionFor(audience)?.audience[language]
  return Tag === 'li' ? (
    <li className="legal-only">
      <strong className="legal-only-label">{label}:</strong> {children}
    </li>
  ) : (
    <div className="legal-only legal-only-labelled">
      <p className="legal-only-label">{label}</p>
      {children}
    </div>
  )
}
