import { describe, expect, it } from 'vitest'
import { pageCount, pageItems, pageRoute, parsePageParam } from './pagination'

describe('pagination', () => {
  it('counts pages, with at least one', () => {
    expect(pageCount(0, 24)).toBe(1)
    expect(pageCount(24, 24)).toBe(1)
    expect(pageCount(25, 24)).toBe(2)
    expect(pageCount(106, 24)).toBe(5)
  })

  it('slices a 1-based page', () => {
    const items = Array.from({ length: 50 }, (_, i) => i)
    expect(pageItems(items, 1, 24)).toEqual(items.slice(0, 24))
    expect(pageItems(items, 3, 24)).toEqual([48, 49])
    expect(pageItems(items, 4, 24)).toEqual([])
    expect(pageItems(items, 0, 24)).toEqual([])
    expect(pageItems(items, 1.5, 24)).toEqual([])
  })

  it('puts page 1 on the base route', () => {
    expect(pageRoute('blog', 1)).toBe('blog')
    expect(pageRoute('blog', 2)).toBe('blog/page/2')
    expect(pageRoute('blog/topic/rent-payments', 3)).toBe('blog/topic/rent-payments/page/3')
  })

  it('accepts only canonical page numbers from 2 up', () => {
    expect(parsePageParam('2')).toBe(2)
    expect(parsePageParam('1')).toBeNull()
    expect(parsePageParam('02')).toBeNull()
    expect(parsePageParam('x')).toBeNull()
    expect(parsePageParam('-3')).toBeNull()
  })
})
