import Link from 'next/link'
import { Scale } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Band from '@/components/ui/Band'
import JsonLd from '@/components/resources/JsonLd'
import Notice from '@/components/resources/Notice'
import ResourceHero from '@/components/resources/ResourceHero'
import ResourceLinks from '@/components/resources/ResourceLinks'
import RentalCalculator from '@/components/tools/RentalCalculator'
import { localeHref, type Locale } from '@/lib/i18n'
import { CALCULATOR_ROUTE, REGULATIONS_HUB_ROUTE } from '@/lib/resources/routes'
import { REGULATIONS_COPY } from '@/lib/resources/saudiRegulations'
import { breadcrumbSchema, webApplicationSchema, webPageSchema } from '@/lib/resources/schema'
import { CALCULATOR_COPY } from '@/lib/tools/calculatorCopy'

/**
 * /tools/rental-revenue-calculator/ in either language: the page around the
 * interactive calculator (components/tools/RentalCalculator.tsx), which is
 * the only part that runs in the browser.
 */
export default function RentalCalculatorPage({ locale }: { locale: Locale }) {
  const c = CALCULATOR_COPY[locale]
  const hub = REGULATIONS_COPY[locale]

  const schemas = [
    webApplicationSchema({ route: CALCULATOR_ROUTE, locale, name: c.title, description: c.description }),
    webPageSchema({ route: CALCULATOR_ROUTE, locale, name: c.title, description: c.description }),
    breadcrumbSchema([{ name: c.crumbHome, route: '' }, { name: c.title, route: CALCULATOR_ROUTE }], locale),
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <JsonLd schemas={schemas} />
      <Header />

      <ResourceHero locale={locale} crumbs={[{ label: c.crumbHome, href: '/' }, { label: c.title }]} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
          <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6">
            <RentalCalculator locale={locale} />
            <Notice title={c.noteTitle}>{c.note}</Notice>
          </div>
        </section>
      </Band>

      <Band shade="base">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
          <div className="max-w-6xl mx-auto px-4 flex flex-col gap-12">
            <div className="ui-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div className="max-w-2xl">
                <h2 className="hero-display text-strong tracking-tight mb-2" style={{ fontSize: 'clamp(22px, 2.6vw, 28px)' }}>{c.ctaTitle}</h2>
                <p className="text-muted leading-relaxed" style={{ fontSize: 15.5 }}>{c.ctaText}</p>
              </div>
              <Link href={localeHref('/solutions/property-managers#rentals', locale)} prefetch={false} className="ui-btn ui-btn-primary shrink-0 self-start md:self-auto">
                {c.ctaButton}
              </Link>
            </div>

            <div>
              <h2 className="hero-display text-strong tracking-tight mb-5" style={{ fontSize: 'clamp(22px, 2.6vw, 28px)' }}>{c.moreTitle}</h2>
              <ResourceLinks locale={locale} links={[{ title: hub.title, description: hub.description, route: REGULATIONS_HUB_ROUTE, icon: Scale }]} />
            </div>
          </div>
        </section>
      </Band>

      <Footer locale={locale} />
    </main>
  )
}
