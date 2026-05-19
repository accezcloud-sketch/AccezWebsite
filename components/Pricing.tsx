'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

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
  monthly: { price: number | 'Custom'; originalPrice: number | null }
  yearly: { price: number | 'Custom'; originalPrice: number | null }
  monthlyAr: { price: number | 'Custom'; originalPrice: number | null }
  yearlyAr: { price: number | 'Custom'; originalPrice: number | null }
  highlight: boolean
  showLaunchDiscount: boolean
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
    monthly: { price: 0, originalPrice: null },
    yearly: { price: 0, originalPrice: null },
    monthlyAr: { price: 0, originalPrice: null },
    yearlyAr: { price: 0, originalPrice: null },
    highlight: false,
    showLaunchDiscount: false,
    accentColor: '#64748b',
    borderColor: 'rgba(255,255,255,0.07)',
    bgColor: 'rgba(255,255,255,0.02)',
    glowShadow: '0 1px 3px rgba(0,0,0,0.2)',
    ctaStyle: 'secondary',
    ctaLabelKey: 'startFree',
    ctaHref: 'https://portal.accez.cloud/sign-up',
    features: [
      { textKey: 'freeProperty1', highlight: true },
      { textKey: 'freeUnlimitedServices', highlight: true },
      { textKey: 'freeCheckIns10', highlight: true },
      { textKey: 'freeWorkOrders10', highlight: true },
      { textKey: 'freeBasicDashboard' },
      { textKey: 'propertyManagement' },
      { textKey: 'announcements' },
    ],
    missing: [{ textKey: 'freeNoPremiumSupport', excluded: true }],
    mobileOrder: 'order-2',
    desktopOrder: 'md:order-1',
  },
  {
    id: 'basic',
    nameKey: 'basic',
    descKey: 'basicDescription',
    monthly: { price: 10, originalPrice: 20 },
    yearly: { price: 120, originalPrice: 240 },
    monthlyAr: { price: 40, originalPrice: 80 },
    yearlyAr: { price: 480, originalPrice: 960 },
    highlight: false,
    showLaunchDiscount: true,
    accentColor: '#0ea5e9',
    borderColor: 'rgba(255,255,255,0.07)',
    bgColor: 'rgba(255,255,255,0.02)',
    glowShadow: '0 1px 3px rgba(0,0,0,0.2)',
    ctaStyle: 'secondary',
    ctaLabelKey: 'getStarted',
    ctaHref: 'https://portal.accez.cloud/sign-up',
    features: [
      { textKey: 'properties3', highlight: true, suffixKey: 'unitsEach' },
      { textKey: 'propertyManagement' },
      { textKey: 'workOrdersManagement' },
      { textKey: 'moveInOutTracking' },
      { textKey: 'announcements' },
      { textKey: 'tenantPerks' },
      { textKey: 'communityNewsFeed' },
    ],
    missing: [],
    mobileOrder: 'order-3',
    desktopOrder: 'md:order-2',
  },
  {
    id: 'professional',
    nameKey: 'professional',
    descKey: 'professionalDescription',
    monthly: { price: 40, originalPrice: 80 },
    yearly: { price: 480, originalPrice: 960 },
    monthlyAr: { price: 150, originalPrice: 300 },
    yearlyAr: { price: 1800, originalPrice: 3600 },
    highlight: true,
    showLaunchDiscount: true,
    accentColor: '#6366f1',
    borderColor: 'rgba(99,102,241,0.4)',
    bgColor: 'rgba(99,102,241,0.06)',
    glowShadow: '0 0 0 1px rgba(99,102,241,0.2), 0 20px 60px rgba(99,102,241,0.2), 0 4px 16px rgba(0,0,0,0.3)',
    ctaStyle: 'primary',
    ctaLabelKey: 'getStarted',
    ctaHref: 'https://portal.accez.cloud/sign-up',
    features: [
      { textKey: 'everythingInBasic' },
      { textKey: 'properties6', highlight: true, suffixKey: 'unitsEach' },
      { textKey: 'upTo3Channels', highlight: true },
      { textKey: 'integratedCommunications' },
      { textKey: 'amenitiesBooking' },
      { textKey: 'servicesManagement' },
      { textKey: 'autoCalendarSync' },
      { textKey: 'propertyOwnerPortal' },
    ],
    missing: [],
    mobileOrder: 'order-1',
    desktopOrder: 'md:order-3',
  },
  {
    id: 'enterprise',
    nameKey: 'enterprise',
    descKey: 'enterpriseDescription',
    monthly: { price: 'Custom', originalPrice: null },
    yearly: { price: 'Custom', originalPrice: null },
    monthlyAr: { price: 'Custom', originalPrice: null },
    yearlyAr: { price: 'Custom', originalPrice: null },
    highlight: false,
    showLaunchDiscount: false,
    accentColor: '#06b6d4',
    borderColor: 'rgba(255,255,255,0.07)',
    bgColor: 'rgba(255,255,255,0.02)',
    glowShadow: '0 1px 3px rgba(0,0,0,0.2)',
    ctaStyle: 'secondary',
    ctaLabelKey: 'contactSales',
    ctaHref: '#contact',
    features: [
      { textKey: 'everythingInProfessional' },
      { textKey: 'customBrandedDomain' },
      { textKey: 'whiteLabelMobileApp' },
      { textKey: 'dedicatedAccountManager' },
      { textKey: 'priority247Support' },
      { textKey: 'apiAccess' },
      { textKey: 'customDevelopment' },
      { textKey: 'bulkDataImport' },
    ],
    missing: [],
    mobileOrder: 'order-4',
    desktopOrder: 'md:order-4',
  },
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const { t, isRTL, language } = useLanguage()
  const tp = t.pricing as Record<string, string>

  const getText = (key: string) => tp[key] ?? key

  const formatPrice = (amount: number) =>
    language === 'ar' ? `${amount} ريال` : `$${amount}`

  return (
    <section
      className="py-20 pricing-section"
      id="pricing"
      style={{ background: '#080c18' }}
    >
      <style>{`
        @media (max-width: 767px) {
          .pricing-card-highlight {
            transform: none !important;
          }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <FadeUp>
          <div className="text-center mb-10">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to left, transparent, #6366f1)'
                  : 'linear-gradient(to right, transparent, #6366f1)' }}
              />
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: '#818cf8' }}
              >
                {tp.eyebrow}
              </span>
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to right, transparent, #6366f1)'
                  : 'linear-gradient(to left, transparent, #6366f1)' }}
              />
            </div>

            {/* Main heading */}
            <h2
              className="text-white font-bold text-center leading-tight tracking-tight mb-3"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontFamily: 'var(--font-manrope), var(--font-inter), system-ui, sans-serif',
                fontWeight: 800,
              }}
            >
              {tp.titleLead}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {tp.titleAccent}
              </span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-slate-400 text-center max-w-lg mx-auto mb-10 leading-relaxed"
              style={{ fontSize: 17 }}
            >
              {tp.newSubtitle}
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: !isYearly ? '#f1f5f9' : '#64748b' }}
              >
                {tp.monthly}
              </span>

              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-14 h-7 rounded-full flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{
                  background: isYearly
                    ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                    : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'background 0.3s ease',
                }}
                role="switch"
                aria-checked={isYearly}
                aria-label="Toggle yearly billing"
              >
                <motion.span
                  className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md"
                  animate={{ x: isYearly ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              </button>

              <span
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: isYearly ? '#f1f5f9' : '#64748b' }}
              >
                {tp.yearly}
              </span>
            </div>
          </div>
        </FadeUp>

        <StaggerGrid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-7xl mx-auto items-start"
          staggerDelay={0.12}
        >
          {PLANS.map((plan) => {
            const pricing = language === 'ar'
              ? (isYearly ? plan.yearlyAr : plan.monthlyAr)
              : (isYearly ? plan.yearly : plan.monthly)
            const isCustom = pricing.price === 'Custom'
            const periodLabel = isYearly ? tp.perYear : tp.perMonth

            return (
              <motion.div
                key={plan.id}
                variants={staggerItem}
                className={`${plan.mobileOrder} ${plan.desktopOrder} ${plan.highlight ? 'pricing-card-highlight' : ''}`}
              >
                <motion.div
                  className="relative flex flex-col rounded-2xl overflow-hidden h-full"
                  animate={{
                    scale: plan.highlight ? 1.03 : 1,
                    y: plan.highlight ? -8 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  style={{
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
                        ? 'linear-gradient(90deg, #6366f1, #818cf8, #a78bfa)'
                        : `linear-gradient(90deg, ${plan.accentColor}66, transparent)`,
                    }}
                  />

                  {/* Most Popular badge */}
                  {plan.highlight && (
                    <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase"
                        style={{
                          background: 'rgba(99,102,241,0.15)',
                          border: '1px solid rgba(99,102,241,0.35)',
                          color: '#818cf8',
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
                        className="font-bold text-white mb-1.5"
                        style={{ fontSize: 18 }}
                      >
                        {getText(plan.nameKey)}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {getText(plan.descKey)}
                      </p>
                    </div>

                    {/* Price */}
                    <div>
                      {!isCustom && pricing.originalPrice && (
                        <div className="text-slate-500 line-through text-base mb-1">
                          {formatPrice(pricing.originalPrice)}
                        </div>
                      )}
                      <div className="flex items-end gap-1.5">
                        {!isCustom ? (
                          <>
                            <span
                              className="text-white font-bold leading-none"
                              style={{ fontSize: 'clamp(36px, 5vw, 48px)' }}
                            >
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={`${plan.id}-${isYearly}-${language}`}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  transition={{ duration: 0.18 }}
                                  style={{ display: 'inline-block' }}
                                >
                                  {formatPrice(pricing.price as number)}
                                </motion.span>
                              </AnimatePresence>
                            </span>
                            <span className="text-slate-500 text-sm mb-1.5 leading-none">
                              {periodLabel}
                            </span>
                          </>
                        ) : (
                          <span
                            className="font-bold text-white leading-none"
                            style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}
                          >
                            {tp.tailored}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Launch discount callout */}
                    {plan.showLaunchDiscount && (
                      <div
                        className="text-xs font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          background: 'rgba(16,185,129,0.08)',
                          border: '1px solid rgba(16,185,129,0.18)',
                          color: '#34d399',
                        }}
                      >
                        {tp.launchDiscount}
                      </div>
                    )}

                    {/* CTA */}
                    <a
                      href={plan.ctaHref}
                      {...(plan.ctaHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={
                        plan.ctaStyle === 'primary'
                          ? {
                              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                              color: '#fff',
                              boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                            }
                          : {
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#cbd5e1',
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
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />

                    {/* Feature list */}
                    <ul className="flex flex-col gap-2.5 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature.textKey} className="flex items-start gap-2.5">
                          <span
                            className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: plan.highlight
                                ? 'rgba(99,102,241,0.15)'
                                : 'rgba(16,185,129,0.12)',
                            }}
                          >
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path
                                d="M1.5 4.5l2 2 4-4"
                                stroke={plan.highlight ? '#818cf8' : '#34d399'}
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="text-slate-300 text-sm leading-snug">
                            {feature.highlight ? (
                              <>
                                <strong className="text-white">{getText(feature.textKey)}</strong>
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
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                          >
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                              <path
                                d="M2 2l4 4M6 2L2 6"
                                stroke="#64748b"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          <span className="text-slate-500 text-sm leading-snug line-through">
                            {getText(feature.textKey)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </StaggerGrid>

      </div>
    </section>
  )
}
