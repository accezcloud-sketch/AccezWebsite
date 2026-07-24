'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ height: 1, background: color, originX: 0 }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    />
  )
}
