import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogListClient from '@/components/BlogListClient'
import TopicNav from '@/components/blog/TopicNav'
import Pagination from '@/components/blog/Pagination'
import { getAllPosts, getAllTags, getPostsByTopic } from '@/lib/blog'
import { BLOG_INDEX_COPY, blogIndexRoute } from '@/lib/content/blogIndex'
import { pageCount, pageItems, pageRoute } from '@/lib/content/pagination'
import { toPostCardData } from '@/lib/content/postCard'
import { TOPICS, topicDescription, topicLabel, type TopicKey } from '@/lib/content/topics'
import { localeHref, localeUrl, type Locale } from '@/lib/i18n'
import { REGULATIONS_HUB_ROUTE } from '@/lib/resources/routes'
import { REGULATIONS_COPY } from '@/lib/resources/saudiRegulations'

/**
 * The blog index (all articles) or a topic hub, in either language, at any
 * page. One component for every listing route so they cannot drift apart.
 */
export default function BlogIndexPage({ locale, topic, page = 1 }: { locale: Locale; topic?: TopicKey; page?: number }) {
  const c = BLOG_INDEX_COPY[locale]
  const ar = locale === 'ar'
  const allPosts = topic ? getPostsByTopic(topic) : getAllPosts()
  const totalPages = pageCount(allPosts.length)
  const posts = pageItems(allPosts, page)
  const base = blogIndexRoute(topic)
  const heading = topic ? topicLabel(topic, locale) : c.title
  const subtitle = topic ? topicDescription(topic, locale) : c.subtitle

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: heading,
    description: subtitle,
    url: localeUrl(pageRoute(base, page), locale),
    inLanguage: ar ? 'ar' : 'en',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: localeUrl(`blog/${post.slug}`, locale),
        name: ar ? post.titleAr : post.title,
      })),
    },
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      {/* Hero, server-rendered, fully crawlable */}
      <section className="relative overflow-hidden page-top pb-8" style={{ background: 'var(--section-bg, var(--bg))' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span
            className="ui-chip mb-5"
          >
            {c.eyebrow}
          </span>
          <h1
            className="hero-display text-strong tracking-tight mb-4"
            style={{ fontSize: 'clamp(30px, 4.5vw, 48px)' }}
          >
            {heading}
          </h1>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
          {topic === 'saudi-regulations' && (
            <a href={localeHref(`/${REGULATIONS_HUB_ROUTE}`, locale)} className="ui-btn ui-btn-glass mt-6" style={{ fontSize: 14, padding: '.65rem 1.1rem' }}>
              {REGULATIONS_COPY[locale].topicLink}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 rtl:-scale-x-100" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </section>

      <TopicNav locale={locale} current={topic} />

      {/* Client component handles search and filters; all cards are in the initial HTML */}
      <BlogListClient
        posts={posts.map(toPostCardData)}
        topics={topic ? undefined : TOPICS.map((t) => ({ key: t.key, en: t.label.en, ar: t.label.ar }))}
        tags={getAllTags()}
        scopeTopic={topic}
        pagination={<Pagination base={base} page={page} total={totalPages} locale={locale} />}
      />

      <Footer locale={locale} />
    </main>
  )
}
