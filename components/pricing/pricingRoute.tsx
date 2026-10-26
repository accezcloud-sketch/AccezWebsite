import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Band from '@/components/ui/Band'
import PricingFaq from '@/components/pricing/PricingFaq'
import { SOLUTION_PRICING } from '@/components/pricing/solutionPricing'
import type { Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS, solutionByKey } from '@/lib/platform/solutions'
import { solutionPricingMetadata } from '@/lib/platform/pricingPages'

interface PageProps {
  params: Promise<{ solution: string }>
}

/** Everything a /pricing/<solution>/ route exports, for one language: the plans, then the pricing FAQ. */
export function pricingRoute(locale: Locale) {
  return {
    generateStaticParams: () => PLATFORM_SOLUTIONS.map((s) => ({ solution: s.key })),
    generateMetadata: async ({ params }: PageProps): Promise<Metadata> => {
      const solution = solutionByKey((await params).solution)
      return solution ? solutionPricingMetadata(solution, locale) : {}
    },
    Page: async function SolutionPricingPage({ params }: PageProps) {
      const solution = solutionByKey((await params).solution)
      const Plans = solution && SOLUTION_PRICING[solution.key]
      if (!Plans) notFound()
      return (
        <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
          <Header />
          <div style={{ paddingTop: 'var(--nav-h)' }}>
            <Plans headingLevel="h1" />
          </div>
          <Band shade="alt"><PricingFaq locale={locale} /></Band>
          <Footer />
        </main>
      )
    },
  }
}
