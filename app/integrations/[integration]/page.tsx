import { integrationRoute } from '@/components/integrations/integrationRoute'

// One page per integration: /integrations/<integration>/.
const route = integrationRoute('en')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
