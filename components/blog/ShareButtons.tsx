'use client'

import { useState } from 'react'
import { shareLinks } from '@/lib/content/share'
import type { Locale } from '@/lib/i18n'

const COPY: Record<Locale, { heading: string; whatsapp: string; linkedin: string; x: string; copy: string; copied: string }> = {
  en: { heading: 'Share this article', whatsapp: 'Share on WhatsApp', linkedin: 'Share on LinkedIn', x: 'Share on X', copy: 'Copy link', copied: 'Link copied' },
  ar: { heading: 'شارك هذه المقالة', whatsapp: 'شارك عبر واتساب', linkedin: 'شارك على لينكدإن', x: 'شارك على X', copy: 'نسخ الرابط', copied: 'تم نسخ الرابط' },
}

const buttonClass = 'w-10 h-10 rounded-full flex items-center justify-center transition-colors'
const buttonStyle = { background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }

/**
 * Share bar under a blog post: WhatsApp (the main sharing channel in Saudi
 * Arabia), LinkedIn, X and copy-link. Links are built from the canonical URL
 * passed in, so they are complete in the server-rendered HTML.
 */
export default function ShareButtons({ url, title, locale }: { url: string; title: string; locale: Locale }) {
  const t = COPY[locale]
  const links = shareLinks(url, title)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure context, permissions): nothing to do.
    }
  }

  return (
    <div className="mt-8 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
      <h3 className="text-lg font-semibold text-white mb-4">{t.heading}</h3>
      <div className="flex gap-3 items-center">
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={t.whatsapp} title={t.whatsapp} className={buttonClass} style={buttonStyle}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.9 9.88m8.41-18.29A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41"/></svg>
        </a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.linkedin} title={t.linkedin} className={buttonClass} style={buttonStyle}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href={links.x} target="_blank" rel="noopener noreferrer" aria-label={t.x} title={t.x} className={buttonClass} style={buttonStyle}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button type="button" onClick={copy} aria-label={t.copy} title={t.copy} className={buttonClass} style={buttonStyle}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
        </button>
        <span role="status" aria-live="polite" className="text-sm" style={{ color: 'var(--accent-hi)' }}>
          {copied ? t.copied : ''}
        </span>
      </div>
    </div>
  )
}
