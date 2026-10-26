import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { BlogPostMeta } from '@/lib/blog'
import { localeHref, localeUrl, type Locale } from '@/lib/i18n'
import ShareButtons from '@/components/blog/ShareButtons'
import Breadcrumbs from '@/components/blog/Breadcrumbs'
import TableOfContents from '@/components/blog/TableOfContents'
import type { TocEntry } from '@/lib/content/markdown'
import { blogFiltersQuery } from '@/lib/content/blogFilters'
import { formatReadingTime } from '@/lib/content/readingTime'
import { photoCreditText } from '@/lib/content/credit'
import { topicLabel } from '@/lib/content/topics'

interface PostArticleProps {
  post: BlogPostMeta | null
  locale: Locale
  /** The article body, already rendered to HTML on the server (lib/content/markdown.ts). */
  contentHtml: string
  /** The body's section headings, for the table of contents. */
  toc: TocEntry[]
  /**
   * Server-rendered content shown between the article and the footer (the
   * related-articles block). Passed in as a slot so this component stays
   * unaware of how related posts are chosen.
   */
  afterArticle?: ReactNode
}

/**
 * A blog post page's body: header, breadcrumbs, the article, its tags and
 * share buttons, then the footer. Rendered on the server, so the article
 * ships as HTML only; the header and the share buttons are the interactive
 * parts.
 */
export default function PostArticle({ post, locale, contentHtml, toc, afterArticle }: PostArticleProps) {
  const language = locale
  const isRTL = locale === 'ar'

  const content = {
    en: {
      // No arrow character here — the link renders an SVG arrow beside it.
      // Having both produced a visible double arrow: "← ← Back to Blog".
      backToBlog: 'Back to Blog',
      home: 'Home',
      blog: 'Blog',
      by: 'By',
      updated: 'Updated',
      notFound: 'Post not found',
      notFoundDesc: 'The blog post you are looking for does not exist.',
    },
    ar: {
      backToBlog: 'العودة للمدونة',
      home: 'الرئيسية',
      blog: 'المدونة',
      by: 'بواسطة',
      updated: 'تم التحديث',
      notFound: 'المقالة غير موجودة',
      notFoundDesc: 'المقالة التي تبحث عنها غير موجودة.',
    },
  }

  const t = content[language]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (!post) {
    return (
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-strong mb-4">{t.notFound}</h1>
          <p className="text-muted mb-8">{t.notFoundDesc}</p>
          <Link
            href={localeHref("/blog", language)}
            prefetch={false}
            className="ui-btn ui-btn-primary"
          >
            {t.backToBlog}
          </Link>
        </div>
        <Footer locale={language} />
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      {/* Breadcrumb trail (clears the fixed navbar via --nav-h) */}
      <div style={{ paddingTop: 'var(--nav-h)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs
            locale={language}
            items={[
              { label: t.home, href: '/' },
              { label: t.blog, href: '/blog' },
              { label: topicLabel(post.topic, language), href: `/blog/topic/${post.topic}` },
            ]}
          />
        </div>
      </div>

      {/* Article */}
      <article style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <Link
                href={localeHref(`/blog/topic/${post.topic}`, language)}
                prefetch={false}
                className="text-white text-sm px-4 py-1 rounded-full font-medium"
                style={{ background: 'var(--accent-solid)', boxShadow: '0 0 0 1px var(--accent-ring)' }}
              >
                {topicLabel(post.topic, language)}
              </Link>
            </div>

            <h1 className="hero-display text-strong mb-6 tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.15 }}>
              {language === 'ar' ? post.titleAr : post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-8" style={{ color: 'var(--text-faint)' }}>
              <span>{t.by} {language === 'ar' ? post.authorAr : post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && post.updated !== post.date && (
                <>
                  <span>·</span>
                  <span>
                    {t.updated} <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </span>
                </>
              )}
              <span>·</span>
              <span>{formatReadingTime(language === 'ar' ? post.readingMinutesAr : post.readingMinutes, language)}</span>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
              <Image src={post.coverImage} alt={post.coverImageAlt} fill className="object-cover" priority />
            </div>
            {post.coverImageCredit && post.coverImageCreditUrl && (
              <p className="text-sm -mt-8 mb-10 text-center" style={{ color: 'var(--text-faint)' }}>
                <a href={post.coverImageCreditUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent-hi)' }}>
                  {photoCreditText(post.coverImageCredit)}
                </a>
              </p>
            )}

            <TableOfContents toc={toc} locale={language} />

            {/* Content */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />

            {/* Tags */}
            <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex flex-wrap gap-2">
                {(language === 'ar' ? post.tagsAr : post.tags).map((tag, index) => (
                  <Link
                    key={index}
                    href={localeHref(`/blog${blogFiltersQuery({ tag: post.tags[index] })}`, language)}
                    prefetch={false}
                    className="px-4 py-2 rounded-full text-sm transition-colors"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            <ShareButtons
              url={localeUrl(`blog/${post.slug}`, language)}
              title={language === 'ar' ? post.titleAr : post.title}
              locale={language}
            />
          </div>
        </div>
      </article>

      {afterArticle}

      <Footer locale={language} />
    </main>
  )
}
