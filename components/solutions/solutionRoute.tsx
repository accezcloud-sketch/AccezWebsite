import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS, solutionByKey } from '@/lib/platform/solutions'
import { SOLUTION_PAGES, solutionPageMetadata } from './solutionPages'

interface PageProps {
  params: Promise<{ solution: string }>
}

/** Everything a /solutions/<solution>/ route exports, for one language. */
export function solutionRoute(locale: Locale) {
  return {
    generateStaticParams: () => PLATFORM_SOLUTIONS.map((s) => ({ solution: s.key })),
    generateMetadata: async ({ params }: PageProps): Promise<Metadata> => {
      const solution = solutionByKey((await params).solution)
      return solution ? solutionPageMetadata(solution, locale) : {}
    },
    Page: async function SolutionPage({ params }: PageProps) {
      const solution = solutionByKey((await params).solution)
      const page = solution && SOLUTION_PAGES[solution.key]
      if (!page) notFound()
      const { Page: Content, schema } = page
      return (
        <>
          {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema(locale, solution.pageDescription[locale])) }} />}
          <main className="min-h-screen">
            <Header />
            <Content locale={locale} />
            <Footer />
          </main>
        </>
      )
    },
  }
}
