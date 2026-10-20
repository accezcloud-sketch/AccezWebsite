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

/** A residential district of Riyadh from above, at dusk. Photo by Stijn te Strake. Property management. */
export const RIYADH_HOMES: HeroBackdrop = {
  src: '/images/hero/riyadh-homes-1600.webp',
  srcSet: '/images/hero/riyadh-homes-1600.webp 1600w, /images/hero/riyadh-homes-2400.webp 2400w',
  // Cropped to the rooftops (the original's upper part is plain sky).
  position: 'center 35%',
}

/** Central Riyadh from above, a city of businesses. Photo by Datingscout. Service providers. */
export const RIYADH_CENTRE: HeroBackdrop = {
  src: '/images/hero/riyadh-centre-1600.webp',
  srcSet: '/images/hero/riyadh-centre-1600.webp 1600w, /images/hero/riyadh-centre-2400.webp 2400w',
  position: 'center 45%',
}
