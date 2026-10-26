/**
 * Blog topics: the groups readers browse by, each with its own hub page.
 *
 * Every post previously sat in one category ("Industry Insights"), so
 * categories told readers nothing. A post's topic is, in order:
 *   1. the `topic` set in its frontmatter (an editor's choice always wins),
 *   2. "Product guides" for posts filed as tutorials,
 *   3. the best match of the phrase lists below,
 *   4. "Growth & strategy" when nothing matches strongly.
 *
 * Listed most-specific first: on a tie, the earlier topic wins. Edit labels
 * and phrases here; nothing else needs to change.
 */
import { createKeywordClassifier, type ClassifiablePost } from './keywordClassifier'
import type { Locale } from '@/lib/i18n'

export const TOPICS = [
  {
    key: 'product-guides',
    label: { en: 'Product guides', ar: 'أدلة المنتج' },
    description: {
      en: 'Step-by-step guides to Accez: setting up properties and units, reservations and work orders, with screens from the property management solution.',
      ar: 'أدلة خطوة بخطوة لاستخدام أكسيز: إعداد العقارات والوحدات، والحجوزات، وأوامر العمل، مع لقطات من حل إدارة العقارات.',
    },
    signals: ['accez.cloud', 'accez cloud'],
  },
  {
    key: 'saudi-regulations',
    label: { en: 'Saudi regulations', ar: 'الأنظمة السعودية' },
    description: {
      en: 'Saudi rules property managers deal with: Ejar leases, ZATCA and VAT, the PDPL data law, tourism licensing and rent rules, explained with sources.',
      ar: 'الأنظمة السعودية التي يتعامل معها مديرو العقارات: عقود منصة إيجار، والزكاة والضريبة، وحماية البيانات، وتراخيص السياحة، مع ذكر المصادر.',
    },
    signals: [
      'ejar', 'zatca', 'fatoora', 'e-invoicing', 'pdpl', 'privacy law', 'data protection', 'compliance', 'compliant',
      'regulation', 'regulations', 'regulatory', 'licensing', 'license', 'permit', 'eviction', 'evictions',
      'rent increase', 'rent increases', 'lease renewal', 'lease renewals', 'vat', 'balady',
    ],
  },
  {
    key: 'short-term-rentals',
    label: { en: 'Short-term rentals', ar: 'الإيجارات قصيرة الأجل' },
    description: {
      en: 'Running short-term and vacation rentals in Saudi Arabia: channels, pricing, guest messaging, turnovers, reviews and tourism licensing.',
      ar: 'تشغيل الإيجارات قصيرة الأجل والسياحية في السعودية: القنوات، والتسعير، ومراسلة الضيوف، وتجهيز الوحدات، والتقييمات، والتراخيص.',
    },
    signals: [
      'hotel', 'hotels', 'serviced apartment', 'serviced apartments', 'short-term', 'short term', 'vacation rental',
      'vacation rentals', 'holiday home', 'airbnb', 'booking.com', 'ota', 'otas', 'channel manager', 'channels',
      'channel management', 'double booking', 'double-booking', 'guest', 'guests', 'check-in', 'check-out',
      'occupancy', 'revpar', 'nightly', 'gap night', 'gap nights', 'length of stay', 'direct booking',
      'direct bookings', 'metasearch', 'upsell', 'add-ons', 'cancellation', 'cancellations', 'corporate housing',
      'str', 'bookings', 'booking management', 'dynamic pricing', 'rate shopping', 'comp set', 'comp sets', 'reviews',
      'seasonal demand', 'peak season', 'demand spikes', 'hajj', 'umrah', 'upsells', 'addons', 'checkins', 'early check-in',
    ],
  },
  {
    key: 'owner-relations',
    label: { en: 'Owner relations', ar: 'علاقات الملاك' },
    description: {
      en: 'Winning and keeping property owners: onboarding, statements, reporting and the clear communication that keeps management contracts.',
      ar: 'كسب ثقة الملاك والمحافظة عليها: الإلحاق، والكشوف، والتقارير، والتواصل الواضح الذي يحافظ على عقود الإدارة.',
    },
    signals: [
      'owner', 'owners', 'landlord', 'landlords', 'payout', 'payouts', 'owner statement', 'owner statements',
      'owner reporting', 'owner report', 'management contract', 'management contracts', 'trust accounting',
      'reports', 'reporting', 'monthly report',
    ],
  },
  {
    key: 'maintenance-operations',
    label: { en: 'Maintenance & operations', ar: 'الصيانة والتشغيل' },
    description: {
      en: 'Maintenance and day-to-day operations: work orders, preventive maintenance, vendors, inspections and emergencies across a portfolio.',
      ar: 'الصيانة والتشغيل اليومي: أوامر العمل، والصيانة الوقائية، والموردون، والفحوصات، وحالات الطوارئ في محفظة عقارية.',
    },
    signals: [
      'maintenance', 'work order', 'work orders', 'repair', 'repairs', 'vendor', 'vendors', 'cleaner', 'cleaners',
      'cleaning', 'housekeeping', 'turnover', 'turnovers', 'inspection', 'inspections', 'utility', 'utilities',
      'emergency', 'preventive', 'facility', 'facilities', 'visitor management',
    ],
  },
  {
    key: 'rent-payments',
    label: { en: 'Rent & payments', ar: 'الإيجار والمدفوعات' },
    description: {
      en: 'Rent and payments: tracking what is paid and due, deposits, late payments, refunds and billing for property managers in Saudi Arabia.',
      ar: 'الإيجار والمدفوعات: متابعة المدفوع والمستحق، ومبالغ التأمين، والتأخر في السداد، والاسترداد، والفوترة لمديري العقارات في السعودية.',
    },
    signals: [
      'rent collection', 'rent payment', 'rent payments', 'late rent', 'payment', 'payments', 'deposit', 'deposits',
      'security deposit', 'refund', 'refunds', 'chargeback', 'chargebacks', 'invoice', 'invoices', 'mada',
      'apple pay', 'stc pay', 'sadad', 'accounting', 'bill', 'bills',
    ],
  },
  {
    key: 'tenants-communication',
    label: { en: 'Tenants & communication', ar: 'المستأجرين والتواصل' },
    description: {
      en: 'Communicating with tenants and residents: response times, messaging, disputes and expat tenants, for property managers in Saudi Arabia.',
      ar: 'التواصل مع المستأجرين والسكان: سرعة الرد، والمراسلات، والنزاعات، والمستأجرون الوافدون، لمديري العقارات في السعودية.',
    },
    signals: [
      'tenant', 'tenants', 'resident', 'residents', 'communication', 'whatsapp', 'inbox', 'messaging',
      'response time', 'expat', 'tenant app', 'screening', 'tenant screening', 'retention', 'self-service',
      'lease signing', 'e-signature', 'e-signatures', 'tenancy', 'tenancies',
    ],
  },
  {
    key: 'growth-strategy',
    label: { en: 'Growth & strategy', ar: 'النمو والاستراتيجية' },
    description: {
      en: 'Growing a property management business: pricing your services, scaling a portfolio, systems, revenue and the Saudi market.',
      ar: 'تنمية نشاط إدارة العقارات: تسعير خدماتك، وتوسيع المحفظة، والأنظمة، والإيرادات، والسوق السعودي.',
    },
    signals: [
      'scale', 'scaling', 'growth', 'grow', 'brand', 'branding', 'marketing', 'software', 'automation', 'ai',
      'data', 'metrics', 'spreadsheet', 'technology', 'digital', 'dashboard', 'mobile app', 'onboarding', 'team',
      'access control', 'revenue', 'profit', 'vision 2030',
    ],
  },
] as const

export type TopicKey = (typeof TOPICS)[number]['key']
export const DEFAULT_TOPIC: TopicKey = 'growth-strategy'

const TOPIC_KEYS = new Set<string>(TOPICS.map((t) => t.key))

export function isTopicKey(value: unknown): value is TopicKey {
  return typeof value === 'string' && TOPIC_KEYS.has(value)
}

export function topicLabel(key: TopicKey, locale: Locale): string {
  return TOPICS.find((t) => t.key === key)!.label[locale]
}

/** One line on what the topic covers: the hub page's subtitle and search description. */
export function topicDescription(key: TopicKey, locale: Locale): string {
  return TOPICS.find((t) => t.key === key)!.description[locale]
}

const classifier = createKeywordClassifier(
  Object.fromEntries(TOPICS.map((t) => [t.key, [...t.signals]])) as Record<TopicKey, string[]>,
  { minScore: 3, onTie: 'first' },
)

export interface TopicInput extends ClassifiablePost {
  /** Editor's explicit topic from frontmatter. */
  topic?: string
  category?: string
}

/** Scores per topic, for tests and for explaining a decision. */
export function topicScores(post: TopicInput): Record<TopicKey, number> {
  return classifier.scores(post)
}

export function topicOf(post: TopicInput): TopicKey {
  if (isTopicKey(post.topic)) return post.topic
  if (post.category && /^(tutorials|getting started)$/i.test(post.category.trim())) return 'product-guides'
  return classifier.classify(post) ?? DEFAULT_TOPIC
}
