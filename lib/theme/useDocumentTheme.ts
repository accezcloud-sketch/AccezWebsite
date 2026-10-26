'use client'

import { useEffect, useState } from 'react'
import { isTheme, type Theme } from './theme'

/** The theme currently applied to the page (data-theme on <html>), or null before mount. */
function readDocumentTheme(): Theme | null {
  const value = document.documentElement.getAttribute('data-theme')
  return isTheme(value) ? value : null
}

/**
 * Follows the theme on <html>, which THEME_INIT_SCRIPT sets before first paint
 * and the theme switch updates. Null during the server render and first client
 * render, so markup that depends on it never mismatches on hydration.
 */
export function useDocumentTheme(): Theme | null {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(readDocumentTheme())
    const observer = new MutationObserver(() => setTheme(readDocumentTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return theme
}
