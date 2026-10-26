import { ExternalLink } from 'lucide-react'

/** A link to another site: opens in a new tab and says so to screen readers. */
export default function ExternalLinkText({ href, children, newTabLabel }: { href: string; children: React.ReactNode; newTabLabel: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 underline underline-offset-2 hover:no-underline" style={{ color: 'var(--accent-hi)' }}>
      <span>{children}</span>
      <ExternalLink size={14} strokeWidth={1.75} className="mt-[0.3em] shrink-0" aria-hidden="true" />
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  )
}
