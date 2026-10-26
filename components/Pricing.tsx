'use client'

import { useState } from 'react'
import { localeHref, type Locale } from '@/lib/i18n'
import { translations } from '@/translations'
import { PM_PLAN_PRICES, formatSar } from '@/lib/content/pmPlans'

interface Feature {
  textKey: string
  highlight?: boolean
  suffixKey?: string
  excluded?: boolean
}

interface PlanConfig {
  id: string
  nameKey: 'free' | 'basic' | 'professional' | 'enterprise'
  descKey: 'freeDescription' | 'basicDescription' | 'professionalDescription' | 'enterpriseDescription'
  monthly: number | 'Custom'
  yearly: number | 'Custom'
  highlight: boolean
  accentColor: string
  borderColor: string
  bgColor: string
  glowShadow: string
  ctaStyle: 'primary' | 'secondary'
  ctaLabelKey: 'startFree' | 'getStarted' | 'contactSales'
  ctaHref: string
  features: Feature[]
  missing: Feature[]
  mobileOrder: string
  desktopOrder: string
}

const PLANS: PlanConfig[] = [
  {
    id: 'free',
    nameKey: 'free',
    descKey: 'freeDescription',
    ...PM_PLAN_PRICES.free,
    highlight: false,
    accentColor: 'var(--accent)',
    borderColor: 'var(--card-border)',
    bgColor: 'var(--card-bg)',
    glowShadow: 'inset 0 1px 0 var(--card-highlight), 0 0 0 1px var(--card-ring), 0 10px 30px rgb(var(--shadow-rgb) / calc(0.22 * var(--shadow-k)))',
    ctaStyle: 'secondary',
    ctaLabelKey: 'startFree',
    ctaHref: 'https://portal.accez.cloud/sign-up',
    features: [
      { textKey: 'freeProperty1', highlight: true },
      { textKey: 'freeCheckIns10', highlight: true },
      { textKey: 'freeWorkOrders10', highlight: true },
      { textKey: 'freeBasicDashboard' },
      { textKey: 'propertyManagement' },
    ],
    missing: [{ textKey: 'freeNoPremiumSupport', excluded: true }],
    mobileOrder: 'order-2',
    desktopOrder: 'md:order-1',
  },
  {
    id: 'basic',
    nameKey: 'basic',
    descKey: 'basicDescription',
    ...PM_PLAN_PRICES.basic,
    highlight: false,
    accentColor: 'var(--accent)',
    borderColor: 'var(--card-border)',
    bgColor: 'var(--card-bg)',
    glowShadow: 'inset 0 1px 0 var(--card-highlight), 0 0 0 1px var(--card-ring), 0 10px 30px rgb(var(--shadow-rgb) / calc(0.22 * var(--shadow-k)))',
    ctaStyle: 'secondary',
    ctaLabelKey: 'getStarted',
    ctaHref: 'https://portal.accez.cloud/sign-up',
    features: [
      { textKey: 'properties3', highlight: true, suffixKey: 'unitsEach' },
      { textKey: 'propertyManagement' },
      { textKey: 'workOrdersManagement' },
      { textKey: 'moveInOutTracking' },
    ],
    missing: [],
    mobileOrder: 'order-3',
    desktopOrder: 'md:order-2',
  },
  {
    id: 'professional',
    nameKey: 'professional',
    descKey: 'professionalDescription',
    ...PM_PLAN_PRICES.professional,
    highlight: true,
    accentColor: 'var(--accent)',
    borderColor: 'rgb(var(--accent-rgb) / 0.4)',
    bgColor: 'rgb(var(--accent-rgb) / 0.06)',
    glowShadow: '0 0 0 1px rgb(var(--accent-rgb) / 0.2), 0 20px 60px rgb(var(--accent-rgb) / 0.2), 0 4px 16px rgb(var(--shadow-rgb) / calc(0.3 * var(--shadow-k)))',
    ctaStyle: 'primary',
    ctaLabelKey: 'getStarted',
    ctaHref: 'https://portal.accez.cloud/sign-up',
    features: [
      { textKey: 'everythingInBasic' },
      { textKey: 'properties6', highlight: true, suffixKey: 'unitsEach' },
      { textKey: 'upTo3Channels', highlight: true },
      { textKey: 'integratedCommunications' },
      { textKey: 'autoCalendarSync' },
    ],
    missing: [],
    mobileOrder: 'order-1',
    desktopOrder: 'md:order-3',
  },
  {
    id: 'enterprise',
    nameKey: 'enterprise',
    descKey: 'enterpriseDescription',
    monthly: 'Custom',
    yearly: 'Custom',
    highlight: false,
    accentColor: 'var(--accent)',
    borderColor: 'var(--card-border)',
    bgColor: 'var(--card-bg)',
    glowShadow: 'inset 0 1px 0 var(--card-highlight), 0 0 0 1px var(--card-ring), 0 10px 30px rgb(var(--shadow-rgb) / calc(0.22 * var(--shadow-k)))',
    ctaStyle: 'secondary',
    ctaLabelKey: 'contactSales',
    ctaHref: '/#contact',
    features: [
      { textKey: 'everythingInProfessional' },
      { textKey: 'dedicatedAccountManager' },
      { textKey: 'prioritySupport' },
      { textKey: 'customDevelopment' },
      { textKey: 'bulkDataImport' },
    ],
    missing: [],
    mobileOrder: 'order-4',
    desktopOrder: 'md:order-4',
  },
]

/**
 * Property-manager plans. On the homepage this is one section (`h2`); on the
 * Pricing page it is the page's subject, so its title is the `h1`.
 */
export default function Pricing({ headingLevel = 'h2', locale }: { headingLevel?: 'h1' | 'h2'; locale: Locale }) {
  const Heading = headingLevel
  const [isYearly, setIsYearly] = useState(false)
  // Whether the visitor has used the monthly/yearly switch (only then do prices animate).
  const [switched, setSwitched] = useState(false)
  const language = locale
  const isRTL = locale === 'ar'
  const t = translations[locale]
  const tp = t.pricing as Record<string, string>

  const getText = (key: string) => tp[key] ?? key

  const formatPrice = (amount: number) => formatSar(amount, language)

  return (
    <section
      className="py-20 pricing-section"
      id="pricing"
      style={{ background: 'var(--section-bg, var(--bg))' }}
    >
      <style>{`
        @media (max-width: 767px) {
          .pricing-card-highlight {
            transform: none !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div>
          <div className="text-center mb-10">
            {/* Eyebrow */}
            <div className="flex justify-center mb-4"><span className="ui-chip">{tp.eyebrow}</span></div>

            {/* Main heading */}
            <Heading
              className="hero-display text-strong text-center leading-tight tracking-tight mb-3"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              {tp.titleLead}{' '}
              <span className="grad-text">
                {tp.titleAccent}
              </span>
            </Heading>

            {/* Subtitle */}
            <p
              className="text-muted text-center max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ fontSize: 17 }}
            >
              {tp.newSubtitle}
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: !isYearly ? 'var(--text-strong)' : 'var(--text-faint)' }}
              >
                {tp.monthly}
              </span>

              <button
                onClick={() => {
                  setIsYearly(!isYearly)
                  setSwitched(true)
                }}
                className="relative w-14 h-7 rounded-full flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{
                  background: isYearly
                    ? 'linear-gradient(135deg, var(--accent-solid), var(--accent-solid-hover))'
                    : 'rgb(var(--fg-rgb) / 0.1)',
                  border: '1px solid var(--border-hi)',
                  transition: 'background 0.3s ease',
                }}
                role="switch"
                aria-checked={isYearly}
                aria-label="Toggle yearly billing"
              >
                <span
                  className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md"
                  style={{ transform: `translateX(${isYearly ? 28 : 0}px)`, transition: 'transform .25s cubic-bezier(.34,1.3,.64,1)' }}
                />
              </button>

              <span
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: isYearly ? 'var(--text-strong)' : 'var(--text-faint)' }}
              >
                {tp.yearly}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto items-start">
          {PLANS.map((plan) => {
            const price = isYearly ? plan.yearly : plan.monthly
            const isCustom = price === 'Custom'
            const periodLabel = isYearly ? tp.perYear : tp.perMonth

            return (
              <div
                key={plan.id}
                className={`${plan.mobileOrder} ${plan.desktopOrder} ${plan.highlight ? 'pricing-card-highlight' : ''}`}
              >
                <div
                  className="ui-card relative flex flex-col overflow-hidden h-full"
                  style={{
                    // The recommended plan sits slightly forward of the others.
                    transform: plan.highlight ? 'translateY(-8px) scale(1.03)' : undefined,
                    background: plan.bgColor,
                    border: `1px solid ${plan.borderColor}`,
                    boxShadow: plan.glowShadow,
                  }}
                >
                  {/* Accent top border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: plan.highlight
                        ? 'linear-gradient(90deg, var(--accent-solid), var(--accent-hi))'
                        : 'linear-gradient(90deg, rgb(var(--accent-rgb) / 0.4), transparent)',
                    }}
                  />

                  {/* Most Popular badge */}
                  {plan.highlight && (
                    <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase"
                        style={{
                          background: 'rgb(var(--accent-rgb) / 0.15)',
                          border: '1px solid rgb(var(--accent-rgb) / 0.35)',
                          color: 'var(--accent-hi)',
                        }}
                      >
                        {tp.popular}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 sm:gap-5 p-5 sm:p-7 flex-1">
                    {/* Plan name + description */}
                    <div>
                      <h3
                        className="font-bold text-strong mb-1.5"
                        style={{ fontSize: 18 }}
                      >
                        {getText(plan.nameKey)}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {getText(plan.descKey)}
                      </p>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-end gap-1.5">
                        {!isCustom ? (
                          <>
                            <span
                              className="text-strong font-bold leading-none"
                              style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
                            >
                              {/* The first price is in the static HTML, still; only a
                                  monthly/yearly switch animates the new price in. */}
                              <span
                                key={`${plan.id}-${isYearly}-${language}`}
                                className={switched ? 'motion-swap' : undefined}
                                style={{ display: 'inline-block' }}
                              >
                                {formatPrice(price)}
                              </span>
                            </span>
                            <span className="text-faint text-sm mb-1.5 leading-none">
                              {periodLabel}
                            </span>
                          </>
                        ) : (
                          <span
                            className="font-bold text-strong leading-none"
                            style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}
                          >
                            {tp.tailored}
                          </span>
                        )}
                      </div>
                    </div>


                    {/* CTA */}
                    <a
                      href={plan.ctaHref.startsWith('/') ? localeHref(plan.ctaHref, language) : plan.ctaHref}
                      {...(plan.ctaHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={
                        plan.ctaStyle === 'primary'
                          ? {
                              background: 'linear-gradient(135deg, var(--accent-solid), var(--accent-solid-hover))',
                              color: 'var(--on-accent)',
                              boxShadow: '0 0 0 1px var(--accent-ring), 0 4px 20px rgb(var(--accent-rgb) / 0.35)',
                            }
                          : {
                              background: 'var(--surface-hi)',
                              border: '1px solid var(--border-hi)',
                              color: 'var(--text-soft)',
                            }
                      }
                    >
                      {getText(plan.ctaLabelKey)}
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

                    {/* Divider */}
                    <div
                      className="h-px w-full"
                      style={{ background: 'var(--surface-hi)' }}
                    />

                    {/* Feature list */}
                    <ul className="flex flex-col gap-2.5 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature.textKey} className="flex items-start gap-2.5">
                          <span
                            className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: plan.highlight
                                ? 'rgb(var(--accent-rgb) / 0.15)'
                                : 'rgba(16,185,129,0.12)',
                            }}
                          >
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path
                                d="M1.5 4.5l2 2 4-4"
                                stroke="var(--accent-hi)"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="text-soft text-sm leading-snug">
                            {feature.highlight ? (
                              <>
                                <strong className="text-strong">{getText(feature.textKey)}</strong>
                                {feature.suffixKey && <span> {getText(feature.suffixKey)}</span>}
                              </>
                            ) : (
                              getText(feature.textKey)
                            )}
                          </span>
                        </li>
                      ))}

                      {plan.missing.map((feature) => (
                        <li
                          key={feature.textKey}
                          className="flex items-start gap-2.5 opacity-35"
                        >
                          <span
                            className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'var(--surface-hi)' }}
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path
                                d="M2 2l4 4M6 2L2 6"
                                stroke="var(--text-faint)"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <span className="text-faint text-sm leading-snug line-through">
                            {getText(feature.textKey)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
