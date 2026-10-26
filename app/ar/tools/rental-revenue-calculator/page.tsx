import type { Metadata } from 'next'
import RentalCalculatorPage from '@/components/tools/RentalCalculatorPage'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { CALCULATOR_ROUTE } from '@/lib/resources/routes'
import { CALCULATOR_COPY } from '@/lib/tools/calculatorCopy'

// Free vacation rental revenue and commission calculator.
export const metadata: Metadata = staticPageMetadata({
  route: CALCULATOR_ROUTE,
  locale: 'ar',
  title: CALCULATOR_COPY.ar.metaTitle,
  description: CALCULATOR_COPY.ar.description,
})

export default function Page() {
  return <RentalCalculatorPage locale="ar" />
}
