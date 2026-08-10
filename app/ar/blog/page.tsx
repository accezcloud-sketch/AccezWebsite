import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogListClient from '@/components/BlogListClient'
import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic blog index. Mirrors app/blog/page.tsx exactly; the only difference is
// that the copy comes from the Arabic side of the same content files.
export const metadata: Metadata = {
  title: 'المدونة',
  description:
    'رؤى ونصائح وأدلة في إدارة العقارات من فريق أكسيز. تعرّف على كيفية تنمية محفظتك وأتمتة العمليات وإدارة العقارات في السعودية.',
  alternates: alternatesFor('blog', 'ar'),
  openGraph: {
    title: 'المدونة | أكسيز',
    description: 'رؤى ونصائح وأدلة في إدارة العقارات من فريق أكسيز.',
    type: 'website',
    url: localeUrl('blog', 'ar'),
    siteName: 'Accez',
    locale: 'ar_SA',
  },
}

export default function ArabicBlogPage() {
  const blogPosts = getAllPosts()
  const blogCategories = getAllCategories()
  const blogTags = getAllTags()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'مدونة أكسيز',
    description: 'رؤى ونصائح وأدلة في إدارة العقارات من فريق أكسيز.',
    url: localeUrl('blog', 'ar'),
    inLanguage: 'ar',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: localeUrl(`blog/${post.slug}`, 'ar'),
        name: post.titleAr,
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

      <section
        className="relative overflow-hidden page-top pb-12"
        style={{ background: 'var(--bg)' }}
      >
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '100%',
            background:
              'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)',
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
            style={{
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-line)',
              color: 'var(--accent-hi)',
            }}
          >
            المدونة
          </span>
          <h1
            className="text-white font-bold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(30px, 4.5vw, 48px)',
              fontFamily: 'var(--font-cairo), var(--font-heading), system-ui, sans-serif',
              fontWeight: 800,
            }}
          >
            رؤى عقارية للمشغّلين في السعودية
          </h1>
          <p
            className="max-w-2xl mx-auto leading-relaxed"
            style={{ fontSize: 17, color: 'var(--text-muted)' }}
          >
            رؤى ونصائح وتحديثات حول إدارة العقارات في المملكة.
          </p>
        </div>
      </section>

      <BlogListClient posts={blogPosts} categories={blogCategories} tags={blogTags} />

      <Footer />
    </main>
  )
}
