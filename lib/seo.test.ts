/**
 * Guards for site-wide SEO configuration that must agree with the canonical
 * host (https://www.accez.cloud).
 */
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { SITE_URL } from './i18n'

describe('robots.txt', () => {
  const robots = fs.readFileSync(path.join(process.cwd(), 'app/robots.txt'), 'utf8')

  it('points to the sitemap on the canonical host', () => {
    const sitemaps = robots.match(/^Sitemap:\s*(\S+)$/gim) ?? []
    expect(sitemaps.length).toBeGreaterThan(0)
    sitemaps.forEach((line) => expect(line.replace(/^Sitemap:\s*/i, '')).toBe(`${SITE_URL}/sitemap.xml`))
  })

  it('does not throttle crawlers with Crawl-delay', () => {
    expect(robots).not.toMatch(/^Crawl-delay:/im)
  })

  it('keeps search engines and AI search crawlers allowed', () => {
    // Blocked groups list `Disallow: /`; these agents must not have one.
    for (const agent of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot']) {
      const group = robots.split(/\n(?=User-agent:)/).find((g) => new RegExp(`^User-agent:\\s*${agent}\\s*$`, 'im').test(g))
      if (group) expect(group, agent).not.toMatch(/^Disallow:\s*\/\s*$/m)
    }
  })
})
