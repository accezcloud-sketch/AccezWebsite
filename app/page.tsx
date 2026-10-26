import type { Metadata } from 'next'
import HomePage from '@/components/home/HomePage'
import { alternatesFor } from '@/lib/i18n'
import { softwareApplicationSchema } from '@/lib/content/siteSchema'

// The root layout deliberately no longer sets a canonical (it was being
// inherited by every page). The homepage declares its own here.
export const metadata: Metadata = {
  alternates: alternatesFor('', 'en'),
}

// Product description for structured data (the page's meta description is
// the site default, inherited from the layout).
const PRODUCT_DESCRIPTION =
  'Accez is one platform with two solutions for Saudi Arabia. Property management: reservations and channels, work orders, rental and sale properties, sales and developer projects, leases and rent, owner payouts, hotels and serviced apartments. And a service provider marketplace, where salons, spas, fitness coaches, photographers and home services are found and booked. In Arabic and English.'

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema('en', PRODUCT_DESCRIPTION)) }}
      />
      <HomePage locale="en" />
    </>
  )
}
