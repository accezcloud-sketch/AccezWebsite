import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceProviderPage from '@/components/ServiceProviderPage'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic version of /service-providers/. The page component already contains the Arabic
// copy; pinning the locale in app/ar/layout.tsx makes it render server-side so
// it can finally be indexed. Metadata below reuses wording already present on
// the site — no new marketing copy is introduced.
export const metadata: Metadata = {
  title: 'مقدمو الخدمات، أدرج نشاطك في سوق أكسيز',
  description:
    'أدرج نشاطك في سوق أكسيز وتواصل مع السكان والنزلاء ومديري العقارات. صالونات وسبا ولياقة وتصوير وخدمات منزلية.',
  alternates: alternatesFor('service-providers', 'ar'),
  openGraph: {
    title: 'مقدمو الخدمات، أدرج نشاطك في سوق أكسيز',
    description:
      'أدرج نشاطك في سوق أكسيز وتواصل مع السكان والنزلاء ومديري العقارات. صالونات وسبا ولياقة وتصوير وخدمات منزلية.',
    url: localeUrl('service-providers', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'مقدمو الخدمات، أدرج نشاطك في سوق أكسيز' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServiceProviderPage />
      <Footer />
    </main>
  )
}
