import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms & Conditions governing the use of Accez.cloud, the property management platform operated by Cloud Valley LLC.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | Accez Cloud',
    description:
      'The Terms & Conditions that govern your use of the Accez.cloud property management platform.',
    type: 'article',
    url: 'https://accez.cloud/terms',
    siteName: 'Accez Cloud',
    images: [
      {
        url: 'https://accez.cloud/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Accez Cloud - Terms & Conditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Accez Cloud',
    description:
      'The Terms & Conditions that govern your use of the Accez.cloud property management platform.',
    images: ['https://accez.cloud/images/og-image.png'],
  },
}

const lastUpdated = 'May 5, 2026'

const sections = [
  { id: 'introduction', title: '1. Introduction' },
  { id: 'eligibility', title: '2. Eligibility' },
  { id: 'your-account', title: '3. Your Account' },
  { id: 'plans-and-payment', title: '4. Plans and Payment' },
  { id: 'acceptable-use', title: '5. Acceptable Use' },
  { id: 'integrations', title: '6. Third-Party Integrations' },
  { id: 'your-content', title: '7. Your Content and Data' },
  { id: 'availability', title: '8. Service Availability and Disclaimers' },
  { id: 'liability', title: '9. Limitation of Liability' },
  { id: 'termination-and-contact', title: '10. Termination, Changes, and Contact' },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
            <p className="text-lg text-gray-300">
              The agreement that governs your use of Accez.cloud.
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
                    <strong>Cloud Valley LLC</strong>. It helps you manage listings, bookings,
                    payments, and operations across channels like Airbnb, Booking.com, Vrbo, and
                    Expedia.
                  </p>
                  <p className="mt-4">
                    By creating an account or using the service, you agree to these Terms and
                    our{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    . If you don&apos;t agree, please don&apos;t use the service.
                  </p>
                </section>

                <section id="eligibility" aria-labelledby="eligibility-h">
                  <h2
                    id="eligibility-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    2. Eligibility
                  </h2>
                  <p>To use Accez, you must:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Be at least 18 years old.</li>
                    <li>Provide accurate information when you sign up.</li>
                    <li>
                      Have authority to accept these Terms on behalf of your company, if
                      you&apos;re signing up for one.
                    </li>
                  </ul>
                </section>

                <section id="your-account" aria-labelledby="your-account-h">
                  <h2
                    id="your-account-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    3. Your Account
                  </h2>
                  <p>
                    Keep your login details secure and don&apos;t share them. You&apos;re
                    responsible for everything that happens under your account. If you think
                    someone else has accessed it, message us on WhatsApp right away at{' '}
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

                <section id="plans-and-payment" aria-labelledby="plans-and-payment-h">
                  <h2
                    id="plans-and-payment-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    4. Plans and Payment
                  </h2>
                  <p>
                    Accez offers <strong>Free</strong>, <strong>Basic</strong>,{' '}
                    <strong>Professional</strong>, and <strong>Enterprise</strong> plans. Paid
                    plans are billed monthly or annually, depending on what you choose. Current
                    prices and features are listed on our pricing page.
                  </p>
                  <p className="mt-4">
                    New customers can try a paid plan free for <strong>14 days</strong>.
                  </p>
                  <p className="mt-4">
                    You can cancel anytime. Cancellation takes effect at the end of your current
                    billing period, and we do not provide refunds for partial billing periods
                    unless required by law.
                  </p>
                </section>

                <section id="acceptable-use" aria-labelledby="acceptable-use-h">
                  <h2
                    id="acceptable-use-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    5. Acceptable Use
                  </h2>
                  <p>When using Accez, please don&apos;t:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Use the service for anything illegal.</li>
                    <li>Try to break, hack, or disrupt the service.</li>
                    <li>Upload data you don&apos;t have the right to use.</li>
                    <li>Harass, threaten, or abuse other users.</li>
                    <li>Reverse-engineer or copy the platform.</li>
                  </ul>
                  <p className="mt-4">
                    We may suspend or close accounts that break these rules.
                  </p>
                </section>

                <section id="integrations" aria-labelledby="integrations-h">
                  <h2
                    id="integrations-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    6. Third-Party Integrations
                  </h2>
                  <p>
                    Accez connects with platforms like Airbnb, Booking.com, Vrbo, Expedia, and
                    others. Those services are run by their own companies, with their own terms
                    and policies. We&apos;re not responsible for their availability, decisions,
                    or fees, and your relationship with them is separate from your relationship
                    with us.
                  </p>
                </section>

                <section id="your-content" aria-labelledby="your-content-h">
                  <h2
                    id="your-content-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    7. Your Content and Data
                  </h2>
                  <p>
                    You own the content and data you put into Accez. You give us permission to
                    use it as needed to provide the service, for example, to host it, sync it
                    with channels, and show it back to you in the app.
                  </p>
                </section>

                <section id="availability" aria-labelledby="availability-h">
                  <h2
                    id="availability-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    8. Service Availability and Disclaimers
                  </h2>
                  <p>
                    We aim for high uptime, but we don&apos;t guarantee uninterrupted service.
                    Things sometimes go wrong, and parts of the platform may rely on third
                    parties we don&apos;t control.
                  </p>
                  <p className="mt-4">
                    The service is provided &quot;as is,&quot; without any warranties beyond
                    what the law requires.
                  </p>
                </section>

                <section id="liability" aria-labelledby="liability-h">
                  <h2
                    id="liability-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    9. Limitation of Liability
                  </h2>
                  <p>
                    To the maximum extent allowed by law, Cloud Valley LLC isn&apos;t liable for
                    indirect or consequential damages, things like lost profits, lost data, or
                    business losses.
                  </p>
                  <p className="mt-4">
                    Our total liability for any claim related to the service is capped at the
                    greater of (a) the fees you paid us in the 12 months before the claim, or
                    (b) US$100.
                  </p>
                </section>

                <section id="termination-and-contact" aria-labelledby="termination-and-contact-h">
                  <h2
                    id="termination-and-contact-h"
                    className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                  >
                    10. Termination, Changes, and Contact
                  </h2>
                  <p>
                    We may suspend or close accounts that break these Terms or that put the
                    service or other users at risk. You can cancel your account anytime from
                    your settings.
                  </p>
                  <p className="mt-4">
                    We may update these Terms from time to time. If we make material changes,
                    we&apos;ll let you know through the service or by email before they take
                    effect.
                  </p>
                  <p className="mt-4">
                    These Terms are governed by the laws of the{' '}
                    <strong>Kingdom of Saudi Arabia</strong>, and any dispute will be handled in
                    the courts of <strong>Riyadh</strong>.
                  </p>
                  <p className="mt-4">Questions? Get in touch:</p>
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
