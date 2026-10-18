import HeroLayout, { HeroActions } from '@/components/hero/HeroLayout'
import RotatingHeadline from '@/components/hero/RotatingHeadline'
import PmDashboardMock from '@/components/visuals/PmDashboardMock'
import ProductScope from '@/components/ProductScope'
import Capabilities from '@/components/Capabilities'
import Pricing from '@/components/Pricing'
import BlogStrip from '@/components/blog/BlogStrip'
import OperationAreas from './OperationAreas'
import Band from '@/components/ui/Band'
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
  },
  ar: {
    eyebrow: 'حل إدارة العقارات',
    lead: 'منصة واحدة تخدم',
    phrases: ['الإيجارات السياحية', 'الفنادق والشقق المخدومة', 'المجمعات السكنية', 'الإيجارات طويلة الأمد', 'العقارات التجارية', 'محافظ الملاك', 'المطورين وفرق المبيعات'],
    readAs: 'الإيجارات السياحية والفنادق والشقق المخدومة والمجمعات السكنية والإيجارات طويلة الأمد والعقارات التجارية ومحافظ الملاك والمطورين وفرق المبيعات',
    subtitle: 'تدير أكسيز العملية بالكامل: الحجوزات والقنوات، وأوامر العمل، والملاك والمدفوعات، والمبيعات والعقود، والفنادق، في نظام واحد.',
  },
} as const

/** Closing call to action. */
function ClosingCta({ locale }: { locale: Locale }) {
  const c = MODULES_COPY[locale]
  return (
    <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
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
      <Band shade="base">
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
      </Band>
      <OperationAreas locale={locale} firstShade="alt" />
      <Band shade="base"><ProductScope /></Band>
      <Band shade="alt"><Capabilities /></Band>
      <Band shade="base"><Pricing /></Band>
      <Band shade="alt"><ClosingCta locale={locale} /></Band>
      <Band shade="base"><BlogStrip locale={locale} /></Band>
    </>
  )
}
