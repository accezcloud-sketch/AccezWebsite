import type { Metadata } from 'next'
import { Inter, Cairo, Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/Analytics'
import ChatbotWidget from '@/components/ChatbotWidget'
import LanguageSuggestion from '@/components/LanguageSuggestion'
import ConversionTracking from '@/components/ConversionTracking'
import ConsentBanner from '@/components/ConsentBanner'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { SITE_DESCRIPTION, TITLE_SUFFIX, X_HANDLE } from '@/lib/site'
import { websiteSchema } from '@/lib/content/siteSchema'
import { THEME_INIT_SCRIPT } from '@/lib/theme/theme'
import { CONSENT_DEFAULT_SCRIPT } from '@/lib/analytics/consent'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })
// Website headings: a grotesque at a regular weight with tight spacing, for a
// calm, editorial look. (The product apps use Poppins, per Design System.docx.)
// Mapped to --font-heading so every .hero-display heading picks it up.
const heading = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-heading', axes: ['opsz'] })

export const metadata: Metadata = {
  title: {
    default: 'Accez | Property Management & Service Marketplace for Saudi Arabia',
    template: `%s${TITLE_SUFFIX}`,
  },
  description: SITE_DESCRIPTION,
  // NOTE: no `keywords` here on purpose. Google confirms the meta keywords tag
  // is not used by Search, so it was dead weight in every page's <head>.
  authors: [{ name: 'Accez Cloud' }],
  creator: 'Accez Cloud',
  publisher: 'Accez Cloud',
  metadataBase: new URL('https://www.accez.cloud'),
  // IMPORTANT: do NOT set `alternates.canonical` here.
  // Next.js metadata is inherited, so a canonical on the root layout is applied
  // to every child route that doesn't declare its own. That previously pointed
  // /support and /thankyou at the homepage, telling Google they were duplicates
  // of `/` and should not be indexed, while /support was still listed in the
  // sitemap. Every page now declares its own canonical explicitly.
  // Square icons: Google requires a square favicon (a multiple of 48px), and
  // the logo file is 112x116. favicon.ico serves browsers that request it
  // directly.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32 48x48' },
      { url: '/images/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/images/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'Accez | Property Management & Service Marketplace for Saudi Arabia',
    description: 'Run reservations, rent, maintenance, owners, sales and hotels in one platform. Built for Saudi operators, in Arabic and English.',
    type: 'website',
    siteName: 'Accez',
    url: 'https://www.accez.cloud',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.accez.cloud/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Accez, property management and service marketplace for Saudi Arabia',
      },
    ],
  },
  // No title/description here: a fixed value is inherited by every page, so X
  // showed the English homepage title for every shared link (Arabic pages
  // included). Without them X uses each page's own Open Graph title.
  twitter: {
    card: 'summary_large_image',
    site: X_HANDLE,
    images: ['https://www.accez.cloud/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Search Console verification.
  //
  // This previously contained 'G-GBPD3L2X7T', which is the Google *Analytics*
  // measurement ID, not a Search Console verification token. It rendered a
  // <meta name="google-site-verification"> tag that could never verify anything.
  //
  // Real tokens are long opaque strings issued by Search Console (Settings ->
  // Ownership verification -> HTML tag). Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // at build time and the tag appears; leave it unset and no tag is emitted,
  // which is correct — an invalid tag is worse than no tag.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}

/**
 * Site-wide Organization entity.
 *
 * `sameAs` is what lets Google and AI systems resolve every scattered mention
 * of "Accez" — the X account, the LinkedIn page, the YouTube channel — to one
 * entity instead of several unrelated ones. The profiles were already linked in
 * the footer; this is the machine-readable version of the same facts.
 *
 * Rendered server-side as a raw <script> so it appears in the static HTML. Do
 * not switch this to next/script — that injects client-side and would make it
 * invisible to every crawler that doesn't execute JavaScript.
 */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.accez.cloud/#organization',
  name: 'Accez',
  alternateName: 'Accez Cloud',
  legalName: 'Cloud Valley LLC',
  url: 'https://www.accez.cloud',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.accez.cloud/images/accez-logo.png',
  },
  description:
    'All-in-one property operations platform for Saudi Arabia. Reservations, rent, maintenance, owners, sales and hotels in one system, in Arabic and English.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressCountry: 'SA',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Saudi Arabia',
  },
  sameAs: [
    'https://x.com/accez_cloud',
    'https://www.linkedin.com/company/accez-cloud/',
    'https://www.youtube.com/@accez-cloud',
    'https://www.instagram.com/accez.cloud',
    'https://www.facebook.com/profile.php?id=61569153550177',
  ],
}

const HTML_LANG_SCRIPT =
  "(function(){var ar=/^\\/ar(\\/|$)/.test(location.pathname),d=document.documentElement;d.lang=ar?'ar':'en';d.dir=ar?'rtl':'ltr'})()"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Arabic pages live under /ar. The static HTML can only carry one
            <html lang> (a single root layout serves both languages), so set
            lang and dir from the URL before first paint; LanguageContext keeps
            them in sync afterwards. */}
        <script dangerouslySetInnerHTML={{ __html: HTML_LANG_SCRIPT }} />
        {/* Light/dark theme, applied before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {/* Consent Mode v2: every Google signal denied until the visitor
            accepts. Must run before <Analytics /> configures gtag. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
        <Analytics />
      </head>
      <body className={`${inter.variable} ${cairo.variable} ${heading.variable} font-sans`}>
        <LanguageProvider>
          {children}
          <LanguageSuggestion />
        </LanguageProvider>
        <ChatbotWidget />
        <ConsentBanner />
        <ConversionTracking />
      </body>
    </html>
  )
}
