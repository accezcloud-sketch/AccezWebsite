import Link from 'next/link'
import { localeHref, type Locale } from '@/lib/i18n'
import { modulesInArea, subpageHref } from '@/lib/platform/subpages'

const LABEL: Record<Locale, string> = { en: 'Module pages', ar: 'صفحات الوحدات' }

/** Links from a section of a solution page to the module pages it covers. */
export default function ModuleLinks({ solution, area, locale }: { solution: string; area: string; locale: Locale }) {
  const pages = modulesInArea(solution, area)
  if (pages.length === 0) return null
  return (
    <nav aria-label={LABEL[locale]} className="mt-10">
      <ul className="flex flex-wrap justify-center gap-3">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link href={localeHref(subpageHref(p), locale)} prefetch={false} className="ui-btn ui-btn-glass" style={{ padding: '.6rem 1.1rem', fontSize: 14 }}>
              {p.name[locale]}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
