import { subpageRoute } from '@/components/solutions/subpageRoute'

// One page per module and per kind of customer: /solutions/<solution>/<page>/.
const route = subpageRoute('en')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
