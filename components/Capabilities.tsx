'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

interface Capability {
  id: string
  icon: React.ReactNode
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  image: string
}

export default function Capabilities() {
  const [activeTab, setActiveTab] = useState(0)
  const { language } = useLanguage()

  const capabilities: Capability[] = [
    {
      id: 'booking',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Booking Management',
      titleAr: 'إدارة الحجوزات',
      description: 'Manage all vacation rentals with our comprehensive property management software. From single apartments to large portfolios, streamline centralized bookings and performance tracking. Additionally, our platform provides detailed analytics for data-driven decisions.',
      descriptionAr: 'إدارة جميع إيجارات العطلات مع برنامج إدارة العقارات الشامل. من الشقق الفردية إلى المحافظ الكبيرة، قم بتبسيط الحجوزات المركزية وتتبع الأداء. بالإضافة إلى ذلك، توفر منصتنا تحليلات مفصلة لاتخاذ قرارات مبنية على البيانات.',
      image: '/capabilities/booking.png',
    },
    {
      id: 'services',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Services Booking',
      titleAr: 'حجز الخدمات',
      description: 'Enable tenants to book amenities and services directly through the platform. From gym reservations to cleaning services, create additional revenue streams while improving tenant satisfaction and engagement.',
      descriptionAr: 'تمكين المستأجرين من حجز المرافق والخدمات مباشرة من خلال المنصة. من حجوزات الصالة الرياضية إلى خدمات التنظيف، أنشئ مصادر دخل إضافية مع تحسين رضا المستأجرين وتفاعلهم.',
      image: '/capabilities/services.png',
    },
    {
      id: 'channels',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Channel Configuration',
      titleAr: 'تكوين القنوات',
      description: 'Connect and sync with 400+ booking channels including Airbnb, Booking.com, Expedia, and VRBO. Manage availability, rates, and reservations from a single dashboard with real-time synchronization.',
      descriptionAr: 'الاتصال والمزامنة مع أكثر من 400 قناة حجز بما في ذلك Airbnb و Booking.com و Expedia و VRBO. إدارة التوافر والأسعار والحجوزات من لوحة تحكم واحدة مع المزامنة في الوقت الفعلي.',
      image: '/capabilities/channels.png',
    },
    {
      id: 'analytics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Revenue and Analytics',
      titleAr: 'الإيرادات والتحليلات',
      description: 'Track performance metrics, occupancy rates, and revenue across all properties. Generate comprehensive reports with actionable insights to optimize pricing strategies and maximize returns.',
      descriptionAr: 'تتبع مقاييس الأداء ومعدلات الإشغال والإيرادات عبر جميع العقارات. إنشاء تقارير شاملة مع رؤى قابلة للتنفيذ لتحسين استراتيجيات التسعير وتعظيم العوائد.',
      image: '/capabilities/analytics.png',
    },
    {
      id: 'workorders',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Work Orders Management',
      titleAr: 'إدارة أوامر العمل',
      description: 'Streamline maintenance workflows from request to completion. Assign tasks to vendors, track progress in real-time, and maintain a complete history of all property maintenance activities.',
      descriptionAr: 'تبسيط سير عمل الصيانة من الطلب إلى الإنجاز. تعيين المهام للموردين، تتبع التقدم في الوقت الفعلي، والحفاظ على سجل كامل لجميع أنشطة صيانة العقارات.',
      image: '/capabilities/workorders.png',
    },
    {
      id: 'units',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Property Units Management',
      titleAr: 'إدارة وحدات العقارات',
      description: 'Organize and manage all property units with detailed profiles including amenities, photos, and specifications. Track unit status, lease terms, and tenant information in one centralized location.',
      descriptionAr: 'تنظيم وإدارة جميع وحدات العقارات مع ملفات تعريف مفصلة تشمل المرافق والصور والمواصفات. تتبع حالة الوحدة وشروط الإيجار ومعلومات المستأجر في موقع مركزي واحد.',
      image: '/capabilities/units.png',
    },
    {
      id: 'communications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Communications',
      titleAr: 'الاتصالات',
      description: 'Centralize all tenant communications in one inbox. Send announcements, respond to inquiries, and maintain conversation history. Automated messaging keeps tenants informed about important updates.',
      descriptionAr: 'مركزة جميع اتصالات المستأجرين في صندوق وارد واحد. إرسال الإعلانات، الرد على الاستفسارات، والحفاظ على سجل المحادثات. الرسائل الآلية تبقي المستأجرين على اطلاع بالتحديثات المهمة.',
      image: '/capabilities/communications.png',
    },
  ]

  const activeCapability = capabilities[activeTab]

  const content = {
    en: {
      sectionTitle: 'Powerful Capabilities',
      sectionSubtitle: 'Everything you need to manage your properties efficiently',
    },
    ar: {
      sectionTitle: 'إمكانيات قوية',
      sectionSubtitle: 'كل ما تحتاجه لإدارة عقاراتك بكفاءة',
    },
  }

  const t = content[language]

  return (
    <section className="py-20 bg-gray-50" id="capabilities">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout - Buttons with inline content */}
          <div className="lg:hidden space-y-2">
            {capabilities.map((capability, index) => (
              <div key={capability.id}>
                <button
                  onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    activeTab === index
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeTab === index
                        ? 'bg-gray-700'
                        : 'bg-gray-100'
                    }`}
                  >
                    <span className={activeTab === index ? 'text-white' : 'text-gray-900'}>
                      {capability.icon}
                    </span>
                  </div>
                  <span className="font-medium flex-1">
                    {language === 'ar' ? capability.titleAr : capability.title}
                  </span>
                  {/* Chevron indicator */}
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      activeTab === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Inline content for mobile - shown below selected button */}
                {activeTab === index && (
                  <div className="mt-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative aspect-[2/1] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <Image
                        src={capability.image}
                        alt={language === 'ar' ? capability.titleAr : capability.title}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        quality={100}
                        unoptimized
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {language === 'ar' ? capability.descriptionAr : capability.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Layout - Side by side */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
            {/* Left side - Tab buttons */}
            <div className="col-span-4 space-y-2">
              {capabilities.map((capability, index) => (
                <button
                  key={capability.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    activeTab === index
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activeTab === index
                        ? 'bg-gray-700'
                        : 'bg-gray-100'
                    }`}
                  >
                    <span className={activeTab === index ? 'text-white' : 'text-gray-900'}>
                      {capability.icon}
                    </span>
                  </div>
                  <span className="font-medium">
                    {language === 'ar' ? capability.titleAr : capability.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Right side - Content */}
            <div className="col-span-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-[2/1] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <Image
                    src={activeCapability.image}
                    alt={language === 'ar' ? activeCapability.titleAr : activeCapability.title}
                    fill
                    className="object-contain"
                    sizes="66vw"
                    quality={100}
                    unoptimized
                    priority={activeTab === 0}
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'ar' ? activeCapability.descriptionAr : activeCapability.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
