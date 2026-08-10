import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic version of /about/. The page component already contains the Arabic
// copy; pinning the locale in app/ar/layout.tsx makes it render server-side so
// it can finally be indexed. Metadata below reuses wording already present on
// the site — no new marketing copy is introduced.
export const metadata: Metadata = {
  title: 'من نحن، مبنية في الرياض لمشغّلي العقارات في السعودية',
  description:
    'أكسيز منصة شاملة لعمليات العقارات مبنية في الرياض بالسعودية من شركة كلاود فالي، الحجوزات وأوامر العمل والملاك والمبيعات والعقود والفنادق في نظام واحد.',
  alternates: alternatesFor('about', 'ar'),
  openGraph: {
    title: 'من نحن، مبنية في الرياض لمشغّلي العقارات في السعودية',
    description:
      'أكسيز منصة شاملة لعمليات العقارات مبنية في الرياض بالسعودية من شركة كلاود فالي، الحجوزات وأوامر العمل والملاك والمبيعات والعقود والفنادق في نظام واحد.',
    url: localeUrl('about', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'من نحن، مبنية في الرياض لمشغّلي العقارات في السعودية' }],
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
