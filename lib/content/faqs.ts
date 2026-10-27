/**
 * The site's frequently asked questions, in both languages, as plain data.
 *
 * The FAQ section (homepage and /faq) shows all of them with category
 * filters; the pricing pages show the pricing and billing ones. Keeping the
 * data out of the client component lets server-rendered pages reuse it
 * without shipping it as JavaScript.
 */
import type { Locale } from '@/lib/i18n'
import { PM_PLAN_PRICES } from './pmPlans'
import { providerPlanPrices } from './providerPricing'

// Prices in the answers come from the plans data, so they always match the plans.
const PM = PM_PLAN_PRICES
const [, SP_STARTER, SP_GROWTH] = providerPlanPrices()

export type FaqCategory =
  | 'gettingStarted'
  | 'channelsIntegrations'
  | 'pricingBilling'
  | 'serviceMarketplace'
  | 'securityData'

export interface FaqItem {
  category: FaqCategory
  question: string
  questionAr: string
  answer: string
  answerAr: string
}

export const FAQS: FaqItem[] = [
  {
    category: 'gettingStarted',
    question: 'What is Accez.cloud and how does it work?',
    questionAr: 'ما هو Accez.cloud وكيف يعمل؟',
    answer:
      'Accez.cloud is one platform with two solutions. Property management runs the whole operation for property managers, landlords and serviced apartment operators: reservations synced with Airbnb, Booking.com and Expedia, rent, work orders, owners and payouts, and sales. The service provider marketplace lets salons, spas, fitness coaches, photographers and home services list their business and take bookings from their own clients and new customers. The two solutions are separate account types.',
    answerAr:
      'Accez.cloud منصة واحدة بحلّين. إدارة العقارات تدير العملية بالكامل لمديري العقارات والملاك ومشغّلي الشقق المخدومة: حجوزات متزامنة مع Airbnb وBooking.com وExpedia، والإيجارات، وأوامر العمل، والملاك والمدفوعات، والمبيعات. وسوق مقدمي الخدمات يتيح للصالونات والمنتجعات الصحية ومدربي اللياقة والمصورين والخدمات المنزلية إدراج نشاطهم واستقبال الحجوزات من عملائهم ومن عملاء جدد. والحلّان نوعا حساب منفصلان.',
  },
  {
    category: 'pricingBilling',
    question: 'How much does Accez.cloud cost?',
    questionAr: 'كم تكلفة Accez.cloud؟',
    answer:
      `Each solution has its own plans. For property managers there is a Free plan, Basic at SAR ${PM.basic.monthly}/month (3 properties with unlimited units), Professional at SAR ${PM.professional.monthly}/month (10 properties with unlimited units), and Enterprise for larger portfolios. Service providers list for free; the Starter (SAR ${SP_STARTER}/month) and Growth (SAR ${SP_GROWTH}/month) plans lower the platform fee on each booking. No credit card is needed to start.`,
    answerAr:
      `لكل حل خططه الخاصة. لمديري العقارات: خطة مجانية، والأساسية بـ ${PM.basic.monthly} ريالًا شهريًا (3 عقارات بوحدات غير محدودة)، والاحترافية بـ ${PM.professional.monthly} ريالًا شهريًا (10 عقارات بوحدات غير محدودة)، وخطة المؤسسات للمحافظ الأكبر. ولمقدمي الخدمات: الإدراج مجاني، وخطتا المبتدئة (${SP_STARTER} ريالًا شهريًا) والنمو (${SP_GROWTH} ريالًا شهريًا) تخفضان رسوم المنصة على كل حجز. لا حاجة لبطاقة ائتمان للبدء.`,
  },
  {
    category: 'channelsIntegrations',
    question: 'Which booking platforms does Accez.cloud integrate with?',
    questionAr: 'ما هي منصات الحجز التي يتكامل معها Accez.cloud؟',
    answer:
      'Accez.cloud connects with Airbnb, Booking.com and Expedia, and syncs calendars through the RoomCloud channel manager and iCal. You manage all your bookings from one dashboard.',
    answerAr:
      'يتكامل Accez.cloud مع Airbnb وBooking.com وExpedia، ويزامن التقاويم عبر مدير القنوات RoomCloud وiCal. تدير جميع حجوزاتك من لوحة تحكم واحدة.',
  },
  {
    category: 'serviceMarketplace',
    question: 'Who can become a service provider on Accez?',
    questionAr: 'من يمكنه أن يصبح مقدم خدمة على أكسيز؟',
    answer:
      'Any independent business, not only property related trades. Barbers and salons, spas and wellness studios, and coaches and personal trainers can all list on the Accez marketplace. Service Provider is its own account type, completely separate from a property manager account.',
    answerAr:
      'أي نشاط تجاري مستقل، وليس فقط المهن المرتبطة بالعقارات. الحلاقون والصالونات، والمنتجعات الصحية، والمدربون الشخصيون، جميعهم يمكنهم الظهور في سوق أكسيز. مقدم الخدمة هو نوع حساب مستقل تمامًا عن حساب مدير العقارات.',
  },
  {
    category: 'serviceMarketplace',
    question: 'How do I register as a service provider?',
    questionAr: 'كيف أسجل كمقدم خدمة؟',
    answer:
      'Go to the Service Provider sign-up at provider.accez.cloud/sp/signup. Your provider account is created there, then you build your listing with your photos, category, location, opening hours and priced services.',
    answerAr:
      'انتقل إلى تسجيل مقدمي الخدمات على provider.accez.cloud/sp/signup. يُنشأ حسابك هناك، ثم تجهّز صفحتك بالصور والفئة والموقع وساعات العمل والخدمات المسعّرة.',
  },
  {
    category: 'serviceMarketplace',
    question: 'How do customers find and book me?',
    questionAr: 'كيف يجدني العملاء ويحجزون خدماتي؟',
    answer:
      'Your business gets its own public listing on the Accez marketplace. Customers browse by category, search by name, or find you on the map. They see your service list with durations and prices in SAR, book inside your opening hours, and can leave a rating and review afterwards.',
    answerAr:
      'يحصل نشاطك على صفحة عامة خاصة به في سوق أكسيز. يتصفح العملاء حسب الفئة، أو يبحثون بالاسم، أو يجدونك على الخريطة. يرون قائمة خدماتك بمددها وأسعارها بالريال، ويحجزون ضمن ساعات عملك، ويمكنهم ترك تقييم ومراجعة بعد ذلك.',
  },
  {
    category: 'securityData',
    question: 'Is my property and tenant data secure?',
    questionAr: 'هل بيانات عقاري والمستأجرين آمنة؟',
    answer:
      'We protect it with encryption in transit, passwords stored using one-way hashing, and role-based access, so each person sees only what their role requires. Each business keeps its data separate from every other business on the platform, and accounts are protected with verification codes, optional two-factor authentication and a lockout after repeated failed sign-ins. Our Privacy Policy explains how personal data is handled under the Saudi Personal Data Protection Law.',
    answerAr:
      'نحميها بتشفير البيانات أثناء النقل، وتخزين كلمات المرور بتجزئة أحادية الاتجاه، وضوابط وصول قائمة على الأدوار بحيث لا يرى كل شخص إلا ما يقتضيه دوره. وتُفصل بيانات كل منشأة عن غيرها داخل المنصة، وتُحمى الحسابات برموز تحقق ومصادقة ثنائية اختيارية وإيقاف مؤقت بعد محاولات دخول فاشلة متكررة. وتوضح سياسة الخصوصية كيف نتعامل مع البيانات الشخصية وفق نظام حماية البيانات الشخصية السعودي.',
  },
  {
    category: 'pricingBilling',
    question: 'What happens if I cancel my subscription?',
    questionAr: 'ماذا يحدث إذا ألغيت اشتراكي؟',
    answer:
      'When you cancel, your subscription stays active until the end of the period you have already paid for, and then it does not renew. The Refund & Cancellation Policy for your solution explains which subscription fees can be refunded.',
    answerAr:
      'عند الإلغاء يبقى اشتراكك نشطًا حتى نهاية المدة المدفوعة مسبقًا، ولا يتجدد بعدها. وتوضح سياسة الاسترداد والإلغاء الخاصة بحلّك أي رسوم اشتراك يمكن استردادها.',
  },
]

export const CATEGORY_KEYS: FaqCategory[] = [
  'gettingStarted',
  'channelsIntegrations',
  'pricingBilling',
  'serviceMarketplace',
  'securityData',
]

/** The questions in one category, in their FAQ order. */
export function faqsInCategory(category: FaqCategory): FaqItem[] {
  return FAQS.filter((f) => f.category === category)
}

/** A question and its answer in one language. */
export function localizedFaq(item: FaqItem, locale: Locale): { question: string; answer: string } {
  return locale === 'ar' ? { question: item.questionAr, answer: item.answerAr } : { question: item.question, answer: item.answer }
}
