import { describe, expect, it } from 'vitest'
import { DEFAULT_TOPIC, isTopicKey, TOPICS, topicLabel, topicOf } from './topics'

const post = (title: string, extra: { tags?: string[]; excerpt?: string; topic?: string; category?: string } = {}) => ({
  title,
  excerpt: extra.excerpt ?? '',
  tags: extra.tags ?? [],
  topic: extra.topic,
  category: extra.category,
})

describe('topicOf', () => {
  it('files posts by subject', () => {
    expect(topicOf(post('ZATCA e-invoicing for property managers'))).toBe('saudi-regulations')
    expect(topicOf(post('Emergency maintenance at 2 AM'))).toBe('maintenance-operations')
    expect(topicOf(post('Syncing Airbnb and Booking.com channels'))).toBe('short-term-rentals')
    expect(topicOf(post('Automated owner reporting'))).toBe('owner-relations')
    expect(topicOf(post('Automate rent collection with Mada payments'))).toBe('rent-payments')
    expect(topicOf(post('Improve tenant communication beyond WhatsApp'))).toBe('tenants-communication')
  })

  it('lets an explicit frontmatter topic win', () => {
    expect(topicOf(post('Emergency maintenance at 2 AM', { topic: 'owner-relations' }))).toBe('owner-relations')
  })

  it('ignores an unknown frontmatter topic', () => {
    expect(topicOf(post('Emergency maintenance at 2 AM', { topic: 'nonsense' }))).toBe('maintenance-operations')
  })

  it('files tutorials as product guides', () => {
    expect(topicOf(post('Anything at all', { category: 'Tutorials' }))).toBe('product-guides')
    expect(topicOf(post('Anything at all', { category: 'Getting Started' }))).toBe('product-guides')
  })

  it('falls back to the default topic when nothing matches', () => {
    expect(topicOf(post('Thoughts on the year ahead'))).toBe(DEFAULT_TOPIC)
  })

  it('breaks a tie in favour of the more specific, earlier topic', () => {
    // one regulation phrase and one short-term phrase in the title: regulations is listed first
    expect(topicOf(post('Ejar and Airbnb'))).toBe('saudi-regulations')
  })
})

describe('TOPICS', () => {
  it('has unique, URL-safe keys', () => {
    const keys = TOPICS.map((t) => t.key)
    expect(new Set(keys).size).toBe(keys.length)
    keys.forEach((k) => expect(k).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/))
  })

  it('has labels in both languages', () => {
    for (const t of TOPICS) {
      expect(topicLabel(t.key, 'en')).toMatch(/\w/)
      expect(topicLabel(t.key, 'ar')).toMatch(/[؀-ۿ]/)
    }
  })

  it('recognises its own keys only', () => {
    expect(isTopicKey('rent-payments')).toBe(true)
    expect(isTopicKey('Rent & payments')).toBe(false)
    expect(isTopicKey(undefined)).toBe(false)
  })
})
