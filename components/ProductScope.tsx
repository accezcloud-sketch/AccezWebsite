'use client'

import { motion } from 'framer-motion'
import {
  CalendarCheck,
  Building2,
  Wrench,
  Hotel,
  CreditCard,
  Wallet,
  ReceiptText,
  BarChart3,
  TrendingUp,
  UsersRound,
  Store,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

export interface Module {
  icon: LucideIcon
  title: string
  titleAr: string
  desc: string
  descAr: string
  /** When set, the module card links to its dedicated solution page. */
  href?: string
}

export interface Pillar {
  key: string
  heading: string
  headingAr: string
  modules: Module[]
}

// Three pillars covering the real product surface, verified against the PMS
// route/API set. The modules the marketing site used to hide, owners &
// payouts, sales/CRM, HOA/communities, hotels & serviced apartments, are
// first-class here.
export const PILLARS: Pillar[] = [
  {
    key: 'operations',
    heading: 'Operations',
    headingAr: 'العمليات',
    modules: [
      { icon: CalendarCheck, title: 'Reservations & channels', titleAr: 'الحجوزات والقنوات', desc: 'One calendar synced across 400+ booking channels.', descAr: 'تقويم واحد متزامن عبر أكثر من 400 قناة حجز.' },
      { icon: Building2, title: 'Properties & units', titleAr: 'العقارات والوحدات', desc: 'Every asset type in one portfolio view.', descAr: 'كل أنواع الأصول في عرض محفظة واحد.' },
      { icon: Wrench, title: 'Maintenance & housekeeping', titleAr: 'الصيانة والتدبير', desc: 'Work orders and turnovers, request to done.', descAr: 'أوامر العمل والتجهيز، من الطلب إلى الإنجاز.' },
      { icon: Hotel, title: 'Hotels & serviced apartments', titleAr: 'الفنادق والشقق المخدومة', desc: 'Room types, rates and a built-in channel manager.', descAr: 'أنواع الغرف والأسعار ومدير قنوات مدمج.', href: '/hotels' },
    ],
  },
  {
    key: 'finance',
    heading: 'Money & owners',
    headingAr: 'المال والملاك',
    modules: [
      { icon: CreditCard, title: 'Rent & payments', titleAr: 'الإيجارات والمدفوعات', desc: 'Automated collection and reconciliation.', descAr: 'تحصيل ومطابقة آليان.' },
      { icon: Wallet, title: 'Owners & payouts', titleAr: 'الملاك والمدفوعات', desc: 'Owner earnings, statements and payouts.', descAr: 'أرباح الملاك وكشوفهم ومدفوعاتهم.', href: '/owners' },
      { icon: ReceiptText, title: 'Billing & subscriptions', titleAr: 'الفوترة والاشتراكات', desc: 'Plans, invoices and add-ons in one ledger.', descAr: 'الخطط والفواتير والإضافات في سجل واحد.' },
      { icon: BarChart3, title: 'Reports & analytics', titleAr: 'التقارير والتحليلات', desc: 'Occupancy, revenue and performance, live.', descAr: 'الإشغال والإيرادات والأداء، مباشرة.' },
    ],
  },
  {
    key: 'growth',
    heading: 'Growth & community',
    headingAr: 'النمو والمجتمع',
    modules: [
      { icon: TrendingUp, title: 'Sales & developer projects', titleAr: 'المبيعات ومشاريع المطورين', desc: 'A sales pipeline for units and off-plan projects.', descAr: 'مسار مبيعات للوحدات ومشاريع البيع على الخارطة.', href: '/sales' },
      { icon: UsersRound, title: 'Communities & HOA', titleAr: 'المجتمعات واتحاد الملاك', desc: 'Announcements, feed and resident engagement.', descAr: 'الإعلانات والمنشورات وتفاعل السكان.', href: '/communities' },
      { icon: Store, title: 'Service marketplace', titleAr: 'سوق الخدمات', desc: 'Residents book vetted providers; you earn.', descAr: 'يحجز السكان مقدمي خدمات موثوقين، وأنت تربح.', href: '/service-providers' },
      { icon: MessageSquare, title: 'Campaigns & messaging', titleAr: 'الحملات والمراسلة', desc: 'Inbox, SMS and marketing in one place.', descAr: 'صندوق وارد ورسائل نصية وتسويق في مكان واحد.' },
    ],
  },
]

const CONTENT = {
  en: {
    eyebrow: 'One platform',
    titleLead: 'Run the entire',
    titleAccent: 'property operation',
    subtitle:
      'Most teams stitch this together from five tools. Accez runs all of it, from the front desk to the owner statement, in one system, in Arabic and English.',
    footNote: 'Every module is part of one Accez account. Turn on what you need.',
  },
  ar: {
    eyebrow: 'منصة واحدة',
    titleLead: 'أدر عملية العقار',
    titleAccent: 'بالكامل',
    subtitle:
      'تجمع معظم الفرق هذا من خمس أدوات. أكسيز تدير كل ذلك، من الاستقبال إلى كشف حساب المالك، في نظام واحد، بالعربية والإنجليزية.',
    footNote: 'كل وحدة جزء من حساب أكسيز واحد. فعّل ما تحتاجه.',
  },
} as const

export default function ProductScope() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]

  return (
    <section className="py-20" id="platform" style={{ background: 'var(--bg)' }}>
      <style>{`
        .scope-card { transition: transform .3s cubic-bezier(.23,1,.32,1), border-color .3s ease, background .3s ease; }
        .scope-card:hover { transform: translateY(-3px); border-color: var(--accent-line); background: var(--surface-hi); }
        @media (prefers-reduced-motion: reduce) { .scope-card:hover { transform: none; } }
      `}</style>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 max-w-7xl mx-auto">
          {PILLARS.map((pillar, pi) => (
            <FadeUp key={pillar.key} delay={0.1 + pi * 0.08}>
              <div
                className="rounded-2xl p-5 h-full"
                style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-2.5 mb-4 px-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <h3 className="text-white font-semibold tracking-wide uppercase" style={{ fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                    {language === 'ar' ? pillar.headingAr : pillar.heading}
                  </h3>
                </div>

                <StaggerGrid className="flex flex-col gap-2.5" staggerDelay={0.06}>
                  {pillar.modules.map((m) => {
                    const Icon = m.icon
                    const inner = (
                      <>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                          <Icon size={17} color="var(--accent-hi)" strokeWidth={1.85} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-semibold leading-tight flex items-center gap-1.5" style={{ fontSize: 14 }}>
                            {language === 'ar' ? m.titleAr : m.title}
                            {m.href && (
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 opacity-60" style={{ transform: isRTL ? 'scaleX(-1)' : undefined, color: 'var(--accent-hi)' }} aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </p>
                          <p className="leading-snug mt-0.5" style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>
                            {language === 'ar' ? m.descAr : m.desc}
                          </p>
                        </div>
                      </>
                    )
                    const cls = 'scope-card flex items-start gap-3 rounded-xl p-3.5 h-full'
                    const st = { background: 'var(--surface)', border: '1px solid var(--border)' } as React.CSSProperties
                    return (
                      <motion.div key={m.title} variants={staggerItem}>
                        {m.href ? (
                          <a href={m.href} className={cls} style={st}>{inner}</a>
                        ) : (
                          <div className={cls} style={st}>{inner}</div>
                        )}
                      </motion.div>
                    )
                  })}
                </StaggerGrid>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.15}>
          <p className="text-center mt-8 font-medium" style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            {t.footNote}
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
