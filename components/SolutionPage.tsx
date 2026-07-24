'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard, ReceiptText, Wallet, BarChart3,
  Building2, TrendingUp, RefreshCw, Layers,
  UsersRound, MessageSquare, ListChecks,
  Hotel, Sparkles, KeyRound, Check,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import RevealLine from '@/components/animations/RevealLine'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

interface Feature { icon: LucideIcon; title: string; titleAr: string; desc: string; descAr: string }
interface Bi { en: string; ar: string }

interface Solution {
  eyebrow: string; eyebrowAr: string
  title: string; titleAr: string; accent: string; accentAr: string
  subtitle: string; subtitleAr: string
  heroPoints: Bi[]
  features: Feature[]
  capsHeading: string; capsHeadingAr: string
  capabilities: Bi[]
  ctaTitle: string; ctaTitleAr: string
}

// Every capability below is verified against the product's API operations
// [inspected 2026-07-24], nothing aspirational.
export const SOLUTIONS: Record<string, Solution> = {
  owners: {
    eyebrow: 'Owner Management', eyebrowAr: 'إدارة الملاك',
    title: 'Keep owners informed and', titleAr: 'أبقِ الملاك على اطلاع',
    accent: 'paid on time', accentAr: 'وادفع لهم في وقتهم',
    subtitle: 'Give every property owner their own portal, a clear ledger and tracked payouts, so you spend less time on statements and more time growing the portfolio.',
    subtitleAr: 'امنح كل مالك عقار بوابته الخاصة وسجلًا واضحًا ومدفوعات متتبَّعة، لتقضي وقتًا أقل في الكشوف وأكثر في تنمية المحفظة.',
    heroPoints: [
      { en: 'Owner portal: units, reservations and invoices', ar: 'بوابة المالك: الوحدات والحجوزات والفواتير' },
      { en: 'Owner ledger, balances and statements', ar: 'سجل المالك والأرصدة والكشوف' },
      { en: 'Payouts via Stripe, tracked to paid', ar: 'مدفوعات عبر Stripe، متتبَّعة حتى السداد' },
    ],
    features: [
      { icon: LayoutDashboard, title: 'Owner portal', titleAr: 'بوابة المالك', desc: 'Owners log in to see their units, reservations, invoices and earnings, no more emailed spreadsheets.', descAr: 'يسجّل الملاك الدخول لرؤية وحداتهم وحجوزاتهم وفواتيرهم وأرباحهم، دون جداول تُرسل بالبريد.' },
      { icon: ReceiptText, title: 'Ledger & statements', titleAr: 'السجل والكشوف', desc: 'Every charge and payout on one ledger, with clean statements owners can trust.', descAr: 'كل رسم ودفعة في سجل واحد، مع كشوف واضحة يثق بها الملاك.' },
      { icon: Wallet, title: 'Payouts, tracked', titleAr: 'مدفوعات متتبَّعة', desc: 'Create payouts from pending balances, pay via Stripe, and mark them paid, nothing slips.', descAr: 'أنشئ المدفوعات من الأرصدة المعلّقة، وادفع عبر Stripe، وحدّدها كمدفوعة، دون أي تفويت.' },
      { icon: BarChart3, title: 'Owner analytics', titleAr: 'تحليلات المالك', desc: 'Show each owner how their units are performing, live.', descAr: 'اعرض لكل مالك أداء وحداته، مباشرة.' },
    ],
    capsHeading: 'What owners and managers get', capsHeadingAr: 'ما يحصل عليه الملاك والمديرون',
    capabilities: [
      { en: 'Owner dashboard & portal', ar: 'لوحة وبوابة المالك' },
      { en: 'Per-owner ledger and balances', ar: 'سجل وأرصدة لكل مالك' },
      { en: 'Owner statements', ar: 'كشوف الملاك' },
      { en: 'Stripe onboarding & payouts', ar: 'تفعيل Stripe والمدفوعات' },
      { en: 'Pending-to-paid payout tracking', ar: 'تتبّع المدفوعات من المعلّق إلى المسدَّد' },
      { en: 'Owner invoices & reservations', ar: 'فواتير وحجوزات الملاك' },
      { en: 'Per-owner performance analytics', ar: 'تحليلات أداء لكل مالك' },
    ],
    ctaTitle: 'Ready to give your owners a portal?', ctaTitleAr: 'مستعد لمنح ملّاكك بوابة خاصة؟',
  },

  sales: {
    eyebrow: 'Sales & Projects', eyebrowAr: 'المبيعات والمشاريع',
    title: 'Sell units and projects', titleAr: 'بِع الوحدات والمشاريع',
    accent: 'without the spreadsheet', accentAr: 'دون جداول البيانات',
    subtitle: 'A sales workspace for developers and agencies, projects, units, leads and agent performance in one place, in Arabic and English, on the same platform that runs the units after they sell.',
    subtitleAr: 'مساحة مبيعات للمطوّرين والوكالات، المشاريع والوحدات والعملاء وأداء الوكلاء في مكان واحد، بالعربية والإنجليزية، على المنصة نفسها التي تدير الوحدات بعد بيعها.',
    heroPoints: [
      { en: 'Projects and their units in one view', ar: 'المشاريع ووحداتها في عرض واحد' },
      { en: 'A lead-to-close customer pipeline', ar: 'مسار عملاء من الاهتمام حتى الإغلاق' },
      { en: 'Agent performance you can measure', ar: 'أداء وكلاء قابل للقياس' },
    ],
    features: [
      { icon: Building2, title: 'Projects & units', titleAr: 'المشاريع والوحدات', desc: 'Structure each development into projects and units, with status and pricing.', descAr: 'هيكل كل تطوير إلى مشاريع ووحدات، مع الحالة والتسعير.' },
      { icon: TrendingUp, title: 'Customer pipeline', titleAr: 'مسار العملاء', desc: 'Capture and track leads through to a closed sale.', descAr: 'التقط العملاء المحتملين وتابعهم حتى إتمام البيع.' },
      { icon: BarChart3, title: 'Agent performance', titleAr: 'أداء الوكلاء', desc: 'See how each sales agent is performing, live.', descAr: 'راقب أداء كل وكيل مبيعات، مباشرة.' },
      { icon: Layers, title: 'One system with ops', titleAr: 'نظام واحد مع العمليات', desc: 'When a unit sells, it is already in the platform that runs it.', descAr: 'عند بيع الوحدة، تكون بالفعل في المنصة التي تديرها.' },
    ],
    capsHeading: 'Inside the sales module', capsHeadingAr: 'داخل وحدة المبيعات',
    capabilities: [
      { en: 'Developer projects & units', ar: 'مشاريع المطوّرين والوحدات' },
      { en: 'Project performance dashboard', ar: 'لوحة أداء المشاريع' },
      { en: 'Customer / lead records', ar: 'سجلات العملاء والمهتمّين' },
      { en: 'Sales-agent performance', ar: 'أداء وكلاء المبيعات' },
      { en: 'Project-to-unit mapping', ar: 'ربط المشاريع بالوحدات' },
      { en: 'Arabic & English', ar: 'العربية والإنجليزية' },
    ],
    ctaTitle: 'Move your sales off the spreadsheet.', ctaTitleAr: 'انقل مبيعاتك من جداول البيانات.',
  },

  communities: {
    eyebrow: 'Communities & HOA', eyebrowAr: 'المجتمعات واتحاد الملاك',
    title: 'Run communities residents', titleAr: 'أدر مجتمعات',
    accent: 'actually engage with', accentAr: 'يتفاعل معها السكان',
    subtitle: 'Group your properties into communities and give residents a feed worth opening, announcements, polls and conversation, not another ignored WhatsApp group.',
    subtitleAr: 'اجمع عقاراتك في مجتمعات وامنح السكان موجزًا يستحق الفتح، إعلانات واستطلاعات ونقاشات، لا مجرد مجموعة واتساب أخرى مهملة.',
    heroPoints: [
      { en: 'Communities that group your properties', ar: 'مجتمعات تجمع عقاراتك' },
      { en: 'A resident feed with posts and polls', ar: 'موجز للسكان بالمنشورات والاستطلاعات' },
      { en: 'Comments and reactions, in one place', ar: 'التعليقات والتفاعلات في مكان واحد' },
    ],
    features: [
      { icon: UsersRound, title: 'Communities', titleAr: 'المجتمعات', desc: 'Group properties into communities and manage them together.', descAr: 'اجمع العقارات في مجتمعات وأدرها معًا.' },
      { icon: MessageSquare, title: 'Resident feed', titleAr: 'موجز السكان', desc: 'Post announcements and updates residents actually see.', descAr: 'انشر إعلانات وتحديثات يراها السكان فعلًا.' },
      { icon: ListChecks, title: 'Polls & reactions', titleAr: 'الاستطلاعات والتفاعلات', desc: 'Run polls, collect votes, and let residents comment and like.', descAr: 'أجرِ استطلاعات واجمع الأصوات ودع السكان يعلّقون ويتفاعلون.' },
      { icon: Building2, title: 'One platform', titleAr: 'منصة واحدة', desc: 'Community engagement lives in the same platform as operations.', descAr: 'تفاعل المجتمع في المنصة نفسها التي تدير العمليات.' },
    ],
    capsHeading: 'Inside communities', capsHeadingAr: 'داخل المجتمعات',
    capabilities: [
      { en: 'Create & manage communities', ar: 'إنشاء وإدارة المجتمعات' },
      { en: 'Assign properties to a community', ar: 'إسناد العقارات إلى مجتمع' },
      { en: 'Resident feed & announcements', ar: 'موجز السكان والإعلانات' },
      { en: 'Comments and likes', ar: 'التعليقات والإعجابات' },
      { en: 'Polls with vote tracking', ar: 'استطلاعات مع تتبّع الأصوات' },
      { en: 'Community content library', ar: 'مكتبة محتوى المجتمع' },
    ],
    ctaTitle: 'Give your residents a feed they open.', ctaTitleAr: 'امنح سكانك موجزًا يفتحونه.',
  },

  hotels: {
    eyebrow: 'Hotels & Serviced Apartments', eyebrowAr: 'الفنادق والشقق المخدومة',
    title: 'Run rooms and stays', titleAr: 'أدر الغرف والإقامات',
    accent: 'across every channel', accentAr: 'عبر كل قناة',
    subtitle: 'Room types, rates and reservations synced across 400+ channels through RoomCloud, with guest policies, add-ons and check-in built in.',
    subtitleAr: 'أنواع الغرف والأسعار والحجوزات متزامنة عبر أكثر من 400 قناة من خلال RoomCloud، مع سياسات النزلاء والإضافات وتسجيل الوصول مدمجة.',
    heroPoints: [
      { en: 'Room types mapped to your units', ar: 'أنواع غرف مرتبطة بوحداتك' },
      { en: 'RoomCloud channel manager, synced', ar: 'مدير قنوات RoomCloud، متزامن' },
      { en: 'Guest policies, add-ons and check-in', ar: 'سياسات النزلاء والإضافات وتسجيل الوصول' },
    ],
    features: [
      { icon: Hotel, title: 'Room types', titleAr: 'أنواع الغرف', desc: 'Define room types and assign units, with rates per type.', descAr: 'حدّد أنواع الغرف وأسند الوحدات، بأسعار لكل نوع.' },
      { icon: RefreshCw, title: 'Channel manager', titleAr: 'مدير القنوات', desc: 'Connect RoomCloud to sync availability, rates and reservations across 400+ channels.', descAr: 'اربط RoomCloud لمزامنة التوافر والأسعار والحجوزات عبر أكثر من 400 قناة.' },
      { icon: Sparkles, title: 'Add-ons & upsells', titleAr: 'الإضافات والعروض', desc: 'Offer extras at booking, approve them in a queue, and grow revenue per stay.', descAr: 'قدّم إضافات عند الحجز، ووافق عليها في قائمة، وزد الإيراد لكل إقامة.' },
      { icon: KeyRound, title: 'Policies & check-in', titleAr: 'السياسات وتسجيل الوصول', desc: 'Set guest policies and run check-in and check-out with stats.', descAr: 'اضبط سياسات النزلاء وأدِر الدخول والخروج مع الإحصاءات.' },
    ],
    capsHeading: 'Inside the hotel toolkit', capsHeadingAr: 'داخل أدوات الفنادق',
    capabilities: [
      { en: 'Room types & unit assignment', ar: 'أنواع الغرف وإسناد الوحدات' },
      { en: 'RoomCloud channel manager', ar: 'مدير قنوات RoomCloud' },
      { en: 'Rate & availability sync', ar: 'مزامنة الأسعار والتوافر' },
      { en: 'Channel mapping & activity', ar: 'ربط القنوات والنشاط' },
      { en: 'Reservation add-ons & upsell queue', ar: 'إضافات الحجز وقائمة العروض' },
      { en: 'Guest policies', ar: 'سياسات النزلاء' },
      { en: 'Check-in / check-out', ar: 'تسجيل الدخول والخروج' },
    ],
    ctaTitle: 'Run your rooms on one platform.', ctaTitleAr: 'أدر غرفك على منصة واحدة.',
  },
}

const PORTAL_SIGN_UP = 'https://portal.accez.cloud/sign-up'

export default function SolutionPage({ slug }: { slug: keyof typeof SOLUTIONS }) {
  const { language, isRTL } = useLanguage()
  const s = SOLUTIONS[slug]
  const L = <T,>(en: T, ar: T) => (language === 'ar' ? ar : en)

  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <>
      <style>{`
        .sol-card { transition: transform .3s cubic-bezier(.23,1,.32,1), border-color .3s ease; }
        .sol-card:hover { transform: translateY(-4px); border-color: var(--accent-line); }
        @media (prefers-reduced-motion: reduce){ .sol-card:hover{ transform:none; } }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden page-top pb-20" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '70%', background: 'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <FadeUp>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}>
                {L(s.eyebrow, s.eyebrowAr)}
              </span>
              <h1 className="text-white font-bold leading-[1.1] tracking-tight mb-5" style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
                {L(s.title, s.titleAr)}{' '}
                <span style={{ background: 'linear-gradient(135deg, #C7D2FE, #319FD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{L(s.accent, s.accentAr)}</span>
              </h1>
              <p className="leading-relaxed max-w-lg mb-8" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{L(s.subtitle, s.subtitleAr)}</p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--accent)', fontSize: 15 }}>
                  {L('Book a demo', 'اطلب عرضًا توضيحيًا')}{arrow}
                </a>
                <a href="/modules" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', color: 'var(--text)', fontSize: 15 }}>
                  {L('See all modules', 'كل الوحدات')}
                </a>
              </div>
            </FadeUp>

            {/* Hero capability card */}
            <FadeUp delay={0.15}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-[70px] opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 40%, var(--accent), transparent 68%)' }} aria-hidden="true" />
                <div className="relative rounded-2xl p-6 sm:p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 20px 48px rgba(0,0,0,.4)' }}>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-hi)' }}>{L(s.eyebrow, s.eyebrowAr)}</p>
                  <div className="flex flex-col gap-3">
                    {s.heroPoints.map((p) => (
                      <div key={p.en} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'var(--accent-dim)' }}>
                          <Check size={12} color="var(--accent-hi)" strokeWidth={2.5} />
                        </span>
                        <span style={{ fontSize: 15, color: 'var(--text)' }}>{L(p.en, p.ar)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto" staggerDelay={0.08}>
            {s.features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={staggerItem}>
                  <div className="sol-card flex flex-col gap-4 rounded-2xl p-6 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                      <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold leading-snug mb-2" style={{ fontSize: 16 }}>{L(f.title, f.titleAr)}</h3>
                      <p className="leading-relaxed" style={{ fontSize: 14, color: 'var(--text-muted)' }}>{L(f.desc, f.descAr)}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Capabilities checklist */}
      <section className="py-20" style={{ background: 'var(--bg-alt)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeUp>
            <h2 className="text-white font-bold text-center tracking-tight mb-2" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>
              {L(s.capsHeading, s.capsHeadingAr)}
            </h2>
          </FadeUp>
          <RevealLine className="w-full max-w-md mx-auto my-8" delay={0.1} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {s.capabilities.map((c, i) => (
              <FadeUp key={c.en} delay={0.05 * i}>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)' }}>
                    <Check size={12} color="var(--accent-hi)" strokeWidth={2.5} />
                  </span>
                  <span style={{ fontSize: 14.5, color: 'var(--text-muted)' }}>{L(c.en, c.ar)}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 text-center max-w-5xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(49,159,212,0.14), var(--surface))', border: '1px solid var(--accent-line)' }}>
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute rounded-full blur-[90px] opacity-40" style={{ width: 400, height: 400, top: '-40%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, var(--accent), transparent 70%)' }} />
              </div>
              <div className="relative z-10">
                <h2 className="text-white font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>{L(s.ctaTitle, s.ctaTitleAr)}</h2>
                <p className="max-w-xl mx-auto mb-8" style={{ fontSize: 16, color: 'var(--text-muted)' }}>{L('See it on your own portfolio, book a walkthrough with the Accez team.', 'شاهدها على محفظتك، احجز جولة مع فريق أكسيز.')}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--accent)', fontSize: 15 }}>
                    {L('Book a demo', 'اطلب عرضًا توضيحيًا')}{arrow}
                  </a>
                  <a href={PORTAL_SIGN_UP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', color: 'var(--text)', fontSize: 15 }}>
                    {L('Start free', 'ابدأ مجانًا')}
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
