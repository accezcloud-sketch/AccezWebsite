'use client'

import { useState, type KeyboardEvent } from 'react'
import type { Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import ProductShot from '@/components/product/ProductShot'
import { SOLUTION_SHOWCASE } from './solutionShowcase'

const BASE = 'home-product'

/** The homepage's product view: one tab per solution, each showing its real dashboard. */
export default function HeroProductTabs({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0)
  const current = PLATFORM_SOLUTIONS[active]

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    // Arrow keys follow the reading direction.
    const dir = document.documentElement.dir === 'rtl' ? -step : step
    const to = (i + dir + PLATFORM_SOLUTIONS.length) % PLATFORM_SOLUTIONS.length
    setActive(to)
    document.getElementById(`${BASE}-tab-${to}`)?.focus()
  }

  return (
    <div>
      <div role="tablist" className="ui-tabs mx-auto mb-6 flex w-fit max-w-full">
        {PLATFORM_SOLUTIONS.map((s, i) => (
          <button
            key={s.key}
            id={`${BASE}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${BASE}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`ui-tab ${i === active ? 'is-active' : ''}`}
          >
            {s.role[locale]}
          </button>
        ))}
      </div>
      <div id={`${BASE}-panel`} role="tabpanel" aria-labelledby={`${BASE}-tab-${active}`}>
        <ProductShot key={current.key} shot={SOLUTION_SHOWCASE[current.key].dashboard} locale={locale} priority className="feature-shot-in" />
      </div>
    </div>
  )
}
