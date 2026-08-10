import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceProviderPage from '@/components/ServiceProviderPage'

export const metadata: Metadata = {
  title: 'For service providers, list on the marketplace',
  description:
    'List your business on the Accez marketplace and reach residents, guests and property managers. Salons, spas, fitness, photography and home services get discovered, booked and reviewed. See provider plans and pricing.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Accez Service Provider Marketplace',
  serviceType: 'Online marketplace listing for service providers',
  provider: {
    '@type': 'Organization',
    name: 'Accez Cloud',
    url: 'https://www.accez.cloud',
  },
  areaServed: 'SA',
  description:
    'Independent businesses list their services on the Accez marketplace to reach residents, guests and property managers, take instant bookings, and grow through exposure-based plans.',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'SAR',
    lowPrice: '0',
    availability: 'https://schema.org/InStock',
    url: 'https://www.accez.cloud/service-providers',
  },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen">
        <Header />
        <ServiceProviderPage />
        <Footer />
      </main>
    </>
  )
}
