import type { Metadata } from 'next'
import BlogPostClient from '@/components/BlogPostClient'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { alternatesFor } from '@/lib/i18n'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getAllPosts().find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  // Prefer explicit SERP overrides when the post declares them; otherwise fall
  // back to the title/excerpt exactly as before.
  const title = post.metaTitle || post.title
  const rawDescription = post.metaDescription || post.excerpt
  const description =
    rawDescription.length > 160 ? rawDescription.slice(0, 157) + '...' : rawDescription
  const url = `https://www.accez.cloud/blog/${post.slug}`
  // Social preview image — NOT the same as the on-page image.
  //
  // Cover images are served as WebP on the page (roughly half the bytes), but
  // Facebook, LinkedIn and X do not reliably render WebP in link previews. The
  // original JPEG is still on disk for exactly this reason, so we hand social
  // crawlers the raster version and keep the WebP for real visitors.
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `https://www.accez.cloud${post.coverImage.replace(/\.webp$/, '.jpg')}`

  return {
    title,
    description,
    alternates: alternatesFor(`blog/${post.slug}`, 'en'),
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Accez Cloud',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

// HowTo structured data was removed from this file.
//
// Google deprecated HowTo rich results on mobile in August 2023 and on desktop
// in September 2023. The markup produced nothing in Search for these three
// tutorial posts, so it was dead weight in every page's HTML.
//
// The step definitions below are retained deliberately: they are an accurate
// written record of the product flows, and they are the source material if
// these tutorials are ever rewritten as proper step-by-step page content —
// which IS still worth doing, because clear ordered steps are exactly the kind
// of passage AI answers retrieve, with or without markup.
const howToSteps: Record<string, { name: string; text: string }[]> = {
  'how-to-create-manage-work-orders-accez-cloud': [
    {
      name: 'Navigate to Work Orders',
      text: 'From your dashboard homepage, navigate to the Properties section. Select the property for which you want to create a work order. Once in the property view, click on the "Work Orders" tab.',
    },
    {
      name: 'Create Your First Work Order',
      text: 'Click the "Add First Work Order" button to begin. A new page will open with a comprehensive work order creation form.',
    },
    {
      name: 'Fill in Work Order Details',
      text: 'Complete the title, problem category (Plumbing, Electrical, HVAC, etc.), problem description, location details, status, and upload photos documenting the issue.',
    },
    {
      name: 'Submit the Work Order',
      text: 'After filling in all required details, click the "Create" button. Your work order is now successfully created, trackable, and can be assigned to maintenance personnel.',
    },
  ],
  'how-to-create-manage-properties-accez-cloud': [
    {
      name: 'Navigate to the Properties Page',
      text: 'Log into your Accez.Cloud property manager portal. From your dashboard, navigate to the Properties section.',
    },
    {
      name: 'Create Your First Property',
      text: 'Click on the "Add Property" button. Enter the property name, total number of units, and number of floors. Click "Submit" to create your property.',
    },
    {
      name: 'Add Property Details and Images',
      text: 'Click on the property card to access details. Upload high-quality property images, add the complete address, and include any additional relevant information.',
    },
    {
      name: 'Publish Your Property',
      text: 'Click the "Publish Property" button to make your property live and visible in the property management system.',
    },
    {
      name: 'Edit and Update Properties',
      text: 'Navigate to your properties list, select the property to edit, update images, address, or details, and click submit to save changes.',
    },
  ],
  'how-to-create-manage-units-accez-cloud': [
    {
      name: 'Access Unit Creation',
      text: 'From your dashboard, click on your property card to enter the property details section. Select the "Units" header and click "Add Your First Unit".',
    },
    {
      name: 'Choose Your Unit Type',
      text: 'Select either a short-term or long-term unit type. Long-term units require an active resident to be assigned.',
    },
    {
      name: 'Fill in General Unit Information',
      text: 'Complete basic information (unit number, type, square footage, bedrooms, bathrooms), property details and amenities, and availability status.',
    },
    {
      name: 'Configure Ownership and Tenant Information',
      text: 'Set ownership type (company or private), assign a resident, enter the rental price, and set the lease start and end dates.',
    },
    {
      name: 'Add Additional Information and Images',
      text: 'Upload high-quality images of living spaces, kitchen, bathrooms, special features, and views. Add any optional additional context.',
    },
    {
      name: 'Save Your Unit',
      text: 'Click the "Save" button. Your unit is now created and will appear in your units list.',
    },
  ],
}

function getBlogPostingSchema(post: ReturnType<typeof getAllPosts>[number]) {
  // Raster rather than WebP, matching the Open Graph tags above. Google does
  // accept WebP in structured data, but the JPEG is the safest common
  // denominator across every consumer of this markup.
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `https://www.accez.cloud${post.coverImage.replace(/\.webp$/, '.jpg')}`

  // Google's "Who created it" guidance asks for a named human with verifiable
  // credentials. When a post declares `authorUrl` in its frontmatter we emit a
  // `Person` with a `sameAs` link; otherwise we keep the house `Organization`
  // byline, which is valid markup but a much weaker trust signal.
  const author = post.authorUrl
    ? {
        '@type': 'Person',
        name: post.author,
        url: post.authorUrl,
        sameAs: [post.authorUrl],
        ...(post.authorRole ? { jobTitle: post.authorRole } : {}),
        worksFor: { '@id': 'https://www.accez.cloud/#organization' },
      }
    : {
        '@type': 'Organization',
        name: post.author,
        url: 'https://www.accez.cloud',
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    // Was hardcoded to `post.date`, so genuine edits were invisible to Google.
    // Now reflects the optional `updated` frontmatter field when present.
    dateModified: post.updated || post.date,
    author,
    publisher: { '@id': 'https://www.accez.cloud/#organization' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.accez.cloud/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    // The English article is what is served at this URL. When Arabic gets its
    // own /ar routes this becomes per-route rather than a constant.
    inLanguage: 'en',
    url: `https://www.accez.cloud/blog/${post.slug}`,
  }
}

/**
 * Breadcrumbs for the natural hierarchy: home -> blog -> post.
 *
 * Cheap, reliably rendered by Google, and it changes how the URL path is
 * displayed in results — a click-through improvement rather than a ranking one.
 */
function getBreadcrumbSchema(post: ReturnType<typeof getAllPosts>[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.accez.cloud/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.accez.cloud/blog/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.accez.cloud/blog/${post.slug}/`,
      },
    ],
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const postMeta = getAllPosts().find((p) => p.slug === slug)
  const fullPost = getPostBySlug(slug)

  const schemas: object[] = []

  if (postMeta) {
    schemas.push(getBlogPostingSchema(postMeta))
    schemas.push(getBreadcrumbSchema(postMeta))
  }

  return (
    <>
      {schemas.map((schema, index) => (
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
