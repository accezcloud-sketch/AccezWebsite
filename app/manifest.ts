import { MetadataRoute } from 'next'
export const dynamic = 'force-static'


export default function manifest(): MetadataRoute.Manifest {
  return {
    // This manifest previously described a different product entirely — "Accez
    // AI - AI Customer Service ... responds within 15 seconds and converts
    // conversations to sales". It appears to have been copied from another
    // project. /manifest.webmanifest is public and crawlable, so it was a
    // machine-readable description of the wrong company sitting at a well-known
    // URL, contradicting every other description on the site.
    name: 'Accez | All-in-One Property Management for Saudi Arabia',
    short_name: 'Accez',
    description:
      'Run reservations, rent, maintenance, owners, sales and hotels in one platform. All-in-one property operations for Saudi Arabia, in Arabic and English.',
    lang: 'en',
    dir: 'ltr',
    categories: ['business', 'productivity'],
    start_url: '/',
    display: 'standalone',
    // Matches --bg in app/globals.css so the splash screen doesn't flash white.
    background_color: '#09131C',
    theme_color: '#09131C',
    // Both entries previously pointed at /images/accez-logo.png — a 112x116
    // image — while declaring 192x192 and 512x512. The files now exist at the
    // sizes they claim (generated from the logo, padded onto the brand
    // background), so browsers and app stores get what the manifest promises.
    icons: [
      {
        src: '/images/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
