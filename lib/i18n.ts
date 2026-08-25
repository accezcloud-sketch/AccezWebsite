/**
 * Locale routing helpers.
 *
 * DESIGN DECISION — why Arabic lives at /ar/... and English stays at the root:
 *
 * Google's international documentation is explicit that it does NOT read
 * code-level language hints: "We don't use any code-level language information
 * such as `lang` attributes, or the URL." It determines language from the
 * VISIBLE CONTENT of the page, and it needs each language on its OWN URL.
 *
 * Before this, both languages shared one URL and the Arabic version only
 * appeared after client-side React state changed. The server-rendered HTML was
 * always English, so:
 *   - Google had no Arabic URL to index, and
 *   - AI crawlers (which never run JavaScript) never saw Arabic at all.
 *
 * Keeping English exactly where it is — `/`, `/about/`, `/blog/<slug>/` — means
 * no existing URL changes and no existing ranking is put at risk. Arabic is
 * purely additive at `/ar/...`, which is the subdirectory structure Google
 * lists as a recommended option for multilingual sites.
 */

export const LOCALES = ['en', 'ar'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Site origin, used for absolute URLs in hreflang and structured data. */
export const SITE_URL = 'https://www.accez.cloud'

/**
 * hreflang codes.
 *
 * `ar-SA` rather than bare `ar`: the audience is Saudi Arabia specifically, and
 * Google matches the more specific tag first. `en` is left region-neutral
 * because the English site serves everyone else, not one country.
 */
export const HREFLANG: Record<Locale, string> = {
  en: 'en',
  ar: 'ar-SA',
}

/**
 * Convert a locale-less route ('' | 'about' | 'blog/my-post') into a path for
 * the given locale. `trailingSlash: true` in next.config.js means every URL
 * ends in a slash, and the sitemap, canonicals and hreflang must all agree —
 * otherwise each crawl wastes a request on a redirect.
 */
export function localePath(route: string, locale: Locale): string {
  const clean = route.replace(/^\/+|\/+$/g, '')
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`
  return clean ? `${prefix}/${clean}/` : `${prefix}/`
}

/** Absolute URL for a route in a given locale. */
export function localeUrl(route: string, locale: Locale): string {
  return `${SITE_URL}${localePath(route, locale)}`
}

/**
 * The `alternates` block for Next.js metadata: a self-referencing canonical
 * plus reciprocal hreflang for every locale.
 *
 * Reciprocity is not optional. Google ignores the entire annotation set if page
 * X points at Y but Y does not point back at X — the single most common reason
 * hreflang silently does nothing.
 *
 * `x-default` points at English as the fallback for users whose language we
 * don't publish.
 */
export function alternatesFor(route: string, locale: Locale) {
  return {
    canonical: localePath(route, locale),
    languages: {
      [HREFLANG.en]: localePath(route, 'en'),
      [HREFLANG.ar]: localePath(route, 'ar'),
      'x-default': localePath(route, 'en'),
    },
  }
}

/**
 * Routes that exist in Arabic.
 *
 * Anything not listed here stays on its English URL, because prefixing a route
 * that has no Arabic page produces a 404 — and a 404 under /ar used to trigger
 * a redirect loop (see the guard in contexts/LanguageContext.tsx).
 */
const AR_ROUTES = new Set([
  '',
  'modules',
  'owners',
  'sales',
  'hotels',
  'service-providers',
  'about',
  'support',
  'blog',
  'terms',
  'privacy',
  'refund-policy',
])

/**
 * Localise an internal href for the active language.
 *
 * Internal links were all hardcoded to the English path, so on an Arabic page
 * every navigation click — the header, the footer, a blog card — dropped the
 * reader back into English. That breaks the reading experience and, for search
 * engines, leaks link signals out of the Arabic version of the site.
 *
 * Anything external, already-prefixed, or without an Arabic equivalent is
 * returned untouched. Hashes and query strings are preserved.
 */
export function localeHref(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return href
  if (!href.startsWith('/')) return href // external URL, mailto, tel
  if (href === '/ar' || href.startsWith('/ar/')) return href // already localised

  const [pathAndQuery, hash] = href.split('#')
  const [path, query] = pathAndQuery.split('?')
  const clean = path.replace(/^\/+|\/+$/g, '')
  const head = clean.split('/')[0]

  // Blog posts (blog/<slug>) exist in Arabic; check the first segment.
  if (!AR_ROUTES.has(clean) && !AR_ROUTES.has(head)) return href

  const localised = clean ? `/ar/${clean}/` : '/ar/'
  return localised + (query ? `?${query}` : '') + (hash ? `#${hash}` : '')
}

/**
 * Map any in-app path to its counterpart in the other locale.
 * Used by the header language toggle, which must NAVIGATE between URLs rather
 * than swap content in place — swapping in place is what made the Arabic
 * content unindexable in the first place.
 */
export function counterpartPath(pathname: string, target: Locale): string {
  const withoutPrefix = pathname.replace(/^\/ar(?=\/|$)/, '') || '/'
  const route = withoutPrefix.replace(/^\/+|\/+$/g, '')
  return localePath(route, target)
}
