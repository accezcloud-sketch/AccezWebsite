'use client'

import { useId, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { CALCULATOR_COPY } from '@/lib/tools/calculatorCopy'
import {
  AIRBNB_FEE_SOURCE, AIRBNB_HOST_ONLY_FEE, estimateMonth, FIELD_RULES, formatCount, formatPercent, formatSar, parseInputs,
  type FeeBase, type FieldError, type NumericField, type RawInputs,
} from '@/lib/tools/rentalRevenue'

type TextField = Exclude<NumericField, 'commissionPct'>

/** Example values the form starts with (clearly labelled as examples). */
const EXAMPLE = {
  nightlyRate: '450',
  nightsBooked: '18',
  cleaningPerStay: '120',
  averageStay: '3',
  managementPct: '20',
  customCommission: '',
  commissionMode: 'airbnb' as 'airbnb' | 'custom',
  feeBase: 'afterCommission' as FeeBase,
}

const controlStyle = {
  background: 'var(--surface)',
  borderColor: 'var(--border-hi)',
} as React.CSSProperties

/**
 * The calculator form and its live results. All arithmetic is in
 * lib/tools/rentalRevenue.ts; this only keeps the typed text and shows the
 * estimate (or which fields need fixing).
 */
export default function RentalCalculator({ locale }: { locale: Locale }) {
  const c = CALCULATOR_COPY[locale]
  const uid = useId()
  const [form, setForm] = useState(EXAMPLE)
  const set = <K extends keyof typeof EXAMPLE>(key: K, value: (typeof EXAMPLE)[K]) => setForm((f) => ({ ...f, [key]: value }))

  const raw: RawInputs = {
    nightlyRate: form.nightlyRate,
    nightsBooked: form.nightsBooked,
    cleaningPerStay: form.cleaningPerStay,
    averageStay: form.averageStay,
    managementPct: form.managementPct,
    commissionPct: form.commissionMode === 'airbnb' ? String(AIRBNB_HOST_ONLY_FEE) : form.customCommission,
    feeBase: form.feeBase,
  }
  const parsed = parseInputs(raw)
  const errors: Partial<Record<NumericField, FieldError>> = parsed.ok ? {} : parsed.errors
  const estimate = parsed.ok ? estimateMonth(parsed.inputs) : null

  const errorText = (field: NumericField) => {
    const e = errors[field]
    if (!e) return null
    const rule = FIELD_RULES[field]
    const limit = formatCount(e === 'tooLow' ? rule.min : rule.max, locale)
    return c.errors[e](limit)
  }

  const fieldIds = (field: NumericField) => ({ input: `${uid}-${field}`, hint: `${uid}-${field}-hint`, error: `${uid}-${field}-error` })

  const numberField = (field: NumericField, copy: { label: string; unit: string; hint: string }, value: string, onChange: (v: string) => void) => {
    const ids = fieldIds(field)
    const error = errorText(field)
    const describedBy = [copy.hint ? ids.hint : '', error ? ids.error : ''].filter(Boolean).join(' ') || undefined
    return (
      <div key={field}>
        <label htmlFor={ids.input} className="block text-strong font-semibold mb-1.5" style={{ fontSize: 14.5 }}>{copy.label}</label>
        <div
          className="flex items-stretch rounded-lg border overflow-hidden focus-within:ring-2"
          style={{ ...controlStyle, borderColor: error ? 'var(--danger)' : controlStyle.borderColor, ['--tw-ring-color' as string]: 'var(--accent)' }}
        >
          <input
            id={ids.input}
            name={field}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-strong outline-none"
            style={{ fontSize: 16 }}
          />
          <span className="flex items-center px-3 text-muted shrink-0" style={{ fontSize: 14, borderInlineStart: '1px solid var(--border)' }} aria-hidden="true">
            {copy.unit}
          </span>
        </div>
        {copy.hint && <p id={ids.hint} className="text-faint mt-1.5" style={{ fontSize: 13 }}>{copy.hint}</p>}
        {error && <p id={ids.error} className="mt-1.5 font-medium" style={{ fontSize: 13, color: 'var(--danger)' }}>{error}</p>}
      </div>
    )
  }

  const choiceClass = 'flex items-start gap-3 rounded-lg border px-3.5 py-3 cursor-pointer transition-colors has-[:checked]:border-[var(--accent)] has-[:focus-visible]:ring-2'
  const choiceStyle = { ...controlStyle, ['--tw-ring-color' as string]: 'var(--accent)' } as React.CSSProperties
  const legendClass = 'block text-strong font-semibold mb-2'

  const textField = (field: TextField) =>
    numberField(field, c.fields[field], form[field], (v) => set(field, v))

  const rows = estimate && [
    { label: c.results.gross, value: formatSar(estimate.gross, locale) },
    { label: c.results.commission, value: formatSar(-estimate.commission, locale) },
    { label: c.results.cleaning(formatCount(estimate.stays, locale)), value: formatSar(-estimate.cleaning, locale) },
    { label: c.results.management, value: formatSar(-estimate.management, locale) },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-6 items-start">
      <form className="ui-card p-5 sm:p-7 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()} noValidate aria-labelledby={`${uid}-form-heading`}>
        <div>
          <h2 id={`${uid}-form-heading`} className="text-strong font-semibold" style={{ fontSize: 20 }}>{c.formHeading}</h2>
          <p className="text-muted mt-1" style={{ fontSize: 14 }}>{c.exampleNote}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {textField('nightlyRate')}
          {textField('nightsBooked')}
        </div>

        <fieldset>
          <legend className={legendClass} style={{ fontSize: 14.5 }}>{c.commission.legend}</legend>
          <div className="flex flex-col gap-2.5">
            <label className={choiceClass} style={choiceStyle}>
              <input type="radio" name={`${uid}-commission`} value="airbnb" checked={form.commissionMode === 'airbnb'} onChange={() => set('commissionMode', 'airbnb')} className="mt-1 accent-[var(--accent)]" />
              <span>
                <span className="block text-strong font-medium" style={{ fontSize: 14.5 }}>{c.commission.airbnb}</span>
                <span className="block text-faint mt-0.5" style={{ fontSize: 13 }}>
                  {c.commission.airbnbHint}{' '}
                  <a href={AIRBNB_FEE_SOURCE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--accent-hi)' }}>
                    {c.commission.airbnbSource}
                    <ExternalLink size={12} strokeWidth={1.75} className="inline ms-1 align-[-1px]" aria-hidden="true" />
                    <span className="sr-only"> {c.opensNewTab}</span>
                  </a>
                </span>
              </span>
            </label>
            <label className={choiceClass} style={choiceStyle}>
              <input type="radio" name={`${uid}-commission`} value="custom" checked={form.commissionMode === 'custom'} onChange={() => set('commissionMode', 'custom')} className="mt-1 accent-[var(--accent)]" />
              <span>
                <span className="block text-strong font-medium" style={{ fontSize: 14.5 }}>{c.commission.custom}</span>
                <span className="block text-faint mt-0.5" style={{ fontSize: 13 }}>{c.commission.customHint}</span>
              </span>
            </label>
          </div>
          {form.commissionMode === 'custom' && (
            <div className="mt-4 sm:max-w-[calc(50%-0.625rem)]">
              {numberField('commissionPct', c.commission.rate, form.customCommission, (v) => set('customCommission', v))}
            </div>
          )}
        </fieldset>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {textField('cleaningPerStay')}
          {textField('averageStay')}
          {textField('managementPct')}
        </div>

        <fieldset>
          <legend className={legendClass} style={{ fontSize: 14.5 }}>{c.feeBase.legend}</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(['afterCommission', 'gross'] as const).map((base) => (
              <label key={base} className={choiceClass} style={choiceStyle}>
                <input type="radio" name={`${uid}-fee-base`} value={base} checked={form.feeBase === base} onChange={() => set('feeBase', base)} className="mt-1 accent-[var(--accent)]" />
                <span className="text-strong font-medium" style={{ fontSize: 14.5 }}>{c.feeBase[base]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <button type="button" onClick={() => setForm(EXAMPLE)} className="ui-btn ui-btn-glass" style={{ fontSize: 14, padding: '.6rem 1rem' }}>
            {c.reset}
          </button>
        </div>
      </form>

      <section className="ui-card p-5 sm:p-7 lg:sticky lg:top-24" aria-labelledby={`${uid}-results-heading`}>
        <h2 id={`${uid}-results-heading`} className="text-strong font-semibold mb-4" style={{ fontSize: 20 }}>{c.results.heading}</h2>
        {estimate && rows ? (
          <>
            <dl className="flex flex-col" style={{ fontSize: 15 }}>
              {rows.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-4 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="text-strong font-medium tabular-nums whitespace-nowrap">{r.value}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 pt-4 pb-2" aria-live="polite" aria-atomic="true">
                <dt className="text-strong font-semibold" style={{ fontSize: 16 }}>{c.results.net}</dt>
                <dd className="hero-display text-strong font-semibold tabular-nums whitespace-nowrap" style={{ fontSize: 'clamp(24px, 3vw, 30px)', color: estimate.net < 0 ? 'var(--danger)' : undefined }}>
                  {formatSar(estimate.net, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-2">
                <dt className="text-muted">
                  {c.results.occupancy}
                  <span className="block text-faint" style={{ fontSize: 12.5 }}>{c.results.occupancyHint}</span>
                </dt>
                <dd className="text-strong font-medium tabular-nums">{formatPercent(estimate.occupancy, locale)}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p role="status" className="text-muted" style={{ fontSize: 15 }}>{c.results.fixErrors}</p>
        )}
      </section>
    </div>
  )
}
