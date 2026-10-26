/**
 * Wording of the rental revenue calculator page, in both languages. The
 * numbers it shows come from ./rentalRevenue.ts.
 */
import type { FieldError, NumericField } from './rentalRevenue'

interface FieldCopy { label: string; unit: string; hint: string }

export interface CalculatorCopy {
  eyebrow: string
  title: string
  metaTitle: string
  description: string
  intro: string
  crumbHome: string
  formHeading: string
  exampleNote: string
  reset: string
  fields: Record<Exclude<NumericField, 'commissionPct'>, FieldCopy>
  commission: {
    legend: string
    airbnb: string
    airbnbHint: string
    airbnbSource: string
    custom: string
    customHint: string
    rate: FieldCopy
  }
  feeBase: { legend: string; afterCommission: string; gross: string }
  results: {
    heading: string
    gross: string
    commission: string
    cleaning: (stays: string) => string
    management: string
    net: string
    occupancy: string
    occupancyHint: string
    fixErrors: string
  }
  errors: Record<FieldError, (limit: string) => string>
  noteTitle: string
  note: string
  opensNewTab: string
  ctaTitle: string
  ctaText: string
  ctaButton: string
  moreTitle: string
}

export const CALCULATOR_COPY: Record<'en' | 'ar', CalculatorCopy> = {
  en: {
    eyebrow: 'Free tool',
    title: 'Vacation rental revenue and commission calculator',
    metaTitle: 'Rental revenue and commission calculator',
    description:
      'Free calculator for vacation rentals in Saudi Arabia: estimate monthly revenue, channel commission, cleaning, management fee and the owner’s net.',
    intro:
      'Enter your own figures to estimate what a vacation rental earns in a month, what goes to the booking channel, cleaning and management, and what is left for the owner.',
    crumbHome: 'Home',
    formHeading: 'Your figures',
    exampleNote: 'The form starts with example values. Replace them with your own.',
    reset: 'Restore example values',
    fields: {
      nightlyRate: { label: 'Average nightly rate', unit: 'SAR', hint: 'What guests pay per night, before channel commission.' },
      nightsBooked: { label: 'Nights booked per month', unit: 'nights', hint: 'Out of a 30 night month.' },
      cleaningPerStay: { label: 'Cleaning cost per stay', unit: 'SAR', hint: 'What you pay for one clean between guests.' },
      averageStay: { label: 'Average stay length', unit: 'nights', hint: 'Used to estimate how many cleans the month needs.' },
      managementPct: { label: 'Management fee', unit: '%', hint: 'The manager’s share, as a percentage.' },
    },
    commission: {
      legend: 'Channel commission',
      airbnb: 'Airbnb host-only fee, 15.5%',
      airbnbHint: 'The single fee most hosts pay, according to',
      airbnbSource: 'Airbnb’s help page on service fees',
      custom: 'Custom rate',
      customHint: 'Enter the rate in your own contract, for example with Booking.com or Expedia.',
      rate: { label: 'Commission rate', unit: '%', hint: '' },
    },
    feeBase: { legend: 'Management fee is charged on', afterCommission: 'Revenue after channel commission', gross: 'Gross booking revenue' },
    results: {
      heading: 'Estimated month',
      gross: 'Gross booking revenue',
      commission: 'Channel commission',
      cleaning: (stays) => `Cleaning (${stays} stays)`,
      management: 'Management fee',
      net: 'Net to owner',
      occupancy: 'Occupancy',
      occupancyHint: 'Nights booked out of 30.',
      fixErrors: 'Fix the highlighted fields to see the estimate.',
    },
    errors: {
      required: () => 'Enter a number.',
      notNumber: () => 'Use digits only, for example 450.',
      negative: () => 'Use zero or more.',
      tooLow: (min) => `Use at least ${min}.`,
      tooHigh: (max) => `Use at most ${max}.`,
    },
    noteTitle: 'An estimate only',
    note:
      'Results are rounded to the nearest riyal and leave out VAT, payment processing fees, utilities, maintenance and other costs. Check channel fees in your own contracts. This is not financial or tax advice.',
    opensNewTab: '(opens in a new tab)',
    ctaTitle: 'Manage Airbnb, Booking.com and Expedia in one calendar',
    ctaText: 'The Accez property management solution keeps reservations from all three channels in one availability calendar, with each stay’s payment and accepted policies.',
    ctaButton: 'See rentals and reservations',
    moreTitle: 'More free resources',
  },
  ar: {
    eyebrow: 'أداة مجانية',
    title: 'حاسبة إيرادات الإيجار السياحي والعمولة',
    metaTitle: 'حاسبة إيرادات الإيجار والعمولة',
    description: 'حاسبة مجانية للإيجارات السياحية في السعودية: قدّر الإيراد الشهري وعمولة القناة وتكلفة التنظيف ورسوم الإدارة وصافي المالك.',
    intro: 'أدخل أرقامك لتقدير ما يحققه عقار الإيجار السياحي في شهر، وما يذهب إلى قناة الحجز والتنظيف والإدارة، وما يتبقى للمالك.',
    crumbHome: 'الرئيسية',
    formHeading: 'أرقامك',
    exampleNote: 'يبدأ النموذج بقيم توضيحية، فاستبدلها بأرقامك.',
    reset: 'استعادة القيم التوضيحية',
    fields: {
      nightlyRate: { label: 'متوسط سعر الليلة', unit: 'ر.س', hint: 'ما يدفعه الضيف في الليلة، قبل عمولة القناة.' },
      nightsBooked: { label: 'الليالي المحجوزة في الشهر', unit: 'ليلة', hint: 'من شهر مدته 30 ليلة.' },
      cleaningPerStay: { label: 'تكلفة التنظيف لكل إقامة', unit: 'ر.س', hint: 'ما تدفعه مقابل تنظيف الوحدة بين ضيفين.' },
      averageStay: { label: 'متوسط مدة الإقامة', unit: 'ليلة', hint: 'تُستخدم لتقدير عدد مرات التنظيف في الشهر.' },
      managementPct: { label: 'رسوم الإدارة', unit: '%', hint: 'حصة مدير العقار، كنسبة مئوية.' },
    },
    commission: {
      legend: 'عمولة القناة',
      airbnb: 'رسوم Airbnb على المضيف فقط، 15.5%',
      airbnbHint: 'الرسوم الموحدة التي يدفعها معظم المضيفين، وفقًا',
      airbnbSource: 'لصفحة المساعدة في Airbnb عن رسوم الخدمة',
      custom: 'نسبة مخصصة',
      customHint: 'أدخل النسبة الواردة في عقدك، مثل عقدك مع Booking.com أو Expedia.',
      rate: { label: 'نسبة العمولة', unit: '%', hint: '' },
    },
    feeBase: { legend: 'تُحتسب رسوم الإدارة على', afterCommission: 'الإيراد بعد عمولة القناة', gross: 'إجمالي إيراد الحجوزات' },
    results: {
      heading: 'تقدير الشهر',
      gross: 'إجمالي إيراد الحجوزات',
      commission: 'عمولة القناة',
      cleaning: (stays) => `التنظيف (${stays} إقامة)`,
      management: 'رسوم الإدارة',
      net: 'صافي المالك',
      occupancy: 'نسبة الإشغال',
      occupancyHint: 'الليالي المحجوزة من 30 ليلة.',
      fixErrors: 'صحّح الحقول المميزة لعرض التقدير.',
    },
    errors: {
      required: () => 'أدخل رقمًا.',
      notNumber: () => 'استخدم الأرقام فقط، مثل 450.',
      negative: () => 'استخدم صفرًا أو أكثر.',
      tooLow: (min) => `استخدم ${min} على الأقل.`,
      tooHigh: (max) => `استخدم ${max} على الأكثر.`,
    },
    noteTitle: 'تقدير فقط',
    note:
      'تُقرَّب النتائج إلى أقرب ريال، ولا تشمل ضريبة القيمة المضافة ورسوم معالجة المدفوعات والمرافق والصيانة وغيرها من التكاليف. تحقق من رسوم القنوات في عقودك. هذه ليست استشارة مالية أو ضريبية.',
    opensNewTab: '(يفتح في علامة تبويب جديدة)',
    // The heading font has no Arabic, so Latin channel names stay out of the Arabic heading.
    ctaTitle: 'أدر حجوزات قنواتك الثلاث في تقويم واحد',
    ctaText: 'يجمع حل إدارة العقارات من أكسيز حجوزات Airbnb وBooking.com وExpedia في تقويم إتاحة واحد، مع دفعة كل إقامة والسياسات المقبولة فيها.',
    ctaButton: 'اطّلع على الإيجارات والحجوزات',
    moreTitle: 'موارد مجانية أخرى',
  },
}
