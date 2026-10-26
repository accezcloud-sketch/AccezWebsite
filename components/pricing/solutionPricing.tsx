import type { ComponentType } from 'react'
import type { Locale } from '@/lib/i18n'
import Pricing from '@/components/Pricing'
import ProviderPricing from '@/components/ProviderPricing'

/**
 * The plans component for each platform solution (keys from
 * lib/platform/solutions.ts). A new solution adds its plans component here.
 */
export const SOLUTION_PRICING: Record<string, ComponentType<{ headingLevel?: 'h1' | 'h2'; locale: Locale }>> = {
  'property-managers': Pricing,
  'service-providers': ProviderPricing,
}
