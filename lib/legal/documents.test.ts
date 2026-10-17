import { describe, expect, it } from 'vitest'
import { PLATFORM_SOLUTIONS, solutionByKey } from '@/lib/platform/solutions'
import { LEGAL_DOCUMENTS, legalDocumentsFor, legalHref, legalVersionRoutes, legalVersionTitle } from './documents'

const pm = solutionByKey('property-managers')!
const sp = solutionByKey('service-providers')!

describe('legalHref', () => {
  it('gives each solution its own version of a per-solution document', () => {
    expect(legalHref('terms', pm)).toBe('/terms/property-managers')
    expect(legalHref('refund-policy', sp)).toBe('/refund-policy/service-providers')
  })

  it('keeps the bare address for the chooser', () => {
    expect(legalHref('terms')).toBe('/terms')
  })

  it('gives a shared document one address for everyone', () => {
    expect(legalHref('privacy', pm)).toBe('/privacy')
    expect(legalHref('privacy', sp)).toBe('/privacy')
  })
})

describe('legalDocumentsFor', () => {
  it("lists a solution's own versions plus the shared documents", () => {
    expect(legalDocumentsFor(sp).map((d) => d.href)).toEqual(['/terms/service-providers', '/refund-policy/service-providers', '/privacy'])
  })
})

describe('legalVersionRoutes', () => {
  it('has one route per per-solution document per solution', () => {
    const perSolution = LEGAL_DOCUMENTS.filter((d) => d.perSolution).length
    expect(legalVersionRoutes()).toHaveLength(perSolution * PLATFORM_SOLUTIONS.length)
    expect(new Set(legalVersionRoutes()).size).toBe(legalVersionRoutes().length)
  })
})

describe('legalVersionTitle', () => {
  it('names the audience in both languages', () => {
    expect(legalVersionTitle('terms', pm, 'en')).toBe('Terms of Service for property managers')
    expect(legalVersionTitle('terms', sp, 'ar')).toBe('شروط الخدمة لمقدمي الخدمات')
  })
})

describe('every solution has a legal version', () => {
  it('maps each solution to a distinct audience', () => {
    const audiences = PLATFORM_SOLUTIONS.map((s) => s.legalAudience)
    expect(new Set(audiences).size).toBe(audiences.length)
  })
})
