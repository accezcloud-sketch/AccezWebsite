'use client'

import { Languages, CreditCard, ShieldCheck, MapPin, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import RevealLine from '@/components/animations/RevealLine'

interface IntegrationGroup {
  label: string
  labelAr: string
  items: string[]
}

// Every integration below is verified present in the product source
// [inspected 2026-07-24]. Nothing aspirational.
const INTEGRATIONS: IntegrationGroup[] = [
  {
    label: 'Booking channels',
    labelAr: 'قنوات الحجز',
    items: ['Airbnb', 'Booking.com', 'Expedia', 'VRBO', '+ 400 more'],
  },
  {
    label: 'Channel manager & calendars',
    labelAr: 'مدير القنوات والتقاويم',
    items: ['RoomCloud', 'iCal sync'],
  },
  {
    label: 'Payments',
    labelAr: 'المدفوعات',
    items: ['Mada', 'Stripe', 'Checkout.com'],
  },
  {
    label: 'Communications',
    labelAr: 'الاتصالات',
    items: ['WhatsApp', 'Twilio SMS'],
  },
]

interface TrustPoint {
  icon: LucideIcon
  title: string
  titleAr: string
  desc: string
  descAr: string
}

const POINTS: TrustPoint[] = [
  {
    icon: Languages,
    title: 'Arabic & English, native',
    titleAr: 'العربية والإنجليزية بشكل أصيل',
    desc: 'Every screen in both languages, right-to-left throughout, not a bolted-on translation.',
    descAr: 'كل شاشة باللغتين، مع دعم كامل للكتابة من اليمين لليسار، وليست مجرد ترجمة مضافة.',
  },
  {
    icon: CreditCard,
    title: 'Mada & card payments',
    titleAr: 'مدفوعات مدى والبطاقات',
    desc: 'Collect rent, fees and bookings via Mada and international cards.',
    descAr: 'حصّل الإيجارات والرسوم والحجوزات عبر مدى والبطاقات الدولية.',
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

export default function Trust() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]

  return (
    <section className="py-20" id="trust" style={{ background: 'var(--bg-alt)' }}>
      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: isRTL ? 'linear-gradient(to left, transparent, var(--accent))' : 'linear-gradient(to right, transparent, var(--accent))' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent-hi)' }}>{t.eyebrow}</span>
              <div className="h-px w-8" style={{ background: isRTL ? 'linear-gradient(to right, transparent, var(--accent))' : 'linear-gradient(to left, transparent, var(--accent))' }} />
            </div>
            <h2
              className="text-white font-bold text-center leading-tight tracking-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}
            >
              {t.titleLead}{' '}
              <span style={{ background: 'linear-gradient(135deg, #7FCDEF, #319FD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.titleAccent}</span>
            </h2>
            <p className="text-center max-w-2xl mx-auto mt-4 leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{t.subtitle}</p>
          </div>
        </FadeUp>

        {/* Integrations */}
        <FadeUp delay={0.1}>
          <div
            className="max-w-5xl mx-auto rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <p className="text-center text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--text-faint)' }}>
              {t.integrationsHeading}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {INTEGRATIONS.map((group) => (
                <div key={group.label} className="flex flex-col gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-hi)', letterSpacing: '0.06em' }}>
                    {language === 'ar' ? group.labelAr : group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-[13px] font-medium"
                        style={{ background: 'var(--surface-hi)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <RevealLine className="w-full max-w-5xl mx-auto my-10" delay={0.1} />

        {/* Trust points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {POINTS.map((p, i) => {
            const Icon = p.icon
            return (
              <FadeUp key={p.title} delay={0.1 + i * 0.07}>
                <div className="flex flex-col gap-3 rounded-2xl p-5 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                    <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-white font-semibold leading-snug" style={{ fontSize: 15 }}>
                    {language === 'ar' ? p.titleAr : p.title}
                  </h3>
                  <p className="leading-relaxed" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {language === 'ar' ? p.descAr : p.desc}
                  </p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
