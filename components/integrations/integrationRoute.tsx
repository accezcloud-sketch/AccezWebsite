import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DetailPage, { type DetailLink, type DetailView } from '@/components/detail/DetailPage'
import { dataView, solutionActions, solutionCta } from '@/components/detail/detailCopy'
import { breadcrumbSchema, HOME_CRUMB } from '@/lib/content/breadcrumbSchema'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import type { Locale } from '@/lib/i18n'
import { solutionByKey } from '@/lib/platform/solutions'
import { subpageBySlug, subpageHref } from '@/lib/platform/subpages'
import { INTEGRATIONS, INTEGRATIONS_HREF, INTEGRATIONS_HUB, integrationBySlug, integrationHref, type Integration } from '@/lib/platform/integrations'
import type { PostAudience } from '@/lib/content/postAudience'

interface PageProps {
  params: Promise<{ integration: string }>
}

const ALL: Record<Locale, { label: string; text: string }> = {
  en: { label: 'All integrations', text: 'Channels, payments, analytics and SMS.' },
  ar: { label: 'كل التكاملات', text: 'القنوات والمدفوعات والتحليلات والرسائل النصية.' },
}

export function integrationMetadata(i: Integration, locale: Locale): Metadata {
  return staticPageMetadata({ route: integrationHref(i.slug), locale, title: i.metaTitle[locale], description: i.metaDescription[locale] })
}

function trail(i: Integration, locale: Locale) {
  return [
    { name: HOME_CRUMB[locale], route: '' },
    { name: INTEGRATIONS_HUB.name[locale], route: INTEGRATIONS_HREF },
    { name: i.name[locale], route: integrationHref(i.slug) },
  ]
}

/** Link cards to integrations (by slug), for any detail page. */
export function integrationLinks(slugs: string[], locale: Locale): DetailLink[] {
  return slugs.map((slug) => {
    const i = integrationBySlug(slug)!
    return { label: i.name[locale], text: i.summary[locale], href: integrationHref(i.slug) }
  })
}

export function integrationView(i: Integration, locale: Locale): DetailView {
  const solutions = i.solutions.map((key) => solutionByKey(key)!)
  const [main, other] = solutions
  const modules = i.modules.map((slug) => {
    const m = subpageBySlug('property-managers', slug)!
    return { label: m.name[locale], text: m.summary[locale], href: subpageHref(m) }
  })
  const siblings = INTEGRATIONS.filter((x) => x.group === i.group && x.slug !== i.slug).map((x) => x.slug)
  // The page's buttons: the main solution's action, then the other solution's (or the main one's pricing).
  const actions = solutionActions(main, locale)
  const secondary = other ? solutionActions(other, locale).primary : actions.secondary
  return {
    // An integration in one solution shows that solution's posts; one in both shows any.
    ...dataView(i, locale, i.solutions.length === 1 ? (i.solutions[0] as PostAudience) : undefined),
    crumbs: trail(i, locale).map((t, n, all) => ({ label: t.name, href: n < all.length - 1 ? t.route || '/' : undefined })),
    primary: actions.primary,
    secondary,
    links: [
      ...modules,
      ...integrationLinks(siblings, locale),
      ...solutions.map((s) => ({ label: s.name[locale], text: s.roleSummary[locale], href: s.href })),
      { ...ALL[locale], href: INTEGRATIONS_HREF },
    ],
    cta: solutionCta(main, locale),
  }
}

/** Everything an /integrations/<integration>/ route exports, for one language. */
export function integrationRoute(locale: Locale) {
  return {
    generateStaticParams: () => INTEGRATIONS.map((i) => ({ integration: i.slug })),
    generateMetadata: async ({ params }: PageProps): Promise<Metadata> => {
      const i = integrationBySlug((await params).integration)
      return i ? integrationMetadata(i, locale) : {}
    },
    Page: async function IntegrationPage({ params }: PageProps) {
      const i = integrationBySlug((await params).integration)
      if (!i) notFound()
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(trail(i, locale), locale)) }} />
          <main className="min-h-screen">
            <Header />
            <DetailPage {...integrationView(i, locale)} />
            <Footer locale={locale} />
          </main>
        </>
      )
    },
  }
}
