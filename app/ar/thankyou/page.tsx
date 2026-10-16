import type { Metadata } from 'next'
import ThankYouClient from '@/components/ThankYouClient'
import { staticPageMetadata } from '@/lib/content/pageMetadata'

// Arabic confirmation page; forms submitted from Arabic pages return here
// (see thankYouUrl in lib/analytics/conversions.ts). Not indexed.
export const metadata: Metadata = {
  ...staticPageMetadata({ route: 'thankyou', locale: 'ar', title: 'شكراً لك', description: 'تم استلام رسالتك. سيتواصل معك فريق أكسيز قريباً.' }),
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
}

export default function ArabicThankYouPage() {
  return <ThankYouClient />
}
