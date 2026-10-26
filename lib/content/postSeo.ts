/**
 * Search and social metadata for a blog post, for either language.
 *
 * One builder for both routes (they previously each held their own copy),
 * so the English and Arabic pages can't drift apart.
 */
import type { Metadata } from 'next'
import type { BlogPostMeta } from '@/lib/blog'
import { alternatesFor, localeUrl, SITE_URL, type Locale } from '@/lib/i18n'
import { TITLE_MAX, TITLE_SUFFIX, X_HANDLE } from '@/lib/site'

/** Google shows roughly 150–160 characters of a description. */
export const DESCRIPTION_MAX = 160

/**
 * The `<title>` for a post: with the site suffix while it fits in TITLE_MAX
 * characters, otherwise the post title alone (`absolute` skips the template),
 * so a long title is not pushed past the cut by " | Accez".
 */
export function postDocumentTitle(title: string): Metadata['title'] {
  return title.length + TITLE_SUFFIX.length <= TITLE_MAX ? title : { absolute: title }
}

/**
 * Shortens text to at most `max` characters, cutting at a word boundary and
 * ending with an ellipsis, so a search snippet never ends mid-word
 * ("...and tenant satisfacti...").
 */
export function truncateAtWord(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut
  return base.replace(/[\s,;:.\-–—،؛]+$/u, '') + '…'
}

/**
 * Absolute URL of the image for link previews and structured data. Covers are
 * served as WebP on the page, but social scrapers don't reliably render WebP,
 * so they get the original JPEG kept next to it.
 */
export function socialImageUrl(coverImage: string): string {
  return coverImage.startsWith('http') ? coverImage : `${SITE_URL}${coverImage.replace(/\.webp$/, '.jpg')}`
}

export function postMetadata(post: BlogPostMeta, locale: Locale): Metadata {
  const ar = locale === 'ar'
  // Prefer the explicit search-result fields when a post has them.
  const title = (ar ? post.metaTitleAr || post.titleAr : post.metaTitle || post.title).trim()
  const description = truncateAtWord(ar ? post.metaDescriptionAr || post.excerptAr : post.metaDescription || post.excerpt)
  const url = localeUrl(`blog/${post.slug}`, locale)
  const image = socialImageUrl(post.coverImage)

  return {
    title: postDocumentTitle(title),
    description,
    alternates: alternatesFor(`blog/${post.slug}`, locale),
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Accez',
      ...(ar ? { locale: 'ar_SA' } : {}),
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: [ar ? post.authorAr : post.author],
      tags: ar ? post.tagsAr : post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.coverImageAlt }],
    },
    twitter: { card: 'summary_large_image', site: X_HANDLE, title, description, images: [image] },
  }
}
