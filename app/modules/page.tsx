import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ModulesPage from '@/components/ModulesPage'

export const metadata: Metadata = {
  title: 'Product modules | Everything Accez runs',
  description:
    'Explore every Accez module: reservations and channels, properties and units, maintenance and housekeeping, hotels, rent and payments, owners and payouts, billing, reports, sales, communities and HOA, the service marketplace, and campaigns.',
  alternates: { canonical: '/modules' },
  openGraph: {
    title: 'Product modules | Accez',
    description: 'One platform for the whole property operation. Explore every module.',
    url: 'https://accez.cloud/modules',
    type: 'website',
    images: [{ url: 'https://accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Accez product modules' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <ModulesPage />
      <Footer />
    </main>
  )
}
