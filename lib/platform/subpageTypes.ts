import type { DetailPageData } from './detailPages'
import type { IntegrationGroup } from './integrations'

/**
 * A page inside a solution, served at /solutions/<solution>/<slug>/: either
 * one module of the solution, or the solution seen by one kind of customer.
 */
export interface SolutionSubpage extends DetailPageData {
  /** Key of the solution it belongs to (lib/platform/solutions.ts). */
  solution: string
  kind: 'module' | 'audience'
  /** A module's section on its solution page (the section's anchor id), where it is linked from. */
  area?: string
  /** Modules of the same solution to link to (slugs). */
  modules: string[]
  /** Groups on the /integrations/ page to link to (lib/platform/integrations.ts). */
  integrations: IntegrationGroup[]
}
