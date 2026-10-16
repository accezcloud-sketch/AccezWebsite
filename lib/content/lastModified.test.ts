import { describe, expect, it } from 'vitest'
import { newestDate } from './lastModified'

describe('newestDate', () => {
  it('returns the newest publish or update date', () => {
    expect(newestDate([{ date: '2026-03-01' }, { date: '2026-01-01', updated: '2026-05-02' }], '2026-01-01')).toBe('2026-05-02')
  })

  it('never goes earlier than the fallback', () => {
    expect(newestDate([{ date: '2025-01-01' }], '2026-07-01')).toBe('2026-07-01')
    expect(newestDate([], '2026-07-01')).toBe('2026-07-01')
  })

  it('ignores a time part', () => {
    expect(newestDate([{ date: '2026-08-09T10:00:00Z' }], '2026-01-01')).toBe('2026-08-09')
  })
})
