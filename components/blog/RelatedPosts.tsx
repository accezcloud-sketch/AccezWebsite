import Link from 'next/link'
import PostCard from '@/components/blog/PostCard'
import type { BlogPostMeta } from '@/lib/blog'
import { localeHref, type Locale } from '@/lib/i18n'

/**
 * "Related articles" block at the end of a blog post.
 *
 * Rendered on the server so the links are in the static HTML: crawlers follow
 * them, and readers get a relevant next step instead of a dead end. Which
 * posts appear is decided by getRelatedPosts() in lib/blog.ts.
 */

const COPY: Record<Locale, { heading: string; viewAll: string; readMore: string; minRead: string }> = {
  en: { heading: 'Related articles', viewAll: 'View all articles', readMore: 'Read More', minRead: 'min read' },
  ar: { heading: 'مقالات ذات صلة', viewAll: 'عرض جميع المقالات', readMore: 'اقرأ المزيد', minRead: 'دقيقة قراءة' },
}

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  locale: Locale
}

export default function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  if (posts.length === 0) return null

  const t = COPY[locale]
  const isAr = locale === 'ar'

  return (
    <section aria-labelledby="related-articles" className="section-y" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 id="related-articles" className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>
              {t.heading}
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
                category={isAr ? post.categoryAr : post.category}
                meta={[post.readingTime.replace('min read', t.minRead)]}
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
