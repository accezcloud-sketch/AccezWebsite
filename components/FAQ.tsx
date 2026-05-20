'use client'

import { useState } from 'react'
import Script from 'next/script'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
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
      'Accez.cloud is a unified property management SaaS platform that streamlines operations for property managers, landlords, and HOAs. It integrates booking management across 400+ channels (Airbnb, Booking.com, Expedia), automated rent collection, maintenance scheduling, and a service marketplace to generate additional revenue.',
    answerAr:
      'Accez.cloud هي منصة SaaS موحدة لإدارة العقارات تعمل على تبسيط العمليات لمديري العقارات والملاك وجمعيات أصحاب المنازل. تتكامل مع إدارة الحجوزات عبر أكثر من 400 قناة (Airbnb، Booking.com، Expedia)، وتحصيل الإيجارات الآلي، وجدولة الصيانة، وسوق الخدمات لتوليد إيرادات إضافية.',
  },
  {
    category: 'pricingBilling',
    question: 'How much does Accez.cloud cost?',
    questionAr: 'كم تكلفة Accez.cloud؟',
    answer:
      'We offer flexible plans starting from SAR 40/month for the Basic plan (3 properties with unlimited units). Our Professional plan is SAR 150/month (10 properties with unlimited units), and we offer custom Enterprise solutions for larger portfolios. Our Free plan lets you try the platform with no credit card required.',
    answerAr:
      'نقدم خطط مرنة تبدأ من 40 ريال شهريًا للخطة الأساسية (3 عقارات بوحدات غير محدودة). خطتنا الاحترافية هي 150 ريال شهريًا (10 عقارات بوحدات غير محدودة)، ونقدم حلول مؤسسات مخصصة للمحافظ الأكبر. خطتنا المجانية تتيح لك تجربة المنصة بدون الحاجة لبطاقة ائتمان.',
  },
  {
    category: 'channelsIntegrations',
    question: 'Which booking platforms does Accez.cloud integrate with?',
    questionAr: 'ما هي منصات الحجز التي يتكامل معها Accez.cloud؟',
    answer:
      'Accez.cloud integrates with 400+ channels including major platforms like Airbnb, Booking.com, Expedia, VRBO, HomeAway, and many more. This allows you to manage all your bookings from a single centralized dashboard.',
    answerAr:
      'يتكامل Accez.cloud مع أكثر من 400 قناة بما في ذلك المنصات الرئيسية مثل Airbnb و Booking.com و Expedia و VRBO و HomeAway والعديد غيرها. هذا يتيح لك إدارة جميع حجوزاتك من لوحة تحكم مركزية واحدة.',
  },
  {
    category: 'serviceMarketplace',
    question: 'How can I earn additional revenue with the service marketplace?',
    questionAr: 'كيف يمكنني كسب إيرادات إضافية من سوق الخدمات؟',
    answer:
      'Our service marketplace connects property owners with local service providers for cleaning, maintenance, repairs, and other services. Property managers can earn 15–30% commission on every transaction, creating a new revenue stream within the first year.',
    answerAr:
      'يربط سوق الخدمات لدينا مالكي العقارات بمقدمي الخدمات المحليين للتنظيف والصيانة والإصلاحات وخدمات أخرى. يمكن لمديري العقارات كسب عمولة تتراوح بين 15-30% على كل معاملة، مما يخلق مصدر دخل جديد خلال السنة الأولى.',
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

export default function FAQ() {
  const { t, language, isRTL } = useLanguage()
  const tf = t.faq as Record<string, string>

  const [activeCategory, setActiveCategory] = useState<CategoryKey | 'all'>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory)

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const allCategories: Array<{ key: CategoryKey | 'all'; label: string }> = [
    { key: 'all', label: tf.catAll },
    ...CATEGORY_KEYS.map((key) => ({
      key,
      label: tf[CATEGORY_TRANSLATION_KEY[key]],
    })),
  ]

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section
        id="faq"
        className="relative py-20 px-4 sm:px-6 lg:px-12 overflow-hidden"
        style={{ background: '#080c18' }}
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <FadeUp className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to left, transparent, #6366f1)'
                  : 'linear-gradient(to right, transparent, #6366f1)' }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#818cf8' }}
              >
                {tf.eyebrow}
              </span>
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to right, transparent, #6366f1)'
                  : 'linear-gradient(to left, transparent, #6366f1)' }}
              />
            </div>

            <h2
              className="text-white font-bold text-center leading-tight tracking-tight mb-4"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontFamily: 'var(--font-manrope), var(--font-inter), system-ui, sans-serif',
                fontWeight: 800,
              }}
            >
              {tf.titleLead}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {tf.titleAccent}
              </span>
            </h2>

            <p
              className="text-slate-400 text-center leading-relaxed"
              style={{ fontSize: 17 }}
            >
              {tf.helpText}{' '}
              <a
                href="#contact"
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
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
                        background: 'rgba(99,102,241,0.18)',
                        border: '1px solid rgba(99,102,241,0.4)',
                        color: '#818cf8',
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#94a3b8',
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
                      background: isOpen ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.03)',
                      border: isOpen
                        ? '1px solid rgba(99,102,241,0.25)'
                        : '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/[0.02]"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: '#6366f1' }}
                        />
                        <span
                          className="font-medium text-white leading-snug"
                          style={{ fontSize: 15 }}
                        >
                          {language === 'ar' ? faq.questionAr : faq.question}
                        </span>
                      </div>

                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex-shrink-0 text-slate-500"
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

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] },
                            opacity: { duration: 0.22 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className={`pb-5 pt-1 ${isRTL ? 'pr-11 pl-5' : 'pl-11 pr-5'}`}>
                            <p
                              className="text-slate-400 leading-relaxed"
                              style={{ fontSize: 14.5 }}
                            >
                              {language === 'ar' ? faq.answerAr : faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.18)',
              }}
            >
              <div className="text-center sm:text-start">
                <p className="text-white font-semibold text-sm">
                  {tf.bottomCtaTitle}
                </p>
              </div>
              <a
                href="#contact"
                className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
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
