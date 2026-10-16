/**
 * Explainable keyword classification for blog posts.
 *
 * Scores a post against reviewed phrase lists, weighting the fields that say
 * what a post is about. Used to route posts to a product page and to a topic.
 * Deliberately a readable rule list rather than a model: anyone can see why a
 * post landed where it did and adjust the phrases.
 */

export interface ClassifiablePost {
  title: string
  excerpt: string
  tags: string[]
  primaryKeyword?: string
}

/** How much each field says about the topic. */
const FIELD_WEIGHTS = { title: 3, primaryKeyword: 3, tags: 2, excerpt: 1 } as const

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Whole-phrase, case-insensitive, Unicode-aware ("ota" does not match "quota"). */
function phrasePattern(phrase: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(phrase)}(?![\\p{L}\\p{N}])`, 'giu')
}

export interface KeywordClassifier<K extends string> {
  /** Score per class; exported for tests and for explaining a decision. */
  scores(post: ClassifiablePost): Record<K, number>
  /** Best class, or null on a weak signal (and on a tie, unless `onTie: 'first'`). */
  classify(post: ClassifiablePost): K | null
}

export function createKeywordClassifier<K extends string>(
  signals: Record<K, string[]>,
  {
    minScore,
    onTie = 'none',
  }: {
    minScore: number
    /** `'first'`: a tie goes to the class listed first in `signals`. `'none'`: a tie is undecided. */
    onTie?: 'none' | 'first'
  },
): KeywordClassifier<K> {
  const keys = Object.keys(signals) as K[]
  const patterns = Object.fromEntries(keys.map((k) => [k, signals[k].map(phrasePattern)])) as Record<K, RegExp[]>

  const count = (text: string | undefined, list: RegExp[]) =>
    text ? list.reduce((n, re) => n + (text.match(re)?.length ?? 0), 0) : 0

  const scores = (post: ClassifiablePost) =>
    Object.fromEntries(
      keys.map((k) => {
        const list = patterns[k]
        const score =
          count(post.title, list) * FIELD_WEIGHTS.title +
          count(post.primaryKeyword, list) * FIELD_WEIGHTS.primaryKeyword +
          post.tags.reduce((n, tag) => n + count(tag, list), 0) * FIELD_WEIGHTS.tags +
          count(post.excerpt, list) * FIELD_WEIGHTS.excerpt
        return [k, score]
      }),
    ) as Record<K, number>

  return {
    scores,
    classify(post) {
      const s = scores(post)
      // Stable sort: equal scores keep their declaration order.
      const ranked = keys.map((k) => [k, s[k]] as const).sort((a, b) => b[1] - a[1])
      const [best, runnerUp] = ranked
      if (!best || best[1] < minScore) return null
      if (onTie === 'none' && runnerUp && best[1] === runnerUp[1]) return null
      return best[0]
    },
  }
}
