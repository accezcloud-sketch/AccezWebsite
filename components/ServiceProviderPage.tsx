import { TicketPercent, Award, ListOrdered, Gift, Tag, Star, Scissors, MessageSquareText } from 'lucide-react'
import type { Locale } from '@/lib/i18n'
import { PROVIDER_SIGN_UP } from '@/lib/links'
import CenteredHero from '@/components/hero/CenteredHero'
import HeroActions from '@/components/hero/HeroActions'
import PhotoCta from '@/components/hero/PhotoCta'
import { SHOPPING_CENTRE } from '@/components/hero/photos'
import Band from '@/components/ui/Band'
import SectionHeader from '@/components/SectionHeader'
import ProductShot from '@/components/product/ProductShot'
import FeatureSteps, { type FeatureStep } from '@/components/product/FeatureSteps'
import MoreFeatures from '@/components/product/MoreFeatures'
import ProviderPricing from '@/components/ProviderPricing'
import AudienceLinks from '@/components/solutions/AudienceLinks'
import RelatedPosts from '@/components/blog/RelatedPosts'
import { solutionByKey, solutionSubject } from '@/lib/platform/solutions'

interface Area {
  id: 'bookings' | 'team'
  title: string
  subtitle: string
  steps: FeatureStep[]
}

const CONTENT = {
  en: {
    title: 'Your bookings, customers and team',
    accent: 'in one place',
    subtitle: 'For barbers, salons, spas, coaches and other businesses that take appointments.',
    ctaPrimary: 'Create a provider account',
    ctaPricing: 'See plans and pricing',
    areas: [
      {
        id: 'bookings', title: 'Bookings and customers', subtitle: 'Every appointment and every client, in one dashboard.',
        steps: [
          { title: 'Bookings', text: 'Accept, start and complete each booking, or mark a no-show.', shot: 'spBookings' },
          { title: 'Calendar', text: 'Every booking of the week in one view.', shot: 'spCalendar' },
          { title: 'Customers', text: 'Visits, spend and last visit for every client.', shot: 'spCustomers' },
        ],
      },
      {
        id: 'team', title: 'Your team and your rules', subtitle: 'Who works, when you are open, and how you get paid.',
        steps: [
          { title: 'Team', text: 'Add staff, each with a login, and assign the services each one gives.', shot: 'spTeam' },
          { title: 'Business hours', text: 'Set your week, with more than one shift a day.', shot: 'spHours' },
          { title: 'Policies', text: 'Your timezone and an upfront deposit.', shot: 'spPolicies' },
          { title: 'Integrations', text: 'Tap, Stripe, analytics and SMS.', shot: 'spIntegrations' },
        ],
      },
    ] satisfies Area[],
    moreLabel: 'And more',
    more: [
      { title: 'Promo codes', text: 'Discount codes for your clients.' },
      { title: 'Loyalty points', text: 'Points for your clients.' },
      { title: 'Waitlist', text: 'Keep a waitlist of clients.' },
      { title: 'Gift cards', text: 'Offer gift cards to your clients.' },
      { title: 'Deals', text: 'Offer deals on your services.' },
      { title: 'Reviews', text: 'Ratings and reviews from your clients.' },
      { title: 'Services', text: 'Each with its own duration and price.' },
      { title: 'SMS messaging', text: 'Text your customers through Twilio.' },
    ],
    stepsTitle: 'Live in three steps',
    steps: [
      { title: 'Create your account', text: 'Sign up as a service provider.' },
      { title: 'Add your services', text: 'Prices, durations, hours and team.' },
      { title: 'Take bookings', text: 'Every booking lands in your dashboard.' },
    ],
    ctaTitle: 'Ready to take bookings?',
    ctaSubtitle: 'Create your provider account and add your services.',
  },
  ar: {
    title: 'حجوزاتك وعملاؤك وفريقك',
    accent: 'في مكان واحد',
    subtitle: 'للحلاقين والصالونات والمنتجعات الصحية والمدربين وغيرهم من الأنشطة التي تعمل بالمواعيد.',
    ctaPrimary: 'أنشئ حساب مقدم خدمة',
    ctaPricing: 'اطّلع على الخطط والأسعار',
    areas: [
      {
        id: 'bookings', title: 'الحجوزات والعملاء', subtitle: 'كل موعد وكل عميل في لوحة تحكم واحدة.',
        steps: [
          { title: 'الحجوزات', text: 'اقبل كل حجز وابدأه وأكمله، أو سجّل عدم الحضور.', shot: 'spBookings' },
          { title: 'التقويم', text: 'كل حجوزات الأسبوع في عرض واحد.', shot: 'spCalendar' },
          { title: 'العملاء', text: 'الزيارات والإنفاق وآخر زيارة لكل عميل.', shot: 'spCustomers' },
        ],
      },
      {
        id: 'team', title: 'فريقك وقواعدك', subtitle: 'من يعمل، ومتى تفتح، وكيف تستلم مدفوعاتك.',
        steps: [
          { title: 'الفريق', text: 'أضف الموظفين، لكل منهم تسجيل دخول، وحدد الخدمات التي يقدمها كل منهم.', shot: 'spTeam' },
          { title: 'ساعات العمل', text: 'حدّد أسبوعك، مع أكثر من فترة في اليوم.', shot: 'spHours' },
          { title: 'السياسات', text: 'منطقتك الزمنية والعربون المسبق.', shot: 'spPolicies' },
          { title: 'التكاملات', text: 'Tap وStripe والتحليلات والرسائل النصية.', shot: 'spIntegrations' },
        ],
      },
    ] satisfies Area[],
    moreLabel: 'والمزيد',
    more: [
      { title: 'أكواد الخصم', text: 'أكواد خصم لعملائك.' },
      { title: 'نقاط الولاء', text: 'نقاط لعملائك.' },
      { title: 'قائمة الانتظار', text: 'احتفظ بقائمة انتظار لعملائك.' },
      { title: 'بطاقات الهدايا', text: 'قدّم بطاقات الهدايا لعملائك.' },
      { title: 'العروض', text: 'قدّم عروضًا على خدماتك.' },
      { title: 'التقييمات', text: 'تقييمات ومراجعات من عملائك.' },
      { title: 'الخدمات', text: 'لكل خدمة مدتها وسعرها.' },
      { title: 'الرسائل النصية', text: 'راسل عملاءك عبر Twilio.' },
    ],
    stepsTitle: 'ابدأ في ثلاث خطوات',
    steps: [
      { title: 'أنشئ حسابك', text: 'سجّل كمقدم خدمة.' },
      { title: 'أضف خدماتك', text: 'الأسعار والمدد والساعات والفريق.' },
      { title: 'استقبل الحجوزات', text: 'يصل كل حجز إلى لوحة التحكم.' },
    ],
    ctaTitle: 'مستعد لاستقبال الحجوزات؟',
    ctaSubtitle: 'أنشئ حساب مقدم الخدمة وأضف خدماتك.',
  },
} as const

const MORE_ICONS = [TicketPercent, Award, ListOrdered, Gift, Tag, Star, Scissors, MessageSquareText]

/**
 * /solutions/service-providers/: the service provider solution, shown with
 * real screens. Each area is a few steps; choosing one shows its screen.
 */
export default function ServiceProviderPage({ locale }: { locale: Locale }) {
  const t = CONTENT[locale]

  return (
    <>
      <Band shade="base">
        <CenteredHero
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
          backdrop={SHOPPING_CENTRE}
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

      <Band shade="alt">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <MoreFeatures label={t.moreLabel} items={t.more.map((x, i) => ({ ...x, icon: MORE_ICONS[i] }))} />
          </div>
        </section>
      </Band>

      <AudienceLinks solution="service-providers" locale={locale} shade="base" />

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

      <Band shade="base"><ProviderPricing locale={locale} /></Band>

      <PhotoCta
        title={t.ctaTitle}
        subtitle={t.ctaSubtitle}
        photo={SHOPPING_CENTRE}
        actions={<HeroActions primary={{ label: t.ctaPrimary, href: PROVIDER_SIGN_UP, external: true }} />}
      />
      <RelatedPosts about={solutionSubject(solutionByKey('service-providers')!)} audience="service-providers" locale={locale} />
    </>
  )
}
