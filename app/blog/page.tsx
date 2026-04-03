import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogListClient from '@/components/BlogListClient'
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Property management insights, tips, and tutorials from the Accez Cloud team. Learn how to scale your portfolio, automate operations, and manage properties in Saudi Arabia.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | Accez Cloud',
    description:
      'Property management insights, tips, and tutorials from the Accez Cloud team.',
    type: 'website',
    url: 'https://accez.cloud/blog',
    siteName: 'Accez Cloud',
  },
}

export default function BlogPage() {
  const blogPosts = getAllPosts()
  const blogCategories = getAllCategories()
  const blogTags = getAllTags()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Accez Cloud Blog',
    description:
      'Property management insights, tips, and tutorials from the Accez Cloud team.',
    url: 'https://accez.cloud/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://accez.cloud/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero Section — server-rendered, fully crawlable */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Insights, tips, and updates about property management
          </p>
        </div>
      </section>

      {/* Client component handles filtering; all cards render in initial HTML */}
      <BlogListClient
        posts={blogPosts}
        categories={blogCategories}
        tags={blogTags}
      />

      <Footer />
    </main>
  )
}
