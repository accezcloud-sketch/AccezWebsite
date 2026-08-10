import type { Metadata } from 'next'
import SupportPageClient from '@/components/SupportPageClient'
import { alternatesFor, localeUrl } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'الدعم، احصل على مساعدة من فريقنا في الرياض',
  description:
    'تحتاج مساعدة في أكسيز؟ أرسل تذكرة دعم وسيعود إليك فريقنا في الرياض في أقرب وقت ممكن.',
  alternates: alternatesFor('support', 'ar'),
  openGraph: {
    title: 'الدعم | أكسيز',
    description: 'أرسل تذكرة دعم وسيعود إليك فريقنا في الرياض في أقرب وقت ممكن.',
    url: localeUrl('support', 'ar'),
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function Page() {
  return <SupportPageClient />
}
