/**
 * The free printable checklists (/resources/downloads/<id>/), in both
 * languages. Each is a page and a PDF printed from that page
 * (scripts/build-checklist-pdfs.mjs writes public/downloads/<id>-<lang>.pdf).
 *
 * They are working lists for property managers, drawn from the blog posts
 * they name; nothing here describes an Accez feature. Facts about Saudi rules
 * carry their source.
 */
import type { Locale } from '@/lib/i18n'

type Text = Record<Locale, string>

export interface ChecklistSource {
  label: Text
  url: string
}

export interface ChecklistItem {
  text: Text
  /** Index into the checklist's `sources`, for an item stating a fact. */
  source?: number
}

export interface Checklist {
  id: string
  title: Text
  /** One line for the downloads list. */
  summary: Text
  /** How to use it, shown above the list. */
  intro: Text
  /** Blank lines to fill in at the top of the printed sheet. */
  fields: Text[]
  /** Tick columns (e.g. move-in and move-out); one unnamed tick when absent. */
  columns?: Text[]
  sections: { heading: Text; items: ChecklistItem[] }[]
  sources: ChecklistSource[]
  /** Blog posts it is based on. */
  postSlugs: string[]
}

export const DOWNLOADS_COPY = {
  en: {
    eyebrow: 'Resources',
    title: 'Free checklists and tools',
    metaTitle: 'Free property management checklists',
    description:
      'Free printable checklists for property managers in Saudi Arabia: move-in and move-out inspections, short-term rental licensing and new owner onboarding, as pages and PDFs.',
    intro: 'Printable checklists for everyday property management work, in English and Arabic. Free to use and share, with no sign up.',
    crumbHome: 'Home',
    view: 'View checklist',
    download: 'Download PDF',
    downloadOther: 'Arabic PDF',
    pdfLabel: (title: string) => `${title}, PDF in English`,
    pdfOtherLabel: (title: string) => `${title}, PDF in Arabic`,
    toolsTitle: 'More free resources',
    noticeTitle: 'General information, not legal advice',
    notice: 'These checklists are a starting point. Adapt them to each property, and confirm any legal requirement with the authority or a qualified adviser.',
    item: 'Item',
    tick: 'Done',
    notes: 'Notes',
    sources: 'Sources',
    basedOn: 'Based on our guides',
    source: 'Source',
    printedFrom: 'Free checklist from accez.cloud. General information, not legal advice.',
  },
  ar: {
    eyebrow: 'الموارد',
    title: 'قوائم تحقق وأدوات مجانية',
    metaTitle: 'قوائم تحقق مجانية لإدارة العقارات',
    description:
      'قوائم تحقق مجانية قابلة للطباعة لمديري العقارات في السعودية: فحص الدخول والخروج، وترخيص الإيجار قصير الأجل، وإلحاق الملاك الجدد، كصفحات وملفات PDF.',
    intro: 'قوائم تحقق قابلة للطباعة لأعمال إدارة العقارات اليومية، بالعربية والإنجليزية. مجانية للاستخدام والمشاركة، ودون تسجيل.',
    crumbHome: 'الرئيسية',
    view: 'عرض القائمة',
    download: 'تنزيل PDF',
    downloadOther: 'PDF بالإنجليزية',
    pdfLabel: (title: string) => `${title}، ملف PDF بالعربية`,
    pdfOtherLabel: (title: string) => `${title}، ملف PDF بالإنجليزية`,
    toolsTitle: 'موارد مجانية أخرى',
    noticeTitle: 'معلومات عامة وليست استشارة قانونية',
    notice: 'هذه القوائم نقطة بداية. عدّلها بما يناسب كل عقار، وتأكد من أي متطلب نظامي لدى الجهة المختصة أو مستشار مؤهل.',
    item: 'البند',
    tick: 'تم',
    notes: 'ملاحظات',
    sources: 'المصادر',
    basedOn: 'مبنية على مقالاتنا',
    source: 'المصدر',
    printedFrom: 'قائمة تحقق مجانية من accez.cloud. معلومات عامة وليست استشارة قانونية.',
  },
} as const

const AIRBNB_SA = { label: { en: 'Airbnb: Responsible hosting in Saudi Arabia', ar: 'Airbnb: الاستضافة المسؤولة في السعودية' }, url: 'https://www.airbnb.com/help/article/3833' }
const MINISTRY = { label: { en: 'Ministry of Tourism', ar: 'وزارة السياحة' }, url: 'https://mt.gov.sa/' }
const RIYADH_DAILY = {
  label: {
    en: 'Riyadh Daily (SPA), 1 January 2025: Ministry of Tourism mandates removal of unlicensed hospitality listings',
    ar: 'رياض ديلي (واس)، 1 يناير 2025: وزارة السياحة تلزم بحذف إعلانات مرافق الضيافة غير المرخصة',
  },
  url: 'https://alriyadhdaily.com/article/aa8074dc0fc54afc9fab618770e10612',
}

export const CHECKLISTS: Checklist[] = [
  {
    id: 'move-in-move-out-inspection-checklist',
    title: { en: 'Move-in and move-out inspection checklist', ar: 'قائمة فحص الدخول والخروج' },
    summary: {
      en: 'A room by room checklist to record a unit’s condition when a tenant moves in, and compare it when they leave.',
      ar: 'قائمة غرفة بغرفة لتوثيق حالة الوحدة عند دخول المستأجر، ومقارنتها عند خروجه.',
    },
    intro: {
      en: 'Use the same checklist at move-in and at move-out. Note the condition of each item in plain words and back every issue with a dated photo. Inspect within 24 to 48 hours of the handover, with the tenant present if possible.',
      ar: 'استخدم القائمة نفسها عند الدخول وعند الخروج. دوّن حالة كل بند بكلمات واضحة، وادعم كل ملاحظة بصورة مؤرخة. أجرِ الفحص خلال 24 إلى 48 ساعة من التسليم، وبحضور المستأجر إن أمكن.',
    },
    fields: [
      { en: 'Property and unit', ar: 'العقار والوحدة' },
      { en: 'Tenant', ar: 'المستأجر' },
      { en: 'Move-in date', ar: 'تاريخ الدخول' },
      { en: 'Move-out date', ar: 'تاريخ الخروج' },
    ],
    columns: [{ en: 'Move-in', ar: 'الدخول' }, { en: 'Move-out', ar: 'الخروج' }],
    sections: [
      {
        heading: { en: 'Before you start', ar: 'قبل البدء' },
        items: [
          { text: { en: 'The lease registered on Ejar and, at move-out, the signed move-in report', ar: 'عقد الإيجار المسجل في منصة إيجار، وتقرير الدخول الموقّع عند الخروج' } },
          { text: { en: 'A time agreed with the tenant, who is invited to walk through', ar: 'موعد متفق عليه مع المستأجر، مع دعوته لمرافقتك' } },
          { text: { en: 'A phone or camera that dates every photo', ar: 'هاتف أو كاميرا تسجل التاريخ على كل صورة' } },
        ],
      },
      {
        heading: { en: 'Entrance and living areas', ar: 'المدخل ومناطق المعيشة' },
        items: [
          { text: { en: 'Front door, locks and keys', ar: 'الباب الرئيسي والأقفال والمفاتيح' } },
          { text: { en: 'Walls, ceilings and paint', ar: 'الجدران والأسقف والطلاء' } },
          { text: { en: 'Floors and skirting', ar: 'الأرضيات والوزرات' } },
          { text: { en: 'Windows, screens and curtains', ar: 'النوافذ والشبك والستائر' } },
          { text: { en: 'Lights, switches and sockets', ar: 'الإنارة والمفاتيح الكهربائية والمقابس' } },
          { text: { en: 'Air conditioning units and remotes', ar: 'وحدات التكييف وأجهزة التحكم' } },
        ],
      },
      {
        heading: { en: 'Kitchen', ar: 'المطبخ' },
        items: [
          { text: { en: 'Cabinets, drawers and worktops', ar: 'الخزائن والأدراج وأسطح العمل' } },
          { text: { en: 'Sink, taps and drainage', ar: 'الحوض والصنابير والتصريف' } },
          { text: { en: 'Cooker, oven and extractor hood', ar: 'الموقد والفرن وشفاط المطبخ' } },
          { text: { en: 'Refrigerator and other appliances', ar: 'الثلاجة والأجهزة الأخرى' } },
        ],
      },
      {
        heading: { en: 'Bathrooms', ar: 'دورات المياه' },
        items: [
          { text: { en: 'Toilet, basin and shower or bath', ar: 'المرحاض والمغسلة والدش أو حوض الاستحمام' } },
          { text: { en: 'Taps, water pressure and leaks', ar: 'الصنابير وضغط المياه والتسربات' } },
          { text: { en: 'Water heater', ar: 'سخان المياه' } },
          { text: { en: 'Tiles, grout and sealant', ar: 'البلاط والفواصل ومادة العزل' } },
          { text: { en: 'Extractor fan and mirrors', ar: 'مروحة الشفط والمرايا' } },
        ],
      },
      {
        heading: { en: 'Bedrooms', ar: 'غرف النوم' },
        items: [
          { text: { en: 'Doors, wardrobes and handles', ar: 'الأبواب والخزائن والمقابض' } },
          { text: { en: 'Walls, floors and windows', ar: 'الجدران والأرضيات والنوافذ' } },
          { text: { en: 'Furniture and mattresses, if furnished', ar: 'الأثاث والمراتب، إن كانت الوحدة مفروشة' } },
        ],
      },
      {
        heading: { en: 'Utilities and safety', ar: 'المرافق والسلامة' },
        items: [
          { text: { en: 'Electricity meter reading', ar: 'قراءة عداد الكهرباء' } },
          { text: { en: 'Water meter reading', ar: 'قراءة عداد المياه' } },
          { text: { en: 'Smoke detectors and fire extinguisher', ar: 'كواشف الدخان وطفاية الحريق' } },
          { text: { en: 'Keys, remotes and access cards handed over, counted', ar: 'عدد المفاتيح وأجهزة التحكم وبطاقات الدخول المسلّمة' } },
        ],
      },
      {
        heading: { en: 'Sign off', ar: 'الاعتماد' },
        items: [
          { text: { en: 'Tenant and manager sign the report. If the tenant refuses, note it and have a witness sign', ar: 'يوقّع المستأجر والمدير على التقرير، وإذا رفض المستأجر فدوّن ذلك واطلب توقيع شاهد' } },
          { text: { en: 'A copy sent to the tenant with the photos', ar: 'إرسال نسخة إلى المستأجر مع الصور' } },
          { text: { en: 'At move-out, each item compared with the move-in report', ar: 'عند الخروج، مقارنة كل بند بتقرير الدخول' } },
          { text: { en: 'Normal wear and tear separated from damage, and any deduction itemized with evidence', ar: 'التمييز بين الاستهلاك العادي والتلف، وتفصيل أي خصم مع الدليل' } },
        ],
      },
    ],
    sources: [],
    postSlugs: ['move-in-move-out-inspections-protecting-every-property', 'security-deposits-done-right-avoiding-disputes-at-move-out'],
  },
  {
    id: 'short-term-rental-licensing-checklist',
    title: { en: 'Short-term rental licensing checklist (Saudi Arabia)', ar: 'قائمة ترخيص الإيجار قصير الأجل في السعودية' },
    summary: {
      en: 'The steps to license a short-term rental with the Ministry of Tourism, with the source of each fact.',
      ar: 'خطوات ترخيص الإيجار قصير الأجل لدى وزارة السياحة، مع مصدر كل معلومة.',
    },
    intro: {
      en: 'Short-term rentals in Saudi Arabia are licensed by the Ministry of Tourism as private tourism hospitality facilities. Use this list to prepare, and confirm the current conditions and fees with the Ministry before you apply or renew, as they change.',
      ar: 'ترخّص وزارة السياحة الإيجارات قصيرة الأجل في السعودية بوصفها مرافق ضيافة سياحية خاصة. استخدم هذه القائمة للاستعداد، وتأكد من الشروط والرسوم الحالية لدى الوزارة قبل التقديم أو التجديد، لأنها تتغير.',
    },
    fields: [
      { en: 'Property and unit', ar: 'العقار والوحدة' },
      { en: 'License number', ar: 'رقم الترخيص' },
      { en: 'License expiry date', ar: 'تاريخ انتهاء الترخيص' },
    ],
    sections: [
      {
        heading: { en: 'Check before you start', ar: 'تحقق قبل البدء' },
        items: [
          { text: { en: 'The license comes from the Ministry of Tourism, not from Ejar. In AlUla, registration is with the Royal Commission for AlUla', ar: 'يصدر الترخيص من وزارة السياحة، وليس من منصة إيجار. وفي العُلا يكون التسجيل لدى الهيئة الملكية لمحافظة العُلا' }, source: 1 },
          { text: { en: 'A lease, commercial registration or general business license does not replace the tourism license', ar: 'لا يغني عقد الإيجار أو السجل التجاري أو الترخيص التجاري العام عن ترخيص السياحة' } },
          { text: { en: 'Individual owners may register and manage up to 8 units. More needs a company with a tourist accommodation management license, or a contract with a licensed provider', ar: 'يمكن للمالك الفرد تسجيل وإدارة ما يصل إلى 8 وحدات، وتتطلب إدارة عدد أكبر شركة لديها ترخيص إدارة مرافق الإيواء السياحي، أو التعاقد مع مزود مرخص' }, source: 1 },
          { text: { en: 'The current conditions and fees read on the Ministry of Tourism’s licensing portal', ar: 'الاطلاع على الشروط والرسوم الحالية في بوابة التراخيص لدى وزارة السياحة' }, source: 0 },
        ],
      },
      {
        heading: { en: 'Prepare the documents', ar: 'جهّز المستندات' },
        items: [
          { text: { en: 'Title deed, or the lease contract if you rent the unit', ar: 'صك الملكية، أو عقد الإيجار إن كنت تستأجر الوحدة' }, source: 1 },
          { text: { en: 'If you lease the unit from its owner, that lease registered on Ejar', ar: 'إذا كنت تستأجر الوحدة من مالكها، فيجب أن يكون عقد الإيجار مسجلًا في منصة إيجار' } },
          { text: { en: 'National identification details, used for government verification', ar: 'بيانات الهوية الوطنية، وتُستخدم للتحقق الحكومي' }, source: 1 },
          { text: { en: 'Fire safety equipment and a first aid kit in the unit', ar: 'معدات السلامة من الحريق وحقيبة إسعافات أولية في الوحدة' }, source: 1 },
          { text: { en: 'Basic guest information on amenities, such as parking and waste removal', ar: 'معلومات أساسية للضيوف عن المرافق، مثل المواقف والتخلص من النفايات' }, source: 1 },
        ],
      },
      {
        heading: { en: 'Apply and pay', ar: 'قدّم الطلب وادفع الرسوم' },
        items: [
          { text: { en: 'Register the unit as a private tourism accommodation facility on the Ministry’s online portal', ar: 'سجّل الوحدة بوصفها مرفق ضيافة سياحية خاصًا عبر البوابة الإلكترونية للوزارة' }, source: 1 },
          { text: { en: 'Pay the annual registration fee', ar: 'ادفع رسوم التسجيل السنوية' }, source: 1 },
          { text: { en: 'Record the license number and its expiry date', ar: 'دوّن رقم الترخيص وتاريخ انتهائه' } },
        ],
      },
      {
        heading: { en: 'List and stay licensed', ar: 'أعلن وحافظ على الترخيص' },
        items: [
          { text: { en: 'Add the license number to every listing. Airbnb shows it publicly on the listing', ar: 'أضف رقم الترخيص إلى كل إعلان، وتعرضه Airbnb للعموم في الإعلان' }, source: 1 },
          { text: { en: 'Keep license numbers, expiry dates, deeds or leases and safety documents in one place', ar: 'احفظ أرقام التراخيص وتواريخ انتهائها والصكوك أو العقود ومستندات السلامة في مكان واحد' } },
          { text: { en: 'Renew before expiry. Since 1 January 2025 platforms must remove unlicensed listings, and operating without a license can bring fines of up to SAR 1 million, closure or both', ar: 'جدّد قبل انتهاء الترخيص. فمنذ 1 يناير 2025 يجب على المنصات حذف الإعلانات غير المرخصة، وقد يؤدي التشغيل دون ترخيص إلى غرامات تصل إلى مليون ريال أو إغلاق المرفق أو كليهما' }, source: 2 },
        ],
      },
    ],
    sources: [MINISTRY, AIRBNB_SA, RIYADH_DAILY],
    postSlugs: ['saudi-s-short-term-rental-licensing-getting-your-str-permit'],
  },
  {
    id: 'new-owner-onboarding-checklist',
    title: { en: 'New owner onboarding checklist', ar: 'قائمة إلحاق مالك جديد' },
    summary: {
      en: 'What to collect and set up when you take on a new owner’s property, so the first month runs cleanly.',
      ar: 'ما تجمعه وتجهّزه عند استلام عقار مالك جديد، ليمضي الشهر الأول بسلاسة.',
    },
    intro: {
      en: 'Collect each document once, keep it in one place and agree the terms in writing before the first lease or booking.',
      ar: 'اجمع كل مستند مرة واحدة، واحفظه في مكان واحد، واتفق على الشروط كتابيًا قبل أول عقد إيجار أو حجز.',
    },
    fields: [
      { en: 'Owner', ar: 'المالك' },
      { en: 'Property', ar: 'العقار' },
      { en: 'Start date', ar: 'تاريخ البدء' },
    ],
    sections: [
      {
        heading: { en: 'Agreement and owner details', ar: 'الاتفاق وبيانات المالك' },
        items: [
          { text: { en: 'Signed management agreement: services, fees, term and notice period', ar: 'اتفاقية إدارة موقعة: الخدمات والرسوم والمدة ومدة الإشعار' } },
          { text: { en: 'Owner contact details and preferred language', ar: 'بيانات التواصل مع المالك ولغته المفضلة' } },
          { text: { en: 'Bank details for payouts, and the statement schedule', ar: 'البيانات البنكية للتحويلات، وموعد إرسال الكشوف' } },
          { text: { en: 'Who approves repairs, and up to what amount', ar: 'من يعتمد الإصلاحات، وحتى أي مبلغ' } },
        ],
      },
      {
        heading: { en: 'Property documents', ar: 'مستندات العقار' },
        items: [
          { text: { en: 'Title deed, or proof of the owner’s right to rent the unit', ar: 'صك الملكية، أو ما يثبت حق المالك في تأجير الوحدة' } },
          { text: { en: 'Existing leases, registered on Ejar', ar: 'عقود الإيجار القائمة، مسجلة في منصة إيجار' } },
          { text: { en: 'Ministry of Tourism license, if units will be rented by the night', ar: 'ترخيص وزارة السياحة، إذا كانت الوحدات ستؤجَّر بالليلة' } },
          { text: { en: 'Insurance policies, warranties and maintenance history', ar: 'وثائق التأمين والضمانات وسجل الصيانة' } },
        ],
      },
      {
        heading: { en: 'The unit', ar: 'الوحدة' },
        items: [
          { text: { en: 'Full inspection with dated photos', ar: 'فحص كامل مع صور مؤرخة' } },
          { text: { en: 'Inventory of furniture and appliances, if furnished', ar: 'جرد الأثاث والأجهزة، إن كانت الوحدة مفروشة' } },
          { text: { en: 'Keys, remotes and access cards counted and labelled', ar: 'عدّ المفاتيح وأجهزة التحكم وبطاقات الدخول وتمييزها' } },
          { text: { en: 'Utility accounts and meter readings', ar: 'حسابات المرافق وقراءات العدادات' } },
        ],
      },
      {
        heading: { en: 'Set up and the first month', ar: 'الإعداد والشهر الأول' },
        items: [
          { text: { en: 'The property and its units added to your records', ar: 'إضافة العقار ووحداته إلى سجلاتك' } },
          { text: { en: 'Rent schedule, or nightly prices and channel listings for short stays', ar: 'جدول الإيجار، أو أسعار الليالي وإعلانات القنوات للإقامات القصيرة' } },
          { text: { en: 'How and when you report to the owner, agreed', ar: 'الاتفاق على طريقة وموعد التقارير للمالك' } },
          { text: { en: 'Owner and tenant data handled in line with the PDPL', ar: 'التعامل مع بيانات المالك والمستأجر وفق نظام حماية البيانات الشخصية' } },
          { text: { en: 'First statement sent on the agreed date', ar: 'إرسال أول كشف في الموعد المتفق عليه' } },
        ],
      },
    ],
    sources: [],
    postSlugs: ['owner-onboarding-how-to-bring-on-new-properties', 'owner-communication-that-builds-trust-not-just-reports', 'pdpl-and-tenant-data-what-saudi-arabia-s-privacy-law-means-for-property-managers'],
  },
]

export function checklistById(id: string): Checklist | undefined {
  return CHECKLISTS.find((c) => c.id === id)
}
