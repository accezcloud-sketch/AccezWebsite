import type { HeroBackdrop } from './CenteredHero'

/**
 * Photos behind page tops and closing sections. All from Unsplash, free
 * under the Unsplash License; files in public/images/hero/ in two widths.
 */

/** Riyadh at dusk (Kingdom Centre). Photo by Ibrahim Abdullah. Homepage. */
export const RIYADH: HeroBackdrop = {
  src: '/images/hero/riyadh-1600.webp',
  srcSet: '/images/hero/riyadh-1600.webp 1600w, /images/hero/riyadh-2880.webp 2880w',
  // Keep the tower's top in view when the band is wide and short.
  position: 'center 22%',
}

/** A modern apartment block with a landscaped courtyard. Photo by Bohdan Loik. Property management. */
export const APARTMENTS: HeroBackdrop = {
  src: '/images/hero/apartments-1600.webp',
  srcSet: '/images/hero/apartments-1600.webp 1600w, /images/hero/apartments-2400.webp 2400w',
  position: 'center 40%',
}

/** A barbershop with a leather chair. Photo by Redd Francisco. Service providers. */
export const BARBERSHOP: HeroBackdrop = {
  src: '/images/hero/barbershop-1600.webp',
  srcSet: '/images/hero/barbershop-1600.webp 1600w, /images/hero/barbershop-2400.webp 2400w',
  position: 'center 55%',
}
