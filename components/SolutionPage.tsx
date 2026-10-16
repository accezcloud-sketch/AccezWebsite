'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import RevealLine from '@/components/animations/RevealLine'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'
import { localeHref } from '@/lib/i18n'
import { PORTAL_SIGN_UP } from '@/lib/links'
import { SOLUTIONS, type SolutionSlug } from '@/lib/content/solutions'

export default function SolutionPage({ slug }: { slug: SolutionSlug }) {
  const { language, isRTL } = useLanguage()
  const s = SOLUTIONS[slug]
  const L = <T,>(en: T, ar: T) => (language === 'ar' ? ar : en)

  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <>
      <style>{`
        .sol-card { transition: transform .3s cubic-bezier(.23,1,.32,1), border-color .3s ease; }
        .sol-card:hover { transform: translateY(-4px); border-color: var(--accent-line); }
        @media (prefers-reduced-motion: reduce){ .sol-card:hover{ transform:none; } }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden page-top pb-20" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '70%', background: 'radial-gradient(120% 70% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <FadeUp>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}>
                {L(s.eyebrow, s.eyebrowAr)}
              </span>
              <h1 className="text-strong font-bold leading-[1.1] tracking-tight mb-5" style={{ fontSize: 'clamp(30px, 4.5vw, 50px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
                {L(s.title, s.titleAr)}{' '}
                <span style={{ background: 'linear-gradient(135deg, var(--grad-from), var(--grad-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{L(s.accent, s.accentAr)}</span>
              </h1>
              <p className="leading-relaxed max-w-lg mb-8" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{L(s.subtitle, s.subtitleAr)}</p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a href={localeHref("/#contact", language)} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--accent-solid)', fontSize: 15 }}>
                  {L('Book a demo', 'اطلب عرضًا توضيحيًا')}{arrow}
                </a>
                <a href={localeHref("/modules", language)} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', color: 'var(--text)', fontSize: 15 }}>
                  {L('See all modules', 'كل الوحدات')}
                </a>
              </div>
            </FadeUp>

            {/* Hero capability card */}
            <FadeUp delay={0.15}>
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-[70px] opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 40%, var(--accent), transparent 68%)' }} aria-hidden="true" />
                <div className="relative rounded-2xl p-6 sm:p-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))' }}>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-hi)' }}>{L(s.eyebrow, s.eyebrowAr)}</p>
                  <div className="flex flex-col gap-3">
                    {s.heroPoints.map((p) => (
                      <div key={p.en} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'var(--accent-dim)' }}>
                          <Check size={12} color="var(--accent-hi)" strokeWidth={2.5} />
                        </span>
                        <span style={{ fontSize: 15, color: 'var(--text)' }}>{L(p.en, p.ar)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto" staggerDelay={0.08}>
            {s.features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={staggerItem}>
                  <div className="sol-card flex flex-col gap-4 rounded-2xl p-6 h-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                      <Icon size={20} color="var(--accent-hi)" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-strong font-semibold leading-snug mb-2" style={{ fontSize: 16 }}>{L(f.title, f.titleAr)}</h3>
                      <p className="leading-relaxed" style={{ fontSize: 14, color: 'var(--text-muted)' }}>{L(f.desc, f.descAr)}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* Capabilities checklist */}
      <section className="py-20" style={{ background: 'var(--bg-alt)' }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <FadeUp>
            <h2 className="text-strong font-bold text-center tracking-tight mb-2" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>
              {L(s.capsHeading, s.capsHeadingAr)}
            </h2>
          </FadeUp>
          <RevealLine className="w-full max-w-md mx-auto my-8" delay={0.1} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {s.capabilities.map((c, i) => (
              <FadeUp key={c.en} delay={0.05 * i}>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)' }}>
                    <Check size={12} color="var(--accent-hi)" strokeWidth={2.5} />
                  </span>
                  <span style={{ fontSize: 14.5, color: 'var(--text-muted)' }}>{L(c.en, c.ar)}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 text-center max-w-5xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(49,159,212,0.14), var(--surface))', border: '1px solid var(--accent-line)' }}>
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute rounded-full blur-[90px] opacity-40" style={{ width: 400, height: 400, top: '-40%', left: '50%', transform: 'translateX(-50%)', background: 'radial-gradient(circle, var(--accent), transparent 70%)' }} />
              </div>
              <div className="relative z-10">
                <h2 className="text-strong font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>{L(s.ctaTitle, s.ctaTitleAr)}</h2>
                <p className="max-w-xl mx-auto mb-8" style={{ fontSize: 16, color: 'var(--text-muted)' }}>{L('See it on your own portfolio, book a walkthrough with the Accez team.', 'شاهدها على محفظتك، احجز جولة مع فريق أكسيز.')}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href={localeHref("/#contact", language)} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--accent-solid)', fontSize: 15 }}>
                    {L('Book a demo', 'اطلب عرضًا توضيحيًا')}{arrow}
                  </a>
                  <a href={PORTAL_SIGN_UP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', color: 'var(--text)', fontSize: 15 }}>
                    {L('Start free', 'ابدأ مجانًا')}
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
