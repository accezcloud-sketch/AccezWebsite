/**
 * When each static page last really changed, for the sitemap's <lastmod>.
 *
 * A page's date is the newest commit date of the files that make up its own
 * content (its route files and the components and copy only it shows). Shared
 * chrome (header, footer, theme, animations) is left out on purpose: a footer
 * tweak does not make every page "new" to a crawler.
 *
 * The dates are written to lib/content/page-dates.json by
 * `node scripts/page-dates.mjs` and committed. They are not read from git at
 * build time because the hosting build clones only the last few commits, which
 * would date every older page to the oldest commit it can see, and change with
 * every deploy. lib/content/pageDates.test.ts fails when a page's sources have
 * a newer commit than the JSON, so the file cannot quietly go stale.
 *
 * Routes are written without slashes ('' is the homepage); each covers both
 * languages, so each lists the English and the Arabic route files.
 */

const both = (...routes) => routes.flatMap((r) => [`app/${r}`, `app/ar/${r}`])

const SOLUTION_SHARED = [
  ...both('solutions'),
  'components/solutions/solutionRoute.tsx',
  'components/solutions/solutionPages.tsx',
  'components/hero',
  'components/product',
  'components/SectionHeader.tsx',
  'lib/product',
  'public/product',
]

const PRICING_SHARED = [...both('pricing'), 'components/pricing/solutionPricing.tsx', 'lib/platform/pricingPages.ts']

const LEGAL_CONTENT = {
  terms: ['components/legal/TermsContent.tsx', 'components/legal/TermsContentAr.tsx'],
  'refund-policy': ['components/legal/RefundContent.tsx', 'components/legal/RefundContentAr.tsx'],
  privacy: ['components/legal/PrivacyContent.tsx', 'components/legal/PrivacyContentAr.tsx'],
}

const legalChooser = (doc) => [...both(`${doc}/page.tsx`), 'components/legal/LegalChooser.tsx', 'lib/legal/documents.ts']
const legalVersion = (doc) => [
  ...both(`${doc}/[solution]`),
  ...LEGAL_CONTENT[doc],
  'components/legal/legalVersionRoute.tsx',
  'components/LegalLayout.tsx',
  'lib/legal',
]

/** Git pathspecs (files or folders) that make up each static page. */
export const PAGE_SOURCES = {
  '': [
    ...both('page.tsx'),
    'components/home',
    'components/Hero.tsx',
    'components/Ecosystem.tsx',
    'components/Trust.tsx',
    'components/FAQ.tsx',
    'components/Contact.tsx',
    'components/pricing/PricingOverview.tsx',
    'lib/content/siteSchema.ts',
    'translations',
  ],
  about: [...both('about'), 'components/AboutPage.tsx'],
  support: [...both('support'), 'components/SupportPageClient.tsx'],
  blog: [...both('blog/page.tsx'), 'components/blog/BlogIndexPage.tsx', 'components/BlogListClient.tsx', 'lib/content/blogIndex.ts'],
  faq: [...both('faq'), 'components/FAQ.tsx', 'translations'],
  terms: legalChooser('terms'),
  privacy: legalChooser('privacy'),
  'refund-policy': legalChooser('refund-policy'),
  'solutions/property-managers': [
    ...SOLUTION_SHARED,
    'components/solutions/PropertyManagementPage.tsx',
    'components/Pricing.tsx',
    'lib/content/modulesCopy.ts',
  ],
  'solutions/service-providers': [
    ...SOLUTION_SHARED,
    'components/ServiceProviderPage.tsx',
    'components/ProviderPricing.tsx',
    'lib/content/providerPricing.ts',
  ],
  'pricing/property-managers': [...PRICING_SHARED, 'components/Pricing.tsx', 'translations'],
  'pricing/service-providers': [...PRICING_SHARED, 'components/ProviderPricing.tsx', 'lib/content/providerPricing.ts'],
  'terms/property-managers': legalVersion('terms'),
  'terms/service-providers': legalVersion('terms'),
  'refund-policy/property-managers': legalVersion('refund-policy'),
  'refund-policy/service-providers': legalVersion('refund-policy'),
  'privacy/property-managers': legalVersion('privacy'),
  'privacy/service-providers': legalVersion('privacy'),
}

/** A route as a key of PAGE_SOURCES: no leading or trailing slashes. */
export function routeKey(route) {
  return route.replace(/^\/+|\/+$/g, '')
}

/** The newest `YYYY-MM-DD` day among `days` (ignoring blanks and any time part), or undefined. */
export function newestDay(days) {
  return days
    .map((d) => (d || '').trim().slice(0, 10))
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .reduce((acc, d) => (acc === undefined || d > acc ? d : acc), undefined)
}

/** Today in the machine's time zone, as `YYYY-MM-DD` (for sources with uncommitted edits). */
export function localDay(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/**
 * Newest commit day of the files at `paths`. `git(args)` runs git and returns
 * its output, so tests can pass a fake.
 */
export function committedDay(paths, git) {
  return newestDay(git(['log', '--format=%cs', '--', ...paths]).split('\n'))
}

/** Like committedDay, but today when any of the files has uncommitted edits. */
export function lastChangeDay(paths, git, today = localDay()) {
  if (git(['status', '--porcelain', '--', ...paths]).trim()) return today
  return committedDay(paths, git)
}

/** The date of every page in PAGE_SOURCES, keys in a stable order. */
export function pageDates(git, today = localDay()) {
  const dates = {}
  for (const route of Object.keys(PAGE_SOURCES).sort()) {
    const day = lastChangeDay(PAGE_SOURCES[route], git, today)
    if (!day) throw new Error(`No git history for the sources of "/${route}"; check PAGE_SOURCES in lib/build/pageDates.mjs`)
    dates[route] = day
  }
  return dates
}
