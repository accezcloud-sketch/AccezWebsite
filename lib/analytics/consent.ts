/**
 * Cookie consent (Saudi PDPL) with Google Consent Mode v2.
 *
 * Every Google consent signal starts denied, before any gtag config runs, so
 * Google Analytics sets no cookies until the visitor accepts. The choice is
 * one value ('granted' or 'denied') in localStorage under CONSENT_STORAGE_KEY:
 * no personal data, never sent anywhere.
 *
 * Accepting grants analytics only (ANALYTICS_SIGNALS); the advertising
 * signals stay denied because the site runs no advertising tags.
 */
export type ConsentChoice = 'granted' | 'denied'

export const CONSENT_STORAGE_KEY = 'accez-consent'

/** Window event that reopens the consent banner (the footer's "Cookie settings"). */
export const CONSENT_OPEN_EVENT = 'accez:consent-open'

/** Window event fired after a choice is made; `detail` is the ConsentChoice. */
export const CONSENT_CHANGE_EVENT = 'accez:consent-change'

/** Consent Mode v2 signals, all denied until the visitor chooses. */
export const CONSENT_DEFAULTS = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
} as const

/** The signals an Accept grants. */
export const ANALYTICS_SIGNALS = ['analytics_storage'] as const

export function isConsentChoice(value: unknown): value is ConsentChoice {
  return value === 'granted' || value === 'denied'
}

/** The Consent Mode update for a choice. */
export function consentUpdate(choice: ConsentChoice): Record<(typeof ANALYTICS_SIGNALS)[number], ConsentChoice> {
  return Object.fromEntries(ANALYTICS_SIGNALS.map((s) => [s, choice])) as Record<(typeof ANALYTICS_SIGNALS)[number], ConsentChoice>
}

/**
 * Inline script for <head>, before any analytics script: sets every signal
 * to denied, then applies a stored Accept. Dependency-free because it runs
 * before any bundle loads.
 */
export const CONSENT_DEFAULT_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};gtag('consent','default',${JSON.stringify({ ...CONSENT_DEFAULTS, wait_for_update: 500 })});gtag('set','ads_data_redaction',true);try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted')gtag('consent','update',${JSON.stringify(consentUpdate('granted'))})}catch(e){}})()`

/** Google Analytics cookie names (_ga, _ga_<id>), removed when a visitor declines. */
export function isAnalyticsCookie(name: string): boolean {
  return /^_ga(_|$)/.test(name) || name === '_gid' || name === '_gat' || /^_gat_/.test(name)
}

/** The domains a cookie may have been set on, from the page's host (host, then each parent). */
export function cookieDomains(hostname: string): string[] {
  const parts = hostname.split('.')
  const domains = [hostname]
  for (let i = 1; i < parts.length - 1; i++) domains.push(`.${parts.slice(i).join('.')}`)
  return domains
}
