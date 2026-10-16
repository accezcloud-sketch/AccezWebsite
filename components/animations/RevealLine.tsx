'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from './useScrollReveal'

interface RevealLineProps {
  className?: string
  delay?: number
  color?: string
}

export default function RevealLine({
  className,
  delay = 0,
  color = 'rgba(49, 159, 212,0.4)',
}: RevealLineProps) {
  const ref = useRef(null)
  const phase = useScrollReveal(ref, '-40px 0px')
  const hidden = phase === 'armed'

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ height: 1, background: color, originX: 0 }}
      initial={false}
      animate={hidden ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
      transition={hidden ? { duration: 0 } : { duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    />
  )
}
