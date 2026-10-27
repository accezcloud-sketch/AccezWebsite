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
  a: { en: 'Your listing on the Accez marketplace lets customers find and book you.', ar: 'تتيح صفحتك في سوق أكسيز للعملاء أن يجدوك ويحجزوا لديك.' },
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
    summary: { en: 'For holiday home, chalet and short stay managers.', ar: 'لمديري بيوت العطلات والشاليهات والإقامات القصيرة.' },
    metaTitle: { en: 'Vacation rental software for Saudi holiday homes', ar: 'برنامج الإيجارات قصيرة الأجل لبيوت العطلات' },
    metaDescription: {
      en: 'Vacation rental software for holiday homes in Saudi Arabia: sync Airbnb, Booking.com and Expedia, manage stays, sell add-ons and track owner payouts.',
      ar: 'برنامج الإيجارات قصيرة الأجل لمديري بيوت العطلات في السعودية: زامن Airbnb وBooking.com وExpedia، وأدر الإقامات، وبِع الإضافات، وتابع مدفوعات الملاك.',
    },
    hero: {
      title: { en: 'Vacation rental software', ar: 'برنامج الإيجارات قصيرة الأجل' },
      accent: { en: 'for holiday home managers', ar: 'لمديري بيوت العطلات' },
      subtitle: { en: 'Sync Airbnb, Booking.com and Expedia, manage stays and keep payouts for each owner, in one system.', ar: 'زامن Airbnb وBooking.com وExpedia، وأدر الإقامات، واحفظ المدفوعات لكل مالك، في نظام واحد.' },
    },
    shots: [
      { shot: 'pmCalendar', title: { en: 'One calendar for every channel', ar: 'تقويم واحد لكل القنوات' }, text: { en: 'Sync channels, update prices in bulk, import and export.', ar: 'زامن القنوات وحدّث الأسعار دفعة واحدة واستورد وصدّر.' } },
      { shot: 'pmReservation', title: { en: 'Every stay', ar: 'كل إقامة' }, text: { en: 'Timeline, payment and the policies the guest accepted.', ar: 'الجدول الزمني والدفع والسياسات التي قبلها الضيف.' } },
      { shot: 'pmAddons', title: { en: 'Add-ons', ar: 'الإضافات' }, text: { en: 'Sell meals, cleaning and transport with stays.', ar: 'بِع الوجبات والتنظيف والنقل مع الإقامات.' } },
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
    integrations: ['channels'],
    posts: [
      'the-double-booking-nightmare-how-to-sync-every-channel',
      'length-of-stay-strategy-when-longer-bookings-beat-higher-nightly-rates',
      'the-4-hour-turnover-systems-for-same-day-check-out-to-check-in',
    ],
  },
  {
    solution: 'property-managers',
    kind: 'audience',
    slug: 'hotels-and-serviced-apartments',
    name: { en: 'Serviced apartments', ar: 'الشقق المخدومة' },
    summary: { en: 'For serviced apartments and small hospitality properties, run unit by unit.', ar: 'للشقق المخدومة ومنشآت الضيافة الصغيرة التي تُدار وحدةً وحدة.' },
    metaTitle: { en: 'Serviced apartment software in Saudi Arabia', ar: 'برنامج إدارة الشقق المخدومة في السعودية' },
    metaDescription: {
      en: 'Serviced apartment software for Saudi Arabia, run unit by unit: reservations with payment and policies, add-ons, guest email templates and channel sync.',
      ar: 'برنامج إدارة الشقق المخدومة في السعودية، وحدةً وحدة: حجوزات مع الدفع والسياسات، وإضافات تُباع مع الإقامة، وقوالب بريد للضيوف، ومزامنة قنوات الحجز.',
    },
    hero: {
      title: { en: 'Serviced apartment software', ar: 'برنامج إدارة الشقق المخدومة' },
      accent: { en: 'for small hospitality properties', ar: 'لمنشآت الضيافة الصغيرة' },
      subtitle: { en: 'Each unit with its reservations, add-ons, guest email templates and channel sync, in one system.', ar: 'لكل وحدة حجوزاتها وإضافاتها، مع قوالب بريد الضيوف ومزامنة القنوات، في نظام واحد.' },
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
      { q: { en: 'Are there email templates for guests?', ar: 'هل توجد قوالب بريد للضيوف؟' }, a: { en: 'Yes. Email templates cover confirmations, check-ins and cancellations.', ar: 'نعم. تغطي قوالب البريد التأكيدات وتسجيل الوصول والإلغاء.' } },
      { q: { en: 'Can I sell extras such as meals?', ar: 'هل يمكنني بيع إضافات مثل الوجبات؟' }, a: { en: 'Yes. Add-ons such as meals, cleaning and transport are sold with stays.', ar: 'نعم. تُباع الإضافات مثل الوجبات والتنظيف والنقل مع الإقامات.' } },
      { q: { en: 'Which payment gateways can I use?', ar: 'ما بوابات الدفع التي يمكنني استخدامها؟' }, a: { en: 'Stripe and Tap.', ar: 'Stripe وTap.' } },
    ],
    modules: ['reservations-and-stays', 'channel-manager', 'team-and-messaging', 'billing-and-payments'],
    integrations: ['channels', 'payments'],
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
      subtitle: { en: 'Leases, rent payments, work orders and resident messages, in one system.', ar: 'العقود ودفعات الإيجار وأوامر العمل ورسائل السكان، في نظام واحد.' },
    },
    shots: [
      { shot: 'pmProperty', title: { en: 'Every property at a glance', ar: 'كل عقار في لمحة' }, text: { en: 'Active residents, leases, units and work orders.', ar: 'السكان النشطون والعقود والوحدات وأوامر العمل.' } },
      { shot: 'pmDashboard', title: { en: 'Your portfolio', ar: 'محفظتك' }, text: { en: 'Properties, tenants, revenue and occupancy.', ar: 'العقارات والمستأجرون والإيرادات والإشغال.' } },
    ],
    points: [
      { icon: FileSignature, title: { en: 'Leases', ar: 'عقود الإيجار' }, text: { en: 'Long-term contracts with your tenants.', ar: 'عقود طويلة الأمد مع مستأجريك.' } },
      { icon: Wallet, title: { en: 'Rent payments', ar: 'دفعات الإيجار' }, text: { en: 'See what is paid and what is due.', ar: 'اعرف ما دُفع وما هو مستحق.' } },
      { icon: Wrench, title: { en: 'Work orders', ar: 'أوامر العمل' }, text: { en: 'Maintenance from request to done.', ar: 'الصيانة من الطلب حتى الإنجاز.' } },
      { icon: MessageSquareText, title: { en: 'SMS and one inbox', ar: 'رسائل نصية وصندوق واحد' }, text: { en: 'Text residents and keep conversations in one inbox.', ar: 'راسل السكان واجمع المحادثات في صندوق وارد واحد.' } },
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
      'one-inbox-to-rule-them-all-centralizing-property-communications',
      'from-request-to-resolution-building-a-maintenance-system-that-works',
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
      { shot: 'pmUnitsMap', title: { en: 'Units map', ar: 'خريطة الوحدات' }, text: { en: 'Sale units on a map.', ar: 'وحدات البيع على الخريطة.' } },
      { shot: 'pmSalesRecords', title: { en: 'All records', ar: 'كل السجلات' }, text: { en: 'Every sale record in one sheet, with filters.', ar: 'كل سجلات البيع في جدول واحد مع عوامل التصفية.' } },
    ],
    points: [
      { icon: FolderKanban, title: { en: 'Projects', ar: 'المشاريع' }, text: { en: 'Group sale units by development.', ar: 'جمّع وحدات البيع حسب المشروع.' } },
      { icon: Building2, title: { en: 'Sale units', ar: 'وحدات البيع' }, text: { en: 'Status, price and buyer.', ar: 'الحالة والسعر والمشتري.' } },
      { icon: Route, title: { en: 'Sales path', ar: 'مسار المبيعات' }, text: { en: 'From new to contract signed.', ar: 'من صفقة جديدة إلى عقد موقّع.' } },
      { icon: Map, title: { en: 'Units map', ar: 'خريطة الوحدات' }, text: { en: 'Sale units on a map.', ar: 'وحدات البيع على الخريطة.' } },
      { icon: UsersRound, title: { en: 'Staff and roles', ar: 'الموظفون والأدوار' }, text: { en: 'Give each person the access they need.', ar: 'امنح كل شخص الصلاحية التي يحتاجها.' } },
    ],
    faqs: [
      { q: { en: 'Can I follow each sale to the contract?', ar: 'هل يمكنني متابعة كل صفقة حتى العقد؟' }, a: { en: 'Yes. The sales path moves each sale from new to contract signed.', ar: 'نعم. ينقل مسار المبيعات كل صفقة من جديدة إلى عقد موقّع.' } },
      { q: { en: 'We also rent units out. Is that covered?', ar: 'نؤجر وحدات أيضًا، فهل هذا مشمول؟' }, a: { en: 'Yes. Sales sit in the same property management solution as rentals, leases and reservations.', ar: 'نعم. المبيعات جزء من حل إدارة العقارات نفسه مع الإيجارات والعقود والحجوزات.' } },
    ],
    modules: ['sales-and-projects', 'billing-and-payments', 'leases-and-rent', 'team-and-messaging'],
    integrations: [],
    posts: [
      'how-to-choose-property-management-software-in-saudi-arabia',
      'accez-cloud-vs-saudi-property-management-platforms',
      'migrating-from-spreadsheets-and-legacy-software-without-losing-data',
    ],
  },

  // ── Service providers ──────────────────────────────────────────────────
  {
    solution: 'service-providers',
    kind: 'audience',
    slug: 'barbers-and-salons',
    name: { en: 'Barbers and salons', ar: 'الحلاقون والصالونات' },
    summary: { en: 'Bookings, a calendar and your clients.', ar: 'الحجوزات والتقويم وعملاؤك.' },
    metaTitle: { en: 'Booking software for barbers and salons in Saudi', ar: 'برنامج حجز مواعيد للحلاقين والصالونات' },
    metaDescription: {
      en: 'Booking software for barbers and salons in Saudi Arabia: take bookings, assign services to each barber, see each client and list on the Accez marketplace.',
      ar: 'برنامج حجز مواعيد للحلاقين والصالونات في السعودية: استقبل الحجوزات، وحدد خدمات كل حلاق، واطّلع على بيانات كل عميل، واعرض نشاطك في سوق أكسيز.',
    },
    hero: {
      title: { en: 'Booking software', ar: 'برنامج حجز مواعيد' },
      accent: { en: 'for barbers and salons', ar: 'للحلاقين والصالونات' },
      subtitle: { en: 'Take bookings, see them on one calendar, keep a record of each client, and list your business on the Accez marketplace.', ar: 'استقبل الحجوزات، واعرضها في تقويم واحد، واحفظ سجل كل عميل، واعرض نشاطك في سوق أكسيز.' },
    },
    shots: [
      { shot: 'spCalendar', title: { en: 'Calendar', ar: 'التقويم' }, text: { en: 'Every booking of the week in one view.', ar: 'كل حجوزات الأسبوع في عرض واحد.' } },
      { shot: 'spBookings', title: { en: 'Bookings', ar: 'الحجوزات' }, text: { en: 'Accept, start and complete, or mark a no-show.', ar: 'اقبل وابدأ وأكمل، أو سجّل عدم الحضور.' } },
      { shot: 'spTeam', title: { en: 'Your team', ar: 'فريقك' }, text: { en: 'Each team member gets a login and can be assigned their own services.', ar: 'لكل عضو في الفريق تسجيل دخول، ويمكن تحديد خدماته.' } },
      { shot: 'spCustomers', title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit for each client.', ar: 'الزيارات والإنفاق وآخر زيارة لكل عميل.' } },
    ],
    points: [
      { icon: Store, title: { en: 'Marketplace listing', ar: 'صفحة في السوق' }, text: { en: 'Customers can find and book you on Accez.', ar: 'يمكن للعملاء أن يجدوك ويحجزوا لديك في أكسيز.' } },
      { icon: CalendarClock, title: { en: 'Bookings', ar: 'الحجوزات' }, text: { en: 'Accept, start, complete or mark a no-show.', ar: 'اقبل وابدأ وأكمل أو سجّل عدم الحضور.' } },
      { icon: Scissors, title: { en: 'Team and services', ar: 'الفريق والخدمات' }, text: { en: 'Choose the services each barber gives.', ar: 'اختر الخدمات التي يقدمها كل حلاق.' } },
      { icon: Contact, title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit.', ar: 'الزيارات والإنفاق وآخر زيارة.' } },
      { icon: BadgePercent, title: { en: 'Promo codes and loyalty', ar: 'أكواد الخصم والولاء' }, text: { en: 'Promo codes for discounts and loyalty points for clients.', ar: 'أكواد خصم ونقاط ولاء لعملائك.' } },
    ],
    faqs: [
      { q: { en: 'Can each barber have their own services?', ar: 'هل يمكن أن يكون لكل حلاق خدماته؟' }, a: { en: 'Yes. Add staff and choose the services each one gives.', ar: 'نعم. أضف الموظفين واختر الخدمات التي يقدمها كل منهم.' } },
      MARKETPLACE,
      DEPOSIT,
    ],
    modules: [],
    integrations: ['payments'],
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
      { icon: Gift, title: { en: 'Gift cards and deals', ar: 'بطاقات الهدايا والعروض' }, text: { en: 'Offer gift cards and deals to your clients.', ar: 'قدّم بطاقات الهدايا والعروض لعملائك.' } },
      { icon: Star, title: { en: 'Reviews', ar: 'التقييمات' }, text: { en: 'Ratings and reviews from your clients.', ar: 'تقييمات ومراجعات من عملائك.' } },
      { icon: ListOrdered, title: { en: 'Waitlist', ar: 'قائمة الانتظار' }, text: { en: 'Keep a waitlist of clients.', ar: 'احتفظ بقائمة انتظار لعملائك.' } },
    ],
    faqs: [
      { q: { en: 'Can treatments have different lengths?', ar: 'هل يمكن أن تختلف مدة الجلسات؟' }, a: { en: 'Yes. Each service has its own duration and price.', ar: 'نعم. لكل خدمة مدتها وسعرها.' } },
      DEPOSIT,
      MARKETPLACE,
    ],
    modules: [],
    integrations: ['payments'],
    posts: [],
  },
  {
    solution: 'service-providers',
    kind: 'audience',
    slug: 'coaches-and-fitness',
    name: { en: 'Coaches and personal trainers', ar: 'المدربون الشخصيون' },
    summary: { en: 'One-to-one sessions, hours and clients, with a listing.', ar: 'الجلسات الفردية والساعات والعملاء، مع صفحة في السوق.' },
    metaTitle: { en: 'Booking software for coaches and personal trainers', ar: 'برنامج حجز مواعيد للمدربين الشخصيين' },
    metaDescription: {
      en: 'Booking software for coaches and personal trainers in Saudi Arabia: one-to-one sessions with a set duration and price, your hours, client history and SMS.',
      ar: 'برنامج حجز مواعيد للمدربين الشخصيين في السعودية: جلسات فردية لكل منها مدتها وسعرها، وساعات عملك، وسجل الزيارات لكل عميل، ورسائل نصية إلى عملائك.',
    },
    hero: {
      title: { en: 'Booking software', ar: 'برنامج حجز مواعيد' },
      accent: { en: 'for coaches and personal trainers', ar: 'للمدربين الشخصيين' },
      subtitle: { en: 'Your one-to-one sessions, hours and clients in one place, with a listing on the Accez marketplace.', ar: 'جلساتك الفردية وساعاتك وعملاؤك في مكان واحد، مع صفحة في سوق أكسيز.' },
    },
    shots: [
      { shot: 'spHours', title: { en: 'Your hours', ar: 'ساعاتك' }, text: { en: 'Set your week, with more than one shift a day.', ar: 'حدّد أسبوعك، مع أكثر من فترة في اليوم.' } },
      { shot: 'spCalendar', title: { en: 'Calendar', ar: 'التقويم' }, text: { en: 'Every session of the week in one view.', ar: 'كل جلسات الأسبوع في عرض واحد.' } },
      { shot: 'spCustomers', title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit for each client.', ar: 'الزيارات والإنفاق وآخر زيارة لكل عميل.' } },
      { shot: 'spIntegrations', title: { en: 'Integrations', ar: 'التكاملات' }, text: { en: 'Tap, Stripe, analytics and SMS.', ar: 'Tap وStripe والتحليلات والرسائل النصية.' } },
    ],
    points: [
      { icon: CalendarClock, title: { en: 'One-to-one sessions', ar: 'جلسات فردية' }, text: { en: 'Each session type with its own duration and price.', ar: 'لكل نوع جلسة مدته وسعره.' } },
      { icon: Clock, title: { en: 'Your hours', ar: 'ساعاتك' }, text: { en: 'Several shifts a day.', ar: 'عدة فترات في اليوم.' } },
      { icon: Contact, title: { en: 'Clients', ar: 'العملاء' }, text: { en: 'Visits, spend and last visit.', ar: 'الزيارات والإنفاق وآخر زيارة.' } },
      { icon: Award, title: { en: 'Loyalty points', ar: 'نقاط الولاء' }, text: { en: 'Loyalty points for your clients.', ar: 'نقاط ولاء لعملائك.' } },
      { icon: MessageSquareText, title: { en: 'SMS', ar: 'الرسائل النصية' }, text: { en: 'Text your clients.', ar: 'راسل عملاءك برسائل نصية.' } },
      { icon: Store, title: { en: 'Marketplace listing', ar: 'صفحة في السوق' }, text: { en: 'Clients can find and book you on Accez.', ar: 'يمكن للعملاء أن يجدوك ويحجزوا لديك في أكسيز.' } },
    ],
    faqs: [
      { q: { en: 'Can I work in more than one block a day?', ar: 'هل يمكنني العمل في أكثر من فترة يوميًا؟' }, a: { en: 'Yes. Business hours allow several shifts a day.', ar: 'نعم. تسمح ساعات العمل بعدة فترات في اليوم.' } },
      { q: { en: 'How do clients pay?', ar: 'كيف يدفع العملاء؟' }, a: { en: 'Online through Tap or Stripe, connected from your integrations. You can also mark a booking as paid in cash.', ar: 'إلكترونيًا عبر Tap أو Stripe، تربطهما من صفحة التكاملات. ويمكنك أيضًا تسجيل الحجز مدفوعًا نقدًا.' } },
      MARKETPLACE,
    ],
    modules: [],
    integrations: ['payments'],
    posts: [],
  },
]
