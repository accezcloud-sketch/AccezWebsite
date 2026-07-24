'use client'

import { useState } from 'react'

export interface StackItem {
  id: string
  label: string
  /** Accent colour for the leading dot. */
  dotColor: string
  badge?: React.ReactNode
  /** Rendered only while this card is the open one. */
  body: React.ReactNode
}

interface CapabilityStackProps {
  items: StackItem[]
  activeIndex: number
  onSelect: (index: number) => void
}

/**
 * Vertical offset between two collapsed headers. Must stay larger than the
 * label's text band (roughly HEAD_H / 2 + 10) or the card in front clips the
 * bottom of the label behind it.
 */
const ROW = 40
/** Horizontal inset per side for each level further back in the stack. */
const STEP = 22
/** Height of a collapsed header. */
const HEAD_H = 48
/**
 * Height of the open card. Sized to the tallest body, which is the carousel
 * (a 2:1 image plus its dot row) in the right hand column.
 */
const OPEN_H = 412
/** Lift applied to a collapsed header on hover. */
const HOVER_LIFT = 8

export default function CapabilityStack({
  items,
  activeIndex,
  onSelect,
}: CapabilityStackProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const n = items.length

  // Collapsed headers stack upwards above the open card, so the open card
  // always sits at the same offset from the top of the container.
  const headerStackH = ROW * (n - 1)

  return (
    <div
      className="relative w-full"
      style={{
        height: headerStackH + OPEN_H,
        // Contain the cards' z-index (up to 100) in their own stacking context
        // so they can never paint above the fixed header (z-50) while scrolling.
        isolation: 'isolate',
      }}
    >
      {items.map((item, i) => {
        // Cyclic distance from the open card. Clicking a card behind the open
        // one brings it forward and pushes the previous card to the back.
        const depth = (i - activeIndex + n) % n
        const isOpen = depth === 0
        // How far back in the visible pile this collapsed header sits.
        const back = n - depth
        const isHovered = hovered === i && !isOpen

        const top = isOpen
          ? headerStackH
          : headerStackH - ROW * back - (isHovered ? HOVER_LIFT : 0)

        const inset = isOpen ? 0 : 2 * STEP * back - (isHovered ? 14 : 0)

        return (
          <div
            key={item.id}
            className="absolute start-1/2 rounded-2xl overflow-hidden"
            style={{
              transform: 'translateX(-50%)',
              top,
              width: `calc(100% - ${inset}px)`,
              height: isOpen ? OPEN_H : HEAD_H,
              zIndex: isOpen ? 100 : 50 + depth,
              background: isOpen ? 'rgba(255,255,255,0.045)' : 'rgba(16,22,40,0.92)',
              border: isOpen
                ? '1px solid rgba(49, 159, 212,0.28)'
                : '1px solid rgba(255,255,255,0.07)',
              boxShadow: isOpen
                ? '0 18px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(49, 159, 212,0.10)'
                : isHovered
                  ? '0 12px 32px rgba(0,0,0,0.4)'
                  : '0 4px 16px rgba(0,0,0,0.3)',
              transition:
                'top .45s cubic-bezier(.23,1,.32,1), width .45s cubic-bezier(.23,1,.32,1), height .45s cubic-bezier(.23,1,.32,1), box-shadow .3s ease, background .3s ease, border-color .3s ease',
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          >
            {/* Header row: always visible, always the click target */}
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-3 px-6 text-start"
              style={{ height: HEAD_H }}
            >
              <span
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0 rotate-45"
                style={{
                  background: item.dotColor,
                  opacity: isOpen || isHovered ? 1 : 0.55,
                  transition: 'opacity .3s ease',
                }}
              />
              <span
                className="font-medium truncate"
                style={{
                  fontSize: 15,
                  color: isOpen ? '#f1f5f9' : isHovered ? '#e2e8f0' : '#8b98ad',
                  transition: 'color .3s ease',
                }}
              >
                {item.label}
              </span>
              {item.badge}
            </button>

            {/* Body: mounted only while open, so carousels reset per card */}
            {isOpen && (
              <div
                className="px-6 pb-6"
                style={{
                  height: OPEN_H - HEAD_H,
                  animation: 'stack-body-in .45s .1s both ease-out',
                }}
              >
                {item.body}
              </div>
            )}
          </div>
        )
      })}

      <style>{`
        @keyframes stack-body-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="stack-body-in"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
