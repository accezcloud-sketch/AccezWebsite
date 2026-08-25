import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import RefundContent from '@/components/legal/RefundContent'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'How cancellations and refunds work on Accez across unit reservations, marketplace service bookings and subscriptions, including how processing and platform fees are treated.',
  alternates: alternatesFor('refund-policy', 'en'),
  openGraph: {
    title: 'Refund & Cancellation Policy | Accez',
    description:
      'Cancellation windows, refund calculations and fee treatment for reservations, service bookings and subscriptions.',
    type: 'article',
    url: 'https://www.accez.cloud/refund-policy/',
    siteName: 'Accez',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Accez Refund & Cancellation Policy' }],
  },
}

export default function RefundPolicyPage() {
  return <RefundContent />
}
