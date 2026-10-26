/**
 * Copy for the service-provider marketplace plans, in both languages. Plain
 * data, shared by the Service Providers page and the Pricing page.
 */
export const PROVIDER_PRICING_COPY = {
  en: {
    pricingEyebrow: 'Provider Pricing',
    pricingTitleLead: 'Plans built for',
    pricingTitleAccent: 'exposure',
    pricingSubtitle:
      'Start free and get listed. Every plan includes a marketplace listing; higher plans add more staff, more services, and a lower platform fee on each booking. Pricing is separate from Accez property management plans.',
    perMonth: '/mo',
    mostPopular: 'Most popular',
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
        platformFee: '5%',
        tagline: 'Lower fees and instant confirmations.',
        cta: 'Choose Starter',
        highlight: false,
        features: [
          'Everything in Free',
          'Up to 20 services',
          'Instant order confirmation',
        ],
      },
      {
        name: 'Growth',
        price: 'SAR 184',
        platformFee: '3.5%',
        tagline: 'For growing teams that want it all.',
        cta: 'Choose Growth',
        highlight: true,
        features: [
          'Everything in Starter',
          'Up to 5 staff members',
          'Up to 100 services',
          'Instant order confirmation',
          'Promo codes',
          'Analytics',
        ],
      },
    ],
    pricingNote: 'The platform fee is a small percentage of each completed booking, and it drops as you move up a plan. Change or cancel your plan at any time.',
  },
  ar: {
    pricingEyebrow: 'أسعار مقدمي الخدمات',
    pricingTitleLead: 'خطط مصممة',
    pricingTitleAccent: 'للظهور',
    pricingSubtitle:
      'ابدأ مجانًا واحصل على صفحتك. كل خطة تتضمن صفحة في السوق؛ والخطط الأعلى تضيف المزيد من الموظفين والخدمات ورسوم منصة أقل على كل حجز. الأسعار منفصلة عن خطط إدارة العقارات في أكسيز.',
    perMonth: '/شهريًا',
    mostPopular: 'الأكثر شيوعًا',
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
        platformFee: '5%',
        tagline: 'رسوم أقل وتأكيد فوري.',
        cta: 'اختر المبتدئة',
        highlight: false,
        features: [
          'كل ما في الخطة المجانية',
          'حتى 20 خدمة',
          'تأكيد فوري للطلبات',
        ],
      },
      {
        name: 'النمو',
        price: '184 ريال',
        platformFee: '3.5%',
        tagline: 'للفرق المتنامية التي تريد كل شيء.',
        cta: 'اختر النمو',
        highlight: true,
        features: [
          'كل ما في الخطة المبتدئة',
          'حتى 5 موظفين',
          'حتى 100 خدمة',
          'تأكيد فوري للطلبات',
          'أكواد الخصم',
          'التحليلات',
        ],
      },
    ],
    pricingNote: 'رسوم المنصة هي نسبة صغيرة من كل حجز مكتمل، وتنخفض كلما ارتقيت في الخطة. يمكنك تغيير خطتك أو إلغاؤها في أي وقت.',
  },
} as const

/** Monthly provider plan prices in SAR, read from the plans copy ("Free" is 0). */
export function providerPlanPrices(): number[] {
  return PROVIDER_PRICING_COPY.en.plans.map((plan) => Number(plan.price.match(/\d+/)?.[0] ?? 0))
}
