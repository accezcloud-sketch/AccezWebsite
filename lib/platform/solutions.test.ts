import { describe, expect, it } from 'vitest'
import { PLATFORM_SOLUTIONS, solutionByKey } from './solutions'
import { TITLE_MAX, TITLE_SUFFIX } from '@/lib/site'

describe('PLATFORM_SOLUTIONS', () => {
  it('has unique, URL-safe keys', () => {
    const keys = PLATFORM_SOLUTIONS.map((s) => s.key)
    expect(new Set(keys).size).toBe(keys.length)
    keys.forEach((k) => expect(k).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/))
  })

  it('gives every solution complete copy in both languages', () => {
    for (const s of PLATFORM_SOLUTIONS) {
      for (const field of [s.name, s.pageTitle, s.pageDescription, s.audience, s.role, s.roleSummary, s.summary, s.pricingNote]) {
        expect(field.en.trim(), s.key).not.toBe('')
        expect(field.ar, s.key).toMatch(/[؀-ۿ]/)
      }
    }
  })

  it('gives every solution its own pricing route and legal audience', () => {
    for (const s of PLATFORM_SOLUTIONS) expect(s.pricingHref).toBe(`/pricing/${s.key}`)
    const audiences = PLATFORM_SOLUTIONS.map((s) => s.legalAudience)
    expect(new Set(audiences).size).toBe(audiences.length)
  })

  it('gives every solution page a search title that fits with the suffix', () => {
    for (const s of PLATFORM_SOLUTIONS) {
      for (const locale of ['en', 'ar'] as const) {
        const title = `${s.pageTitle[locale]}${TITLE_SUFFIX}`
        expect(title.length, title).toBeLessThanOrEqual(TITLE_MAX)
      }
    }
  })

  it('looks solutions up by key', () => {
    expect(solutionByKey('service-providers')?.legalAudience).toBe('sp')
    expect(solutionByKey('nope')).toBeUndefined()
  })
})

describe('solution pages', () => {
  it('every solution has a plans component for its pricing page', async () => {
    const { SOLUTION_PRICING } = await import('@/components/pricing/solutionPricing')
    for (const s of PLATFORM_SOLUTIONS) expect(SOLUTION_PRICING[s.key], s.key).toBeDefined()
  })

  it('every solution has a homepage showcase', async () => {
    const { SOLUTION_SHOWCASE } = await import('@/components/home/solutionShowcase')
    for (const s of PLATFORM_SOLUTIONS) expect(SOLUTION_SHOWCASE[s.key], s.key).toBeDefined()
  })
})

describe('solution pages', () => {
  it('every solution has a page under /solutions/', async () => {
    const { SOLUTION_PAGES } = await import('@/components/solutions/solutionPages')
    for (const s of PLATFORM_SOLUTIONS) {
      expect(s.href).toBe(`/solutions/${s.key}`)
      expect(SOLUTION_PAGES[s.key], s.key).toBeDefined()
    }
  })
})

describe('solutionForPath', () => {
  it('finds the solution a page belongs to, in either language', async () => {
    const { solutionForPath } = await import('./solutions')
    expect(solutionForPath('/solutions/service-providers/')?.key).toBe('service-providers')
    expect(solutionForPath('/ar/pricing/service-providers/')?.key).toBe('service-providers')
    expect(solutionForPath('/terms/property-managers/')?.key).toBe('property-managers')
    expect(solutionForPath('/')).toBeUndefined()
    expect(solutionForPath('/blog/some-post/')).toBeUndefined()
  })

  it('gives every solution a main action', () => {
    for (const s of PLATFORM_SOLUTIONS) expect(s.primaryAction.label.en, s.key).toBeTruthy()
  })
})
