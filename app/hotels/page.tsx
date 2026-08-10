import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SolutionPage from '@/components/SolutionPage'

export const metadata: Metadata = {
  title: 'Hotels & Serviced Apartments',
  description: 'Room types, rates and reservations synced across 400+ channels through RoomCloud, with guest policies, reservation add-ons and check-in built in.',
  alternates: alternatesFor('hotels', 'en'),
  openGraph: {
    title: 'Hotels & Serviced Apartments',
    description: 'Room types, rates and reservations synced across 400+ channels through RoomCloud, with guest policies, reservation add-ons and check-in built in.',
    url: 'https://www.accez.cloud/hotels',
    type: 'website',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Hotels & Serviced Apartments | Accez' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <SolutionPage slug="hotels" />
      <Footer />
    </main>
  )
}
