/**
 * Site-wide facts used in more than one place (the root layout's metadata
 * and /llms.txt), kept here so they can't drift apart.
 */
export const SITE_NAME = 'Accez'

/** Appended to page titles by the root layout's title template. */
export const TITLE_SUFFIX = ` | ${SITE_NAME}`

/** Search results show roughly 60 characters of a title before cutting it. */
export const TITLE_MAX = 60

/**
 * Homepage titles, used whole (no "| Accez" suffix: with it the English
 * title would pass TITLE_MAX). Category first, then the market.
 */
export const HOME_TITLE = {
  en: 'Property Management & Booking Software in Saudi Arabia',
  ar: 'برنامج إدارة العقارات والحجوزات في السعودية | أكسيز',
} as const

/** The site's default meta description: what Accez is, in one sentence pair. */
export const SITE_DESCRIPTION =
  'One platform, two solutions: property management for rentals, hotels and owners, and a marketplace where service providers get booked. Built for Saudi Arabia.'

/** The company's X (Twitter) account, attributed on link previews. */
export const X_HANDLE = '@accez_cloud'
