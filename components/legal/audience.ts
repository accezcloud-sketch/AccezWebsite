/**
 * Which audience each section of a legal document speaks to.
 *
 * Keyed by the section `id`, which is identical in the English and Arabic
 * versions of every document — the prebuild alignment check enforces that — so
 * one map drives both languages and the two can never disagree about who a
 * clause applies to.
 *
 * Why a filter rather than six separate documents: measuring the text shows
 * only two of the twenty-three Terms sections are genuinely single-audience.
 * Publishing a property-manager Terms and a service-provider Terms would
 * duplicate roughly ninety per cent of the wording into two files per
 * language, which is precisely how translations drift out of sync. Tagging is
 * the same clarity without the duplication.
 *
 * Sections not listed here are 'all' — that is the safe default, because a
 * clause wrongly tagged as someone else's problem is worse than an untagged one.
 */
export type Audience = 'pm' | 'sp' | 'all'

/** Property-manager-only and provider-only sections, by document. */
export const TERMS_AUDIENCE: Record<string, Audience> = {
  providers: 'sp',
  'customer-content': 'pm',
  payouts: 'pm',
}

export const REFUND_AUDIENCE: Record<string, Audience> = {
  reservations: 'pm',
  deposits: 'pm',
  sales: 'pm',
  marketplace: 'sp',
}

export const PRIVACY_AUDIENCE: Record<string, Audience> = {
  customers: 'pm',
}
