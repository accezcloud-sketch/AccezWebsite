/**
 * Where a visitor came from, saved with a "Book a demo" request so each
 * Salesforce Lead shows the channel that brought it.
 *
 * The first page of a visit is remembered for the browser session: its
 * campaign labels (utm_source, utm_medium, utm_campaign, utm_term,
 * utm_content), the other site that linked to it, and the landing page. It is
 * appended to the form's description when the form is sent. No cookie, no
 * personal data: only labels from the link the visitor clicked.
 */
export const CAMPAIGN_STORAGE_KEY = 'accez-campaign'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export interface Campaign {
  utm: Partial<Record<(typeof UTM_KEYS)[number], string>>
  /** The other website that linked here, if any (hostname only). */
  referrer?: string
  /** The first page of the visit, without query string. */
  landing: string
}

/** The campaign of a page visit, from its URL search string, referrer and path. */
export function readCampaign(search: string, referrer: string, path: string, ownHost: string): Campaign {
  const params = new URLSearchParams(search)
  const utm: Campaign['utm'] = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim()
    if (value) utm[key] = value.slice(0, 100)
  }
  let ref: string | undefined
  try {
    const host = referrer ? new URL(referrer).hostname : ''
    if (host && host !== ownHost) ref = host
  } catch {
    ref = undefined
  }
  return { utm, referrer: ref, landing: path }
}

/** One line for the Lead's description, or '' when there is nothing to report. */
export function campaignNote(c: Campaign | null): string {
  if (!c) return ''
  const parts = Object.entries(c.utm).map(([k, v]) => `${k.replace('utm_', '')}=${v}`)
  if (c.referrer) parts.push(`referrer=${c.referrer}`)
  parts.push(`landing page=${c.landing}`)
  return `[Website visit] ${parts.join(', ')}`
}

/** Remembers the first page of this browser session (first touch wins). */
export function rememberCampaign(): void {
  try {
    if (sessionStorage.getItem(CAMPAIGN_STORAGE_KEY)) return
    const c = readCampaign(window.location.search, document.referrer, window.location.pathname, window.location.hostname)
    sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(c))
  } catch {
    // Storage disabled: the form is still sent, just without the note.
  }
}

/** The remembered campaign of this session, if any. */
export function storedCampaign(): Campaign | null {
  try {
    const raw = sessionStorage.getItem(CAMPAIGN_STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Campaign) : null
  } catch {
    return null
  }
}
