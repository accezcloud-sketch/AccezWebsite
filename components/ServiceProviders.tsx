'use client'

import { motion } from 'framer-motion'
import {
  CalendarCheck,
  ClipboardList,
  Star,
  Store,
  Tag,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { PORTAL_SIGN_UP } from '@/lib/links'
import FadeUp from '@/components/animations/FadeUp'
import RevealLine from '@/components/animations/RevealLine'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'
import ImageCarousel, { type CarouselSlide } from '@/components/ImageCarousel'

const STEP_ICONS: LucideIcon[] = [UserPlus, ClipboardList, CalendarCheck]

// Uniform accent, the three benefit cards are one set, not three colours.
const BENEFIT_ICONS: LucideIcon[] = [Store, Tag, Star]

/** The real marketplace + booking flow, shown in the section carousel. */
const SLIDES: CarouselSlide[] = [
  { src: '/capabilities/service-providers/1.png', caption: 'The Accez marketplace',            captionAr: 'سوق أكسيز' },
  { src: '/capabilities/service-providers/2.png', caption: 'Your services, prices and reviews', captionAr: 'خدماتك وأسعارك وتقييماتك' },
  { src: '/capabilities/service-providers/3.png', caption: 'Customers choose their services',   captionAr: 'العملاء يختارون خدماتهم' },
  { src: '/capabilities/service-providers/4.png', caption: 'They pick a date and time',         captionAr: 'يختارون التاريخ والوقت' },
  { src: '/capabilities/service-providers/5.png', caption: 'Review and confirm the booking',    captionAr: 'مراجعة الحجز وتأكيده' },
]

const CONTENT = {
  en: {
    badge: 'New',
    eyebrow: 'Service Providers',
    titleLead: 'Accez is now open to',
    titleAccent: 'service providers',
    subtitle:
      'Accez is not only for property managers. Any independent business can join as a service provider: salons and barbers, spas and wellness studios, fitness coaches, photographers, home services and more. It is its own account type, with its own listing on the Accez marketplace.',

    stepsTitle: 'How it works',
    steps: [
      {
        title: 'Create your provider account',
        description:
          'Open the Accez registration page and choose the Service Provider card. This is a separate account type from a property manager, and it is created straight away.',
      },
      {
        title: 'Build your listing',
        description:
          'Add your business name, photos, category, location and opening hours, then list each service with its own duration and price. You can also set a service to Ask for pricing.',
      },
      {
        title: 'Take bookings',
        description:
          'Your listing goes live on the Accez marketplace, where customers search, filter by category and find you on the map. Bookings are instant and every one reaches your provider dashboard.',
      },
    ],

    ctaPrimary: 'Create a Service Provider account',
    ctaPlans: 'See plans and pricing',

    benefitsTitle: 'What you get as a provider',
    benefits: [
      {
        title: 'Your own listing page',
        description:
          'A public page for your business on the Accez marketplace with your photos, an about section, your location and directions, your opening hours for every day of the week, and your full service list.',
        stat: 'Public business profile',
      },
      {
        title: 'Your services, your prices',
        description:
          'Publish each service with its own duration and price in SAR, or set it to Ask for pricing. Customers see what is available and can only book inside the hours you set.',
        stat: 'You set prices and hours',
      },
      {
        title: 'Found, booked and reviewed',
        description:
          'Customers browse by category such as Beauty, Spa and Wellness, Fitness, Photography and Home services, search by name and filter on a map. Completed bookings earn ratings and reviews shown on your listing.',
        stat: 'Ratings build your profile',
      },
    ],

    mock: {
      url: 'Service Provider Dashboard',
      panelTitle: 'Upcoming bookings',
      panelBadge: '3 new',
      bookings: [
        { name: 'Haircut and styling',  detail: 'Cutting · 45 mins · SAR 30',      when: 'Today, 14:00',    status: 'Confirmed', color: '#10b981' },
        { name: 'Full body massage',    detail: 'Spa and Wellness · 60 mins · SAR 100', when: 'Tomorrow, 09:30', status: 'New',       color: '#319fd4' },
        { name: 'Portrait session',     detail: 'Photography · 90 mins · SAR 250', when: 'Thu, 11:00',      status: 'Scheduled', color: '#f59e0b' },
      ],
      stats: [
        { label: 'Bookings this month', value: '38' },
        { label: 'Listing views',       value: '1.2k' },
        { label: 'Avg. rating',         value: '4.9' },
      ],
      footNote: 'Bookings come from customers on the Accez marketplace',
    },
  },

  ar: {
    badge: 'جديد',
    eyebrow: 'مقدمو الخدمات',
    titleLead: 'أكسيز الآن متاحة',
    titleAccent: 'لمقدمي الخدمات',
    subtitle:
      'أكسيز ليست لمديري العقارات فقط. يمكن لأي نشاط تجاري مستقل الانضمام كمقدم خدمة: صالونات الحلاقة والتجميل، المنتجعات الصحية، مدربو اللياقة، المصورون، الخدمات المنزلية وغيرها. إنه نوع حساب مستقل بذاته، وله صفحته الخاصة في سوق أكسيز.',

    stepsTitle: 'كيف تعمل',
    steps: [
      {
        title: 'أنشئ حساب مقدم الخدمة',
        description:
          'افتح صفحة التسجيل في أكسيز واختر بطاقة مقدم خدمة. هذا نوع حساب مستقل عن حساب مدير العقارات، ويتم إنشاؤه فورًا.',
      },
      {
        title: 'جهّز صفحتك',
        description:
          'أضف اسم نشاطك وصورك وفئتك وموقعك وساعات العمل، ثم أدرج كل خدمة بمدتها وسعرها. ويمكنك أيضًا ضبط الخدمة على خيار اطلب السعر.',
      },
      {
        title: 'استقبل الحجوزات',
        description:
          'تظهر صفحتك في سوق أكسيز حيث يبحث العملاء ويصفّون حسب الفئة ويجدونك على الخريطة. الحجز فوري، ويصل كل حجز إلى لوحة تحكم مقدم الخدمة.',
      },
    ],

    ctaPrimary: 'أنشئ حساب مقدم خدمة',
    ctaPlans: 'اطّلع على الخطط والأسعار',

    benefitsTitle: 'ماذا تحصل عليه كمقدم خدمة',
    benefits: [
      {
        title: 'صفحة خاصة بنشاطك',
        description:
          'صفحة عامة لنشاطك في سوق أكسيز تضم صورك ونبذة عنك وموقعك والاتجاهات إليه وساعات العمل لكل يوم في الأسبوع، إضافة إلى قائمة خدماتك كاملة.',
        stat: 'ملف تجاري عام',
      },
      {
        title: 'خدماتك وأسعارك',
        description:
          'انشر كل خدمة بمدتها وسعرها بالريال، أو اضبطها على خيار اطلب السعر. يرى العملاء ما هو متاح ولا يمكنهم الحجز إلا ضمن الساعات التي تحددها.',
        stat: 'أنت تحدد الأسعار والأوقات',
      },
      {
        title: 'يجدونك ويحجزون ويقيّمون',
        description:
          'يتصفح العملاء حسب الفئة مثل التجميل والمنتجعات الصحية واللياقة والتصوير والخدمات المنزلية، ويبحثون بالاسم ويصفّون على الخريطة. الحجوزات المكتملة تكسبك تقييمات ومراجعات تظهر في صفحتك.',
        stat: 'التقييمات تبني سمعتك',
      },
    ],

    mock: {
      url: 'لوحة تحكم مقدم الخدمة',
      panelTitle: 'الحجوزات القادمة',
      panelBadge: '3 جديدة',
      bookings: [
        { name: 'قص وتصفيف شعر', detail: 'حلاقة · 45 دقيقة · 30 ريال',            when: 'اليوم، 14:00',  status: 'مؤكد',  color: '#10b981' },
        { name: 'مساج كامل',      detail: 'منتجع صحي · 60 دقيقة · 100 ريال',      when: 'غدًا، 09:30',    status: 'جديد',  color: '#319fd4' },
        { name: 'جلسة تصوير',     detail: 'تصوير · 90 دقيقة · 250 ريال',          when: 'الخميس، 11:00', status: 'مجدول', color: '#f59e0b' },
      ],
      stats: [
        { label: 'حجوزات هذا الشهر', value: '38' },
        { label: 'مشاهدات الصفحة',   value: '1.2k' },
        { label: 'متوسط التقييم',    value: '4.9' },
      ],
      footNote: 'تصل الحجوزات من العملاء عبر سوق أكسيز',
    },
  },
} as const

export default function ServiceProviders() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]

  return (
    <section className="py-20" id="service-providers" style={{ background: 'var(--bg)' }}>
      <style>{`
        .sp-card {
          position: relative;
          transition:
            transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1),
            border-color 0.3s ease;
        }
        .sp-card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--accent) 20%, transparent);
          box-shadow:
            0 12px 40px rgba(0,0,0,0.3),
            0 0 0 1px color-mix(in srgb, var(--accent) 13%, transparent);
        }
        .sp-card:hover .sp-icon-box { transform: scale(1.08); }
        .sp-icon-box { transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1); }

        .sp-btn-glow:hover {
          box-shadow: 0 0 0 3px rgba(49, 159, 212,.3), 0 8px 32px rgba(49, 159, 212,.4);
        }

        @media (prefers-reduced-motion: reduce) {
          .sp-card:hover { transform: none; }
        }
      `}</style>

      <div className="container mx-auto px-4">
        {/* ── Section header ─────────────────────────────────────────── */}
        <FadeUp>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to left, transparent, var(--accent))'
                  : 'linear-gradient(to right, transparent, var(--accent))' }}
              />
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--accent-hi)' }}
              >
                <span
                  className="px-2 py-0.5 rounded-full tracking-normal"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--accent-line)',
                    color: 'var(--accent-hi)',
                  }}
                >
                  {t.badge}
                </span>
                {t.eyebrow}
              </span>
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to right, transparent, var(--accent))'
                  : 'linear-gradient(to left, transparent, var(--accent))' }}
              />
            </div>

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

            <p
              className="text-slate-400 text-center max-w-2xl mx-auto mt-4 leading-relaxed"
              style={{ fontSize: 17 }}
            >
              {t.subtitle}
            </p>
          </div>
        </FadeUp>

        <RevealLine className="w-full max-w-7xl mx-auto my-8" delay={0.1} />

        {/* ── Steps + provider dashboard preview ─────────────────────── */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: how it works + CTAs */}
          <FadeUp delay={0.1}>
            <h3
              className="text-white font-semibold mb-6"
              style={{
                fontSize: 20,
                fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
              }}
            >
              {t.stepsTitle}
            </h3>

            <ol className="flex flex-col gap-5">
              {t.steps.map((step, index) => {
                const StepIcon = STEP_ICONS[index]
                return (
                  <li key={step.title} className="flex gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'var(--accent-dim)',
                          border: '1px solid var(--accent-line)',
                        }}
                      >
                        <StepIcon size={19} color="var(--accent-hi)" strokeWidth={1.75} />
                      </div>
                      {index < t.steps.length - 1 && (
                        <div
                          className="w-px flex-1 mt-2"
                          style={{ background: 'linear-gradient(to bottom, var(--accent-line), transparent)' }}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="pb-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="text-[11px] font-bold tracking-widest"
                          style={{ color: 'var(--accent)' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-white font-semibold" style={{ fontSize: 16 }}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="leading-relaxed" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                        {step.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
              <a
                href={PORTAL_SIGN_UP}
                target="_blank"
                rel="noopener noreferrer"
                className="sp-btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--accent)',
                  fontSize: 15,
                }}
              >
                {t.ctaPrimary}
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="/service-providers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-hi)',
                  color: 'var(--text)',
                  fontSize: 15,
                }}
              >
                {t.ctaPlans}
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </FadeUp>

          {/* Right: real marketplace + booking flow */}
          <FadeUp delay={0.2}>
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-[70px] opacity-25 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 45%, var(--accent), transparent 68%)' }}
                aria-hidden="true"
              />

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 20px 48px rgba(0,0,0,.5)',
                }}
              >
                <ImageCarousel
                  slides={SLIDES}
                  alt={t.eyebrow}
                  language={language}
                  isRTL={isRTL}
                />
              </div>

              <p
                className="text-center mt-4"
                style={{ fontSize: 13, color: 'var(--text-faint)' }}
              >
                {t.mock.footNote}
              </p>
            </div>
          </FadeUp>
        </div>

        {/* ── Benefits ───────────────────────────────────────────────── */}
        <FadeUp delay={0.1}>
          <h3
            className="text-white font-semibold text-center mt-20 mb-8"
            style={{
              fontSize: 22,
              fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
            }}
          >
            {t.benefitsTitle}
          </h3>
        </FadeUp>

        <StaggerGrid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          staggerDelay={0.09}
        >
          {t.benefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index]
            return (
              <motion.div key={benefit.title} variants={staggerItem}>
                <div
                  className="sp-card flex flex-col gap-4 rounded-2xl p-6 cursor-default h-full"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    ['--accent' as string]: 'var(--accent)',
                  } as React.CSSProperties}
                >
                  <div
                    className="sp-icon-box w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                  >
                    <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h4 className="text-white font-semibold leading-snug" style={{ fontSize: 16 }}>
                      {benefit.title}
                    </h4>
                    <p className="leading-relaxed flex-1" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                      {benefit.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: 'var(--accent-hi)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: 'var(--accent-hi)' }}
                      />
                      {benefit.stat}
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
