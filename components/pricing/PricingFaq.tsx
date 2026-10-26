import SectionHeader from '@/components/SectionHeader'
import { faqsInCategory, localizedFaq } from '@/lib/content/faqs'
import { localeHref, type Locale } from '@/lib/i18n'
import { translations } from '@/translations'

const ALL_QUESTIONS: Record<Locale, string> = { en: 'See all questions', ar: 'عرض جميع الأسئلة' }

/**
 * The pricing and billing questions from the site FAQ, for the pricing pages.
 * Rendered on the server with every answer open, so the answers are in the
 * page's HTML and visible without a click.
 */
export default function PricingFaq({ locale }: { locale: Locale }) {
  const tf = translations[locale].faq
  return (
    <section id="pricing-faq" className="py-20 px-4" style={{ background: 'var(--section-bg, var(--bg))' }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow={tf.eyebrow} lead={tf.catPricing} className="mb-10" />
        <div className="flex flex-col gap-3">
          {faqsInCategory('pricingBilling').map((item) => {
            const { question, answer } = localizedFaq(item, locale)
            return (
              <div key={item.question} className="ui-card px-5 py-4">
                <h3 className="font-medium text-strong leading-snug mb-2" style={{ fontSize: 15 }}>{question}</h3>
                <p className="text-muted leading-relaxed" style={{ fontSize: 14.5 }}>{answer}</p>
              </div>
            )
          })}
        </div>
        <p className="text-center mt-8">
          <a href={localeHref('/faq', locale)} className="text-accent-hi hover:text-strong underline underline-offset-2 transition-colors text-sm font-medium">
            {ALL_QUESTIONS[locale]}
          </a>
        </p>
      </div>
    </section>
  )
}
