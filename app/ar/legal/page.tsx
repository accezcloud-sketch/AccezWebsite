import { LegalHub } from '@/components/legal/LegalIndex'
import { legalHubMetadata } from '@/lib/legal/documents'

export const metadata = legalHubMetadata('ar')

export default function Page() {
  return <LegalHub locale="ar" />
}
