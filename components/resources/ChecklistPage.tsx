import Link from 'next/link'
import { Download } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Band from '@/components/ui/Band'
import JsonLd from '@/components/resources/JsonLd'
import Notice from '@/components/resources/Notice'
import ResourceHero from '@/components/resources/ResourceHero'
import ExternalLinkText from '@/components/resources/ExternalLinkText'
import { getAllPosts } from '@/lib/blog'
import { localeHref, localeUrl, type Locale } from '@/lib/i18n'
import { DOWNLOADS_COPY, type Checklist } from '@/lib/resources/checklists'
import { checklistPdfPath, checklistRoute, DOWNLOADS_ROUTE } from '@/lib/resources/routes'
import { REGULATIONS_COPY } from '@/lib/resources/saudiRegulations'
import { breadcrumbSchema, webPageSchema } from '@/lib/resources/schema'

/**
 * One printable checklist in either language. The same page is printed to
 * the downloadable PDF (scripts/build-checklist-pdfs.mjs): everything marked
 * .no-print is left out of it, and .print-only parts (blank fields, notes
 * column, footer line) appear only on paper. Server-rendered; the tick boxes
 * are plain checkboxes that need no script.
 */
export default function ChecklistPage({ checklist, locale }: { checklist: Checklist; locale: Locale }) {
  const c = DOWNLOADS_COPY[locale]
  const other: Locale = locale === 'ar' ? 'en' : 'ar'
  const title = checklist.title[locale]
  const route = checklistRoute(checklist.id)
  const columns = checklist.columns?.map((col) => col[locale]) ?? [c.tick]
  const posts = getAllPosts()
  const guides = checklist.postSlugs.map((slug) => posts.find((p) => p.slug === slug)).filter((p) => p !== undefined)

  const schemas = [
    webPageSchema({ route, locale, name: title, description: checklist.summary[locale] }),
    breadcrumbSchema([{ name: c.crumbHome, route: '' }, { name: c.title, route: DOWNLOADS_ROUTE }, { name: title, route }], locale),
  ]

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <JsonLd schemas={schemas} />
      <Header />

      <div className="print-doc">
        <ResourceHero
          locale={locale}
          crumbs={[{ label: c.crumbHome, href: '/' }, { label: c.title, href: `/${DOWNLOADS_ROUTE}` }, { label: title }]}
          eyebrow={c.eyebrow}
          title={title}
          intro={checklist.intro[locale]}
        >
          <div className="no-print flex flex-wrap justify-center gap-3 mt-8">
            <a href={checklistPdfPath(checklist.id, locale)} download className="ui-btn ui-btn-primary" aria-label={c.pdfLabel(title)}>
              <Download size={18} strokeWidth={1.9} aria-hidden="true" />
              {c.download}
            </a>
            <a href={checklistPdfPath(checklist.id, other)} download className="ui-btn ui-btn-glass" aria-label={c.pdfOtherLabel(checklist.title[other])}>
              <Download size={18} strokeWidth={1.9} aria-hidden="true" />
              {c.downloadOther}
            </a>
          </div>
        </ResourceHero>

        <Band shade="alt">
          <section className="section-y print-flat" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
            <div className="max-w-4xl mx-auto px-4 flex flex-col gap-5">
              {/* Blank lines to fill in, on paper only. */}
              <dl className="print-only checklist-fields">
                {checklist.fields.map((f) => (
                  <div key={f.en}>
                    <dt>{f[locale]}</dt>
                    <dd />
                  </div>
                ))}
              </dl>

              {checklist.sections.map((section) => (
                <section key={section.heading.en} className="ui-card p-5 sm:p-6 checklist-section">
                  <h2 className="text-strong font-semibold mb-3" style={{ fontSize: 18 }}>{section.heading[locale]}</h2>
                  <table className="w-full checklist-table" style={{ fontSize: 15 }}>
                    <thead>
                      <tr className="text-faint" style={{ fontSize: 12 }}>
                        <th scope="col" className="text-start font-semibold uppercase tracking-wider pb-2">{c.item}</th>
                        {columns.map((col) => (
                          <th key={col} scope="col" className="font-semibold uppercase tracking-wider pb-2 px-1.5 sm:px-2 w-14 sm:w-20 text-center whitespace-nowrap">{col}</th>
                        ))}
                        <th scope="col" className="print-cell text-start font-semibold uppercase tracking-wider pb-2 px-2 w-[32%]">{c.notes}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item) => (
                        <tr key={item.text.en} style={{ borderTop: '1px solid var(--border)' }}>
                          <td className="py-2.5 text-soft align-top">
                            {item.text[locale]}
                            {item.source !== undefined && (
                              <a href={`#source-${item.source + 1}`} className="ms-1 align-super no-underline" style={{ fontSize: 11, color: 'var(--accent-hi)' }} aria-label={`${c.source} ${item.source + 1}`}>
                                [{item.source + 1}]
                              </a>
                            )}
                          </td>
                          {columns.map((col) => (
                            <td key={col} className="py-2.5 px-1.5 sm:px-2 text-center align-top">
                              <input type="checkbox" className="h-5 w-5 accent-[var(--accent)]" aria-label={`${col}: ${item.text[locale]}`} />
                            </td>
                          ))}
                          <td className="print-cell py-2.5 px-2" />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              ))}

              {checklist.sources.length > 0 && (
                <section className="ui-card p-5 sm:p-6 checklist-section">
                  <h2 className="text-strong font-semibold mb-3" style={{ fontSize: 18 }}>{c.sources}</h2>
                  <ol className="flex flex-col gap-2" style={{ fontSize: 14.5 }}>
                    {checklist.sources.map((s, i) => (
                      <li key={s.url} id={`source-${i + 1}`} className="flex gap-2 scroll-mt-24">
                        <span className="text-faint">[{i + 1}]</span>
                        <span className="min-w-0">
                          <ExternalLinkText href={s.url} newTabLabel={REGULATIONS_COPY[locale].opensNewTab}>{s.label[locale]}</ExternalLinkText>
                          <span className="print-only text-faint break-all" style={{ fontSize: 12 }}>{s.url}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {guides.length > 0 && (
                <section className="no-print ui-card p-5 sm:p-6">
                  <h2 className="text-strong font-semibold mb-3" style={{ fontSize: 18 }}>{c.basedOn}</h2>
                  <ul className="flex flex-col gap-2" style={{ fontSize: 15 }}>
                    {guides.map((p) => (
                      <li key={p.slug}>
                        <Link href={localeHref(`/blog/${p.slug}`, locale)} prefetch={false} className="underline underline-offset-2 hover:no-underline" style={{ color: 'var(--accent-hi)' }}>
                          {locale === 'ar' ? p.titleAr : p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Notice title={c.noticeTitle}>{c.notice}</Notice>
              <p className="print-only text-faint" style={{ fontSize: 11 }}>
                {c.printedFrom} {localeUrl(route, locale)}
              </p>
            </div>
          </section>
        </Band>
      </div>

      <Footer locale={locale} />
    </main>
  )
}
