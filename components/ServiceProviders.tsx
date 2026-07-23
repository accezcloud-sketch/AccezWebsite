'use client'

import { motion } from 'framer-motion'
import {
  CalendarCheck,
  Camera,
  ClipboardList,
  Scissors,
  Sparkles,
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

const STEP_ICONS: LucideIcon[] = [UserPlus, ClipboardList, CalendarCheck]

/** Icons for the mock booking rows, one per row. */
const BOOKING_ICONS: LucideIcon[] = [Scissors, Sparkles, Camera]

const BENEFIT_CONFIG = [
  { icon: Store, iconBg: '#042f2e', iconColor: '#34d399', iconBorder: 'rgba(52,211,153,0.2)',  accentColor: '#10b981' },
  { icon: Tag,   iconBg: '#1e1b4b', iconColor: '#818cf8', iconBorder: 'rgba(129,140,248,0.2)', accentColor: '#6366f1' },
  { icon: Star,  iconBg: '#1c1917', iconColor: '#fb923c', iconBorder: 'rgba(251,146,60,0.2)',  accentColor: '#f97316' },
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
        { name: 'Full body massage',    detail: 'Spa and Wellness · 60 mins · SAR 100', when: 'Tomorrow, 09:30', status: 'New',       color: '#6366f1' },
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
        { name: 'مساج كامل',      detail: 'منتجع صحي · 60 دقيقة · 100 ريال',      when: 'غدًا، 09:30',    status: 'جديد',  color: '#6366f1' },
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
    <section className="py-20" id="service-providers" style={{ background: '#080c18' }}>
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
          box-shadow: 0 0 0 3px rgba(99,102,241,.3), 0 8px 32px rgba(99,102,241,.4);
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
                  ? 'linear-gradient(to left, transparent, #6366f1)'
                  : 'linear-gradient(to right, transparent, #6366f1)' }}
              />
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#818cf8' }}
              >
                <span
                  className="px-2 py-0.5 rounded-full tracking-normal"
                  style={{
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.25)',
                    color: '#34d399',
                  }}
                >
                  {t.badge}
                </span>
                {t.eyebrow}
              </span>
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to right, transparent, #6366f1)'
                  : 'linear-gradient(to left, transparent, #6366f1)' }}
              />
            </div>

            <h2
              className="text-white font-bold text-center leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontFamily: 'var(--font-manrope), var(--font-inter), system-ui, sans-serif',
                fontWeight: 800,
              }}
            >
              {t.titleLead}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #c084fc)',
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
                fontFamily: 'var(--font-manrope), var(--font-inter), system-ui, sans-serif',
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
                          background: 'rgba(99,102,241,0.12)',
                          border: '1px solid rgba(99,102,241,0.28)',
                        }}
                      >
                        <StepIcon size={19} color="#818cf8" strokeWidth={1.75} />
                      </div>
                      {index < t.steps.length - 1 && (
                        <div
                          className="w-px flex-1 mt-2"
                          style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.35), transparent)' }}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <div className="pb-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="text-[11px] font-bold tracking-widest"
                          style={{ color: '#6366f1' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-white font-semibold" style={{ fontSize: 16 }}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-slate-400 leading-relaxed" style={{ fontSize: 14 }}>
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
                  background: 'linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)',
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
            </div>
          </FadeUp>

          {/* Right: provider dashboard mock */}
          <FadeUp delay={0.2}>
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-[70px] opacity-25 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, #6366f1, #10b981, transparent 70%)' }}
                aria-hidden="true"
              />

              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(15,23,42,.9)',
                  border: '1px solid rgba(255,255,255,.1)',
                  boxShadow: '0 20px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06)',
                }}
              >
                {/* Browser chrome */}
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{
                    background: 'linear-gradient(90deg,#1e1b4b,#1e3a5f,#0f172a)',
                    borderBottom: '1px solid rgba(255,255,255,.07)',
                  }}
                  dir="ltr"
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono tracking-wider">
                    {t.mock.url}
                  </span>
                  <div className="w-12" />
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                  {/* Stat tiles */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {t.mock.stats.map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-xl p-2.5 sm:p-3"
                        style={{
                          background: 'rgba(255,255,255,.04)',
                          border: '1px solid rgba(255,255,255,.06)',
                        }}
                      >
                        <p className="text-[10px] text-slate-500 mb-1 leading-tight">{label}</p>
                        <p className="text-white font-bold text-lg leading-none">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Incoming requests */}
                  <div
                    className="rounded-xl p-3"
                    style={{
                      background: 'rgba(255,255,255,.04)',
                      border: '1px solid rgba(255,255,255,.06)',
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] text-slate-400 font-medium">{t.mock.panelTitle}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: 'rgba(99,102,241,.18)', color: '#a5b4fc' }}
                      >
                        {t.mock.panelBadge}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {t.mock.bookings.map(({ name, detail, when, status, color }, index) => {
                        const BookingIcon = BOOKING_ICONS[index]
                        return (
                        <div key={name} className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: color + '22', border: `1px solid ${color}44` }}
                          >
                            <BookingIcon size={13} color={color} strokeWidth={1.9} aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-[11px] font-medium truncate">{name}</p>
                            <p className="text-slate-500 text-[10px] truncate">{detail} · {when}</p>
                          </div>
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-semibold flex-shrink-0"
                            style={{ background: color + '22', color }}
                          >
                            {status}
                          </span>
                        </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Source note */}
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: 'rgba(16,185,129,.08)',
                      border: '1px solid rgba(16,185,129,.2)',
                    }}
                  >
                    <Store size={13} color="#34d399" strokeWidth={1.9} className="flex-shrink-0" aria-hidden="true" />
                    <span className="text-[11px] text-green-400 font-medium truncate">
                      {t.mock.footNote}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── Benefits ───────────────────────────────────────────────── */}
        <FadeUp delay={0.1}>
          <h3
            className="text-white font-semibold text-center mt-20 mb-8"
            style={{
              fontSize: 22,
              fontFamily: 'var(--font-manrope), var(--font-inter), system-ui, sans-serif',
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
            const config = BENEFIT_CONFIG[index]
            const Icon = config.icon
            return (
              <motion.div key={benefit.title} variants={staggerItem}>
                <div
                  className="sp-card flex flex-col gap-4 rounded-2xl p-6 cursor-default h-full"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    ['--accent' as string]: config.accentColor,
                  } as React.CSSProperties}
                >
                  <div
                    className="sp-icon-box w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: config.iconBg, border: `1px solid ${config.iconBorder}` }}
                  >
                    <Icon size={20} color={config.iconColor} strokeWidth={1.75} />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h4 className="text-white font-semibold leading-snug" style={{ fontSize: 16 }}>
                      {benefit.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed flex-1" style={{ fontSize: 14 }}>
                      {benefit.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-white/[0.05]">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: config.iconColor }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: config.iconColor }}
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
