'use client'

import { Scissors, CalendarDays, ListOrdered, Gift, Tag, Star, MessageSquareText, Receipt } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROVIDER_SIGN_UP } from '@/lib/links'
import CenteredHero from '@/components/hero/CenteredHero'
import HeroActions from '@/components/hero/HeroActions'
import Band from '@/components/ui/Band'
import SectionHeader from '@/components/SectionHeader'
import ProductShot from '@/components/product/ProductShot'
import FeatureSteps, { type FeatureStep } from '@/components/product/FeatureSteps'
import MoreFeatures from '@/components/product/MoreFeatures'
import ProviderPricing from '@/components/ProviderPricing'

interface Area {
  id: 'bookings' | 'growth' | 'team'
  title: string
  subtitle: string
  steps: FeatureStep[]
}

const CONTENT = {
  en: {
    eyebrow: 'Service provider solution',
    title: 'Your bookings, customers and team',
    accent: 'in one place',
    subtitle: 'For barbers, salons, spas, coaches and every business that takes appointments.',
    ctaPrimary: 'Create a provider account',
    ctaPricing: 'See plans and pricing',
    areas: [
      {
        id: 'bookings', title: 'Bookings and customers', subtitle: 'Every appointment and every client, in one dashboard.',
        steps: [
          { title: 'Bookings', text: 'Accept, start and complete each booking, or mark a no-show.', shot: 'spBookings' },
          { title: 'Customers', text: 'Visits, spend and last visit for every client.', shot: 'spCustomers' },
          { title: 'Business hours', text: 'Set your week, with more than one shift a day.', shot: 'spHours' },
        ],
      },
      {
        id: 'growth', title: 'Grow and get paid', subtitle: 'Bring clients back and take payments online.',
        steps: [
          { title: 'Promo codes', text: 'Discounts with limits, a minimum order and an end date.', shot: 'spPromos' },
          { title: 'Loyalty', text: 'Clients earn points on every booking.', shot: 'spLoyalty' },
          { title: 'Integrations', text: 'Tap, Stripe, analytics and SMS.', shot: 'spIntegrations' },
        ],
      },
      {
        id: 'team', title: 'Your team and your rules', subtitle: 'Everyone has their own login and services.',
        steps: [
          { title: 'Team', text: 'Add staff and choose the services each one gives.', shot: 'spTeam' },
          { title: 'Policies', text: 'Your timezone and an upfront deposit.', shot: 'spPolicies' },
        ],
      },
    ] satisfies Area[],
    moreLabel: 'And more',
    more: [
      { title: 'Services', text: 'Each with its own duration and price.' },
      { title: 'Calendar', text: 'Your whole week at a glance.' },
      { title: 'Waitlist', text: 'Fill the gaps when a slot opens.' },
      { title: 'Gift cards', text: 'Sell credit clients can give.' },
      { title: 'Deals', text: 'Bundle services at one price.' },
      { title: 'Reviews', text: 'Ratings from completed bookings.' },
      { title: 'SMS messaging', text: 'Reminders and updates by text.' },
      { title: 'Billing', text: 'Your plan and invoices.' },
    ],
    stepsTitle: 'Live in three steps',
    steps: [
      { title: 'Create your account', text: 'Sign up as a service provider.' },
      { title: 'Add your services', text: 'Prices, durations, hours and team.' },
      { title: 'Take bookings', text: 'Every booking lands in your dashboard.' },
    ],
    ctaTitle: 'Ready to take bookings?',
    ctaSubtitle: 'Create your provider account in minutes.',
  },
  ar: {
    eyebrow: 'حل مقدمي الخدمات',
    title: 'حجوزاتك وعملاؤك وفريقك',
    accent: 'في مكان واحد',
    subtitle: 'للحلاقين والصالونات والمنتجعات الصحية والمدربين وكل نشاط يعمل بالمواعيد.',
    ctaPrimary: 'أنشئ حساب مقدم خدمة',
    ctaPricing: 'اطّلع على الخطط والأسعار',
    areas: [
      {
        id: 'bookings', title: 'الحجوزات والعملاء', subtitle: 'كل موعد وكل عميل في لوحة تحكم واحدة.',
        steps: [
          { title: 'الحجوزات', text: 'اقبل كل حجز وابدأه وأكمله، أو سجّل عدم الحضور.', shot: 'spBookings' },
          { title: 'العملاء', text: 'الزيارات والإنفاق وآخر زيارة لكل عميل.', shot: 'spCustomers' },
          { title: 'ساعات العمل', text: 'حدّد أسبوعك، مع أكثر من فترة في اليوم.', shot: 'spHours' },
        ],
      },
      {
        id: 'growth', title: 'انمُ واستلم مدفوعاتك', subtitle: 'أعد عملاءك واستقبل الدفع إلكترونيًا.',
        steps: [
          { title: 'أكواد الخصم', text: 'خصومات بحدود وحد أدنى للطلب وتاريخ انتهاء.', shot: 'spPromos' },
          { title: 'الولاء', text: 'يكسب العملاء نقاطًا على كل حجز.', shot: 'spLoyalty' },
          { title: 'التكاملات', text: 'Tap وStripe والتحليلات والرسائل النصية.', shot: 'spIntegrations' },
        ],
      },
      {
        id: 'team', title: 'فريقك وقواعدك', subtitle: 'لكل شخص تسجيل دخول وخدماته الخاصة.',
        steps: [
          { title: 'الفريق', text: 'أضف الموظفين واختر الخدمات التي يقدمها كل منهم.', shot: 'spTeam' },
          { title: 'السياسات', text: 'منطقتك الزمنية والعربون المسبق.', shot: 'spPolicies' },
        ],
      },
    ] satisfies Area[],
    moreLabel: 'والمزيد',
    more: [
      { title: 'الخدمات', text: 'لكل خدمة مدتها وسعرها.' },
      { title: 'التقويم', text: 'أسبوعك كاملًا في لمحة.' },
      { title: 'قائمة الانتظار', text: 'املأ الفراغ عند توفر موعد.' },
      { title: 'بطاقات الهدايا', text: 'بِع رصيدًا يهديه العملاء.' },
      { title: 'العروض', text: 'اجمع خدمات بسعر واحد.' },
      { title: 'التقييمات', text: 'تقييمات من الحجوزات المكتملة.' },
      { title: 'الرسائل النصية', text: 'تذكيرات وتحديثات برسالة نصية.' },
      { title: 'الفوترة', text: 'خطتك وفواتيرك.' },
    ],
    stepsTitle: 'ابدأ في ثلاث خطوات',
    steps: [
      { title: 'أنشئ حسابك', text: 'سجّل كمقدم خدمة.' },
      { title: 'أضف خدماتك', text: 'الأسعار والمدد والساعات والفريق.' },
      { title: 'استقبل الحجوزات', text: 'يصل كل حجز إلى لوحة التحكم.' },
    ],
    ctaTitle: 'مستعد لاستقبال الحجوزات؟',
    ctaSubtitle: 'أنشئ حساب مقدم الخدمة خلال دقائق.',
  },
} as const

const MORE_ICONS = [Scissors, CalendarDays, ListOrdered, Gift, Tag, Star, MessageSquareText, Receipt]

/**
 * /solutions/service-providers/: the service provider solution, shown with
 * real screens. Each area is a few steps; choosing one shows its screen.
 */
export default function ServiceProviderPage() {
  const { language: locale } = useLanguage()
  const t = CONTENT[locale]

  return (
    <>
      <Band shade="base">
        <CenteredHero
          eyebrow={t.eyebrow}
          title={t.title}
          accent={t.accent}
          subtitle={t.subtitle}
          actions={
            <HeroActions
              primary={{ label: t.ctaPrimary, href: PROVIDER_SIGN_UP, external: true }}
              secondary={{ label: t.ctaPricing, href: '#provider-pricing' }}
            />
          }
          media={<ProductShot shot="spDashboard" locale={locale} priority />}
        />
      </Band>

      {t.areas.map((area, i) => (
        <Band key={area.id} shade={i % 2 === 0 ? 'alt' : 'base'}>
          <section id={area.id} className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <SectionHeader lead={area.title} subtitle={area.subtitle} />
              <FeatureSteps id={area.id} steps={[...area.steps]} locale={locale} flip={i % 2 === 1} />
            </div>
          </section>
        </Band>
      ))}

      <Band shade="base">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <MoreFeatures label={t.moreLabel} items={t.more.map((x, i) => ({ ...x, icon: MORE_ICONS[i] }))} />
          </div>
        </section>
      </Band>

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader lead={t.stepsTitle} />
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.steps.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-2 md:border-s md:ps-6" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-sm font-bold tracking-widest" style={{ color: 'var(--accent-hi)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-strong font-semibold" style={{ fontSize: 17 }}>{step.title}</span>
                  <span className="text-muted text-[15px] leading-relaxed">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Band>

      <Band shade="base"><ProviderPricing /></Band>

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg-alt))' }}>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="hero-display text-strong font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(26px, 3.6vw, 40px)', fontWeight: 800 }}>{t.ctaTitle}</h2>
            <p className="mx-auto mb-8 text-muted" style={{ fontSize: 16 }}>{t.ctaSubtitle}</p>
            <HeroActions primary={{ label: t.ctaPrimary, href: PROVIDER_SIGN_UP, external: true }} />
          </div>
        </section>
      </Band>
    </>
  )
}
