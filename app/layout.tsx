import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Analytics } from '@/components/Analytics'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' })

export const metadata: Metadata = {
  title: {
    default: 'Accez | Smart Property Management Platform - Accez Cloud',
    template: '%s | Accez Cloud',
  },
  description: 'Accez is the smart property management platform with 400+ channel integrations, automated rent collection, maintenance scheduling, and marketplace services. Accez Cloud helps property managers generate 15-30% additional revenue.',
  keywords: ['Accez', 'Accez Cloud', 'Accez property management', 'property management', 'vacation rental', 'Airbnb management', 'booking management', 'rent collection', 'property software', 'SaaS', 'HOA management'],
  authors: [{ name: 'Accez Cloud' }],
  creator: 'Accez Cloud',
  publisher: 'Accez Cloud',
  metadataBase: new URL('https://accez.cloud'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/accez-logo.png',
    shortcut: '/images/accez-logo.png',
    apple: '/images/accez-logo.png',
  },
  openGraph: {
    title: 'Accez | Smart Property Management Platform',
    description: 'Accez Cloud - Streamline property operations with 400+ channel integrations, automated rent collection, and revenue-generating marketplace.',
    type: 'website',
    siteName: 'Accez Cloud',
    url: 'https://accez.cloud',
    locale: 'en_US',
    images: [
      {
        url: 'https://accez.cloud/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Accez Cloud - Smart Property Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accez | Smart Property Management Platform',
    description: 'Accez Cloud - Smart property management with 400+ channel integrations and automated operations.',
    images: ['https://accez.cloud/images/og-image.png'],
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
  verification: {
    google: 'G-GBPD3L2X7T',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics />
      </head>
      <body className={`${inter.variable} ${cairo.variable} font-sans`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <iframe
          src="https://accez-chatbot-production.up.railway.app/widget"
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: '400px',
            height: '600px',
            border: 'none',
            zIndex: 9999,
            background: 'transparent',
          }}
          allow="clipboard-write"
        />
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
                  retURL: "https://accez.cloud/thankyou",
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
