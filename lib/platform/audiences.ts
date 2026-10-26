/**
 * Each solution seen by one kind of customer, one page each at
 * /solutions/<solution>/<slug>/. Only kinds of customer the real features
 * serve, and only what those features do (see detailPages.ts). The two
 * solutions stay separate: a provider page never mentions property
 * managers, and the reverse.
 */
import {
  RefreshCw, Tags, CalendarCheck, Sparkles, HandCoins, Languages,
  Mail, CreditCard, UsersRound,
  FileSignature, Wallet, Wrench, MessageSquareText,
  Building2, Route, Map, FolderKanban,
  Store, CalendarClock, Scissors, Contact, BadgePercent,
  Clock, Gift, Star, ListOrdered, Award,
} from 'lucide-react'
import type { SolutionSubpage } from './subpageTypes'

const PORTAL_LANGUAGES = {
  q: { en: 'Does it work in Arabic?', ar: 'هل يعمل باللغة العربية؟' },
  a: {
    en: 'Yes. The portal works in Arabic and English, in the browser on a desktop or a phone.',
    ar: 'نعم. تعمل البوابة بالعربية والإنجليزية، في المتصفح على الحاسوب أو الهاتف.',
  },
}

const MARKETPLACE = {
  q: { en: 'How do new customers find me?', ar: 'كيف يجدني العملاء الجدد؟' },
  a: { en: 'Through your listing on the Accez marketplace, where customers find and book providers.', ar: 'من خلال صفحتك في سوق أكسيز، حيث يجد العملاء مقدمي الخدمات ويحجزون لديهم.' },
}

const DEPOSIT = {
  q: { en: 'Can I ask for a deposit?', ar: 'هل يمكنني طلب عربون؟' },
  a: { en: 'Yes. In your policies you can ask for an upfront deposit.', ar: 'نعم. يمكنك طلب عربون مسبق من خلال السياسات.' },
}

export const AUDIENCE_PAGES: SolutionSubpage[] = [
  // ── Property management ────────────────────────────────────────────────
  {
    solution: 'property-managers',
    kind: 'audience',
    slug: 'vacation-rentals',
    name: { en: 'Vacation rentals', ar: 'الإيجارات قصيرة الأجل' },
    summary: { en: 'For holiday home and short stay managers.', ar: 'لمديري بيوت العطلات والإقامات القصيرة.' },
    metaTitle: { en: 'Vacation rental software for Saudi holiday homes', ar: 'برنامج الإيجارات قصيرة الأجل لبيوت العطلات' },
    metaDescription: {
      en: 'Vacation rental software for holiday home managers in Saudi Arabia: sync Airbnb, Booking.com and Expedia, run every stay, sell add-ons and pay each owner.',
      ar: 'برنامج الإيجارات قصيرة الأجل لمديري بيوت العطلات في السعودية: زامن Airbnb وBooking.com وExpedia، وأدر كل إقامة، وبِع الإضافات، وادفع لكل مالك.',
    },
    hero: {
      title: { en: 'Vacation rental software', ar: 'برنامج الإيجارات قصيرة الأجل' },
      accent: { en: 'for holiday home managers', ar: 'لمديري بيوت العطلات' },
      subtitle: { en: 'Sync Airbnb, Booking.com and Expedia, run every stay and pay each owner, in one system.', ar: 'زامن Airbnb وBooking.com وExpedia، وأدر كل إقامة، وادفع لكل مالك، في نظام واحد.' },
    },
    shots: [
      { shot: 'pmCalendar', title: { en: 'One calendar for every channel', ar: 'تقويم واحد لكل القنوات' }, text: { en: 'Sync channels, update prices in bulk, import and export.', ar: 'زامن القنوات وحدّث الأسعار دفعة واحدة واستورد وصدّر.' } },
      { shot: 'pmReservation', title: { en: 'Every stay', ar: 'كل إقامة' }, text: { en: 'Timeline, payment and the policies the guest accepted.', ar: 'الجدول الزمني والدفع والسياسات التي قبلها الضيف.' } },
      { shot: 'pmAddons', title: { en: 'Add-ons', ar: 'الإضافات' }, text: { en: 'Sell meals, cleaning and transport with each stay.', ar: 'بِع الوجبات والتنظيف والنقل مع كل إقامة.' } },
    ],
    points: [
      { icon: RefreshCw, title: { en: 'Three channels, one calendar', ar: 'ثلاث قنوات وتقويم واحد' }, text: { en: 'Airbnb, Booking.com and Expedia, synced.', ar: 'Airbnb وBooking.com وExpedia، متزامنة.' } },
      { icon: Tags, title: { en: 'Bulk prices', ar: 'الأسعار دفعة واحدة' }, text: { en: 'Change prices for many dates at once.', ar: 'غيّر أسعار تواريخ كثيرة مرة واحدة.' } },
      { icon: CalendarCheck, title: { en: 'Every reservation', ar: 'كل حجز' }, text: { en: 'Timeline, payment and accepted policies.', ar: 'الجدول الزمني والدفع والسياسات المقبولة.' } },
      { icon: Sparkles, title: { en: 'Add-ons', ar: 'الإضافات' }, text: { en: 'Meals, cleaning and transport with stays.', ar: 'الوجبات والتنظيف والنقل مع الإقامات.' } },
      { icon: HandCoins, title: { en: 'Owners and payouts', ar: 'الملاك والمدفوعات' }, text: { en: 'Statements and payouts for each owner.', ar: 'كشوف ومدفوعات لكل مالك.' } },
      { icon: Languages, title: { en: 'Arabic and English', ar: 'العربية والإنجليزية' }, text: { en: 'The portal works in both languages.', ar: 'تعمل البوابة باللغتين.' } },
    ],
    faqs: [
      { q: { en: 'Which booking channels can I connect?', ar: 'ما قنوات الحجز التي يمكنني ربطها؟' }, a: { en: 'Airbnb, Booking.com and Expedia.', ar: 'Airbnb وBooking.com وExpedia.' } },
      { q: { en: 'I manage homes for several owners. Does that work?', ar: 'أدير بيوتًا لعدة ملاك، فهل يناسبني؟' }, a: { en: 'Yes. Owners and payouts keeps statements and payouts for each owner.', ar: 'نعم. يحفظ قسم الملاك والمدفوعات الكشوف والمدفوعات لكل مالك.' } },
      PORTAL_LANGUAGES,
    ],
    modules: ['channel-manager', 'reservations-and-stays', 'billing-and-payments', 'team-and-messaging'],
    integrations: [],
    posts: [
      'why-managing-airbnb-and-booking-com-separately-is-costing-you',
      'length-of-stay-strategy-when-longer-bookings-beat-higher-nightly-rates',
      'the-4-hour-turnover-systems-for-same-day-check-out-to-check-in',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'audience',
    slug: 'hotels-and-serviced-apartments',
    name: { en: 'Hotels and serviced apartments', ar: 'الفنادق والشقق المخدومة' },
    summary: { en: 'Reservations, add-ons and guest emails for every room.', ar: 'الحجوزات والإضافات ورسائل الضيوف لكل غرفة.' },
    metaTitle: { en: 'Software for hotels and serviced apartments in Saudi', ar: 'برنامج الفنادق والشقق المخدومة في السعودية' },
    metaDescription: {
      en: 'Software for hotels and serviced apartments in Saudi Arabia: reservations with payment and policies, add-ons, guest email templates and channel sync.',
      ar: 'برنامج للفنادق والشقق المخدومة في السعودية: حجوزات مع الدفع والسياسات، وإضافات تُباع مع الإقامة، وقوالب بريد للضيوف، ومزامنة مع قنوات الحجز.',
    },
    hero: {
      title: { en: 'Software for hotels and serviced apartments', ar: 'برنامج الفنادق والشقق المخدومة' },
      subtitle: { en: 'Reservations, add-ons, guest emails and channel sync for every unit.', ar: 'الحجوزات والإضافات ورسائل الضيوف ومزامنة القنوات لكل وحدة.' },
    },
    shots: [
      { shot: 'pmReservation', title: { en: 'Every reservation', ar: 'كل حجز' }, text: { en: 'Timeline, payment summary and accepted policies.', ar: 'الجدول الزمني وملخص الدفع والسياسات المقبولة.' } },
      { shot: 'pmAddons', title: { en: 'Add-ons', ar: 'الإضافات' }, text: { en: 'Food and beverages, cleaning and transport.', ar: 'الطعام والمشروبات والتنظيف والنقل.' } },
      { shot: 'pmEmails', title: { en: 'Guest emails', ar: 'رسائل الضيوف' }, text: { en: 'Templates for confirmations, check-ins and cancellations.', ar: 'قوالب للتأكيدات وتسجيل الوصول والإلغاء.' } },
      { shot: 'pmCalendar', title: { en: 'Availability calendar', ar: 'تقويم التوفر' }, text: { en: 'Synced with Airbnb, Booking.com and Expedia.', ar: 'متزامن مع Airbnb وBooking.com وExpedia.' } },
    ],
    points: [
      { icon: CalendarCheck, title: { en: 'Reservations', ar: 'الحجوزات' }, text: { en: 'Each stay with its timeline and payment.', ar: 'كل إقامة مع جدولها الزمني ودفعها.' } },
      { icon: Sparkles, title: { en: 'Add-ons', ar: 'الإضافات' }, text: { en: 'Meals, cleaning and transport.', ar: 'الوجبات والتنظيف والنقل.' } },
      { icon: Mail, title: { en: 'Guest emails', ar: 'رسائل الضيوف' }, text: { en: 'Confirmations, check-ins and cancellations.', ar: 'التأكيدات وتسجيل الوصول والإلغاء.' } },
      { icon: RefreshCw, title: { en: 'Channel sync', ar: 'مزامنة القنوات' }, text: { en: 'Airbnb, Booking.com and Expedia.', ar: 'Airbnb وBooking.com وExpedia.' } },
      { icon: CreditCard, title: { en: 'Payments', ar: 'المدفوعات' }, text: { en: 'Stripe and Tap, with invoices and refunds.', ar: 'Stripe وTap، مع الفواتير والمبالغ المستردة.' } },
      { icon: UsersRound, title: { en: 'Staff and roles', ar: 'الموظفون والأدوار' }, text: { en: 'Give each person the access they need.', ar: 'امنح كل شخص الصلاحية التي يحتاجها.' } },
    ],
    faqs: [
      { q: { en: 'Can guests get emails for their booking?', ar: 'هل يتلقى الضيوف رسائل بريد لحجوزاتهم؟' }, a: { en: 'Yes. Email templates cover confirmations, check-ins and cancellations.', ar: 'نعم. تغطي قوالب البريد التأكيدات وتسجيل الوصول والإلغاء.' } },
      { q: { en: 'Can I sell extras such as meals?', ar: 'هل يمكنني بيع إضافات مثل الوجبات؟' }, a: { en: 'Yes. Add-ons such as meals, cleaning and transport are sold with stays.', ar: 'نعم. تُباع الإضافات مثل الوجبات والتنظيف والنقل مع الإقامات.' } },
      { q: { en: 'Which payment gateways can I use?', ar: 'ما بوابات الدفع التي يمكنني استخدامها؟' }, a: { en: 'Stripe and Tap.', ar: 'Stripe وTap.' } },
    ],
    modules: ['reservations-and-stays', 'channel-manager', 'team-and-messaging', 'billing-and-payments'],
    integrations: [],
    posts: [
      'corporate-housing-landing-long-stay-business-clients',
      'first-impressions-how-the-booking-to-arrival-experience-makes-or-breaks-reviews',
      'the-upsell-playbook-turning-early-check-ins-and-add-ons',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'audience',
    slug: 'residential-and-compounds',
    name: { en: 'Residential and compounds', ar: 'المباني السكنية والمجمعات' },
    summary: { en: 'Leases, rent, work orders and resident messages.', ar: 'العقود والإيجارات وأوامر العمل ورسائل السكان.' },
    metaTitle: { en: 'Residential and compound management software', ar: 'برنامج إدارة المباني السكنية والمجمعات' },
    metaDescription: {
      en: 'Residential and compound management software for Saudi Arabia: long-term leases, rent paid and due, maintenance work orders, SMS and one shared inbox.',
      ar: 'برنامج إدارة المباني السكنية والمجمعات في السعودية: عقود إيجار طويلة الأمد، والإيجار المدفوع والمستحق، وأوامر عمل الصيانة، ورسائل نصية وصندوق وارد واحد.',
    },
    hero: {
      title: { en: 'Residential and compound management software', ar: 'برنامج إدارة المباني السكنية والمجمعات' },
      subtitle: { en: 'Leases, rent payments, work orders and resident messages for every building.', ar: 'العقود ودفعات الإيجار وأوامر العمل ورسائل السكان لكل مبنى.' },
    },
    shots: [
      { shot: 'pmProperty', title: { en: 'Every property at a glance', ar: 'كل عقار في لمحة' }, text: { en: 'Active residents, leases, units and work orders.', ar: 'السكان النشطون والعقود والوحدات وأوامر العمل.' } },
      { shot: 'pmDashboard', title: { en: 'Your portfolio', ar: 'محفظتك' }, text: { en: 'Properties, tenants, revenue and occupancy.', ar: 'العقارات والمستأجرون والإيرادات والإشغال.' } },
    ],
    points: [
      { icon: FileSignature, title: { en: 'Leases', ar: 'عقود الإيجار' }, text: { en: 'Long-term contracts with every tenant.', ar: 'عقود طويلة الأمد مع كل مستأجر.' } },
      { icon: Wallet, title: { en: 'Rent payments', ar: 'دفعات الإيجار' }, text: { en: 'See what is paid and what is due.', ar: 'اعرف ما دُفع وما هو مستحق.' } },
      { icon: Wrench, title: { en: 'Work orders', ar: 'أوامر العمل' }, text: { en: 'Maintenance from request to done.', ar: 'الصيانة من الطلب حتى الإنجاز.' } },
      { icon: MessageSquareText, title: { en: 'SMS and one inbox', ar: 'رسائل نصية وصندوق واحد' }, text: { en: 'Text residents and keep every conversation together.', ar: 'راسل السكان واجمع كل المحادثات في مكان واحد.' } },
      { icon: HandCoins, title: { en: 'Owners and payouts', ar: 'الملاك والمدفوعات' }, text: { en: 'Statements and payouts for each owner.', ar: 'كشوف ومدفوعات لكل مالك.' } },
      { icon: UsersRound, title: { en: 'Staff and roles', ar: 'الموظفون والأدوار' }, text: { en: 'Give each person the access they need.', ar: 'امنح كل شخص الصلاحية التي يحتاجها.' } },
    ],
    faqs: [
      { q: { en: 'Does it handle long-term leases?', ar: 'هل يدير عقود الإيجار طويلة الأمد؟' }, a: { en: 'Yes. Leases hold the contracts, and rent payments show what is paid and due.', ar: 'نعم. تحفظ العقود الاتفاقات، وتعرض دفعات الإيجار المدفوع والمستحق.' } },
      { q: { en: 'How is maintenance followed?', ar: 'كيف تُتابع الصيانة؟' }, a: { en: 'With work orders, tracked from request to done for each property.', ar: 'بأوامر العمل، تُتابع من الطلب حتى الإنجاز لكل عقار.' } },
      PORTAL_LANGUAGES,
    ],
    modules: ['leases-and-rent', 'maintenance-work-orders', 'team-and-messaging', 'billing-and-payments'],
    integrations: [],
    posts: [
      'how-to-communicate-with-100-tenants-without-hiring-more-staff',
      'the-maintenance-request-black-hole-why-tenants-feel-ignored',
      'rent-increases-and-lease-renewals',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'audience',
    slug: 'developers-and-sales-teams',
    name: { en: 'Developers and sales teams', ar: 'المطورون وفرق المبيعات' },
    summary: { en: 'Projects, sale units and the sales path.', ar: 'المشاريع ووحدات البيع ومسار المبيعات.' },
    metaTitle: { en: 'Software for real estate developers and sales teams', ar: 'برنامج للمطورين العقاريين وفرق المبيعات' },
    metaDescription: {
      en: 'Software for real estate developers and sales teams in Saudi Arabia: projects, sale units with status and price, a sales path to contract and a units map.',
      ar: 'برنامج للمطورين العقاريين وفرق المبيعات في السعودية: مشاريع ووحدات بيع بحالتها وسعرها، ومسار مبيعات حتى توقيع العقد، وخريطة للوحدات، وكل السجلات في جدول.',
    },
    hero: {
      title: { en: 'Software for real estate developers', ar: 'برنامج للمطورين العقاريين' },
      accent: { en: 'and sales teams', ar: 'وفرق المبيعات' },
      subtitle: { en: 'Projects, sale units, the sales path and a units map, next to the rest of your portfolio.', ar: 'المشاريع ووحدات البيع ومسار المبيعات وخريطة الوحدات، بجانب بقية محفظتك.' },
    },
    shots: [
      { shot: 'pmSalesPath', title: { en: 'Sales path', ar: 'مسار المبيعات' }, text: { en: 'Each sale moves from new to contract signed.', ar: 'تنتقل كل صفقة من جديدة إلى عقد موقّع.' } },
      { shot: 'pmSaleUnits', title: { en: 'Sale units', ar: 'وحدات البيع' }, text: { en: 'Status, price and buyer for every unit.', ar: 'الحالة والسعر والمشتري لكل وحدة.' } },
      { shot: 'pmUnitsMap', title: { en: 'Units map', ar: 'خريطة الوحدات' }, text: { en: 'Every unit on the map.', ar: 'كل وحدة على الخريطة.' } },
      { shot: 'pmSalesRecords', title: { en: 'All records', ar: 'كل السجلات' }, text: { en: 'Every sale in one sheet, filtered your way.', ar: 'كل المبيعات في جدول واحد بالتصفية التي تريدها.' } },
    ],
    points: [
      { icon: FolderKanban, title: { en: 'Projects', ar: 'المشاريع' }, text: { en: 'Group sale units by development.', ar: 'جمّع وحدات البيع حسب المشروع.' } },
      { icon: Building2, title: { en: 'Sale units', ar: 'وحدات البيع' }, text: { en: 'Status, price and buyer.', ar: 'الحالة والسعر والمشتري.' } },
      { icon: Route, title: { en: 'Sales path', ar: 'مسار المبيعات' }, text: { en: 'From new to contract signed.', ar: 'من صفقة جديدة إلى عقد موقّع.' } },
      { icon: Map, title: { en: 'Units map', ar: 'خريطة الوحدات' }, text: { en: 'See where every unit is.', ar: 'اعرف مكان كل وحدة.' } },
      { icon: UsersRound, title: { en: 'Staff and roles', ar: 'الموظفون والأدوار' }, text: { en: 'Give each person the access they need.', ar: 'امنح كل شخص الصلاحية التي يحتاجها.' } },
    ],
    faqs: [
      { q: { en: 'Can I follow each sale to the contract?', ar: 'هل يمكنني متابعة كل صفقة حتى العقد؟' }, a: { en: 'Yes. The sales path moves each sale from new to contract signed.', ar: 'نعم. ينقل مسار المبيعات كل صفقة من جديدة إلى عقد موقّع.' } },
      { q: { en: 'We also rent units out. Is that covered?', ar: 'نؤجر وحدات أيضًا، فهل هذا مشمول؟' }, a: { en: 'Yes. Sales sit in the same property management solution as rentals, leases and reservations.', ar: 'نعم. المبيعات جزء من حل إدارة العقارات نفسه مع الإيجارات والعقود والحجوزات.' } },
    ],
    modules: ['sales-and-projects', 'billing-and-payments', 'leases-and-rent', 'team-and-messaging'],
    integrations: [],
    posts: [
      'why-vision-2030-is-creating-a-new-kind-of-property-manager',
      'migrating-from-spreadsheets-and-legacy-software-without-losing-data',
      'the-5-metrics-every-property-manager-should-check-daily',
    ],
  },

  // ── Service providers ──────────────────────────────────────────────────
  {
    solution: 'service-providers',
    kind: 'audience',
    slug: 'barbers-and-salons',
    name: { en: 'Barbers and salons', ar: 'الحلاقون والصالونات' },
    summary: { en: 'Bookings, your team\'s calendar and every client.', ar: 'الحجوزات وتقويم فريقك وكل عميل.' },
    metaTitle: { en: 'Booking software for barbers and salons in Saudi', ar: 'برنامج حجز مواعيد للحلاقين والصالونات' },
    metaDescription: {
      en: 'Booking software for barbers and salons in Saudi Arabia: take bookings, give each barber their own services, know every client and get found on Accez.',
      ar: 'برنامج حجز مواعيد للحلاقين والصالونات في السعودية: استقبل الحجوزات، وحدد خدمات كل حلاق، واعرف كل عميل، ودع العملاء الجدد يجدونك في سوق أكسيز.',
    },
    hero: {
      title: { en: 'Booking software', ar: 'برنامج حجز مواعيد' },
      accent: { en: 'for barbers and salons', ar: 'للحلاقين والصالونات' },
      subtitle: { en: 'Take bookings, run your team\'s calendar, know every client, and get found on the Accez marketplace.', ar: 'استقبل الحجوزات، وأدر تقويم فريقك، واعرف كل عميل، ودع العملاء يجدونك في سوق أكسيز.' },
    },
    shots: [
      { shot: 'spCalendar', title: { en: 'The team calendar', ar: 'تقويم الفريق' }, text: { en: 'Every appointment of the week, for the whole team.', ar: 'كل مواعيد الأسبوع للفريق كاملًا.' } },
      { shot: 'spBookings', title: { en: 'Bookings', ar: 'الحجوزات' }, text: { en: 'Accept, start and complete, or mark a no-show.', ar: 'اقبل وابدأ وأكمل، أو سجّل عدم الحضور.' } },
      { shot: 'spTeam', title: { en: 'Your team', ar: 'فريقك' }, text: { en: 'Each barber with their own services.', ar: 'لكل حلاق خدماته الخاصة.' } },
      { shot: 'spCustomers', title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit for each client.', ar: 'الزيارات والإنفاق وآخر زيارة لكل عميل.' } },
    ],
    points: [
      { icon: Store, title: { en: 'Marketplace listing', ar: 'صفحة في السوق' }, text: { en: 'Customers find and book you on Accez.', ar: 'يجدك العملاء ويحجزون لديك في أكسيز.' } },
      { icon: CalendarClock, title: { en: 'Bookings', ar: 'الحجوزات' }, text: { en: 'Accept, start, complete or mark a no-show.', ar: 'اقبل وابدأ وأكمل أو سجّل عدم الحضور.' } },
      { icon: Scissors, title: { en: 'Team and services', ar: 'الفريق والخدمات' }, text: { en: 'Choose the services each barber gives.', ar: 'اختر الخدمات التي يقدمها كل حلاق.' } },
      { icon: Contact, title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit.', ar: 'الزيارات والإنفاق وآخر زيارة.' } },
      { icon: BadgePercent, title: { en: 'Promo codes and loyalty', ar: 'أكواد الخصم والولاء' }, text: { en: 'Discounts and points that bring clients back.', ar: 'خصومات ونقاط تعيد العملاء إليك.' } },
    ],
    faqs: [
      { q: { en: 'Can each barber have their own services?', ar: 'هل يمكن أن يكون لكل حلاق خدماته؟' }, a: { en: 'Yes. Add staff and choose the services each one gives.', ar: 'نعم. أضف الموظفين واختر الخدمات التي يقدمها كل منهم.' } },
      MARKETPLACE,
      DEPOSIT,
    ],
    modules: [],
    integrations: [],
    posts: [],
  },
  {
    solution: 'service-providers',
    kind: 'audience',
    slug: 'spas-and-wellness',
    name: { en: 'Spas and wellness', ar: 'السبا والعافية' },
    summary: { en: 'Services, hours, deposits and gift cards.', ar: 'الخدمات والساعات والعربون وبطاقات الهدايا.' },
    metaTitle: { en: 'Spa and wellness booking software in Saudi Arabia', ar: 'برنامج حجز مواعيد السبا والعافية في السعودية' },
    metaDescription: {
      en: 'Spa and wellness booking software in Saudi Arabia: services with their own duration and price, hours with several shifts, deposits, gift cards and reviews.',
      ar: 'برنامج حجز مواعيد السبا والعافية في السعودية: خدمات بمدتها وسعرها، وساعات عمل بعدة فترات في اليوم، وعربون مسبق، وبطاقات هدايا، وتقييمات من العملاء.',
    },
    hero: {
      title: { en: 'Spa and wellness booking software', ar: 'برنامج حجز مواعيد السبا والعافية' },
      subtitle: { en: 'Services with their own duration and price, your hours, deposits and gift cards, in one place.', ar: 'خدمات بمدتها وسعرها، وساعات عملك، والعربون، وبطاقات الهدايا، في مكان واحد.' },
    },
    shots: [
      { shot: 'spBookings', title: { en: 'Bookings', ar: 'الحجوزات' }, text: { en: 'Accept, start and complete each booking.', ar: 'اقبل كل حجز وابدأه وأكمله.' } },
      { shot: 'spHours', title: { en: 'Business hours', ar: 'ساعات العمل' }, text: { en: 'Your week, with more than one shift a day.', ar: 'أسبوعك، مع أكثر من فترة في اليوم.' } },
      { shot: 'spPolicies', title: { en: 'Policies', ar: 'السياسات' }, text: { en: 'Your timezone and an upfront deposit.', ar: 'منطقتك الزمنية والعربون المسبق.' } },
      { shot: 'spCustomers', title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit for each client.', ar: 'الزيارات والإنفاق وآخر زيارة لكل عميل.' } },
    ],
    points: [
      { icon: Sparkles, title: { en: 'Services', ar: 'الخدمات' }, text: { en: 'Each with its own duration and price.', ar: 'لكل خدمة مدتها وسعرها.' } },
      { icon: Clock, title: { en: 'Business hours', ar: 'ساعات العمل' }, text: { en: 'Several shifts a day.', ar: 'عدة فترات في اليوم.' } },
      { icon: CreditCard, title: { en: 'Upfront deposit', ar: 'العربون المسبق' }, text: { en: 'Ask for a deposit when clients book.', ar: 'اطلب عربونًا عند الحجز.' } },
      { icon: Gift, title: { en: 'Gift cards and deals', ar: 'بطاقات الهدايا والعروض' }, text: { en: 'Sell credit and bundle services.', ar: 'بِع رصيدًا واجمع الخدمات في عرض.' } },
      { icon: Star, title: { en: 'Reviews', ar: 'التقييمات' }, text: { en: 'Ratings from completed bookings.', ar: 'تقييمات من الحجوزات المكتملة.' } },
      { icon: ListOrdered, title: { en: 'Waitlist', ar: 'قائمة الانتظار' }, text: { en: 'Fill the gap when a slot opens.', ar: 'املأ الفراغ عند توفر موعد.' } },
    ],
    faqs: [
      { q: { en: 'Can treatments have different lengths?', ar: 'هل يمكن أن تختلف مدة الجلسات؟' }, a: { en: 'Yes. Each service has its own duration and price.', ar: 'نعم. لكل خدمة مدتها وسعرها.' } },
      DEPOSIT,
      MARKETPLACE,
    ],
    modules: [],
    integrations: [],
    posts: [],
  },
  {
    solution: 'service-providers',
    kind: 'audience',
    slug: 'coaches-and-fitness',
    name: { en: 'Coaches and fitness', ar: 'المدربون واللياقة' },
    summary: { en: 'Sessions, hours and clients, with a listing.', ar: 'الجلسات والساعات والعملاء، مع صفحة في السوق.' },
    metaTitle: { en: 'Booking software for coaches and fitness trainers', ar: 'برنامج حجز مواعيد للمدربين ومدربي اللياقة' },
    metaDescription: {
      en: 'Booking software for coaches and fitness trainers in Saudi Arabia: sessions with their own price, your hours, client history, loyalty points and SMS.',
      ar: 'برنامج حجز مواعيد للمدربين ومدربي اللياقة في السعودية: جلسات بسعرها ومدتها، وساعات عملك، وسجل كل عميل، ونقاط ولاء، ورسائل نصية، وصفحة في سوق أكسيز.',
    },
    hero: {
      title: { en: 'Booking software', ar: 'برنامج حجز مواعيد' },
      accent: { en: 'for coaches and fitness trainers', ar: 'للمدربين ومدربي اللياقة' },
      subtitle: { en: 'Your sessions, hours and clients in one place, with a marketplace listing to be found.', ar: 'جلساتك وساعاتك وعملاؤك في مكان واحد، مع صفحة في السوق ليجدك العملاء.' },
    },
    shots: [
      { shot: 'spHours', title: { en: 'Your hours', ar: 'ساعاتك' }, text: { en: 'Set your week, with more than one shift a day.', ar: 'حدّد أسبوعك، مع أكثر من فترة في اليوم.' } },
      { shot: 'spCalendar', title: { en: 'Calendar', ar: 'التقويم' }, text: { en: 'Every session of the week in one view.', ar: 'كل جلسات الأسبوع في عرض واحد.' } },
      { shot: 'spCustomers', title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit for each client.', ar: 'الزيارات والإنفاق وآخر زيارة لكل عميل.' } },
      { shot: 'spIntegrations', title: { en: 'Integrations', ar: 'التكاملات' }, text: { en: 'Tap, Stripe, analytics and SMS.', ar: 'Tap وStripe والتحليلات والرسائل النصية.' } },
    ],
    points: [
      { icon: CalendarClock, title: { en: 'Sessions as services', ar: 'الجلسات كخدمات' }, text: { en: 'Each with its own duration and price.', ar: 'لكل جلسة مدتها وسعرها.' } },
      { icon: Clock, title: { en: 'Your hours', ar: 'ساعاتك' }, text: { en: 'Several shifts a day.', ar: 'عدة فترات في اليوم.' } },
      { icon: Contact, title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit.', ar: 'الزيارات والإنفاق وآخر زيارة.' } },
      { icon: Award, title: { en: 'Loyalty points', ar: 'نقاط الولاء' }, text: { en: 'Clients earn points on every booking.', ar: 'يكسب العملاء نقاطًا على كل حجز.' } },
      { icon: MessageSquareText, title: { en: 'SMS', ar: 'الرسائل النصية' }, text: { en: 'Text your clients.', ar: 'راسل عملاءك برسائل نصية.' } },
      { icon: Store, title: { en: 'Marketplace listing', ar: 'صفحة في السوق' }, text: { en: 'New clients find and book you.', ar: 'يجدك العملاء الجدد ويحجزون لديك.' } },
    ],
    faqs: [
      { q: { en: 'Can I work in more than one block a day?', ar: 'هل يمكنني العمل في أكثر من فترة يوميًا؟' }, a: { en: 'Yes. Business hours allow several shifts a day.', ar: 'نعم. تسمح ساعات العمل بعدة فترات في اليوم.' } },
      { q: { en: 'How do clients pay?', ar: 'كيف يدفع العملاء؟' }, a: { en: 'Through Tap or Stripe, connected from your integrations.', ar: 'عبر Tap أو Stripe، تربطهما من صفحة التكاملات.' } },
      MARKETPLACE,
    ],
    modules: [],
    integrations: [],
    posts: [],
  },
]
