import type { LucideIcon } from 'lucide-react'

export interface MoreFeature {
  icon: LucideIcon
  title: string
  text: string
}

/** A short row of extra capabilities: an icon, a title and one line each. */
export default function MoreFeatures({ items, label }: { items: MoreFeature[]; label: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-faint mb-6 text-center lg:text-start">{label}</p>
      <ul className={`grid grid-cols-1 sm:grid-cols-2 ${items.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-8 gap-y-8`}>
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col gap-2 lg:border-s lg:ps-6" style={{ borderColor: 'var(--border)' }}>
            <span className="flex items-center gap-2.5 font-semibold text-strong">
              <Icon size={18} strokeWidth={1.8} color="var(--accent-hi)" aria-hidden="true" />
              {title}
            </span>
            <span className="text-sm text-muted leading-relaxed">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
