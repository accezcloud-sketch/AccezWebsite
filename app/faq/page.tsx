import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import { faqPageMetadata } from '@/lib/content/pageMetadata'

// The homepage FAQ as a page of its own, so the answers have a URL to rank
// and to be cited from. Same component and copy as the homepage.
export const metadata: Metadata = faqPageMetadata('en')

export default function FaqPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <FAQ headingLevel="h1" />
      </div>
      <Footer locale="en" />
    </main>
  )
}
