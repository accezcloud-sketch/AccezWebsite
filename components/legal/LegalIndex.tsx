import Link from 'next/link'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { localeHref, type Locale } from '@/lib/i18n'
import { LEGAL_COPY, LEGAL_DOCUMENTS, legalDocument, legalHref, type LegalDocKey } from '@/lib/legal/documents'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'

const Arrow = ({ locale }: { locale: Locale }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : undefined }} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <section className="relative overflow-hidden page-top pb-24">
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '70%', background: 'radial-gradient(120% 70% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-strong font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
              {title}
            </h1>
            <p className="leading-relaxed text-muted" style={{ fontSize: 17 }}>{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
      <Footer />
    </main>
  )
}

/**
 * /terms/, /refund-policy/: which version applies to you?
 * One card per solution, so a link published before the split still works.
 */
export function LegalChooser({ doc: key, locale }: { doc: LegalDocKey; locale: Locale }) {
  const doc = legalDocument(key)
  const c = LEGAL_COPY[locale]
  return (
    <Shell title={doc.title[locale]} subtitle={`${doc.summary[locale]} ${c.chooserSubtitle}`}>
      <ul className={`grid gap-6 max-w-4xl mx-auto ${PLATFORM_SOLUTIONS.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {PLATFORM_SOLUTIONS.map((s) => (
          <li key={s.key}>
            <Link href={localeHref(legalHref(key, s), locale)} prefetch={false} className="solution-card flex flex-col h-full rounded-[var(--radius-lg)] p-7">
              <span className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-hi)' }}>{s.audience[locale]}</span>
              <span className="text-strong font-bold mb-2" style={{ fontSize: 21, fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>{s.name[locale]}</span>
              <span className="text-muted leading-relaxed mb-6">{s.summary[locale]}</span>
              <span className="mt-auto inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--accent-hi)' }}>
                {c.read}: {doc.title[locale]} <Arrow locale={locale} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center mt-10 text-sm">
        <Link href={localeHref('/legal', locale)} prefetch={false} className="underline underline-offset-2 text-muted hover:text-strong">{c.allDocuments}</Link>
      </p>
    </Shell>
  )
}

/** /legal/: every document, grouped by who it is for. */
export function LegalHub({ locale }: { locale: Locale }) {
  const c = LEGAL_COPY[locale]
  const shared = LEGAL_DOCUMENTS.filter((d) => !d.perSolution)
  const perSolution = LEGAL_DOCUMENTS.filter((d) => d.perSolution)

  const group = (heading: string, sub: string | null, items: { key: string; title: string; summary: string; href: string }[]) => (
    <section className="rounded-[var(--radius-lg)] p-7 flex flex-col h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <h2 className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--accent-hi)' }}>{heading}</h2>
      {sub && <p className="text-strong font-bold mb-4" style={{ fontSize: 19, fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>{sub}</p>}
      <ul className="flex flex-col gap-1 -mx-3 mt-2">
        {items.map((i) => (
          <li key={i.key}>
            <Link href={localeHref(i.href, locale)} prefetch={false} className="nav-item block rounded-[var(--radius-sm)] px-3 py-2.5">
              <span className="flex items-center justify-between gap-3 font-semibold text-strong">{i.title} <Arrow locale={locale} /></span>
              <span className="block text-sm text-muted mt-0.5">{i.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )

  return (
    <Shell title={c.hubTitle} subtitle={c.hubSubtitle}>
      <div className="grid gap-6 max-w-5xl mx-auto md:grid-cols-2">
        {PLATFORM_SOLUTIONS.map((s) => (
          <div key={s.key}>
            {group(s.audience[locale], s.name[locale], perSolution.map((d) => ({ key: d.key, title: d.title[locale], summary: d.summary[locale], href: legalHref(d.key, s) })))}
          </div>
        ))}
        <div className="md:col-span-2">
          {group(c.forEveryone, null, shared.map((d) => ({ key: d.key, title: d.title[locale], summary: d.summary[locale], href: legalHref(d.key) })))}
        </div>
      </div>
    </Shell>
  )
}
