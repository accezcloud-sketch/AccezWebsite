import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingHub from '@/components/pricing/PricingHub'
import { pricingHubMetadata } from '@/lib/platform/pricingPages'

// Pricing hub: one card per solution (lib/platform/solutions.ts).
export const metadata: Metadata = pricingHubMetadata('en')

export default function PricingPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <PricingHub locale="en" />
      <Footer />
    </main>
  )
}
