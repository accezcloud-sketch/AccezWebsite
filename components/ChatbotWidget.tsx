'use client'

import { useEffect, useRef, useState } from 'react'

const WIDGET_ORIGIN = 'https://accez-chatbot-production.up.railway.app'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== WIDGET_ORIGIN) return
      const data = e.data
      if (data && typeof data === 'object') {
        const signal = String(data.type ?? data.action ?? '')
        if (typeof data.isOpen === 'boolean') {
          setIsOpen(data.isOpen)
          return
        }
        if (/open|expand|maximize/i.test(signal)) setIsOpen(true)
        else if (/close|collapse|minimize/i.test(signal)) setIsOpen(false)
      } else if (typeof data === 'string') {
        if (/open|expand/i.test(data)) setIsOpen(true)
        else if (/close|collapse/i.test(data)) setIsOpen(false)
      }
    }

    // Fallback: when the user taps inside the iframe, the parent window
    // loses focus and the iframe becomes the active element. Use that as
    // a heuristic to expand on mobile if the widget doesn't postMessage.
    const handleBlur = () => {
      requestAnimationFrame(() => {
        if (document.activeElement === iframeRef.current) {
          setIsOpen(true)
        }
      })
    }

    window.addEventListener('message', handleMessage)
    window.addEventListener('blur', handleBlur)
    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <iframe
      ref={iframeRef}
      src={`${WIDGET_ORIGIN}/widget`}
      className={`fixed bottom-0 right-0 z-[9999] border-0 bg-transparent transition-[width,height] duration-200 ${
        isOpen
          ? 'w-full h-[100dvh] md:w-[400px] md:h-[600px]'
          : 'w-[90px] h-[90px] md:w-[110px] md:h-[110px]'
      }`}
      allow="clipboard-write"
    />
  )
}
