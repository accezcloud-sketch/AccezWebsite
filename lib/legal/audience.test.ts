import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  appliesTo,
  formatSectionNumber,
  PRIVACY_SECTIONS,
  REFUND_SECTIONS,
  sectionNumbers,
  TERMS_SECTIONS,
  type LegalSection,
} from './audience'

const legalDir = path.join(import.meta.dirname, '..', '..', 'components', 'legal')
const source = (file: string) => readFileSync(path.join(legalDir, file), 'utf8')
const idsIn = (file: string) => [...source(file).matchAll(/<S id="([^"]+)"/g)].map((m) => m[1])

const DOCS: [string, LegalSection[], string][] = [
  ['Terms', TERMS_SECTIONS, 'TermsContent'],
  ['Refund', REFUND_SECTIONS, 'RefundContent'],
  ['Privacy', PRIVACY_SECTIONS, 'PrivacyContent'],
]

describe('section lists match the documents', () => {
  it.each(DOCS)('%s: same sections, same order, in English and Arabic', (_, sections, file) => {
    const ids = sections.map((s) => s.id)
    expect(idsIn(`${file}.tsx`)).toEqual(ids)
    expect(idsIn(`${file}Ar.tsx`)).toEqual(ids)
  })

  it.each(DOCS)('%s: titles carry no hand-written numbers (they are generated per version)', (_, __, file) => {
    for (const f of [`${file}.tsx`, `${file}Ar.tsx`]) {
      expect(source(f)).not.toMatch(/<S id="[^"]+" title="[0-9٠-٩]+\./)
    }
  })

  it.each(DOCS)('%s: no written-out section numbers left in the text', (_, __, file) => {
    expect(source(`${file}.tsx`)).not.toMatch(/section [0-9]+/i)
    expect(source(`${file}Ar.tsx`)).not.toMatch(/البند [0-9٠-٩]+/)
  })

  it.each(DOCS)('%s: every cross-reference points at a real section', (_, sections, file) => {
    const ids = new Set(sections.map((s) => s.id))
    for (const f of [`${file}.tsx`, `${file}Ar.tsx`]) {
      for (const [, to] of source(f).matchAll(/<SectionNo to="([^"]+)"/g)) expect(ids).toContain(to)
    }
  })
})

describe('appliesTo', () => {
  it('shows shared content in every version', () => {
    expect(appliesTo('all', 'pm')).toBe(true)
    expect(appliesTo('all', 'sp')).toBe(true)
  })

  it("leaves the other audience's content out of a version", () => {
    expect(appliesTo('sp', 'pm')).toBe(false)
    expect(appliesTo('pm', 'sp')).toBe(false)
    expect(appliesTo('pm', 'pm')).toBe(true)
  })

  it('shows everything in a shared document', () => {
    expect(appliesTo('pm', undefined)).toBe(true)
    expect(appliesTo('sp', undefined)).toBe(true)
  })
})

describe('sectionNumbers', () => {
  it('numbers each version without gaps', () => {
    const pm = sectionNumbers(TERMS_SECTIONS, 'pm')
    const sp = sectionNumbers(TERMS_SECTIONS, 'sp')
    expect(pm.providers).toBeUndefined()
    expect(pm['customer-content']).toBe(pm.refunds + 1)
    expect(sp.providers).toBe(sp.refunds + 1)
    expect(Object.values(pm).sort((a, b) => a - b)).toEqual(Object.keys(pm).map((_, i) => i + 1))
  })

  it('gives each refund version its own numbering', () => {
    expect(sectionNumbers(REFUND_SECTIONS, 'pm')).toMatchObject({ overview: 1, reservations: 2, deposits: 3, sales: 9 })
    expect(sectionNumbers(REFUND_SECTIONS, 'sp')).toMatchObject({ overview: 1, deposits: 2 })
    expect(sectionNumbers(REFUND_SECTIONS, 'sp').sales).toBeUndefined()
  })

  it('numbers a shared document straight through', () => {
    expect(sectionNumbers(PRIVACY_SECTIONS, undefined).contact).toBe(PRIVACY_SECTIONS.length)
  })
})

describe('formatSectionNumber', () => {
  it('uses Arabic-Indic digits on Arabic pages', () => {
    expect(formatSectionNumber(10, 'ar')).toBe('١٠')
    expect(formatSectionNumber(10, 'en')).toBe('10')
  })
})
