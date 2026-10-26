'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'
import { CATEGORY_KEYS, FAQS, type FaqCategory } from '@/lib/content/faqs'

const CATEGORY_TRANSLATION_KEY: Record<FaqCategory, string> = {
  gettingStarted: 'catGettingStarted',
  channelsIntegrations: 'catChannels',
  pricingBilling: 'catPricing',
  serviceMarketplace: 'catMarketplace',
  securityData: 'catSecurity',
}

/**
 * Frequently asked questions. A section (`h2`) on the homepage; the page's
 * subject (`h1`) on /faq.
 */
export default function FAQ({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel
  const { t, language, isRTL } = useLanguage()
  const tf = t.faq as Record<string, string>

  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'all'>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory)

  // FAQPage structured data was removed here, for two independent reasons:
  //
  //  1. The feature is gone. Google restricted FAQ rich results to government
  //     and health sites in September 2023, stopped showing them entirely on
  //     7 May 2026, and removed the documentation in June 2026. The markup
  //     produced nothing in Search.
  //  2. It never reached the HTML anyway. It was injected with next/script,
  //     which runs client-side, so `FAQPage` did not appear in the built
  //     output at all and was invisible to every non-rendering crawler.
  //
  // The FAQ *content* below is untouched and still valuable — it answers real
  // buyer questions and is exactly the kind of passage AI answers retrieve.
  // Only the dead markup is gone.

  const allCategories: Array<{ key: FaqCategory | 'all'; label: string }> = [
    { key: 'all', label: tf.catAll },
    ...CATEGORY_KEYS.map((key) => ({
      key,
      label: tf[CATEGORY_TRANSLATION_KEY[key]],
    })),
  ]

  return (
    <>
      <section
        id="faq"
        className="relative py-20 px-4 sm:px-6 lg:px-12 overflow-hidden"
        style={{ background: 'var(--section-bg, var(--bg))' }}
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgb(var(--accent-rgb) / 0.05) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4"><span className="ui-chip">{tf.eyebrow}</span></div>

            <Heading
              className="hero-display text-strong text-center leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              {tf.titleLead}{' '}
              <span className="grad-text">
                {tf.titleAccent}
              </span>
            </Heading>

            <p
              className="text-muted text-center leading-relaxed"
              style={{ fontSize: 17 }}
            >
              {tf.helpText}{' '}
              <a
                href={localeHref("/#contact", language)}
                className="text-accent-hi hover:text-strong underline underline-offset-2 transition-colors"
              >
                {tf.helpLink}
              </a>
            </p>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allCategories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key)
                  setOpenIndex(null)
                }}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  activeCategory === key
                    ? {
                        background: 'rgb(var(--accent-rgb) / 0.18)',
                        border: '1px solid rgb(var(--accent-rgb) / 0.4)',
                        color: 'var(--accent-hi)',
                      }
                    : {
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                      }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Accordion list */}
          <div className="flex flex-col gap-2">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={faq.question}>
                  <div
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOpen ? 'rgb(var(--accent-rgb) / 0.06)' : 'rgb(var(--fg-rgb) / 0.03)',
                      border: isOpen
                        ? '1px solid rgb(var(--accent-rgb) / 0.25)'
                        : '1px solid var(--border)',
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-[rgb(var(--fg-rgb)/0.03)]"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--accent)' }}
                        />
                        <span
                          className="font-medium text-strong leading-snug"
                          style={{ fontSize: 15 }}
                        >
                          {language === 'ar' ? faq.questionAr : faq.question}
                        </span>
                      </div>

                      <span
                        className="flex-shrink-0 text-faint"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .25s cubic-bezier(.21,.47,.32,.98)' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Always rendered, so every answer is in the static HTML for
                        search engines and AI crawlers; collapsed answers fold
                        to zero height (CSS) and are hidden from assistive tech. */}
                    <div
                      id={`faq-answer-${index}`}
                      data-open={isOpen}
                      className="motion-collapse"
                      style={{ ['--motion-dur' as string]: '.32s' }}
                      aria-hidden={!isOpen}
                    >
                      <div>
                        <div className={`pb-5 pt-1 ${isRTL ? 'pr-11 pl-5' : 'pl-11 pr-5'}`}>
                          <p
                            className="text-muted leading-relaxed"
                            style={{ fontSize: 14.5 }}
                          >
                            {language === 'ar' ? faq.answerAr : faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12">
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-6 py-5"
              style={{
                background: 'rgb(var(--accent-rgb) / 0.07)',
                border: '1px solid rgb(var(--accent-rgb) / 0.18)',
              }}
            >
              <div className="text-center sm:text-start">
                <p className="text-strong font-semibold text-sm">
                  {tf.bottomCtaTitle}
                </p>
              </div>
              <a
                href={localeHref("/#contact", language)}
                className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-solid), var(--accent-solid-hover))',
                  boxShadow: '0 0 0 1px var(--accent-ring), 0 4px 16px rgb(var(--accent-rgb) / 0.3)',
                }}
              >
                {tf.bottomCtaButton}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                >
                  <path
                    d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
