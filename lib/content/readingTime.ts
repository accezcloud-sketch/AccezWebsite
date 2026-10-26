/**
 * The reading-time label shown on posts and cards, per language. Safe for
 * browser code; the measuring itself is in ./readingMinutes.ts (build time).
 */
import type { Locale } from '@/lib/i18n'

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
