import type { Metadata } from 'next'
import { Inter, Cairo, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@/components/Analytics'
import ChatbotWidget from '@/components/ChatbotWidget'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })
// Poppins is the Accez product heading face (per Design System.docx). Mapped
// to the existing --font-heading variable so every heading picks it up.
const poppins = Poppins({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: {
    default: 'Accez | All-in-One Property Management for Saudi Arabia',
    template: '%s | Accez',
  },
  description: 'Run reservations, rent, maintenance, owners, sales and hotels in one platform. All-in-one property operations for Saudi Arabia, in Arabic and English.',
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
  icons: {
    icon: '/images/accez-logo.png',
    shortcut: '/images/accez-logo.png',
    apple: '/images/accez-logo.png',
  },
  openGraph: {
    title: 'Accez | All-in-One Property Management for Saudi Arabia',
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
        alt: 'Accez, all-in-one property management for Saudi Arabia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accez | All-in-One Property Management for Saudi Arabia',
    description: 'Run reservations, rent, maintenance, owners, sales and hotels in one platform. Built for Saudi operators, in Arabic and English.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Analytics />
      </head>
      <body className={`${inter.variable} ${cairo.variable} ${poppins.variable} font-sans`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <ChatbotWidget />
        <Script
          id="accez-chatbot"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__accezSubmitLead = function(data) {
                var iframe = document.createElement("iframe");
                iframe.name = "sf-lead-iframe";
                iframe.style.display = "none";
                document.body.appendChild(iframe);

                var form = document.createElement("form");
                form.method = "POST";
                form.action = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D41000002kA0p";
                form.target = "sf-lead-iframe";

                var fields = {
                  oid: "00D41000002kA0p",
                  retURL: "https://www.accez.cloud/thankyou",
                  recordType: "012Pm000004jdap",
                  lead_source: "Chatbot",
                  first_name: data.first_name || "",
                  last_name: data.last_name || "",
                  email: data.email || "",
                  company: data.company || "",
                  mobile: data.mobile || "",
                  city: data.city || "",
                  description: data.description || ""
                };

                Object.keys(fields).forEach(function(key) {
                  var input = document.createElement("input");
                  input.type = "hidden";
                  input.name = key;
                  input.value = fields[key];
                  form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();

                iframe.addEventListener("load", function() {
                  setTimeout(function() {
                    if (form.parentNode) form.parentNode.removeChild(form);
                    if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
                  }, 2000);
                });
              };
            `,
          }}
        />
      </body>
    </html>
  )
}
