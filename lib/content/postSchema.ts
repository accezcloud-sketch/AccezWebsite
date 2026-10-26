/**
 * Structured data (schema.org JSON-LD) for a blog post, for either language.
 *
 * - BlogPosting: canonical URLs (trailing slash), the topic as section,
 *   real modification date (the newest of publish, update and fact review).
 *   With no named author, the author is the site's
 *   own Organization entity (defined in app/layout.tsx), not a second,
 *   unnamed "Accez Team" organization. A post that sets `authorUrl` gets a
 *   Person, which is what Google's "who created this" guidance asks for.
 * - BreadcrumbList: Home > Blog > Topic > Post, matching the visible trail.
 */
import type { BlogPostMeta } from '@/lib/blog'
import { localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { socialImageUrl, truncateAtWord } from './postSeo'
import { topicLabel } from './topics'
import { ORGANIZATION_ID } from './siteSchema'
import { postDateModified } from './postDates'


const CRUMBS: Record<Locale, { home: string; blog: string }> = {
  en: { home: 'Home', blog: 'Blog' },
  ar: { home: 'الرئيسية', blog: 'المدونة' },
}

export function postSchemas(post: BlogPostMeta, locale: Locale): object[] {
  const ar = locale === 'ar'
  const url = localeUrl(`blog/${post.slug}`, locale)
  const title = ar ? post.titleAr : post.title
  const topic = topicLabel(post.topic, locale)

  const author = post.authorUrl
    ? {
        '@type': 'Person',
        name: ar ? post.authorAr : post.author,
        url: post.authorUrl,
        sameAs: [post.authorUrl],
        ...(post.authorRole ? { jobTitle: post.authorRole } : {}),
        worksFor: { '@id': ORGANIZATION_ID },
      }
    : { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'Accez', url: SITE_URL }

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: truncateAtWord(ar ? post.metaDescriptionAr || post.excerptAr : post.metaDescription || post.excerpt),
    image: socialImageUrl(post.coverImage),
    datePublished: post.date,
    dateModified: postDateModified(post),
    author,
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    inLanguage: ar ? 'ar' : 'en',
    articleSection: topic,
    keywords: (ar ? post.tagsAr : post.tags).join(ar ? '، ' : ', '),
  }

  const c = CRUMBS[locale]
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: c.home, item: localeUrl('', locale) },
      { '@type': 'ListItem', position: 2, name: c.blog, item: localeUrl('blog', locale) },
      { '@type': 'ListItem', position: 3, name: topic, item: localeUrl(`blog/topic/${post.topic}`, locale) },
      { '@type': 'ListItem', position: 4, name: title, item: url },
    ],
  }

  return [blogPosting, breadcrumb]
}
