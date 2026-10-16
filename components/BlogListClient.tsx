'use client'

import { useState, useMemo, type ReactNode } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { PostCardData } from '@/lib/content/postCard'
import { useSearchIndex } from '@/components/blog/useSearchIndex'
import Select from '@/components/ui/Select'
import PostCard from '@/components/blog/PostCard'
import { useBlogFiltersInUrl } from '@/components/blog/useBlogFiltersInUrl'
import { filterPosts } from '@/lib/content/blogFilters'
import { formatReadingTime } from '@/lib/content/readingTime'
import { topicLabel } from '@/lib/content/topics'
import { localeHref } from '@/lib/i18n'

interface BlogListClientProps {
  /** The posts on this page. */
  posts: PostCardData[]
  /** Topics offered in the filter; omit on a topic page, where the topic is fixed. */
  topics?: { key: string; en: string; ar: string }[]
  tags: { en: string; ar: string }[]
  /** On a topic hub: search and tag filters stay within this topic. */
  scopeTopic?: string
  /** Page links, hidden while a filter is active (results span all pages). */
  pagination?: ReactNode
}

export default function BlogListClient({ posts, topics = [], tags, scopeTopic, pagination }: BlogListClientProps) {
  const { language, isRTL } = useLanguage()
  const [selectedTopic, setSelectedTopic] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const knownTags = useMemo(() => tags.map((tg) => tg.en), [tags])
  const knownTopics = useMemo(() => topics.map((tp) => tp.key), [topics])
  useBlogFiltersInUrl({
    tag: selectedTag,
    topic: selectedTopic,
    setTag: setSelectedTag,
    setTopic: setSelectedTopic,
    knownTags,
    knownTopics,
  })

  const content = {
    en: {
      searchPlaceholder: 'Search articles...',
      allTopics: 'All Topics',
      allTags: 'All Tags',
      readMore: 'Read More',
      noPosts: 'No blog posts found.',
      by: 'By',
    },
    ar: {
      searchPlaceholder: 'البحث في المقالات...',
      allTopics: 'جميع المواضيع',
      allTags: 'جميع الوسوم',
      readMore: 'اقرأ المزيد',
      noPosts: 'لم يتم العثور على مقالات.',
      by: 'بواسطة',
    },
  }

  const t = content[language]

  const isFiltering = selectedTopic !== 'all' || selectedTag !== 'all' || searchQuery !== ''

  // While filtering, search every post (loaded once on demand), not just this page.
  const index = useSearchIndex(isFiltering)
  const visiblePosts = useMemo(() => {
    if (!isFiltering) return posts
    return filterPosts(index ?? posts, {
      topic: scopeTopic ?? (selectedTopic === 'all' ? null : selectedTopic),
      tag: selectedTag === 'all' ? null : selectedTag,
      query: searchQuery,
    })
  }, [isFiltering, index, posts, scopeTopic, selectedTopic, selectedTag, searchQuery])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const controlClass =
    'w-full px-4 py-3 rounded-lg border transition-all duration-200 outline-none text-strong focus:ring-2'
  const controlStyle = {
    background: 'var(--surface)',
    borderColor: 'var(--border-hi)',
    ['--tw-ring-color' as string]: 'var(--accent)',
  } as React.CSSProperties

  return (
    <>
      {/* Filters Section — sticky under the navbar so Search / Categories /
          Tags stay reachable while browsing posts. */}
      <section
        className="md:sticky md:top-16 z-20 py-5"
        style={{
          background: 'var(--glass)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          // Override the global `section { overflow-x: hidden }` (which forces
          // overflow-y to `auto` and clips the open dropdown at this section's
          // bottom edge). This section has no horizontal-overflow risk.
          overflow: 'visible',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={controlClass}
                style={controlStyle}
              />
            </div>
            {topics.length > 0 && (
              <div className="w-full md:w-52">
                <Select
                  value={selectedTopic}
                  onChange={setSelectedTopic}
                  ariaLabel={t.allTopics}
                  isRTL={isRTL}
                  options={[{ value: 'all', label: t.allTopics }, ...topics.map((tp) => ({ value: tp.key, label: language === 'ar' ? tp.ar : tp.en }))]}
                />
              </div>
            )}
            <div className="w-full md:w-52">
              <Select
                value={selectedTag}
                onChange={setSelectedTag}
                ariaLabel={t.allTags}
                isRTL={isRTL}
                options={[{ value: 'all', label: t.allTags }, ...tags.map((tg) => ({ value: tg.en, label: language === 'ar' ? tg.ar : tg.en }))]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-y" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          {visiblePosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl" style={{ color: 'var(--text-muted)' }}>{t.noPosts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {visiblePosts.map((post) => (
                <PostCard
                  key={post.slug}
                  href={localeHref(`/blog/${post.slug}`, language)}
                  title={language === 'ar' ? post.titleAr : post.title}
                  excerpt={language === 'ar' ? post.excerptAr : post.excerpt}
                  coverImage={post.coverImage}
                  coverImageAlt={post.coverImageAlt}
                  badge={topicLabel(post.topic, language)}
                  meta={[formatDate(post.date), formatReadingTime(language === 'ar' ? post.readingMinutesAr : post.readingMinutes, language)]}
                  readMoreLabel={t.readMore}
                  byline={`${t.by} ${language === 'ar' ? post.authorAr : post.author}`}
                />
              ))}
            </div>
          )}
          {!isFiltering && pagination}
        </div>
      </section>
    </>
  )
}
