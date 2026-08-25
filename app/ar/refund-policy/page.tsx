import type { Metadata } from 'next'
import { alternatesFor, localeUrl } from '@/lib/i18n'
import RefundContentAr from '@/components/legal/RefundContentAr'

export const metadata: Metadata = {
  title: 'سياسة الاسترداد والإلغاء',
  description:
    'كيف يعمل الإلغاء والاسترداد في أكسيز عبر حجوزات الوحدات وحجوزات خدمات السوق والاشتراكات، وكيف تُعالَج رسوم المعالجة ورسوم المنصة.',
  alternates: alternatesFor('refund-policy', 'ar'),
  openGraph: {
    title: 'سياسة الاسترداد والإلغاء | أكسيز',
    description: 'مدد الإلغاء واحتساب الاسترداد ومعالجة الرسوم للحجوزات والاشتراكات.',
    type: 'article',
    url: localeUrl('refund-policy', 'ar'),
    siteName: 'Accez',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'سياسة الاسترداد والإلغاء' }],
  },
}

export default function ArabicRefundPage() {
  return <RefundContentAr />
}
