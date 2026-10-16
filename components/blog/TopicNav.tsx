import Link from 'next/link'
import { BLOG_INDEX_COPY, blogIndexRoute } from '@/lib/content/blogIndex'
import { TOPICS, type TopicKey } from '@/lib/content/topics'
import { localeHref, type Locale } from '@/lib/i18n'

/**
 * Links to every topic hub (and back to all articles). Server-rendered, so
 * each hub is reachable by crawlers from the blog index and from each other.
 */
export default function TopicNav({ locale, current }: { locale: Locale; current?: TopicKey }) {
  const c = BLOG_INDEX_COPY[locale]
  const items: { href: string; label: string; active: boolean }[] = [
    { href: localeHref(`/${blogIndexRoute()}`, locale), label: c.allArticles, active: !current },
    ...TOPICS.map((t) => ({
      href: localeHref(`/${blogIndexRoute(t.key)}`, locale),
      label: t.label[locale],
      active: t.key === current,
    })),
  ]

  return (
    <nav aria-label={c.browseByTopic} className="container mx-auto px-4 pb-6">
      <ul className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              prefetch={false}
              aria-current={item.active ? 'page' : undefined}
              className="inline-block px-4 py-2 rounded-full text-sm transition-colors"
              style={
                item.active
                  ? { background: 'var(--accent)', border: '1px solid var(--accent)', color: '#fff' }
                  : { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
