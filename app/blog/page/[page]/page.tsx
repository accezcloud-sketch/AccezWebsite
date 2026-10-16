import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogIndexPage from '@/components/blog/BlogIndexPage'
import { getAllPosts } from '@/lib/blog'
import { blogIndexMetadata } from '@/lib/content/blogIndex'
import { pageCount, parsePageParam } from '@/lib/content/pagination'

// Pages 2..N of the blog index; page 1 is /blog/ itself.
export const dynamicParams = false

export function generateStaticParams() {
  const total = pageCount(getAllPosts().length)
  return Array.from({ length: total - 1 }, (_, i) => ({ page: String(i + 2) }))
}

interface PageProps {
  params: Promise<{ page: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = parsePageParam((await params).page)
  return page ? blogIndexMetadata('en', undefined, page) : {}
}

export default async function BlogIndexPageN({ params }: PageProps) {
  const page = parsePageParam((await params).page)
  if (!page || page > pageCount(getAllPosts().length)) notFound()
  return <BlogIndexPage locale="en" page={page} />
}
