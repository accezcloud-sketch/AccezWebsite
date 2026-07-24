import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SolutionPage from '@/components/SolutionPage'

export const metadata: Metadata = {
  title: 'Sales & Developer Projects | Accez',
  description: 'A sales workspace for developers and agencies, projects, units, a lead-to-close customer pipeline and sales-agent performance, in Arabic and English, on the platform that runs the units after they sell.',
  alternates: { canonical: '/sales' },
  openGraph: {
    title: 'Sales & Developer Projects | Accez',
    description: 'A sales workspace for developers and agencies, projects, units, a lead-to-close customer pipeline and sales-agent performance, in Arabic and English, on the platform that runs the units after they sell.',
    url: 'https://accez.cloud/sales',
    type: 'website',
    images: [{ url: 'https://accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Sales & Developer Projects | Accez' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <SolutionPage slug="sales" />
      <Footer />
    </main>
  )
}
