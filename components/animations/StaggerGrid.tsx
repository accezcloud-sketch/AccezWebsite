'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StaggerGridProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

const container = (staggerDelay: number, initialDelay: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
})

const item = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
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
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container(staggerDelay, initialDelay)}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}
