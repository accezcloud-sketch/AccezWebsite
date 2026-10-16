import { describe, expect, it } from 'vitest'
import { matchProductPage, productScores } from './productMatch'

const post = (title: string, extra: { tags?: string[]; excerpt?: string; primaryKeyword?: string } = {}) => ({
  title,
  excerpt: extra.excerpt ?? '',
  tags: extra.tags ?? [],
  primaryKeyword: extra.primaryKeyword,
})

describe('matchProductPage', () => {
  it('sends owner topics to the Owners page', () => {
    expect(matchProductPage(post('Automated owner reporting: statements that send themselves'))).toBe('owners')
  })

  it('sends short-term rental and channel topics to the Hotels page', () => {
    expect(matchProductPage(post('The double-booking nightmare', { tags: ['channel manager', 'Airbnb'] }))).toBe('hotels')
    expect(matchProductPage(post('Occupancy rate vs RevPAR for vacation rentals'))).toBe('hotels')
  })

  it('sends developer and off-plan topics to the Sales page', () => {
    expect(matchProductPage(post('Selling off-plan units for developers'))).toBe('sales')
  })

  it('falls back to the modules overview when nothing matches strongly', () => {
    expect(matchProductPage(post('Preventive maintenance stops costly repairs'))).toBe('modules')
    // a single passing mention in the excerpt is not enough
    expect(matchProductPage(post('Scaling your team', { excerpt: 'Owners will thank you.' }))).toBe('modules')
  })

  it('falls back to modules on a tie', () => {
    expect(matchProductPage(post('Owner and guest communication'))).toBe('modules')
  })

  it('matches whole words only', () => {
    // "ota" inside "quota" and "str" inside "strategy" must not count
    expect(productScores(post('Quota strategy')).hotels).toBe(0)
  })

  it('is case-insensitive', () => {
    expect(matchProductPage(post('AIRBNB AND BOOKING.COM SMARTER'))).toBe('hotels')
  })
})
