import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { INTEGRATION_GROUPS, INTEGRATION_SERVICES, INTEGRATIONS_HUB, integrationGroup } from './integrations'
import { DESCRIPTION_MAX, DESCRIPTION_MIN } from './detailPageChecks'
import { solutionByKey } from './solutions'
import { SOLUTION_SUBPAGES } from './subpages'
import { sitemapStaticRoutes } from '@/lib/content/lastModified'
import { TITLE_MAX, TITLE_SUFFIX } from '@/lib/site'

const APP = path.join(process.cwd(), 'app')

describe('integrations', () => {
  it('are exactly the confirmed connections, nothing more', () => {
    expect(INTEGRATION_SERVICES.map((i) => i.name.en)).toEqual([
      'Airbnb', 'Booking.com', 'Expedia', 'RoomCloud', 'iCal calendars', 'Stripe', 'Tap', 'Google Analytics', 'Meta Pixel', 'SMS (Twilio)',
    ])
  })

  it('are one page, with no page per service', () => {
    expect(existsSync(path.join(APP, 'integrations', 'page.tsx'))).toBe(true)
    expect(existsSync(path.join(APP, 'ar', 'integrations', 'page.tsx'))).toBe(true)
    for (const dir of ['integrations', 'ar/integrations']) {
      expect(readdirSync(path.join(APP, dir)).filter((f) => f !== 'page.tsx'), dir).toEqual([])
    }
    const routes = sitemapStaticRoutes()
    expect(routes).toContain('integrations')
    expect(routes.filter((r) => r.startsWith('integrations/'))).toEqual([])
  })

  it('belong to a group and to known solutions; channels and calendars only to property management', () => {
    const groups = INTEGRATION_GROUPS.map((g) => g.key)
    for (const i of INTEGRATION_SERVICES) {
      expect(groups, i.name.en).toContain(i.group)
      expect(i.solutions.length, i.name.en).toBeGreaterThan(0)
      for (const key of i.solutions) expect(solutionByKey(key), `${i.name.en} ${key}`).toBeDefined()
      if (i.group === 'channels') expect(i.solutions, i.name.en).toEqual(['property-managers'])
    }
    for (const g of groups) expect(INTEGRATION_SERVICES.some((i) => i.group === g), g).toBe(true)
  })

  it('are linked from module and customer pages by group, only in the solutions that have them', () => {
    for (const p of SOLUTION_SUBPAGES) {
      for (const key of p.integrations) {
        expect(integrationGroup(key), `${p.slug} -> ${key}`).toBeDefined()
        expect(INTEGRATION_SERVICES.some((s) => s.group === key && s.solutions.includes(p.solution)), `${p.slug} -> ${key}`).toBe(true)
      }
    }
  })

  it('never claim channels or services the owner has not confirmed', () => {
    const text = JSON.stringify([INTEGRATION_SERVICES, INTEGRATIONS_HUB])
    expect(text).not.toMatch(/whatsapp|vrbo|mada|stc pay|apple pay|\b400\b/i)
  })

  it('have a page title and description that fit', () => {
    for (const locale of ['en', 'ar'] as const) {
      expect(`${INTEGRATIONS_HUB.metaTitle[locale]}${TITLE_SUFFIX}`.length).toBeLessThanOrEqual(TITLE_MAX)
      const d = INTEGRATIONS_HUB.metaDescription[locale].length
      expect(d, locale).toBeGreaterThanOrEqual(DESCRIPTION_MIN)
      expect(d, locale).toBeLessThanOrEqual(DESCRIPTION_MAX)
    }
  })

  it('send no redirects for service pages that were never published', () => {
    expect(readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')).not.toMatch(/"\/(ar\/)?integrations\//)
  })

  it('use text marks only, never third-party logo files', () => {
    const images = path.join(process.cwd(), 'public', 'images')
    const files = existsSync(images) ? readdirSync(images, { recursive: true }).map(String) : []
    // Blog covers may mention a channel in their names; they are photos, not logos.
    expect(files.filter((f) => !f.startsWith('blog') && /(airbnb|booking|expedia|roomcloud|stripe|twilio|meta-pixel|google-analytics)/i.test(f))).toEqual([])
  })
})
