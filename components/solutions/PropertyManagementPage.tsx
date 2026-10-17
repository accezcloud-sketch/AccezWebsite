import Link from 'next/link'
import { LayoutDashboard, TrendingUp, Hotel, type LucideIcon } from 'lucide-react'
import HeroLayout, { HeroActions } from '@/components/hero/HeroLayout'
import RotatingHeadline from '@/components/hero/RotatingHeadline'
import PmDashboardMock from '@/components/visuals/PmDashboardMock'
import ProductScope from '@/components/ProductScope'
import Capabilities from '@/components/Capabilities'
import Pricing from '@/components/Pricing'
import BlogStrip from '@/components/blog/BlogStrip'
import { SOLUTIONS, type SolutionSlug } from '@/lib/content/solutions'
import { MODULES_COPY } from '@/lib/content/modulesCopy'
import { PORTAL_SIGN_UP } from '@/lib/links'
import { localeHref, type Locale } from '@/lib/i18n'

const HERO = {
  en: {
    eyebrow: 'Property management solution',
    lead: 'One platform for',
    phrases: ['vacation rentals', 'hotels & serviced apartments', 'residential communities', 'long-term rentals', 'commercial properties', 'owner portfolios', 'developers & sales teams'],
    readAs: 'vacation rentals, hotels and serviced apartments, residential communities, long-term rentals, commercial properties, owner portfolios, and developers and sales teams',
    subtitle: 'Accez runs the whole operation: reservations and channels, work orders, owners and payouts, sales and contracts, and hotels, in one system.',
    areasEyebrow: 'Built for every operation',
    areasTitle: 'Owners, sales and hotels, each with its own workspace',
  },
  ar: {
    eyebrow: 'حل إدارة العقارات',
    lead: 'منصة واحدة تخدم',
    phrases: ['الإيجارات السياحية', 'الفنادق والشقق المخدومة', 'المجمعات السكنية', 'الإيجارات طويلة الأمد', 'العقارات التجارية', 'محافظ الملاك', 'المطورين وفرق المبيعات'],
    readAs: 'الإيجارات السياحية والفنادق والشقق المخدومة والمجمعات السكنية والإيجارات طويلة الأمد والعقارات التجارية ومحافظ الملاك والمطورين وفرق المبيعات',
    subtitle: 'تدير أكسيز العملية بالكامل: الحجوزات والقنوات، وأوامر العمل، والملاك والمدفوعات، والمبيعات والعقود، والفنادق، في نظام واحد.',
    areasEyebrow: 'مبنية لكل عملية',
    areasTitle: 'الملاك والمبيعات والفنادق، لكلٍ منها مساحة عمله',
  },
} as const

const AREAS: { slug: SolutionSlug; icon: LucideIcon }[] = [
  { slug: 'owners', icon: LayoutDashboard },
  { slug: 'sales', icon: TrendingUp },
  { slug: 'hotels', icon: Hotel },
]

/** The three areas with a page of their own: owners, sales, hotels. */
function OperationAreas({ locale }: { locale: Locale }) {
  const ar = locale === 'ar'
  const c = HERO[locale]
  return (
    <section className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--accent-hi)' }}>{c.areasEyebrow}</p>
          <h2 className="hero-display text-strong font-bold tracking-tight" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', fontWeight: 800 }}>{c.areasTitle}</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AREAS.map(({ slug, icon: Icon }) => {
            const s = SOLUTIONS[slug]
            return (
              <li key={slug}>
                <Link href={localeHref(`/${slug}`, locale)} prefetch={false} className="solution-card group flex flex-col h-full rounded-[var(--radius-lg)] p-6 sm:p-7">
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                    <Icon size={20} color="var(--accent-hi)" strokeWidth={1.8} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-hi)' }}>{ar ? s.eyebrowAr : s.eyebrow}</span>
                  <span className="text-strong font-bold mb-3 leading-snug" style={{ fontSize: 19 }}>{ar ? `${s.titleAr} ${s.accentAr}` : `${s.title} ${s.accent}`}</span>
                  <ul className="space-y-2 mb-6">
                    {s.heroPoints.map((p) => (
                      <li key={p.en} className="flex gap-2 text-sm text-muted leading-snug">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                        {p[locale]}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--accent-hi)' }}>
                    {MODULES_COPY[locale].linked}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/** Closing call to action. */
function ClosingCta({ locale }: { locale: Locale }) {
  const c = MODULES_COPY[locale]
  return (
    <section className="section-y" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 text-center" style={{ background: 'linear-gradient(135deg, var(--accent-dim), var(--surface))', border: '1px solid var(--accent-line)' }}>
          <h2 className="hero-display text-strong font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800 }}>{c.ctaTitle}</h2>
          <p className="max-w-xl mx-auto mb-8 text-muted" style={{ fontSize: 16 }}>{c.ctaSub}</p>
          <div className="flex justify-center">
            <HeroActions
              primary={{ label: c.ctaPrimary, href: localeHref('/#contact', locale) }}
              secondary={{ label: c.ctaSecondary, href: PORTAL_SIGN_UP, external: true }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * /solutions/property-managers/: the property management solution, from its
 * promise down to its modules and plans.
 */
export default function PropertyManagementPage({ locale }: { locale: Locale }) {
  const c = HERO[locale]
  const m = MODULES_COPY[locale]
  return (
    <>
      <HeroLayout
        eyebrow={c.eyebrow}
        headline={<RotatingHeadline lead={c.lead} phrases={c.phrases} readAs={c.readAs} />}
        subtitle={c.subtitle}
        actions={
          <HeroActions
            primary={{ label: m.ctaPrimary, href: localeHref('/#contact', locale) }}
            secondary={{ label: m.ctaSecondary, href: PORTAL_SIGN_UP, external: true }}
          />
        }
        visual={<PmDashboardMock />}
      />
      <OperationAreas locale={locale} />
      <ProductScope />
      <Capabilities />
      <Pricing />
      <ClosingCta locale={locale} />
      <BlogStrip locale={locale} />
    </>
  )
}
