import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutPage from '@/components/AboutPage'
import { alternatesFor, localeUrl } from '@/lib/i18n'

// Arabic version of /about/. The page component already contains the Arabic
// copy; pinning the locale in app/ar/layout.tsx makes it render server-side so
// it can finally be indexed.
export const metadata: Metadata = {
  title: 'عن أكسيز، منصة واحدة بحلّين',
  description:
    'أكسيز منصة واحدة بحلّين، مبنية في الرياض من شركة كلاود فالي: برنامج لإدارة العقارات، وحل حجوزات لمقدمي الخدمات، بالعربية والإنجليزية.',
  alternates: alternatesFor('about', 'ar'),
  openGraph: {
    title: 'عن أكسيز، منصة واحدة بحلّين',
    description:
      'أكسيز.كلاود منصة واحدة بحلّين، مبنية في الرياض من شركة وادي السحاب: إدارة العقارات لمديري العقارات والملاك والفنادق، وحل حجز لمقدمي الخدمات.',
    url: localeUrl('about', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'عن أكسيز، منصة واحدة بحلّين' }],
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
