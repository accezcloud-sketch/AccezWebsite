/**
 * The pages inside each solution, besides its main page: one per module and
 * one per kind of customer, served at /solutions/<solution>/<slug>/. The
 * routes, the sitemap, llms.txt, the footer and the solution pages all read
 * this list, so a new page is a new entry in modules.ts or audiences.ts.
 */
import { solutionByKey } from './solutions'
import { MODULE_PAGES } from './modules'
import type { SolutionSubpage } from './subpageTypes'

export type { SolutionSubpage } from './subpageTypes'

export const SOLUTION_SUBPAGES: SolutionSubpage[] = [...MODULE_PAGES]

/** The page's route without locale, e.g. /solutions/property-managers/channel-manager. */
export function subpageHref(page: Pick<SolutionSubpage, 'solution' | 'slug'>): string {
  const solution = solutionByKey(page.solution)
  if (!solution) throw new Error(`Unknown solution: ${page.solution}`)
  return `${solution.href}/${page.slug}`
}

export function subpageBySlug(solutionKey: string, slug: string): SolutionSubpage | undefined {
  return SOLUTION_SUBPAGES.find((p) => p.solution === solutionKey && p.slug === slug)
}

/** A solution's modules or customer pages, in registry order. */
export function subpagesOf(solutionKey: string, kind: SolutionSubpage['kind']): SolutionSubpage[] {
  return SOLUTION_SUBPAGES.filter((p) => p.solution === solutionKey && p.kind === kind)
}

/** The modules shown in one section of a solution page (by the section's anchor id). */
export function modulesInArea(solutionKey: string, area: string): SolutionSubpage[] {
  return subpagesOf(solutionKey, 'module').filter((p) => p.area === area)
}
