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
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero Section, server-rendered, fully crawlable */}
      <section className="relative overflow-hidden page-top pb-12" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '100%', background: 'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}>
            Blog
          </span>
          <h1 className="text-white font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
            Property insights for Saudi operators
          </h1>
          <p className="max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>
            Insights, tips and updates about running property in the Kingdom.
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
