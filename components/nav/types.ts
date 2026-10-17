/** One link in a navigation menu. */
export interface NavLink {
  label: string
  description?: string
  /** Already-localised href, or an absolute URL. */
  href: string
  external?: boolean
  /** The page being viewed: highlighted, and announced as the current page. */
  current?: boolean
}

/** A group of links, with an optional heading. Groups stack in one column. */
export interface NavSection {
  heading?: string
  links: NavLink[]
}
