import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SolutionPage from '@/components/SolutionPage'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic version of /hotels/. The page component already contains the Arabic
// copy; pinning the locale in app/ar/layout.tsx makes it render server-side so
// it can finally be indexed. Metadata below reuses wording already present on
// the site — no new marketing copy is introduced.
export const metadata: Metadata = {
  title: 'الفنادق والشقق المخدومة',
  description:
    'أنواع الغرف والأسعار والحجوزات متزامنة عبر أكثر من 400 قناة، مع سياسات النزلاء والإضافات وتسجيل الوصول.',
  alternates: alternatesFor('hotels', 'ar'),
  openGraph: {
    title: 'الفنادق والشقق المخدومة',
    description:
      'أنواع الغرف والأسعار والحجوزات متزامنة عبر أكثر من 400 قناة، مع سياسات النزلاء والإضافات وتسجيل الوصول.',
    url: localeUrl('hotels', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'الفنادق والشقق المخدومة' }],
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
