import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import { providerMarketplaceSchema } from '@/lib/content/siteSchema'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceProviderPage from '@/components/ServiceProviderPage'

export const metadata: Metadata = {
  title: 'For service providers, list on the marketplace',
  description:
    'List your business on the Accez marketplace, take bookings from your own clients and get found by new customers. Barbers, salons, spas, fitness, photography and home services. See provider plans and pricing.',
  alternates: alternatesFor('service-providers', 'en'),
  openGraph: {
    title: 'For Service Providers | Accez Marketplace',
    description:
      'Get discovered and booked. List your services on Accez and reach customers across the whole property network. See plans and pricing.',
    url: 'https://www.accez.cloud/service-providers',
    type: 'website',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Accez for Service Providers' }],
  },
}

const MARKETPLACE_DESCRIPTION =
  'Independent businesses list their services on the Accez marketplace, take instant bookings from their own clients and new customers, and grow through exposure-based plans.'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(providerMarketplaceSchema('en', MARKETPLACE_DESCRIPTION)) }} />
      <main className="min-h-screen">
        <Header />
        <ServiceProviderPage />
        <Footer />
      </main>
    </>
  )
}
