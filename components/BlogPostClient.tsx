'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { type BlogPostMeta } from '@/lib/blog'
import { localeHref, localeUrl } from '@/lib/i18n'
import ShareButtons from '@/components/blog/ShareButtons'
import { blogFiltersQuery } from '@/lib/content/blogFilters'
import { formatReadingTime } from '@/lib/content/readingTime'
import { photoCreditText } from '@/lib/content/credit'
import { topicLabel } from '@/lib/content/topics'

interface BlogPostClientProps {
  post: BlogPostMeta | null
  /** The article body, already rendered to HTML on the server (lib/content/markdown.ts). */
  contentHtml: string
  /**
   * Server-rendered content shown between the article and the footer (the
   * related-articles block). Passed in as a slot so this client component
   * stays unaware of how related posts are chosen.
   */
  afterArticle?: ReactNode
}

export default function BlogPostClient({ post, contentHtml, afterArticle }: BlogPostClientProps) {
  const { language, isRTL } = useLanguage()

  const content = {
    en: {
      // No arrow character here — the link renders an SVG arrow beside it.
      // Having both produced a visible double arrow: "← ← Back to Blog".
      backToBlog: 'Back to Blog',
      by: 'By',
      updated: 'Updated',
      notFound: 'Post not found',
      notFoundDesc: 'The blog post you are looking for does not exist.',
    },
    ar: {
      backToBlog: 'العودة للمدونة',
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
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.notFound}</h1>
          <p className="text-gray-600 mb-8">{t.notFoundDesc}</p>
          <Link
            href={localeHref("/blog", language)}
            prefetch={false}
            className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            {t.backToBlog}
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      {/* Back to Blog (clears the fixed navbar via --nav-h) */}
      <div style={{ paddingTop: 'var(--nav-h)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container mx-auto px-4 py-4">
          <Link href={localeHref("/blog", language)} prefetch={false} className="inline-flex items-center gap-1.5 transition-colors" style={{ color: 'var(--text-muted)' }}>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.backToBlog}
          </Link>
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
                style={{ background: 'var(--accent)' }}
              >
                {topicLabel(post.topic, language)}
              </Link>
            </div>

            <h1 className="text-white font-bold mb-6 tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.15, fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
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

      <Footer />
    </main>
  )
}
