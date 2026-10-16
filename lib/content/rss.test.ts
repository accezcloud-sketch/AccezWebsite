import { describe, expect, it } from 'vitest'
import type { BlogPostMeta } from '@/lib/blog'
import { buildRssFeed, feedUrl } from './rss'

const post = (slug: string, date: string, title = 'Rent & "payments" <guide>') =>
  ({ slug, date, title, titleAr: 'عنوان', excerpt: 'Excerpt', excerptAr: 'مقتطف', coverImage: `/images/blog/${slug}.webp` }) as BlogPostMeta

describe('buildRssFeed', () => {
  const xml = buildRssFeed([post('newer', '2026-10-12'), post('older', '2026-09-01')], 'en')

  it('is an RSS 2.0 channel with a self link', () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml).toContain('<rss version="2.0"')
    expect(xml).toContain('<atom:link href="https://www.accez.cloud/blog/rss.xml" rel="self"')
  })

  it('escapes XML special characters', () => {
    expect(xml).toContain('<title>Rent &amp; &quot;payments&quot; &lt;guide&gt;</title>')
    expect(xml).not.toContain('<guide>')
  })

  it('lists posts in order with canonical links and RFC 822 dates', () => {
    expect(xml.indexOf('/blog/newer/')).toBeLessThan(xml.indexOf('/blog/older/'))
    expect(xml).toContain('<pubDate>Mon, 12 Oct 2026 09:00:00 GMT</pubDate>')
    expect(xml).toContain('<lastBuildDate>Mon, 12 Oct 2026 09:00:00 GMT</lastBuildDate>')
  })

  it('builds the Arabic feed with Arabic text and URLs', () => {
    const ar = buildRssFeed([post('x', '2026-10-12')], 'ar')
    expect(ar).toContain('<language>ar-SA</language>')
    expect(ar).toContain('<link>https://www.accez.cloud/ar/blog/x/</link>')
    expect(ar).toContain('<title>عنوان</title>')
    expect(feedUrl('ar')).toBe('https://www.accez.cloud/ar/blog/rss.xml')
  })

  it('respects the item limit', () => {
    const many = Array.from({ length: 60 }, (_, i) => post(`p${i}`, '2026-01-01'))
    expect(buildRssFeed(many, 'en', 50).match(/<item>/g)).toHaveLength(50)
  })
})
