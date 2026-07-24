import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SolutionPage from '@/components/SolutionPage'

export const metadata: Metadata = {
  title: 'Owner Management & Payouts | Accez',
  description: 'Give property owners their own portal, a clear ledger and tracked Stripe payouts. Owner statements, balances, invoices and per-owner analytics, part of the all-in-one Accez platform.',
  alternates: { canonical: '/owners' },
  openGraph: {
    title: 'Owner Management & Payouts | Accez',
    description: 'Give property owners their own portal, a clear ledger and tracked Stripe payouts. Owner statements, balances, invoices and per-owner analytics, part of the all-in-one Accez platform.',
    url: 'https://accez.cloud/owners',
    type: 'website',
    images: [{ url: 'https://accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Owner Management & Payouts | Accez' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <SolutionPage slug="owners" />
      <Footer />
    </main>
  )
}
