import type { CSSProperties, ReactNode } from 'react'
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
 * Sets the background of the section inside it. Homepage sections alternate
 * between the base and the alternate shade, so each one reads as its own
 * block; the sections themselves keep their usual background elsewhere.
 */
function Band({ shade, children }: { shade: 'base' | 'alt'; children: ReactNode }) {
  const style = {
    '--section-bg': shade === 'alt' ? 'var(--bg-alt)' : 'var(--bg)',
    // Shades already separate the sections; no extra rule between them.
    '--section-border': 'transparent',
  } as CSSProperties
  return <div style={style}>{children}</div>
}

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
      <Band shade="base"><Hero /></Band>
      <Band shade="alt"><Ecosystem /></Band>
      <Band shade="base"><SolutionsShowcase locale={locale} /></Band>
      <Band shade="alt"><Trust /></Band>
      <Band shade="base"><PricingOverview locale={locale} /></Band>
      <Band shade="alt"><FAQ /></Band>
      <Band shade="base"><BlogStrip locale={locale} /></Band>
      <Band shade="alt"><Contact /></Band>
      <Footer />
    </main>
  )
}
