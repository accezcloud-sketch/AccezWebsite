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
    for (const agent of ['Googlebot', 'Bingbot', 'Google-Extended', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot']) {
      const group = robots.split(/\n(?=User-agent:)/).find((g) => new RegExp(`^User-agent:\\s*${agent}\\s*$`, 'im').test(g))
      if (group) expect(group, agent).not.toMatch(/^Disallow:\s*\/\s*$/m)
    }
  })

  it('still blocks the training crawlers and SEO scrapers', () => {
    for (const agent of ['GPTBot', 'CCBot', 'Bytespider', 'AhrefsBot']) {
      const group = robots.split(/\n(?=User-agent:)/).find((g) => new RegExp(`^User-agent:\\s*${agent}\\s*$`, 'im').test(g))
      expect(group, agent).toMatch(/^Disallow:\s*\/\s*$/m)
    }
  })
})

describe('vercel.json security headers', () => {
  const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')) as {
    headers: { source: string; headers: { key: string; value: string }[] }[]
  }
  const all = config.headers.find((h) => h.source === '/(.*)' && h.headers.some((x) => x.key === 'X-Content-Type-Options'))
  const value = (key: string) => all?.headers.find((h) => h.key === key)?.value

  it('sends the standard security headers on every response', () => {
    expect(value('X-Content-Type-Options')).toBe('nosniff')
    expect(value('Referrer-Policy')).toBe('strict-origin-when-cross-origin')
    expect(value('X-Frame-Options')).toBe('SAMEORIGIN')
  })

  it('does not block features the site uses (chat clipboard, video playback)', () => {
    const policy = value('Permissions-Policy') ?? ''
    for (const feature of ['clipboard-write', 'fullscreen', 'encrypted-media', 'picture-in-picture']) {
      expect(policy).not.toContain(`${feature}=()`)
    }
  })
})
