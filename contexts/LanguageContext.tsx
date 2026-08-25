'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { translations, Language, Translations } from '@/translations'
import { counterpartPath } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const ARABIC_COUNTRIES = ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'EG', 'JO', 'LB', 'IQ']

/**
 * Storage key for the visitor's explicit language choice.
 *
 * Deliberately NOT the old 'language' key. The previous implementation wrote
 * that key on every language change, including ones chosen automatically by IP
 * detection — so a visitor who once loaded the site from a Gulf IP had 'ar'
 * saved permanently, and would be sent to Arabic from anywhere in the world
 * forever after. Using a new key makes those stale automatic values inert.
 *
 * Only an explicit click on the language toggle writes this key now.
 */
const LANG_KEY = 'accez.lang.v2'
const LEGACY_LANG_KEY = 'language'

/**
 * Visitor country, read from Cloudflare's trace endpoint on our OWN domain.
 *
 * This replaced ipapi.co, which now sits behind a Cloudflare bot challenge and
 * returns 403 to browser fetches — so IP detection had silently stopped working
 * entirely. /cdn-cgi/trace is same-origin (the site is already behind
 * Cloudflare), has no rate limit, needs no API key, and cannot be blocked by an
 * ad blocker the way a third-party geo API can.
 */
async function detectCountry(): Promise<string | null> {
  try {
    const res = await fetch('/cdn-cgi/trace', { cache: 'no-store' })
    if (!res.ok) return null
    const text = await res.text()
    const match = text.match(/^loc=([A-Z]{2})$/m)
    return match ? match[1] : null
  } catch {
    return null
  }
}

interface LanguageProviderProps {
  children: ReactNode
  /**
   * Set by a route segment (see app/ar/layout.tsx) to pin that whole subtree to
   * one language.
   *
   * When present, the language is decided by the URL rather than by React state,
   * which is the entire point of the /ar routes: the server-rendered HTML is
   * Arabic, so Google and non-JavaScript AI crawlers can actually read it.
   */
  routeLanguage?: Language
}

export function LanguageProvider({ children, routeLanguage }: LanguageProviderProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Seeded from the route when the route pins a language, so the very first
  // server-rendered paint is already in the right language — no flash, and no
  // dependency on JavaScript for the content to be correct.
  const [language, setLanguageState] = useState<Language>(routeLanguage ?? 'en')

  /**
   * Switching language is now a NAVIGATION, not a state flip.
   *
   * Previously this swapped the content at the same URL, which meant one URL
   * served two languages and Google only ever indexed the English one. Now
   * /about/ and /ar/about/ are separate documents and the toggle moves between
   * them, which is what Google's multilingual guidance asks for.
   */
  const setLanguage = useCallback(
    (next: Language) => {
      if (next === language) return
      const target = counterpartPath(pathname || '/', next)
      setLanguageState(next)
      try {
        localStorage.setItem(LANG_KEY, next)
      } catch {
        // Private mode / storage disabled — navigation still works.
      }
      router.push(target)
    },
    [language, pathname, router]
  )

  // Keep state in sync when the route itself changes language (back button,
  // internal link into the other locale).
  useEffect(() => {
    if (routeLanguage && routeLanguage !== language) {
      setLanguageState(routeLanguage)
    }
  }, [routeLanguage, language])

  useEffect(() => {
    // Only the unpinned (English) routes auto-detect. On a pinned /ar route the
    // URL is the source of truth and must not be second-guessed.
    if (routeLanguage) return

    let cancelled = false

    const detectLanguage = async () => {
      let saved: string | null = null
      try {
        // Clear the legacy key on sight. It was written automatically by the old
        // IP detection, so it does not represent a real choice by the visitor
        // and must not be allowed to pin them to a language.
        if (localStorage.getItem(LEGACY_LANG_KEY) !== null) {
          localStorage.removeItem(LEGACY_LANG_KEY)
        }
        saved = localStorage.getItem(LANG_KEY)
      } catch {
        saved = null
      }

      const here = pathname || '/'

      /**
       * Never redirect to the URL we are already on.
       *
       * Without this guard the site loops. A URL like /ar/terms/ that has no
       * Arabic route renders the ROOT not-found page, which sits outside
       * app/ar/layout.tsx — so routeLanguage is undefined and this detection
       * runs. It reads the saved 'ar' preference, computes the Arabic
       * counterpart of /ar/terms/, which is /ar/terms/ itself, and replaces the
       * URL with the same URL. That 404s again, the effect runs again, and the
       * page refreshes forever.
       */
      const go = (target: string) => {
        if (target !== here) router.replace(target)
      }

      // An explicit choice always wins — never override the visitor.
      if (saved === 'en') return
      if (saved === 'ar') {
        go(counterpartPath(here, 'ar'))
        return
      }

      // No stored choice: fall back to country. Only a positively identified
      // Arabic-speaking country redirects; anything else (including a failed
      // lookup) stays on English, so a US visitor can never land on Arabic.
      const country = await detectCountry()
      if (cancelled || !country) return
      if (ARABIC_COUNTRIES.includes(country)) {
        // Send Gulf visitors to the real Arabic URL instead of swapping the
        // content underneath them. Googlebot crawls from US IPs so it is not
        // redirected, and keeps indexing the English page at this URL.
        go(counterpartPath(here, 'ar'))
      }
    }

    detectLanguage()
    return () => {
      cancelled = true
    }
  }, [routeLanguage, pathname, router])

  useEffect(() => {
    // Reflect the active language on <html> for assistive technology and for
    // CSS that keys off [dir]. Note this is a correctness/accessibility measure,
    // not an SEO one — Google states it does not read the lang attribute.
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar',
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
