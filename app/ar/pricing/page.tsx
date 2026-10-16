import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'
import ProviderPricing from '@/components/ProviderPricing'
import { pricingPageMetadata } from '@/lib/content/pageMetadata'

// Property-manager plans and service-provider plans on one page, using the
// same components (and copy) as the homepage and the Service Providers page.
export const metadata: Metadata = pricingPageMetadata('ar')

export default function PricingPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <Pricing headingLevel="h1" />
      </div>
      <ProviderPricing />
      <Footer />
    </main>
  )
}
