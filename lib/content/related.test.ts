import { describe, expect, it } from 'vitest'
import { normaliseTerm, RelatedIndex, tokenize, type RelatableDoc } from './related'

const doc = (slug: string, title: string, extra: Partial<RelatableDoc> = {}): RelatableDoc => ({
  slug,
  title,
  date: '2026-01-01',
  excerpt: '',
  tags: [],
  ...extra,
})

const corpus: RelatableDoc[] = [
  doc('rent-a', 'Automate rent collection with online payments', { tags: ['rent collection'] }),
  doc('rent-b', 'Late rent payments are a systems problem', { tags: ['rent collection'] }),
  doc('rent-c', 'Mada and Apple Pay for rent payments', { tags: ['payments'] }),
  doc('maint-a', 'Emergency maintenance at 2 AM', { tags: ['maintenance'] }),
  doc('maint-b', 'Preventive maintenance stops costly repairs', { tags: ['maintenance'] }),
  doc('maint-c', 'Building a maintenance vendor network', { tags: ['maintenance', 'vendors'] }),
  doc('review-a', 'Timing the review request for five-star ratings', { tags: ['guest reviews'] }),
]

describe('normaliseTerm', () => {
  it('folds plurals and possessives', () => {
    expect(normaliseTerm('payments')).toBe('payment')
    expect(normaliseTerm('properties')).toBe('property')
    expect(normaliseTerm("tenant's")).toBe('tenant')
  })

  it('leaves words that only look plural alone', () => {
    expect(normaliseTerm('business')).toBe('business')
    expect(normaliseTerm('status')).toBe('status')
    expect(normaliseTerm('bus')).toBe('bus')
  })
})

describe('tokenize', () => {
  it('drops stopwords, short tokens and brand words', () => {
    expect(tokenize('How Accez Cloud helps you automate the rent')).toEqual(['help', 'automate', 'rent'])
  })

  it('ignores punctuation and numbers-only tokens', () => {
    expect(tokenize('400+ channels, 24/7!')).toEqual(['channel'])
  })
})

describe('RelatedIndex.relatedTo', () => {
  const index = new RelatedIndex(corpus)

  it('ranks posts on the same topic first', () => {
    expect(index.relatedTo('maint-a').slice(0, 2).sort()).toEqual(['maint-b', 'maint-c'])
    expect(index.relatedTo('rent-a')[0]).toMatch(/^rent-/)
  })

  it('never returns the post itself or duplicates', () => {
    for (const d of corpus) {
      const related = index.relatedTo(d.slug)
      expect(related).not.toContain(d.slug)
      expect(new Set(related).size).toBe(related.length)
    }
  })

  it('respects the limit', () => {
    expect(index.relatedTo('rent-a', { limit: 1 })).toHaveLength(1)
    expect(index.relatedTo('rent-a', { limit: 0 })).toEqual([])
  })

  it('leaves out posts that share nothing meaningful', () => {
    expect(index.relatedTo('review-a')).toEqual([])
  })

  it('returns nothing for an unknown slug', () => {
    expect(index.relatedTo('does-not-exist')).toEqual([])
  })

  it('puts hand-picked posts first, in the given order', () => {
    const picked = new RelatedIndex([
      ...corpus.filter((d) => d.slug !== 'maint-a'),
      doc('maint-a', 'Emergency maintenance at 2 AM', { tags: ['maintenance'], related: ['review-a', 'rent-c'] }),
    ])
    expect(picked.relatedTo('maint-a')).toEqual(['review-a', 'rent-c', expect.stringMatching(/^maint-/)])
  })

  it('skips hand-picked slugs that are missing, repeated or self', () => {
    const picked = new RelatedIndex([
      ...corpus.filter((d) => d.slug !== 'maint-a'),
      doc('maint-a', 'Emergency maintenance', { tags: ['maintenance'], related: ['gone', 'maint-a', 'rent-c', 'rent-c'] }),
    ])
    const related = picked.relatedTo('maint-a')
    expect(related[0]).toBe('rent-c')
    expect(related).not.toContain('gone')
    expect(related.filter((s) => s === 'rent-c')).toHaveLength(1)
  })

  it('breaks ties by recency, then slug, so output is deterministic', () => {
    const tied = new RelatedIndex([
      doc('target', 'Rent collection'),
      doc('older', 'Rent collection', { date: '2025-01-01' }),
      doc('newer', 'Rent collection', { date: '2026-06-01' }),
      doc('filler', 'Unrelated pool cleaning'),
    ])
    expect(tied.relatedTo('target', { limit: 2 })).toEqual(['newer', 'older'])
  })

  it('works on an empty corpus', () => {
    expect(new RelatedIndex([]).relatedTo('x')).toEqual([])
  })
})
