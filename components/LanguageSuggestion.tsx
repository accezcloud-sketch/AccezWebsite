'use client'

import { useLanguage } from '@/contexts/LanguageContext'

/**
 * A small offer to read the site in Arabic, shown to visitors from an
 * Arabic-speaking country who have not chosen a language. It replaces the
 * old automatic redirect: the visitor stays on the page they asked for.
 */
export default function LanguageSuggestion() {
  const { suggestedLanguage, setLanguage, dismissSuggestion } = useLanguage()
  if (suggestedLanguage !== 'ar') return null

  return (
    <div
      role="region"
      aria-label="اللغة العربية"
      lang="ar"
      dir="rtl"
      // Bottom-left, clear of the chat bubble on the right; solid so it reads over any section.
      // .lang-offer lifts the cookie banner above it (globals.css).
      className="lang-offer fixed bottom-4 left-4 right-24 sm:right-auto z-[9998] flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg"
      style={{ background: 'var(--panel-solid)', borderColor: 'var(--border-hi)' }}
    >
      <span className="min-w-0 flex-1 text-[13px] leading-snug text-soft sm:text-sm">يتوفر هذا الموقع باللغة العربية</span>
      <button type="button" onClick={() => setLanguage('ar')} className="ui-btn ui-btn-primary shrink-0 whitespace-nowrap" style={{ padding: '.45rem .9rem', fontSize: 13 }}>
        عرض بالعربية
      </button>
      <button type="button" onClick={dismissSuggestion} aria-label="إغلاق" className="shrink-0 p-1 text-muted hover:text-strong">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
