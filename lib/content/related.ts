/**
 * Related-post ranking.
 *
 * Pure domain logic: no file system, no framework. Given one post and the rest
 * of the corpus, it returns the slugs of the posts a reader of that post is
 * most likely to want next.
 *
 * How it decides
 * --------------
 * 1. Hand-picked first. A post may list `related` slugs in its frontmatter
 *    (the way FleetHQ curates its "More from the blog" cards). Those are kept
 *    in the given order, as long as they exist and aren't the post itself.
 * 2. Then by topic similarity. Each post becomes a weighted bag of terms built
 *    from the fields that say what it is *about* (title, primary keyword,
 *    tags, excerpt). Terms are weighted by TF-IDF, so words
 *    every post shares ("property", "Saudi", "Vision 2030") count for almost
 *    nothing and distinctive ones ("maintenance", "deposit") dominate.
 *    Posts are ranked by cosine similarity.
 * 3. Ties break on recency, so the result is deterministic.
 *
 * Body text and section headings are deliberately NOT used. The automated
 * posts share long boilerplate sections (the Saudi section, "How Accez
 * helps", FAQ questions) whose incidental words pull unrelated posts together
 * — measured on the real corpus, adding headings made "Emergency maintenance"
 * suggest "Killing gap nights" because both mention "night".
 */

export interface RelatableDoc {
  slug: string
  /** ISO date, used only to break ties. */
  date: string
  title: string
  excerpt: string
  tags: string[]
  primaryKeyword?: string
  /** Hand-picked related slugs, in display order. */
  related?: string[]
}

export interface RankOptions {
  limit?: number
  /** Below this similarity a post is not considered related at all. */
  minScore?: number
}

/** How much each field says about the topic. */
const FIELD_WEIGHTS = {
  title: 3,
  primaryKeyword: 3,
  tags: 2,
  excerpt: 1,
} as const

const STOPWORDS = new Set(
  (
    'a about above after again against all am an and any are as at be because been before being below between both but by ' +
    'can could did do does doing down during each few for from further had has have having he her here hers him his how i ' +
    'if in into is it its itself just me more most my no nor not now of off on once only or other our ours out over own ' +
    'same she should so some such than that the their theirs them then there these they this those through to too under ' +
    'until up very was we were what when where which while who whom why will with without would you your yours ' +
    // generic blog words that never identify a topic
    'guide way ways tip tips how-to best new make making get getting use using without every one two three ' +
    'accez cloud ' +
    // words this corpus uses in almost every title regardless of topic
    'system portfolio scale scaling effort control headache stop why what'
  ).split(/\s+/),
)

/** Light English normaliser: lower-case, drop possessives, fold plurals. */
export function normaliseTerm(word: string): string {
  let w = word.toLowerCase().replace(/['’]s$/, '')
  if (w.length > 4 && w.endsWith('ies')) w = w.slice(0, -3) + 'y'
  else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us')) w = w.slice(0, -1)
  return w
}

export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z][a-z0-9'’]*/g) ?? [])
    .map(normaliseTerm)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
}

type TermCounts = Map<string, number>

function termCounts(doc: RelatableDoc): TermCounts {
  const counts: TermCounts = new Map()
  const add = (text: string | undefined, weight: number) => {
    if (!text) return
    for (const term of tokenize(text)) counts.set(term, (counts.get(term) ?? 0) + weight)
  }
  add(doc.title, FIELD_WEIGHTS.title)
  add(doc.primaryKeyword, FIELD_WEIGHTS.primaryKeyword)
  doc.tags.forEach((tag) => add(tag, FIELD_WEIGHTS.tags))
  add(doc.excerpt, FIELD_WEIGHTS.excerpt)
  return counts
}

type Vector = Map<string, number>

function norm(v: Vector): number {
  let sum = 0
  v.forEach((x) => (sum += x * x))
  return Math.sqrt(sum)
}

function cosine(a: Vector, b: Vector): number {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a]
  let dot = 0
  small.forEach((x, term) => {
    const y = large.get(term)
    if (y) dot += x * y
  })
  const denom = norm(a) * norm(b)
  return denom === 0 ? 0 : dot / denom
}

/**
 * A similarity index over a corpus. Build it once per corpus (it does the
 * TF-IDF work up front), then query it for any post.
 */
export class RelatedIndex {
  private readonly docs: Map<string, RelatableDoc>
  private readonly vectors = new Map<string, Vector>()

  constructor(corpus: RelatableDoc[]) {
    this.docs = new Map(corpus.map((d) => [d.slug, d]))

    const counts = corpus.map((d) => [d.slug, termCounts(d)] as const)
    const docFreq = new Map<string, number>()
    counts.forEach(([, c]) => c.forEach((_, term) => docFreq.set(term, (docFreq.get(term) ?? 0) + 1)))

    const n = corpus.length
    counts.forEach(([slug, c]) => {
      const vec: Vector = new Map()
      c.forEach((tf, term) => {
        // Smoothed IDF; a term present in every post scores ~0.
        const idf = Math.log((1 + n) / (1 + (docFreq.get(term) ?? 0)))
        if (idf > 0) vec.set(term, (1 + Math.log(tf)) * idf)
      })
      this.vectors.set(slug, vec)
    })
  }

  /** Similarity in [0, 1] between two posts in the corpus. */
  similarity(a: string, b: string): number {
    const va = this.vectors.get(a)
    const vb = this.vectors.get(b)
    return va && vb ? cosine(va, vb) : 0
  }

  /** Slugs of the posts most related to `slug`, best first. */
  relatedTo(slug: string, { limit = 3, minScore = 0.02 }: RankOptions = {}): string[] {
    const target = this.docs.get(slug)
    if (!target || limit <= 0) return []

    const picked: string[] = []
    for (const s of target.related ?? []) {
      if (s !== slug && this.docs.has(s) && !picked.includes(s)) picked.push(s)
      if (picked.length === limit) return picked
    }

    const ranked = Array.from(this.docs.values())
      .filter((d) => d.slug !== slug && !picked.includes(d.slug))
      .map((d) => ({ doc: d, score: this.similarity(slug, d.slug) }))
      .filter((r) => r.score >= minScore)
      .sort((x, y) => y.score - x.score || y.doc.date.localeCompare(x.doc.date) || x.doc.slug.localeCompare(y.doc.slug))

    return [...picked, ...ranked.slice(0, limit - picked.length).map((r) => r.doc.slug)]
  }
}

