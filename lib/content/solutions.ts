/**
 * Copy for the solution pages (Owners, Sales, Hotels), in both languages.
 *
 * Kept as plain data, separate from the page component, so other parts of the
 * site (for example the product block at the end of blog posts) can reuse the
 * same approved wording instead of restating it.
 */
import {
  LayoutDashboard, ReceiptText, Wallet, BarChart3,
  Building2, TrendingUp, RefreshCw, Layers,
  Hotel, Sparkles, KeyRound,
  type LucideIcon,
} from 'lucide-react'

export interface Feature { icon: LucideIcon; title: string; titleAr: string; desc: string; descAr: string }
export interface Bi { en: string; ar: string }

export interface Solution {
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
export type SolutionSlug = 'owners' | 'sales' | 'hotels'

export const SOLUTIONS: Record<SolutionSlug, Solution> = {
  owners: {
    eyebrow: 'Owner Management', eyebrowAr: 'إدارة الملاك',
    title: 'Keep owners informed and', titleAr: 'أبقِ الملاك على اطلاع',
    accent: 'paid on time', accentAr: 'وادفع لهم في وقتهم',
    subtitle: 'Give every property owner their own portal, a clear ledger and tracked payouts, so you spend less time on statements and more time growing the portfolio.',
    subtitleAr: 'امنح كل مالك عقار بوابته الخاصة وسجلًا واضحًا ومدفوعات متتبَّعة، لتقضي وقتًا أقل في الكشوف وأكثر في تنمية المحفظة.',
    heroPoints: [
      { en: 'Owner portal: units, reservations and invoices', ar: 'بوابة المالك: الوحدات والحجوزات والفواتير' },
      { en: 'Owner ledger, balances and statements', ar: 'سجل المالك والأرصدة والكشوف' },
      { en: 'Payouts tracked from pending to paid', ar: 'مدفوعات متتبَّعة من المعلّق إلى المسدَّد' },
    ],
    features: [
      { icon: LayoutDashboard, title: 'Owner portal', titleAr: 'بوابة المالك', desc: 'Owners log in to see their units, reservations, invoices and earnings, no more emailed spreadsheets.', descAr: 'يسجّل الملاك الدخول لرؤية وحداتهم وحجوزاتهم وفواتيرهم وأرباحهم، دون جداول تُرسل بالبريد.' },
      { icon: ReceiptText, title: 'Ledger & statements', titleAr: 'السجل والكشوف', desc: 'Every charge and payout on one ledger, with clean statements owners can trust.', descAr: 'كل رسم ودفعة في سجل واحد، مع كشوف واضحة يثق بها الملاك.' },
      { icon: Wallet, title: 'Payouts, tracked', titleAr: 'مدفوعات متتبَّعة', desc: 'Create payouts from pending balances and mark them paid, nothing slips.', descAr: 'أنشئ المدفوعات من الأرصدة المعلّقة وحدّدها كمدفوعة، دون أي تفويت.' },
      { icon: BarChart3, title: 'Owner analytics', titleAr: 'تحليلات المالك', desc: 'Show each owner how their units are performing, live.', descAr: 'اعرض لكل مالك أداء وحداته، مباشرة.' },
    ],
    capsHeading: 'What owners and managers get', capsHeadingAr: 'ما يحصل عليه الملاك والمديرون',
    capabilities: [
      { en: 'Owner dashboard & portal', ar: 'لوحة وبوابة المالك' },
      { en: 'Per-owner ledger and balances', ar: 'سجل وأرصدة لكل مالك' },
      { en: 'Owner statements', ar: 'كشوف الملاك' },
      { en: 'Owner balances and payout creation', ar: 'أرصدة الملاك وإنشاء المدفوعات' },
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

  hotels: {
    eyebrow: 'Hotels & Serviced Apartments', eyebrowAr: 'الفنادق والشقق المخدومة',
    title: 'Run rooms and stays', titleAr: 'أدر الغرف والإقامات',
    accent: 'across every channel', accentAr: 'عبر كل قناة',
    subtitle: 'Room types, rates and reservations synced with Airbnb, Booking.com and Expedia through RoomCloud, with guest policies, add-ons and check-in built in.',
    subtitleAr: 'أنواع الغرف والأسعار والحجوزات متزامنة مع Airbnb وBooking.com وExpedia من خلال RoomCloud، مع سياسات النزلاء والإضافات وتسجيل الوصول مدمجة.',
    heroPoints: [
      { en: 'Room types mapped to your units', ar: 'أنواع غرف مرتبطة بوحداتك' },
      { en: 'RoomCloud channel manager, synced', ar: 'مدير قنوات RoomCloud، متزامن' },
      { en: 'Guest policies, add-ons and check-in', ar: 'سياسات النزلاء والإضافات وتسجيل الوصول' },
    ],
    features: [
      { icon: Hotel, title: 'Room types', titleAr: 'أنواع الغرف', desc: 'Define room types and assign units, with rates per type.', descAr: 'حدّد أنواع الغرف وأسند الوحدات، بأسعار لكل نوع.' },
      { icon: RefreshCw, title: 'Channel manager', titleAr: 'مدير القنوات', desc: 'Connect RoomCloud to sync availability, rates and reservations with Airbnb, Booking.com and Expedia.', descAr: 'اربط RoomCloud لمزامنة التوافر والأسعار والحجوزات مع Airbnb وBooking.com وExpedia.' },
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
