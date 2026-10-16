'use client'

import { useEffect, useState } from 'react'
import { otherTheme, resolveTheme, THEME_STORAGE_KEY, type Theme } from '@/lib/theme/theme'

const LABEL: Record<'en' | 'ar', Record<Theme, string>> = {
  en: { dark: 'Switch to light theme', light: 'Switch to dark theme' },
  ar: { dark: 'التبديل إلى الوضع الفاتح', light: 'التبديل إلى الوضع الداكن' },
}

function readStored(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY)
  } catch {
    return null
  }
}

/**
 * Switches between the light and dark themes. The theme is applied to <html>
 * before first paint by THEME_INIT_SCRIPT; this button only changes it and
 * remembers the choice. Until a visitor chooses, the device setting is
 * followed, including if it changes while the page is open.
 */
export default function ThemeToggle({ language = 'en', className = '' }: { language?: 'en' | 'ar'; className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: light)')
    setTheme(resolveTheme(readStored(), media ? media.matches : null))

    if (!media) return
    const onChange = (e: MediaQueryListEvent) => {
      if (readStored()) return // an explicit choice wins over the device
      const next = e.matches ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      setTheme(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = otherTheme(theme ?? (document.documentElement.getAttribute('data-theme') as Theme) ?? 'dark')
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
      // Storage blocked: the switch still works for this page.
    }
    setTheme(next)
  }

  // Before hydration the theme is unknown to React; render a neutral icon box
  // of the same size so the header doesn't shift.
  const label = LABEL[language][theme ?? 'dark']

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${className}`}
      style={{ border: '1px solid var(--border-hi)', color: 'var(--text-muted)', background: 'var(--surface)' }}
    >
      {/* Sun shown in dark theme (go light), moon in light theme (go dark). */}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === 'light' ? (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  )
}
