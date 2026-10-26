import { integrationRoute } from '@/components/integrations/integrationRoute'

// One page per integration: /ar/integrations/<integration>/.
const route = integrationRoute('ar')

export const dynamicParams = false
export const generateStaticParams = route.generateStaticParams
export const generateMetadata = route.generateMetadata
export default route.Page
