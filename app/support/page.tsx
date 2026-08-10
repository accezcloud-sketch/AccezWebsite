import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import SupportPageClient from '@/components/SupportPageClient'

// This route used to be a `'use client'` page, which cannot export `metadata`.
// The consequence was that it inherited the root layout's title, description
// AND canonical — so /support shipped `<link rel="canonical" href="https://www.accez.cloud/">`,
// telling Google it was a duplicate of the homepage and shouldn't be indexed,
// while still being listed in the sitemap. The interactive form now lives in
// components/SupportPageClient.tsx and this stays a server component.
export const metadata: Metadata = {
  title: 'Support, get help from our Riyadh team',
  description:
    'Need help with Accez? Submit a support ticket and our team in Riyadh will get back to you. Help with reservations, work orders, owner payouts, contracts and hotel operations.',
  alternates: alternatesFor('support', 'en'),
  openGraph: {
    title: 'Support | Accez',
    description:
      'Submit a support ticket and our team in Riyadh will get back to you as soon as possible.',
    type: 'website',
    url: 'https://www.accez.cloud/support',
    siteName: 'Accez',
  },
}

export default function SupportPage() {
  return <SupportPageClient />
}
