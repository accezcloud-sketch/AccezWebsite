'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { PILLARS } from '@/components/ProductScope'
import FadeUp from '@/components/animations/FadeUp'
import StaggerGrid, { staggerItem } from '@/components/animations/StaggerGrid'

const CONTENT = {
  en: {
    eyebrow: 'Product',
    titleLead: 'Everything Accez',
    titleAccent: 'runs',
    subtitle: 'One platform for the whole property operation. Explore every module, and open the ones with a dedicated page for the full detail.',
    linked: 'Learn more',
    ctaTitle: 'See it on your own portfolio',
    ctaSub: 'Book a walkthrough with the team in Riyadh.',
    ctaPrimary: 'Book a demo',
    ctaSecondary: 'Start free',
  },
  ar: {
    eyebrow: 'المنتج',
    titleLead: 'كل ما تديره',
    titleAccent: 'أكسيز',
    subtitle: 'منصة واحدة لعملية العقار بالكامل. استكشف كل وحدة، وافتح الوحدات التي لها صفحة مخصصة لمزيد من التفاصيل.',
    linked: 'اعرف المزيد',
    ctaTitle: 'شاهدها على محفظتك',
    ctaSub: 'احجز جولة مع الفريق في الرياض.',
    ctaPrimary: 'اطلب عرضًا توضيحيًا',
    ctaSecondary: 'ابدأ مجانًا',
  },
} as const

const PORTAL_SIGN_UP = 'https://portal.accez.cloud/sign-up'

export default function ModulesPage() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]

  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <>
      <style>{`
        .mod-card { transition: transform .3s cubic-bezier(.23,1,.32,1), border-color .3s ease, background .3s ease; }
        .mod-card:hover { transform: translateY(-4px); border-color: var(--accent-line); background: var(--surface-hi); }
        @media (prefers-reduced-motion: reduce){ .mod-card:hover{ transform:none; } }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden page-top pb-10" style={{ background: 'var(--bg)' }}>
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '80%', background: 'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <FadeUp>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}>
              {t.eyebrow}
            </span>
            <h1 className="text-white font-bold leading-[1.12] tracking-tight mb-5" style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
              {t.titleLead}{' '}
              <span style={{ background: 'linear-gradient(135deg, #C7D2FE, #319FD4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t.titleAccent}</span>
            </h1>
            <p className="leading-relaxed mx-auto" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{t.subtitle}</p>
          </FadeUp>
        </div>
      </section>

      {/* Modules by pillar */}
      <section className="section-y" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 max-w-7xl mx-auto">
            {PILLARS.map((pillar, pi) => (
              <FadeUp key={pillar.key} delay={0.08 * pi}>
                <div className="rounded-2xl p-5 h-full" style={{ background: 'var(--bg-alt)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2.5 mb-4 px-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    <h2 className="font-semibold tracking-wide uppercase" style={{ fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                      {language === 'ar' ? pillar.headingAr : pillar.heading}
                    </h2>
                  </div>

                  <StaggerGrid className="flex flex-col gap-2.5" staggerDelay={0.05}>
                    {pillar.modules.map((m) => {
                      const Icon = m.icon
                      const inner = (
                        <>
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                            <Icon size={17} color="var(--accent-hi)" strokeWidth={1.85} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-white font-semibold leading-tight" style={{ fontSize: 14 }}>
                              {language === 'ar' ? m.titleAr : m.title}
                            </p>
                            <p className="leading-snug mt-0.5" style={{ fontSize: 12.5, color: 'var(--text-faint)' }}>
                              {language === 'ar' ? m.descAr : m.desc}
                            </p>
                            {m.href && (
                              <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-semibold" style={{ color: 'var(--accent-hi)' }}>
                                {t.linked}
                                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
                                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </>
                      )
                      const cls = 'mod-card flex items-start gap-3 rounded-xl p-3.5 h-full'
                      const st = { background: 'var(--surface)', border: '1px solid var(--border)' } as React.CSSProperties
                      return (
                        <motion.div key={m.title} variants={staggerItem}>
                          {m.href ? <a href={m.href} className={cls} style={st}>{inner}</a> : <div className={cls} style={st}>{inner}</div>}
                        </motion.div>
                      )
                    })}
                  </StaggerGrid>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y" style={{ background: 'var(--bg)' }}>
        <div className="container mx-auto px-4">
          <FadeUp>
            <div className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 text-center max-w-5xl mx-auto" style={{ background: 'linear-gradient(135deg, rgba(49,159,212,0.14), var(--surface))', border: '1px solid var(--accent-line)' }}>
              <div className="relative z-10">
                <h2 className="text-white font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}>{t.ctaTitle}</h2>
                <p className="max-w-xl mx-auto mb-8" style={{ fontSize: 16, color: 'var(--text-muted)' }}>{t.ctaSub}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--accent)', fontSize: 15 }}>{t.ctaPrimary}{arrow}</a>
                  <a href={PORTAL_SIGN_UP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--surface)', border: '1px solid var(--border-hi)', color: 'var(--text)', fontSize: 15 }}>{t.ctaSecondary}</a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
