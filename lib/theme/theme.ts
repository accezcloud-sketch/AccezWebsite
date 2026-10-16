/**
 * Light / dark theme: the rules for which theme a visitor sees.
 *
 * The choice is stored as one value ('light' or 'dark') in localStorage
 * under THEME_STORAGE_KEY: no personal data, never sent anywhere. Without a
 * stored choice, the visitor's device setting decides.
 */
export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'accez-theme'
export const DEFAULT_THEME: Theme = 'dark'

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

/** Stored choice first, then the device setting, then the site default. */
export function resolveTheme(stored: unknown, prefersLight: boolean | null): Theme {
  if (isTheme(stored)) return stored
  if (prefersLight === true) return 'light'
  if (prefersLight === false) return 'dark'
  return DEFAULT_THEME
}

export const otherTheme = (theme: Theme): Theme => (theme === 'dark' ? 'light' : 'dark')

/**
 * Inline script for <head>: applies the theme before first paint so a page
 * never flashes the wrong theme. Mirrors resolveTheme(); kept dependency-free
 * because it runs before any bundle loads.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=s==='light'||s==='dark'?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'${DEFAULT_THEME}');document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}')}})()`
