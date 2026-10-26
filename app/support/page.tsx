import type { Metadata } from 'next'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import SupportPageClient from '@/components/SupportPageClient'

// This route used to be a `'use client'` page, which cannot export `metadata`.
// The consequence was that it inherited the root layout's title, description
// AND canonical — so /support shipped `<link rel="canonical" href="https://www.accez.cloud/">`,
// telling Google it was a duplicate of the homepage and shouldn't be indexed,
// while still being listed in the sitemap. The interactive form now lives in
// components/SupportPageClient.tsx and this stays a server component.
export const metadata: Metadata = staticPageMetadata({
  route: 'support',
  locale: 'en',
  title: 'Support, get help from our Riyadh team',
  description:
    'Need help with Accez? Send a support ticket and our team in Riyadh will reply. Help with reservations, work orders, payouts, bookings and your account.',
})

export default function SupportPage() {
  return <SupportPageClient />
}
