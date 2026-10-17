'use client'

import { useEffect, useRef, useState } from 'react'

const TYPING_SPEED = 95
const DELETING_SPEED = 55
const PAUSE_AFTER_TYPE = 2400
const PAUSE_AFTER_DELETE = 500

type Phase = 'typing' | 'pausing' | 'deleting' | 'waiting'

/** Types, pauses on and deletes each phrase in turn. */
export function useTypewriter(strings: readonly string[]) {
  // Seeded with the first phrase, already typed, so the server-rendered page
  // shows a complete heading and the animation takes over after hydration.
  const first = strings[0] ?? ''
  const [displayText, setDisplayText] = useState(first)
  const [stringIndex, setStringIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('pausing')
  const [charIndex, setCharIndex] = useState(first.length)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Language switch: restart from the new set's first phrase, already typed,
    // so the heading is never momentarily blank.
    const next = strings[0] ?? ''
    setDisplayText(next)
    setStringIndex(0)
    setCharIndex(next.length)
    setPhase('pausing')
  }, [strings])

  useEffect(() => {
    const current = strings[stringIndex] ?? ''
    const clear = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }

    if (phase === 'typing') {
      if (charIndex < current.length) {
        timerRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        }, TYPING_SPEED)
      } else {
        timerRef.current = setTimeout(() => setPhase('pausing'), PAUSE_AFTER_TYPE)
      }
    }
    if (phase === 'pausing') {
      timerRef.current = setTimeout(() => setPhase('deleting'), 0)
    }
    if (phase === 'deleting') {
      if (charIndex > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        }, DELETING_SPEED)
      } else {
        timerRef.current = setTimeout(() => {
          setStringIndex((i) => (i + 1) % strings.length)
          setPhase('waiting')
        }, PAUSE_AFTER_DELETE)
      }
    }
    if (phase === 'waiting') {
      timerRef.current = setTimeout(() => setPhase('typing'), 0)
    }
    return clear
  }, [phase, charIndex, stringIndex, strings])

  const isTyping = phase === 'typing' || phase === 'pausing'
  return { displayText, isTyping }
}
