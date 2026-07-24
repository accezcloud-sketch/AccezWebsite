import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SolutionPage from '@/components/SolutionPage'

export const metadata: Metadata = {
  title: 'Communities & HOA Management | Accez',
  description: 'Group properties into communities and give residents a feed worth opening, announcements, polls, comments and likes. Community management built into the Accez property platform.',
  alternates: { canonical: '/communities' },
  openGraph: {
    title: 'Communities & HOA Management | Accez',
    description: 'Group properties into communities and give residents a feed worth opening, announcements, polls, comments and likes. Community management built into the Accez property platform.',
    url: 'https://accez.cloud/communities',
    type: 'website',
    images: [{ url: 'https://accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'Communities & HOA Management | Accez' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <SolutionPage slug="communities" />
      <Footer />
    </main>
  )
}
