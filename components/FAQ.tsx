'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'
import FadeUp from '@/components/animations/FadeUp'

type CategoryKey =
  | 'gettingStarted'
  | 'channelsIntegrations'
  | 'pricingBilling'
  | 'serviceMarketplace'
  | 'securityData'

interface FaqItem {
  category: CategoryKey
  question: string
  questionAr: string
  answer: string
  answerAr: string
}

const FAQS: FaqItem[] = [
  {
    category: 'gettingStarted',
    question: 'What is Accez.cloud and how does it work?',
    questionAr: 'ما هو Accez.cloud وكيف يعمل؟',
    answer:
      'Accez.cloud is one platform with two solutions. Property management runs the whole operation for property managers, landlords and hotel operators: reservations synced with Airbnb, Booking.com and Expedia, rent, work orders, owners and payouts, and sales. The service provider marketplace lets salons, spas, fitness coaches, photographers and home services list their business and take bookings from their own clients and new customers. The two solutions are separate account types.',
    answerAr:
      'Accez.cloud منصة واحدة بحلّين. إدارة العقارات تدير العملية بالكامل لمديري العقارات والملاك ومشغّلي الفنادق: حجوزات متزامنة مع Airbnb وBooking.com وExpedia، والإيجارات، وأوامر العمل، والملاك والمدفوعات، والمبيعات. وسوق مقدمي الخدمات يتيح للصالونات والمنتجعات الصحية ومدربي اللياقة والمصورين والخدمات المنزلية إدراج نشاطهم واستقبال الحجوزات من عملائهم ومن عملاء جدد. والحلّان نوعا حساب منفصلان.',
  },
  {
    category: 'pricingBilling',
    question: 'How much does Accez.cloud cost?',
    questionAr: 'كم تكلفة Accez.cloud؟',
    answer:
      'Each solution has its own plans. For property managers there is a Free plan, Basic at SAR 40/month (3 properties with unlimited units), Professional at SAR 150/month (10 properties with unlimited units), and Enterprise for larger portfolios. Service providers list for free; the Starter (SAR 75/month) and Growth (SAR 184/month) plans lower the platform fee on each booking. No credit card is needed to start.',
    answerAr:
      'لكل حل خططه الخاصة. لمديري العقارات: خطة مجانية، والأساسية بـ 40 ريالًا شهريًا (3 عقارات بوحدات غير محدودة)، والاحترافية بـ 150 ريالًا شهريًا (10 عقارات بوحدات غير محدودة)، وخطة المؤسسات للمحافظ الأكبر. ولمقدمي الخدمات: الإدراج مجاني، وخطتا المبتدئة (75 ريالًا شهريًا) والنمو (184 ريالًا شهريًا) تخفضان رسوم المنصة على كل حجز. لا حاجة لبطاقة ائتمان للبدء.',
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
    question: 'How can I earn additional revenue with the service marketplace?',
    questionAr: 'كيف يمكنني كسب إيرادات إضافية من سوق الخدمات؟',
    answer:
      'Our service marketplace connects property owners with local service providers for cleaning, maintenance, repairs, and other services. Property managers can earn 15 to 30% commission on every transaction, creating a new revenue stream within the first year.',
    answerAr:
      'يربط سوق الخدمات لدينا مالكي العقارات بمقدمي الخدمات المحليين للتنظيف والصيانة والإصلاحات وخدمات أخرى. يمكن لمديري العقارات كسب عمولة تتراوح بين 15-30% على كل معاملة، مما يخلق مصدر دخل جديد خلال السنة الأولى.',
  },
  {
    category: 'serviceMarketplace',
    question: 'Who can become a service provider on Accez?',
    questionAr: 'من يمكنه أن يصبح مقدم خدمة على أكسيز؟',
    answer:
      'Any independent business, not only property related trades. Salons and barbers, spas and wellness studios, fitness coaches, photographers and home services all list on the Accez marketplace. Service Provider is its own account type, completely separate from a property manager account.',
    answerAr:
      'أي نشاط تجاري مستقل، وليس فقط المهن المرتبطة بالعقارات. صالونات الحلاقة والتجميل، المنتجعات الصحية، مدربو اللياقة، المصورون والخدمات المنزلية، جميعهم يظهرون في سوق أكسيز. مقدم الخدمة هو نوع حساب مستقل تمامًا عن حساب مدير العقارات.',
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
      'Your business gets its own public listing on the Accez marketplace. Customers browse by category such as Beauty, Spa and Wellness, Fitness, Photography and Home services, search by name, or find you on the map. They see your service list with durations and prices in SAR, book inside your opening hours, and can leave a rating and review afterwards.',
    answerAr:
      'يحصل نشاطك على صفحة عامة خاصة به في سوق أكسيز. يتصفح العملاء حسب الفئة مثل التجميل والمنتجعات الصحية واللياقة والتصوير والخدمات المنزلية، أو يبحثون بالاسم، أو يجدونك على الخريطة. يرون قائمة خدماتك بمددها وأسعارها بالريال، ويحجزون ضمن ساعات عملك، ويمكنهم ترك تقييم ومراجعة بعد ذلك.',
  },
  {
    category: 'securityData',
    question: 'Is my property and tenant data secure?',
    questionAr: 'هل بيانات عقاري والمستأجرين آمنة؟',
    answer:
      'Yes, security is our top priority. All data is encrypted in transit and at rest. We are GDPR compliant and follow industry best practices for data protection. Enterprise plans include additional security features and on-premise deployment options.',
    answerAr:
      'نعم، الأمان هو أولويتنا القصوى. جميع البيانات مشفرة أثناء النقل وفي حالة السكون. نحن متوافقون مع GDPR ونتبع أفضل ممارسات الصناعة لحماية البيانات. تتضمن خطط المؤسسات ميزات أمان إضافية وخيارات نشر محلية.',
  },
  {
    category: 'pricingBilling',
    question: 'Can I cancel my subscription at any time?',
    questionAr: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
    answer:
      'Yes, you can cancel your subscription at any time with no cancellation fees or penalties. Your access continues until the end of your current billing period.',
    answerAr:
      'نعم، يمكنك إلغاء اشتراكك في أي وقت بدون رسوم أو عقوبات إلغاء. يستمر وصولك حتى نهاية فترة الفوترة الحالية.',
  },
]

const CATEGORY_KEYS: CategoryKey[] = [
  'gettingStarted',
  'channelsIntegrations',
  'pricingBilling',
  'serviceMarketplace',
  'securityData',
]

const CATEGORY_TRANSLATION_KEY: Record<CategoryKey, string> = {
  gettingStarted: 'catGettingStarted',
  channelsIntegrations: 'catChannels',
  pricingBilling: 'catPricing',
  serviceMarketplace: 'catMarketplace',
  securityData: 'catSecurity',
}

/**
 * Frequently asked questions. A section (`h2`) on the homepage; the page's
 * subject (`h1`) on /faq.
 */
export default function FAQ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel
  const { t, language, isRTL } = useLanguage()
  const tf = t.faq as Record<string, string>

  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory)

  // FAQPage structured data was removed here, for two independent reasons:
  //
  //  1. The feature is gone. Google restricted FAQ rich results to government
  //     and health sites in September 2023, stopped showing them entirely on
  //     7 May 2026, and removed the documentation in June 2026. The markup
  //     produced nothing in Search.
  //  2. It never reached the HTML anyway. It was injected with next/script,
  //     which runs client-side, so `FAQPage` did not appear in the built
  //     output at all and was invisible to every non-rendering crawler.
  //
  // The FAQ *content* below is untouched and still valuable — it answers real
  // buyer questions and is exactly the kind of passage AI answers retrieve.
  // Only the dead markup is gone.

  const allCategories: Array<{ key: CategoryKey | 'all'; label: string }> = [
    { key: 'all', label: tf.catAll },
    ...CATEGORY_KEYS.map((key) => ({
      key,
      label: tf[CATEGORY_TRANSLATION_KEY[key]],
    })),
  ]

  return (
    <>
      <section
        id="faq"
        className="relative py-20 px-4 sm:px-6 lg:px-12 overflow-hidden"
        style={{ background: 'var(--section-bg, var(--bg))' }}
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgb(var(--accent-rgb) / 0.05) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeUp className="text-center mb-10">
            <div className="flex justify-center mb-4"><span className="ui-chip">{tf.eyebrow}</span></div>

            <Heading
              className="hero-display text-strong text-center leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              {tf.titleLead}{' '}
              <span className="grad-text">
                {tf.titleAccent}
              </span>
            </Heading>

            <p
              className="text-muted text-center leading-relaxed"
              style={{ fontSize: 17 }}
            >
              {tf.helpText}{' '}
              <a
                href={localeHref("/#contact", language)}
                className="text-accent-hi hover:text-strong underline underline-offset-2 transition-colors"
              >
                {tf.helpLink}
              </a>
            </p>
          </FadeUp>

          {/* Category filter pills */}
          <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-2 mb-8">
            {allCategories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key)
                  setOpenIndex(null)
                }}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  activeCategory === key
                    ? {
                        background: 'rgb(var(--accent-rgb) / 0.18)',
                        border: '1px solid rgb(var(--accent-rgb) / 0.4)',
                        color: 'var(--accent-hi)',
                      }
                    : {
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                      }
                }
              >
                {label}
              </button>
            ))}
          </FadeUp>

          {/* Accordion list */}
          <div className="flex flex-col gap-2">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <FadeUp key={faq.question} delay={index * 0.06}>
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOpen ? 'rgb(var(--accent-rgb) / 0.06)' : 'rgb(var(--fg-rgb) / 0.03)',
                      border: isOpen
                        ? '1px solid rgb(var(--accent-rgb) / 0.25)'
                        : '1px solid var(--border)',
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-[rgb(var(--fg-rgb)/0.03)]"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--accent)' }}
                        />
                        <span
                          className="font-medium text-strong leading-snug"
                          style={{ fontSize: 15 }}
                        >
                          {language === 'ar' ? faq.questionAr : faq.question}
                        </span>
                      </div>

                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex-shrink-0 text-faint"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.span>
                    </button>

                    {/* Always rendered, so every answer is in the static HTML for
                        search engines and AI crawlers; collapsed answers are
                        animated to zero height and hidden from assistive tech. */}
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{
                        height: { duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] },
                        opacity: { duration: 0.22 },
                      }}
                      className="overflow-hidden"
                      aria-hidden={!isOpen}
                    >
                      <div className={`pb-5 pt-1 ${isRTL ? 'pr-11 pl-5' : 'pl-11 pr-5'}`}>
                        <p
                          className="text-muted leading-relaxed"
                          style={{ fontSize: 14.5 }}
                        >
                          {language === 'ar' ? faq.answerAr : faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </FadeUp>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <FadeUp delay={0.2} className="mt-12">
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-6 py-5"
              style={{
                background: 'rgb(var(--accent-rgb) / 0.07)',
                border: '1px solid rgb(var(--accent-rgb) / 0.18)',
              }}
            >
              <div className="text-center sm:text-start">
                <p className="text-strong font-semibold text-sm">
                  {tf.bottomCtaTitle}
                </p>
              </div>
              <a
                href={localeHref("/#contact", language)}
                className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-solid), var(--accent-solid-hover))',
                  boxShadow: '0 0 0 1px var(--accent-ring), 0 4px 16px rgb(var(--accent-rgb) / 0.3)',
                }}
              >
                {tf.bottomCtaButton}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                >
                  <path
                    d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
