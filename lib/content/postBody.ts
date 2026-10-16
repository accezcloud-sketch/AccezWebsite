/**
 * Splitting a bilingual post body into its English and Arabic halves.
 *
 * Each post file holds both languages, separated by the `<!-- AR -->` marker
 * (written by the content pipeline). Pure string handling; no file access.
 */

export const ARABIC_MARKER = '<!-- AR -->'

export interface BilingualBody {
  en: string
  ar: string
}

/** A `key: value` frontmatter line, e.g. `title: "..."` or `tags: [...]`. */
const FRONTMATTER_LINE = /^[A-Za-z][\w-]*\s*:/

/**
 * Removes a YAML frontmatter block that starts a body section.
 *
 * The content pipeline sometimes repeats the whole frontmatter (translated)
 * right after the Arabic marker; rendered, it shows up as raw `title: ...`
 * lines at the top of the Arabic article. Only a block whose every line is a
 * `key: value` pair is removed, so a genuine `---` rule is never touched.
 */
export function stripLeadingFrontmatter(markdown: string): string {
  const lines = markdown.split('\n')
  if (lines[0]?.trim() !== '---') return markdown

  const close = lines.findIndex((line, i) => i > 0 && line.trim() === '---')
  if (close < 2) return markdown

  const block = lines.slice(1, close).filter((line) => line.trim() !== '')
  if (block.length === 0 || !block.every((line) => FRONTMATTER_LINE.test(line.trim()))) return markdown

  return lines.slice(close + 1).join('\n').trim()
}

/**
 * Splits a post body into English and Arabic. Without a marker, both halves
 * are the whole body (single-language post).
 */
export function splitBilingualBody(raw: string): BilingualBody {
  const body = raw.replace(/\r\n/g, '\n')
  const at = body.indexOf(ARABIC_MARKER)
  if (at === -1) {
    const only = stripLeadingFrontmatter(body.trim())
    return { en: only, ar: only }
  }

  const en = stripLeadingFrontmatter(body.slice(0, at).trim())
  const ar = stripLeadingFrontmatter(body.slice(at + ARABIC_MARKER.length).trim())
  return { en, ar: ar || en }
}
