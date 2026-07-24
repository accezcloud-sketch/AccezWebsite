import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Accez.cloud, how Cloud Valley LLC collects, uses, shares, and protects information from property managers and tenants who use the Accez platform.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Accez Cloud',
    description:
      'How Cloud Valley LLC collects, uses, shares, and protects information from property managers and tenants who use the Accez platform.',
    type: 'article',
    url: 'https://accez.cloud/privacy',
    siteName: 'Accez Cloud',
    images: [
      {
        url: 'https://accez.cloud/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Accez Cloud - Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Accez Cloud',
    description:
      'How Cloud Valley LLC collects, uses, shares, and protects information from property managers and tenants who use the Accez platform.',
    images: ['https://accez.cloud/images/og-image.png'],
  },
}

const lastUpdated = 'May 5, 2026'

const sections = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'information-we-collect', title: '2. Information We Collect' },
  { id: 'how-we-use', title: '3. How We Use Your Information' },
  { id: 'how-we-share', title: '4. How We Share Your Information' },
  { id: 'security', title: '5. Data Security' },
  { id: 'your-choices', title: '6. Your Choices' },
  { id: 'cookies', title: '7. Cookies' },
  { id: 'changes-and-contact', title: '8. Changes and Contact' },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-300">
              How we collect, use, and protect your information.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
            {/* Table of Contents */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <nav aria-label="Table of contents" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Contents
                </h2>
                <ol className="space-y-2 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Content */}
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
              <div className="max-w-[70ch] text-gray-700 leading-relaxed space-y-12">
                <section id="introduction" aria-labelledby="introduction-h">
                  <h2
                    id="introduction-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    1. Introduction
                  </h2>
                  <p>
                    Accez is a property management platform operated by{' '}
                    <strong>Cloud Valley LLC</strong>. This Privacy Policy explains what
                    information we collect when you use accez.cloud and our apps, how we use it,
                    and the choices you have. We comply with applicable data protection laws,
                    including GDPR and similar regulations where they apply.
                  </p>
                </section>

                <section id="information-we-collect" aria-labelledby="information-we-collect-h">
                  <h2
                    id="information-we-collect-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    2. Information We Collect
                  </h2>
                  <p>We collect the following types of information:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>
                      <strong>Account info</strong>, your name, email, phone number, and company
                      details when you sign up.
                    </li>
                    <li>
                      <strong>Property and booking data</strong>, listings, pricing, calendars,
                      and guest information you upload or that we sync from channels like Airbnb,
                      Booking.com, Vrbo, and Expedia.
                    </li>
                    <li>
                      <strong>Payment info</strong>, handled by our payment provider. We
                      don&apos;t store full card numbers ourselves.
                    </li>
                    <li>
                      <strong>Usage data</strong>, IP address, browser, pages visited, and
                      similar information collected through cookies and analytics.
                    </li>
                  </ul>
                </section>

                <section id="how-we-use" aria-labelledby="how-we-use-h">
                  <h2
                    id="how-we-use-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    3. How We Use Your Information
                  </h2>
                  <p>We use the information above to:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Provide and operate the service.</li>
                    <li>Sync your listings and bookings with channel partners.</li>
                    <li>Process payments through our payment provider.</li>
                    <li>Send service-related emails (account, billing, security, support).</li>
                    <li>Improve and secure the product.</li>
                    <li>Meet our legal obligations.</li>
                  </ul>
                  <p className="mt-4">
                    We keep your data only as long as we need it to provide the service or to
                    meet legal obligations.
                  </p>
                </section>

                <section id="how-we-share" aria-labelledby="how-we-share-h">
                  <h2
                    id="how-we-share-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    4. How We Share Your Information
                  </h2>
                  <p>We share your information only with:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>
                      <strong>Booking platform partners</strong>, to sync your listings and
                      bookings.
                    </li>
                    <li>
                      <strong>Service providers</strong>, for payment processing, hosting, email
                      delivery, and analytics. They can only use the data to help us run the
                      service.
                    </li>
                    <li>
                      <strong>Authorities</strong>, when required by law.
                    </li>
                  </ul>
                  <p className="mt-4">
                    <strong>We do not sell your personal information.</strong>
                  </p>
                </section>

                <section id="security" aria-labelledby="security-h">
                  <h2
                    id="security-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    5. Data Security
                  </h2>
                  <p>
                    We protect your data with encryption in transit and at rest, restricted
                    access for our team, and regular security reviews. No system is 100% secure,
                    so we can&apos;t guarantee absolute security, but we work hard to keep your
                    data safe.
                  </p>
                </section>

                <section id="your-choices" aria-labelledby="your-choices-h">
                  <h2
                    id="your-choices-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    6. Your Choices
                  </h2>
                  <p>You can:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Access, correct, or delete your data.</li>
                    <li>Opt out of marketing emails using the unsubscribe link.</li>
                    <li>Control cookies through your browser settings.</li>
                  </ul>
                  <p className="mt-4">
                    To make a request, message us on WhatsApp at{' '}
                    <a
                      href="https://wa.me/18444603371"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      (844) 460-3371
                    </a>
                    .
                  </p>
                </section>

                <section id="cookies" aria-labelledby="cookies-h">
                  <h2
                    id="cookies-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    7. Cookies
                  </h2>
                  <p>
                    We use cookies to keep you signed in, measure how the site is used, and
                    remember your preferences. You can block or delete cookies in your browser
                    settings, but some parts of the service may not work as well without them.
                  </p>
                </section>

                <section id="changes-and-contact" aria-labelledby="changes-and-contact-h">
                  <h2
                    id="changes-and-contact-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    8. Changes and Contact
                  </h2>
                  <p>
                    We may update this policy from time to time. If we make material changes,
                    we&apos;ll let you know through the service or by email. The date at the top
                    of this page shows when it was last updated.
                  </p>
                  <p className="mt-4">If you have questions, get in touch:</p>
                  <address className="not-italic mt-4 space-y-1">
                    <div>
                      <strong>Cloud Valley LLC</strong>
                    </div>
                    <div>
                      WhatsApp:{' '}
                      <a
                        href="https://wa.me/18444603371"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        (844) 460-3371
                      </a>
                    </div>
                    <div>Anas Bin Malik, Almalqa, Riyadh, KSA</div>
                  </address>
                </section>
              </div>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
