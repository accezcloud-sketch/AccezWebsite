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

/** Central Riyadh from above (Al Faisaliah and the business district). Photo by Datingscout. Property management. */
export const RIYADH_CENTRE: HeroBackdrop = {
  src: '/images/hero/riyadh-centre-1600.webp',
  srcSet: '/images/hero/riyadh-centre-1600.webp 1600w, /images/hero/riyadh-centre-2400.webp 2400w',
  position: 'center 45%',
}

/** A busy shopping centre: many kinds of business, people coming and going. Photo by Soonmok Kwon. Service providers. */
export const SHOPPING_CENTRE: HeroBackdrop = {
  src: '/images/hero/shopping-centre-1600.webp',
  srcSet: '/images/hero/shopping-centre-1600.webp 1600w, /images/hero/shopping-centre-2400.webp 2400w',
  position: 'center 45%',
}
