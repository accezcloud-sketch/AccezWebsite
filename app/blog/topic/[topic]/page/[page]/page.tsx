import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogIndexPage from '@/components/blog/BlogIndexPage'
import { getPostsByTopic } from '@/lib/blog'
import { blogIndexMetadata } from '@/lib/content/blogIndex'
import { pageCount, parsePageParam } from '@/lib/content/pagination'
import { isTopicKey, TOPICS } from '@/lib/content/topics'

// Pages 2..N of a topic hub; page 1 is /blog/topic/<topic>/ itself.
export const dynamicParams = false

export function generateStaticParams() {
  return TOPICS.flatMap((t) => {
    const total = pageCount(getPostsByTopic(t.key).length)
    return Array.from({ length: total - 1 }, (_, i) => ({ topic: t.key, page: String(i + 2) }))
  })
}

interface PageProps {
  params: Promise<{ topic: string; page: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic, page } = await params
  const n = parsePageParam(page)
  return isTopicKey(topic) && n ? blogIndexMetadata('en', topic, n) : {}
}

export default async function TopicPageN({ params }: PageProps) {
  const { topic, page } = await params
  const n = parsePageParam(page)
  if (!isTopicKey(topic) || !n || n > pageCount(getPostsByTopic(topic).length)) notFound()
  return <BlogIndexPage locale="en" topic={topic} page={n} />
}
