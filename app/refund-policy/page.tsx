import { LegalChooser } from '@/components/legal/LegalIndex'
import { legalChooserMetadata } from '@/lib/legal/documents'

// The bare address asks which version applies; links published before the
// per-solution split keep working.
export const metadata = legalChooserMetadata('refund-policy', 'en')

export default function Page() {
  return <LegalChooser doc="refund-policy" locale="en" />
}
