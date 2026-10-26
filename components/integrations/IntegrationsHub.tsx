import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Band from '@/components/ui/Band'
import CenteredHero from '@/components/hero/CenteredHero'
import HeroActions from '@/components/hero/HeroActions'
import PhotoCta from '@/components/hero/PhotoCta'
import { RIYADH_CENTRE } from '@/components/hero/photos'
import SectionHeader from '@/components/SectionHeader'
import ProductShot from '@/components/product/ProductShot'
import Breadcrumbs from '@/components/blog/Breadcrumbs'
import { solutionActions } from '@/components/detail/detailCopy'
import { breadcrumbSchema, HOME_CRUMB } from '@/lib/content/breadcrumbSchema'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { localeHref, type Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS, solutionByKey } from '@/lib/platform/solutions'
import { INTEGRATION_GROUPS, INTEGRATIONS, INTEGRATIONS_HREF, INTEGRATIONS_HUB as HUB, integrationHref } from '@/lib/platform/integrations'

const COPY = {
  en: { ctaTitle: 'Connect Accez to the tools you use', ctaSub: 'Pick your solution to get started.' },
  ar: { ctaTitle: 'اربط أكسيز بالأدوات التي تستخدمها', ctaSub: 'اختر الحل المناسب لتبدأ.' },
} as const

export function integrationsHubMetadata(locale: Locale): Metadata {
  return staticPageMetadata({ route: INTEGRATIONS_HREF, locale, title: HUB.metaTitle[locale], description: HUB.metaDescription[locale] })
}

/**
 * /integrations/: every service Accez connects to, by group, each card
 * naming the solutions it is in and opening its own page. Names are plain
 * text marks, no third-party logos.
 */
export default function IntegrationsHub({ locale }: { locale: Locale }) {
  const trail = [
    { name: HOME_CRUMB[locale], route: '' },
    { name: HUB.name[locale], route: INTEGRATIONS_HREF },
  ]
  const [pm, sp] = PLATFORM_SOLUTIONS
  const pmActions = solutionActions(pm, locale)
  const spActions = solutionActions(sp, locale)
  const actions = <HeroActions primary={pmActions.primary} secondary={spActions.primary} />

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(trail, locale)) }} />
      <main className="min-h-screen">
        <Header />
        <Band shade="base">
          <CenteredHero
            above={<Breadcrumbs items={[{ label: trail[0].name, href: '/' }, { label: trail[1].name }]} locale={locale} className="justify-center" />}
            title={HUB.hero.title[locale]}
            accent={HUB.hero.accent[locale]}
            subtitle={HUB.hero.subtitle[locale]}
            actions={actions}
            media={
              <figure>
                <ProductShot shot={HUB.shot.shot} locale={locale} priority />
                <figcaption className="mt-4 text-center text-sm leading-relaxed">
                  <span className="block font-semibold text-strong">{HUB.shot.title[locale]}</span>
                  <span className="block text-muted">{HUB.shot.text[locale]}</span>
                </figcaption>
              </figure>
            }
          />
        </Band>

        {INTEGRATION_GROUPS.map((group, n) => (
          <Band key={group.key} shade={n % 2 === 0 ? 'alt' : 'base'}>
            <section id={group.key} className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                <SectionHeader lead={group.name[locale]} className="mb-10" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {INTEGRATIONS.filter((i) => i.group === group.key).map((i) => (
                    <li key={i.slug} className="flex">
                      <Link href={localeHref(integrationHref(i.slug), locale)} prefetch={false} className="ui-card ui-card-interactive w-full p-6 flex flex-col gap-3">
                        <span className="hero-display text-strong text-xl">{i.name[locale]}</span>
                        <span className="text-sm text-muted leading-relaxed">{i.summary[locale]}</span>
                        <span className="mt-auto pt-2 text-xs font-medium" style={{ color: 'var(--accent-hi)' }}>
                          {i.solutions.map((key) => solutionByKey(key)!.name[locale]).join(locale === 'ar' ? '، ' : ', ')}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Band>
        ))}

        <PhotoCta title={COPY[locale].ctaTitle} subtitle={COPY[locale].ctaSub} photo={RIYADH_CENTRE} actions={actions} />
        <Footer locale={locale} />
      </main>
    </>
  )
}
