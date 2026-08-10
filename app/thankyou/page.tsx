import type { Metadata } from 'next'
import ThankYouClient from '@/components/ThankYouClient'

// Post-conversion confirmation page. Two things were wrong before:
//   1. As a `'use client'` page it couldn't export metadata, so it inherited
//      the homepage title, description and canonical.
//   2. It shipped `<meta name="robots" content="index, follow">` — a thin
//      confirmation page explicitly inviting indexing.
//
// A thank-you page has no search value and dilutes the site's quality signal if
// indexed, so it is now explicitly noindex. `follow` is kept so any links on it
// still pass through normally.
export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your message has been received. The Accez team will be in touch.',
  alternates: { canonical: '/thankyou' },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
}

export default function ThankYouPage() {
  return <ThankYouClient />
}
