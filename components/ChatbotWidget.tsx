'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useDocumentTheme } from '@/lib/theme/useDocumentTheme'
import type { Theme } from '@/lib/theme/theme'

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

  // The assistant switches between light and dark itself; the site tells it which
  // theme the page shows, once in its address and again on every change.
  const theme = useDocumentTheme()
  const [firstTheme, setFirstTheme] = useState<Theme | null>(null)
  useEffect(() => {
    if (theme && !firstTheme) setFirstTheme(theme)
  }, [theme, firstTheme])
  const tellTheme = () => {
    if (theme) iframeRef.current?.contentWindow?.postMessage({ type: 'accez-theme', theme }, WIDGET_ORIGIN)
  }
  useEffect(tellTheme, [theme])

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

  // The assistant is a separate app in a frame; load it once the page itself
  // has loaded and the browser is idle, so it never competes with the page.
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    let cancelled = false
    // Safari has no requestIdleCallback; a short timeout stands in for it.
    const hasIdle = typeof window.requestIdleCallback === 'function'
    let idleId = 0
    const ready = () => {
      if (cancelled) return
      idleId = hasIdle ? window.requestIdleCallback(() => setIdle(true), { timeout: 2000 }) : globalThis.setTimeout(() => setIdle(true), 200) as unknown as number
    }
    if (document.readyState === 'complete') ready()
    else window.addEventListener('load', ready, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', ready)
      if (hasIdle) window.cancelIdleCallback(idleId)
      else globalThis.clearTimeout(idleId)
    }
  }, [])

  // Wait for the page's theme, so the assistant opens in it rather than switching after.
  if (!firstTheme || !idle) return null

  return (
    <iframe
      ref={iframeRef}
      src={`${WIDGET_ORIGIN}/widget?theme=${firstTheme}`}
      className={`fixed bottom-0 right-0 z-[9999] border-0 bg-transparent transition-[width,height] duration-200 ${
        isOpen
          ? 'w-full h-[100dvh] md:w-[400px] md:h-[600px]'
          : 'w-[90px] h-[90px] md:w-[110px] md:h-[110px]'
      }`}
      // The frame states the same colour scheme as the assistant's page inside it;
      // if they differed, browsers would paint an opaque box behind the transparent page.
      style={{ colorScheme: theme ?? firstTheme }}
      onLoad={() => {
        tellLanguage()
        tellTheme()
      }}
      allow="clipboard-write"
    />
  )
}
