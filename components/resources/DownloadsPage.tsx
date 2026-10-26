import Link from 'next/link'
import { Calculator, ClipboardCheck, ClipboardList, Download, Hotel, Scale, type LucideIcon } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Band from '@/components/ui/Band'
import JsonLd from '@/components/resources/JsonLd'
import Notice from '@/components/resources/Notice'
import ResourceHero from '@/components/resources/ResourceHero'
import ResourceLinks from '@/components/resources/ResourceLinks'
import { localeHref, localeUrl, type Locale } from '@/lib/i18n'
import { CHECKLISTS, DOWNLOADS_COPY } from '@/lib/resources/checklists'
import { CALCULATOR_ROUTE, checklistPdfPath, checklistRoute, DOWNLOADS_ROUTE, REGULATIONS_HUB_ROUTE } from '@/lib/resources/routes'
import { REGULATIONS_COPY } from '@/lib/resources/saudiRegulations'
import { breadcrumbSchema, webPageSchema } from '@/lib/resources/schema'

const ICONS: Record<string, LucideIcon> = {
  'move-in-move-out-inspection-checklist': ClipboardCheck,
  'short-term-rental-licensing-checklist': Hotel,
  'new-owner-onboarding-checklist': ClipboardList,
}

/** /resources/downloads/ in either language: the checklists, then the other free resources. */
export default function DownloadsPage({ locale }: { locale: Locale }) {
  const c = DOWNLOADS_COPY[locale]
  const hub = REGULATIONS_COPY[locale]

  const schemas = [
    {
      ...webPageSchema({ route: DOWNLOADS_ROUTE, locale, name: c.title, description: c.description, type: 'CollectionPage' }),
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: CHECKLISTS.map((cl, i) => ({ '@type': 'ListItem', position: i + 1, url: localeUrl(checklistRoute(cl.id), locale), name: cl.title[locale] })),
      },
    },
    breadcrumbSchema([{ name: c.crumbHome, route: '' }, { name: c.title, route: DOWNLOADS_ROUTE }], locale),
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <JsonLd schemas={schemas} />
      <Header />

      <ResourceHero locale={locale} crumbs={[{ label: c.crumbHome, href: '/' }, { label: c.title }]} eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
          <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CHECKLISTS.map((cl) => {
                const Icon = ICONS[cl.id] ?? ClipboardList
                const title = cl.title[locale]
                return (
                  <li key={cl.id} className="ui-card flex flex-col gap-4 p-6">
                    <span className="ui-icon" aria-hidden="true"><Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} /></span>
                    <h2 className="text-strong font-semibold leading-snug" style={{ fontSize: 18 }}>
                      <Link href={localeHref(`/${checklistRoute(cl.id)}`, locale)} prefetch={false} className="hover:underline underline-offset-2">{title}</Link>
                    </h2>
                    <p className="text-muted leading-relaxed" style={{ fontSize: 14.5 }}>{cl.summary[locale]}</p>
                    <div className="mt-auto flex flex-wrap gap-2.5 pt-2">
                      <Link href={localeHref(`/${checklistRoute(cl.id)}`, locale)} prefetch={false} className="ui-btn ui-btn-glass" style={{ fontSize: 14, padding: '.6rem 1rem' }} aria-label={`${c.view}: ${title}`}>
                        {c.view}
                      </Link>
                      <a href={checklistPdfPath(cl.id, locale)} download className="ui-btn ui-btn-primary" style={{ fontSize: 14, padding: '.6rem 1rem' }} aria-label={c.pdfLabel(title)}>
                        <Download size={16} strokeWidth={1.9} aria-hidden="true" />
                        {c.download}
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
            <Notice title={c.noticeTitle}>{c.notice}</Notice>
          </div>
        </section>
      </Band>

      <Band shade="base">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="hero-display text-strong tracking-tight mb-5" style={{ fontSize: 'clamp(22px, 2.6vw, 28px)' }}>{c.toolsTitle}</h2>
            <ResourceLinks
              locale={locale}
              links={[
                { title: hub.calculatorTitle, description: hub.calculatorDesc, route: CALCULATOR_ROUTE, icon: Calculator },
                { title: hub.title, description: hub.description, route: REGULATIONS_HUB_ROUTE, icon: Scale },
              ]}
            />
          </div>
        </section>
      </Band>

      <Footer locale={locale} />
    </main>
  )
}
