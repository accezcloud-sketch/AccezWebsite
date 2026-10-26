import { Info } from 'lucide-react'

/** A short boxed note (general information, estimate only), read as a note by assistive tech. */
export default function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="note" className="ui-card flex items-start gap-4 p-5 text-start">
      <span className="ui-icon no-print" aria-hidden="true"><Info size={20} color="var(--accent-hi)" strokeWidth={1.75} /></span>
      <div className="min-w-0">
        <p className="text-strong font-semibold mb-1" style={{ fontSize: 15 }}>{title}</p>
        <p className="text-muted leading-relaxed" style={{ fontSize: 14.5 }}>{children}</p>
      </div>
    </div>
  )
}
