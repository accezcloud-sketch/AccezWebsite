'use client'

import { motion } from 'framer-motion'
import {
  Search,
  MapPin,
  Building2,
  Star,
  Store,
  CalendarCheck,
  UserPlus,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROVIDER_SIGN_UP } from '@/lib/links'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'
import HeroLayout, { HeroActions } from '@/components/hero/HeroLayout'
import RotatingHeadline from '@/components/hero/RotatingHeadline'
import SpDashboardMock from '@/components/visuals/SpDashboardMock'
import Band from '@/components/ui/Band'
import SectionHeader from '@/components/SectionHeader'
import ProviderPricing from '@/components/ProviderPricing'

const EXPOSURE_ICONS: LucideIcon[] = [Store, Search, MapPin, Building2, Star]
const STEP_ICONS: LucideIcon[] = [UserPlus, ClipboardList, CalendarCheck]

const CONTENT = {
  en: {
    // Hero
    eyebrow: 'Service provider solution',
    heroLead: 'One platform for',
    heroPhrases: ['barbers & salons', 'spas & wellness studios', 'fitness coaches', 'beauty & nail studios', 'photographers', 'home services', 'independent professionals'],
    heroReadAs: 'barbers and salons, spas and wellness studios, fitness coaches, beauty and nail studios, photographers, home services and independent professionals',
    heroSubtitle:
      'List your business on the Accez marketplace, take bookings from your own clients, and get found by new customers already looking for services like yours. Salons, spas, fitness, photography, home services and more, every provider vetted, every booking instant.',
    ctaPrimary: 'Create a provider account',
    ctaPricing: 'See plans and pricing',

    // Exposure
    exposureEyebrow: 'Exposure',
    exposureTitleLead: 'Put your business where',
    exposureTitleAccent: 'customers are already looking',
    exposureSubtitle:
      'Accez is not a directory you get lost in. Every listing is built to be found and booked, across the whole Accez network.',
    exposure: [
      {
        title: 'A listing on the marketplace',
        description: 'Your own public page with photos, an about section, opening hours and your full service list, live for every customer on Accez.',
      },
      {
        title: 'Found by name and category',
        description: 'Customers browse by category such as Beauty, Spa and Wellness, Fitness, Photography and Home services, and search directly by your name.',
      },
      {
        title: 'Discovered on the map',
        description: 'Your business appears on the map so nearby residents and guests find you when they need a service close by.',
      },
      {
        title: 'Bookings from properties',
        description: 'Reach property managers and residents across entire portfolios on Accez, not just one-off customers hunting on their own.',
      },
      {
        title: 'Ratings build your profile',
        description: 'Every completed booking can earn a rating and review, shown on your listing, so a strong reputation keeps bringing in more work.',
      },
    ],

    // How it works
    stepsEyebrow: 'How it works',
    stepsTitleLead: 'Live on Accez in',
    stepsTitleAccent: 'three steps',
    steps: [
      { title: 'Create your provider account', description: 'Open the Service Provider sign-up. It is a separate account type, created straight away.' },
      { title: 'Build your listing', description: 'Add your business name, photos, category, location and opening hours, then list each service with its own duration and price.' },
      { title: 'Take bookings', description: 'Your listing goes live on the marketplace. Bookings are instant and every one reaches your provider dashboard.' },
    ],


    // CTA
    ctaTitle: 'Ready to get discovered on Accez?',
    ctaSubtitle: 'Create your Service Provider account and have your listing live in minutes.',
  },

  ar: {
    eyebrow: 'حل مقدمي الخدمات',
    heroLead: 'منصة واحدة تخدم',
    heroPhrases: ['الحلاقين والصالونات', 'المنتجعات الصحية ومراكز العافية', 'مدربي اللياقة', 'استوديوهات التجميل والأظافر', 'المصورين', 'الخدمات المنزلية', 'المهنيين المستقلين'],
    heroReadAs: 'الحلاقين والصالونات والمنتجعات الصحية ومراكز العافية ومدربي اللياقة واستوديوهات التجميل والأظافر والمصورين والخدمات المنزلية والمهنيين المستقلين',
    heroSubtitle:
      'أدرج نشاطك في سوق أكسيز، واستقبل الحجوزات من عملائك، وليجدك عملاء جدد يبحثون بالفعل عن خدمات مثل خدماتك. صالونات، منتجعات صحية، لياقة، تصوير، خدمات منزلية وغيرها، كل مقدم خدمة موثوق، وكل حجز فوري.',
    ctaPrimary: 'أنشئ حساب مقدم خدمة',
    ctaPricing: 'اطّلع على الخطط والأسعار',

    exposureEyebrow: 'الظهور',
    exposureTitleLead: 'ضع نشاطك حيث',
    exposureTitleAccent: 'يبحث العملاء بالفعل',
    exposureSubtitle:
      'أكسيز ليست دليلًا تضيع فيه. كل صفحة مُصممة ليتم إيجادها وحجزها عبر شبكة أكسيز بالكامل.',
    exposure: [
      { title: 'صفحة في السوق', description: 'صفحتك العامة الخاصة بالصور ونبذة عنك وساعات العمل وقائمة خدماتك كاملة، حيّة لكل عميل على أكسيز.' },
      { title: 'يجدونك بالاسم والفئة', description: 'يتصفح العملاء حسب الفئة مثل التجميل والمنتجعات الصحية واللياقة والتصوير والخدمات المنزلية، ويبحثون بالاسم مباشرة.' },
      { title: 'يظهرون لك على الخريطة', description: 'يظهر نشاطك على الخريطة ليجدك السكان والنزلاء القريبون عند حاجتهم لخدمة قريبة منهم.' },
      { title: 'حجوزات من العقارات', description: 'صِل إلى مديري العقارات والسكان عبر محافظ عقارية كاملة على أكسيز، وليس فقط عملاء متفرقين.' },
      { title: 'التقييمات تبني سمعتك', description: 'كل حجز مكتمل يمكن أن يكسبك تقييمًا ومراجعة تظهر في صفحتك، فالسمعة القوية تجلب المزيد من العمل.' },
    ],

    stepsEyebrow: 'كيف تعمل',
    stepsTitleLead: 'حيّ على أكسيز في',
    stepsTitleAccent: 'ثلاث خطوات',
    steps: [
      { title: 'أنشئ حساب مقدم الخدمة', description: 'افتح صفحة تسجيل مقدمي الخدمات. إنه نوع حساب مستقل، ويُنشأ فورًا.' },
      { title: 'جهّز صفحتك', description: 'أضف اسم نشاطك وصورك وفئتك وموقعك وساعات العمل، ثم أدرج كل خدمة بمدتها وسعرها.' },
      { title: 'استقبل الحجوزات', description: 'تظهر صفحتك في السوق. الحجوزات فورية، ويصل كل حجز إلى لوحة تحكم مقدم الخدمة.' },
    ],


    ctaTitle: 'مستعد ليجدك العملاء على أكسيز؟',
    ctaSubtitle: 'أنشئ حساب مقدم الخدمة وستكون صفحتك حيّة خلال دقائق.',
  },
} as const

export default function ServiceProviderPage() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]

  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <>
      <style>{`
        .spp-card { transition: transform .3s cubic-bezier(.23,1,.32,1), border-color .3s ease, box-shadow .3s ease; }
        .spp-card:hover { transform: translateY(-6px); border-color: var(--accent-line); box-shadow: 0 12px 40px rgb(var(--shadow-rgb) / calc(0.3 * var(--shadow-k))); }
        .spp-btn:hover { box-shadow: 0 0 0 3px rgba(49, 159, 212,.3), 0 8px 32px rgba(49, 159, 212,.4); }
        @media (prefers-reduced-motion: reduce) { .spp-card:hover { transform: none; } }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Band shade="base">
      <HeroLayout
        eyebrow={t.eyebrow}
        headline={<RotatingHeadline lead={t.heroLead} phrases={t.heroPhrases} readAs={t.heroReadAs} />}
        subtitle={t.heroSubtitle}
        actions={
          <HeroActions
            primary={{ label: t.ctaPrimary, href: PROVIDER_SIGN_UP, external: true }}
            secondary={{ label: t.ctaPricing, href: '#provider-pricing' }}
          />
        }
        visual={<SpDashboardMock />}
      />
      </Band>

      {/* ── Exposure ─────────────────────────────────────────────── */}
      <Band shade="alt">
      <section className="py-20" style={{ background: 'var(--section-bg, var(--bg))' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <SectionHeader eyebrow={t.exposureEyebrow} lead={t.exposureTitleLead} accent={t.exposureTitleAccent} subtitle={t.exposureSubtitle} isRTL={isRTL} />
          </FadeUp>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto" staggerDelay={0.08}>
            {t.exposure.map((item, i) => {
              const Icon = EXPOSURE_ICONS[i]
              return (
                <motion.div key={item.title} variants={staggerItem}>
                  <div className="ui-card spp-card flex flex-col gap-4 rounded-2xl p-6 h-full">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                      <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-strong font-semibold leading-snug mb-2" style={{ fontSize: 16 }}>{item.title}</h3>
                      <p className="leading-relaxed" style={{ fontSize: 14, color: 'var(--text-muted)' }}>{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </StaggerGrid>
        </div>
      </section>
      </Band>

      {/* ── How it works ─────────────────────────────────────────── */}
      <Band shade="base">
      <section className="py-20" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <SectionHeader eyebrow={t.stepsEyebrow} lead={t.stepsTitleLead} accent={t.stepsTitleAccent} isRTL={isRTL} />
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {t.steps.map((step, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <FadeUp key={step.title} delay={0.1 + i * 0.08}>
                  <div className="ui-card rounded-2xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                        <Icon size={19} color="var(--accent-hi)" strokeWidth={1.75} />
                      </div>
                      <span className="text-[11px] font-bold tracking-widest" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-strong font-semibold mb-2" style={{ fontSize: 16 }}>{step.title}</h3>
                    <p className="leading-relaxed" style={{ fontSize: 14, color: 'var(--text-muted)' }}>{step.description}</p>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>
      </Band>

      <Band shade="alt"><ProviderPricing /></Band>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <Band shade="base">
      <section className="py-20" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <div
              className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 text-center max-w-5xl mx-auto"
              style={{ background: 'linear-gradient(135deg, rgba(49, 159, 212,0.14), var(--surface))', border: '1px solid var(--accent-line)' }}
            >
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute rounded-full blur-[90px] opacity-40" style={{ width: 400, height: 400, top: '-40%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, var(--accent), transparent 70%)' }} />
              </div>
              <div className="relative z-10">
                <h2 className="text-strong font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>{t.ctaTitle}</h2>
                <p className="max-w-xl mx-auto mb-8" style={{ fontSize: 16, color: 'var(--text-muted)' }}>{t.ctaSubtitle}</p>
                <a
                  href={PROVIDER_SIGN_UP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-btn ui-btn-primary"
                >
                  {t.ctaPrimary}{arrow}
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
      </Band>
    </>
  )
}
