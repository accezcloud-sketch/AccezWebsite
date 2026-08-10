import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SolutionPage from '@/components/SolutionPage'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic version of /owners/. The page component already contains the Arabic
// copy; pinning the locale in app/ar/layout.tsx makes it render server-side so
// it can finally be indexed. Metadata below reuses wording already present on
// the site — no new marketing copy is introduced.
export const metadata: Metadata = {
  title: 'الملاك والمدفوعات',
  description:
    'بوابة خاصة للملاك وسجل واضح ومدفوعات متتبعة. كشوف الملاك والأرصدة والفواتير والتحليلات، ضمن منصة أكسيز الشاملة.',
  alternates: alternatesFor('owners', 'ar'),
  openGraph: {
    title: 'الملاك والمدفوعات',
    description:
      'بوابة خاصة للملاك وسجل واضح ومدفوعات متتبعة. كشوف الملاك والأرصدة والفواتير والتحليلات، ضمن منصة أكسيز الشاملة.',
    url: localeUrl('owners', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'الملاك والمدفوعات' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <SolutionPage slug="owners" />
      <Footer />
    </main>
  )
}
