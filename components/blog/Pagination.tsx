import Link from 'next/link'
import { pageRoute } from '@/lib/content/pagination'
import { localeHref, type Locale } from '@/lib/i18n'

const COPY: Record<Locale, { nav: string; previous: string; next: string; page: (n: number) => string }> = {
  en: { nav: 'Pages', previous: 'Previous', next: 'Next', page: (n) => `Page ${n}` },
  ar: { nav: 'الصفحات', previous: 'السابق', next: 'التالي', page: (n) => `الصفحة ${n}` },
}

interface PaginationProps {
  /** Route of page 1 without locale prefix, e.g. `blog` or `blog/topic/rent-payments`. */
  base: string
  page: number
  total: number
  locale: Locale
}

/** Numbered page links for a blog listing; server-rendered so every page is crawlable. */
export default function Pagination({ base, page, total, locale }: PaginationProps) {
  if (total <= 1) return null
  const t = COPY[locale]
  const href = (n: number) => localeHref(`/${pageRoute(base, n)}`, locale)
  const pill = 'inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-full text-sm transition-colors'
  const idle = { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }
  const current = { background: 'var(--accent)', border: '1px solid var(--accent)', color: '#fff' }

  return (
    <nav aria-label={t.nav} className="mt-12">
      <ul className="flex flex-wrap justify-center items-center gap-2">
        {page > 1 && (
          <li>
            <Link href={href(page - 1)} prefetch={false} className={pill} style={idle}>{t.previous}</Link>
          </li>
        )}
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              prefetch={false}
              aria-label={t.page(n)}
              aria-current={n === page ? 'page' : undefined}
              className={pill}
              style={n === page ? current : idle}
            >
              {n.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US')}
            </Link>
          </li>
        ))}
        {page < total && (
          <li>
            <Link href={href(page + 1)} prefetch={false} className={pill} style={idle}>{t.next}</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
