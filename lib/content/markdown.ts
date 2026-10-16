/**
 * Blog markdown → HTML.
 *
 * Runs on the server at build time, so the article reaches the browser (and
 * crawlers) as finished HTML and no markdown code ships to visitors.
 *
 * Built on markdown-it (CommonMark + tables) instead of the previous
 * hand-written regex renderer, which could not show tables, images or video
 * and printed `*` bullets and `####` headings as literal characters.
 *
 * On top of standard markdown:
 * - `#` headings in a post body become `h2`: the page title is the only `h1`.
 * - `h2`/`h3` get stable ids, so sections can be linked and listed.
 * - Internal links stay in the same tab and are localised (trailing slash,
 *   `/ar/` prefix on Arabic pages); external links open in a new tab.
 * - Tables are wrapped so they scroll sideways on small screens.
 * - A paragraph that is only a YouTube link becomes an embedded video, with
 *   the original link kept underneath.
 * - Raw HTML in the source is escaped, never rendered.
 */
import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { localeHref, type Locale } from '@/lib/i18n'

export interface RenderOptions {
  /** Locale of the page the HTML will appear on; used to localise internal links. */
  locale?: Locale
}

/** A section heading as rendered, for a table of contents. */
export interface TocEntry {
  id: string
  text: string
  level: 2 | 3
}

export interface RenderedArticle {
  html: string
  /** `h2`/`h3` headings in document order, with the ids used in `html`. */
  toc: TocEntry[]
}

interface RenderEnv extends RenderOptions {
  toc: TocEntry[]
}

/** Our own hosts: links to these are internal even when written as absolute URLs. */
const OWN_HOSTS = new Set(['accez.cloud', 'www.accez.cloud'])

/** Lower-case, letters/digits (any script) joined by hyphens. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/[\s-]+/g, '-')
}

/** YouTube video id from a youtube.com / youtu.be URL, or null. */
export function youTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\.|^m\./, '')
    let id: string | null = null
    if (host === 'youtu.be') id = u.pathname.slice(1)
    else if (host === 'youtube.com' && u.pathname === '/watch') id = u.searchParams.get('v')
    else if (host === 'youtube.com' && u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2]
    return id && /^[\w-]{6,20}$/.test(id) ? id : null
  } catch {
    return null
  }
}

function isExternal(href: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false
  try {
    return !OWN_HOSTS.has(new URL(href).hostname)
  } catch {
    return true
  }
}

/** Absolute links to our own site become root-relative, then localised. */
function internalHref(href: string, locale: Locale): string {
  let path = href
  if (/^https?:\/\//i.test(href)) {
    const u = new URL(href)
    path = `${u.pathname}${u.search}${u.hash}`
  }
  return path.startsWith('/') ? localeHref(path, locale) : href
}

/** Video id when a paragraph's inline content is exactly one YouTube link. */
function loneYouTubeLink(children: Token[]): { id: string; title: string } | null {
  if (children.length !== 3 || children[0].type !== 'link_open' || children[2].type !== 'link_close') return null
  const id = youTubeId(children[0].attrGet('href') ?? '')
  return id ? { id, title: children[1].content || 'Video' } : null
}

function inlineText(tokens: Token[], i: number): string {
  return tokens[i + 1]?.children?.map((t) => t.content).join('') ?? ''
}

function createRenderer(): MarkdownIt {
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false })

  // Demote body h1 → h2 and give h2/h3 unique ids.
  md.core.ruler.push('accez_headings', (state) => {
    const used = new Map<string, number>()
    state.tokens.forEach((token, i) => {
      if (token.type !== 'heading_open' && token.type !== 'heading_close') return
      if (token.tag === 'h1') token.tag = 'h2'
      if (token.type === 'heading_open' && (token.tag === 'h2' || token.tag === 'h3')) {
        const text = inlineText(state.tokens, i)
        const base = slugifyHeading(text) || 'section'
        const n = used.get(base) ?? 0
        used.set(base, n + 1)
        const id = n === 0 ? base : `${base}-${n + 1}`
        token.attrSet('id', id)
        ;(state.env as RenderEnv).toc?.push({ id, text, level: token.tag === 'h2' ? 2 : 3 })
      }
    })
  })

  const render = md.renderer.rules
  const fallback: NonNullable<typeof render.link_open> = (tokens, idx, options, _env, self) =>
    self.renderToken(tokens, idx, options)

  const linkOpen = render.link_open ?? fallback
  render.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const href = token.attrGet('href') ?? ''
    if (isExternal(href)) {
      token.attrSet('target', '_blank')
      token.attrSet('rel', 'noopener noreferrer')
    } else {
      token.attrSet('href', internalHref(href, (env as RenderOptions).locale ?? 'en'))
    }
    return linkOpen(tokens, idx, options, env, self)
  }

  const image = render.image ?? fallback
  render.image = (tokens, idx, options, env, self) => {
    tokens[idx].attrSet('loading', 'lazy')
    tokens[idx].attrSet('decoding', 'async')
    return image(tokens, idx, options, env, self)
  }

  render.table_open = () => '<div class="table-wrap"><table>\n'
  render.table_close = () => '</table></div>\n'

  // A paragraph whose only content is one YouTube link → embedded video.
  const paragraphOpen = render.paragraph_open ?? fallback
  render.paragraph_open = (tokens, idx, options, env, self) => {
    const video = loneYouTubeLink(tokens[idx + 1]?.children ?? [])
    if (!video) return paragraphOpen(tokens, idx, options, env, self)

    return (
      `<figure class="video-embed"><div class="video-frame">` +
      `<iframe src="https://www.youtube-nocookie.com/embed/${video.id}" title="${md.utils.escapeHtml(video.title)}" loading="lazy" ` +
      `allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ` +
      `referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>` +
      `<figcaption>`
    )
  }
  const paragraphClose = render.paragraph_close ?? fallback
  render.paragraph_close = (tokens, idx, options, env, self) => {
    // Paragraphs never nest, so the nearest earlier paragraph_open is this one's.
    const opening = tokens.findLastIndex((t, i) => i < idx && t.type === 'paragraph_open')
    return loneYouTubeLink(tokens[opening + 1]?.children ?? [])
      ? '</figcaption></figure>\n'
      : paragraphClose(tokens, idx, options, env, self)
  }

  return md
}

const renderer = createRenderer()

/** Renders a post body and returns its table of contents alongside. */
export function renderArticle(markdown: string, options: RenderOptions = {}): RenderedArticle {
  const env: RenderEnv = { locale: options.locale ?? 'en', toc: [] }
  const html = renderer.render(markdown, env)
  return { html, toc: env.toc }
}

export function renderMarkdown(markdown: string, options: RenderOptions = {}): string {
  return renderArticle(markdown, options).html
}
