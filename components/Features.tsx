'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

export default function Features() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: 'Comprehensive Property Management Tools',
      subtitle: 'Everything you need to streamline operations and maximize property revenue',
      features: [
        {
          icon: '🏢',
          title: 'Multi-Channel Booking',
          description: 'Centralized management across 400+ channels including Airbnb, Booking.com, Expedia, and more.',
        },
        {
          icon: '💳',
          title: 'Automated Rent Collection',
          description: 'Streamline payment processing with automated rent collection and secure transaction handling.',
        },
        {
          icon: '🛠️',
          title: 'Maintenance Scheduling',
          description: 'Efficiently manage property maintenance with automated scheduling and service provider coordination.',
        },
        {
          icon: '🏪',
          title: 'Service Marketplace',
          description: 'Generate 15-30% additional revenue through commission-based local service marketplace.',
        },
        {
          icon: '📊',
          title: 'Multi-Property Analytics',
          description: 'Comprehensive dashboards tracking performance, occupancy rates, and revenue across all properties.',
        },
        {
          icon: '📱',
          title: 'Custom Branded Apps',
          description: 'White-label mobile apps and websites with your branding for seamless tenant experience.',
        },
      ],
    },
    ar: {
      title: 'أدوات شاملة لإدارة العقارات',
      subtitle: 'كل ما تحتاجه لتبسيط العمليات وتعظيم إيرادات العقارات',
      features: [
        {
          icon: '🏢',
          title: 'حجوزات متعددة القنوات',
          description: 'إدارة مركزية عبر أكثر من 400 قناة بما في ذلك Airbnb و Booking.com و Expedia والمزيد.',
        },
        {
          icon: '💳',
          title: 'تحصيل الإيجارات الآلي',
          description: 'تبسيط معالجة المدفوعات مع تحصيل الإيجارات الآلي ومعالجة المعاملات الآمنة.',
        },
        {
          icon: '🛠️',
          title: 'جدولة الصيانة',
          description: 'إدارة صيانة العقارات بكفاءة مع الجدولة الآلية والتنسيق مع مقدمي الخدمات.',
        },
        {
          icon: '🏪',
          title: 'سوق الخدمات',
          description: 'توليد 15-30% إيرادات إضافية من خلال سوق الخدمات المحلية القائم على العمولة.',
        },
        {
          icon: '📊',
          title: 'تحليلات متعددة العقارات',
          description: 'لوحات معلومات شاملة لتتبع الأداء ومعدلات الإشغال والإيرادات عبر جميع العقارات.',
        },
        {
          icon: '📱',
          title: 'تطبيقات بعلامتك التجارية',
          description: 'تطبيقات جوال ومواقع ويب بعلامتك التجارية لتجربة مستأجر سلسة.',
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
        </FadeUp>

        <StaggerGrid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          staggerDelay={0.09}
        >
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>
    </section>
  )
}
