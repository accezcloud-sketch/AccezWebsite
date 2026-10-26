import type { Metadata } from 'next'
import DownloadsPage from '@/components/resources/DownloadsPage'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { DOWNLOADS_COPY } from '@/lib/resources/checklists'
import { DOWNLOADS_ROUTE } from '@/lib/resources/routes'

// Free printable checklists (pages and PDFs) and the other free tools.
export const metadata: Metadata = staticPageMetadata({
  route: DOWNLOADS_ROUTE,
  locale: 'en',
  title: DOWNLOADS_COPY.en.metaTitle,
  description: DOWNLOADS_COPY.en.description,
})

export default function Page() {
  return <DownloadsPage locale="en" />
}
