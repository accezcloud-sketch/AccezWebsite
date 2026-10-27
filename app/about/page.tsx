import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'
import RelatedPosts from '@/components/blog/RelatedPosts'

export const metadata: Metadata = {
  title: 'About Accez, one platform with two solutions',
  description:
    'Accez is one platform with two solutions, built in Riyadh by Cloud Valley LLC: property management software and a booking solution for service providers.',
  alternates: alternatesFor('about', 'en'),
  openGraph: {
    title: 'About Accez',
    description: 'One platform with two solutions: property management and service providers. Built in Riyadh.',
    url: 'https://www.accez.cloud/about',
    type: 'website',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'About Accez' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutPage locale="en" />
      <RelatedPosts about={'Accez, property management software and a booking platform for service providers in Saudi Arabia, built in Riyadh.'} locale="en" />
      <Footer locale="en" />
    </main>
  )
}
