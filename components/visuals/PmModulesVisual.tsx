'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { PILLARS } from '@/components/ProductScope'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const MODULES = PILLARS.flatMap((p) => p.modules)
const STEP_MS = 1800

/**
 * Every property-management module as a tile, with the highlight moving from
 * one to the next: the whole operation in one account. Decorative; the same
 * modules are listed as text on the solution page.
 */
export default function PmModulesVisual() {
  const { language } = useLanguage()
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % MODULES.length), STEP_MS)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <div className="relative w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-3xl blur-[80px] opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 68%)' }} />
      <div className="relative rounded-2xl p-3 sm:p-4 grid grid-cols-2 gap-2.5" style={{ background: 'var(--panel)', border: '1px solid var(--border-hi)', boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))' }}>
        {MODULES.map((mod, i) => {
          const Icon = mod.icon
          const on = i === active
          return (
            <div
              key={mod.title}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 sm:px-3 sm:py-3 transition-all duration-500"
              style={{
                background: on ? 'var(--accent-dim)' : 'var(--surface)',
                border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                transform: on ? 'translateY(-2px)' : 'none',
              }}
            >
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: on ? 'var(--accent-solid)' : 'var(--accent-dim)' }}>
                <Icon size={15} color={on ? '#fff' : 'var(--accent-hi)'} strokeWidth={1.9} />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-strong leading-tight">{language === 'ar' ? mod.titleAr : mod.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
