/** Centered section heading: eyebrow, two-tone title and optional subtitle. */
export default function SectionHeader({
  eyebrow, lead, accent, subtitle, isRTL,
}: { eyebrow: string; lead: string; accent: string; subtitle?: string; isRTL: boolean }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-px w-8" style={{ background: isRTL ? 'linear-gradient(to left, transparent, var(--accent))' : 'linear-gradient(to right, transparent, var(--accent))' }} />
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent-hi)' }}>{eyebrow}</span>
        <div className="h-px w-8" style={{ background: isRTL ? 'linear-gradient(to right, transparent, var(--accent))' : 'linear-gradient(to left, transparent, var(--accent))' }} />
      </div>
      <h2
        className="text-strong font-bold text-center leading-tight tracking-tight"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}
      >
        {lead}{' '}
        <span style={{ background: 'linear-gradient(135deg, var(--grad-from), var(--grad-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{accent}</span>
      </h2>
      {subtitle && (
        <p className="text-center max-w-2xl mx-auto mt-4 leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  )
}
