import type { Metadata } from 'next'
import { alternatesFor, localeUrl } from '@/lib/i18n'
import PrivacyContentAr from '@/components/legal/PrivacyContentAr'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية',
  description:
    'كيف تجمع شركة كلاود فالي البيانات الشخصية في منصة أكسيز وتستخدمها وتشاركها وتحميها، وحقوقك بموجب نظام حماية البيانات الشخصية السعودي.',
  alternates: alternatesFor('privacy', 'ar'),
  openGraph: {
    title: 'سياسة الخصوصية | أكسيز',
    description: 'كيف تتعامل أكسيز مع البيانات الشخصية، وحقوقك بموجب نظام حماية البيانات الشخصية.',
    type: 'article',
    url: localeUrl('privacy', 'ar'),
    siteName: 'Accez',
    locale: 'ar_SA',
    images: [{ url: 'https://www.accez.cloud/images/og-image.png', width: 1200, height: 630, alt: 'سياسة خصوصية أكسيز' }],
  },
}

export default function ArabicPrivacyPage() {
  return <PrivacyContentAr />
}
