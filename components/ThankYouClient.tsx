'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ThankYou() {
  const { language } = useLanguage()

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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
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
            <span className="text-2xl font-bold text-gray-900">Accez.cloud</span>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-600 mb-8">{t.message}</p>

          {/* Back Button */}
          <Link
            href="/"
            prefetch={false}
            className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </main>
  )
}
