'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  ariaLabel: string
  isRTL?: boolean
  className?: string
}

/**
 * Fully themed custom select. Replaces native <select> so the open list matches
 * the dark brand (no OS-default light list / green highlight). Keyboard: Enter/
 * Space/ArrowDown open, Escape closes, Arrow keys move, Enter selects.
 */
export default function Select({ value, onChange, options, ariaLabel, isRTL = false, className = '' }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value) ?? options[0]

  // Close on outside click.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // While open, capture wheel over the list so it scrolls ONLY the options,
  // never the page (works even when the list is short and not overflowing).
  useEffect(() => {
    const el = scrollRef.current
    if (!open || !el) return
    const onWheel = (e: WheelEvent) => {
      el.scrollTop += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [open])

  useEffect(() => {
    if (open) setActiveIdx(Math.max(0, options.findIndex((o) => o.value === value)))
  }, [open, options, value])

  const commit = (v: string) => {
    onChange(v)
    setOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(options.length - 1, i + 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(0, i - 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); commit(options[activeIdx].value) }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border transition-all duration-200 outline-none text-start focus:ring-2"
        style={{
          background: 'var(--surface)',
          borderColor: open ? 'var(--accent)' : 'var(--border-hi)',
          color: 'var(--text)',
          ['--tw-ring-color' as string]: 'var(--accent)',
        }}
      >
        <span className="truncate text-sm">{selected?.label}</span>
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none', color: 'var(--text-muted)' }} aria-hidden="true">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute z-30 mt-2 w-full rounded-xl overflow-hidden p-1.5"
            style={{
              background: 'rgba(13, 23, 35, 0.98)',
              border: '1px solid var(--border-hi)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
            }}
            role="listbox"
            aria-label={ariaLabel}
          >
            <div ref={scrollRef} className="max-h-64 overflow-y-auto no-scrollbar" style={{ overscrollBehavior: 'contain' }}>
              {options.map((o, i) => {
                const isSelected = o.value === value
                const isActive = i === activeIdx
                return (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => commit(o.value)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className="w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-start text-sm transition-colors duration-100"
                    style={{
                      background: isActive ? 'var(--surface-hi)' : 'transparent',
                      color: isSelected ? 'var(--accent-hi)' : 'var(--text-muted)',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    <span className="truncate">{o.label}</span>
                    {isSelected && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
                        <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
