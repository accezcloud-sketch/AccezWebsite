import { Check } from 'lucide-react'
import Band from '@/components/ui/Band'
import SectionHeader from '@/components/SectionHeader'
import { SOLUTIONS, type SolutionSlug } from '@/lib/content/solutions'
import type { Locale } from '@/lib/i18n'

const AREAS: SolutionSlug[] = ['owners', 'sales', 'hotels']

const COPY = {
  en: { eyebrow: 'Built for every operation', title: 'Owners, sales and hotels,', accent: 'each with its own workspace', jump: 'Jump to' },
  ar: { eyebrow: 'مبنية لكل عملية', title: 'الملاك والمبيعات والفنادق،', accent: 'لكلٍ منها مساحة عمله', jump: 'انتقل إلى' },
} as const

/** One area, explained in full: promise, features and what is inside. */
function AreaSection({ slug, locale, flip }: { slug: SolutionSlug; locale: Locale; flip: boolean }) {
  const s = SOLUTIONS[slug]
  const ar = locale === 'ar'
  const L = (en: string, arText: string) => (ar ? arText : en)
  return (
    <div id={slug} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
      <div className={`min-w-0 ${flip ? 'lg:order-2' : ''}`}>
        <div className="flex mb-4"><span className="ui-chip">{L(s.eyebrow, s.eyebrowAr)}</span></div>
        <h3 className="hero-display text-strong font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800 }}>
          {L(s.title, s.titleAr)}{' '}
          <span className="grad-text">{L(s.accent, s.accentAr)}</span>
        </h3>
        <p className="text-muted leading-relaxed mb-6" style={{ fontSize: 16 }}>{L(s.subtitle, s.subtitleAr)}</p>
        <p className="text-sm font-semibold text-strong mb-3">{L(s.capsHeading, s.capsHeadingAr)}</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6" style={{ borderTop: '1px solid var(--border)' }}>
          {s.capabilities.map((c) => (
            <li key={c.en} className="flex gap-2.5 py-2.5 text-sm text-soft" style={{ borderBottom: '1px solid var(--border)' }}>
              <Check size={16} color="var(--accent-hi)" strokeWidth={2.2} className="shrink-0 mt-0.5" />
              {c[locale]}
            </li>
          ))}
        </ul>
      </div>
      <ul className={`min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4 ${flip ? 'lg:order-1' : ''}`}>
        {s.features.map((f) => {
          const Icon = f.icon
          return (
            <li key={f.title} className="ui-card ui-card-interactive flex flex-col gap-4 p-6">
              <span className="ui-icon"><Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} /></span>
              <span>
                <span className="block text-strong font-semibold leading-snug mb-2" style={{ fontSize: 16 }}>{L(f.title, f.titleAr)}</span>
                <span className="block text-muted leading-relaxed" style={{ fontSize: 14 }}>{L(f.desc, f.descAr)}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Owner management, sales and projects, and hotels, explained in full on the
 * property management solution page (each has an anchor: #owners, #sales,
 * #hotels; the old /owners/, /sales/ and /hotels/ pages redirect here). Each
 * area gets its own band. Wording from lib/content/solutions.ts.
 */
export default function OperationAreas({ locale, firstShade = 'alt' }: { locale: Locale; firstShade?: 'base' | 'alt' }) {
  const c = COPY[locale]
  const shade = (i: number): 'base' | 'alt' => ((i % 2 === 0) === (firstShade === 'alt') ? 'alt' : 'base')
  return (
    <>
      {AREAS.map((slug, i) => (
        <Band key={slug} shade={shade(i)}>
          <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }} aria-labelledby={i === 0 ? 'operation-areas' : undefined}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              {i === 0 && (
                <div id="operation-areas" className="mb-14">
                  <SectionHeader eyebrow={c.eyebrow} lead={c.title} accent={c.accent} className="mb-6" />
                  <nav aria-label={c.jump} className="flex flex-wrap justify-center gap-2">
                    {AREAS.map((a) => (
                      <a key={a} href={`#${a}`} className="ui-btn ui-btn-glass" style={{ padding: '.55rem 1rem', fontSize: 14 }}>
                        {locale === 'ar' ? SOLUTIONS[a].eyebrowAr : SOLUTIONS[a].eyebrow}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
              <AreaSection slug={slug} locale={locale} flip={i % 2 === 1} />
            </div>
          </section>
        </Band>
      ))}
    </>
  )
}
