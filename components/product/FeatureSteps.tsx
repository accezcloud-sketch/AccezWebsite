'use client'

import { useState, type KeyboardEvent } from 'react'
import type { Locale } from '@/lib/i18n'
import { shotSources, type ShotKey } from '@/lib/product/shots'
import { ShotImage } from './ProductShot'

export interface FeatureStep {
  title: string
  text: string
  shot: ShotKey
}

/**
 * A few steps on one side, the real screen for the chosen step on the other.
 * Pointing at a step (or clicking, tapping, arrow keys) shows its screenshot;
 * on phones the screenshot sits above the steps, so the change is in view.
 * Every screen of the block sits in one frame sized to the tallest of them,
 * each pinned to the top with its own bottom edge continued below it, so
 * every step shows the same frame in the same place and switching never
 * moves the page. Built as a tab list, so it is
 * announced and operable as one.
 */
export default function FeatureSteps({ id, steps, locale, flip = false }: {
  /** Stable name for this block (ids are derived from it, identical on server and client). */
  id: string
  steps: FeatureStep[]
  locale: Locale
  flip?: boolean
}) {
  const [active, setActive] = useState(0)
  const base = `steps-${id}`
  // The frame takes the shape of the block's tallest screen.
  const tallest = Math.max(...steps.map((s) => shotSources(s.shot, locale).height))

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? i - 1 : null
    if (next === null) return
    e.preventDefault()
    const to = (next + steps.length) % steps.length
    setActive(to)
    document.getElementById(`${base}-tab-${to}`)?.focus()
  }

  return (
    <div className={`grid grid-cols-1 ${flip ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'} gap-8 lg:gap-14 items-start`}>
      <div role="tablist" aria-orientation="vertical" className={`flex flex-col order-2 ${flip ? 'lg:order-2' : 'lg:order-1'}`}>
        {steps.map((s, i) => {
          const on = i === active
          return (
            <button
              key={s.title}
              id={`${base}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i) }}
              onKeyDown={(e) => onKey(e, i)}
              className={`feature-step text-start py-5 ps-6 pe-2 ${on ? 'is-active' : ''}`}
            >
              <span className="block font-semibold leading-snug mb-1.5" style={{ fontSize: 'clamp(17px, 1.6vw, 20px)' }}>{s.title}</span>
              <span className="block leading-relaxed text-sm sm:text-[15px]">{s.text}</span>
            </button>
          )
        })}
      </div>
      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`} className={`min-w-0 order-1 ${flip ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="product-shot relative" style={{ aspectRatio: `1440 / ${tallest}` }}>
          {steps.map((s, i) => (
            <div
              key={s.shot}
              aria-hidden={i !== active}
              style={{ background: shotSources(s.shot, locale).fill }}
              className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <ShotImage shot={s.shot} locale={locale} sizes="(min-width: 1024px) 700px, 92vw" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
