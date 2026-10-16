import type { Metadata } from 'next'
import BlogPostView from '@/components/blog/BlogPostPage'
import { getAllPosts } from '@/lib/blog'
import { postMetadata } from '@/lib/content/postSeo'

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
  if (!post) return { title: 'Blog Post Not Found', description: 'The requested blog post could not be found.' }
  return postMetadata(post, 'en')
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  return <BlogPostView slug={slug} locale="en" />
}
