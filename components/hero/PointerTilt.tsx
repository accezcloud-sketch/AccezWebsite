'use client'

import { useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/components/visuals/usePrefersReducedMotion'

const MAX_DEG = 6

/**
 * Tilts its content in 3D toward the pointer, a few degrees at most. Off for
 * touch input and for visitors who ask for less motion.
 */
export default function PointerTilt({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || reduced || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1100px) rotateY(${x * MAX_DEG * 2}deg) rotateX(${-y * MAX_DEG * 2}deg)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="w-full flex justify-center lg:justify-end"
      style={{ transition: 'transform .35s cubic-bezier(.23,1,.32,1)', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
