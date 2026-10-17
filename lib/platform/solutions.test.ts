import { describe, expect, it } from 'vitest'
import { PLATFORM_SOLUTIONS, solutionByKey } from './solutions'

describe('PLATFORM_SOLUTIONS', () => {
  it('has unique, URL-safe keys', () => {
    const keys = PLATFORM_SOLUTIONS.map((s) => s.key)
    expect(new Set(keys).size).toBe(keys.length)
    keys.forEach((k) => expect(k).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/))
  })

  it('gives every solution complete copy in both languages', () => {
    for (const s of PLATFORM_SOLUTIONS) {
      for (const field of [s.name, s.audience, s.role, s.roleSummary, s.summary, s.pricingNote, ...s.pages.flatMap((p) => [p.label, p.description])]) {
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
})
