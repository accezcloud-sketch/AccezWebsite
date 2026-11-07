import { describe, expect, it } from 'vitest'
import { getAllPosts, getPostsByTopic } from '@/lib/blog'
import { DASH_PUNCTUATION, stringsIn } from './copyCheck'
import { guidesFor, hubPostSlugs, OFFICIAL_DOMAINS, REGULATION_TOPICS, REGULATIONS_COPY } from './saudiRegulations'

const posts = getAllPosts()
const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, '')

describe('Saudi regulations hub', () => {
  it('covers the six regulation topics, each with an authority and posts', () => {
    expect(REGULATION_TOPICS.map((t) => t.id)).toEqual(['ejar-leases', 'zatca-tax', 'pdpl', 'tourism-licensing', 'riyadh-rent-rules', 'security-deposits'])
    for (const t of REGULATION_TOPICS) {
      expect(t.postSlugs.length, t.id).toBeGreaterThan(0)
      expect(t.summary.en.length, t.id).toBeGreaterThan(40)
      expect(t.summary.ar.length, t.id).toBeGreaterThan(40)
    }
  })

  it('links only to official authority sites, over https', () => {
    const urls = REGULATION_TOPICS.flatMap((t) => [t.authority.url, ...t.sources.map((s) => s.url)])
    for (const url of urls) {
      expect(url, url).toMatch(/^https:\/\//)
      expect(OFFICIAL_DOMAINS as readonly string[], url).toContain(hostOf(url))
    }
  })

  it('links to real posts, and to every post filed under Saudi regulations', () => {
    const slugs = new Set(posts.map((p) => p.slug))
    for (const slug of hubPostSlugs(posts)) expect(slugs.has(slug), slug).toBe(true)
    for (const p of getPostsByTopic('saudi-regulations')) expect(hubPostSlugs(posts), p.slug).toContain(p.slug)
  })

  it('files a new Saudi regulations post (from the blog automation) under the right topic automatically', () => {
    const fresh = (slug: string, title: string) => ({ ...posts[0], slug, title, date: '2099-01-01', topic: 'saudi-regulations' as const })
    const extra = [fresh('paying-rent-through-ejar-digital-channels', "Paying Rent Through Ejar's Digital Channels"), fresh('selling-gift-cards-vat', 'VAT on Gift Cards'), fresh('shomoos-guest-registration', 'Shomoos Guest Registration for Furnished Apartments')]
    const all = [...posts, ...extra]
    const ids = Object.fromEntries(extra.map((p) => [p.slug, REGULATION_TOPICS.find((t) => guidesFor(t, all, 'en').some((g) => g.slug === p.slug))?.id]))
    expect(ids).toEqual({ 'paying-rent-through-ejar-digital-channels': 'ejar-leases', 'selling-gift-cards-vat': 'zatca-tax', 'shomoos-guest-registration': 'tourism-licensing' })
    const ejar = guidesFor(REGULATION_TOPICS[0], all, 'en').map((g) => g.slug)
    expect(ejar.slice(0, REGULATION_TOPICS[0].postSlugs.length)).toEqual(REGULATION_TOPICS[0].postSlugs)
  })

  it('resolves each topic to post titles in both languages, with the review date', () => {
    const [first] = REGULATION_TOPICS
    const en = guidesFor(first, posts, 'en')
    const ar = guidesFor(first, posts, 'ar')
    expect(en[0].title).toBe(posts.find((p) => p.slug === first.postSlugs[0])!.title)
    expect(ar[0].title).toBe(posts.find((p) => p.slug === first.postSlugs[0])!.titleAr)
    const reviewedPost = { ...posts.find((p) => p.slug === first.postSlugs[0])!, reviewed: '2026-10-26' }
    expect(guidesFor({ ...first, postSlugs: [reviewedPost.slug] }, [reviewedPost], 'en')[0].reviewed).toBe('2026-10-26')
  })

  it('refuses a slug that is not a post', () => {
    expect(() => guidesFor({ ...REGULATION_TOPICS[0], postSlugs: ['no-such-post'] }, posts, 'en')).toThrow(/no-such-post/)
  })

  it('uses no dashes as punctuation and never claims anything about Accez', () => {
    for (const s of stringsIn([REGULATION_TOPICS, REGULATIONS_COPY])) {
      expect(s).not.toMatch(DASH_PUNCTUATION)
      expect(s).not.toMatch(/accez|أكسيز/i)
    }
  })
})
