'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

// Accez Assistant (the new bot, hosted on Railway). The previous bot's link is kept below so the team can switch back.
// const WIDGET_ORIGIN = 'https://accez-chatbot-production.up.railway.app' // previous bot
const WIDGET_ORIGIN = 'https://accezchatbot-production.up.railway.app'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const pathname = usePathname()
  const lang = pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en'
  // Tells the assistant which language the site is showing, so its labels and text direction follow the site.
  const tellLanguage = () => iframeRef.current?.contentWindow?.postMessage({ type: 'accez-lang', lang }, WIDGET_ORIGIN)
  useEffect(tellLanguage, [lang])

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

    // The assistant reports when it opens and closes ({ type: 'accez-assistant', isOpen }),
    // so the frame is only ever as big as what it shows. (A focus-based guess used to
    // expand it whenever it took focus, e.g. on right-click > Inspect, and never shrink.)
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
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
      // The assistant's page is a light page on a transparent background. If the frame
      // inherited the site's dark color-scheme, browsers would paint a white box behind
      // it in dark mode, so the frame states the same scheme as the page inside it.
      style={{ colorScheme: 'light' }}
      onLoad={tellLanguage}
      allow="clipboard-write"
    />
  )
}
