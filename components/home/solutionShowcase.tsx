import type { ComponentType } from 'react'
import ProductScope from '@/components/ProductScope'
import Capabilities from '@/components/Capabilities'
import ServiceProviders from '@/components/ServiceProviders'

function PropertyManagementShowcase() {
  return (
    <>
      <ProductScope />
      <Capabilities />
    </>
  )
}

/**
 * The homepage sections for each platform solution (keys from
 * lib/platform/solutions.ts), shown in that solution's chapter. A new
 * solution adds its sections here.
 */
export const SOLUTION_SHOWCASE: Record<string, ComponentType> = {
  'property-managers': PropertyManagementShowcase,
  'service-providers': ServiceProviders,
}
