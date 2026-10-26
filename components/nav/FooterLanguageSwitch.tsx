'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import type { Locale } from '@/lib/i18n'

/** The footer's English / Arabic switch: the footer's only interactive part. */
export default function FooterLanguageSwitch({ language }: { language: Locale }) {
  const { setLanguage } = useLanguage()
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-faint">🌐</span>
      <button
        onClick={() => setLanguage('en')}
        className={`transition-colors duration-150 ${
          language === 'en' ? 'text-soft' : 'hover:text-muted'
        }`}
      >
        English
      </button>
      <span className="text-faint">·</span>
      <button
        onClick={() => setLanguage('ar')}
        className={`transition-colors duration-150 ${
          language === 'ar' ? 'text-soft' : 'hover:text-muted'
        }`}
        dir="rtl"
      >
        العربية
      </button>
    </div>
  )
}
