/**
 * Vacation rental revenue and commission calculator: the arithmetic, kept
 * pure so it can be tested and reused. The page (components/tools/) only
 * reads the form, calls `parseInputs` and `estimateMonth`, and formats.
 *
 * Model, per month:
 *   gross        = nightly rate x nights booked
 *   commission   = gross x channel commission %
 *   stays        = nights booked / average stay length
 *   cleaning     = stays x cleaning cost per stay
 *   management   = management fee % of (gross after commission) or of gross
 *   net to owner = gross - commission - cleaning - management
 *   occupancy    = nights booked / nights in the month
 */
import type { Locale } from '@/lib/i18n'

/**
 * Airbnb's single (host-only) fee: "Most hosts pay 15.5%", per Airbnb's help
 * page on service fees. Other channels' rates depend on each host's contract,
 * so the calculator never presets them.
 */
export const AIRBNB_HOST_ONLY_FEE = 15.5
export const AIRBNB_FEE_SOURCE = 'https://www.airbnb.com/help/article/1857'

/** Nights in the month the estimate is for. */
export const NIGHTS_IN_MONTH = 30

export type FeeBase = 'afterCommission' | 'gross'

export interface RentalInputs {
  nightlyRate: number
  nightsBooked: number
  commissionPct: number
  cleaningPerStay: number
  averageStay: number
  managementPct: number
  feeBase: FeeBase
}

export interface MonthEstimate {
  gross: number
  commission: number
  stays: number
  cleaning: number
  management: number
  net: number
  /** 0 to 100. */
  occupancy: number
}

export type NumericField = Exclude<keyof RentalInputs, 'feeBase'>
export type FieldError = 'required' | 'notNumber' | 'negative' | 'tooHigh' | 'tooLow'

interface Rule { min: number; max: number; minExclusive?: boolean }

/** What each field accepts. Percentages stop at 100; nights at the month's length. */
export const FIELD_RULES: Record<NumericField, Rule> = {
  nightlyRate: { min: 0, max: 1_000_000 },
  nightsBooked: { min: 0, max: NIGHTS_IN_MONTH },
  commissionPct: { min: 0, max: 100 },
  cleaningPerStay: { min: 0, max: 1_000_000 },
  averageStay: { min: 1, max: NIGHTS_IN_MONTH },
  managementPct: { min: 0, max: 100 },
}

/**
 * Reads a number typed in either language: Latin or Arabic-Indic digits,
 * Arabic decimal and thousands separators, spaces and commas as thousands
 * separators. Returns NaN for anything else.
 */
export function parseNumber(raw: string): number {
  const latin = raw
    .trim()
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/٫/g, '.')
    .replace(/[٬,\s]/g, '')
  if (!/^\d*\.?\d+$|^\d+\.$/.test(latin)) return NaN
  return Number(latin)
}

export type RawInputs = Record<NumericField, string> & { feeBase: FeeBase }

/** Validates the form's text values; returns the numbers, or an error per bad field. */
export function parseInputs(raw: RawInputs): { ok: true; inputs: RentalInputs } | { ok: false; errors: Partial<Record<NumericField, FieldError>> } {
  const errors: Partial<Record<NumericField, FieldError>> = {}
  const values = {} as Record<NumericField, number>
  for (const field of Object.keys(FIELD_RULES) as NumericField[]) {
    const text = raw[field] ?? ''
    const rule = FIELD_RULES[field]
    if (text.trim() === '') { errors[field] = 'required'; continue }
    if (/^\s*-/.test(text)) { errors[field] = 'negative'; continue }
    const n = parseNumber(text)
    if (Number.isNaN(n)) errors[field] = 'notNumber'
    else if (n < rule.min) errors[field] = 'tooLow'
    else if (n > rule.max) errors[field] = 'tooHigh'
    else values[field] = n
  }
  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, inputs: { ...values, feeBase: raw.feeBase === 'gross' ? 'gross' : 'afterCommission' } }
}

/** The month's figures, unrounded (round only for display). */
export function estimateMonth(i: RentalInputs): MonthEstimate {
  const gross = i.nightlyRate * i.nightsBooked
  const commission = gross * (i.commissionPct / 100)
  const stays = i.averageStay > 0 ? i.nightsBooked / i.averageStay : 0
  const cleaning = stays * i.cleaningPerStay
  const feeBaseAmount = i.feeBase === 'gross' ? gross : gross - commission
  const management = feeBaseAmount * (i.managementPct / 100)
  return {
    gross,
    commission,
    stays,
    cleaning,
    management,
    net: gross - commission - cleaning - management,
    occupancy: Math.min(100, (i.nightsBooked / NIGHTS_IN_MONTH) * 100),
  }
}

// Arabic uses Arabic-Indic digits, as dates and counts do on the Arabic pages.
const NUMBER_LOCALE: Record<Locale, string> = { en: 'en-US', ar: 'ar-SA-u-nu-arab' }

/** "SAR 9,000" / "٩٬٠٠٠ ر.س.", whole riyals. Negative amounts keep their sign. */
export function formatSar(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], { style: 'currency', currency: 'SAR', maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(Math.round(amount) || 0)
}

/** "66.7%" / "٦٦٫٧٪", one decimal at most. */
export function formatPercent(value: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], { style: 'percent', maximumFractionDigits: 1 }).format(value / 100)
}

/** A count such as stays, one decimal at most. */
export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], { maximumFractionDigits: 1 }).format(value)
}
