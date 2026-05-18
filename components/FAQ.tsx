'use client'

import { useState } from 'react'
import Script from 'next/script'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { t, language } = useLanguage()

  const faqs = [
    {
      question: 'What is Accez.cloud and how does it work?',
      questionAr: 'ما هو Accez.cloud وكيف يعمل؟',
      answer: 'Accez.cloud is a unified property management SaaS platform that streamlines operations for property managers, landlords, and HOAs. It integrates booking management across 400+ channels (Airbnb, Booking.com, Expedia), automated rent collection, maintenance scheduling, and a service marketplace to generate additional revenue.',
      answerAr: 'Accez.cloud هي منصة SaaS موحدة لإدارة العقارات تعمل على تبسيط العمليات لمديري العقارات والملاك وجمعيات أصحاب المنازل. تتكامل مع إدارة الحجوزات عبر أكثر من 400 قناة (Airbnb، Booking.com، Expedia)، وتحصيل الإيجارات الآلي، وجدولة الصيانة، وسوق الخدمات لتوليد إيرادات إضافية.',
    },
    {
      question: 'How much does Accez.cloud cost?',
      questionAr: 'كم تكلفة Accez.cloud؟',
      answer: 'We offer flexible pricing plans starting from $10/month for the Basic plan (3 properties with 5 units each). Our Professional plan is $40/month (6 properties with 5 units each), and we offer custom Enterprise solutions for larger portfolios. All plans include a 14-day free trial with no credit card required.',
      answerAr: 'نقدم خطط تسعير مرنة تبدأ من 10 دولارات شهريًا للخطة الأساسية (3 عقارات بـ 5 وحدات لكل منها). خطتنا الاحترافية هي 40 دولارًا شهريًا (6 عقارات بـ 5 وحدات لكل منها)، ونقدم حلول مؤسسات مخصصة للمحافظ الأكبر. جميع الخطط تتضمن تجربة مجانية لمدة 14 يومًا بدون الحاجة لبطاقة ائتمان.',
    },
    {
      question: 'Which booking platforms does Accez.cloud integrate with?',
      questionAr: 'ما هي منصات الحجز التي يتكامل معها Accez.cloud؟',
      answer: 'Accez.cloud integrates with 400+ channels including major platforms like Airbnb, Booking.com, Expedia, VRBO, HomeAway, and many more. This allows you to manage all your bookings from a single centralized dashboard.',
      answerAr: 'يتكامل Accez.cloud مع أكثر من 400 قناة بما في ذلك المنصات الرئيسية مثل Airbnb و Booking.com و Expedia و VRBO و HomeAway والعديد غيرها. هذا يتيح لك إدارة جميع حجوزاتك من لوحة تحكم مركزية واحدة.',
    },
    {
      question: 'How can I earn additional revenue with the service marketplace?',
      questionAr: 'كيف يمكنني كسب إيرادات إضافية من سوق الخدمات؟',
      answer: 'Our service marketplace connects property owners with local service providers for cleaning, maintenance, repairs, and other services. Property managers can earn 15-30% commission on every transaction, creating a new revenue stream within the first year.',
      answerAr: 'يربط سوق الخدمات لدينا مالكي العقارات بمقدمي الخدمات المحليين للتنظيف والصيانة والإصلاحات وخدمات أخرى. يمكن لمديري العقارات كسب عمولة تتراوح بين 15-30% على كل معاملة، مما يخلق مصدر دخل جديد خلال السنة الأولى.',
    },
    {
      question: 'Is my property and tenant data secure?',
      questionAr: 'هل بيانات عقاري والمستأجرين آمنة؟',
      answer: 'Yes, security is our top priority. All data is encrypted in transit and at rest. We are GDPR compliant and follow industry best practices for data protection. Enterprise plans include additional security features and on-premise deployment options.',
      answerAr: 'نعم، الأمان هو أولويتنا القصوى. جميع البيانات مشفرة أثناء النقل وفي حالة السكون. نحن متوافقون مع GDPR ونتبع أفضل ممارسات الصناعة لحماية البيانات. تتضمن خطط المؤسسات ميزات أمان إضافية وخيارات نشر محلية.',
    },
    {
      question: 'Can I cancel my subscription at any time?',
      questionAr: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
      answer: 'Yes, you can cancel your subscription at any time with no cancellation fees or penalties. If you cancel during your 14-day free trial, you will not be charged.',
      answerAr: 'نعم، يمكنك إلغاء اشتراكك في أي وقت بدون رسوم أو عقوبات إلغاء. إذا ألغيت خلال فترة التجربة المجانية لمدة 14 يومًا، فلن يتم تحصيل أي رسوم منك.',
    },
  ]

  // Generate JSON-LD structured data for FAQ (always in English for SEO)
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />

      <section className="py-20 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t.faq.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t.faq.subtitle}
              </p>
            </div>
          </FadeUp>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FadeUp key={index} delay={index * 0.07}>
                <div
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <button
                    className="w-full text-left p-6 focus:outline-none rounded-lg"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 pr-8">
                        {language === 'ar' ? faq.questionAr : faq.question}
                      </h3>
                      <svg
                        className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">
                            {language === 'ar' ? faq.answerAr : faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
