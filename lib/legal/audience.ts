/**
 * The structure of each legal document: its sections in order, and which
 * audience each one speaks to.
 *
 * Accez is one platform with several solutions, and every legal document is
 * published once per solution (/terms/property-managers/,
 * /privacy/service-providers/, ...). Each version is rendered from the same
 * source with the other audience's sections and <Only> passages left out, so a
 * reader only ever sees the clauses that apply to them.
 *
 * Why a filter rather than separate documents: only a few sections are
 * genuinely single-audience. Copying ninety per cent of the wording into a
 * second file per language is precisely how translations drift apart.
 *
 * Section ids are identical in the English and Arabic files (the prebuild
 * alignment check enforces it), so one list drives both languages. The tests
 * check each list matches its files, in order.
 */

/** Who a clause speaks to. 'all' is content that applies to every audience. */
export type Audience = 'pm' | 'sp' | 'all'

/** One version of a per-audience document. */
export type AudienceView = 'pm' | 'sp'

export interface LegalSection {
  id: string
  /** Absent means the section applies to everyone. */
  for?: AudienceView
}

const all = (...ids: string[]): LegalSection[] => ids.map((id) => ({ id }))

export const TERMS_SECTIONS: LegalSection[] = [
  ...all('about', 'venue', 'eligibility', 'subscriptions', 'payments', 'fees', 'payouts', 'tax', 'refunds'),
  { id: 'providers', for: 'sp' },
  ...all(
    'customer-content', 'acceptable-use', 'integrations', 'data', 'ip', 'availability',
    'warranties', 'liability', 'indemnity', 'suspension', 'law', 'general', 'contact',
  ),
]
// Deliberately NOT tagged, and why:
//   payouts          - providers are paid through the platform too.
//   customer-content - providers upload listings and hold customer data as well.
// Both carry <Only> passages inside instead.

export const REFUND_SECTIONS: LegalSection[] = [
  { id: 'overview' },
  { id: 'reservations', for: 'pm' },
  { id: 'marketplace', for: 'sp' },
  ...all('deposits', 'subscriptions', 'fees-on-refund', 'how-to-request', 'timing', 'chargebacks'),
  { id: 'sales', for: 'pm' },
  ...all('exceptions', 'contact'),
]

// 'customers' (If your data was uploaded by a business) speaks to tenants,
// guests AND a provider's own customers, so nothing here is single-audience.
export const PRIVACY_SECTIONS: LegalSection[] = all(
  'scope', 'what-we-collect', 'sources', 'why', 'mandatory', 'sharing', 'transfers', 'storage',
  'security', 'rights', 'consent', 'cookies', 'breach', 'capacity', 'automated', 'customers',
  'complaints', 'changes', 'contact',
)

/**
 * Whether content for `audience` belongs in the version being rendered.
 * `view` is undefined for a shared document, which shows everything.
 */
export function appliesTo(audience: Audience, view: AudienceView | undefined): boolean {
  return view === undefined || audience === 'all' || audience === view
}

/**
 * Section numbers for one version: sections are numbered in order, skipping
 * the ones this version leaves out, so a version never has gaps (9, 11, ...).
 */
export function sectionNumbers(sections: LegalSection[], view: AudienceView | undefined): Record<string, number> {
  const numbers: Record<string, number> = {}
  let n = 0
  for (const s of sections) if (appliesTo(s.for ?? 'all', view)) numbers[s.id] = ++n
  return numbers
}

/** A section number as written in the page's language (Arabic-Indic digits in Arabic). */
export function formatSectionNumber(n: number, locale: 'en' | 'ar'): string {
  return locale === 'ar' ? n.toLocaleString('ar-SA-u-nu-arab') : String(n)
}
