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
import { createKeywordClassifier, type ClassifiablePost } from './keywordClassifier'

export type ProductPageKey = 'owners' | 'sales' | 'hotels' | 'modules'

export type ProductMatchInput = ClassifiablePost

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

/** A page needs at least this score to beat the general modules overview. */
const classifier = createKeywordClassifier(SIGNALS, { minScore: 4 })

/** Score for each candidate page; exported for tests and for explaining a choice. */
export function productScores(post: ProductMatchInput): Record<Exclude<ProductPageKey, 'modules'>, number> {
  return classifier.scores(post)
}

/** The product page this post should lead to. Ties and weak signals fall back to 'modules'. */
export function matchProductPage(post: ProductMatchInput): ProductPageKey {
  return classifier.classify(post) ?? 'modules'
}
