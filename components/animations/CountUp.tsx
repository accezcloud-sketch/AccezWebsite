'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  value: string
  duration?: number
  className?: string
}

function parseValue(str: string): { num: number | null; prefix: string; suffix: string } {
  const match = str.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/)
  if (!match) return { num: null, prefix: '', suffix: str }
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' })
  const [displayed, setDisplayed] = useState('0')
  const hasAnimated = useRef(false)

  const { num, prefix, suffix } = parseValue(value)

  useEffect(() => {
    if (num === null) {
      setDisplayed(value)
      return
    }
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    const isDecimal = num % 1 !== 0

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      const current = eased * num
      setDisplayed(
        prefix + (isDecimal ? current.toFixed(1) : Math.round(current).toString()) + suffix
      )
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, num, prefix, suffix, duration, value])

  return <span ref={ref} className={className}>{displayed}</span>
}
