import type { Metadata } from 'next'
import BlogPostPage from '@/components/blog/BlogPostPage'
import { getAllPosts } from '@/lib/blog'
import { postMetadata } from '@/lib/content/postSeo'

/**
 * Arabic blog post.
 *
 * All 73 posts already ship a full Arabic translation in their frontmatter
 * (titleAr / excerptAr) and body (split on the `<!-- AR -->` marker by
 * lib/blog.ts). None of it was reachable before, because both languages shared
 * one URL and only the English half was server-rendered.
 *
 * No copy is written here. Every Arabic string comes from the post file exactly
 * as the n8n workflow wrote it.
 */

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getAllPosts().find((p) => p.slug === slug)
  return post ? postMetadata(post, 'ar') : { title: 'المقال غير موجود' }
}

export default async function ArabicBlogPostPage({ params }: PageProps) {
  const { slug } = await params
  return <BlogPostPage slug={slug} locale="ar" />
}
