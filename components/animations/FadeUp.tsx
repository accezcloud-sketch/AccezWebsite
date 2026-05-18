'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  distance = 28,
  className,
  once = true,
}: FadeUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
