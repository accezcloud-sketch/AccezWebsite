import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Ecosystem from '@/components/Ecosystem'
import ProductScope from '@/components/ProductScope'
import Capabilities from '@/components/Capabilities'
import ServiceProviders from '@/components/ServiceProviders'
import Trust from '@/components/Trust'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic homepage. Identical component tree to the English one — the Arabic
// copy already lives in translations/ar.ts and each component reads it from
// context. Pinning the locale here makes that copy server-rendered.
export const metadata: Metadata = {
  title: 'أكسيز | منصة شاملة لإدارة العقارات في السعودية',
  description:
    'أدر الحجوزات والإيجارات والصيانة والملاك والمبيعات والفنادق من منصة واحدة. عمليات عقارية شاملة للسعودية، بالعربية والإنجليزية.',
  alternates: alternatesFor('', 'ar'),
  openGraph: {
    title: 'أكسيز | منصة شاملة لإدارة العقارات في السعودية',
    description:
      'أدر الحجوزات والإيجارات والصيانة والملاك والمبيعات والفنادق من منصة واحدة. مبنية لمشغّلي العقارات في السعودية.',
    url: localeUrl('', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    siteName: 'Accez',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'أكسيز، منصة شاملة لإدارة العقارات في السعودية' }],
  },
}

export default function ArabicHome() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Ecosystem />
      <ProductScope />
      <Capabilities />
      <ServiceProviders />
      <Trust />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
