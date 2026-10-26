'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  consentUpdate,
  cookieDomains,
  isAnalyticsCookie,
  isConsentChoice,
  type ConsentChoice,
} from '@/lib/analytics/consent'
import { localeHref, type Locale } from '@/lib/i18n'

const COPY: Record<Locale, { label: string; title: string; body: string; privacy: string; accept: string; decline: string }> = {
  en: {
    label: 'Cookie consent',
    title: 'Cookies on Accez',
    body: 'We use analytics cookies to understand how visitors use this site and to improve it. They are set only if you accept.',
    privacy: 'Privacy Policy',
    accept: 'Accept',
    decline: 'Decline',
  },
  ar: {
    label: 'الموافقة على ملفات تعريف الارتباط',
    title: 'ملفات تعريف الارتباط في أكسيز',
    body: 'نستخدم ملفات تعريف ارتباط تحليلية لنفهم كيف يستخدم الزوار هذا الموقع ولنحسّنه، ولا تُحفظ إلا إذا وافقت.',
    privacy: 'سياسة الخصوصية',
    accept: 'قبول',
    decline: 'رفض',
  },
}

function readChoice(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY)
    return isConsentChoice(value) ? value : null
  } catch {
    return null
  }
}

/** Removes Google Analytics cookies already set (a visitor who accepted, then declined). */
function clearAnalyticsCookies() {
  const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(isAnalyticsCookie)
  for (const name of names) {
    document.cookie = `${name}=; Max-Age=0; path=/`
    for (const domain of cookieDomains(location.hostname)) document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`
  }
}

/**
 * The cookie consent banner. Shown until the visitor accepts or declines,
 * and again from the footer's "Cookie settings". Renders nothing on the
 * server and on the first client render (the choice lives in the browser),
 * so the static HTML hydrates cleanly.
 *
 * Placed by .consent-banner in globals.css, clear of the chat bubble (bottom
 * right) and the Arabic language offer (bottom left).
 */
export default function ConsentBanner() {
  const pathname = usePathname()
  const locale: Locale = pathname === '/ar' || pathname?.startsWith('/ar/') ? 'ar' : 'en'
  const c = COPY[locale]
  const [open, setOpen] = useState(false)
  const titleRef = useRef<HTMLParagraphElement>(null)
  // Whether the visitor asked for the banner (then it takes focus); not on a first visit.
  const requested = useRef(false)

  useEffect(() => {
    if (readChoice() === null) setOpen(true)
    const reopen = () => {
      requested.current = true
      setOpen(true)
    }
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
  }, [])

  useEffect(() => {
    if (open && requested.current) titleRef.current?.focus()
  }, [open])

  const choose = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice)
    } catch {
      // Private mode: the choice holds for this page view only.
    }
    window.gtag?.('consent', 'update', consentUpdate(choice))
    if (choice === 'denied') clearAnalyticsCookies()
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }))
    requested.current = false
    setOpen(false)
  }

  if (!open) return null

  return (
    <section
      role="region"
      aria-label={c.label}
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="consent-banner rounded-xl border p-4 shadow-lg"
      style={{ background: 'var(--panel-solid)', borderColor: 'var(--border-hi)' }}
    >
      <p ref={titleRef} tabIndex={-1} className="text-strong font-semibold mb-1 outline-none" style={{ fontSize: 14.5 }}>
        {c.title}
      </p>
      <p className="text-soft leading-snug" style={{ fontSize: 13.5 }}>
        {c.body}{' '}
        <a href={localeHref('/privacy', locale)} className="text-accent-hi underline underline-offset-2 hover:text-strong">
          {c.privacy}
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => choose('granted')} className="ui-btn ui-btn-primary flex-1" style={{ padding: '.55rem 1rem', fontSize: 14 }}>
          {c.accept}
        </button>
        <button type="button" onClick={() => choose('denied')} className="ui-btn ui-btn-glass flex-1" style={{ padding: '.55rem 1rem', fontSize: 14 }}>
          {c.decline}
        </button>
      </div>
    </section>
  )
}
