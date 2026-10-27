import Band from '@/components/ui/Band'
import SectionHeader from '@/components/SectionHeader'
import type { Locale } from '@/lib/i18n'
import { customerTypesOf } from '@/lib/platform/audiences'

const TITLE: Record<Locale, string> = { en: 'Who it is for', ar: 'لمن هذا الحل' }

/** The kinds of customer a solution serves, as cards (no pages of their own). */
export default function AudienceLinks({ solution, locale, shade }: { solution: string; locale: Locale; shade: 'base' | 'alt' }) {
  const pages = customerTypesOf(solution)
  if (pages.length === 0) return null
  return (
    <Band shade={shade}>
      <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <SectionHeader lead={TITLE[locale]} />
          <ul className={`grid grid-cols-1 sm:grid-cols-2 ${pages.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-5`}>
            {pages.map((p) => (
              <li key={p.slug} className="flex">
                <div className="ui-card w-full p-6 flex flex-col gap-1.5">
                  <span className="font-semibold text-strong">{p.name[locale]}</span>
                  <span className="text-sm text-muted leading-relaxed">{p.summary[locale]}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Band>
  )
}
