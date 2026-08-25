import type { Metadata } from 'next'
import { alternatesFor, localeUrl } from '@/lib/i18n'
import TermsContentAr from '@/components/legal/TermsContentAr'

export const metadata: Metadata = {
  title: 'شروط الخدمة',
  description:
    'الاتفاقية بين شركة كلاود فالي ومستخدمي منصة أكسيز وسوق الخدمات، وتشمل الاشتراكات والرسوم والمدفوعات والتحويلات وحدود المسؤولية والنظام الواجب التطبيق.',
  alternates: alternatesFor('terms', 'ar'),
  openGraph: {
    title: 'شروط الخدمة | أكسيز',
    description: 'الشروط التي تحكم استخدام منصة أكسيز لعمليات العقارات وسوق الخدمات.',
    type: 'article',
    url: localeUrl('terms', 'ar'),
    siteName: 'Accez',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'شروط خدمة أكسيز' }],
  },
}

export default function ArabicTermsPage() {
  return <TermsContentAr />
}
