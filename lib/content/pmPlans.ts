/**
 * Property-manager plan prices in SAR: the one source for the plans section,
 * the pricing FAQ answer, the structured data offers and llms.txt, so a price
 * reads the same everywhere it appears. Each price is the only price shown
 * (no struck-through "original" price, no discount label).
 */
export const PM_PLAN_PRICES = {
  free: { monthly: 0, yearly: 0 },
  basic: { monthly: 40, yearly: 480 },
  professional: { monthly: 150, yearly: 1800 },
} as const

export type PricedPmPlan = keyof typeof PM_PLAN_PRICES

/** Plans on the property-manager pricing page, Enterprise (custom price) included. */
export const PM_PLAN_COUNT = Object.keys(PM_PLAN_PRICES).length + 1

/** Monthly prices of the plans that have a listed price, lowest first. */
export function pmMonthlyPrices(): number[] {
  return Object.values(PM_PLAN_PRICES).map((p) => p.monthly).sort((a, b) => a - b)
}

/** "SAR 40" in English, "40 ريال" in Arabic, as the plans section shows it. */
export function formatSar(amount: number, locale: 'en' | 'ar'): string {
  return locale === 'ar' ? `${amount} ريال` : `SAR ${amount}`
}
