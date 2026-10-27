/**
 * Which solution's readers a blog post is for: property managers (almost
 * every post today) or service providers (barbers, salons, spas, coaches).
 *
 * Pages only show posts for their own audience, so a barber never sees a
 * post about leases. A post's frontmatter may set `audience` explicitly;
 * otherwise reviewed phrase lists decide, and anything without a clear
 * service provider signal is a property management post.
 */
import { createKeywordClassifier, type ClassifiablePost } from './keywordClassifier'

export type PostAudience = 'property-managers' | 'service-providers'

const AUDIENCES = new Set<string>(['property-managers', 'service-providers'])

const classifier = createKeywordClassifier(
  {
    'service-providers': [
      'service provider', 'service providers', 'barber', 'barbers', 'barbershop', 'barbershops', 'salon', 'salons',
      'spa', 'spas', 'wellness', 'beauty', 'hair', 'nail', 'nails', 'massage', 'coach', 'coaches', 'coaching',
      'personal trainer', 'personal trainers', 'fitness', 'appointment', 'appointments', 'no-show', 'no-shows',
      'walk-in', 'walk-ins', 'gift card', 'gift cards', 'marketplace listing', 'stylist', 'stylists',
    ],
  },
  { minScore: 3 },
)

export interface AudienceInput extends ClassifiablePost {
  /** Editor's explicit audience from frontmatter. */
  audience?: string
}

export function postAudience(post: AudienceInput): PostAudience {
  if (post.audience && AUDIENCES.has(post.audience)) return post.audience as PostAudience
  return classifier.classify(post) ?? 'property-managers'
}
