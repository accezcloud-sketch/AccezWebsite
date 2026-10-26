import type { Metadata } from 'next'
import RentalCalculatorPage from '@/components/tools/RentalCalculatorPage'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { CALCULATOR_ROUTE } from '@/lib/resources/routes'
import { CALCULATOR_COPY } from '@/lib/tools/calculatorCopy'

// Free vacation rental revenue and commission calculator.
export const metadata: Metadata = staticPageMetadata({
  route: CALCULATOR_ROUTE,
  locale: 'en',
  title: CALCULATOR_COPY.en.metaTitle,
  description: CALCULATOR_COPY.en.description,
})

export default function Page() {
  return <RentalCalculatorPage locale="en" />
}
