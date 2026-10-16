import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { RelatedIndex } from './content/related'
import { hasTag, tagKey } from './content/blogFilters'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  content: string
  contentAr: string
  date: string
  /**
   * Date of the last substantive edit, as `YYYY-MM-DD`.
   *
   * Optional. When absent we fall back to `date`, which is what the schema did
   * unconditionally before — meaning genuine updates were invisible to Google.
   * Only set this when the content actually changed; Google names artificially
   * refreshed dates as a search-engine-first signal.
   */
  updated?: string
  /**
   * Optional SERP overrides.
   *
   * When absent, the page falls back to `title` / `excerpt` (previous
   * behaviour). Setting these lets whoever plans the content decide exactly
   * what Google shows, instead of the description being a blind 157-character
   * slice of the opening paragraph.
   */
  metaTitle?: string
  metaTitleAr?: string
  metaDescription?: string
  metaDescriptionAr?: string
  /** Target query this post is written for. Editorial reference, not output. */
  primaryKeyword?: string
  author: string
  authorAr: string
  /**
   * Public profile URL for a named human author (LinkedIn, personal site).
   *
   * When present, the article is marked up with schema.org `Person` instead of
   * `Organization`, which is what Google's "Who created it" guidance asks for.
   * Leave unset for house-authored posts and the markup stays `Organization`.
   */
  authorUrl?: string
  /** Job title, e.g. "Head of Operations". Used in Person markup. */
  authorRole?: string
  coverImage: string
  coverImageAlt: string
  coverImageCredit?: string
  coverImageCreditUrl?: string
  category: string
  categoryAr: string
  tags: string[]
  tagsAr: string[]
  /**
   * Optional hand-picked related posts (slugs), shown first in the
   * "Related articles" section. Remaining slots are filled by topic
   * similarity — see lib/content/related.ts.
   */
  related?: string[]
  readingTime: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  date: string
  updated?: string
  metaTitle?: string
  metaTitleAr?: string
  metaDescription?: string
  metaDescriptionAr?: string
  primaryKeyword?: string
  author: string
  authorAr: string
  authorUrl?: string
  authorRole?: string
  coverImage: string
  coverImageAlt: string
  coverImageCredit?: string
  coverImageCreditUrl?: string
  category: string
  categoryAr: string
  tags: string[]
  tagsAr: string[]
  /**
   * Optional hand-picked related posts (slugs), shown first in the
   * "Related articles" section. Remaining slots are filled by topic
   * similarity — see lib/content/related.ts.
   */
  related?: string[]
  readingTime: string
}

/**
 * Maps a post's frontmatter to the metadata every page needs. Single source of
 * truth for defaults, shared by the list and single-post readers.
 */
function toMeta(slug: string, data: Record<string, any>, readingTimeText: string): BlogPostMeta {
  return {
    slug,
    title: data.title || '',
    titleAr: data.titleAr || data.title || '',
    excerpt: data.excerpt || '',
    excerptAr: data.excerptAr || data.excerpt || '',
    date: data.date || '',
    updated: data.updated || undefined,
    metaTitle: data.metaTitle || undefined,
    metaTitleAr: data.metaTitleAr || undefined,
    metaDescription: data.metaDescription || undefined,
    metaDescriptionAr: data.metaDescriptionAr || undefined,
    primaryKeyword: data.primaryKeyword || undefined,
    authorUrl: data.authorUrl || undefined,
    authorRole: data.authorRole || undefined,
    author: data.author || '',
    authorAr: data.authorAr || data.author || '',
    coverImage: data.coverImage || '/images/blog/default.jpg',
    coverImageAlt: data.coverImageAlt || data.title || '',
    coverImageCredit: data.coverImageCredit || undefined,
    coverImageCreditUrl: data.coverImageCreditUrl || undefined,
    category: data.category || 'General',
    categoryAr: data.categoryAr || data.category || 'عام',
    tags: data.tags || [],
    tagsAr: data.tagsAr || data.tags || [],
    related: Array.isArray(data.related) ? data.related.map(String) : undefined,
    readingTime: readingTimeText,
  }
}

export interface BlogRepository {
  getAllPosts(): BlogPostMeta[]
  getPostBySlug(slug: string): BlogPost | null
  getRelatedPosts(slug: string, limit?: number): BlogPostMeta[]
}

/**
 * Reads posts from a directory of markdown files.
 *
 * Every post is parsed once per directory state and cached. A static build
 * renders each of the ~200 blog pages several times (metadata + page +
 * related posts); without the cache each render re-read and re-parsed every
 * post. The cache key is the file names plus modification times, so adding or
 * editing a post invalidates it — in `next dev` as well as in a build.
 *
 * Takes the directory as a parameter so tests can point it at fixtures.
 */
export function createBlogRepository(directory: string): BlogRepository {
  let cache: { signature: string; posts: BlogPostMeta[]; index: RelatedIndex } | null = null

  function load(): { posts: BlogPostMeta[]; index: RelatedIndex } {
    if (!fs.existsSync(directory)) return { posts: [], index: new RelatedIndex([]) }

    const fileNames = fs.readdirSync(directory).filter((fileName) => fileName.endsWith('.md'))
    const signature = fileNames
      .map((name) => `${name}:${fs.statSync(path.join(directory, name)).mtimeMs}`)
      .join('|')
    if (cache?.signature === signature) return cache

    const posts = fileNames
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const { data, content } = matter(fs.readFileSync(path.join(directory, fileName), 'utf8'))
        return toMeta(slug, data, readingTime(content).text)
      })
      .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

    cache = { signature, posts, index: new RelatedIndex(posts) }
    return cache
  }

  return {
    getAllPosts() {
      // A copy, so callers that sort or filter can't reorder the cache.
      return [...load().posts]
    },

    getPostBySlug(slug) {
      try {
        const fileContents = fs.readFileSync(path.join(directory, `${slug}.md`), 'utf8')
        const { data, content: rawContent } = matter(fileContents)
        const content = rawContent.replace(/\r\n/g, '\n')

        // Split content by language marker if present
        let contentEn = content
        let contentAr = content

        if (content.includes('<!-- AR -->')) {
          const parts = content.split('<!-- AR -->')
          contentEn = parts[0].trim()
          contentAr = parts[1]?.trim() || contentEn
        }

        return { ...toMeta(slug, data, readingTime(content).text), content: contentEn, contentAr }
      } catch {
        return null
      }
    },

    /**
     * The posts a reader of `slug` should see next, best first. Hand-picked
     * `related` slugs come first; the rest are ranked by topic similarity.
     */
    getRelatedPosts(slug, limit = 3) {
      const { posts, index } = load()
      const bySlug = new Map(posts.map((p) => [p.slug, p]))
      return index
        .relatedTo(slug, { limit })
        .map((s) => bySlug.get(s))
        .filter((p): p is BlogPostMeta => p !== undefined)
    },
  }
}

const defaultRepository = createBlogRepository(blogDirectory)

export const getAllPosts = (): BlogPostMeta[] => defaultRepository.getAllPosts()
export const getPostBySlug = (slug: string): BlogPost | null => defaultRepository.getPostBySlug(slug)
export const getRelatedPosts = (slug: string, limit?: number): BlogPostMeta[] =>
  defaultRepository.getRelatedPosts(slug, limit)

export function getAllCategories(): { en: string; ar: string }[] {
  const posts = getAllPosts()
  const categoriesMap = new Map<string, string>()

  posts.forEach((post) => {
    if (!categoriesMap.has(post.category)) {
      categoriesMap.set(post.category, post.categoryAr)
    }
  })

  return Array.from(categoriesMap.entries()).map(([en, ar]) => ({ en, ar }))
}

/**
 * Every distinct tag with its Arabic label. Tags that differ only in case
 * ("Property Management" / "property management") are listed once, under the
 * first spelling seen.
 */
export function getAllTags(): { en: string; ar: string }[] {
  const tagsMap = new Map<string, { en: string; ar: string }>()

  getAllPosts().forEach((post) => {
    post.tags.forEach((tag, index) => {
      const key = tagKey(tag)
      if (!tagsMap.has(key)) tagsMap.set(key, { en: tag, ar: post.tagsAr[index] || tag })
    })
  })

  return Array.from(tagsMap.values())
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => hasTag(post.tags, tag))
}

export function searchPosts(query: string): BlogPostMeta[] {
  const lowercaseQuery = query.toLowerCase()
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.titleAr.includes(query) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.excerptAr.includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.tagsAr.some((tag) => tag.includes(query))
  )
}
