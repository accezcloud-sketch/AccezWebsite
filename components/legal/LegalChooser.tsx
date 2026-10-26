import Link from 'next/link'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { localeHref, type Locale } from '@/lib/i18n'
import { LEGAL_COPY, legalDocument, legalHref, type LegalDocKey } from '@/lib/legal/documents'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'

const Arrow = ({ locale }: { locale: Locale }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : undefined }} aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Shell({ title, subtitle, locale, children }: { title: string; subtitle: string; locale: Locale; children: ReactNode }) {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <section className="relative overflow-hidden page-top pb-24">
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '70%', background: 'radial-gradient(120% 70% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="hero-display text-strong tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)' }}>
              {title}
            </h1>
            <p className="leading-relaxed text-muted" style={{ fontSize: 17 }}>{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
      <Footer locale={locale} />
    </main>
  )
}

/**
 * /terms/, /refund-policy/, /privacy/: who are you? One card per audience,
 * each leading to that audience's version of the document.
 */
export function LegalChooser({ doc: key, locale }: { doc: LegalDocKey; locale: Locale }) {
  const doc = legalDocument(key)
  const c = LEGAL_COPY[locale]
  return (
    <Shell title={doc.title[locale]} subtitle={c.chooserSubtitle} locale={locale}>
      <ul className={`grid gap-6 max-w-2xl mx-auto ${PLATFORM_SOLUTIONS.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {PLATFORM_SOLUTIONS.map((s) => (
          <li key={s.key}>
            <Link href={localeHref(legalHref(key, s), locale)} prefetch={false} className="solution-card flex flex-col h-full rounded-[var(--radius-lg)] p-7">
              <span className="hero-display text-strong mb-6" style={{ fontSize: 24 }}>{s.role[locale]}</span>
              <span className="mt-auto inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--accent-hi)' }}>
                {c.read} {doc.title[locale]} <Arrow locale={locale} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  )
}
