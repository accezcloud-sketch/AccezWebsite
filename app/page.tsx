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
import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'

// The root layout deliberately no longer sets a canonical (it was being
// inherited by every page). The homepage declares its own here.
export const metadata: Metadata = {
  alternates: alternatesFor('', 'en'),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Accez',
  alternateName: 'Accez Cloud',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Accez is the all-in-one property operations platform for Saudi Arabia. Reservations and channels, work orders, rental and sale properties, sales and developer projects, contracts and e-signing, owner payouts, hotels and serviced apartments, in Arabic and English.',
  url: 'https://www.accez.cloud',
  provider: {
    // Reference the site-wide Organization defined in app/layout.tsx rather
    // than restating it, so both blocks describe the same entity.
    '@id': 'https://www.accez.cloud/#organization',
  },
  // Prices mirror the published plans in components/Pricing.tsx: a free tier,
  // then 40 and 150 SAR/month, plus a custom enterprise plan. An AggregateOffer
  // previously declared a currency with NO price at all, which is incomplete
  // markup — Google requires offers.price for SoftwareApplication.
  //
  // Note: full rich-result eligibility ALSO needs aggregateRating or review.
  // Those are deliberately absent because Accez has no published review data,
  // and inventing ratings violates Google's structured data guidelines.
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'SAR',
    lowPrice: 0,
    highPrice: 150,
    offerCount: 4,
    availability: 'https://schema.org/InStock',
    url: 'https://www.accez.cloud/#pricing',
  },
  featureList: [
    'Reservations & 400+ Channel Sync',
    'Rental & Sale Properties',
    'Owner Management & Payouts',
    'Sales & Developer Projects',
    'Contracts & E-signing',
    'Hotels & Serviced Apartments',
    'Work Orders',
    'Service Marketplace',
    'Marketing Campaigns',
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
