import type { TocEntry } from '@/lib/content/markdown'
import type { Locale } from '@/lib/i18n'

const LABEL: Record<Locale, string> = { en: 'In this article', ar: 'في هذا المقال' }

/** Below this many sections a contents list adds nothing. */
const MIN_SECTIONS = 3

/**
 * Collapsible list of the article's main sections, linking to their ids.
 * Uses native <details>, so it works without JavaScript.
 */
export default function TableOfContents({ toc, locale }: { toc: TocEntry[]; locale: Locale }) {
  const sections = toc.filter((h) => h.level === 2)
  if (sections.length < MIN_SECTIONS) return null

  return (
    <details className="toc mb-10 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <summary className="cursor-pointer select-none px-5 py-4 font-semibold text-strong">{LABEL[locale]}</summary>
      <nav aria-label={LABEL[locale]} className="px-5 pb-4">
        <ol className="space-y-2 list-decimal ps-5" style={{ color: 'var(--text-muted)' }}>
          {sections.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`} className="hover:underline" style={{ color: 'var(--text-muted)' }}>
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  )
}
