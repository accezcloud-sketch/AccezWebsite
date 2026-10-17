import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Ecosystem from '@/components/Ecosystem'
import Trust from '@/components/Trust'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BlogStrip from '@/components/blog/BlogStrip'
import PricingOverview from '@/components/pricing/PricingOverview'
import SolutionChapter from '@/components/home/SolutionChapter'
import { SOLUTION_SHOWCASE } from '@/components/home/solutionShowcase'
import type { Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'

/**
 * The homepage, shared by / and /ar/.
 *
 * Platform first, then one chapter per solution, then what is common to all
 * of them. The order of the chapters is the order of PLATFORM_SOLUTIONS.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Ecosystem />
      {PLATFORM_SOLUTIONS.map((solution, i) => {
        const Showcase = SOLUTION_SHOWCASE[solution.key]
        return (
          <SolutionChapter key={solution.key} solution={solution} index={i} locale={locale}>
            <Showcase />
          </SolutionChapter>
        )
      })}
      <Trust />
      <PricingOverview locale={locale} />
      <FAQ />
      <BlogStrip locale={locale} />
      <Contact />
      <Footer />
    </main>
  )
}
