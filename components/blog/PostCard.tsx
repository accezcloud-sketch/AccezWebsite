import Image from 'next/image'
import Link from 'next/link'

/**
 * One blog post as a card. Purely presentational — no hooks, no language
 * context — so it renders identically from server components (related posts)
 * and client components (the filterable blog list).
 */
export interface PostCardProps {
  href: string
  title: string
  excerpt: string
  coverImage: string
  coverImageAlt: string
  /** Short label on the image, e.g. the post's topic. */
  badge: string
  /** Small items above the title, shown separated by dots, e.g. [date, "8 min read"]. */
  meta: string[]
  readMoreLabel: string
  /** Optional footer byline, e.g. "By Accez Team". */
  byline?: string
  /** Heading level for the title; `h3` when the card sits under a section `h2`. */
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export default function PostCard({
  href,
  title,
  excerpt,
  coverImage,
  coverImageAlt,
  badge,
  meta,
  readMoreLabel,
  byline,
  headingLevel = 'h2',
  className = '',
}: PostCardProps) {
  const Heading = headingLevel

  return (
    <Link
      href={href}
      prefetch={false}
      className={`ui-card ui-card-interactive group overflow-hidden ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden" style={{ background: 'var(--bg-alt)' }}>
        <Image
          src={coverImage}
          alt={coverImageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 start-4">
          <span className="text-white text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'var(--accent-solid)' }}>
            {badge}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-sm mb-3" style={{ color: 'var(--text-faint)' }}>
          {meta.map((item, i) => (
            <span key={i} className="contents">
              {i > 0 && <span aria-hidden="true">·</span>}
              <span>{item}</span>
            </span>
          ))}
        </div>

        <Heading className="hero-display text-lg text-strong mb-2 transition-colors">
          {title}
        </Heading>

        <p className="mb-4 line-clamp-2 leading-relaxed" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          {byline ? (
            <span className="text-sm" style={{ color: 'var(--text-faint)' }}>
              {byline}
            </span>
          ) : (
            <span />
          )}
          <span className="text-sm font-medium inline-flex items-center gap-1" style={{ color: 'var(--accent-hi)' }}>
            {readMoreLabel}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
