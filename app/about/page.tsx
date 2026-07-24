import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'About Accez | All-in-one property platform, built in Riyadh',
  description:
    'Accez is an all-in-one property operations platform built in Riyadh, Saudi Arabia by Cloud Valley LLC, reservations, rent, owners, sales, communities and hotels in one system, in Arabic and English.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Accez',
    description: 'All-in-one property operations platform, built in Saudi Arabia. Arabic and English.',
    url: 'https://accez.cloud/about',
    type: 'website',
    images: [{ url: 'https://accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'About Accez' }],
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
