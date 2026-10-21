import { LegalChooser } from '@/components/legal/LegalChooser'
import { legalChooserMetadata } from '@/lib/legal/documents'

// The bare address asks which version applies; links published before the
// per-solution split keep working.
export const metadata = legalChooserMetadata('privacy', 'ar')

export default function Page() {
  return <LegalChooser doc="privacy" locale="ar" />
}
