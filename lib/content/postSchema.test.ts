import { describe, expect, it } from 'vitest'
import type { BlogPostMeta } from '@/lib/blog'
import { postSchemas } from './postSchema'

const post = {
  slug: 'my-post', title: 'Title', titleAr: 'عنوان', excerpt: 'Excerpt', excerptAr: 'مقتطف', date: '2026-01-01',
  author: 'Accez Team', authorAr: 'فريق أكسيز', coverImage: '/images/blog/my-post.webp', coverImageAlt: 'alt',
  category: 'Industry Insights', categoryAr: 'رؤى الصناعة', tags: ['a', 'b'], tagsAr: ['أ', 'ب'],
  topic: 'rent-payments', readingMinutes: 5, readingMinutesAr: 5,
} as BlogPostMeta

describe('postSchemas', () => {
  it('describes the post with canonical URLs and its topic', () => {
    const [posting] = postSchemas(post, 'en') as Record<string, any>[]
    expect(posting['@type']).toBe('BlogPosting')
    expect(posting.url).toBe('https://www.accez.cloud/blog/my-post/')
    expect(posting.mainEntityOfPage['@id']).toBe('https://www.accez.cloud/blog/my-post/')
    expect(posting.articleSection).toBe('Rent & payments')
    expect(posting.image).toBe('https://www.accez.cloud/images/blog/my-post.jpg')
    expect(posting.dateModified).toBe('2026-01-01')
  })

  it('attributes house posts to the site Organization, not a second entity', () => {
    const [posting] = postSchemas(post, 'en') as Record<string, any>[]
    expect(posting.author).toEqual({ '@type': 'Organization', '@id': 'https://www.accez.cloud/#organization', name: 'Accez', url: 'https://www.accez.cloud' })
  })

  it('uses a Person for posts with a named author', () => {
    const [posting] = postSchemas({ ...post, authorUrl: 'https://linkedin.com/in/x', authorRole: 'Head of Ops' }, 'en') as Record<string, any>[]
    expect(posting.author['@type']).toBe('Person')
    expect(posting.author.jobTitle).toBe('Head of Ops')
  })

  it('uses the updated date when set', () => {
    const [posting] = postSchemas({ ...post, updated: '2026-03-01' }, 'en') as Record<string, any>[]
    expect(posting.dateModified).toBe('2026-03-01')
  })

  it('builds Home > Blog > Topic > Post breadcrumbs in each language', () => {
    const [, crumbs] = postSchemas(post, 'ar') as Record<string, any>[]
    expect(crumbs.itemListElement.map((i: { name: string }) => i.name)).toEqual(['الرئيسية', 'المدونة', 'الإيجار والمدفوعات', 'عنوان'])
    expect(crumbs.itemListElement[2].item).toBe('https://www.accez.cloud/ar/blog/topic/rent-payments/')
  })
})
