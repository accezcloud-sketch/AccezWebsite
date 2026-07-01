import { MetadataRoute } from 'next'
export const dynamic = 'force-static'


export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Accez AI - AI Customer Service',
    short_name: 'Accez AI',
    description: 'AI-powered customer service that responds within 15 seconds and converts conversations to sales.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    // Point at an asset that actually exists. The previous /icon-192.png and
    // /icon-512.png files were missing, so every browser/crawler that fetched
    // the manifest generated 404 edge requests.
    icons: [
      {
        src: '/images/accez-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/accez-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
