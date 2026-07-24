'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'
import { type BlogPost } from '@/lib/blog'

interface BlogPostClientProps {
  post: BlogPost | null
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { language, isRTL } = useLanguage()

  const content = {
    en: {
      backToBlog: '← Back to Blog',
      by: 'By',
      minRead: 'min read',
      shareArticle: 'Share this article',
      relatedPosts: 'Related Posts',
      notFound: 'Post not found',
      notFoundDesc: 'The blog post you are looking for does not exist.',
    },
    ar: {
      backToBlog: '→ العودة للمدونة',
      by: 'بواسطة',
      minRead: 'دقيقة قراءة',
      shareArticle: 'شارك هذه المقالة',
      relatedPosts: 'مقالات ذات صلة',
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

  // Simple markdown to HTML converter
  const renderMarkdown = (markdown: string) => {
    // Split by double newlines to get paragraphs/blocks
    const blocks = markdown.split('\n\n')

    const processedBlocks = blocks.map(block => {
      // Check if block is a header
      if (block.match(/^###\s/)) {
        return block.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
      }
      if (block.match(/^##\s/)) {
        return block.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
      }
      if (block.match(/^#\s/)) {
        return block.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-10 mb-4">$1</h1>')
      }

      // Check if block contains list items (lines starting with -)
      if (block.match(/^- /m)) {
        const lines = block.split('\n')
        let leadingParagraph = ''
        const listLines: string[] = []
        let inList = false

        lines.forEach(line => {
          if (line.match(/^- /)) {
            inList = true
            let content = line.replace(/^- /, '')
            content = content
              .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-gray-900"><em>$1</em></strong>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
            listLines.push(`<li class="ml-6 list-disc text-gray-700">${content}</li>`)
          } else if (!inList && line.trim()) {
            // This is a leading paragraph before the list
            let processed = line
              .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-gray-900"><em>$1</em></strong>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
            leadingParagraph = `<p class="text-gray-700 leading-relaxed mb-2">${processed}</p>`
          }
        })

        return leadingParagraph + `<ul class="my-4 space-y-2">${listLines.join('\n')}</ul>`
      }

      // Check if block contains numbered list (lines starting with number.)
      if (block.match(/^\d+\.\s/m)) {
        const lines = block.split('\n')
        let leadingParagraph = ''
        const listLines: string[] = []
        let inList = false

        lines.forEach(line => {
          if (line.match(/^\d+\.\s/)) {
            inList = true
            let content = line.replace(/^\d+\.\s/, '')
            content = content
              .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-gray-900"><em>$1</em></strong>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
            listLines.push(`<li class="ml-6 list-decimal text-gray-700">${content}</li>`)
          } else if (!inList && line.trim()) {
            // This is a leading paragraph before the list
            let processed = line
              .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-gray-900"><em>$1</em></strong>')
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
            leadingParagraph = `<p class="text-gray-700 leading-relaxed mb-2">${processed}</p>`
          }
        })

        return leadingParagraph + `<ol class="my-4 space-y-2">${listLines.join('\n')}</ol>`
      }

      // Regular paragraph - apply inline formatting
      let processed = block
        .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-gray-900"><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')

      return `<p class="text-gray-700 leading-relaxed mb-4">${processed}</p>`
    })

    return processedBlocks.join('')
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.notFound}</h1>
          <p className="text-gray-600 mb-8">{t.notFoundDesc}</p>
          <Link
            href="/blog"
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

  const postContent = language === 'ar' ? post.contentAr : post.content

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      {/* Back to Blog (clears the fixed navbar via --nav-h) */}
      <div style={{ paddingTop: 'var(--nav-h)', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog" prefetch={false} className="inline-flex items-center gap-1.5 transition-colors" style={{ color: 'var(--text-muted)' }}>
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
              <span className="text-white text-sm px-4 py-1 rounded-full font-medium" style={{ background: 'var(--accent)' }}>
                {language === 'ar' ? post.categoryAr : post.category}
              </span>
            </div>

            <h1 className="text-white font-bold mb-6 tracking-tight" style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.15, fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
              {language === 'ar' ? post.titleAr : post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-8" style={{ color: 'var(--text-faint)' }}>
              <span>{t.by} {language === 'ar' ? post.authorAr : post.author}</span>
              <span>·</span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime.replace('min read', t.minRead)}</span>
            </div>

            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
              <Image src={post.coverImage} alt={post.coverImageAlt} fill className="object-cover" priority />
            </div>
            {post.coverImageCredit && post.coverImageCreditUrl && (
              <p className="text-sm -mt-8 mb-10 text-center" style={{ color: 'var(--text-faint)' }}>
                Photo by{' '}
                <a href={post.coverImageCreditUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent-hi)' }}>
                  {post.coverImageCredit}
                </a>
              </p>
            )}

            {/* Content */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(postContent) }} />

            {/* Tags */}
            <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="flex flex-wrap gap-2">
                {(language === 'ar' ? post.tagsAr : post.tags).map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog?tag=${post.tags[index]}`}
                    prefetch={false}
                    className="px-4 py-2 rounded-full text-sm transition-colors"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              <h3 className="text-lg font-semibold text-white mb-4">{t.shareArticle}</h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(language === 'ar' ? post.titleAr : post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Share on X"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
