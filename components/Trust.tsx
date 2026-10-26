import { CreditCard, ShieldCheck, MapPin, type LucideIcon } from 'lucide-react'
import ArabicEnglishIcon from '@/components/ui/ArabicEnglishIcon'
import type { Locale } from '@/lib/i18n'

interface IntegrationGroup {
  label: string
  labelAr: string
  items: string[]
}

// The integrations the owner confirmed (2026-10-18, updated 2026-10-26):
// Airbnb, Booking.com and Expedia; RoomCloud and iCal; Stripe and Tap; Twilio
// SMS. Nothing else (no VRBO, no "400+ channels", no WhatsApp integration).
const INTEGRATIONS: IntegrationGroup[] = [
  {
    label: 'Booking channels',
    labelAr: 'قنوات الحجز',
    items: ['Airbnb', 'Booking.com', 'Expedia'],
  },
  {
    label: 'Channel manager & calendars',
    labelAr: 'مدير القنوات والتقاويم',
    items: ['RoomCloud', 'iCal sync'],
  },
  {
    label: 'Payments',
    labelAr: 'المدفوعات',
    items: ['Stripe', 'Tap Payments'],
  },
  {
    label: 'Communications',
    labelAr: 'الاتصالات',
    items: ['Twilio SMS'],
  },
]

interface TrustPoint {
  icon: LucideIcon | typeof ArabicEnglishIcon
  title: string
  titleAr: string
  desc: string
  descAr: string
}

const POINTS: TrustPoint[] = [
  {
    icon: ArabicEnglishIcon,
    title: 'Arabic & English, native',
    titleAr: 'العربية والإنجليزية بشكل أصيل',
    desc: 'Every screen in both languages, right-to-left throughout, not a bolted-on translation.',
    descAr: 'كل شاشة باللغتين، مع دعم كامل للكتابة من اليمين لليسار، وليست مجرد ترجمة مضافة.',
  },
  {
    icon: CreditCard,
    title: 'Card payments',
    titleAr: 'مدفوعات بالبطاقات',
    desc: 'Collect rent, fees and bookings through secure online card payments.',
    descAr: 'حصّل الإيجارات والرسوم والحجوزات عبر مدفوعات بطاقات آمنة عبر الإنترنت.',

  },
  {
    icon: ShieldCheck,
    title: 'Security built in',
    titleAr: 'أمان مدمج',
    desc: 'Encrypted credentials, token sessions, CSRF and rate-limit protection, and per-record access control.',
    descAr: 'بيانات اعتماد مشفّرة، وجلسات موثّقة، وحماية من CSRF وتحديد المعدل، وتحكّم بالوصول على مستوى كل سجل.',
  },
  {
    icon: MapPin,
    title: 'Based in Riyadh',
    titleAr: 'مقرّنا في الرياض',
    desc: 'Cloud Valley LLC, Almalqa, Riyadh. Built for the Saudi market, in your timezone.',
    descAr: 'شركة وادي السحاب، الملقا، الرياض. مبنية للسوق السعودي، وبتوقيتك.',
  },
]

const CONTENT = {
  en: {
    eyebrow: 'Integrations & Trust',
    titleLead: 'Connected to your stack,',
    titleAccent: 'built for Saudi Arabia',
    subtitle:
      'Accez plugs into the channels, payment rails and tools you already use, and runs on real security, in both languages, from Riyadh.',
    integrationsHeading: 'Works with',
  },
  ar: {
    eyebrow: 'التكاملات والثقة',
    titleLead: 'متصلة بأدواتك،',
    titleAccent: 'ومبنية للسعودية',
    subtitle:
      'تتكامل أكسيز مع القنوات وأنظمة الدفع والأدوات التي تستخدمها بالفعل، وتعمل بأمان حقيقي، وباللغتين، من الرياض.',
    integrationsHeading: 'تعمل مع',
  },
} as const

export default function Trust({ locale: language }: { locale: Locale }) {
  const t = CONTENT[language]

  return (
    <section className="section-y" id="trust" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
      <div className="container mx-auto px-4">
        <div>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4"><span className="ui-chip">{t.eyebrow}</span></div>
            <h2
              className="hero-display text-strong text-center leading-tight tracking-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              {t.titleLead}{' '}
              <span className="grad-text">{t.titleAccent}</span>
            </h2>
            <p className="text-center max-w-2xl mx-auto mt-4 leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{t.subtitle}</p>
          </div>
        </div>

        {/* Integrations and trust points in one panel. */}
        <div>
          <div className="ui-card max-w-6xl mx-auto rounded-[var(--radius-lg)] p-5 sm:p-8">
            <p className="text-center text-xs font-semibold tracking-widest uppercase mb-6 text-faint">{t.integrationsHeading}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-10">
              {INTEGRATIONS.map((group) => (
                <div key={group.label} className="flex flex-col items-center gap-3 text-center">
                  <p className="text-[11px] font-semibold uppercase" style={{ color: 'var(--accent-hi)', letterSpacing: '0.06em' }}>
                    {language === 'ar' ? group.labelAr : group.label}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="inline-flex items-center px-2.5 py-1 rounded-lg text-[13px] font-medium text-muted" style={{ background: 'var(--surface-hi)', border: '1px solid var(--border)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {POINTS.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="flex flex-col gap-3 rounded-[var(--radius-md)] p-5 h-full" style={{ background: 'var(--surface-hi)' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                      <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-strong font-semibold leading-snug" style={{ fontSize: 15 }}>
                      {language === 'ar' ? p.titleAr : p.title}
                    </h3>
                    <p className="leading-relaxed text-muted" style={{ fontSize: 13 }}>
                      {language === 'ar' ? p.descAr : p.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
