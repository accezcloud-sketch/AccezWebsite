import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { newestDate, sitemapStaticRoutes, staticPageDate } from './lastModified'
import PAGE_DATES from './page-dates.json'
import { committedDay, localDay, PAGE_SOURCES } from '@/lib/build/pageDates.mjs'

describe('newestDate', () => {
  it('returns the newest publish or update date', () => {
    expect(newestDate([{ date: '2026-03-01' }, { date: '2026-01-01', updated: '2026-05-02' }], '2026-01-01')).toBe('2026-05-02')
  })

  it('never goes earlier than the fallback', () => {
    expect(newestDate([{ date: '2025-01-01' }], '2026-07-01')).toBe('2026-07-01')
    expect(newestDate([], '2026-07-01')).toBe('2026-07-01')
  })

  it('ignores a time part', () => {
    expect(newestDate([{ date: '2026-08-09T10:00:00Z' }], '2026-01-01')).toBe('2026-08-09')
  })
})

describe('static page dates', () => {
  const dates = PAGE_DATES as Record<string, string>

  it('gives every static page in the sitemap a date and a list of sources', () => {
    const routes = sitemapStaticRoutes()
    expect(routes).toContain('')
    expect(routes).toContain('pricing/property-managers')
    for (const route of routes) {
      expect(dates[route], `/${route} has no date`).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(PAGE_SOURCES[route as keyof typeof PAGE_SOURCES], `/${route} has no sources`).toBeTruthy()
    }
    // No leftovers for pages that are gone.
    expect(Object.keys(dates).sort()).toEqual([...routes].sort())
    expect(Object.keys(PAGE_SOURCES).sort()).toEqual([...routes].sort())
  })

  it('reads a page date with or without slashes, and refuses an unknown page', () => {
    expect(staticPageDate('/pricing/property-managers', { 'pricing/property-managers': '2026-10-01' })).toBe('2026-10-01')
    expect(staticPageDate('', { '': '2026-09-01' })).toBe('2026-09-01')
    expect(() => staticPageDate('new-page', {})).toThrow(/PAGE_SOURCES/)
  })

  it('never dates a page in the future', () => {
    const today = localDay()
    for (const [route, day] of Object.entries(dates)) expect(day <= today, `/${route}: ${day}`).toBe(true)
  })

  // The JSON is committed, so it must keep up with the history of each page's
  // sources. Skipped where git or the full history is not available.
  const git = (args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  let fullHistory = false
  try { fullHistory = git(['rev-parse', '--is-shallow-repository']).trim() === 'false' } catch {}

  it.skipIf(!fullHistory)('is not older than the last commit to any page\'s sources (run node scripts/page-dates.mjs)', () => {
    for (const [route, sources] of Object.entries(PAGE_SOURCES)) {
      const committed = committedDay(sources, git)
      if (committed) expect(dates[route] >= committed, `/${route}: ${dates[route]} is older than ${committed}`).toBe(true)
    }
  })
})
