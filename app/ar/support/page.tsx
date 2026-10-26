import type { Metadata } from 'next'
import SupportPageClient from '@/components/SupportPageClient'
import { staticPageMetadata } from '@/lib/content/pageMetadata'

export const metadata: Metadata = staticPageMetadata({
  route: 'support',
  locale: 'ar',
  title: 'الدعم، احصل على مساعدة من فريقنا في الرياض',
  description:
    'تحتاج مساعدة في أكسيز؟ أرسل تذكرة دعم وسيرد عليك فريقنا في الرياض. مساعدة في الحجوزات وأوامر العمل والمدفوعات وحسابك وكل ما يخص المنصة.',
})

export default function Page() {
  return <SupportPageClient />
}
