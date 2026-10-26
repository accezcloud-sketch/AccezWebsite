/**
 * Routes of the free resources (the Saudi regulations hub, the downloads and
 * the calculator), written without locale prefix or slashes, as the rest of
 * the site's route helpers expect. One place, so the menu, sitemap, llms.txt
 * and the pages themselves cannot disagree.
 */
export const REGULATIONS_HUB_ROUTE = 'resources/saudi-regulations'
export const DOWNLOADS_ROUTE = 'resources/downloads'
export const CALCULATOR_ROUTE = 'tools/rental-revenue-calculator'

/** A checklist's own page. */
export const checklistRoute = (id: string) => `${DOWNLOADS_ROUTE}/${id}`

/** A checklist's printable PDF in public/downloads/, per language. */
export const checklistPdfPath = (id: string, locale: 'en' | 'ar') => `/downloads/${id}-${locale}.pdf`

/** Menu labels of the resources (kept here, not with the page data, so the header's client code stays small). */
export const RESOURCE_MENU = {
  regulations: { en: 'Saudi regulations', ar: 'الأنظمة السعودية' },
} as const
