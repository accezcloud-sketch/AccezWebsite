import { legalVersionRoute } from '@/components/legal/legalVersionRoute'

// One version of the document per solution: /terms/<solution>/.
const route = legalVersionRoute('terms', 'en')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
