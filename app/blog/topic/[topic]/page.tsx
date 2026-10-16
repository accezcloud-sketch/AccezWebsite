import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogIndexPage from '@/components/blog/BlogIndexPage'
import { blogIndexMetadata } from '@/lib/content/blogIndex'
import { isTopicKey, TOPICS } from '@/lib/content/topics'

// One hub page per topic (lib/content/topics.ts); unknown topics 404.
export const dynamicParams = false

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.key }))
}

interface PageProps {
  params: Promise<{ topic: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params
  return isTopicKey(topic) ? blogIndexMetadata('en', topic) : {}
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params
  if (!isTopicKey(topic)) notFound()
  return <BlogIndexPage locale="en" topic={topic} />
}
