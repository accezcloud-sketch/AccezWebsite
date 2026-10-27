import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { createBlogRepository, getAllPosts, getPostsForPage } from '@/lib/blog'
import { postAudience } from '@/lib/content/postAudience'

/** A throwaway posts folder: [slug, title, tags, date, audience?]. */
function repoWith(posts: [string, string, string[], string, string?][]) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'page-posts-'))
  for (const [slug, title, tags, date, audience] of posts) {
    const fm = [`title: "${title}"`, `date: "${date}"`, `tags: [${tags.map((t) => `"${t}"`).join(', ')}]`]
    if (audience) fm.push(`audience: "${audience}"`)
    fs.writeFileSync(path.join(dir, `${slug}.md`), `---\n${fm.join('\n')}\n---\nBody`)
  }
  return { repo: createBlogRepository(dir), done: () => fs.rmSync(dir, { recursive: true, force: true }) }
}

const CORPUS: [string, string, string[], string, string?][] = [
  ['leases', 'Lease renewals and rent increases', ['leases', 'rent'], '2026-01-01'],
  ['channels', 'Sync Airbnb and Booking.com without double bookings', ['channel manager'], '2026-01-02'],
  ['maintenance', 'Emergency maintenance and work orders', ['maintenance'], '2026-01-03'],
  ['no-shows', 'How barbers cut no-shows with deposits', ['barbers', 'appointments'], '2026-01-04'],
  ['salon-team', 'Scheduling a salon team', ['salons', 'staff'], '2026-01-05'],
]

describe('postAudience', () => {
  it('files posts about barbers, salons, spas and coaches under service providers', () => {
    expect(postAudience({ title: 'How barbers cut no-shows', excerpt: '', tags: ['appointments'] })).toBe('service-providers')
    expect(postAudience({ title: 'Personal trainer pricing', excerpt: 'Coaching sessions', tags: [] })).toBe('service-providers')
  })
  it('keeps everything else with property managers', () => {
    expect(postAudience({ title: 'Lease renewals in Riyadh', excerpt: 'Ejar contracts', tags: ['leases'] })).toBe('property-managers')
  })
  it('lets the frontmatter decide', () => {
    expect(postAudience({ title: 'Lease renewals', excerpt: '', tags: [], audience: 'service-providers' })).toBe('service-providers')
  })
  it('puts every current post with property managers', () => {
    expect(getAllPosts().filter((p) => p.audience !== 'property-managers').map((p) => p.slug)).toEqual([])
  })
})

describe('getPostsForPage', () => {
  it('picks the posts closest to the page subject, for the page audience only', () => {
    const { repo, done } = repoWith(CORPUS)
    try {
      const slugs = (q: Parameters<typeof repo.getPostsForPage>[0]) => repo.getPostsForPage(q).map((p) => p.slug)
      expect(slugs({ about: 'Maintenance work orders', audience: 'property-managers', limit: 1 })).toEqual(['maintenance'])
      expect(slugs({ about: 'Channel manager for Airbnb', audience: 'property-managers', limit: 1 })).toEqual(['channels'])
      expect(slugs({ about: 'Bookings for barbers', audience: 'service-providers' })).toEqual(['no-shows', 'salon-team'])
      expect(slugs({ about: 'Leases', audience: 'service-providers' })).not.toContain('leases')
    } finally {
      done()
    }
  })

  it('shows hand-picked posts first, then fills with the closest and the newest', () => {
    const { repo, done } = repoWith(CORPUS)
    try {
      const got = repo.getPostsForPage({ about: 'Leases and rent', audience: 'property-managers', pinned: ['maintenance', 'missing'] })
      expect(got.map((p) => p.slug)).toEqual(['maintenance', 'leases', 'channels'])
    } finally {
      done()
    }
  })

  it('shows nothing for an audience without posts, so the section is hidden', () => {
    const { repo, done } = repoWith(CORPUS.slice(0, 3))
    try {
      expect(repo.getPostsForPage({ about: 'Bookings for barbers', audience: 'service-providers' })).toEqual([])
    } finally {
      done()
    }
  })

  it('a new post appears on the matching page without editing the page', () => {
    const { repo, done } = repoWith([...CORPUS, ['spa-gift-cards', 'Selling spa gift cards', ['spas'], '2026-01-06']])
    try {
      expect(repo.getPostsForPage({ about: 'Spas and wellness: gift cards and deposits', audience: 'service-providers', limit: 1 }).map((p) => p.slug)).toEqual(['spa-gift-cards'])
    } finally {
      done()
    }
  })

  it('related articles under a post stay within its audience', () => {
    const { repo, done } = repoWith(CORPUS)
    try {
      expect(repo.getRelatedPosts('no-shows').map((p) => p.audience)).toEqual(['service-providers'])
    } finally {
      done()
    }
  })

  it('fills three posts on every real property management page', () => {
    expect(getPostsForPage({ about: 'Pricing, plans and billing', audience: 'property-managers' })).toHaveLength(3)
  })
})
