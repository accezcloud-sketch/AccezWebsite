import { solutionRoute } from '@/components/solutions/solutionRoute'

// One page per solution: /solutions/<solution>/.
const route = solutionRoute('en')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
