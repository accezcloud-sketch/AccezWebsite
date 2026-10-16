/**
 * llms.txt: a plain-language map of the site for AI assistants (format:
 * https://llmstxt.org). Pure: the route that serves it passes in the site's
 * existing copy, so this file never states anything the pages don't.
 */

export interface LlmsLink {
  title: string
  url: string
  description?: string
}

export interface LlmsInput {
  name: string
  summary: string
  /** Extra plain-language facts, one line each. */
  details: string[]
  sections: { heading: string; links: LlmsLink[] }[]
}

const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

export function buildLlmsTxt({ name, summary, details, sections }: LlmsInput): string {
  const lines = [`# ${name}`, '', `> ${oneLine(summary)}`, '']
  details.forEach((d) => lines.push(oneLine(d)))
  if (details.length) lines.push('')
  for (const section of sections) {
    if (section.links.length === 0) continue
    lines.push(`## ${section.heading}`, '')
    for (const link of section.links) {
      lines.push(`- [${oneLine(link.title)}](${link.url})${link.description ? `: ${oneLine(link.description)}` : ''}`)
    }
    lines.push('')
  }
  return lines.join('\n').replace(/\n+$/, '\n')
}
