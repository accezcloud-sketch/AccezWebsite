import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Ecosystem from '@/components/Ecosystem'
import Trust from '@/components/Trust'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import BlogStrip from '@/components/blog/BlogStrip'
import PricingOverview from '@/components/pricing/PricingOverview'
import SolutionsShowcase from '@/components/home/SolutionsShowcase'
import type { Locale } from '@/lib/i18n'

/**
 * The homepage, shared by / and /ar/.
 *
 * The platform first, then a short tour of each solution that leads to its own
 * page, then what all solutions share: integrations, pricing, questions.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Ecosystem />
      <SolutionsShowcase locale={locale} />
      <Trust />
      <PricingOverview locale={locale} />
      <FAQ />
      <BlogStrip locale={locale} />
      <Contact />
      <Footer />
    </main>
  )
}
