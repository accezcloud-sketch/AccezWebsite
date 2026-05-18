'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

interface Feature {
  textKey: string
  highlight: boolean
  suffixKey?: string
  excluded?: boolean
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const { t } = useLanguage()

  const plans = [
    {
      nameKey: 'free',
      icon: 'gift',
      monthly: {
        price: 0,
        originalPrice: null,
        periodKey: '',
        billingNoteKey: 'noCreditCard',
      },
      yearly: {
        price: 0,
        originalPrice: null,
        periodKey: '',
        billingNoteKey: 'noCreditCard',
      },
      discountKey: null,
      features: [
        { textKey: 'freeProperty1', highlight: true },
        { textKey: 'freeUnlimitedServices', highlight: true },
        { textKey: 'freeCheckIns10', highlight: true },
        { textKey: 'freeWorkOrders10', highlight: true },
        { textKey: 'freeBasicDashboard', highlight: false },
        { textKey: 'propertyManagement', highlight: false },
        { textKey: 'announcements', highlight: false },
        { textKey: 'freeNoPremiumSupport', highlight: false, excluded: true },
      ] as Feature[],
      popular: false,
      isFree: true,
    },
    {
      nameKey: 'basic',
      icon: 'check',
      monthly: {
        price: 10,
        originalPrice: 20,
        periodKey: '/month',
        billingNoteKey: 'billedMonthly',
      },
      yearly: {
        price: 120,
        originalPrice: 240,
        periodKey: '/year',
        billingNoteKey: 'billedAnnually',
      },
      discountKey: 'launchDiscount',
      features: [
        { textKey: 'properties3', highlight: true, suffixKey: 'unitsEach' },
        { textKey: 'propertyManagement', highlight: false },
        { textKey: 'workOrdersManagement', highlight: false },
        { textKey: 'moveInOutTracking', highlight: false },
        { textKey: 'announcements', highlight: false },
        { textKey: 'tenantPerks', highlight: false },
        { textKey: 'communityNewsFeed', highlight: false },
      ] as Feature[],
      popular: false,
    },
    {
      nameKey: 'professional',
      icon: 'star',
      monthly: {
        price: 40,
        originalPrice: 80,
        periodKey: '/month',
        billingNoteKey: 'billedMonthly',
      },
      yearly: {
        price: 480,
        originalPrice: 960,
        periodKey: '/year',
        billingNoteKey: 'billedAnnually',
      },
      discountKey: 'launchDiscount',
      features: [
        { textKey: 'everythingInBasic', highlight: false },
        { textKey: 'properties6', highlight: true, suffixKey: 'unitsEach' },
        { textKey: 'upTo3Channels', highlight: true },
        { textKey: 'integratedCommunications', highlight: false },
        { textKey: 'amenitiesBooking', highlight: false },
        { textKey: 'servicesManagement', highlight: false },
        { textKey: 'autoCalendarSync', highlight: false },
        { textKey: 'propertyOwnerPortal', highlight: false },
      ] as Feature[],
      popular: true,
    },
    {
      nameKey: 'enterprise',
      icon: 'building',
      monthly: {
        price: 'Custom',
        originalPrice: null,
        periodKey: '',
        billingNoteKey: 'tailored',
      },
      yearly: {
        price: 'Custom',
        originalPrice: null,
        periodKey: '',
        billingNoteKey: 'tailored',
      },
      discountKey: null,
      features: [
        { textKey: 'everythingInProfessional', highlight: false },
        { textKey: 'customBrandedDomain', highlight: false },
        { textKey: 'whiteLabelMobileApp', highlight: false },
        { textKey: 'dedicatedAccountManager', highlight: false },
        { textKey: 'priority247Support', highlight: false },
        { textKey: 'apiAccess', highlight: false },
        { textKey: 'customDevelopment', highlight: false },
        { textKey: 'bulkDataImport', highlight: false },
      ] as Feature[],
      popular: false,
    },
  ]

  const getPlanName = (key: string) => {
    const names: Record<string, string> = {
      free: t.pricing.free,
      basic: t.pricing.basic,
      professional: t.pricing.professional,
      enterprise: t.pricing.enterprise,
    }
    return names[key] || key
  }

  const getFeatureText = (key: string) => {
    return (t.pricing as Record<string, string>)[key] || key
  }

  const getBillingNote = (key: string) => {
    return (t.pricing as Record<string, string>)[key] || key
  }

  const PlanIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'gift':
        return (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
        )
      case 'check':
        return (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case 'star':
        return (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        )
      case 'building':
        return (
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="pricing">
      <div className="container mx-auto px-4">
        <FadeUp>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t.pricing.subtitle}
          </p>

          {/* Monthly/Yearly Toggle */}
          <div className="inline-flex items-center bg-gray-900 rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !isYearly
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isYearly
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t.pricing.yearly}
              <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                {t.pricing.save}
              </span>
            </button>
          </div>
        </div>
        </FadeUp>

        <StaggerGrid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          staggerDelay={0.12}
        >
          {plans.map((plan, index) => {
            const pricing = isYearly ? plan.yearly : plan.monthly
            const isCustom = pricing.price === 'Custom'

            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-gray-900' : 'border border-gray-200'
                }`}
              >
                {/* Popular/Current Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1 text-xs font-bold rounded-b-lg">
                    {isYearly ? t.pricing.popular : t.pricing.current}
                  </div>
                )}

                <div className="p-8 pt-10 text-center">
                  {/* Plan Icon */}
                  <PlanIcon type={plan.icon} />

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {getPlanName(plan.nameKey)}
                  </h3>

                  {/* Pricing */}
                  <div className="mb-2">
                    {pricing.originalPrice && (
                      <div className="text-gray-400 line-through text-lg">
                        ${pricing.originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        {isCustom ? '' : '$'}{pricing.price}
                      </span>
                      {!isCustom && (
                        <span className="text-gray-500 ml-1">{pricing.periodKey}</span>
                      )}
                    </div>
                  </div>

                  {/* Discount Badge */}
                  {plan.discountKey && (
                    <div className="text-emerald-600 text-sm font-semibold mb-1">
                      {t.pricing.launchDiscount}
                    </div>
                  )}

                  {/* Billing Note */}
                  <div className="text-gray-500 text-sm mb-6">
                    {getBillingNote(pricing.billingNoteKey)}
                  </div>

{/* CTA Button */}
{isCustom ? (
  <a
    href="#contact"
    className="block w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-8 text-center bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
  >
    {t.pricing.contactSales}
  </a>
) : (
  <a
    href="https://portal.accez.cloud/sign-up"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-8 text-center bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
  >
    {(plan as { isFree?: boolean }).isFree ? t.pricing.startFree : t.pricing.startFreeTrial}
  </a>
)}


                  {/* Features */}
                  <div className="space-y-4 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        {feature.excluded ? (
                          <svg
                            className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <span className={feature.excluded ? 'text-gray-400' : 'text-gray-700'}>
                          {feature.highlight ? (
                            <>
                              <strong>{getFeatureText(feature.textKey)}</strong>
                              {feature.suffixKey && <span> {getFeatureText(feature.suffixKey)}</span>}
                            </>
                          ) : (
                            getFeatureText(feature.textKey)
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </StaggerGrid>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            {t.pricing.trialNote}
          </p>
        </div>
      </div>
    </section>
  )
}
