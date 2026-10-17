import { solutionRoute } from '@/components/solutions/solutionRoute'

// One page per solution: /ar/solutions/<solution>/.
const route = solutionRoute('ar')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
