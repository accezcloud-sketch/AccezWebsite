import Link from 'next/link'
import { localeHref, type Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import { SOLUTION_SHOWCASE } from './solutionShowcase'

const COPY = {
  en: {
    eyebrow: 'Two solutions',
    title: 'One platform, two ways to work',
    subtitle: 'Each solution has its own dashboard, its own plans and its own sign-in. Choose the one you run.',
    explore: 'Explore the solution',
    pricing: 'See pricing',
  },
  ar: {
    eyebrow: 'حلّان',
    title: 'منصة واحدة، وطريقتان للعمل',
    subtitle: 'لكل حل لوحة تحكم وخطط وتسجيل دخول خاص به. اختر الحل الذي تعمل به.',
    explore: 'استكشف الحل',
    pricing: 'عرض الأسعار',
  },
} as const

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" stroke="var(--accent-hi)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * The homepage's tour of the solutions: one row per solution, text on one
 * side and a live visual on the other, alternating. Each row leads to the
 * solution's own page and pricing.
 */
export default function SolutionsShowcase({ locale }: { locale: Locale }) {
  const c = COPY[locale]
  return (
    <section id="solutions" className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-20">
          <div className="flex justify-center mb-4"><span className="ui-chip">{c.eyebrow}</span></div>
          <h2 className="hero-display text-strong font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800 }}>{c.title}</h2>
          <p className="text-muted leading-relaxed" style={{ fontSize: 17 }}>{c.subtitle}</p>
        </div>

        <div className="flex flex-col gap-20 lg:gap-28">
          {PLATFORM_SOLUTIONS.map((solution, i) => {
            const show = SOLUTION_SHOWCASE[solution.key]
            const Visual = show.Visual
            return (
              <article key={solution.key} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={`min-w-0 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <div className="flex mb-4"><span className="ui-chip">{solution.name[locale]}</span></div>
                  <h3 className="hero-display text-strong font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800 }}>
                    {show.title[locale]}
                  </h3>
                  <p className="text-muted leading-relaxed mb-6" style={{ fontSize: 16 }}>{solution.summary[locale]}</p>
                  <ul className="mb-8" style={{ borderTop: '1px solid var(--border)' }}>
                    {show.points.map((p) => (
                      <li key={p.en} className="flex gap-3 py-3 text-sm sm:text-[15px] text-soft" style={{ borderBottom: '1px solid var(--border)' }}>
                        <Check />
                        {p[locale]}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={localeHref(solution.href, locale)}
                      prefetch={false}
                      className="ui-btn ui-btn-primary"
                    >
                      {c.explore}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <Link href={localeHref(solution.pricingHref, locale)} prefetch={false} className="font-semibold text-soft hover:text-strong underline underline-offset-4 decoration-1" style={{ fontSize: 15 }}>
                      {c.pricing}
                    </Link>
                  </div>
                </div>
                <div className={`min-w-0 flex justify-center ${i % 2 ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'}`}>
                  <Visual />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
