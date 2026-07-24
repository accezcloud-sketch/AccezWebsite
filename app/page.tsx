import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Ecosystem from '@/components/Ecosystem'
import ProductScope from '@/components/ProductScope'
import Capabilities from '@/components/Capabilities'
import ServiceProviders from '@/components/ServiceProviders'
import Trust from '@/components/Trust'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Accez',
  alternateName: 'Accez Cloud',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Accez is the all-in-one property operations platform for Saudi Arabia, reservations and rent, maintenance and housekeeping, owner management and payouts, sales, HOA/communities, hotels and serviced apartments, and a built-in service marketplace, in Arabic and English.',
  url: 'https://accez.cloud',
  provider: {
    '@type': 'Organization',
    name: 'Accez Cloud',
    url: 'https://accez.cloud',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'SAR',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'Reservations & 400+ Channel Sync',
    'Automated Rent & Payments',
    'Owner Management & Payouts',
    'Sales & Developer Projects',
    'HOA & Community Management',
    'Hotels & Serviced Apartments',
    'Maintenance & Housekeeping',
    'Service Marketplace',
    'Reports & Analytics',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Ecosystem />
        <ProductScope />
        <Capabilities />
        <ServiceProviders />
        <Trust />
        <Pricing />
        <FAQ />
        <Contact />
        {/* <CTA /> */}
        <Footer />
      </main>
    </>
  )
}
