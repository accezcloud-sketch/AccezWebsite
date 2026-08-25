import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import PrivacyContent from '@/components/legal/PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Cloud Valley LLC collects, uses, shares and protects personal data in the Accez platform, and your rights under the Saudi Personal Data Protection Law.',
  alternates: alternatesFor('privacy', 'en'),
  openGraph: {
    title: 'Privacy Policy | Accez',
    description:
      'How Accez handles personal data, and your rights under the Saudi Personal Data Protection Law.',
    type: 'article',
    url: 'https://www.accez.cloud/privacy/',
    siteName: 'Accez',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Accez Privacy Policy' }],
  },
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
