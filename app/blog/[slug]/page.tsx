import type { Metadata } from 'next'
import BlogPostClient from '@/components/BlogPostClient'
import { blogPosts } from '@/lib/blog-data'

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const title = post.title
  const description = post.excerpt.length > 160
    ? post.excerpt.slice(0, 157) + '...'
    : post.excerpt
  const url = `https://accez.cloud/blog/${post.slug}`
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `https://accez.cloud${post.coverImage}`

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
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

// HowTo steps for the 3 tutorial posts
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

function getBlogPostingSchema(post: (typeof blogPosts)[number]) {
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `https://accez.cloud${post.coverImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://accez.cloud',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Accez Cloud',
      url: 'https://accez.cloud',
      logo: {
        '@type': 'ImageObject',
        url: 'https://accez.cloud/images/accez-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://accez.cloud/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'en',
    url: `https://accez.cloud/blog/${post.slug}`,
  }
}

function getHowToSchema(
  post: (typeof blogPosts)[number],
  steps: { name: string; text: string }[]
) {
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `https://accez.cloud${post.coverImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.excerpt,
    image: imageUrl,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  const schemas: object[] = []

  if (post) {
    schemas.push(getBlogPostingSchema(post))

    const steps = howToSteps[post.slug]
    if (steps) {
      schemas.push(getHowToSchema(post, steps))
    }
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
      <BlogPostClient slug={slug} />
    </>
  )
}
