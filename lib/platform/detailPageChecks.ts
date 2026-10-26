/**
 * The rules every detail page must meet, as one check the tests run on each
 * page (modules, customer pages, integrations). Returns what is wrong, so a
 * failing test names every problem at once.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { SHOTS } from '@/lib/product/shots'
import SIZES from '@/lib/product/shot-sizes.json'
import { TITLE_MAX, TITLE_SUFFIX } from '@/lib/site'
import type { DetailPageData } from './detailPages'
import type { Bilingual } from './solutions'

const ARABIC = /[؀-ۿ]/
/** Dashes used as punctuation: em, en, or a hyphen with spaces around it. */
const DASH = /[—–]| - /

export const DESCRIPTION_MIN = 140
export const DESCRIPTION_MAX = 155

/** Every bilingual text of a page, with a name for messages. */
export function bilingualFields(page: DetailPageData): [string, Bilingual][] {
  return [
    ['name', page.name],
    ['summary', page.summary],
    ['metaTitle', page.metaTitle],
    ['metaDescription', page.metaDescription],
    ['hero.title', page.hero.title],
    ...(page.hero.accent ? [['hero.accent', page.hero.accent] as [string, Bilingual]] : []),
    ['hero.subtitle', page.hero.subtitle],
    ...page.shots.flatMap((s, i) => [[`shots[${i}].title`, s.title], [`shots[${i}].text`, s.text]] as [string, Bilingual][]),
    ...page.points.flatMap((p, i) => [[`points[${i}].title`, p.title], [`points[${i}].text`, p.text]] as [string, Bilingual][]),
    ...page.faqs.flatMap((f, i) => [[`faqs[${i}].q`, f.q], [`faqs[${i}].a`, f.a]] as [string, Bilingual][]),
  ]
}

export function detailPageProblems(page: DetailPageData): string[] {
  const problems: string[] = []
  const say = (m: string) => problems.push(`${page.slug}: ${m}`)

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(page.slug)) say('slug is not URL-safe')

  for (const [field, value] of bilingualFields(page)) {
    if (!value.en.trim()) say(`${field}.en is empty`)
    if (!ARABIC.test(value.ar)) say(`${field}.ar is not Arabic`)
    for (const locale of ['en', 'ar'] as const) if (DASH.test(value[locale])) say(`${field}.${locale} uses a dash as punctuation`)
  }

  for (const locale of ['en', 'ar'] as const) {
    const title = `${page.metaTitle[locale]}${TITLE_SUFFIX}`
    if (title.length > TITLE_MAX) say(`${locale} title is ${title.length} characters with the suffix (max ${TITLE_MAX})`)
    const d = page.metaDescription[locale].length
    if (d < DESCRIPTION_MIN || d > DESCRIPTION_MAX) say(`${locale} description is ${d} characters (${DESCRIPTION_MIN} to ${DESCRIPTION_MAX})`)
    // The headline carries the phrase people search for, which the title leads with.
    if (!page.metaTitle[locale].includes(page.hero.title[locale])) say(`${locale} title does not contain the headline "${page.hero.title[locale]}"`)
  }

  if (page.shots.length === 0) say('has no screenshot')
  for (const s of page.shots) if (!(s.shot in SHOTS)) say(`unknown screenshot ${s.shot}`)
  // Screens after the first are shown together in one frame when there are two or more, so they share one shape.
  const rest = page.shots.slice(1)
  if (rest.length > 1) {
    const heights = new Set(rest.map((s) => {
      const shot = SHOTS[s.shot]
      return (SIZES as Record<string, number>)[`${shot.app}/en/${shot.name}`]
    }))
    if (heights.size > 1) say('screens shown together have different heights')
  }
  const shotKeys = page.shots.map((s) => s.shot)
  if (new Set(shotKeys).size !== shotKeys.length) say('shows the same screenshot twice')

  if (page.points.length < 3 || page.points.length > 6) say(`has ${page.points.length} benefits (3 to 6)`)
  if (page.faqs.length < 2 || page.faqs.length > 4) say(`has ${page.faqs.length} questions (2 to 4)`)

  for (const slug of page.posts) {
    if (!existsSync(path.join(process.cwd(), 'content/blog', `${slug}.md`))) say(`links to a post that does not exist: ${slug}`)
  }
  return problems
}
