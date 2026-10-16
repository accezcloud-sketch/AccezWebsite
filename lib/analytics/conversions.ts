/**
 * Conversion events: names, how a click or a thank-you visit maps to one,
 * and how events are sent.
 *
 * Events always go to `window.dataLayer` (what Google Tag Manager reads, and
 * where ad pixels configured in GTM pick them up). They are also sent with
 * `gtag()` straight to GA4, but only when no GTM container is configured; with
 * GTM present, GA4 should be fed from GTM, otherwise each event would count
 * twice.
 */
import { PORTAL_SIGN_UP, PROVIDER_SIGN_UP } from '@/lib/links'

export type ConversionEvent =
  | 'generate_lead' // sales / demo form submitted
  | 'chatbot_lead' // lead captured by the chat assistant
  | 'support_request' // support ticket submitted
  | 'book_demo_click'
  | 'sign_up_click'
  | 'whatsapp_click'

export type EventParams = Record<string, string | number | boolean | undefined>

/** Which form sent the visitor to the thank-you page (its `?form=` value). */
export type FormKind = 'sales' | 'support'

/** The event a link click represents, or null for ordinary navigation. */
export function classifyClick(href: string): { event: ConversionEvent; params: EventParams } | null {
  let url: URL
  try {
    url = new URL(href, 'https://www.accez.cloud')
  } catch {
    return null
  }
  const clean = `${url.origin}${url.pathname}`.replace(/\/+$/, '')

  if (clean === PORTAL_SIGN_UP.replace(/\/+$/, '')) return { event: 'sign_up_click', params: { audience: 'property_manager' } }
  if (clean === PROVIDER_SIGN_UP.replace(/\/+$/, '')) return { event: 'sign_up_click', params: { audience: 'service_provider' } }
  if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') {
    // A share link carries ?text=; a contact link does not.
    return url.searchParams.has('text') ? null : { event: 'whatsapp_click', params: {} }
  }
  const isOwnSite = url.hostname === 'www.accez.cloud' || url.hostname === 'accez.cloud'
  if (isOwnSite && url.hash === '#contact' && /^\/(ar\/?)?$/.test(url.pathname)) return { event: 'book_demo_click', params: {} }
  return null
}

/** The conversion a thank-you page visit confirms, from its query string. */
export function thankYouEvent(search: string): { event: ConversionEvent; params: EventParams } | null {
  const form = new URLSearchParams(search).get('form')
  if (form === 'sales') return { event: 'generate_lead', params: { form: 'sales' } }
  if (form === 'support') return { event: 'support_request', params: { form: 'support' } }
  return null
}

/** Absolute URL a form should return to after submission. */
export function thankYouUrl(form: FormKind, locale: 'en' | 'ar'): string {
  return `https://www.accez.cloud${locale === 'ar' ? '/ar' : ''}/thankyou/?form=${form}`
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GTM_CONFIGURED = /^GTM-(?!X+$)[A-Z0-9]+$/i.test(process.env.NEXT_PUBLIC_GTM_ID ?? '')

export function trackEvent(event: ConversionEvent, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
  if (!GTM_CONFIGURED && typeof window.gtag === 'function') window.gtag('event', event, params)
}
