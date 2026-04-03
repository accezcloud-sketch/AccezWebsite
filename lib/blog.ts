import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

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
  author: string
  authorAr: string
  coverImage: string
  coverImageAlt: string
  category: string
  categoryAr: string
  tags: string[]
  tagsAr: string[]
  readingTime: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  titleAr: string
  excerpt: string
  excerptAr: string
  date: string
  author: string
  authorAr: string
  coverImage: string
  coverImageAlt: string
  category: string
  categoryAr: string
  tags: string[]
  tagsAr: string[]
  readingTime: string
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(blogDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(blogDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || '',
        titleAr: data.titleAr || data.title || '',
        excerpt: data.excerpt || '',
        excerptAr: data.excerptAr || data.excerpt || '',
        date: data.date || '',
        author: data.author || '',
        authorAr: data.authorAr || data.author || '',
        coverImage: data.coverImage || '/images/blog/default.jpg',
        coverImageAlt: data.coverImageAlt || data.title || '',
        category: data.category || 'General',
        categoryAr: data.categoryAr || data.category || 'عام',
        tags: data.tags || [],
        tagsAr: data.tagsAr || data.tags || [],
        readingTime: stats.text,
      }
    })

  return allPosts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content: rawContent } = matter(fileContents)
    const content = rawContent.replace(/\r\n/g, '\n')
    const stats = readingTime(content)

    // Split content by language marker if present
    let contentEn = content
    let contentAr = content

    if (content.includes('<!-- AR -->')) {
      const parts = content.split('<!-- AR -->')
      contentEn = parts[0].trim()
      contentAr = parts[1]?.trim() || contentEn
    }

    return {
      slug,
      title: data.title || '',
      titleAr: data.titleAr || data.title || '',
      excerpt: data.excerpt || '',
      excerptAr: data.excerptAr || data.excerpt || '',
      content: contentEn,
      contentAr: contentAr,
      date: data.date || '',
      author: data.author || '',
      authorAr: data.authorAr || data.author || '',
      coverImage: data.coverImage || '/images/blog/default.jpg',
      coverImageAlt: data.coverImageAlt || data.title || '',
      category: data.category || 'General',
      categoryAr: data.categoryAr || data.category || 'عام',
      tags: data.tags || [],
      tagsAr: data.tagsAr || data.tags || [],
      readingTime: stats.text,
    }
  } catch {
    return null
  }
}

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

export function getAllTags(): { en: string; ar: string }[] {
  const posts = getAllPosts()
  const tagsMap = new Map<string, string>()

  posts.forEach((post) => {
    post.tags.forEach((tag, index) => {
      if (!tagsMap.has(tag)) {
        tagsMap.set(tag, post.tagsAr[index] || tag)
      }
    })
  })

  return Array.from(tagsMap.entries()).map(([en, ar]) => ({ en, ar }))
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
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
