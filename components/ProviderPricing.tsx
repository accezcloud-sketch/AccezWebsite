'use client'

import { Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { PROVIDER_SIGN_UP } from '@/lib/links'
import { PROVIDER_PRICING_COPY } from '@/lib/content/providerPricing'
import FadeUp from '@/components/animations/FadeUp'
import RevealLine from '@/components/animations/RevealLine'
import SectionHeader from '@/components/SectionHeader'

/** Service-provider marketplace plans. Used on the Service Providers and Pricing pages. */
export default function ProviderPricing() {
  const { language, isRTL } = useLanguage()
  const p = PROVIDER_PRICING_COPY[language]
  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
            <section id="provider-pricing" className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <SectionHeader eyebrow={p.pricingEyebrow} lead={p.pricingTitleLead} accent={p.pricingTitleAccent} subtitle={p.pricingSubtitle} isRTL={isRTL} />
          </FadeUp>

          <RevealLine className="w-full max-w-6xl mx-auto mb-10" delay={0.1} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">
            {p.plans.map((plan, i) => (
              <FadeUp key={plan.name} delay={0.1 + i * 0.08} className="h-full">
                <div
                  className="relative flex flex-col rounded-2xl p-6 h-full"
                  style={{
                    background: plan.highlight ? 'rgba(49, 159, 212,0.06)' : 'var(--surface)',
                    border: plan.highlight ? '1px solid var(--accent-line)' : '1px solid var(--border)',
                    boxShadow: plan.highlight ? '0 0 0 1px rgba(49, 159, 212,0.2), 0 20px 60px rgba(49, 159, 212,0.15)' : 'none',
                  }}
                >
                  {plan.highlight && (
                    <span
                      className="absolute -top-3 start-6 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
                      style={{ background: 'var(--accent-solid)', color: 'var(--on-accent)' }}
                    >
                      {p.mostPopular}
                    </span>
                  )}

                  <h3 className="text-strong font-semibold mb-1" style={{ fontSize: 18 }}>{plan.name}</h3>
                  <p className="mb-4" style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>{plan.tagline}</p>

                  <div className="flex items-end gap-1.5 mb-2">
                    <span className="text-strong font-bold tracking-tight" style={{ fontSize: 34, fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>{plan.price}</span>
                    {plan.price !== p.plans[0].price && (
                      <span className="mb-1.5" style={{ fontSize: 14, color: 'var(--text-faint)' }}>{p.perMonth}</span>
                    )}
                  </div>

                  {/* Platform fee, the per-booking cut, dropping with each tier */}
                  <div
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-6 self-start"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                  >
                    <span className="font-bold" style={{ fontSize: 13, color: 'var(--accent-hi)' }}>{plan.platformFee}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{p.feeSuffix}</span>
                  </div>

                  <a
                    href={PROVIDER_SIGN_UP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 mb-6"
                    style={
                      plan.highlight
                        ? { background: 'var(--accent-solid)', color: 'var(--on-accent)', fontSize: 14.5 }
                        : { background: 'var(--surface-hi)', border: '1px solid var(--border-hi)', color: 'var(--text)', fontSize: 14.5 }
                    }
                  >
                    {plan.cta}{arrow}
                  </a>

                  <ul className="flex flex-col gap-3 mt-auto">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'var(--accent-dim)' }}>
                          <Check size={11} color="var(--accent-hi)" strokeWidth={2.5} />
                        </span>
                        <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>

          <p className="text-center mt-8 max-w-xl mx-auto" style={{ fontSize: 13, color: 'var(--text-faint)' }}>{p.pricingNote}</p>
        </div>
      </section>
  )
}
