import Link from 'next/link'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import { PRICING_HUB_COPY } from '@/lib/platform/pricingPages'
import { localeHref, type Locale } from '@/lib/i18n'

/** /pricing: one card per solution, each leading to that solution's plans. */
export default function PricingHub({ locale }: { locale: Locale }) {
  const c = PRICING_HUB_COPY[locale]
  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <section className="relative overflow-hidden page-top pb-24" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '70%', background: 'radial-gradient(120% 70% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)' }} aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}>
            {c.eyebrow}
          </span>
          <h1 className="text-strong font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
            {c.title}
          </h1>
          <p className="leading-relaxed text-muted" style={{ fontSize: 17 }}>{c.subtitle}</p>
        </div>

        <ul className={`grid gap-6 max-w-5xl mx-auto ${PLATFORM_SOLUTIONS.length > 1 ? 'md:grid-cols-2' : ''}`}>
          {PLATFORM_SOLUTIONS.map((s) => (
            <li key={s.key}>
              <Link
                href={localeHref(s.pricingHref, locale)}
                prefetch={false}
                className="solution-card group flex flex-col h-full rounded-[var(--radius-lg)] p-7"
              >
                <span className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-hi)' }}>{s.audience[locale]}</span>
                <span className="text-strong font-bold mb-2" style={{ fontSize: 22, fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>{s.name[locale]}</span>
                <span className="text-muted leading-relaxed mb-6">{s.summary[locale]}</span>
                <span className="text-sm text-faint mb-6">{c.startsFree} · {s.pricingNote[locale]}</span>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--accent-hi)' }}>
                  {c.see} {arrow}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
