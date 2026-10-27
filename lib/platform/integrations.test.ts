import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { INTEGRATION_GROUPS, INTEGRATION_SERVICES, INTEGRATIONS, INTEGRATIONS_HUB, RETIRED_INTEGRATION_PAGES, integrationBySlug, integrationHref } from './integrations'
import { detailPageProblems, DESCRIPTION_MAX, DESCRIPTION_MIN } from './detailPageChecks'
import { solutionByKey } from './solutions'
import { SOLUTION_SUBPAGES, subpageBySlug } from './subpages'
import { sitemapStaticRoutes } from '@/lib/content/lastModified'
import { routeKey } from '@/lib/build/pageDates.mjs'
import { TITLE_MAX, TITLE_SUFFIX } from '@/lib/site'

const APP = path.join(process.cwd(), 'app')

describe('integrations', () => {
  it('are exactly the confirmed connections, nothing more', () => {
    expect(INTEGRATION_SERVICES.map((i) => i.name.en)).toEqual(['Airbnb', 'Booking.com', 'Expedia', 'Stripe', 'Tap', 'Google Analytics', 'Meta Pixel', 'SMS (Twilio)'])
  })

  it('have one page per group with screens of its own, not one near-copy per service', () => {
    expect(INTEGRATIONS.map((i) => i.slug)).toEqual(['booking-channels', 'payments'])
    const shotSets = INTEGRATIONS.map((i) => i.shots.map((s) => s.shot).join(','))
    expect(new Set(shotSets).size).toBe(shotSets.length)
  })

  it('redirect every retired page permanently, in English and Arabic', () => {
    const redirects: { source: string; destination: string; permanent: boolean }[] = JSON.parse(readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')).redirects
    for (const [old, to] of Object.entries(RETIRED_INTEGRATION_PAGES)) {
      if (to) expect(integrationBySlug(to), to).toBeDefined()
      for (const pre of ['', '/ar']) {
        const r = redirects.find((x) => x.source === `${pre}/integrations/${old}/`)
        expect(r, `${pre}/${old}`).toMatchObject({ destination: `${pre}/integrations/${to ? `${to}/` : ''}`, permanent: true })
      }
    }
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
    for (const g of groups) expect(INTEGRATION_SERVICES.some((i) => i.group === g), g).toBe(true)
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
    const text = JSON.stringify([INTEGRATIONS, INTEGRATION_SERVICES, INTEGRATIONS_HUB])
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
