/**
 * Routes of the free resources (the Saudi regulations hub), written without locale prefix or slashes, as the rest of
 * the site's route helpers expect. One place, so the menu, sitemap, llms.txt
 * and the pages themselves cannot disagree.
 */
export const REGULATIONS_HUB_ROUTE = 'resources/saudi-regulations'

/** Menu labels of the resources (kept here, not with the page data, so the header's client code stays small). */
export const RESOURCE_MENU = {
  regulations: { en: 'Saudi regulations', ar: 'الأنظمة السعودية' },
} as const
