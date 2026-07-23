import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Capabilities from '@/components/Capabilities'
import ServiceProviders from '@/components/ServiceProviders'
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
  description: 'Accez is the smart property management platform with 400+ channel integrations, automated rent collection, maintenance scheduling, and marketplace services. Service providers can create a provider account to publish services and receive booking requests from properties.',
  url: 'https://accez.cloud',
  provider: {
    '@type': 'Organization',
    name: 'Accez Cloud',
    url: 'https://accez.cloud',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    '400+ Channel Integrations',
    'Automated Rent Collection',
    'Maintenance Scheduling',
    'Marketplace Services',
    'Property Analytics',
    'Service Provider Accounts',
    'Services Booking Marketplace',
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
        <Features />
        <Capabilities />
        <ServiceProviders />
        <Pricing />
        <FAQ />
        <Contact />
        {/* <CTA /> */}
        <Footer />
      </main>
    </>
  )
}
