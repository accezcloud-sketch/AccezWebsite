'use client'

import { motion } from 'framer-motion'
import { MapPin, Languages, Layers, Building2, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

interface Value { icon: LucideIcon; title: string; titleAr: string; desc: string; descAr: string }

const VALUES: Value[] = [
  { icon: Layers, title: 'One platform, not five tools', titleAr: 'منصة واحدة، لا خمس أدوات', desc: 'Reservations, rent, owners, sales, communities and hotels belong in one system, so operators stop stitching spreadsheets together.', descAr: 'الحجوزات والإيجارات والملاك والمبيعات والمجتمعات والفنادق تنتمي إلى نظام واحد، ليتوقف المشغّلون عن الجمع بين جداول البيانات.' },
  { icon: Languages, title: 'Arabic-first, not translated', titleAr: 'العربية أولًا، لا مُترجمة', desc: 'Every screen works natively in Arabic and English, right-to-left throughout, built for how the region actually works.', descAr: 'كل شاشة تعمل بشكل أصيل بالعربية والإنجليزية، مع دعم كامل للكتابة من اليمين لليسار، مبنية لطريقة عمل المنطقة فعلًا.' },
  { icon: MapPin, title: 'Built in Saudi Arabia', titleAr: 'مبنية في السعودية', desc: 'From Riyadh, for Saudi operators, close to the market, the regulations and the people we build for.', descAr: 'من الرياض، لمشغّلي العقارات في السعودية، قريبون من السوق والأنظمة والأشخاص الذين نبني لهم.' },
]

const CONTENT = {
  en: {
    eyebrow: 'About Accez',
    titleLead: 'The operating system for',
    titleAccent: 'property in Saudi Arabia',
    intro: 'Accez is an all-in-one property operations platform built for the Middle East, with Saudi Arabia at its core. From vacation rentals and residential communities to hotels, developer sales and owner management, Accez brings the whole operation into one system, in Arabic and English.',
    storyHeading: 'Why we built it',
    story: 'Property operators in the region were running their business across booking channels, spreadsheets, chat apps and disconnected tools, losing time and money in the gaps between them. Accez replaces that patchwork with one platform that covers reservations, rent and payments, maintenance and housekeeping, owners and payouts, sales, communities and hotels. One account, every module, turned on as you need it.',
    valuesHeading: 'What we believe',
    company: 'Company',
    companyName: 'Cloud Valley LLC dba Accez.cloud',
    location: 'Location',
    locationVal: 'Almalqa, Riyadh, Saudi Arabia',
    languages: 'Languages',
    languagesVal: 'Arabic & English',
    ctaTitle: 'See Accez on your own portfolio',
    ctaSub: 'Book a walkthrough with the team in Riyadh.',
    ctaPrimary: 'Book a demo',
    ctaSecondary: 'Start free',
  },
  ar: {
    eyebrow: 'عن أكسيز',
    titleLead: 'نظام تشغيل العقارات',
    titleAccent: 'في المملكة العربية السعودية',
    intro: 'أكسيز منصة شاملة لعمليات العقارات مبنية للشرق الأوسط، والسعودية في صميمها. من الإيجارات السياحية والمجمعات السكنية إلى الفنادق ومبيعات المطوّرين وإدارة الملاك، تجمع أكسيز العملية بالكامل في نظام واحد، بالعربية والإنجليزية.',
    storyHeading: 'لماذا بنيناها',
    story: 'كان مشغّلو العقارات في المنطقة يديرون أعمالهم عبر قنوات الحجز وجداول البيانات وتطبيقات المحادثة وأدوات غير مترابطة، يخسرون الوقت والمال في الفجوات بينها. تستبدل أكسيز هذا التشتت بمنصة واحدة تغطي الحجوزات والإيجارات والمدفوعات والصيانة والتدبير والملاك والمدفوعات والمبيعات والمجتمعات والفنادق. حساب واحد، وكل الوحدات، تُفعّل حسب حاجتك.',
    valuesHeading: 'بماذا نؤمن',
    company: 'الشركة',
    companyName: 'شركة وادي السحاب، أكسيز.كلاود',
    location: 'الموقع',
    locationVal: 'الملقا، الرياض، المملكة العربية السعودية',
    languages: 'اللغات',
    languagesVal: 'العربية والإنجليزية',
    ctaTitle: 'شاهد أكسيز على محفظتك',
    ctaSub: 'احجز جولة مع الفريق في الرياض.',
    ctaPrimary: 'اطلب عرضًا توضيحيًا',
    ctaSecondary: 'ابدأ مجانًا',
  },
} as const

const PORTAL_SIGN_UP = 'https://portal.accez.cloud/sign-up'

export default function AboutPage() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]

  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const facts = [
    { label: t.company, value: t.companyName, icon: Building2 },
    { label: t.location, value: t.locationVal, icon: MapPin },
    { label: t.languages, value: t.languagesVal, icon: Languages },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden page-top pb-16" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '70%', background: 'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <FadeUp>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}>
              {t.eyebrow}
            </span>
            <h1 className="text-white font-bold leading-[1.12] tracking-tight mb-5" style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
              {t.titleLead}{' '}
              <span style={{ background: 'linear-gradient(135deg, #C7D2FE, #319FD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.titleAccent}</span>
            </h1>
            <p className="leading-relaxed mx-auto" style={{ fontSize: 18, color: 'var(--text-muted)' }}>{t.intro}</p>
          </FadeUp>
        </div>
      </section>

      {/* Story + facts */}
      <section className="py-16" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <FadeUp className="lg:col-span-3">
            <h2 className="text-white font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(22px,3vw,30px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>{t.storyHeading}</h2>
            <p className="leading-relaxed" style={{ fontSize: 16, color: 'var(--text-muted)' }}>{t.story}</p>
          </FadeUp>

          <FadeUp delay={0.1} className="lg:col-span-2">
            <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              {facts.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                      <Icon size={18} color="var(--accent-hi)" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>{f.label}</p>
                      <p className="text-white font-medium mt-0.5" style={{ fontSize: 14.5 }}>{f.value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ background: 'var(--bg-alt)' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <h2 className="text-white font-bold text-center tracking-tight mb-10" style={{ fontSize: 'clamp(22px,3vw,32px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>{t.valuesHeading}</h2>
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto" staggerDelay={0.08}>
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <motion.div key={v.title} variants={staggerItem}>
                  <div className="flex flex-col gap-4 rounded-2xl p-6 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                      <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-white font-semibold leading-snug" style={{ fontSize: 16 }}>{language === 'ar' ? v.titleAr : v.title}</h3>
                    <p className="leading-relaxed" style={{ fontSize: 14, color: 'var(--text-muted)' }}>{language === 'ar' ? v.descAr : v.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 text-center max-w-5xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(49,159,212,0.14), var(--surface))', border: '1px solid var(--accent-line)' }}>
              <div className="relative z-10">
                <h2 className="text-white font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>{t.ctaTitle}</h2>
                <p className="max-w-xl mx-auto mb-8" style={{ fontSize: 16, color: 'var(--text-muted)' }}>{t.ctaSub}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--accent)', fontSize: 15 }}>{t.ctaPrimary}{arrow}</a>
                  <a href={PORTAL_SIGN_UP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', color: 'var(--text)', fontSize: 15 }}>{t.ctaSecondary}</a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
