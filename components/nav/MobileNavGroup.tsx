'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { NavSection } from './types'

/** A collapsible group in the mobile menu, mirroring a desktop NavDropdown. */
export default function MobileNavGroup({ name, label, sections, onNavigate }: { name: string; label: string; sections: NavSection[]; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)
  // Fixed id (not useId), so server and browser agree.
  const id = `nav-mobile-${name}`

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-soft hover:text-strong font-medium transition-colors duration-200 py-2.5"
        aria-expanded={open}
        aria-controls={id}
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} aria-hidden="true">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ps-3 border-s"
            style={{ borderColor: 'var(--border)' }}
          >
            {sections.map((section, i) => (
              <div key={section.heading ?? i} className="pb-2">
                {section.heading && (
                  <p className="pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent-hi)' }}>
                    {section.heading}
                  </p>
                )}
                {section.links.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    onClick={onNavigate}
                    aria-current={link.current ? 'page' : undefined}
                    className={`block text-sm py-2 transition-colors hover:text-strong ${link.current ? 'text-strong font-semibold' : 'text-muted'}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
