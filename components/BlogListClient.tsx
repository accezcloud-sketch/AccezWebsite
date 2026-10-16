'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { type BlogPostMeta } from '@/lib/blog'
import Select from '@/components/ui/Select'
import PostCard from '@/components/blog/PostCard'
import { useBlogFiltersInUrl } from '@/components/blog/useBlogFiltersInUrl'
import { hasTag } from '@/lib/content/blogFilters'
import { formatReadingTime } from '@/lib/content/readingTime'
import { localeHref } from '@/lib/i18n'

interface BlogListClientProps {
  posts: BlogPostMeta[]
  categories: { en: string; ar: string }[]
  tags: { en: string; ar: string }[]
}

export default function BlogListClient({ posts, categories, tags }: BlogListClientProps) {
  const { language, isRTL } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const knownTags = useMemo(() => tags.map((tg) => tg.en), [tags])
  const knownCategories = useMemo(() => categories.map((c) => c.en), [categories])
  useBlogFiltersInUrl({
    tag: selectedTag,
    category: selectedCategory,
    setTag: setSelectedTag,
    setCategory: setSelectedCategory,
    knownTags,
    knownCategories,
  })

  const content = {
    en: {
      searchPlaceholder: 'Search articles...',
      allCategories: 'All Categories',
      allTags: 'All Tags',
      readMore: 'Read More',
      noPosts: 'No blog posts found.',
      by: 'By',
    },
    ar: {
      searchPlaceholder: 'البحث في المقالات...',
      allCategories: 'جميع الفئات',
      allTags: 'جميع الوسوم',
      readMore: 'اقرأ المزيد',
      noPosts: 'لم يتم العثور على مقالات.',
      by: 'بواسطة',
    },
  }

  const t = content[language]

  const isFiltering = selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery !== ''

  const filteredSlugs = useMemo(() => {
    if (!isFiltering) return null

    let result = posts

    if (selectedCategory !== 'all') {
      result = result.filter((post) => post.category === selectedCategory)
    }

    if (selectedTag !== 'all') {
      result = result.filter((post) => hasTag(post.tags, selectedTag))
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.titleAr.includes(searchQuery) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.excerptAr.includes(searchQuery)
      )
    }

    return new Set(result.map((p) => p.slug))
  }, [posts, selectedCategory, selectedTag, searchQuery, isFiltering])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const controlClass =
    'w-full px-4 py-3 rounded-lg border transition-all duration-200 outline-none text-white focus:ring-2'
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
          background: 'rgba(9,19,28,0.9)',
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
            <div className="w-full md:w-52">
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                ariaLabel={t.allCategories}
                isRTL={isRTL}
                options={[{ value: 'all', label: t.allCategories }, ...categories.map((c) => ({ value: c.en, label: language === 'ar' ? c.ar : c.en }))]}
              />
            </div>
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
          {isFiltering && filteredSlugs && filteredSlugs.size === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl" style={{ color: 'var(--text-muted)' }}>{t.noPosts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {posts.map((post) => {
                const isHidden = isFiltering && filteredSlugs && !filteredSlugs.has(post.slug)
                return (
                  <PostCard
                    key={post.slug}
                    href={localeHref(`/blog/${post.slug}`, language)}
                    title={language === 'ar' ? post.titleAr : post.title}
                    excerpt={language === 'ar' ? post.excerptAr : post.excerpt}
                    coverImage={post.coverImage}
                    coverImageAlt={post.coverImageAlt}
                    category={language === 'ar' ? post.categoryAr : post.category}
                    meta={[formatDate(post.date), formatReadingTime(language === 'ar' ? post.readingMinutesAr : post.readingMinutes, language)]}
                    readMoreLabel={t.readMore}
                    byline={`${t.by} ${language === 'ar' ? post.authorAr : post.author}`}
                    className={isHidden ? 'hidden' : ''}
                  />
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
