import type { ReactNode } from 'react'
import type { HeroBackdrop } from './CenteredHero'

/**
 * A page's closing call to action, set over a photo: the headline, one line
 * and the actions in white on a dark shade, so the page ends on a single
 * clear next step.
 */
export default function PhotoCta({ title, subtitle, actions, photo }: {
  title: string
  subtitle: string
  actions: ReactNode
  photo: HeroBackdrop
}) {
  return (
    <section className="hero-on-photo relative overflow-hidden w-full">
      <img src={photo.src} srcSet={photo.srcSet} sizes="100vw" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: photo.position }} aria-hidden="true" />
      <div className="absolute inset-0 hero-photo-shade" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center py-28 lg:py-36">
        <h2 className="hero-title hero-display tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 4.4vw, 52px)' }}>{title}</h2>
        <p className="hero-subtitle mx-auto mb-9" style={{ fontSize: 'clamp(15px, 1.8vw, 18px)' }}>{subtitle}</p>
        {actions}
      </div>
    </section>
  )
}
