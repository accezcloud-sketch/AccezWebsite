/**
 * Reading time, per language.
 *
 * Each post file contains the English and the Arabic article, so the time
 * must be measured on one language's half only. Measuring the whole file
 * (as before) roughly doubled every estimate.
 */
import readingTime from 'reading-time'
import type { Locale } from '@/lib/i18n'

/** Whole minutes to read a markdown body; never less than 1. */
export function readingMinutes(markdown: string): number {
  return Math.max(1, Math.ceil(readingTime(markdown).minutes))
}

const LABEL: Record<Locale, string> = { en: 'min read', ar: 'دقيقة قراءة' }

// Arabic uses Arabic-Indic digits, matching how dates are shown on Arabic pages.
const NUMBER: Record<Locale, Intl.NumberFormat> = {
  en: new Intl.NumberFormat('en-US'),
  ar: new Intl.NumberFormat('ar-SA'),
}

/** "8 min read" / "٨ دقيقة قراءة". */
export function formatReadingTime(minutes: number, locale: Locale): string {
  return `${NUMBER[locale].format(minutes)} ${LABEL[locale]}`
}
