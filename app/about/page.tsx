import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'About, built in Riyadh for Saudi property operators',
  description:
    'Accez is an all-in-one property operations platform built in Riyadh, Saudi Arabia by Cloud Valley LLC, reservations, work orders, owners, sales, contracts and hotels in one system, in Arabic and English.',
  alternates: alternatesFor('about', 'en'),
  openGraph: {
    title: 'About Accez',
    description: 'All-in-one property operations platform, built in Saudi Arabia. Arabic and English.',
    url: 'https://www.accez.cloud/about',
    type: 'website',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'About Accez' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutPage />
      <Footer />
    </main>
  )
}
