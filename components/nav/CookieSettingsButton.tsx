'use client'

import { CONSENT_OPEN_EVENT } from '@/lib/analytics/consent'

/** The footer's "Cookie settings": reopens the consent banner. */
export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className="transition-colors duration-150 hover:text-muted underline-offset-2 hover:underline"
    >
      {label}
    </button>
  )
}
