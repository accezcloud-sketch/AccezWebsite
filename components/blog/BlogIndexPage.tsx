import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogListClient from '@/components/BlogListClient'
import TopicNav from '@/components/blog/TopicNav'
import Pagination from '@/components/blog/Pagination'
import { getAllPosts, getAllTags, getPostsByTopic } from '@/lib/blog'
import { BLOG_INDEX_COPY, blogIndexRoute } from '@/lib/content/blogIndex'
import { pageCount, pageItems, pageRoute } from '@/lib/content/pagination'
import { toPostCardData } from '@/lib/content/postCard'
import { TOPICS, topicLabel, type TopicKey } from '@/lib/content/topics'
import { localeUrl, type Locale } from '@/lib/i18n'

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
  const subtitle = topic ? c.topicSubtitle(topicLabel(topic, locale)) : c.subtitle

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
      <section className="relative overflow-hidden page-top pb-8" style={{ background: 'var(--bg)' }}>
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: '100%', background: 'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)' }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
            style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}
          >
            {c.eyebrow}
          </span>
          <h1
            className="text-white font-bold tracking-tight mb-4"
            style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}
          >
            {heading}
          </h1>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
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

      <Footer />
    </main>
  )
}
