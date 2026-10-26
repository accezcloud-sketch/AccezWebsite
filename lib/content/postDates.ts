/**
 * Post dates: reading them from frontmatter, choosing the one search engines
 * see as the last modification, and showing them to readers.
 *
 * `reviewed` is the day an editor last checked a post's facts (used on the
 * regulation posts). It is not an edit to the text, but it is a real check of
 * the content, so when it is newer than the publish or update date it becomes
 * the article's dateModified.
 */
import type { Locale } from '@/lib/i18n'

const ISO_DAY = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * A frontmatter date as `YYYY-MM-DD`, or undefined when it is missing or not a
 * real calendar day. YAML turns an unquoted date into a Date object, so both
 * strings and Dates are accepted.
 */
export function toIsoDay(value: unknown): string | undefined {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? undefined : value.toISOString().slice(0, 10)
  if (typeof value !== 'string') return undefined
  const day = value.trim().slice(0, 10)
  const m = ISO_DAY.exec(day)
  if (!m) return undefined
  const date = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])))
  // Rejects days that do not exist, such as 2026-02-30.
  return date.toISOString().slice(0, 10) === day ? day : undefined
}

export interface PostDates {
  date: string
  updated?: string
  reviewed?: string
}

/** The article's last modification: the newest of its publish, update and review days. */
export function postDateModified(post: PostDates): string {
  const days = [post.date, post.updated, post.reviewed].map((d) => (d || '').slice(0, 10)).filter(Boolean)
  return days.reduce((acc, d) => (d > acc ? d : acc), post.date.slice(0, 10))
}

// Gregorian calendar in both languages; Arabic uses Arabic-Indic digits, as the
// rest of the Arabic pages do. Read in UTC so the day never shifts with the
// build machine's time zone.
const DAY_FORMAT: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
  ar: new Intl.DateTimeFormat('ar-SA-u-ca-gregory-nu-arab', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
}

/** "September 6, 2026" / "٦ سبتمبر ٢٠٢٦". */
export function formatDay(day: string, locale: Locale): string {
  const iso = toIsoDay(day)
  if (!iso) return day
  return DAY_FORMAT[locale].format(new Date(`${iso}T00:00:00Z`))
}

const REVIEWED_LABEL: Record<Locale, string> = { en: 'Last reviewed', ar: 'آخر مراجعة' }

/** "Last reviewed September 6, 2026" / "آخر مراجعة ٦ سبتمبر ٢٠٢٦". */
export function reviewedLabel(locale: Locale): string {
  return REVIEWED_LABEL[locale]
}
