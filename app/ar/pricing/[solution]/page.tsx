import { pricingRoute } from '@/components/pricing/pricingRoute'

// One pricing page per solution: /ar/pricing/<solution>/.
const route = pricingRoute('ar')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
