'use client'

import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useScrollReveal } from './useScrollReveal'

interface StaggerGridProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

const container = (staggerDelay: number, initialDelay: number): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
})

const EASE_OUT: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98]

const item: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
}

export { item as staggerItem }

export default function StaggerGrid({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0,
}: StaggerGridProps) {
  const ref = useRef(null)
  // Children render visible in the static HTML; only grids that start below
  // the fold are hidden (off-screen) and staggered in on scroll.
  const phase = useScrollReveal(ref, '-60px 0px')

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container(staggerDelay, initialDelay)}
      initial={false}
      animate={phase === 'armed' ? 'hidden' : 'show'}
    >
      {children}
    </motion.div>
  )
}
