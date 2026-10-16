import type { Metadata } from 'next'
import BlogIndexPage from '@/components/blog/BlogIndexPage'
import { blogIndexMetadata } from '@/lib/content/blogIndex'

export const metadata: Metadata = blogIndexMetadata('en')

export default function BlogPage() {
  return <BlogIndexPage locale="en" />
}
