/**
 * The one section heading: a frosted label, a two-tone title and an optional
 * subtitle. Centred by default; `align="start"` sits it beside a visual.
 */
export default function SectionHeader({
  eyebrow, lead, accent, subtitle, headingLevel = 'h2', align = 'center', className = 'mb-12',
}: {
  eyebrow?: string
  lead: string
  accent?: string
  subtitle?: string
  /** Kept for callers that pass it; direction comes from the page. */
  isRTL?: boolean
  headingLevel?: 'h1' | 'h2'
  align?: 'center' | 'start'
  className?: string
}) {
  const Heading = headingLevel
  const centre = align === 'center'
  return (
    <div className={`${centre ? 'text-center' : 'text-center lg:text-start'} ${className}`}>
      {eyebrow && (
        <div className={`flex mb-4 ${centre ? 'justify-center' : 'justify-center lg:justify-start'}`}>
          <span className="ui-chip">{eyebrow}</span>
        </div>
      )}
      <Heading
        className="text-strong font-bold leading-tight tracking-tight"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}
      >
        {lead}
        {accent && (
          <>
            {' '}
            <span style={{ background: 'linear-gradient(135deg, var(--grad-from), var(--grad-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{accent}</span>
          </>
        )}
      </Heading>
      {subtitle && (
        <p className={`max-w-2xl mt-4 leading-relaxed ${centre ? 'mx-auto' : 'mx-auto lg:mx-0'}`} style={{ fontSize: 17, color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  )
}
