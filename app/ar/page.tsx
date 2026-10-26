import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'
import { alternatesFor, localeUrl } from '@/lib/i18n'
import { softwareApplicationSchema } from '@/lib/content/siteSchema'
import { HOME_TITLE } from '@/lib/site'

// Arabic homepage: the same page as the English one (components/home/HomePage),
// with the locale pinned so the Arabic copy is server-rendered.
const TITLE = HOME_TITLE.ar
const DESCRIPTION =
  'منصة واحدة بحلّين: إدارة العقارات للإيجارات والفنادق والملاك، وسوق خدمات يحصل فيه مقدمو الخدمات على الحجوزات. مبنية للسعودية بالعربية والإنجليزية.'

export const metadata: Metadata = {
  // `absolute`: the title already names the brand; the layout's '%s | Accez'
  // template would repeat it.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor('', 'ar'),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: localeUrl('', 'ar'),
    type: 'website',
    locale: 'ar_SA',
    siteName: 'Accez',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: TITLE }],
  },
}

export default function ArabicHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema('ar', DESCRIPTION)) }}
      />
      <HomePage locale="ar" />
    </>
  )
}
