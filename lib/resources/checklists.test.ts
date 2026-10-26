import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { getAllPosts } from '@/lib/blog'
import { checklistById, CHECKLISTS, DOWNLOADS_COPY } from './checklists'
import { DASH_PUNCTUATION, stringsIn } from './copyCheck'
import { checklistPdfPath } from './routes'

describe('checklists', () => {
  it('has the three checklists, each with unique ids and items in both languages', () => {
    expect(CHECKLISTS.map((c) => c.id)).toEqual(['move-in-move-out-inspection-checklist', 'short-term-rental-licensing-checklist', 'new-owner-onboarding-checklist'])
    for (const c of CHECKLISTS) {
      expect(checklistById(c.id)).toBe(c)
      for (const s of c.sections) for (const item of s.items) {
        expect(item.text.en, c.id).toBeTruthy()
        expect(item.text.ar, c.id).toBeTruthy()
      }
    }
  })

  it('cites a real source for every sourced item, over https', () => {
    for (const c of CHECKLISTS) {
      for (const s of c.sections) for (const item of s.items) {
        if (item.source !== undefined) expect(c.sources[item.source], `${c.id}: ${item.text.en}`).toBeDefined()
      }
      for (const s of c.sources) expect(s.url).toMatch(/^https:\/\//)
    }
  })

  it('is based on real posts', () => {
    const slugs = new Set(getAllPosts().map((p) => p.slug))
    for (const c of CHECKLISTS) for (const slug of c.postSlugs) expect(slugs.has(slug), slug).toBe(true)
  })

  it('ships a committed PDF per checklist and language', () => {
    for (const c of CHECKLISTS) for (const locale of ['en', 'ar'] as const) {
      const file = path.join(process.cwd(), 'public', checklistPdfPath(c.id, locale))
      expect(fs.existsSync(file), file).toBe(true)
      expect(fs.readFileSync(file).subarray(0, 5).toString()).toBe('%PDF-')
    }
  })

  it('uses no dashes as punctuation and describes no Accez feature', () => {
    for (const s of stringsIn([CHECKLISTS, DOWNLOADS_COPY])) expect(s).not.toMatch(DASH_PUNCTUATION)
    for (const s of stringsIn(CHECKLISTS)) expect(s).not.toMatch(/accez|أكسيز/i)
  })
})
