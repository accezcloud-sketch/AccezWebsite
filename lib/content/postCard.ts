/**
 * The subset of a post a list card needs. Client components receive this
 * instead of full post metadata: everything passed to a client component is
 * serialised into the page, so unused fields (SEO overrides, credits, ...)
 * were roughly doubling the blog index's size.
 */
import type { BlogPostMeta } from '@/lib/blog'

export type PostCardData = Pick<
  BlogPostMeta,
  | 'slug'
  | 'title'
  | 'titleAr'
  | 'excerpt'
  | 'excerptAr'
  | 'date'
  | 'author'
  | 'authorAr'
  | 'coverImage'
  | 'coverImageAlt'
  | 'topic'
  | 'tags'
  | 'readingMinutes'
  | 'readingMinutesAr'
>

export function toPostCardData(post: BlogPostMeta): PostCardData {
  return {
    slug: post.slug,
    title: post.title,
    titleAr: post.titleAr,
    excerpt: post.excerpt,
    excerptAr: post.excerptAr,
    date: post.date,
    author: post.author,
    authorAr: post.authorAr,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    topic: post.topic,
    tags: post.tags,
    readingMinutes: post.readingMinutes,
    readingMinutesAr: post.readingMinutesAr,
  }
}
