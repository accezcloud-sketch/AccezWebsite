'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from './useScrollReveal'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

/** Fades and lifts its content in when scrolled into view (see useScrollReveal). */
export default function FadeUp({ children, delay = 0, duration = 0.6, distance = 28, className }: FadeUpProps) {
  const ref = useRef(null)
  const phase = useScrollReveal(ref)
  const hidden = phase === 'armed'

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y: distance } : { opacity: 1, y: 0 }}
      transition={hidden ? { duration: 0 } : { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
