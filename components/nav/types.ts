/** One link in a navigation menu. */
export interface NavLink {
  label: string
  description?: string
  /** Already-localised href, or an absolute URL. */
  href: string
  external?: boolean
}

/**
 * A group of links. Groups stack in one column. With `headingHref` the heading
 * is itself a link (a solution's main page) and the links sit under it.
 */
export interface NavSection {
  heading?: string
  headingHref?: string
  links: NavLink[]
}
