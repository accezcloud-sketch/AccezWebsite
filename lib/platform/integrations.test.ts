import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { INTEGRATION_GROUPS, INTEGRATIONS, INTEGRATIONS_HUB, integrationBySlug, integrationHref } from './integrations'
import { detailPageProblems, DESCRIPTION_MAX, DESCRIPTION_MIN } from './detailPageChecks'
import { solutionByKey } from './solutions'
import { SOLUTION_SUBPAGES, subpageBySlug } from './subpages'
import { sitemapStaticRoutes } from '@/lib/content/lastModified'
import { routeKey } from '@/lib/build/pageDates.mjs'
import { TITLE_MAX, TITLE_SUFFIX } from '@/lib/site'

const APP = path.join(process.cwd(), 'app')

describe('integrations', () => {
  it('are exactly the confirmed connections, nothing more', () => {
    expect(INTEGRATIONS.map((i) => i.slug).sort()).toEqual(['airbnb', 'booking-com', 'expedia', 'google-analytics', 'meta-pixel', 'stripe', 'tap', 'twilio-sms'])
  })

  it('meet the detail page rules (copy in both languages, title, description, screenshots, posts)', () => {
    expect(INTEGRATIONS.flatMap(detailPageProblems)).toEqual([])
  })

  it('belong to a group and to known solutions; booking channels only to property management', () => {
    const groups = INTEGRATION_GROUPS.map((g) => g.key)
    for (const i of INTEGRATIONS) {
      expect(groups, i.slug).toContain(i.group)
      expect(i.solutions.length, i.slug).toBeGreaterThan(0)
      for (const key of i.solutions) expect(solutionByKey(key), `${i.slug} ${key}`).toBeDefined()
      if (i.group === 'channels') expect(i.solutions, i.slug).toEqual(['property-managers'])
    }
    for (const g of groups) expect(INTEGRATIONS.some((i) => i.group === g), g).toBe(true)
  })

  it('link to real module pages, and every page links to real integrations', () => {
    for (const i of INTEGRATIONS) for (const slug of i.modules) expect(subpageBySlug('property-managers', slug)?.kind, `${i.slug} -> ${slug}`).toBe('module')
    for (const p of SOLUTION_SUBPAGES) {
      for (const slug of p.integrations) {
        const i = integrationBySlug(slug)
        expect(i, `${p.slug} -> ${slug}`).toBeDefined()
        expect(i!.solutions, `${p.slug} -> ${slug}`).toContain(p.solution)
      }
    }
  })

  it('never claim channels or services the owner has not confirmed', () => {
    const text = JSON.stringify([INTEGRATIONS, INTEGRATIONS_HUB])
    expect(text).not.toMatch(/whatsapp|vrbo|mada|stc pay|apple pay|\b400\b/i)
  })

  it('have a hub page whose title and description fit', () => {
    for (const locale of ['en', 'ar'] as const) {
      expect(`${INTEGRATIONS_HUB.metaTitle[locale]}${TITLE_SUFFIX}`.length).toBeLessThanOrEqual(TITLE_MAX)
      const d = INTEGRATIONS_HUB.metaDescription[locale].length
      expect(d, locale).toBeGreaterThanOrEqual(DESCRIPTION_MIN)
      expect(d, locale).toBeLessThanOrEqual(DESCRIPTION_MAX)
    }
  })

  it('are served in English and Arabic and listed in the sitemap', () => {
    for (const dir of ['integrations', 'ar/integrations']) {
      expect(existsSync(path.join(APP, dir, 'page.tsx')), dir).toBe(true)
      expect(existsSync(path.join(APP, dir, '[integration]/page.tsx')), dir).toBe(true)
    }
    const routes = sitemapStaticRoutes()
    expect(routes).toContain('integrations')
    for (const i of INTEGRATIONS) expect(routes).toContain(routeKey(integrationHref(i.slug)))
  })

  it('use text marks only, never third-party logo files', () => {
    const images = path.join(process.cwd(), 'public', 'images')
    const files = existsSync(images) ? readdirSync(images, { recursive: true }).map(String) : []
    // Blog covers may mention a channel in their names; they are photos, not logos.
    expect(files.filter((f) => !f.startsWith('blog') && /(airbnb|booking|expedia|stripe|twilio|meta-pixel|google-analytics)/i.test(f))).toEqual([])
  })
})
