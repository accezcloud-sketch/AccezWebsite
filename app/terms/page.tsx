import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import TermsContent from '@/components/legal/TermsContent'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The agreement between Cloud Valley LLC and users of the Accez property operations platform and marketplace, covering subscriptions, fees, payments, payouts, liability and Saudi governing law.',
  alternates: alternatesFor('terms', 'en'),
  openGraph: {
    title: 'Terms of Service | Accez',
    description:
      'The agreement governing use of the Accez property operations platform and service marketplace.',
    type: 'article',
    url: 'https://www.accez.cloud/terms/',
    siteName: 'Accez',
    images: [
      {
        url: 'https://www.accez.cloud/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Accez Terms of Service',
      },
    ],
  },
}

export default function TermsPage() {
  return <TermsContent />
}
