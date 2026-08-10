import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ModulesPage from '@/components/ModulesPage'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic version of /modules/. The page component already contains the Arabic
// copy; pinning the locale in app/ar/layout.tsx makes it render server-side so
// it can finally be indexed. Metadata below reuses wording already present on
// the site — no new marketing copy is introduced.
export const metadata: Metadata = {
  title: 'وحدات المنتج، كل ما تديره أكسيز',
  description:
    'استعرض كل وحدات أكسيز، الحجوزات والقنوات والفنادق والشقق المخدومة وأوامر العمل والعقارات والمبيعات والعقود والملاك والحملات التسويقية.',
  alternates: alternatesFor('modules', 'ar'),
  openGraph: {
    title: 'وحدات المنتج، كل ما تديره أكسيز',
    description:
      'استعرض كل وحدات أكسيز، الحجوزات والقنوات والفنادق والشقق المخدومة وأوامر العمل والعقارات والمبيعات والعقود والملاك والحملات التسويقية.',
    url: localeUrl('modules', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'وحدات المنتج، كل ما تديره أكسيز' }],
  },
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <ModulesPage />
      <Footer />
    </main>
  )
}
