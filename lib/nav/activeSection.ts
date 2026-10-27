/**
 * Which top-level menu item the current page belongs to, so the header can
 * show where the visitor is. Paths are compared without the /ar prefix.
 */
export type NavSectionKey = 'solutions' | 'pricing' | 'blog' | 'support' | 'about' | 'resources'

const SECTIONS: [NavSectionKey, RegExp][] = [
  ['solutions', /^\/solutions(\/|$)/],
  ['pricing', /^\/pricing(\/|$)/],
  ['blog', /^\/blog(\/|$)/],
  ['support', /^\/support(\/|$)/],
  ['about', /^\/about(\/|$)/],
  ['resources', /^\/(faq|integrations|terms|privacy|refund-policy|resources)(\/|$)/],
]

export function activeNavSection(pathname: string): NavSectionKey | null {
  const path = pathname.replace(/^\/ar(?=\/|$)/, '') || '/'
  return SECTIONS.find(([, re]) => re.test(path))?.[0] ?? null
}

/** True when a menu link points at the page being viewed (trailing slash ignored). */
export function isCurrentPath(href: string, pathname: string): boolean {
  const norm = (p: string) => p.replace(/\/+$/, '') || '/'
  return norm(href) === norm(pathname)
}
