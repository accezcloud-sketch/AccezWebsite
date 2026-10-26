import type { Metadata } from 'next'
import RegulationsHubPage from '@/components/resources/RegulationsHubPage'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { REGULATIONS_HUB_ROUTE } from '@/lib/resources/routes'
import { REGULATIONS_COPY } from '@/lib/resources/saudiRegulations'

// The Saudi regulations hub: what each rule covers, its authority and our guides.
export const metadata: Metadata = staticPageMetadata({
  route: REGULATIONS_HUB_ROUTE,
  locale: 'ar',
  title: REGULATIONS_COPY.ar.metaTitle,
  description: REGULATIONS_COPY.ar.description,
})

export default function Page() {
  return <RegulationsHubPage locale="ar" />
}
