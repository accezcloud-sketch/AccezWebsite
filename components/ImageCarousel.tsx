'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export interface CarouselSlide {
  src: string
  caption: string
  captionAr: string
}

interface ImageCarouselProps {
  slides: CarouselSlide[]
  alt: string
  language: 'en' | 'ar'
  isRTL: boolean
  /** Milliseconds between automatic advances. Pass 0 to disable autoplay. */
  autoPlayMs?: number
  priority?: boolean
}

const AUTOPLAY_DEFAULT = 5000

export default function ImageCarousel({
  slides,
  alt,
  language,
  isRTL,
  autoPlayMs = AUTOPLAY_DEFAULT,
  priority = false,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  // Direction drives the slide animation: 1 = forward, -1 = backward.
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const total = slides.length

  const goTo = useCallback(
    (next: number, dir: number) => {
      setDirection(dir)
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index])

  // Autoplay, paused on hover/focus and when the user prefers reduced motion.
  const nextRef = useRef(next)
  nextRef.current = next
  useEffect(() => {
    if (!autoPlayMs || paused || total < 2) return
    if (typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => nextRef.current(), autoPlayMs)
    return () => clearInterval(id)
  }, [autoPlayMs, paused, total])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); isRTL ? prev() : next() }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); isRTL ? next() : prev() }
  }

  const slide = slides[index]
  // In RTL the visual travel direction is mirrored so "next" still feels forward.
  const offset = 40 * direction * (isRTL ? -1 : 1)

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      role="group"
      aria-roledescription="carousel"
      aria-label={alt}
      tabIndex={0}
    >
      <div
        className="relative aspect-[2/1] overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
      >
        {/* Default (sync) mode so the outgoing and incoming slides crossfade
            while both stay absolutely positioned in the frame. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0, x: offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -offset }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Image
              src={slide.src}
              alt={`${alt}: ${language === 'ar' ? slide.captionAr : slide.caption}`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 66vw"
              quality={100}
              unoptimized
              priority={priority && index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption pill */}
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between gap-3 pointer-events-none">
          <span
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 backdrop-blur-md"
            style={{
              background: 'rgba(8,12,24,0.72)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="font-bold" style={{ color: '#818cf8' }}>
              {index + 1}/{total}
            </span>
            <span className="mx-2 opacity-30">|</span>
            {language === 'ar' ? slide.captionAr : slide.caption}
          </span>
        </div>

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={isRTL ? next : prev}
              aria-label="Previous slide"
              className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 backdrop-blur-md"
              style={{
                background: 'rgba(8,12,24,0.7)',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={isRTL ? prev : next}
              aria-label="Next slide"
              className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110 backdrop-blur-md"
              style={{
                background: 'rgba(8,12,24,0.7)',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div
          className="flex items-center justify-center gap-2 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 22 : 7,
                height: 7,
                background: i === index ? '#6366f1' : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
