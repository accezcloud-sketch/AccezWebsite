/**
 * Copy for the service-provider marketplace plans, in both languages. Plain
 * data, shared by the Service Providers page and the Pricing page.
 */
export const PROVIDER_PRICING_COPY = {
  en: {
    pricingEyebrow: 'Provider Pricing',
    pricingTitleLead: 'Plans for',
    pricingTitleAccent: 'service providers',
    pricingSubtitle:
      'Start free and get listed. Every plan includes a marketplace listing; higher plans add more staff and more services. Pricing is separate from Accez property management plans.',
    perMonth: '/mo',
    mostPopular: 'Recommended',
    feeSuffix: 'platform fee per booking',
    plans: [
      {
        name: 'Free',
        price: 'Free',
        platformFee: '10%',
        tagline: 'Get listed and start taking bookings.',
        cta: 'Start free',
        highlight: false,
        features: [
          'Public marketplace listing',
          '1 staff member',
          'Up to 5 services',
          'Provider dashboard',
          'Ratings and reviews',
        ],
      },
      {
        name: 'Starter',
        price: 'SAR 75',
        tagline: 'More services for your business.',
        cta: 'Choose Starter',
        highlight: false,
        features: [
          'Everything in Free',
          'Up to 20 services',
        ],
      },
      {
        name: 'Growth',
        price: 'SAR 184',
        tagline: 'More staff and more services.',
        cta: 'Choose Growth',
        highlight: true,
        features: [
          'Everything in Starter',
          'Up to 5 staff members',
          'Up to 100 services',
          'Promo codes',
        ],
      },
    ],
    pricingNote: 'On the Free plan, Accez takes a 10% platform fee on each booking.',
  },
  ar: {
    pricingEyebrow: 'أسعار مقدمي الخدمات',
    pricingTitleLead: 'خطط',
    pricingTitleAccent: 'لمقدمي الخدمات',
    pricingSubtitle:
      'ابدأ مجانًا واحصل على صفحتك. كل خطة تتضمن صفحة في السوق؛ والخطط الأعلى تضيف المزيد من الموظفين والخدمات. الأسعار منفصلة عن خطط إدارة العقارات في أكسيز.',
    perMonth: '/شهريًا',
    mostPopular: 'موصى بها',
    feeSuffix: 'رسوم المنصة لكل حجز',
    plans: [
      {
        name: 'المجانية',
        price: 'مجانًا',
        platformFee: '10%',
        tagline: 'احصل على صفحتك وابدأ باستقبال الحجوزات.',
        cta: 'ابدأ مجانًا',
        highlight: false,
        features: [
          'صفحة عامة في السوق',
          'موظف واحد',
          'حتى 5 خدمات',
          'لوحة تحكم مقدم الخدمة',
          'التقييمات والمراجعات',
        ],
      },
      {
        name: 'المبتدئة',
        price: '75 ريال',
        tagline: 'خدمات أكثر لنشاطك.',
        cta: 'اختر المبتدئة',
        highlight: false,
        features: [
          'كل ما في الخطة المجانية',
          'حتى 20 خدمة',
        ],
      },
      {
        name: 'النمو',
        price: '184 ريال',
        tagline: 'موظفون أكثر وخدمات أكثر.',
        cta: 'اختر النمو',
        highlight: true,
        features: [
          'كل ما في الخطة المبتدئة',
          'حتى 5 موظفين',
          'حتى 100 خدمة',
          'أكواد الخصم',
        ],
      },
    ],
    pricingNote: 'في الخطة المجانية تتقاضى أكسيز رسوم منصة 10% على كل حجز.',
  },
} as const

/** Monthly provider plan prices in SAR, read from the plans copy ("Free" is 0). */
export function providerPlanPrices(): number[] {
  return PROVIDER_PRICING_COPY.en.plans.map((plan) => Number(plan.price.match(/\d+/)?.[0] ?? 0))
}
