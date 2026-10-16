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
import BlogStrip from '@/components/blog/BlogStrip'
import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import { softwareApplicationSchema } from '@/lib/content/siteSchema'

// The root layout deliberately no longer sets a canonical (it was being
// inherited by every page). The homepage declares its own here.
export const metadata: Metadata = {
  alternates: alternatesFor('', 'en'),
}

// Product description for structured data (the page's meta description is
// the site default, inherited from the layout).
const PRODUCT_DESCRIPTION =
  'Accez is the all-in-one property operations platform for Saudi Arabia. Reservations and channels, work orders, rental and sale properties, sales and developer projects, contracts and e-signing, owner payouts, hotels and serviced apartments, in Arabic and English.'

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema('en', PRODUCT_DESCRIPTION)) }}
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
        <BlogStrip locale="en" />
        <Contact />
        {/* <CTA /> */}
        <Footer />
      </main>
    </>
  )
}
