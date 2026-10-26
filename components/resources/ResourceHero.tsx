import type { ReactNode } from 'react'
import Band from '@/components/ui/Band'
import Breadcrumbs, { type Crumb } from '@/components/blog/Breadcrumbs'
import type { Locale } from '@/lib/i18n'

/**
 * The top of a resource page (hub, downloads, checklist, calculator): the
 * breadcrumb trail, a section label, the page title and a short intro, with
 * room for a note or actions below. Server-rendered.
 */
export default function ResourceHero({
  locale, crumbs, eyebrow, title, intro, children,
}: {
  locale: Locale
  crumbs: Crumb[]
  eyebrow: string
  title: string
  intro: string
  children?: ReactNode
}) {
  return (
    <Band shade="base">
      <section className="page-top pb-14" style={{ background: 'var(--section-bg, var(--bg))' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="no-print mb-8">
            <Breadcrumbs locale={locale} items={crumbs} />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <span className="ui-chip mb-5 no-print">{eyebrow}</span>
            <h1 className="hero-display text-strong tracking-tight mb-5" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', lineHeight: 1.12 }}>
              {title}
            </h1>
            <p className="text-muted leading-relaxed" style={{ fontSize: 17 }}>{intro}</p>
          </div>
          {children}
        </div>
      </section>
    </Band>
  )
}
