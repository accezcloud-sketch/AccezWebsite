import IntegrationsHub, { integrationsHubMetadata } from '@/components/integrations/IntegrationsHub'

// /integrations/: every service Accez connects to.
export const metadata = integrationsHubMetadata('en')

export default function Page() {
  return <IntegrationsHub locale="en" />
}
