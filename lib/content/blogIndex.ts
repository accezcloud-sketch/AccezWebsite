/**
 * Copy and metadata for the blog index and the topic hub pages, in both
 * languages. The index wording is the site's existing copy; topic pages use
 * short templates around the topic name.
 */
import type { Metadata } from 'next'
import { alternatesFor, localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { topicLabel, type TopicKey } from './topics'
import { pageRoute } from './pagination'

export const BLOG_INDEX_COPY = {
  en: {
    eyebrow: 'Blog',
    title: 'Property insights for Saudi operators',
    subtitle: 'Insights, tips and updates about running property in the Kingdom.',
    metaTitle: 'Blog',
    metaDescription:
      'Property management insights, tips, and tutorials from the Accez Cloud team. Learn how to scale your portfolio, automate operations, and manage properties in Saudi Arabia.',
    socialTitle: 'Blog | Accez',
    socialDescription: 'Property management insights, tips, and tutorials from the Accez Cloud team.',
    browseByTopic: 'Browse by topic',
    allArticles: 'All articles',
    topicSubtitle: (topic: string) => `Articles on ${topic.toLowerCase()} for property operators in Saudi Arabia.`,
    pageSuffix: (n: number) => ` – Page ${n}`,
  },
  ar: {
    eyebrow: 'المدونة',
    title: 'رؤى عقارية للمشغّلين في السعودية',
    subtitle: 'رؤى ونصائح وتحديثات حول إدارة العقارات في المملكة.',
    metaTitle: 'المدونة',
    metaDescription:
      'رؤى ونصائح وأدلة في إدارة العقارات من فريق أكسيز. تعرّف على كيفية تنمية محفظتك وأتمتة العمليات وإدارة العقارات في السعودية.',
    socialTitle: 'المدونة | أكسيز',
    socialDescription: 'رؤى ونصائح وأدلة في إدارة العقارات من فريق أكسيز.',
    browseByTopic: 'تصفح حسب الموضوع',
    allArticles: 'كل المقالات',
    topicSubtitle: (topic: string) => `مقالات حول ${topic} لمشغّلي العقارات في السعودية.`,
    pageSuffix: (n: number) => ` – الصفحة ${n}`,
  },
} as const

/** Site route of the blog index or a topic hub, without locale prefix. */
export function blogIndexRoute(topic?: TopicKey): string {
  return topic ? `blog/topic/${topic}` : 'blog'
}

export function blogIndexMetadata(locale: Locale, topic?: TopicKey, page = 1): Metadata {
  const c = BLOG_INDEX_COPY[locale]
  // Each page of a listing is its own canonical URL (Google's pagination guidance).
  const route = pageRoute(blogIndexRoute(topic), page)
  const label = topic ? topicLabel(topic, locale) : null
  const title = (label ?? c.metaTitle) + (page > 1 ? c.pageSuffix(page) : '')
  const description = label ? c.topicSubtitle(label) : c.metaDescription

  return {
    title,
    description,
    alternates: alternatesFor(route, locale),
    openGraph: {
      title: label ? `${label} | Accez` : c.socialTitle,
      description: label ? description : c.socialDescription,
      type: 'website',
      url: localeUrl(route, locale),
      siteName: 'Accez',
      ...(locale === 'ar' ? { locale: 'ar_SA' } : {}),
      // Set explicitly: a page's own openGraph replaces the root layout's, image included.
      images: [{ url: `${SITE_URL}/images/og-image.png`, width: 1200, height: 630, alt: title }],
    },
  }
}
