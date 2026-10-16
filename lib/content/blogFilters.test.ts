import { describe, expect, it } from 'vitest'
import { blogFiltersQuery, hasTag, parseBlogFilters } from './blogFilters'

const known = { tags: ['rent collection', 'Ejar', 'maintenance'], categories: ['Industry Insights', 'Tutorials'] }

describe('parseBlogFilters', () => {
  it('reads a known tag, whatever its case or encoding', () => {
    expect(parseBlogFilters('?tag=rent%20collection', known).tag).toBe('rent collection')
    expect(parseBlogFilters('?tag=rent+collection', known).tag).toBe('rent collection')
    expect(parseBlogFilters('?tag=EJAR', known).tag).toBe('Ejar')
  })

  it('reads a known category', () => {
    expect(parseBlogFilters('?category=tutorials', known).category).toBe('Tutorials')
  })

  it('drops unknown or empty values instead of filtering to nothing', () => {
    expect(parseBlogFilters('?tag=nonexistent&category=nope', known)).toEqual({ tag: null, category: null })
    expect(parseBlogFilters('?tag=', known).tag).toBeNull()
    expect(parseBlogFilters('', known)).toEqual({ tag: null, category: null })
  })

  it('treats injected markup as an unknown value', () => {
    expect(parseBlogFilters('?tag=%3Cscript%3E', known).tag).toBeNull()
  })
})

describe('blogFiltersQuery', () => {
  it('encodes spaces and special characters', () => {
    expect(blogFiltersQuery({ tag: 'rent collection' })).toBe('?tag=rent+collection')
    expect(blogFiltersQuery({ tag: 'a&b' })).toBe('?tag=a%26b')
  })

  it('returns an empty string when there is nothing to filter', () => {
    expect(blogFiltersQuery({})).toBe('')
    expect(blogFiltersQuery({ tag: null, category: null })).toBe('')
  })

  it('round-trips through parseBlogFilters', () => {
    const query = blogFiltersQuery({ tag: 'rent collection', category: 'Tutorials' })
    expect(parseBlogFilters(query, known)).toEqual({ tag: 'rent collection', category: 'Tutorials' })
  })
})

describe('hasTag', () => {
  it('matches regardless of case and surrounding spaces', () => {
    expect(hasTag(['Property Management', 'Ejar'], 'property management')).toBe(true)
    expect(hasTag([' saudi arabia '], 'Saudi Arabia')).toBe(true)
  })

  it('does not match partial tags', () => {
    expect(hasTag(['property management'], 'property')).toBe(false)
  })
})
