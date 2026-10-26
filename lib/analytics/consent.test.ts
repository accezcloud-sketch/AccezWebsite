import vm from 'node:vm'
import { describe, expect, it } from 'vitest'
import { CONSENT_DEFAULT_SCRIPT, CONSENT_STORAGE_KEY, consentUpdate, cookieDomains, isAnalyticsCookie, isConsentChoice } from './consent'

/** Runs the head script in a bare window with the given stored choice; returns the gtag calls. */
function runDefaults(stored: string | null): unknown[][] {
  // The context's global object stands in for `window`, so bare `gtag` resolves as in a browser.
  const window: Record<string, unknown> = { localStorage: { getItem: (k: string) => (k === CONSENT_STORAGE_KEY ? stored : null) } }
  window.window = window
  vm.runInContext(CONSENT_DEFAULT_SCRIPT, vm.createContext(window))
  return (window.dataLayer as IArguments[]).map((a) => Array.from(a))
}

describe('consent mode defaults', () => {
  it('denies every signal before anything else runs', () => {
    const calls = runDefaults(null)
    expect(calls[0][0]).toBe('consent')
    expect(calls[0][1]).toBe('default')
    expect(calls[0][2]).toMatchObject({ ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' })
    expect(calls.some((c) => c[1] === 'update')).toBe(false)
  })

  it('applies a stored Accept right after the defaults, analytics only', () => {
    const calls = runDefaults('granted')
    const update = calls.find((c) => c[0] === 'consent' && c[1] === 'update')
    expect(update?.[2]).toEqual({ analytics_storage: 'granted' })
  })

  it('keeps everything denied after a stored Decline', () => {
    expect(runDefaults('denied').some((c) => c[1] === 'update')).toBe(false)
  })
})

describe('consent helpers', () => {
  it('recognises a stored choice', () => {
    expect(isConsentChoice('granted')).toBe(true)
    expect(isConsentChoice('yes')).toBe(false)
    expect(isConsentChoice(null)).toBe(false)
  })

  it('updates only analytics on a choice', () => {
    expect(consentUpdate('denied')).toEqual({ analytics_storage: 'denied' })
  })

  it('finds the Google Analytics cookies to remove on Decline', () => {
    expect(['_ga', '_ga_GBPD3L2X7T', '_gid', '_gat'].every(isAnalyticsCookie)).toBe(true)
    expect(['accez-theme', '_gallery', 'ga'].some(isAnalyticsCookie)).toBe(false)
  })

  it('lists the host and its parent domains', () => {
    expect(cookieDomains('www.accez.cloud')).toEqual(['www.accez.cloud', '.accez.cloud'])
    expect(cookieDomains('localhost')).toEqual(['localhost'])
  })
})
