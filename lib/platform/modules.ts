/**
 * The modules of the property management solution, one page each at
 * /solutions/property-managers/<slug>/. The grouping follows the solution
 * page: rentals (channels, reservations), sales, billing, and the rest of
 * the operation (leases and rent, work orders, team and messages).
 *
 * Facts only (see the notes on detailPages.ts). Screens exist for the
 * calendar, reservations, add-ons, sales, billing, integrations, email
 * templates and the property overview; modules without their own screen
 * (leases, work orders) show the real screens that include them.
 */
import {
  RefreshCw, Tags, ArrowDownUp, CalendarDays,
  History, CreditCard, ShieldCheck, Sparkles, Mail,
  Building2, Route, Table2, Map, FolderKanban,
  TrendingUp, FileText, RotateCcw, HandCoins,
  FileSignature, Wallet, UsersRound, PieChart,
  Wrench, ClipboardList, Inbox, MessageSquareText, Languages,
} from 'lucide-react'
import type { SolutionSubpage } from './subpageTypes'

const ARABIC_AND_ENGLISH = {
  q: { en: 'Does it work in Arabic?', ar: 'هل يعمل باللغة العربية؟' },
  a: {
    en: 'Yes. The portal works in Arabic and English, in the browser on a desktop or a phone.',
    ar: 'نعم. تعمل البوابة بالعربية والإنجليزية، في المتصفح على الحاسوب أو الهاتف.',
  },
}

export const MODULE_PAGES: SolutionSubpage[] = [
  {
    solution: 'property-managers',
    kind: 'module',
    area: 'rentals',
    slug: 'channel-manager',
    name: { en: 'Channel manager', ar: 'مدير القنوات' },
    summary: { en: 'One calendar synced with Airbnb, Booking.com and Expedia.', ar: 'تقويم واحد متزامن مع Airbnb وBooking.com وExpedia.' },
    metaTitle: { en: 'Channel manager for Saudi property managers', ar: 'مدير القنوات لمديري العقارات في السعودية' },
    metaDescription: {
      en: 'Sync one availability calendar with Airbnb, Booking.com and Expedia, update prices in bulk, and import or export dates. For Saudi property managers.',
      ar: 'زامن تقويم توفر واحدًا مع Airbnb وBooking.com وExpedia، وحدّث الأسعار دفعة واحدة، واستورد التواريخ أو صدّرها. حل مصمم لمديري العقارات في السعودية.',
    },
    hero: {
      title: { en: 'Channel manager', ar: 'مدير القنوات' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'One availability calendar, synced with Airbnb, Booking.com and Expedia.', ar: 'تقويم توفر واحد، متزامن مع Airbnb وBooking.com وExpedia.' },
    },
    shots: [
      { shot: 'pmCalendar', title: { en: 'Availability calendar', ar: 'تقويم التوفر' }, text: { en: 'Sync channels, update prices in bulk, import and export.', ar: 'زامن القنوات وحدّث الأسعار دفعة واحدة واستورد وصدّر.' } },
      { shot: 'pmReservation', title: { en: 'Every reservation', ar: 'كل حجز' }, text: { en: 'Each stay with its timeline, payment and accepted policies.', ar: 'كل إقامة مع جدولها الزمني ودفعها والسياسات المقبولة.' } },
    ],
    points: [
      { icon: RefreshCw, title: { en: 'Sync channels', ar: 'مزامنة القنوات' }, text: { en: 'Airbnb, Booking.com and Expedia from one calendar.', ar: 'Airbnb وBooking.com وExpedia من تقويم واحد.' } },
      { icon: Tags, title: { en: 'Bulk price updates', ar: 'تحديث الأسعار دفعة واحدة' }, text: { en: 'Change prices for many dates at once.', ar: 'غيّر أسعار تواريخ كثيرة مرة واحدة.' } },
      { icon: ArrowDownUp, title: { en: 'Import and export', ar: 'الاستيراد والتصدير' }, text: { en: 'Bring calendar data in and take it out.', ar: 'أدخل بيانات التقويم وأخرجها.' } },
      { icon: CalendarDays, title: { en: 'One unit or all units', ar: 'وحدة واحدة أو كل الوحدات' }, text: { en: 'Switch the calendar between a single unit and all units.', ar: 'بدّل التقويم بين وحدة واحدة وكل الوحدات.' } },
    ],
    faqs: [
      { q: { en: 'Which booking channels does Accez sync with?', ar: 'ما قنوات الحجز التي يتزامن معها أكسيز؟' }, a: { en: 'Airbnb, Booking.com and Expedia.', ar: 'Airbnb وBooking.com وExpedia.' } },
      { q: { en: 'Can I change prices for many dates at once?', ar: 'هل يمكنني تغيير أسعار تواريخ كثيرة مرة واحدة؟' }, a: { en: 'Yes. The availability calendar has a bulk update for prices.', ar: 'نعم. في تقويم التوفر تحديث جماعي للأسعار.' } },
      ARABIC_AND_ENGLISH,
    ],
    modules: ['reservations-and-stays', 'billing-and-payments', 'team-and-messaging'],
    integrations: ['channels'],
    posts: ['the-double-booking-nightmare-how-to-sync-every-channel', 'channel-manager-vs-property-management-system', 'the-ota-commission-drain-how-to-build-direct-bookings'],
  },
  {
    solution: 'property-managers',
    kind: 'module',
    area: 'rentals',
    slug: 'reservations-and-stays',
    name: { en: 'Reservations and stays', ar: 'الحجوزات والإقامات' },
    summary: { en: 'Each stay with its timeline, payment, policies and add-ons.', ar: 'كل إقامة مع جدولها الزمني ودفعها وسياساتها وإضافاتها.' },
    metaTitle: { en: 'Reservation management for Saudi property managers', ar: 'إدارة الحجوزات لمديري العقارات في السعودية' },
    metaDescription: {
      en: 'Manage every reservation with its timeline, payment and accepted policies, and sell add-ons like meals, cleaning and transport with each stay. Try Accez.',
      ar: 'أدر كل حجز مع جدوله الزمني ودفعه والسياسات التي قبلها الضيف، وبِع إضافات مثل الوجبات والتنظيف والنقل مع كل إقامة. برنامج إدارة الحجوزات في أكسيز.',
    },
    hero: {
      title: { en: 'Reservation management', ar: 'إدارة الحجوزات' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'Each stay with its timeline, payment and policies, and the add-ons sold with it.', ar: 'كل إقامة مع جدولها الزمني ودفعها وسياساتها، والإضافات المبيعة معها.' },
    },
    shots: [
      { shot: 'pmReservation', title: { en: 'A reservation', ar: 'الحجز' }, text: { en: 'The timeline, payment summary and accepted policies of one stay.', ar: 'الجدول الزمني وملخص الدفع والسياسات المقبولة لإقامة واحدة.' } },
      { shot: 'pmAddons', title: { en: 'Add-ons', ar: 'الإضافات' }, text: { en: 'Sell meals, cleaning and transport with stays.', ar: 'بِع الوجبات والتنظيف والنقل مع الإقامات.' } },
      { shot: 'pmProperty', title: { en: 'Every property at a glance', ar: 'كل عقار في لمحة' }, text: { en: 'Revenue, residents, units and work orders for each property.', ar: 'الإيرادات والسكان والوحدات وأوامر العمل لكل عقار.' } },
    ],
    points: [
      { icon: History, title: { en: 'Stay timeline', ar: 'الجدول الزمني للإقامة' }, text: { en: 'Each reservation keeps its own timeline.', ar: 'لكل حجز جدوله الزمني الخاص.' } },
      { icon: CreditCard, title: { en: 'Payment summary', ar: 'ملخص الدفع' }, text: { en: 'See the payment of every stay.', ar: 'اطّلع على دفع كل إقامة.' } },
      { icon: ShieldCheck, title: { en: 'Accepted policies', ar: 'السياسات المقبولة' }, text: { en: 'The policies the guest accepted, kept with the stay.', ar: 'السياسات التي قبلها الضيف، محفوظة مع الإقامة.' } },
      { icon: Sparkles, title: { en: 'Add-ons', ar: 'الإضافات' }, text: { en: 'Meals, cleaning and transport, sold with stays.', ar: 'الوجبات والتنظيف والنقل، تُباع مع الإقامات.' } },
      { icon: Mail, title: { en: 'Email templates', ar: 'قوالب البريد' }, text: { en: 'Confirmations, check-ins and cancellations.', ar: 'التأكيدات وتسجيل الوصول والإلغاء.' } },
    ],
    faqs: [
      { q: { en: 'What does each reservation show?', ar: 'ماذا يعرض كل حجز؟' }, a: { en: 'Its timeline, a payment summary and the policies the guest accepted.', ar: 'جدوله الزمني وملخص الدفع والسياسات التي قبلها الضيف.' } },
      { q: { en: 'Can I sell extras with a stay?', ar: 'هل يمكنني بيع خدمات إضافية مع الإقامة؟' }, a: { en: 'Yes. Add-ons such as meals, cleaning and transport are sold with stays.', ar: 'نعم. تُباع الإضافات مثل الوجبات والتنظيف والنقل مع الإقامات.' } },
      { q: { en: 'Which channels does the calendar sync with?', ar: 'مع أي القنوات يتزامن التقويم؟' }, a: { en: 'Airbnb, Booking.com and Expedia, through the channel manager.', ar: 'Airbnb وBooking.com وExpedia، من خلال مدير القنوات.' } },
    ],
    modules: ['channel-manager', 'billing-and-payments', 'team-and-messaging'],
    integrations: ['channels'],
    posts: [
      'the-double-booking-nightmare-how-to-sync-every-channel',
      'the-upsell-playbook-turning-early-check-ins-and-add-ons',
      'reducing-cancellations-why-guests-book-then-bail',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'module',
    area: 'sales',
    slug: 'sales-and-projects',
    name: { en: 'Sales and projects', ar: 'المبيعات والمشاريع' },
    summary: { en: 'Sale units, the sales path, all records and a units map.', ar: 'وحدات البيع ومسار المبيعات وكل السجلات وخريطة الوحدات.' },
    metaTitle: { en: 'Real estate sales software for Saudi developers', ar: 'برنامج مبيعات العقارات للمطورين في السعودية' },
    metaDescription: {
      en: 'Track sale units by status, price and buyer, move each sale from new to contract signed, group units by project and see them on a map. For Saudi teams.',
      ar: 'تابع وحدات البيع حسب الحالة والسعر والمشتري، وانقل كل صفقة من جديدة إلى عقد موقّع، وجمّع الوحدات حسب المشروع واعرضها على الخريطة. مصمم لفرق المبيعات.',
    },
    hero: {
      title: { en: 'Real estate sales software', ar: 'برنامج مبيعات العقارات' },
      accent: { en: 'for Saudi developers', ar: 'للمطورين في السعودية' },
      subtitle: { en: 'Sale units, the sales path to a signed contract, every record and a units map.', ar: 'وحدات البيع، ومسار المبيعات حتى العقد الموقّع، وكل السجلات، وخريطة الوحدات.' },
    },
    shots: [
      { shot: 'pmSaleUnits', title: { en: 'Sale units', ar: 'وحدات البيع' }, text: { en: 'Every unit with its status, price and buyer.', ar: 'كل وحدة مع حالتها وسعرها والمشتري.' } },
      { shot: 'pmSalesPath', title: { en: 'Sales path', ar: 'مسار المبيعات' }, text: { en: 'Move each sale from new to contract signed.', ar: 'انقل كل صفقة من جديدة إلى موقّعة.' } },
      { shot: 'pmSalesRecords', title: { en: 'All records', ar: 'كل السجلات' }, text: { en: 'Every sale record in one sheet, with filters.', ar: 'كل سجلات البيع في جدول واحد مع عوامل التصفية.' } },
      { shot: 'pmUnitsMap', title: { en: 'Units map', ar: 'خريطة الوحدات' }, text: { en: 'Sale units on a map.', ar: 'وحدات البيع على الخريطة.' } },
    ],
    points: [
      { icon: Building2, title: { en: 'Sale units', ar: 'وحدات البيع' }, text: { en: 'Status, price and buyer for every unit.', ar: 'الحالة والسعر والمشتري لكل وحدة.' } },
      { icon: Route, title: { en: 'Sales path', ar: 'مسار المبيعات' }, text: { en: 'From new to contract signed.', ar: 'من صفقة جديدة إلى عقد موقّع.' } },
      { icon: Table2, title: { en: 'All records', ar: 'كل السجلات' }, text: { en: 'Every sale record in one sheet, with filters.', ar: 'كل سجلات البيع في جدول واحد مع عوامل التصفية.' } },
      { icon: Map, title: { en: 'Units map', ar: 'خريطة الوحدات' }, text: { en: 'Sale units on a map.', ar: 'وحدات البيع على الخريطة.' } },
      { icon: FolderKanban, title: { en: 'Projects', ar: 'المشاريع' }, text: { en: 'Group sale units by development.', ar: 'جمّع وحدات البيع حسب المشروع.' } },
    ],
    faqs: [
      { q: { en: 'Can I group units by project?', ar: 'هل يمكنني تجميع الوحدات حسب المشروع؟' }, a: { en: 'Yes. Projects group sale units, and you can filter the units by project.', ar: 'نعم. تجمع المشاريع وحدات البيع، ويمكنك تصفية الوحدات حسب المشروع.' } },
      { q: { en: 'How do I follow a sale?', ar: 'كيف أتابع صفقة البيع؟' }, a: { en: 'On the sales path, each sale moves from new to contract signed.', ar: 'في مسار المبيعات، تنتقل كل صفقة من جديدة إلى عقد موقّع.' } },
      { q: { en: 'Can sales and rentals run in one system?', ar: 'هل يمكن إدارة المبيعات والإيجارات في نظام واحد؟' }, a: { en: 'Yes. Sales and projects sit in the same property management solution as rentals and reservations.', ar: 'نعم. المبيعات والمشاريع جزء من حل إدارة العقارات نفسه مع الإيجارات والحجوزات.' } },
    ],
    modules: ['billing-and-payments', 'leases-and-rent', 'team-and-messaging'],
    integrations: [],
    posts: [
      'how-to-choose-property-management-software-in-saudi-arabia',
      'accez-cloud-vs-saudi-property-management-platforms',
      'migrating-from-spreadsheets-and-legacy-software-without-losing-data',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'module',
    area: 'billing',
    slug: 'billing-and-payments',
    name: { en: 'Billing and payments', ar: 'الفوترة والمدفوعات' },
    summary: { en: 'Revenue, invoices, refunds, Stripe and Tap, and owner payouts.', ar: 'الإيرادات والفواتير والمبالغ المستردة وStripe وTap ومدفوعات الملاك.' },
    metaTitle: { en: 'Billing and payments for Saudi property managers', ar: 'الفوترة والمدفوعات لمديري العقارات في السعودية' },
    metaDescription: {
      en: 'See revenue, invoices and refunds together, take payments through Stripe and Tap, and keep statements and payouts for each owner. For property managers.',
      ar: 'اعرض الإيرادات والفواتير والمبالغ المستردة في مكان واحد، واستلم المدفوعات عبر Stripe وTap، واحفظ الكشوف والمدفوعات لكل مالك. حل لمديري العقارات.',
    },
    hero: {
      title: { en: 'Billing and payments', ar: 'الفوترة والمدفوعات' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'Revenue, invoices and refunds in one view, payments through Stripe and Tap, and payouts for each owner.', ar: 'الإيرادات والفواتير والمبالغ المستردة في عرض واحد، والمدفوعات عبر Stripe وTap، والمدفوعات لكل مالك.' },
    },
    shots: [
      { shot: 'pmBilling', title: { en: 'Billing and payments', ar: 'الفوترة والمدفوعات' }, text: { en: 'Revenue, invoices and refunds, with the trend.', ar: 'الإيرادات والفواتير والمبالغ المستردة مع اتجاهها.' } },
      { shot: 'pmIntegrations', title: { en: 'Stripe and Tap', ar: 'Stripe وTap' }, text: { en: 'Connect your payment gateway from the integrations page.', ar: 'اربط بوابة الدفع من صفحة التكاملات.' } },
    ],
    points: [
      { icon: TrendingUp, title: { en: 'Revenue and trend', ar: 'الإيرادات واتجاهها' }, text: { en: 'Total and monthly revenue, with the trend.', ar: 'الإيرادات الكلية والشهرية مع اتجاهها.' } },
      { icon: FileText, title: { en: 'Invoices', ar: 'الفواتير' }, text: { en: 'Every invoice in one place.', ar: 'كل الفواتير في مكان واحد.' } },
      { icon: RotateCcw, title: { en: 'Refunds', ar: 'المبالغ المستردة' }, text: { en: 'Refunds next to revenue and invoices.', ar: 'المبالغ المستردة بجانب الإيرادات والفواتير.' } },
      { icon: CreditCard, title: { en: 'Stripe and Tap', ar: 'Stripe وTap' }, text: { en: 'Take payments through Stripe and Tap.', ar: 'استلم المدفوعات عبر Stripe وTap.' } },
      { icon: HandCoins, title: { en: 'Owners and payouts', ar: 'الملاك والمدفوعات' }, text: { en: 'Statements and payouts for each owner.', ar: 'كشوف ومدفوعات لكل مالك.' } },
    ],
    faqs: [
      { q: { en: 'Which payment gateways does Accez support?', ar: 'ما بوابات الدفع التي يدعمها أكسيز؟' }, a: { en: 'Stripe and Tap.', ar: 'Stripe وTap.' } },
      { q: { en: 'Can I keep statements for property owners?', ar: 'هل يمكنني حفظ كشوف لملاك العقارات؟' }, a: { en: 'Yes. Owners and payouts keeps statements and payouts for each owner.', ar: 'نعم. يحفظ قسم الملاك والمدفوعات الكشوف والمدفوعات لكل مالك.' } },
      { q: { en: 'Where do I see refunds?', ar: 'أين أرى المبالغ المستردة؟' }, a: { en: 'On the billing page, next to revenue and invoices.', ar: 'في صفحة الفوترة، بجانب الإيرادات والفواتير.' } },
    ],
    modules: ['leases-and-rent', 'reservations-and-stays', 'sales-and-projects'],
    integrations: ['payments'],
    posts: [
      'handling-refunds-and-chargebacks-without-losing-money-or-trust',
      'cash-flow-forecasting-for-property-management-businesses',
      'trust-accounting-for-property-managers-keeping-owner-funds-separate',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'module',
    slug: 'leases-and-rent',
    name: { en: 'Leases and rent', ar: 'العقود والإيجارات' },
    summary: { en: 'Long-term contracts and rent payments, paid and due.', ar: 'عقود طويلة الأمد ودفعات إيجار، المدفوع منها والمستحق.' },
    metaTitle: { en: 'Lease and rent management software in Saudi Arabia', ar: 'برنامج إدارة عقود الإيجار والإيجارات في السعودية' },
    metaDescription: {
      en: 'Keep long-term leases with your tenants and see which rent is paid and which is due, with active residents for each property. Built for Saudi Arabia.',
      ar: 'احفظ عقود الإيجار طويلة الأمد مع مستأجريك، واعرف ما دُفع من الإيجار وما هو مستحق، مع عدد السكان النشطين في كل عقار. برنامج مصمم للسوق السعودي.',
    },
    hero: {
      title: { en: 'Lease and rent management', ar: 'إدارة عقود الإيجار والإيجارات' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'Long-term contracts with your tenants, and rent payments you can follow: paid and due.', ar: 'عقود طويلة الأمد مع مستأجريك، ودفعات إيجار تتابعها: المدفوع والمستحق.' },
    },
    shots: [
      { shot: 'pmProperty', title: { en: 'Every property at a glance', ar: 'كل عقار في لمحة' }, text: { en: 'Active residents, leases, units and work orders for each property.', ar: 'السكان النشطون والعقود والوحدات وأوامر العمل لكل عقار.' } },
      { shot: 'pmDashboard', title: { en: 'Your portfolio', ar: 'محفظتك' }, text: { en: 'Properties, tenants, revenue and occupancy in one dashboard.', ar: 'العقارات والمستأجرون والإيرادات والإشغال في لوحة واحدة.' } },
    ],
    points: [
      { icon: FileSignature, title: { en: 'Leases', ar: 'عقود الإيجار' }, text: { en: 'Long-term contracts with your tenants.', ar: 'عقود طويلة الأمد مع مستأجريك.' } },
      { icon: Wallet, title: { en: 'Rent payments', ar: 'دفعات الإيجار' }, text: { en: 'See what is paid and what is due.', ar: 'اعرف ما دُفع وما هو مستحق.' } },
      { icon: UsersRound, title: { en: 'Residents', ar: 'السكان' }, text: { en: 'Active residents for each property.', ar: 'السكان النشطون لكل عقار.' } },
      { icon: PieChart, title: { en: 'Occupancy', ar: 'الإشغال' }, text: { en: 'Occupied and vacant units on the dashboard.', ar: 'الوحدات المشغولة والشاغرة في لوحة التحكم.' } },
    ],
    faqs: [
      { q: { en: 'Does Accez handle long-term leases?', ar: 'هل يدير أكسيز عقود الإيجار طويلة الأمد؟' }, a: { en: 'Yes. Leases hold the long-term contracts with your tenants.', ar: 'نعم. تحفظ العقود الاتفاقات طويلة الأمد مع مستأجريك.' } },
      { q: { en: 'Can I see which rent is unpaid?', ar: 'هل أستطيع معرفة الإيجار غير المدفوع؟' }, a: { en: 'Yes. Rent payments show what is paid and what is due.', ar: 'نعم. تعرض دفعات الإيجار ما دُفع وما هو مستحق.' } },
      { q: { en: 'Can short stays and long leases run together?', ar: 'هل يمكن إدارة الإقامات القصيرة والعقود الطويلة معًا؟' }, a: { en: 'Yes. Reservations and leases are both part of the property management solution.', ar: 'نعم. الحجوزات والعقود كلاهما جزء من حل إدارة العقارات.' } },
    ],
    modules: ['maintenance-work-orders', 'billing-and-payments', 'team-and-messaging'],
    integrations: [],
    posts: [
      'rent-increases-and-lease-renewals',
      'late-rent-payments-are-a-systems-problem-not-a-tenant-problem',
      'security-deposits-done-right-avoiding-disputes-at-move-out',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'module',
    slug: 'maintenance-work-orders',
    name: { en: 'Work orders', ar: 'أوامر العمل' },
    summary: { en: 'Maintenance tracked from request to done.', ar: 'الصيانة متابَعة من الطلب حتى الإنجاز.' },
    metaTitle: { en: 'Maintenance work orders for Saudi property managers', ar: 'أوامر عمل الصيانة لمديري العقارات في السعودية' },
    metaDescription: {
      en: 'Track maintenance work orders from request to done, see pending work orders on each property, and give your staff the access they need. For Saudi managers.',
      ar: 'تابع أوامر عمل الصيانة من الطلب حتى الإنجاز، واعرض أوامر العمل المعلقة لكل عقار، وامنح موظفيك الصلاحيات التي يحتاجونها. حل لمديري العقارات في السعودية.',
    },
    hero: {
      title: { en: 'Maintenance work orders', ar: 'أوامر عمل الصيانة' },
      accent: { en: 'for Saudi property managers', ar: 'لمديري العقارات في السعودية' },
      subtitle: { en: 'Track maintenance from request to done, for every property.', ar: 'تابع الصيانة من الطلب حتى الإنجاز، لكل عقار.' },
    },
    shots: [
      { shot: 'pmProperty', title: { en: 'Work orders on every property', ar: 'أوامر العمل في كل عقار' }, text: { en: 'Total and pending work orders on each property overview.', ar: 'إجمالي أوامر العمل والمعلّق منها في نظرة كل عقار.' } },
    ],
    points: [
      { icon: Wrench, title: { en: 'Request to done', ar: 'من الطلب حتى الإنجاز' }, text: { en: 'Follow each maintenance job until it is done.', ar: 'تابع كل عمل صيانة حتى إنجازه.' } },
      { icon: ClipboardList, title: { en: 'Pending at a glance', ar: 'المعلّق في لمحة' }, text: { en: 'Pending work orders on each property overview.', ar: 'أوامر العمل المعلقة في نظرة كل عقار.' } },
      { icon: Building2, title: { en: 'Per property', ar: 'لكل عقار' }, text: { en: 'Work orders next to revenue, residents and units.', ar: 'أوامر العمل بجانب الإيرادات والسكان والوحدات.' } },
      { icon: UsersRound, title: { en: 'Staff and roles', ar: 'الموظفون والأدوار' }, text: { en: 'Give each person the access they need.', ar: 'امنح كل شخص الصلاحية التي يحتاجها.' } },
    ],
    faqs: [
      { q: { en: 'How are work orders tracked?', ar: 'كيف تُتابع أوامر العمل؟' }, a: { en: 'From request to done. Each property overview shows its total and pending work orders.', ar: 'من الطلب حتى الإنجاز. تعرض نظرة كل عقار إجمالي أوامر العمل والمعلّق منها.' } },
      { q: { en: 'Can I limit what each team member sees?', ar: 'هل يمكنني تحديد ما يراه كل عضو في الفريق؟' }, a: { en: 'Yes. Staff and roles let you give each person the access they need.', ar: 'نعم. تتيح لك الأدوار منح كل شخص الصلاحية التي يحتاجها.' } },
      ARABIC_AND_ENGLISH,
    ],
    modules: ['leases-and-rent', 'team-and-messaging', 'reservations-and-stays'],
    integrations: [],
    posts: [
      'from-request-to-resolution-building-a-maintenance-system-that-works',
      'how-to-create-manage-work-orders-accez-cloud',
      'preventive-maintenance-how-to-stop-small-issues-becoming-big',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'module',
    area: 'billing',
    slug: 'team-and-messaging',
    name: { en: 'Team and messaging', ar: 'الفريق والرسائل' },
    summary: { en: 'Email templates, SMS, one inbox, and staff roles.', ar: 'قوالب البريد والرسائل النصية وصندوق وارد واحد وأدوار الموظفين.' },
    metaTitle: { en: 'Team and guest messaging for property managers', ar: 'الفريق ومراسلة الضيوف لمديري العقارات' },
    metaDescription: {
      en: 'Email templates for guest confirmations, check-ins and cancellations, SMS through Twilio, one inbox for conversations, and staff roles for access.',
      ar: 'قوالب بريد لتأكيد حجوزات الضيوف وتسجيل الوصول والإلغاء، ورسائل نصية عبر Twilio، وصندوق وارد واحد للمحادثات، وأدوار للموظفين تحدد صلاحيات كل منهم.',
    },
    hero: {
      title: { en: 'Team and guest messaging', ar: 'الفريق ومراسلة الضيوف' },
      accent: { en: 'for property managers', ar: 'لمديري العقارات' },
      subtitle: { en: 'Email templates, SMS and one inbox for conversations, with staff roles for access.', ar: 'قوالب البريد والرسائل النصية وصندوق وارد واحد للمحادثات، مع أدوار للموظفين تحدد الصلاحيات.' },
    },
    shots: [
      { shot: 'pmEmails', title: { en: 'Email templates', ar: 'قوالب البريد' }, text: { en: 'Templates for confirmations, check-ins and cancellations.', ar: 'قوالب للتأكيدات وتسجيل الوصول والإلغاء.' } },
      { shot: 'pmIntegrations', title: { en: 'SMS through Twilio', ar: 'الرسائل النصية عبر Twilio' }, text: { en: 'Connect SMS from the integrations page.', ar: 'اربط الرسائل النصية من صفحة التكاملات.' } },
    ],
    points: [
      { icon: Mail, title: { en: 'Email templates', ar: 'قوالب البريد' }, text: { en: 'Confirmations, check-ins and cancellations.', ar: 'التأكيدات وتسجيل الوصول والإلغاء.' } },
      { icon: MessageSquareText, title: { en: 'SMS', ar: 'الرسائل النصية' }, text: { en: 'Text guests and tenants through Twilio.', ar: 'راسل الضيوف والمستأجرين عبر Twilio.' } },
      { icon: Inbox, title: { en: 'One inbox', ar: 'صندوق وارد واحد' }, text: { en: 'Every conversation in one place.', ar: 'كل المحادثات في مكان واحد.' } },
      { icon: UsersRound, title: { en: 'Staff and roles', ar: 'الموظفون والأدوار' }, text: { en: 'Give each person the access they need.', ar: 'امنح كل شخص الصلاحية التي يحتاجها.' } },
      { icon: Languages, title: { en: 'Arabic and English', ar: 'العربية والإنجليزية' }, text: { en: 'The portal works in both languages.', ar: 'تعمل البوابة باللغتين.' } },
    ],
    faqs: [
      { q: { en: 'Which messages have templates?', ar: 'ما الرسائل التي لها قوالب؟' }, a: { en: 'Reservation confirmations, check-ins and cancellations, among others.', ar: 'تأكيد الحجز وتسجيل الوصول والإلغاء، وغيرها.' } },
      { q: { en: 'Can I send SMS?', ar: 'هل يمكنني إرسال رسائل نصية؟' }, a: { en: 'Yes. SMS messaging works through Twilio.', ar: 'نعم. تعمل الرسائل النصية عبر Twilio.' } },
      { q: { en: 'Can I control what each team member sees?', ar: 'هل يمكنني التحكم فيما يراه كل عضو في الفريق؟' }, a: { en: 'Yes. Staff and roles give each person the access they need.', ar: 'نعم. تمنح الأدوار كل شخص الصلاحية التي يحتاجها.' } },
    ],
    modules: ['reservations-and-stays', 'maintenance-work-orders', 'channel-manager'],
    integrations: [],
    posts: [
      'role-based-access-giving-your-team-the-right-permissions',
      'one-inbox-to-rule-them-all-centralizing-property-communications',
      'the-guest-messaging-templates-every-vacation-rental-manager',
    ],
  },
]
