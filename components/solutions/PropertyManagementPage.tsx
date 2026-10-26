import { FileSignature, Wallet, FolderKanban, HandCoins, MessageSquareText, Inbox, UsersRound, Wrench } from 'lucide-react'
import Band from '@/components/ui/Band'
import CenteredHero from '@/components/hero/CenteredHero'
import HeroActions from '@/components/hero/HeroActions'
import PhotoCta from '@/components/hero/PhotoCta'
import { RIYADH_CENTRE } from '@/components/hero/photos'
import SectionHeader from '@/components/SectionHeader'
import ProductShot from '@/components/product/ProductShot'
import FeatureSteps, { type FeatureStep } from '@/components/product/FeatureSteps'
import MoreFeatures from '@/components/product/MoreFeatures'
import Pricing from '@/components/Pricing'
import BlogStrip from '@/components/blog/BlogStrip'
import { MODULES_COPY } from '@/lib/content/modulesCopy'
import { subpageBySlug, subpageHref } from '@/lib/platform/subpages'
import ModuleLinks from './ModuleLinks'
import { PORTAL_SIGN_UP } from '@/lib/links'
import { localeHref, type Locale } from '@/lib/i18n'

interface Area {
  /** Anchor on the page; the old /owners, /sales and /hotels pages redirect to these. */
  id: 'rentals' | 'sales' | 'billing'
  title: string
  subtitle: string
  steps: FeatureStep[]
}

const COPY = {
  en: {
    title: 'Run every property',
    accent: 'from one place',
    subtitle: 'Rentals, reservations, sales and billing in one system.',
    areas: [
      {
        id: 'rentals', title: 'Rentals and reservations', subtitle: 'From the property to the booking, in one place.',
        steps: [
          { title: 'Every property at a glance', text: 'Revenue, residents, units and work orders for each property.', shot: 'pmProperty' },
          { title: 'Availability calendar', text: 'Sync channels, update prices in bulk, import and export.', shot: 'pmCalendar' },
          { title: 'Reservations', text: 'Each stay with its timeline, payment and accepted policies.', shot: 'pmReservation' },
          { title: 'Add-ons', text: 'Sell meals, cleaning and transport with every stay.', shot: 'pmAddons' },
        ],
      },
      {
        id: 'sales', title: 'Sales and projects', subtitle: 'Sell units and follow every deal to the contract.',
        steps: [
          { title: 'Sale units', text: 'Every unit with its status, price and buyer.', shot: 'pmSaleUnits' },
          { title: 'Sales path', text: 'Move each sale from new to contract signed.', shot: 'pmSalesPath' },
          { title: 'All records', text: 'Every sale in one sheet, filtered your way.', shot: 'pmSalesRecords' },
          { title: 'Units map', text: 'See where every unit is.', shot: 'pmUnitsMap' },
        ],
      },
      {
        id: 'billing', title: 'Billing and operations', subtitle: 'Payments, integrations and messages, handled.',
        steps: [
          { title: 'Billing and payments', text: 'Revenue, invoices and refunds, with the trend.', shot: 'pmBilling' },
          { title: 'Integrations', text: 'Stripe, Tap, Google Analytics, Meta Pixel and SMS.', shot: 'pmIntegrations' },
          { title: 'Email templates', text: 'Confirmations, check-ins and cancellations, sent for you.', shot: 'pmEmails' },
        ],
      },
    ] satisfies Area[],
    moreLabel: 'And more',
    more: [
      { title: 'Leases', text: 'Long-term contracts with every tenant.' },
      { title: 'Rent payments', text: 'See what is paid and what is due.' },
      { title: 'Projects', text: 'Group sale units by development.' },
      { title: 'Owners and payouts', text: 'Statements and payouts for each owner.' },
      { title: 'SMS messaging', text: 'Text guests and tenants.' },
      { title: 'One inbox', text: 'Every conversation in one place.' },
      { title: 'Staff and roles', text: 'Give each person the access they need.' },
      { title: 'Work orders', text: 'Track maintenance from request to done.' },
    ],
  },
  ar: {
    title: 'أدر كل عقار',
    accent: 'من مكان واحد',
    subtitle: 'الإيجارات والحجوزات والمبيعات والفوترة في نظام واحد.',
    areas: [
      {
        id: 'rentals', title: 'الإيجارات والحجوزات', subtitle: 'من العقار إلى الحجز، في مكان واحد.',
        steps: [
          { title: 'كل عقار في لمحة', text: 'الإيرادات والسكان والوحدات وأوامر العمل لكل عقار.', shot: 'pmProperty' },
          { title: 'تقويم التوفر', text: 'زامن القنوات وحدّث الأسعار دفعة واحدة واستورد وصدّر.', shot: 'pmCalendar' },
          { title: 'الحجوزات', text: 'كل إقامة مع جدولها الزمني ودفعها والسياسات المقبولة.', shot: 'pmReservation' },
          { title: 'الإضافات', text: 'بِع الوجبات والتنظيف والنقل مع كل إقامة.', shot: 'pmAddons' },
        ],
      },
      {
        id: 'sales', title: 'المبيعات والمشاريع', subtitle: 'بِع الوحدات وتابع كل صفقة حتى العقد.',
        steps: [
          { title: 'وحدات البيع', text: 'كل وحدة مع حالتها وسعرها والمشتري.', shot: 'pmSaleUnits' },
          { title: 'مسار المبيعات', text: 'انقل كل صفقة من جديدة إلى موقّعة.', shot: 'pmSalesPath' },
          { title: 'كل السجلات', text: 'كل المبيعات في جدول واحد بالتصفية التي تريدها.', shot: 'pmSalesRecords' },
          { title: 'خريطة الوحدات', text: 'اعرف مكان كل وحدة.', shot: 'pmUnitsMap' },
        ],
      },
      {
        id: 'billing', title: 'الفوترة والعمليات', subtitle: 'المدفوعات والتكاملات والرسائل، كلها مُدارة.',
        steps: [
          { title: 'الفوترة والمدفوعات', text: 'الإيرادات والفواتير والمبالغ المستردة مع اتجاهها.', shot: 'pmBilling' },
          { title: 'التكاملات', text: 'Stripe وTap وGoogle Analytics وMeta Pixel والرسائل النصية.', shot: 'pmIntegrations' },
          { title: 'قوالب البريد', text: 'التأكيدات وتسجيل الوصول والإلغاء تُرسل نيابة عنك.', shot: 'pmEmails' },
        ],
      },
    ] satisfies Area[],
    moreLabel: 'والمزيد',
    more: [
      { title: 'عقود الإيجار', text: 'عقود طويلة الأمد مع كل مستأجر.' },
      { title: 'دفعات الإيجار', text: 'اعرف ما دُفع وما هو مستحق.' },
      { title: 'المشاريع', text: 'جمّع وحدات البيع حسب المشروع.' },
      { title: 'الملاك والمدفوعات', text: 'كشوف ومدفوعات لكل مالك.' },
      { title: 'الرسائل النصية', text: 'راسل النزلاء والمستأجرين.' },
      { title: 'صندوق وارد واحد', text: 'كل المحادثات في مكان واحد.' },
      { title: 'الموظفون والأدوار', text: 'امنح كل شخص الصلاحية التي يحتاجها.' },
      { title: 'أوامر العمل', text: 'تابع الصيانة من الطلب حتى الإنجاز.' },
    ],
  },
} as const

const MORE_ICONS = [FileSignature, Wallet, FolderKanban, HandCoins, MessageSquareText, Inbox, UsersRound, Wrench]
/** The module page that covers each of the "And more" items (lib/platform/modules.ts). */
const MORE_MODULES = ['leases-and-rent', 'leases-and-rent', 'sales-and-projects', 'billing-and-payments', 'team-and-messaging', 'team-and-messaging', 'team-and-messaging', 'maintenance-work-orders']
const moduleHref = (slug: string, locale: Locale) => localeHref(subpageHref(subpageBySlug('property-managers', slug)!), locale)

/** Closing call to action, over the page's photo. */
function ClosingCta({ locale }: { locale: Locale }) {
  const c = MODULES_COPY[locale]
  return (
    <PhotoCta
      title={c.ctaTitle}
      subtitle={c.ctaSub}
      photo={RIYADH_CENTRE}
      actions={
        <HeroActions
          primary={{ label: c.ctaPrimary, href: localeHref('/#contact', locale) }}
          secondary={{ label: c.ctaSecondary, href: PORTAL_SIGN_UP, external: true }}
        />
      }
    />
  )
}

/**
 * /solutions/property-managers/: the property management solution, shown
 * with real screens. Each area is a few steps; choosing one shows its screen.
 */
export default function PropertyManagementPage({ locale }: { locale: Locale }) {
  const c = COPY[locale]
  const m = MODULES_COPY[locale]
  return (
    <>
      <Band shade="base">
        <CenteredHero
          title={c.title}
          accent={c.accent}
          subtitle={c.subtitle}
          actions={
            <HeroActions
              primary={{ label: m.ctaPrimary, href: localeHref('/#contact', locale) }}
              secondary={{ label: m.ctaSecondary, href: PORTAL_SIGN_UP, external: true }}
            />
          }
          media={<ProductShot shot="pmDashboard" locale={locale} priority />}
          backdrop={RIYADH_CENTRE}
        />
      </Band>

      {c.areas.map((area, i) => (
        <Band key={area.id} shade={i % 2 === 0 ? 'alt' : 'base'}>
          <section id={area.id} className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
              <SectionHeader lead={area.title} subtitle={area.subtitle} />
              <FeatureSteps id={area.id} steps={[...area.steps]} locale={locale} flip={i % 2 === 1} />
              <ModuleLinks solution="property-managers" area={area.id} locale={locale} />
            </div>
          </section>
        </Band>
      ))}

      <Band shade="base">
        <section className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
            <MoreFeatures label={c.moreLabel} items={c.more.map((x, i) => ({ ...x, icon: MORE_ICONS[i], href: moduleHref(MORE_MODULES[i], locale) }))} />
          </div>
        </section>
      </Band>
      <Band shade="alt"><Pricing locale={locale} /></Band>
      <ClosingCta locale={locale} />
      <Band shade="base"><BlogStrip locale={locale} /></Band>
    </>
  )
}
