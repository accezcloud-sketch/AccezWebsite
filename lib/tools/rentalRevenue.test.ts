import { describe, expect, it } from 'vitest'
import { AIRBNB_HOST_ONLY_FEE, estimateMonth, formatCount, formatPercent, formatSar, parseInputs, parseNumber, type RawInputs, type RentalInputs } from './rentalRevenue'

const base: RentalInputs = { nightlyRate: 500, nightsBooked: 20, commissionPct: 15.5, cleaningPerStay: 100, averageStay: 4, managementPct: 20, feeBase: 'afterCommission' }

describe('estimateMonth', () => {
  it('works out gross, commission, cleaning, management fee and net', () => {
    const e = estimateMonth(base)
    expect(e.gross).toBe(10_000)
    expect(e.commission).toBeCloseTo(1_550)
    expect(e.stays).toBe(5)
    expect(e.cleaning).toBe(500)
    expect(e.management).toBeCloseTo(1_690) // 20% of 8,450
    expect(e.net).toBeCloseTo(6_260)
    expect(e.occupancy).toBeCloseTo(66.667, 2)
  })

  it('can charge the management fee on gross revenue', () => {
    const e = estimateMonth({ ...base, feeBase: 'gross' })
    expect(e.management).toBe(2_000)
    expect(e.net).toBeCloseTo(5_950)
  })

  it('always adds up: net = gross minus every deduction', () => {
    for (const nights of [0, 1, 7, 30]) {
      const e = estimateMonth({ ...base, nightsBooked: nights, averageStay: 3 })
      expect(e.net).toBeCloseTo(e.gross - e.commission - e.cleaning - e.management)
    }
  })

  it('handles an empty month and caps occupancy at 100%', () => {
    expect(estimateMonth({ ...base, nightsBooked: 0 })).toMatchObject({ gross: 0, cleaning: 0, net: 0, occupancy: 0 })
    expect(estimateMonth({ ...base, nightsBooked: 30 }).occupancy).toBe(100)
  })

  it('can go negative when costs exceed revenue', () => {
    expect(estimateMonth({ ...base, nightlyRate: 50, cleaningPerStay: 400 }).net).toBeLessThan(0)
  })

  it('presets only the Airbnb host-only fee', () => {
    expect(AIRBNB_HOST_ONLY_FEE).toBe(15.5)
  })
})

describe('parseNumber', () => {
  it('reads Latin and Arabic-Indic digits and separators', () => {
    expect(parseNumber('450')).toBe(450)
    expect(parseNumber(' 1,250.5 ')).toBe(1250.5)
    expect(parseNumber('٤٥٠')).toBe(450)
    expect(parseNumber('١٥٫٥')).toBe(15.5)
    expect(parseNumber('١٬٢٠٠')).toBe(1200)
    expect(parseNumber('۱۲')).toBe(12)
  })

  it('rejects anything that is not a plain number', () => {
    for (const bad of ['', 'abc', '1.2.3', '12a', '-5', '1e3']) expect(parseNumber(bad), bad).toBeNaN()
  })
})

describe('parseInputs', () => {
  const raw: RawInputs = { nightlyRate: '500', nightsBooked: '20', commissionPct: '15.5', cleaningPerStay: '100', averageStay: '4', managementPct: '20', feeBase: 'afterCommission' }

  it('returns numbers for a valid form', () => {
    const r = parseInputs(raw)
    expect(r.ok && r.inputs).toEqual(base)
  })

  it('names each bad field and why', () => {
    const r = parseInputs({ ...raw, nightlyRate: '', nightsBooked: '31', commissionPct: '-3', averageStay: '0', managementPct: 'x' })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.errors).toEqual({ nightlyRate: 'required', nightsBooked: 'tooHigh', commissionPct: 'negative', averageStay: 'tooLow', managementPct: 'notNumber' })
  })

  it('accepts a commission of 101% as too high', () => {
    const r = parseInputs({ ...raw, commissionPct: '101' })
    expect(!r.ok && r.errors.commissionPct).toBe('tooHigh')
  })
})

describe('formatting', () => {
  it('formats riyals, percentages and counts for each language', () => {
    expect(formatSar(6259.6, 'en')).toBe('SAR\u00a06,260')
    expect(formatSar(6259.6, 'ar')).toMatch(/٦٬٢٦٠/)
    expect(formatSar(-120, 'en')).toBe('-SAR\u00a0120')
    expect(formatPercent(66.6667, 'en')).toBe('66.7%')
    expect(formatPercent(66.6667, 'ar')).toMatch(/٦٦٫٧/)
    expect(formatCount(6.666, 'en')).toBe('6.7')
  })
})

describe('calculator copy', () => {
  it('uses no dashes as punctuation and names no channel rate but Airbnb’s', async () => {
    const { CALCULATOR_COPY } = await import('./calculatorCopy')
    const { DASH_PUNCTUATION, stringsIn } = await import('@/lib/resources/copyCheck')
    const strings = stringsIn(CALCULATOR_COPY)
    for (const s of strings) expect(s).not.toMatch(DASH_PUNCTUATION)
    // Booking.com and Expedia appear only as channels whose rate the user enters.
    for (const s of strings.filter((x) => /booking\.com|expedia/i.test(x))) expect(s).not.toMatch(/\d/)
  })
})
