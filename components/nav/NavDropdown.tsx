'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { NavSection } from './types'

const HOVER_OPEN_MS = 180
const HOVER_CLOSE_MS = 350

interface NavDropdownProps {
  label: string
  sections: NavSection[]
  /** Which edge of the trigger the panel lines up with. */
  align?: 'start' | 'end'
  triggerClassName: string
  /** The page being viewed belongs to this menu. */
  active?: boolean
}

/**
 * A header menu (W3C disclosure-navigation pattern: a button with
 * aria-expanded/aria-controls revealing plain links). Opens on click or tap
 * immediately, and on hover after a short delay; closes a little after the
 * pointer leaves, so passing over it or moving diagonally into the panel
 * doesn't make it flicker (NN/g, Baymard: 300-500ms). Escape closes it and
 * returns focus to the trigger; clicking outside closes it.
 * Sections stack in one column, and the panel is as wide as its text.
 */
export default function NavDropdown({ label, sections, align = 'start', triggerClassName, active = false }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current)
  }
  const openSoon = () => {
    clearTimer()
    timer.current = setTimeout(() => setOpen(true), HOVER_OPEN_MS)
  }
  const closeSoon = () => {
    clearTimer()
    timer.current = setTimeout(() => setOpen(false), HOVER_CLOSE_MS)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  useEffect(() => clearTimer, [])

  return (
    <div
      ref={rootRef}
      className="relative h-16 flex items-center"
      onMouseEnter={openSoon}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        // Close when focus leaves the whole menu (keyboard users tabbing on).
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${triggerClassName} inline-flex items-center gap-1${active ? ' nav-active' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          clearTimer()
          setOpen((v) => !v)
        }}
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`absolute top-full ${align === 'end' ? 'end-0' : 'start-0'}`}
            style={{ paddingTop: 12 }}
          >
            <div className="nav-panel rounded-2xl p-2 w-max flex flex-col" style={{ minWidth: 220, maxWidth: 340 }}>
              {sections.map((section, i) => (
                <div key={section.heading ?? i} className="flex flex-col" style={i > 0 ? { borderTop: '1px solid var(--border)', marginTop: 4, paddingTop: 4 } : undefined}>
                  {section.heading && (
                    <p className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-hi)' }}>
                      {section.heading}
                    </p>
                  )}
                  {section.links.map((link) => (
                    <a
                      key={link.href + link.label}
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => setOpen(false)}
                      aria-current={link.current ? 'page' : undefined}
                      className={`nav-item block rounded-xl px-3 py-2.5${link.current ? ' is-current' : ''}`}
                    >
                      <span className="block text-sm font-semibold text-strong">{link.label}</span>
                      {link.description && <span className="block text-xs mt-0.5 text-faint">{link.description}</span>}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
