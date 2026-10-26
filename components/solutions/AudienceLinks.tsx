import Link from 'next/link'
import Band from '@/components/ui/Band'
import SectionHeader from '@/components/SectionHeader'
import { localeHref, type Locale } from '@/lib/i18n'
import { subpageHref, subpagesOf } from '@/lib/platform/subpages'

const TITLE: Record<Locale, string> = { en: 'Who it is for', ar: 'لمن هذا الحل' }

/** A solution page's links to its pages for each kind of customer. */
export default function AudienceLinks({ solution, locale, shade }: { solution: string; locale: Locale; shade: 'base' | 'alt' }) {
  const pages = subpagesOf(solution, 'audience')
  if (pages.length === 0) return null
  return (
    <Band shade={shade}>
      <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <SectionHeader lead={TITLE[locale]} />
          <ul className={`grid grid-cols-1 sm:grid-cols-2 ${pages.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-5`}>
            {pages.map((p) => (
              <li key={p.slug} className="flex">
                <Link href={localeHref(subpageHref(p), locale)} prefetch={false} className="ui-card ui-card-interactive w-full p-6 flex flex-col gap-1.5">
                  <span className="flex items-center justify-between gap-3 font-semibold text-strong">
                    {p.name[locale]}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-accent-hi rtl:-scale-x-100" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-muted leading-relaxed">{p.summary[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Band>
  )
}
