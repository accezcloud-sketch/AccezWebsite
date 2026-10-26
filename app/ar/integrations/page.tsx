import IntegrationsHub, { integrationsHubMetadata } from '@/components/integrations/IntegrationsHub'

// /ar/integrations/: every service Accez connects to.
export const metadata = integrationsHubMetadata('ar')

export default function Page() {
  return <IntegrationsHub locale="ar" />
}
