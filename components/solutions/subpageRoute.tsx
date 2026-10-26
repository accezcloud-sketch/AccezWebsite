import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DetailPage, { type DetailView } from '@/components/detail/DetailPage'
import { dataView, solutionActions, solutionCta, solutionLinks } from '@/components/detail/detailCopy'
import { breadcrumbSchema, HOME_CRUMB } from '@/lib/content/breadcrumbSchema'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import type { Locale } from '@/lib/i18n'
import { solutionByKey } from '@/lib/platform/solutions'
import { integrationLinks } from '@/components/integrations/integrationRoute'
import { SOLUTION_SUBPAGES, subpageBySlug, subpageHref, subpagesOf, type SolutionSubpage } from '@/lib/platform/subpages'

interface PageProps {
  params: Promise<{ solution: string; page: string }>
}

export function subpageMetadata(page: SolutionSubpage, locale: Locale): Metadata {
  return staticPageMetadata({ route: subpageHref(page), locale, title: page.metaTitle[locale], description: page.metaDescription[locale] })
}

/** The trail Home > solution > page, for the visible breadcrumbs and the structured data. */
function trail(page: SolutionSubpage, locale: Locale) {
  const solution = solutionByKey(page.solution)!
  return [
    { name: HOME_CRUMB[locale], route: '' },
    { name: solution.name[locale], route: solution.href },
    { name: page.name[locale], route: subpageHref(page) },
  ]
}

export function subpageView(page: SolutionSubpage, locale: Locale): DetailView {
  const solution = solutionByKey(page.solution)!
  const modules = page.modules.map((slug) => {
    const m = subpageBySlug(page.solution, slug)!
    return { label: m.name[locale], text: m.summary[locale], href: subpageHref(m) }
  })
  // A customer page without modules of its own points to the other kinds of customer instead.
  const siblings = page.kind === 'audience' && modules.length === 0
    ? subpagesOf(page.solution, 'audience').filter((p) => p.slug !== page.slug).map((p) => ({ label: p.name[locale], text: p.summary[locale], href: subpageHref(p) }))
    : []
  return {
    ...dataView(page, locale),
    crumbs: trail(page, locale).map((t, i, all) => ({ label: t.name, href: i < all.length - 1 ? t.route || '/' : undefined })),
    ...solutionActions(solution, locale),
    links: [...modules, ...integrationLinks(page.integrations, locale), ...siblings, ...solutionLinks(solution, locale)],
    cta: solutionCta(solution, locale),
  }
}

/** Everything a /solutions/<solution>/<page>/ route exports, for one language. */
export function subpageRoute(locale: Locale) {
  return {
    generateStaticParams: () => SOLUTION_SUBPAGES.map((p) => ({ solution: p.solution, page: p.slug })),
    generateMetadata: async ({ params }: PageProps): Promise<Metadata> => {
      const { solution, page } = await params
      const p = subpageBySlug(solution, page)
      return p ? subpageMetadata(p, locale) : {}
    },
    Page: async function SolutionSubpageRoute({ params }: PageProps) {
      const { solution, page } = await params
      const p = subpageBySlug(solution, page)
      if (!p) notFound()
      return (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(trail(p, locale), locale)) }} />
          <main className="min-h-screen">
            <Header />
            <DetailPage {...subpageView(p, locale)} />
            <Footer locale={locale} />
          </main>
        </>
      )
    },
  }
}
