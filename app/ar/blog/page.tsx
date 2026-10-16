import type { Metadata } from 'next'
import BlogIndexPage from '@/components/blog/BlogIndexPage'
import { blogIndexMetadata } from '@/lib/content/blogIndex'

// Arabic blog index; same component as app/blog/page.tsx, Arabic copy.
export const metadata: Metadata = blogIndexMetadata('ar')

export default function ArabicBlogPage() {
  return <BlogIndexPage locale="ar" />
}
