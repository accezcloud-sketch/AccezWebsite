'use client'

import { motion } from 'framer-motion'
import {
  LayoutGrid,
  CreditCard,
  Wrench,
  ShoppingBag,
  BarChart3,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

// One icon per feature. Colour is deliberately uniform, every card shares the
// brand accent, so the grid reads as one system instead of six unrelated tiles.
const FEATURE_ICONS: LucideIcon[] = [
  LayoutGrid,
  CreditCard,
  Wrench,
  ShoppingBag,
  BarChart3,
  Smartphone,
]

export default function Features() {
  const { language, isRTL } = useLanguage()

  const content = {
    en: {
      eyebrow: 'Platform Features',
      titleLead: 'Everything you need to',
      titleAccent: 'scale your portfolio',
      subtitle:
        'Everything you need to streamline operations and maximize property revenue, from a single dashboard.',
      features: [
        { title: 'Multi-Channel Booking',       description: 'Centralized management across 400+ channels including Airbnb, Booking.com, Expedia, and more.', stat: '400+ channels' },
        { title: 'Automated Rent Collection',   description: 'Streamline payment processing with automated rent collection and secure transaction handling.', stat: 'Zero missed payments' },
        { title: 'Maintenance Scheduling',      description: 'Efficiently manage property maintenance with automated scheduling and service provider coordination.', stat: 'Auto-dispatched' },
        { title: 'Service Marketplace',         description: 'Generate 15 to 30% additional revenue through commission-based local service marketplace.', stat: '15 to 30% more revenue' },
        { title: 'Multi-Property Analytics',    description: 'Comprehensive dashboards tracking performance, occupancy rates, and revenue across all properties.', stat: 'Real-time insights' },
        { title: 'Custom Branded Apps',         description: 'White-label mobile apps and websites with your branding for seamless tenant experience.', stat: 'Your brand, your app' },
      ],
    },
    ar: {
      eyebrow: 'ميزات المنصة',
      titleLead: 'كل ما تحتاجه',
      titleAccent: 'لتوسيع محفظتك العقارية',
      subtitle:
        'كل ما تحتاجه لتبسيط العمليات وتعظيم إيرادات العقارات، من لوحة تحكم واحدة.',
      features: [
        { title: 'حجوزات متعددة القنوات',       description: 'إدارة مركزية عبر أكثر من 400 قناة بما في ذلك Airbnb و Booking.com و Expedia والمزيد.', stat: '+400 قناة' },
        { title: 'تحصيل الإيجارات الآلي',       description: 'تبسيط معالجة المدفوعات مع تحصيل الإيجارات الآلي ومعالجة المعاملات الآمنة.', stat: 'صفر مدفوعات فائتة' },
        { title: 'جدولة الصيانة',                description: 'إدارة صيانة العقارات بكفاءة مع الجدولة الآلية والتنسيق مع مقدمي الخدمات.', stat: 'إرسال آلي' },
        { title: 'سوق الخدمات',                  description: 'توليد 15 to 30% إيرادات إضافية من خلال سوق الخدمات المحلية القائم على العمولة.', stat: 'إيرادات أعلى بنسبة 15 to 30%' },
        { title: 'تحليلات متعددة العقارات',     description: 'لوحات معلومات شاملة لتتبع الأداء ومعدلات الإشغال والإيرادات عبر جميع العقارات.', stat: 'رؤى لحظية' },
        { title: 'تطبيقات بعلامتك التجارية',    description: 'تطبيقات جوال ومواقع ويب بعلامتك التجارية لتجربة مستأجر سلسة.', stat: 'علامتك التجارية، تطبيقك' },
      ],
    },
  }

  const t = content[language]

  return (
    <section className="py-20" id="features" style={{ background: 'var(--bg)' }}>
      <style>{`
        .feature-card {
          position: relative;
          transition:
            transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1),
            border-color 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--accent) 20%, transparent);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.3),
            0 0 0 1px color-mix(in srgb, var(--accent) 13%, transparent);
        }
        .feature-card:hover .feature-icon-box {
          transform: scale(1.08);
        }
        .feature-icon-box {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            transparent 40%,
            rgba(255, 255, 255, 0.03) 50%,
            transparent 60%
          );
          background-size: 200% 200%;
          background-position: 100% 100%;
          transition: background-position 0.6s ease;
          pointer-events: none;
        }
        .feature-card:hover::before {
          background-position: 0% 0%;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 1px;
          border-radius: 999px;
          background: var(--accent);
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .feature-card:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="text-center mb-12">
            {/* Section eyebrow */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to left, transparent, var(--accent))'
                  : 'linear-gradient(to right, transparent, var(--accent))' }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--accent-hi)' }}
              >
                {t.eyebrow}
              </span>
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to right, transparent, var(--accent))'
                  : 'linear-gradient(to left, transparent, var(--accent))' }}
              />
            </div>

            {/* Main heading */}
            <h2
              className="text-white font-bold text-center leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
                fontWeight: 800,
              }}
            >
              {t.titleLead}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #7fcdef, #5fb8e8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t.titleAccent}
              </span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-slate-400 text-center max-w-xl mx-auto mt-4 leading-relaxed"
              style={{ fontSize: 17 }}
            >
              {t.subtitle}
            </p>
          </div>
        </FadeUp>

        <StaggerGrid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          staggerDelay={0.09}
        >
          {t.features.map((feature, index) => {
            const Icon = FEATURE_ICONS[index]
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <div
                  className="feature-card group flex flex-col gap-4 rounded-2xl p-6 cursor-default h-full"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    ['--accent' as string]: 'var(--accent)',
                  } as React.CSSProperties}
                >
                  {/* Icon box */}
                  <div
                    className="feature-icon-box w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--accent-line)',
                    }}
                  >
                    <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h3
                      className="text-white font-semibold leading-snug"
                      style={{ fontSize: 16 }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="leading-relaxed flex-1"
                      style={{ fontSize: 14, color: 'var(--text-muted)' }}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Stat pill at bottom */}
                  <div className="mt-auto pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: 'var(--accent-hi)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--accent-hi)' }}
                      />
                      {feature.stat}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </StaggerGrid>
      </div>
    </section>
  )
}
