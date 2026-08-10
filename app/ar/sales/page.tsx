import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SolutionPage from '@/components/SolutionPage'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic version of /sales/. The page component already contains the Arabic
// copy; pinning the locale in app/ar/layout.tsx makes it render server-side so
// it can finally be indexed. Metadata below reuses wording already present on
// the site — no new marketing copy is introduced.
export const metadata: Metadata = {
  title: 'المبيعات والمشاريع',
  description:
    'مساحة عمل للمبيعات للمطورين والوكالات، مشاريع ووحدات ومسار عملاء من العميل المحتمل حتى الإغلاق وأداء مندوبي المبيعات.',
  alternates: alternatesFor('sales', 'ar'),
  openGraph: {
    title: 'المبيعات والمشاريع',
    description:
      'مساحة عمل للمبيعات للمطورين والوكالات، مشاريع ووحدات ومسار عملاء من العميل المحتمل حتى الإغلاق وأداء مندوبي المبيعات.',
    url: localeUrl('sales', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'المبيعات والمشاريع' }],
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
