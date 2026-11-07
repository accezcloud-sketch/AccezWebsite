/**
 * The Saudi regulations hub (/resources/saudi-regulations/): one entry per
 * rule the blog already explains, with a plain two-sentence summary, the
 * authority that runs it (official sites only) and the posts that cover it.
 *
 * Facts come from the linked posts and their official sources; nothing here
 * says whether Accez meets any rule. Links go to official government domains
 * only (checked by saudiRegulations.test.ts). Posts are listed by slug and
 * resolved against content/blog at build time, so a renamed post fails the
 * tests instead of leaving a dead link.
 */
import type { BlogPostMeta } from '@/lib/blog'
import type { Locale } from '@/lib/i18n'

type Text = Record<Locale, string>

export interface OfficialLink {
  label: Text
  url: string
}

export interface RegulationTopic {
  id: string
  title: Text
  /** Two short sentences: what the rule says, in plain words. */
  summary: Text
  authority: { name: Text; url: string }
  /** Further official pages (announcements, guides, the law's text). */
  sources: OfficialLink[]
  /** Blog posts that explain it, best first. */
  postSlugs: string[]
  /**
   * Words in a post's English title or address that file it under this topic.
   * New posts (the blog automation adds them) appear after the hand-picked ones,
   * so the hub never misses a post the blog files under Saudi regulations.
   */
  match: RegExp
}

/** Domains the hub may link to: the authorities' own sites. */
export const OFFICIAL_DOMAINS = ['rega.gov.sa', 'ejar.sa', 'zatca.gov.sa', 'sdaia.gov.sa', 'mt.gov.sa', 'momah.gov.sa'] as const

export const REGULATIONS_COPY = {
  en: {
    eyebrow: 'Resources',
    title: 'Saudi regulations for property managers',
    metaTitle: 'Saudi property regulations: a guide for managers',
    description:
      'Ejar leases, Riyadh rent rules, deposits, tourism licensing, VAT, e-invoicing and the PDPL, in plain words with links to the official Saudi authorities.',
    intro:
      'The rules property managers in Saudi Arabia deal with most, in one place. Each card says what the rule covers, which authority runs it, and which of our guides explains it in more depth.',
    noticeTitle: 'General information, not legal advice',
    notice:
      'This page summarizes public rules for property managers in Saudi Arabia. Rules and fees change, so confirm the current requirements with the authority or a qualified adviser before you act.',
    authority: 'Authority',
    sources: 'Official sources',
    guides: 'Our guides',
    lastReviewed: 'Last reviewed',
    opensNewTab: '(opens in a new tab)',
    crumbHome: 'Home',
    topicLink: 'All Saudi rules on one page, with official sources',
  },
  ar: {
    eyebrow: 'الموارد',
    title: 'الأنظمة السعودية لمديري العقارات',
    metaTitle: 'الأنظمة العقارية في السعودية: دليل لمديري العقارات',
    description:
      'عقود منصة إيجار، وقواعد الإيجار في الرياض، ومبالغ التأمين، وتراخيص السياحة، وضريبة القيمة المضافة والفوترة الإلكترونية، ونظام حماية البيانات الشخصية، بلغة واضحة مع روابط الجهات الرسمية.',
    intro:
      'أكثر الأنظمة التي يتعامل معها مديرو العقارات في السعودية، في مكان واحد. توضح كل بطاقة ما يغطيه النظام، والجهة المسؤولة عنه، ومقالاتنا التي تشرحه بتفصيل أكبر.',
    noticeTitle: 'معلومات عامة وليست استشارة قانونية',
    notice:
      'تلخص هذه الصفحة أنظمة منشورة لمديري العقارات في السعودية. تتغير الأنظمة والرسوم، لذا تأكد من المتطلبات الحالية لدى الجهة المختصة أو مستشار مؤهل قبل أي إجراء.',
    authority: 'الجهة المسؤولة',
    sources: 'مصادر رسمية',
    guides: 'مقالاتنا',
    lastReviewed: 'آخر مراجعة',
    opensNewTab: '(يفتح في علامة تبويب جديدة)',
    crumbHome: 'الرئيسية',
    topicLink: 'كل الأنظمة السعودية في صفحة واحدة، مع المصادر الرسمية',
  },
} as const

const REGA = { en: 'Real Estate General Authority (REGA)', ar: 'الهيئة العامة للعقار' }

export const REGULATION_TOPICS: RegulationTopic[] = [
  {
    id: 'ejar-leases',
    title: { en: 'Ejar leases and REGA rent rules', ar: 'عقود منصة إيجار وقواعد الهيئة العامة للعقار' },
    summary: {
      en: 'Leases are registered on Ejar, the rental platform under the Real Estate General Authority. Rent on new residential leases is paid through Ejar’s digital channels, and standard Ejar contracts are enforceable.',
      ar: 'تُسجَّل عقود الإيجار في منصة إيجار التابعة للهيئة العامة للعقار. وتُدفع إيجارات العقود السكنية الجديدة عبر القنوات الرقمية لمنصة إيجار، وتُعد عقود إيجار الموحدة سندًا تنفيذيًا.',
    },
    authority: { name: REGA, url: 'https://rega.gov.sa/' },
    sources: [
      { label: { en: 'Ejar platform', ar: 'منصة إيجار' }, url: 'https://www.ejar.sa/' },
      {
        label: { en: 'REGA: rent paid through digital channels', ar: 'الهيئة العامة للعقار: سداد الإيجار عبر القنوات الرقمية' },
        url: 'https://rega.gov.sa/en/media-center/news-announcements/restricting-rent-payment-for-residential-contracts-through-digital-channels-starting-15-january/',
      },
    ],
    postSlugs: ['ejar-compliance-made-simple-automating-saudi-rental-regulations', 'handling-tenant-disputes-and-evictions-the-right-way-in-saudi-arabia'],
    match: /\bejar\b|lease (?:documentation|contract)|unified lease|brokerage|\bfal\b|\brega\b|real estate (?:registry|ad\b|advertis)|\bwafi\b|off[\s-]plan|owners? associations?|mullak/i,
  },
  {
    id: 'zatca-tax',
    title: { en: 'VAT, real estate transaction tax and e-invoicing', ar: 'ضريبة القيمة المضافة وضريبة التصرفات العقارية والفوترة الإلكترونية' },
    summary: {
      en: 'Residential leases are exempt from VAT, commercial leases carry 15% VAT, and property sales pay the 5% real estate transaction tax instead. ZATCA’s e-invoicing (Fatoora) has applied in phases since 4 December 2021.',
      ar: 'تُعفى عقود الإيجار السكنية من ضريبة القيمة المضافة، وتخضع عقود الإيجار التجارية لها بنسبة 15%، بينما تخضع مبيعات العقارات لضريبة التصرفات العقارية بنسبة 5% بدلًا منها. وتُطبَّق الفوترة الإلكترونية (فاتورة) على مراحل منذ 4 ديسمبر 2021.',
    },
    authority: { name: { en: 'Zakat, Tax and Customs Authority (ZATCA)', ar: 'هيئة الزكاة والضريبة والجمارك' }, url: 'https://zatca.gov.sa/' },
    sources: [
      { label: { en: 'ZATCA: e-invoicing (Fatoora)', ar: 'هيئة الزكاة والضريبة والجمارك: الفوترة الإلكترونية' }, url: 'https://zatca.gov.sa/en/E-Invoicing/Pages/default.aspx' },
      {
        label: { en: 'ZATCA: real estate transaction tax guide (PDF)', ar: 'هيئة الزكاة والضريبة والجمارك: دليل ضريبة التصرفات العقارية (PDF)' },
        url: 'https://zatca.gov.sa/en/HelpCenter/guidelines/Documents/Simplified%20guide%20to%20the%20real%20estate%20transaction%20tax.pdf',
      },
    ],
    postSlugs: ['vat-and-property-management-keeping-your-books-clean-and-compliant', 'zatca-e-invoicing-fatoora-what-property-managers-must-do'],
    match: /zatca|\bvat\b|e-?invoic|fatoora|\btax\b/i,
  },
  {
    id: 'pdpl',
    title: { en: 'Personal data protection (PDPL)', ar: 'نظام حماية البيانات الشخصية' },
    summary: {
      en: 'The Personal Data Protection Law sets how tenant and guest data may be collected, stored and shared. It requires a valid legal basis, proper security and reporting data breaches to SDAIA.',
      ar: 'يحدد نظام حماية البيانات الشخصية كيف تُجمع بيانات المستأجرين والضيوف وتُحفظ وتُشارك. ويتطلب أساسًا نظاميًا للمعالجة، وحماية مناسبة، وإبلاغ سدايا عن أي تسرب للبيانات.',
    },
    authority: { name: { en: 'Saudi Data and AI Authority (SDAIA)', ar: 'الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)' }, url: 'https://sdaia.gov.sa/' },
    sources: [
      {
        label: { en: 'SDAIA: the law’s text (PDF)', ar: 'سدايا: نص النظام بالإنجليزية (PDF)' },
        url: 'https://sdaia.gov.sa/en/SDAIA/about/Documents/Personal%20Data%20English%20V2-23April2023-%20Reviewed-.pdf',
      },
    ],
    postSlugs: ['pdpl-and-tenant-data-what-saudi-arabia-s-privacy-law-means-for-property-managers'],
    match: /pdpl|data protection|privacy/i,
  },
  {
    id: 'tourism-licensing',
    title: { en: 'Short-term rental licensing', ar: 'ترخيص الإيجارات قصيرة الأجل' },
    summary: {
      en: 'Short-term rentals are licensed by the Ministry of Tourism as private tourism hospitality facilities, not through Ejar. Since 1 January 2025, booking platforms must remove listings without a valid license.',
      ar: 'ترخّص وزارة السياحة الإيجارات قصيرة الأجل بوصفها مرافق ضيافة سياحية خاصة، وليس عبر منصة إيجار. ومنذ 1 يناير 2025، يجب على منصات الحجز حذف الإعلانات التي لا تحمل ترخيصًا ساريًا.',
    },
    authority: { name: { en: 'Ministry of Tourism', ar: 'وزارة السياحة' }, url: 'https://mt.gov.sa/' },
    sources: [],
    postSlugs: ['saudi-s-short-term-rental-licensing-getting-your-str-permit'],
    match: /tourism|\bstr\b|short[\s-]term rental licen|holiday home|shomoos|licen[cs]|permit|balady/i,
  },
  {
    id: 'riyadh-rent-rules',
    title: { en: 'Riyadh rent rules and lease renewals', ar: 'قواعد الإيجار في الرياض وتجديد العقود' },
    summary: {
      en: 'Within Riyadh’s urban boundaries, annual rent increases are suspended for five years from 25 September 2025. Across the Kingdom, leases renew automatically unless one party gives notice at least 60 days before the term ends.',
      ar: 'داخل النطاق العمراني لمدينة الرياض، أُوقفت الزيادة السنوية في قيمة الإيجار خمس سنوات بدءًا من 25 سبتمبر 2025. وفي جميع مدن المملكة، تتجدد العقود تلقائيًا ما لم يُبلغ أحد الطرفين الآخر برغبته في عدم التجديد قبل 60 يومًا على الأقل من نهاية المدة.',
    },
    authority: { name: REGA, url: 'https://rega.gov.sa/' },
    sources: [
      {
        label: { en: 'REGA: the Riyadh rent provisions', ar: 'الهيئة العامة للعقار: ضوابط الإيجار في الرياض' },
        url: 'https://rega.gov.sa/en/media-center/news-announcements/in-line-with-hrh-crown-prince-s-directive-to-take-several-measures-to-achieve-balance-in-the-real-estate-sector-in-riyadh-approval-has-been-issued-for-regulatory-provisions-aimed-at-regulating-the-relationship-between-landlords-and-tenants/',
      },
    ],
    postSlugs: ['rent-increases-and-lease-renewals', 'handling-tenant-disputes-and-evictions-the-right-way-in-saudi-arabia'],
    match: /riyadh|rent (?:increase|freeze|cap)|rent rules/i,
  },
  {
    id: 'security-deposits',
    title: { en: 'Security deposits', ar: 'مبالغ التأمين' },
    summary: {
      en: 'Register the lease on Ejar and agree the deposit and the rules for deductions in writing. Record the unit’s condition at move-in and move-out, and back every deduction with an itemized list and dated photos.',
      ar: 'سجّل عقد الإيجار في منصة إيجار، واتفق كتابيًا على مبلغ التأمين وشروط الخصم منه. ووثّق حالة الوحدة عند الدخول والخروج، وادعم كل خصم بقائمة مفصلة وصور مؤرخة.',
    },
    authority: { name: { en: 'Ejar platform, under REGA', ar: 'منصة إيجار، التابعة للهيئة العامة للعقار' }, url: 'https://www.ejar.sa/' },
    sources: [],
    postSlugs: ['security-deposits-done-right-avoiding-disputes-at-move-out', 'move-in-move-out-inspections-protecting-every-property'],
    match: /deposit|move[\s-]in|move[\s-]out/i,
  },
]

export interface RegulationGuide {
  slug: string
  title: string
  reviewed?: string
}

/**
 * Each topic's posts as links, in the topic's order, with their review date.
 * Throws for a slug that is not a post, so a broken link cannot ship.
 */
export function guidesFor(topic: RegulationTopic, posts: BlogPostMeta[], locale: Locale): RegulationGuide[] {
  const bySlug = new Map(posts.map((p) => [p.slug, p]))
  return topicPostSlugs(topic, posts).map((slug) => {
    const post = bySlug.get(slug)
    if (!post) throw new Error(`Saudi regulations hub: no post "${slug}" (topic ${topic.id})`)
    return { slug, title: locale === 'ar' ? post.titleAr : post.title, reviewed: post.reviewed }
  })
}

type HubPost = Pick<BlogPostMeta, 'slug' | 'title' | 'date' | 'topic'>

/** The topic a Saudi regulations post belongs to: the first whose words match, else Ejar and leases. */
export function regulationTopicOf(post: Pick<BlogPostMeta, 'slug' | 'title'>): string {
  const text = post.title + ' ' + post.slug.replace(/-/g, ' ')
  return (REGULATION_TOPICS.find((t) => t.match.test(text)) ?? REGULATION_TOPICS[0]).id
}

/**
 * A topic's posts: the hand-picked ones first, then every other post the blog
 * files under Saudi regulations that belongs to this topic, newest first.
 */
export function topicPostSlugs(topic: RegulationTopic, posts: HubPost[]): string[] {
  const picked = new Set(REGULATION_TOPICS.flatMap((t) => t.postSlugs))
  const added = posts
    .filter((p) => p.topic === 'saudi-regulations' && !picked.has(p.slug) && regulationTopicOf(p) === topic.id)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => p.slug)
  return [...topic.postSlugs, ...added]
}

/** Every post the hub links to, once (hand-picked only when no posts are given). */
export function hubPostSlugs(posts: HubPost[] = []): string[] {
  return [...new Set(REGULATION_TOPICS.flatMap((t) => topicPostSlugs(t, posts)))]
}
