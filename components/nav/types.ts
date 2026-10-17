/** One link in a navigation menu. */
export interface NavLink {
  label: string
  description?: string
  /** Already-localised href, or an absolute URL. */
  href: string
  external?: boolean
}

/** A group of links, with an optional heading. Groups stack in one column. */
export interface NavSection {
  heading?: string
  links: NavLink[]
}
