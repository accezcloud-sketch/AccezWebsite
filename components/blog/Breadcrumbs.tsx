import Link from 'next/link'
import { localeHref, type Locale } from '@/lib/i18n'

export interface Crumb {
  label: string
  /** Site path without locale prefix; omit for the current page. */
  href?: string
}

/**
 * Visible breadcrumb trail (Home › Blog › Topic). The same trail is
 * described to search engines as BreadcrumbList structured data.
 */
export default function Breadcrumbs({ items, locale, className = '' }: { items: Crumb[]; locale: Locale; className?: string }) {
  const label = locale === 'ar' ? 'مسار التنقل' : 'Breadcrumb'
  return (
    <nav aria-label={label}>
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm ${className}`} style={{ color: 'var(--text-muted)' }}>
        {items.map((item, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" style={{ color: 'var(--text-faint)' }}>
                {locale === 'ar' ? '‹' : '›'}
              </span>
            )}
            {item.href ? (
              <Link href={localeHref(item.href, locale)} prefetch={false} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" style={{ color: 'var(--text)' }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
