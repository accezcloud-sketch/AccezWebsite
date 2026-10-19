import Link from 'next/link'
import PostCard from '@/components/blog/PostCard'
import type { BlogPostMeta } from '@/lib/blog'
import { localeHref, type Locale } from '@/lib/i18n'
import { formatReadingTime } from '@/lib/content/readingTime'
import { topicLabel } from '@/lib/content/topics'

/**
 * A titled row of blog post cards with a "View all articles" link. Used for
 * related articles under a post and for the blog strip on the homepage and
 * product pages.
 *
 * Server-rendered, so every link is in the static HTML: crawlers follow them
 * and readers without JavaScript still see the posts.
 */

const COPY: Record<Locale, { viewAll: string; readMore: string }> = {
  en: { viewAll: 'View all articles', readMore: 'Read More' },
  ar: { viewAll: 'عرض جميع المقالات', readMore: 'اقرأ المزيد' },
}

interface PostStripProps {
  /** Unique id for the heading, used to label the section. */
  id: string
  heading: string
  posts: BlogPostMeta[]
  locale: Locale
}

export default function PostStrip({ id, heading, posts, locale }: PostStripProps) {
  if (posts.length === 0) return null

  const t = COPY[locale]
  const isAr = locale === 'ar'

  return (
    <section aria-labelledby={id} className="section-y" style={{ background: 'var(--section-bg, var(--bg))', borderTop: '1px solid var(--section-border, var(--border))' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 id={id} className="hero-display text-2xl text-strong">
              {heading}
            </h2>
            <Link href={localeHref('/blog', locale)} prefetch={false} className="text-sm font-medium" style={{ color: 'var(--accent-hi)' }}>
              {t.viewAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                href={localeHref(`/blog/${post.slug}`, locale)}
                title={isAr ? post.titleAr : post.title}
                excerpt={isAr ? post.excerptAr : post.excerpt}
                coverImage={post.coverImage}
                coverImageAlt={post.coverImageAlt}
                badge={topicLabel(post.topic, locale)}
                meta={[formatReadingTime(isAr ? post.readingMinutesAr : post.readingMinutes, locale)]}
                readMoreLabel={t.readMore}
                headingLevel="h3"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
