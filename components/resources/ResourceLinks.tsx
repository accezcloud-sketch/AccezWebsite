import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { localeHref, type Locale } from '@/lib/i18n'

export interface ResourceLink {
  title: string
  description: string
  /** Route without locale prefix. */
  route: string
  icon: LucideIcon
}

/** A row of cards linking to other free resources. */
export default function ResourceLinks({ links, locale }: { links: ResourceLink[]; locale: Locale }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {links.map(({ title, description, route, icon: Icon }) => (
        <li key={route}>
          <Link href={localeHref(`/${route}`, locale)} prefetch={false} className="ui-card ui-card-interactive flex h-full items-start gap-4 p-6">
            <span className="ui-icon" aria-hidden="true"><Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} /></span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-strong font-semibold" style={{ fontSize: 16.5 }}>
                {title}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 rtl:-scale-x-100" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="block text-muted mt-1.5 leading-relaxed" style={{ fontSize: 14.5 }}>{description}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
