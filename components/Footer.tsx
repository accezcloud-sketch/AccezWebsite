'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t, language, setLanguage } = useLanguage()

  const socials = [
    {
      label: 'X (Twitter)',
      href: 'https://x.com/accez_cloud?s=11&t=IZ0q6A1iESmaQ21Jd6TKkQ',
      svg: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61569153550177&mibextid=wwXIfr',
      svg: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/accez.cloud?igsh=NTc4MTIwNjQ2YQ==',
      svg: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/accez-cloud/',
      svg: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@accez-cloud?si=qDFn91hkrt5vBwW8',
      svg: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/18444603371',
      svg: (
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ]

  const columns = [
    {
      heading: t.footer.product,
      links: [
        { label: t.footer.features, href: '/#features' },
        { label: t.footer.pricing, href: '/#pricing' },
        { label: t.footer.integrations, href: '#' },
      ],
    },
    {
      heading: t.footer.manageResources,
      links: [
        { label: t.footer.propertyDashboard, href: '/#capabilities' },
        { label: t.footer.tenantManagement, href: '/#capabilities' },
        { label: t.footer.financialReports, href: '/#capabilities' },
        { label: t.footer.communicationTools, href: '/#capabilities' },
      ],
    },
    {
      heading: t.footer.support,
      links: [
        { label: t.header.faq, href: '/#faq' },
        { label: t.footer.contact, href: '/#contact' },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden" style={{ background: '#060a14' }}>
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), rgba(192,132,252,0.4), transparent)',
        }}
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <FadeUp distance={20}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12 py-14 lg:py-16">
            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 md:col-span-2 flex flex-col gap-5">
              <Link href="/" prefetch={false} className="inline-flex items-center gap-2.5 w-fit">
                <Image
                  src="/images/accez-logo.png"
                  alt="Accez Logo"
                  width={28}
                  height={28}
                  className="rounded-md"
                />
                <span
                  className="font-bold text-white text-lg"
                  style={{ fontFamily: 'var(--font-manrope), var(--font-inter), system-ui, sans-serif' }}
                >
                  Accez.cloud
                </span>
              </Link>

              <p
                className="text-slate-500 leading-relaxed max-w-xs"
                style={{ fontSize: 14 }}
              >
                {t.footer.description}
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                {socials.map(({ label, href, svg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-4">
                <h4
                  className="text-white text-sm font-semibold"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map(({ label, href }) => (
                    <li key={`${heading}-${label}`}>
                      <a
                        href={href}
                        className="text-slate-500 text-sm transition-colors duration-150 hover:text-slate-300 inline-flex items-center gap-1 group"
                      >
                        <span
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 -ms-3 group-hover:ms-0 duration-200"
                          aria-hidden="true"
                        >
                          ›
                        </span>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-slate-600 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="text-center sm:text-start">
              <p>
                &copy; {currentYear} Accez.cloud. {t.footer.allRightsReserved}
              </p>
              <p className="mt-1 text-slate-700">{t.footer.companyInfo}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/privacy"
                prefetch={false}
                className="hover:text-slate-400 transition-colors duration-150"
              >
                {t.footer.privacy}
              </Link>
              <Link
                href="/terms"
                prefetch={false}
                className="hover:text-slate-400 transition-colors duration-150"
              >
                {t.footer.terms}
              </Link>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600">🌐</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`transition-colors duration-150 ${
                    language === 'en' ? 'text-slate-300' : 'hover:text-slate-400'
                  }`}
                >
                  English
                </button>
                <span className="text-slate-700">·</span>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`transition-colors duration-150 ${
                    language === 'ar' ? 'text-slate-300' : 'hover:text-slate-400'
                  }`}
                  dir="rtl"
                >
                  العربية
                </button>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </footer>
  )
}
