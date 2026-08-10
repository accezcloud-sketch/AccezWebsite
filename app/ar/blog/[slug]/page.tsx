import type { Metadata } from 'next'
import BlogPostClient from '@/components/BlogPostClient'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { alternatesFor, localeUrl, SITE_URL } from '@/lib/i18n'

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

  if (!post) {
    return { title: 'المقال غير موجود' }
  }

  const title = post.metaTitleAr || post.titleAr
  const rawDescription = post.metaDescriptionAr || post.excerptAr
  const description =
    rawDescription.length > 160 ? rawDescription.slice(0, 157) + '...' : rawDescription

  // Social scrapers do not reliably render WebP, so hand them the original
  // raster. Both files exist on disk for exactly this reason.
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${SITE_URL}${post.coverImage.replace(/\.webp$/, '.jpg')}`

  return {
    title,
    description,
    alternates: alternatesFor(`blog/${post.slug}`, 'ar'),
    openGraph: {
      title,
      description,
      type: 'article',
      url: localeUrl(`blog/${post.slug}`, 'ar'),
      siteName: 'Accez',
      locale: 'ar_SA',
      publishedTime: post.date,
      authors: [post.authorAr],
      tags: post.tagsAr,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.coverImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

function getArabicSchemas(post: ReturnType<typeof getAllPosts>[number]) {
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${SITE_URL}${post.coverImage.replace(/\.webp$/, '.jpg')}`

  const author = post.authorUrl
    ? {
        '@type': 'Person',
        name: post.author,
        url: post.authorUrl,
        sameAs: [post.authorUrl],
        ...(post.authorRole ? { jobTitle: post.authorRole } : {}),
        worksFor: { '@id': `${SITE_URL}/#organization` },
      }
    : { '@type': 'Organization', name: post.authorAr, url: SITE_URL }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.titleAr,
      description: post.excerptAr,
      image: imageUrl,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      author,
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': localeUrl(`blog/${post.slug}`, 'ar'),
      },
      keywords: post.tagsAr.join('، '),
      articleSection: post.categoryAr,
      inLanguage: 'ar',
      url: localeUrl(`blog/${post.slug}`, 'ar'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: localeUrl('', 'ar') },
        { '@type': 'ListItem', position: 2, name: 'المدونة', item: localeUrl('blog', 'ar') },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.titleAr,
          item: localeUrl(`blog/${post.slug}`, 'ar'),
        },
      ],
    },
  ]
}

export default async function ArabicBlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const postMeta = getAllPosts().find((p) => p.slug === slug)
  const fullPost = getPostBySlug(slug)

  return (
    <>
      {postMeta &&
        getArabicSchemas(postMeta).map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      <BlogPostClient post={fullPost} />
    </>
  )
}
