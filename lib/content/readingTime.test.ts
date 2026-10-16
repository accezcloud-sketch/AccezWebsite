import { describe, expect, it } from 'vitest'
import { formatReadingTime, readingMinutes } from './readingTime'

describe('readingMinutes', () => {
  it('measures about 200 words a minute, rounding up', () => {
    expect(readingMinutes(Array(400).fill('word').join(' '))).toBe(2)
    expect(readingMinutes(Array(401).fill('word').join(' '))).toBe(3)
  })

  it('never reports less than one minute', () => {
    expect(readingMinutes('')).toBe(1)
    expect(readingMinutes('short')).toBe(1)
  })

  it('counts Arabic words', () => {
    expect(readingMinutes(Array(600).fill('كلمة').join(' '))).toBe(3)
  })
})

describe('formatReadingTime', () => {
  it('formats per locale', () => {
    expect(formatReadingTime(8, 'en')).toBe('8 min read')
    expect(formatReadingTime(8, 'ar')).toBe('٨ دقيقة قراءة')
    expect(formatReadingTime(12, 'ar')).toBe('١٢ دقيقة قراءة')
  })
})
