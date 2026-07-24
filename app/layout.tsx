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
  keywords: ['Accez', 'Accez Cloud', 'property management Saudi Arabia', 'property management software Riyadh', 'all-in-one property platform', 'owner management', 'HOA management', 'hotel management', 'serviced apartments', 'real estate sales CRM', 'Arabic property software', 'property operations'],
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
    title: 'Accez | All-in-One Property Management for Saudi Arabia',
    description: 'Run reservations, rent, maintenance, owners, sales and hotels in one platform. Built for Saudi operators, in Arabic and English.',
    type: 'website',
    siteName: 'Accez',
    url: 'https://accez.cloud',
    locale: 'en_US',
    images: [
      {
        url: 'https://accez.cloud/images/og-image.png',
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
