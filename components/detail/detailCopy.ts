/**
 * The wording every detail page shares (section titles and the per-solution
 * actions), and helpers to resolve detail data into a page's language.
 */
import { getPostsForPage } from '@/lib/blog'
import type { PostAudience } from '@/lib/content/postAudience'
import { RIYADH_CENTRE, SHOPPING_CENTRE } from '@/components/hero/photos'
import type { HeroBackdrop } from '@/components/hero/CenteredHero'
import type { HeroAction } from '@/components/hero/HeroActions'
import type { DetailPageData } from '@/lib/platform/detailPages'
import type { PlatformSolution } from '@/lib/platform/solutions'
import { MODULES_COPY } from '@/lib/content/modulesCopy'
import { localeHref, type Locale } from '@/lib/i18n'
import type { DetailLink, DetailView } from './DetailPage'

export const DETAIL_COPY = {
  en: {
    points: 'What you get',
    faq: 'Common questions',
    links: 'Keep exploring',
    posts: 'Related reading',
    pricing: 'Plans and pricing',
    seePricing: 'See plans and pricing',
    overview: 'Overview',
  },
  ar: {
    points: 'ما تحصل عليه',
    faq: 'أسئلة شائعة',
    links: 'اكتشف المزيد',
    posts: 'مقالات ذات صلة',
    pricing: 'الخطط والأسعار',
    seePricing: 'اطّلع على الخطط والأسعار',
    overview: 'نظرة عامة',
  },
} as const

/** The closing call to action of each solution's pages (wording from its main page). */
const SOLUTION_CTA: Record<string, Record<Locale, { title: string; subtitle: string }> & { photo: HeroBackdrop }> = {
  'property-managers': {
    en: { title: MODULES_COPY.en.ctaTitle, subtitle: MODULES_COPY.en.ctaSub },
    ar: { title: MODULES_COPY.ar.ctaTitle, subtitle: MODULES_COPY.ar.ctaSub },
    photo: RIYADH_CENTRE,
  },
  'service-providers': {
    en: { title: 'Ready to take bookings?', subtitle: 'Create your provider account and add your services.' },
    ar: { title: 'مستعد لاستقبال الحجوزات؟', subtitle: 'أنشئ حساب مقدم الخدمة وأضف خدماتك.' },
    photo: SHOPPING_CENTRE,
  },
}

export function solutionCta(solution: PlatformSolution, locale: Locale): DetailView['cta'] {
  const c = SOLUTION_CTA[solution.key]
  return { ...c[locale], photo: c.photo }
}

/** A solution's main action and its pricing page, as the two buttons of a page. */
export function solutionActions(solution: PlatformSolution, locale: Locale): { primary: HeroAction; secondary: HeroAction } {
  const a = solution.primaryAction
  return {
    primary: { label: a.label[locale], href: a.external ? a.href : localeHref(a.href, locale), external: a.external },
    secondary: { label: DETAIL_COPY[locale].seePricing, href: localeHref(solution.pricingHref, locale) },
  }
}

/** Link cards to a solution's pricing page and main page. */
export function solutionLinks(solution: PlatformSolution, locale: Locale): DetailLink[] {
  return [
    { label: DETAIL_COPY[locale].pricing, text: solution.pricingNote[locale], href: solution.pricingHref },
    { label: solution.name[locale], text: solution.roleSummary[locale], href: solution.href },
  ]
}

/** What a detail page is about, in the English words its blog posts are matched on. */
export function pageSubject(page: DetailPageData): string {
  return [page.name.en, page.summary.en, page.metaTitle.en, page.hero.title.en, page.hero.subtitle.en, ...page.points.map((p) => p.title.en)].join('. ')
}

/** The parts of a view that come straight from the page's data. */
/** `audience`: whose blog posts to show; omit when the page serves both solutions. */
export function dataView(page: DetailPageData, locale: Locale, audience?: PostAudience) {
  const c = DETAIL_COPY[locale]
  return {
    locale,
    title: page.hero.title[locale],
    accent: page.hero.accent?.[locale],
    subtitle: page.hero.subtitle[locale],
    shots: page.shots.map((s) => ({ shot: s.shot, title: s.title[locale], text: s.text[locale] })),
    pointsTitle: c.points,
    points: page.points.map((p) => ({ icon: p.icon, title: p.title[locale], text: p.text[locale] })),
    faqTitle: c.faq,
    faqs: page.faqs.map((f) => ({ q: f.q[locale], a: f.a[locale] })),
    linksTitle: c.links,
    postsTitle: c.posts,
    posts: getPostsForPage({ about: pageSubject(page), audience, pinned: page.posts }),
  }
}
