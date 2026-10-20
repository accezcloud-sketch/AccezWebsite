import type { ReactNode } from 'react'

/** A photo behind the page top; files in two widths. */
export interface HeroBackdrop {
  src: string
  srcSet: string
  /** Which part of the photo stays in view when it is cropped (CSS object-position). */
  position?: string
}

/**
 * A page top in the product-first style: the headline, one or two lines, the
 * actions, and then the product itself underneath.
 *
 * With a backdrop, the top of the page is a photo with the text in white, and
 * the product overlaps the photo's lower edge (the photo covers roughly the
 * first screen, so the product sits half on the photo and half below it).
 */
export default function CenteredHero({
  eyebrow,
  title,
  accent,
  subtitle,
  actions,
  media,
  backdrop,
}: {
  eyebrow?: string
  title: string
  /** The end of the headline, set in the brand gradient. */
  accent?: string
  subtitle: string
  actions?: ReactNode
  /** The product: usually a real screenshot. */
  media?: ReactNode
  backdrop?: HeroBackdrop
}) {
  return (
    <section className={`relative overflow-hidden w-full ${backdrop ? 'hero-on-photo' : ''}`} style={{ background: 'var(--section-bg, var(--bg))' }}>
      {backdrop ? (
        <div className="hero-photo absolute inset-x-0 top-0 pointer-events-none" aria-hidden="true">
          <img src={backdrop.src} srcSet={backdrop.srcSet} sizes="100vw" alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: backdrop.position }} />
          <div className="absolute inset-0 hero-photo-shade" />
          <div className="hero-photo-fade" />
        </div>
      ) : (
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: '70%', background: 'radial-gradient(110% 60% at 50% 0%, var(--glow) 0%, var(--glow-fade) 32%, transparent 64%)' }}
          aria-hidden="true"
        />
      )}
      <div className="page-top relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {eyebrow && <span className="anim-fade-up-2 ui-chip mb-5">{eyebrow}</span>}
          <h1 className="hero-title anim-fade-up-2 hero-display text-strong leading-[1.08] tracking-tight mb-5" style={{ fontSize: 'clamp(34px, 5.4vw, 64px)' }}>
            {title}{accent && <> <span className="grad-text">{accent}</span></>}
          </h1>
          <p className="hero-subtitle anim-fade-up-3 text-muted leading-relaxed max-w-2xl mb-8" style={{ fontSize: 'clamp(15px, 1.9vw, 18px)' }}>{subtitle}</p>
          {actions && <div className="anim-fade-up-4 w-full flex justify-center">{actions}</div>}
        </div>
        {media && <div className="anim-fade-up-5 mt-12 lg:mt-16 max-w-3xl mx-auto">{media}</div>}
      </div>
    </section>
  )
}
