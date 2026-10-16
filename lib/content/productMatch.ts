/**
 * Which product page should a blog post send its reader to?
 *
 * Pure keyword rules over the fields that say what a post is about. A post
 * about owner statements leads to the Owners page, one about channels and
 * guests to Hotels, one about developers and off-plan sales to Sales, and
 * anything general to the all-modules overview.
 *
 * Deliberately simple and explainable: the rules are a reviewed list, not a
 * model, so anyone can see why a post points where it does and adjust it.
 */

export type ProductPageKey = 'owners' | 'sales' | 'hotels' | 'modules'

export interface ProductMatchInput {
  title: string
  excerpt: string
  tags: string[]
  primaryKeyword?: string
}

/** Phrases that signal each page. Matched on word boundaries, case-insensitive. */
const SIGNALS: Record<Exclude<ProductPageKey, 'modules'>, string[]> = {
  owners: [
    'owner', 'owners', 'landlord', 'landlords', 'payout', 'payouts', 'owner statement', 'owner statements',
    'owner reporting', 'owner report', 'owner relations', 'owner onboarding', 'management contract',
    'management contracts', 'trust accounting',
  ],
  sales: [
    'developer', 'developers', 'off-plan', 'off plan', 'property sales', 'unit sales', 'sales pipeline',
    'buyer', 'buyers', 'broker', 'brokers', 'real estate agency', 'sales agent', 'sales agents',
  ],
  hotels: [
    'hotel', 'hotels', 'serviced apartment', 'serviced apartments', 'short-term', 'short term', 'vacation rental',
    'vacation rentals', 'holiday home', 'airbnb', 'booking.com', 'ota', 'otas', 'channel manager', 'channels',
    'channel management', 'double booking', 'double-booking', 'guest', 'guests', 'check-in', 'check-out',
    'turnover', 'turnovers', 'occupancy', 'revpar', 'nightly', 'gap night', 'gap nights', 'length of stay',
    'direct booking', 'direct bookings', 'metasearch', 'upsell', 'add-ons', 'cancellation', 'cancellations',
    'corporate housing', 'str', 'bookings', 'booking management', 'dynamic pricing', 'rate shopping', 'comp set',
    'comp sets',
  ],
}

/** How much each field says about the topic. */
const FIELD_WEIGHTS = { title: 3, primaryKeyword: 3, tags: 2, excerpt: 1 } as const

/** A page needs at least this score to beat the general modules overview. */
const MIN_SCORE = 4

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const PATTERNS = Object.fromEntries(
  Object.entries(SIGNALS).map(([key, phrases]) => [
    key,
    phrases.map((p) => new RegExp(`(?<![\\p{L}\\p{N}])${escape(p)}(?![\\p{L}\\p{N}])`, 'giu')),
  ]),
) as Record<Exclude<ProductPageKey, 'modules'>, RegExp[]>

function countMatches(text: string | undefined, patterns: RegExp[]): number {
  if (!text) return 0
  return patterns.reduce((n, re) => n + (text.match(re)?.length ?? 0), 0)
}

/** Score for each candidate page; exported for tests and for explaining a choice. */
export function productScores(post: ProductMatchInput): Record<Exclude<ProductPageKey, 'modules'>, number> {
  const score = (patterns: RegExp[]) =>
    countMatches(post.title, patterns) * FIELD_WEIGHTS.title +
    countMatches(post.primaryKeyword, patterns) * FIELD_WEIGHTS.primaryKeyword +
    post.tags.reduce((n, tag) => n + countMatches(tag, patterns), 0) * FIELD_WEIGHTS.tags +
    countMatches(post.excerpt, patterns) * FIELD_WEIGHTS.excerpt

  return {
    owners: score(PATTERNS.owners),
    sales: score(PATTERNS.sales),
    hotels: score(PATTERNS.hotels),
  }
}

/** The product page this post should lead to. Ties and weak signals fall back to 'modules'. */
export function matchProductPage(post: ProductMatchInput): ProductPageKey {
  const ranked = Object.entries(productScores(post)).sort((a, b) => b[1] - a[1])
  const [best, runnerUp] = ranked
  if (best[1] < MIN_SCORE || best[1] === runnerUp[1]) return 'modules'
  return best[0] as ProductPageKey
}
