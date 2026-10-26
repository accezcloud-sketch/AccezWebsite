import { describe, expect, it } from 'vitest'
import type { BlogPostMeta } from '@/lib/blog'
import { postDocumentTitle, postMetadata, socialImageUrl, TITLE_MAX, TITLE_SUFFIX, truncateAtWord } from './postSeo'

describe('truncateAtWord', () => {
  it('leaves short text alone', () => {
    expect(truncateAtWord('Short and sweet.')).toBe('Short and sweet.')
  })

  it('cuts at a word boundary with an ellipsis, within the limit', () => {
    const text = 'Discover strategies to streamline utility and bill management for your rental properties, from tracking expenses to ensuring compliance and tenant satisfaction. Boost your portfolio.'
    const out = truncateAtWord(text)
    expect(out.length).toBeLessThanOrEqual(160)
    expect(out.endsWith('…')).toBe(true)
    expect(out).not.toMatch(/satisfacti…$/)
    expect(text.startsWith(out.slice(0, -1))).toBe(true)
  })

  it('does not leave trailing punctuation before the ellipsis', () => {
    expect(truncateAtWord('alpha beta, gamma delta', 13)).toBe('alpha beta…')
  })

  it('handles Arabic text', () => {
    const out = truncateAtWord('اكتشف استراتيجيات لتبسيط إدارة المرافق والفواتير لعقاراتك الإيجارية، '.repeat(4))
    expect(out.length).toBeLessThanOrEqual(160)
    expect(out).toMatch(/[؀-ۿ]…$/)
  })

  it('collapses whitespace', () => {
    expect(truncateAtWord('a\n  b')).toBe('a b')
  })
})

describe('socialImageUrl', () => {
  it('serves the JPEG for WebP covers, absolute', () => {
    expect(socialImageUrl('/images/blog/x.webp')).toBe('https://www.accez.cloud/images/blog/x.jpg')
    expect(socialImageUrl('https://cdn.example.com/x.webp')).toBe('https://cdn.example.com/x.webp')
  })
})

describe('postMetadata', () => {
  const post = {
    slug: 'my-post', title: 'Title', titleAr: 'عنوان', excerpt: 'Excerpt', excerptAr: 'مقتطف',
    metaTitle: 'SEO title', metaDescription: 'SEO description', date: '2026-01-01',
    author: 'Accez Team', authorAr: 'فريق أكسيز', coverImage: '/images/blog/my-post.webp', coverImageAlt: 'alt',
    category: 'c', categoryAr: 'ف', tags: ['t'], tagsAr: ['و'], readingMinutes: 5, readingMinutesAr: 5,
  } as BlogPostMeta

  it('prefers the search-result fields in English', () => {
    const m = postMetadata(post, 'en')
    expect(m.title).toBe('SEO title')
    expect(m.description).toBe('SEO description')
  })

  it('falls back to title and excerpt in Arabic when no Arabic meta fields exist', () => {
    const m = postMetadata(post, 'ar')
    expect(m.title).toBe('عنوان')
    expect(m.description).toBe('مقتطف')
  })

  it('uses canonical URLs with a trailing slash for Open Graph', () => {
    expect((postMetadata(post, 'en').openGraph as { url: string }).url).toBe('https://www.accez.cloud/blog/my-post/')
    expect((postMetadata(post, 'ar').openGraph as { url: string }).url).toBe('https://www.accez.cloud/ar/blog/my-post/')
  })
  it('drops the " | Accez" suffix when the title would pass 60 characters', () => {
    const long = 'Utility and Bill Management Across a Rental Portfolio Guide'
    const m = postMetadata({ ...post, metaTitle: long }, 'en')
    expect(m.title).toEqual({ absolute: long })
    // The share title never had the suffix and stays the plain title.
    expect((m.openGraph as { title: string }).title).toBe(long)
  })
})

describe('postDocumentTitle', () => {
  it('keeps the suffix while title plus suffix fit in 60 characters', () => {
    const fits = 'x'.repeat(TITLE_MAX - TITLE_SUFFIX.length)
    expect(postDocumentTitle(fits)).toBe(fits)
    expect(`${fits}${TITLE_SUFFIX}`.length).toBe(60)
  })

  it('uses the title alone, past the template, once it would not fit', () => {
    const over = 'x'.repeat(TITLE_MAX - TITLE_SUFFIX.length + 1)
    expect(postDocumentTitle(over)).toEqual({ absolute: over })
  })

  it('applies the same rule to Arabic titles', () => {
    expect(postDocumentTitle('إدارة الفواتير')).toBe('إدارة الفواتير')
    const longAr = 'إدارة المرافق والفواتير عبر محفظة عقارات الإيجار: دليل عملي شامل'
    expect(postDocumentTitle(longAr)).toEqual({ absolute: longAr })
  })
})
