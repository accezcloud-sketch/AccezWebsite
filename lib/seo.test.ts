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
})
