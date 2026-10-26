import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createBlogRepository, type BlogPostMeta } from '@/lib/blog'
import { formatDay, postDateModified, reviewedLabel, toIsoDay } from './postDates'
import { postSchemas } from './postSchema'

describe('toIsoDay', () => {
  it('accepts a quoted day, a day with a time part and a YAML date', () => {
    expect(toIsoDay('2026-10-26')).toBe('2026-10-26')
    expect(toIsoDay(' 2026-10-26T09:00:00Z')).toBe('2026-10-26')
    expect(toIsoDay(new Date(Date.UTC(2026, 9, 26)))).toBe('2026-10-26')
  })

  it('rejects anything that is not a real day', () => {
    expect(toIsoDay(undefined)).toBeUndefined()
    expect(toIsoDay('')).toBeUndefined()
    expect(toIsoDay('26/10/2026')).toBeUndefined()
    expect(toIsoDay('2026-02-30')).toBeUndefined()
    expect(toIsoDay(20261026)).toBeUndefined()
    expect(toIsoDay(new Date('nope'))).toBeUndefined()
  })
})

describe('postDateModified', () => {
  it('is the newest of the publish, update and review days', () => {
    expect(postDateModified({ date: '2026-09-01' })).toBe('2026-09-01')
    expect(postDateModified({ date: '2026-09-01', updated: '2026-09-10' })).toBe('2026-09-10')
    expect(postDateModified({ date: '2026-09-01', updated: '2026-09-10', reviewed: '2026-10-26' })).toBe('2026-10-26')
  })

  it('ignores a review day older than the last edit', () => {
    expect(postDateModified({ date: '2026-09-01', updated: '2026-09-10', reviewed: '2026-09-05' })).toBe('2026-09-10')
    expect(postDateModified({ date: '2026-09-01', reviewed: '2026-08-01' })).toBe('2026-09-01')
  })
})

describe('formatDay', () => {
  it('writes the day in each language, Gregorian, without a time-zone shift', () => {
    expect(formatDay('2026-09-06', 'en')).toBe('September 6, 2026')
    expect(formatDay('2026-09-06', 'ar')).toBe('٦ سبتمبر ٢٠٢٦')
    expect(formatDay('2026-01-01', 'en')).toBe('January 1, 2026')
  })

  it('labels the review date in each language', () => {
    expect(reviewedLabel('en')).toBe('Last reviewed')
    expect(reviewedLabel('ar')).toBe('آخر مراجعة')
  })
})

describe('reviewed frontmatter', () => {
  it('is read from a post, quoted or not, and dropped when invalid', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-reviewed-'))
    const write = (slug: string, extra: string) =>
      fs.writeFileSync(path.join(dir, `${slug}.md`), `---\ntitle: "${slug}"\ndate: "2026-09-01"\n${extra}---\nBody\n<!-- AR -->\nنص`)
    try {
      write('quoted', 'reviewed: "2026-10-26"\n')
      write('unquoted', 'reviewed: 2026-10-20\n')
      write('invalid', 'reviewed: "soon"\n')
      write('none', '')
      const repo = createBlogRepository(dir)
      const bySlug = Object.fromEntries(repo.getAllPosts().map((p) => [p.slug, p.reviewed]))
      expect(bySlug).toEqual({ quoted: '2026-10-26', unquoted: '2026-10-20', invalid: undefined, none: undefined })
      expect(repo.getPostBySlug('quoted')?.reviewed).toBe('2026-10-26')
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('becomes the article dateModified when newer', () => {
    const post = {
      slug: 'p', title: 'T', titleAr: 'ع', excerpt: 'E', excerptAr: 'م', date: '2026-09-01', author: 'Accez Team', authorAr: 'فريق أكسيز',
      coverImage: '/images/blog/p.webp', coverImageAlt: '', category: '', categoryAr: '', tags: [], tagsAr: [],
      topic: 'saudi-regulations', readingMinutes: 3, readingMinutesAr: 3,
    } as BlogPostMeta
    const modified = (p: BlogPostMeta) => (postSchemas(p, 'en')[0] as Record<string, string>).dateModified
    expect(modified({ ...post, reviewed: '2026-10-26' })).toBe('2026-10-26')
    expect(modified({ ...post, updated: '2026-10-01', reviewed: '2026-09-15' })).toBe('2026-10-01')
    expect((postSchemas({ ...post, reviewed: '2026-10-26' }, 'en')[0] as Record<string, string>).datePublished).toBe('2026-09-01')
  })
})
