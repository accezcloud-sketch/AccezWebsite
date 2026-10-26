import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { PLATFORM_SOLUTIONS, solutionByKey } from './solutions'
import { SOLUTION_SUBPAGES, modulesInArea, subpageBySlug, subpageHref, subpagesOf } from './subpages'
import { bilingualFields, detailPageProblems } from './detailPageChecks'
import { sitemapStaticRoutes } from '@/lib/content/lastModified'
import { routeKey } from '@/lib/build/pageDates.mjs'

const APP = path.join(process.cwd(), 'app')

describe('solution subpages (modules and kinds of customer)', () => {
  it('belong to a known solution, with slugs unique within it', () => {
    for (const p of SOLUTION_SUBPAGES) expect(solutionByKey(p.solution), p.slug).toBeDefined()
    const keys = SOLUTION_SUBPAGES.map((p) => `${p.solution}/${p.slug}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('meet the detail page rules (copy in both languages, title, description, screenshots, posts)', () => {
    expect(SOLUTION_SUBPAGES.flatMap(detailPageProblems)).toEqual([])
  })

  it('are served in English and Arabic', () => {
    expect(existsSync(path.join(APP, 'solutions/[solution]/[page]/page.tsx'))).toBe(true)
    expect(existsSync(path.join(APP, 'ar/solutions/[solution]/[page]/page.tsx'))).toBe(true)
    expect(subpageHref({ solution: 'property-managers', slug: 'channel-manager' })).toBe('/solutions/property-managers/channel-manager')
  })

  it('link only to modules of their own solution, never to themselves', () => {
    for (const p of SOLUTION_SUBPAGES) {
      for (const slug of p.modules) {
        const m = subpageBySlug(p.solution, slug)
        expect(m?.kind, `${p.slug} -> ${slug}`).toBe('module')
        expect(slug).not.toBe(p.slug)
      }
    }
  })

  it('link to 2 or 3 posts on module pages', () => {
    for (const p of SOLUTION_SUBPAGES.filter((x) => x.kind === 'module')) {
      expect(p.posts.length, p.slug).toBeGreaterThanOrEqual(2)
      expect(p.posts.length, p.slug).toBeLessThanOrEqual(3)
    }
  })

  it('places modules in real sections of the property management page', () => {
    const sections = ['rentals', 'sales', 'billing']
    for (const p of subpagesOf('property-managers', 'module')) if (p.area) expect(sections, p.slug).toContain(p.area)
    for (const area of sections) expect(modulesInArea('property-managers', area).length, area).toBeGreaterThan(0)
  })

  it('are all in the sitemap', () => {
    const routes = sitemapStaticRoutes()
    for (const p of SOLUTION_SUBPAGES) expect(routes, p.slug).toContain(routeKey(subpageHref(p)))
  })

  it('gives the property management solution its modules', () => {
    expect(subpagesOf('property-managers', 'module').length).toBeGreaterThanOrEqual(6)
    for (const s of PLATFORM_SOLUTIONS) expect(subpagesOf(s.key, 'module').every((p) => p.solution === s.key)).toBe(true)
  })

  it('gives every solution 3 or 4 pages for kinds of customer', () => {
    for (const s of PLATFORM_SOLUTIONS) {
      const n = subpagesOf(s.key, 'audience').length
      expect(n, s.key).toBeGreaterThanOrEqual(3)
      expect(n, s.key).toBeLessThanOrEqual(4)
    }
  })

  it('keeps the two solutions apart: provider pages never speak of properties, tenants or owners', () => {
    for (const p of SOLUTION_SUBPAGES.filter((x) => x.solution === 'service-providers')) {
      for (const [field, value] of bilingualFields(p)) {
        expect(value.en, `${p.slug}.${field}`).not.toMatch(/\b(propert|tenant|owner|lease|rent)/i)
        expect(value.ar, `${p.slug}.${field}`).not.toMatch(/عقار|مستأجر|مالك|ملاك|إيجار/)
      }
      expect(p.posts, p.slug).toEqual([])
    }
  })
})
