'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'
import { thankYouEvent, trackEvent } from '@/lib/analytics/conversions'

export default function ThankYou() {
  const { language } = useLanguage()

  // Salesforce redirects here after a form is submitted, with ?form=<kind>.
  // Record that conversion once; a reload of the same page doesn't count again.
  useEffect(() => {
    const hit = thankYouEvent(window.location.search)
    if (!hit) return
    const key = `accez:conversion:${window.location.search}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {
      // Storage unavailable: still record the conversion.
    }
    trackEvent(hit.event, hit.params)
  }, [])

  const content = {
    en: {
      title: 'Thank You!',
      message: 'Your message has been successfully submitted. Our team will get back to you within 24-48 hours.',
      backHome: 'Back to Home',
    },
    ar: {
      title: 'شكراً لك!',
      message: 'تم إرسال رسالتك بنجاح. سيتواصل معك فريقنا خلال 24-48 ساعة.',
      backHome: 'العودة للرئيسية',
    },
  }

  const t = content[language]

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-md w-full text-center">
        <div className="rounded-2xl p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.3 * var(--shadow-k)))' }}>
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--ok-dim)' }}>
            <svg
              className="w-10 h-10"
              style={{ color: 'var(--ok-text)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image
              src="/images/accez-logo.png"
              alt="Accez Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-strong">Accez.cloud</span>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-strong mb-4">{t.title}</h1>
          <p className="text-muted mb-8">{t.message}</p>

          {/* Back Button */}
          <Link
            href={localeHref("/", language)}
            prefetch={false}
            className="inline-block px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--accent-solid)' }}
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  )
}
