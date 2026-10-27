import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import RelatedPosts from '@/components/blog/RelatedPosts'
import { faqPageMetadata } from '@/lib/content/pageMetadata'

// The homepage FAQ as a page of its own, so the answers have a URL to rank
// and to be cited from. Same component and copy as the homepage.
export const metadata: Metadata = faqPageMetadata('ar')

export default function FaqPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <FAQ headingLevel="h1" />
      </div>
      <RelatedPosts about="Questions about Accez property management software, channels, payments, pricing, bookings and service providers in Saudi Arabia." locale="ar" />
      <Footer locale="ar" />
    </main>
  )
}
