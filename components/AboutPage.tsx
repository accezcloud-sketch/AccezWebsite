import Link from 'next/link'
import { MapPin, Layers, Building2, type LucideIcon } from 'lucide-react'
import Band from '@/components/ui/Band'
import ArabicEnglishIcon from '@/components/ui/ArabicEnglishIcon'
import SectionHeader from '@/components/SectionHeader'
import { localeHref, type Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'

type Icon = LucideIcon | typeof ArabicEnglishIcon

const CONTENT = {
  en: {
    titleLead: 'Built in Riyadh, for property',
    titleAccent: 'and the services around it',
    intro:
      'Accez.cloud is one platform with two solutions. The property management solution runs the whole operation for property managers, landlords and hotels: reservations synced with Airbnb, Booking.com and Expedia, work orders, owners and payouts, sales and contracts. The service provider solution gives independent businesses, from barbers to fitness coaches, their own booking page and dashboard, so they take bookings from their own clients and new customers.',
    storyHeading: 'Why we built it',
    story:
      'Property managers in the region were running their business across booking channels, spreadsheets, chat apps and disconnected tools. Service businesses were taking bookings by phone and chat, with no page of their own and no clear view of their week. Accez gives each of them one place to work: property management for operators, and a booking solution for providers, on one platform built in Saudi Arabia.',
    valuesHeading: 'What we believe',
    values: [
      { title: 'One platform, two solutions', desc: 'Property management and service providers each get their own dashboard, plans and sign-in, on the same platform' },
      { title: 'Arabic and English, side by side', desc: 'Every screen works in both languages, right to left in Arabic, so teams and customers use the one they prefer' },
      { title: 'Built in Saudi Arabia', desc: 'From Riyadh, close to the market, the regulations and the people we build for' },
    ],
    company: 'Company',
    companyName: 'Cloud Valley LLC dba Accez.cloud',
    location: 'Location',
    locationVal: 'Almalqa, Riyadh, Saudi Arabia',
    languages: 'Languages',
    languagesVal: 'Arabic and English',
    ctaTitle: 'Find the solution that fits you',
    ctaSub: 'Each solution has its own page, plans and sign-in.',
  },
  ar: {
    titleLead: 'مبنية في الرياض، للعقارات',
    titleAccent: 'والخدمات المحيطة بها',
    intro:
      'أكسيز.كلاود منصة واحدة بحلّين. حل إدارة العقارات يدير العملية بالكامل لمديري العقارات والملاك والفنادق: حجوزات متزامنة مع Airbnb وBooking.com وExpedia، وأوامر العمل، والملاك والمدفوعات، والمبيعات والعقود. وحل مقدمي الخدمات يمنح الأنشطة المستقلة، من الحلاقين إلى مدربي اللياقة، صفحة حجز ولوحة تحكم خاصة بها، لتستقبل الحجوزات من عملائها ومن عملاء جدد.',
    storyHeading: 'لماذا بنيناها',
    story:
      'كان مديرو العقارات في المنطقة يديرون أعمالهم عبر قنوات الحجز وجداول البيانات وتطبيقات المحادثة وأدوات غير مترابطة. وكانت أنشطة الخدمات تستقبل الحجوزات عبر الهاتف والمحادثات، دون صفحة خاصة بها ودون رؤية واضحة لأسبوعها. تمنح أكسيز كلًّا منهم مكانًا واحدًا للعمل: إدارة العقارات للمشغّلين، وحل حجز لمقدمي الخدمات، على منصة واحدة مبنية في السعودية.',
    valuesHeading: 'بماذا نؤمن',
    values: [
      { title: 'منصة واحدة، وحلّان', desc: 'لكل من إدارة العقارات ومقدمي الخدمات لوحة تحكم وخطط وتسجيل دخول خاص به، على المنصة نفسها' },
      { title: 'العربية والإنجليزية جنبًا إلى جنب', desc: 'كل شاشة تعمل باللغتين، ومن اليمين إلى اليسار بالعربية، ليستخدم الفريق والعملاء اللغة التي يفضلونها' },
      { title: 'مبنية في السعودية', desc: 'من الرياض، قريبون من السوق والأنظمة والأشخاص الذين نبني لهم' },
    ],
    company: 'الشركة',
    companyName: 'شركة وادي السحاب، أكسيز.كلاود',
    location: 'الموقع',
    locationVal: 'الملقا، الرياض، المملكة العربية السعودية',
    languages: 'اللغات',
    languagesVal: 'العربية والإنجليزية',
    ctaTitle: 'اعثر على الحل المناسب لك',
    ctaSub: 'لكل حل صفحته وخططه وتسجيل دخوله.',
  },
} as const

const VALUE_ICONS: Icon[] = [Layers, ArabicEnglishIcon, MapPin]

export default function AboutPage({ locale: language }: { locale: Locale }) {
  const t = CONTENT[language]

  const facts: { label: string; value: string; icon: Icon }[] = [
    { label: t.company, value: t.companyName, icon: Building2 },
    { label: t.location, value: t.locationVal, icon: MapPin },
    { label: t.languages, value: t.languagesVal, icon: ArabicEnglishIcon },
  ]

  return (
    <>
      <Band shade="base">
        <section className="page-top pb-20" style={{ background: 'var(--section-bg, var(--bg))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="hero-display text-strong tracking-tight mb-6" style={{ fontSize: 'clamp(30px, 4.6vw, 50px)', lineHeight: 1.1 }}>
              {t.titleLead} <span className="grad-text">{t.titleAccent}</span>
            </h1>
            <p className="text-muted leading-relaxed" style={{ fontSize: 17 }}>{t.intro}</p>
          </div>
        </section>
      </Band>

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 items-start">
            <div className="min-w-0">
              <h2 className="hero-display text-strong tracking-tight mb-4" style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}>{t.storyHeading}</h2>
              <p className="text-muted leading-relaxed" style={{ fontSize: 16 }}>{t.story}</p>
            </div>
            <ul className="ui-card p-6 flex flex-col gap-5">
              {facts.map(({ label, value, icon: FactIcon }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="ui-icon"><FactIcon size={20} color="var(--accent-hi)" strokeWidth={1.75} /></span>
                  <span>
                    <span className="block text-xs text-faint mb-0.5">{label}</span>
                    <span className="block text-strong font-medium">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Band>

      <Band shade="base">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader lead={t.valuesHeading} />
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {t.values.map((v, i) => {
                const ValueIcon = VALUE_ICONS[i]
                return (
                  <li key={v.title} className="ui-card flex flex-col gap-4 p-6">
                    <span className="ui-icon"><ValueIcon size={20} color="var(--accent-hi)" strokeWidth={1.75} /></span>
                    <h3 className="text-strong font-semibold leading-snug" style={{ fontSize: 16 }}>{v.title}</h3>
                    <p className="text-muted leading-relaxed" style={{ fontSize: 14 }}>{v.desc}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      </Band>

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="hero-display text-strong tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)' }}>{t.ctaTitle}</h2>
            <p className="text-muted mb-8" style={{ fontSize: 16 }}>{t.ctaSub}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
              {PLATFORM_SOLUTIONS.map((s) => (
                <li key={s.key}>
                  <Link href={localeHref(s.href, language)} prefetch={false} className="ui-card ui-card-interactive group flex h-full flex-col gap-1 px-5 py-4">
                    <span className="text-xs font-medium" style={{ color: 'var(--accent-hi)' }}>{s.audience[language]}</span>
                    <span className="flex items-center justify-between gap-3 font-semibold text-strong" style={{ fontSize: 16 }}>
                      {s.name[language]}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 rtl:-scale-x-100" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Band>
    </>
  )
}
