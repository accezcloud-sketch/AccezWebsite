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
        localStorage.setItem('language', next)
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

    const detectLanguage = async () => {
      let saved: string | null = null
      try {
        saved = localStorage.getItem('language')
      } catch {
        saved = null
      }

      // An explicit choice always wins — never override the visitor.
      if (saved === 'en') return
      if (saved === 'ar') {
        router.replace(counterpartPath(pathname || '/', 'ar'))
        return
      }

      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (ARABIC_COUNTRIES.includes(data.country_code)) {
          // Send Gulf visitors to the real Arabic URL instead of swapping the
          // content underneath them. Googlebot crawls from US IPs so it is not
          // redirected, and continues to index the English page at this URL.
          router.replace(counterpartPath(pathname || '/', 'ar'))
        }
      } catch {
        // Geolocation unavailable — stay on English.
      }
    }

    detectLanguage()
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
