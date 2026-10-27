import { subpageRoute } from '@/components/solutions/subpageRoute'

// One page per module: /ar/solutions/<solution>/<page>/.
const route = subpageRoute('ar')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
