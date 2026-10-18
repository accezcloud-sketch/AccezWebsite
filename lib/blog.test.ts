/**
 * Integration tests against the real posts in content/blog.
 *
 * They guard two things: the data layer still returns what the pages expect,
 * and the related-posts suggestions stay on topic as the corpus grows.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createBlogRepository, getAllPosts, getAllTags, getPostBySlug, getPostsByTopic, getPostsForProduct, getRelatedPosts } from './blog'
import { TOPICS } from './content/topics'
import { matchProductPage } from './content/productMatch'

const posts = getAllPosts()
const slugs = new Set(posts.map((p) => p.slug))

describe('getAllPosts / getPostBySlug', () => {
  it('loads every post with the fields pages rely on', () => {
    expect(posts.length).toBeGreaterThan(0)
    for (const p of posts) {
      expect(p.title, p.slug).toBeTruthy()
      expect(p.titleAr, p.slug).toBeTruthy()
      expect(p.date, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}/)
      expect(Array.isArray(p.tags), p.slug).toBe(true)
      expect(p.readingMinutes, p.slug).toBeGreaterThanOrEqual(1)
      expect(p.readingMinutesAr, p.slug).toBeGreaterThanOrEqual(1)
    }
  })

  it('sorts newest first', () => {
    const dates = posts.map((p) => new Date(p.date).getTime())
    expect(dates).toEqual([...dates].sort((a, b) => b - a))
  })

  it('returns the same metadata from both readers', () => {
    for (const meta of posts) {
      const full = getPostBySlug(meta.slug)
      expect(full, meta.slug).not.toBeNull()
      const { content, contentAr, ...rest } = full!
      expect(rest, meta.slug).toEqual(meta)
      expect(content.length, meta.slug).toBeGreaterThan(0)
      expect(contentAr.length, meta.slug).toBeGreaterThan(0)
    }
  })

  it('returns null for a missing post', () => {
    expect(getPostBySlug('this-post-does-not-exist')).toBeNull()
  })
})

describe('getRelatedPosts', () => {
  it('gives every post up to 3 real, distinct suggestions other than itself', () => {
    for (const p of posts) {
      const related = getRelatedPosts(p.slug)
      expect(related.length, p.slug).toBeLessThanOrEqual(3)
      expect(related.length, `${p.slug} has no related posts`).toBeGreaterThan(0)
      const rs = related.map((r) => r.slug)
      expect(rs, p.slug).not.toContain(p.slug)
      expect(new Set(rs).size, p.slug).toBe(rs.length)
      rs.forEach((s) => expect(slugs.has(s), s).toBe(true))
    }
  })

  // Relevance regression: topics with several posts must suggest each other.
  // Each case names a post and a word that its suggestions should mostly share.
  const onTopic: [slug: string, pattern: RegExp, minimum: number][] = [
    ['emergency-maintenance-at-2am-having-a-system-before-you-need', /maintenance|work-order/, 3],
    ['automated-owner-reporting-statements-that-send-themselves', /owner|report/, 2],
    ['the-double-booking-nightmare-how-to-sync-every-channel', /booking|channel|airbnb/, 3],
    ['how-to-create-manage-units-accez-cloud', /accez-cloud/, 2],
    ['mada-stc-pay-and-apple-pay-offering-the-payment-methods-saudi', /rent|payment/, 2],
    ['timing-the-review-request-how-to-get-more-5-star-ratings', /review|impression|check-in/, 3],
  ]

  it.each(onTopic)('%s suggests on-topic posts', (slug, pattern, minimum) => {
    if (!slugs.has(slug)) return // post renamed or removed; nothing to check
    const related = getRelatedPosts(slug).map((r) => r.slug)
    expect(related.filter((s) => pattern.test(s)).length, related.join(', ')).toBeGreaterThanOrEqual(minimum)
  })

  it('honours hand-picked related posts from frontmatter', () => {
    const withPicks = posts.find((p) => p.related?.some((s) => slugs.has(s)))
    if (!withPicks) return // no post hand-picks yet
    const first = withPicks.related!.find((s) => slugs.has(s) && s !== withPicks.slug)
    expect(getRelatedPosts(withPicks.slug)[0].slug).toBe(first)
  })
})

describe('createBlogRepository cache', () => {
  it('picks up added and edited posts without a restart', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-repo-'))
    const write = (slug: string, title: string, mtime: number) => {
      const file = path.join(dir, `${slug}.md`)
      fs.writeFileSync(file, `---\ntitle: "${title}"\ndate: "2026-01-01"\n---\nBody`)
      fs.utimesSync(file, mtime, mtime)
    }

    try {
      const repo = createBlogRepository(dir)
      write('a', 'First', 1_000)
      expect(repo.getAllPosts().map((p) => p.title)).toEqual(['First'])

      write('a', 'First, edited', 2_000)
      write('b', 'Second', 2_000)
      expect(repo.getAllPosts().map((p) => p.title).sort()).toEqual(['First, edited', 'Second'])
    } finally {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('returns an empty list for a missing directory', () => {
    expect(createBlogRepository('/nonexistent/blog/dir').getAllPosts()).toEqual([])
  })
})

describe('getAllTags', () => {
  it('lists each tag once, ignoring case', () => {
    const keys = getAllTags().map((t) => t.en.trim().toLowerCase())
    expect(new Set(keys).size).toBe(keys.length)
  })
})

describe('getPostsForProduct', () => {
  it('returns the newest posts overall for the modules overview', () => {
    expect(getPostsForProduct('modules').map((p) => p.slug)).toEqual(posts.slice(0, 3).map((p) => p.slug))
  })

  it.each(['owners', 'hotels', 'sales'] as const)('returns only %s posts, newest first, at most 3', (product) => {
    const result = getPostsForProduct(product)
    expect(result.length).toBeLessThanOrEqual(3)
    result.forEach((p) => expect(matchProductPage(p), p.slug).toBe(product))
    const dates = result.map((p) => new Date(p.date).getTime())
    expect(dates).toEqual([...dates].sort((a, b) => b - a))
  })
})

describe('post bodies', () => {
  it('never start with leftover frontmatter in either language', () => {
    for (const meta of posts) {
      const post = getPostBySlug(meta.slug)!
      for (const body of [post.content, post.contentAr]) {
        expect(body.trimStart().startsWith('---'), meta.slug).toBe(false)
        expect(body, meta.slug).not.toMatch(/^(title|metaTitle|coverImage):/m)
      }
    }
  })
})

describe('Arabic headings', () => {
  // "الوجبات الرئيسية" is a literal translation of "Key Takeaways" that means
  // "the main meals". The approved heading is "أبرز النقاط".
  it('never use the mistranslated "main meals" heading', () => {
    for (const meta of posts) {
      expect(getPostBySlug(meta.slug)!.contentAr, meta.slug).not.toContain('الوجبات الرئيسية')
    }
  })
})

describe('reading time', () => {
  it('measures each language separately, not the two together', () => {
    for (const meta of posts) {
      const post = getPostBySlug(meta.slug)!
      if (post.content === post.contentAr) continue // single-language post
      const words = (s: string) => s.split(/\s+/).filter(Boolean).length
      // ~200 wpm, rounded up: never more than a minute above the English half alone
      expect(meta.readingMinutes, meta.slug).toBeLessThanOrEqual(Math.ceil(words(post.content) / 200) + 1)
    }
  })
})

describe('topics', () => {
  it('files every post under a known topic, and no topic is empty', () => {
    const used = new Set(posts.map((p) => p.topic))
    TOPICS.forEach((t) => expect(used.has(t.key), t.key).toBe(true))
    expect(TOPICS.reduce((n, t) => n + getPostsByTopic(t.key).length, 0)).toBe(posts.length)
  })
})
