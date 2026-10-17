import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SOLUTION_PRICING } from '@/components/pricing/solutionPricing'
import { PLATFORM_SOLUTIONS, solutionByKey } from '@/lib/platform/solutions'
import { solutionPricingMetadata } from '@/lib/platform/pricingPages'

// One pricing page per solution: /pricing/<solution>/.
export const dynamicParams = false

export function generateStaticParams() {
  return PLATFORM_SOLUTIONS.map((s) => ({ solution: s.key }))
}

interface PageProps {
  params: Promise<{ solution: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const solution = solutionByKey((await params).solution)
  return solution ? solutionPricingMetadata(solution, 'en') : {}
}

export default async function SolutionPricingPage({ params }: PageProps) {
  const solution = solutionByKey((await params).solution)
  const Plans = solution && SOLUTION_PRICING[solution.key]
  if (!Plans) notFound()
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Header />
      <div style={{ paddingTop: 'var(--nav-h)' }}>
        <Plans headingLevel="h1" />
      </div>
      <Footer />
    </main>
  )
}
