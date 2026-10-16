/**
 * RSS 2.0 feed for the blog, one per language. Pure: the routes that serve
 * it pass the posts in.
 */
import type { BlogPostMeta } from '@/lib/blog'
import { localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { socialImageUrl } from './postSeo'

/** Feed URL (a file, so no trailing slash). */
export function feedUrl(locale: Locale): string {
  return `${SITE_URL}${locale === 'ar' ? '/ar' : ''}/blog/rss.xml`
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

const rfc822 = (isoDate: string) => new Date(`${isoDate.slice(0, 10)}T09:00:00Z`).toUTCString()

const CHANNEL: Record<Locale, { title: string; description: string; language: string }> = {
  en: { title: 'Accez Blog', description: 'Insights, tips and updates about running property in Saudi Arabia.', language: 'en' },
  ar: { title: 'مدونة أكسيز', description: 'رؤى ونصائح وتحديثات حول إدارة العقارات في المملكة.', language: 'ar-SA' },
}

export function buildRssFeed(posts: BlogPostMeta[], locale: Locale, limit = 50): string {
  const c = CHANNEL[locale]
  const ar = locale === 'ar'
  const items = posts.slice(0, limit).map((p) => {
    const url = localeUrl(`blog/${p.slug}`, locale)
    return [
      '    <item>',
      `      <title>${escapeXml(ar ? p.titleAr : p.title)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${rfc822(p.date)}</pubDate>`,
      `      <description>${escapeXml(ar ? p.excerptAr : p.excerpt)}</description>`,
      `      <enclosure url="${escapeXml(socialImageUrl(p.coverImage))}" type="image/jpeg" length="0" />`,
      '    </item>',
    ].join('\n')
  })
  const lastBuild = posts[0] ? rfc822(posts[0].updated || posts[0].date) : rfc822('2026-01-01')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(c.title)}</title>`,
    `    <link>${localeUrl('blog', locale)}</link>`,
    `    <description>${escapeXml(c.description)}</description>`,
    `    <language>${c.language}</language>`,
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${feedUrl(locale)}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
