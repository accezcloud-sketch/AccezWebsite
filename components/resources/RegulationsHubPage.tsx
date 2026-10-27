import Link from 'next/link'
import { CalendarClock, FileText, Hotel, Receipt, ShieldCheck, Wallet, type LucideIcon } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Band from '@/components/ui/Band'
import JsonLd from '@/components/resources/JsonLd'
import Notice from '@/components/resources/Notice'
import ResourceHero from '@/components/resources/ResourceHero'
import ExternalLinkText from '@/components/resources/ExternalLinkText'
import SectionHeader from '@/components/SectionHeader'
import { getAllPosts } from '@/lib/blog'
import { localeHref, type Locale } from '@/lib/i18n'
import { formatDay } from '@/lib/content/postDates'
import { REGULATIONS_HUB_ROUTE } from '@/lib/resources/routes'
import { guidesFor, REGULATION_TOPICS, REGULATIONS_COPY } from '@/lib/resources/saudiRegulations'
import { breadcrumbSchema, webPageSchema } from '@/lib/resources/schema'

const ICONS: Record<string, LucideIcon> = {
  'ejar-leases': FileText,
  'zatca-tax': Receipt,
  pdpl: ShieldCheck,
  'tourism-licensing': Hotel,
  'riyadh-rent-rules': CalendarClock,
  'security-deposits': Wallet,
}

const labelClass = 'text-[11px] font-semibold uppercase tracking-[0.12em] text-faint mb-1.5'

/**
 * /resources/saudi-regulations/ in either language: one card per regulation
 * the blog covers, with its authority, official sources and our guides.
 * Server-rendered; the data is in lib/resources/saudiRegulations.ts.
 */
export default function RegulationsHubPage({ locale }: { locale: Locale }) {
  const c = REGULATIONS_COPY[locale]
  const posts = getAllPosts()

  const schemas = [
    webPageSchema({ route: REGULATIONS_HUB_ROUTE, locale, name: c.title, description: c.description, type: 'CollectionPage' }),
    breadcrumbSchema([{ name: c.crumbHome, route: '' }, { name: c.title, route: REGULATIONS_HUB_ROUTE }], locale),
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <JsonLd schemas={schemas} />
      <Header />

      <ResourceHero locale={locale} crumbs={[{ label: c.crumbHome, href: '/' }, { label: c.title }]} eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
        <div className="max-w-3xl mx-auto mt-10">
          <Notice title={c.noticeTitle}>{c.notice}</Notice>
        </div>
      </ResourceHero>

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
          <ul className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            {REGULATION_TOPICS.map((topic) => {
              const Icon = ICONS[topic.id] ?? FileText
              const guides = guidesFor(topic, posts, locale)
              return (
                <li key={topic.id} id={topic.id} className="ui-card flex flex-col gap-5 p-6 scroll-mt-24">
                  <div className="flex items-start gap-4">
                    <span className="ui-icon" aria-hidden="true"><Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} /></span>
                    <h2 className="text-strong font-semibold leading-snug pt-2" style={{ fontSize: 19 }}>{topic.title[locale]}</h2>
                  </div>
                  <p className="text-muted leading-relaxed" style={{ fontSize: 15 }}>{topic.summary[locale]}</p>

                  <div className="grid gap-4 pt-4 mt-auto" style={{ borderTop: '1px solid var(--border)', fontSize: 14.5 }}>
                    <div>
                      <p className={labelClass}>{c.authority}</p>
                      <ExternalLinkText href={topic.authority.url} newTabLabel={c.opensNewTab}>{topic.authority.name[locale]}</ExternalLinkText>
                    </div>

                    {topic.sources.length > 0 && (
                      <div>
                        <p className={labelClass}>{c.sources}</p>
                        <ul className="flex flex-col gap-1.5">
                          {topic.sources.map((s) => (
                            <li key={s.url}>
                              <ExternalLinkText href={s.url} newTabLabel={c.opensNewTab}>{s.label[locale]}</ExternalLinkText>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <p className={labelClass}>{c.guides}</p>
                      <ul className="flex flex-col gap-2.5">
                        {guides.map((g) => (
                          <li key={g.slug}>
                            <Link href={localeHref(`/blog/${g.slug}`, locale)} prefetch={false} className="text-strong font-medium hover:underline underline-offset-2">
                              {g.title}
                            </Link>
                            {g.reviewed && (
                              <span className="block text-faint" style={{ fontSize: 13 }}>
                                {c.lastReviewed} <time dateTime={g.reviewed}>{formatDay(g.reviewed, locale)}</time>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </Band>

      <Footer locale={locale} />
    </main>
  )
}
