import { describe, expect, it } from 'vitest'
import { otherTheme, resolveTheme, THEME_INIT_SCRIPT, THEME_STORAGE_KEY } from './theme'

describe('resolveTheme', () => {
  it('uses a stored choice first', () => {
    expect(resolveTheme('light', false)).toBe('light')
    expect(resolveTheme('dark', true)).toBe('dark')
  })

  it('falls back to the device setting, then dark', () => {
    expect(resolveTheme(null, true)).toBe('light')
    expect(resolveTheme(null, false)).toBe('dark')
    expect(resolveTheme(null, null)).toBe('dark')
  })

  it('ignores a stored value that is not a theme', () => {
    expect(resolveTheme('blue', true)).toBe('light')
    expect(resolveTheme('<script>', null)).toBe('dark')
  })

  it('toggles', () => {
    expect(otherTheme('dark')).toBe('light')
    expect(otherTheme('light')).toBe('dark')
  })
})

describe('THEME_INIT_SCRIPT', () => {
  it('follows the same rules as resolveTheme', () => {
    const run = (stored: string | null, prefersLight: boolean) => {
      const attrs: Record<string, string> = {}
      const window = { matchMedia: () => ({ matches: prefersLight }) }
      const localStorage = { getItem: (k: string) => (k === THEME_STORAGE_KEY ? stored : null) }
      const document = { documentElement: { setAttribute: (k: string, v: string) => (attrs[k] = v) } }
      new Function('window', 'localStorage', 'document', THEME_INIT_SCRIPT)(window, localStorage, document)
      return attrs['data-theme']
    }
    expect(run('light', false)).toBe(resolveTheme('light', false))
    expect(run(null, true)).toBe(resolveTheme(null, true))
    expect(run(null, false)).toBe(resolveTheme(null, false))
    expect(run('junk', true)).toBe(resolveTheme('junk', true))
  })
})
