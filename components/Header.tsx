'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ThemeToggle from '@/components/ThemeToggle'
import { localeHref } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import { LEGAL_COPY, LEGAL_DOCUMENTS, legalHref } from '@/lib/legal/documents'
import NavDropdown from '@/components/nav/NavDropdown'
import MobileNavGroup from '@/components/nav/MobileNavGroup'
import type { NavSection } from '@/components/nav/types'

interface MenuItem { name: string; nameAr: string; href: string; desc: string; descAr: string }

// Reading and help. The legal documents sit in their own column (built from
// lib/legal/documents.ts): a marketplace that holds other people's money
// should keep its policies one click away.
const RESOURCES_MENU: MenuItem[] = [
  { name: 'Blog', nameAr: 'المدونة', href: '/blog', desc: 'Guides and insights for Saudi operators', descAr: 'أدلة ورؤى لمشغّلي العقارات في السعودية' },
  { name: 'FAQ', nameAr: 'الأسئلة الشائعة', href: '/faq', desc: 'Answers to common questions', descAr: 'إجابات عن الأسئلة الشائعة' },
  { name: 'Support', nameAr: 'الدعم', href: '/support', desc: 'Get help from our team', descAr: 'احصل على مساعدة من فريقنا' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const { language, setLanguage, t } = useLanguage()

  const { scrollYProgress } = useScroll()
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setAtTop(y < 10)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Menus, built from the platform's solutions (lib/platform/solutions.ts) ──
  const ar = language === 'ar'
  const href = (route: string) => localeHref(route, language)

  // Product: one column per solution, each listing its pages.
  const productSections: NavSection[] = PLATFORM_SOLUTIONS.map((s) => ({
    heading: s.name[language],
    links: s.pages.map((p) => ({ label: p.label[language], description: p.description[language], href: href(p.href) })),
  }))

  // Pricing: one entry per audience, straight to that solution's plans.
  const pricingSections: NavSection[] = [
    {
      links: [
        ...PLATFORM_SOLUTIONS.map((s) => ({ label: s.audience[language], description: s.pricingNote[language], href: href(s.pricingHref) })),
        { label: ar ? 'قارن كل الخطط' : 'Compare all plans', href: href('/pricing') },
      ],
    },
  ]

  // Resources: reading and help, then the legal documents. A per-solution
  // document links to its "which applies to you?" page.
  const resourcesSections: NavSection[] = [
    { heading: ar ? 'تعلّم واحصل على المساعدة' : 'Learn and get help', links: RESOURCES_MENU.map((m) => ({ label: ar ? m.nameAr : m.name, description: ar ? m.descAr : m.desc, href: href(m.href) })) },
    {
      heading: ar ? 'قانوني' : 'Legal',
      links: [
        ...LEGAL_DOCUMENTS.map((d) => ({ label: d.title[language], href: href(legalHref(d.key)) })),
        { label: LEGAL_COPY[language].allDocuments, href: href('/legal') },
      ],
    },
  ]

  // Sign in: each solution has its own portal, so the menu names the role.
  const signInSections: NavSection[] = [
    { links: PLATFORM_SOLUTIONS.map((s) => ({ label: s.role[language], description: s.roleSummary[language], href: s.loginUrl, external: true })) },
  ]

  const linkClass = [
    'text-sm font-medium transition-colors duration-200 hover:text-strong',
    scrolled ? 'text-soft' : 'text-muted',
  ].join(' ')
  const closeMobile = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-[100] w-full border-b',
        'transition-all duration-300 ease-in-out',
        scrolled ? 'glass-bar' : 'border-transparent',
      ].join(' ')}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={href('/')}
            prefetch={false}
            aria-label={ar ? 'أكسيز.كلاود، الصفحة الرئيسية' : 'Accez.cloud, go to home'}
            className="flex items-center gap-2 text-2xl font-bold text-strong rounded-lg hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ transition: 'opacity 0.3s ease', opacity: atTop ? 0.9 : 1 }}
          >
            <Image src="/images/accez-logo.png" alt="Accez Logo" width={32} height={32} className="rounded-lg" />
            Accez.cloud
          </Link>

          {/* Desktop navigation */}
          <nav aria-label={ar ? 'القائمة الرئيسية' : 'Main'} className="hidden lg:flex items-center gap-6 xl:gap-8">
            <NavDropdown label={t.header.product} sections={productSections} triggerClassName={linkClass} />
            <NavDropdown label={t.header.pricing} sections={pricingSections} triggerClassName={linkClass} />
            <a href={href('/about')} className={linkClass}>{t.header.about}</a>
            <NavDropdown label={ar ? 'الموارد' : 'Resources'} sections={resourcesSections} align="end" triggerClassName={linkClass} />
          </nav>

          {/* Right side: theme, language, sign in, primary action */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle language={language} />
            <button onClick={() => setLanguage(ar ? 'en' : 'ar')} className={linkClass}>
              {ar ? 'English' : 'العربية'}
            </button>
            <NavDropdown label={t.header.signIn} sections={signInSections} align="end" triggerClassName={linkClass} />
            <Link
              href={href('/#contact')}
              prefetch={false}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--accent-solid)', boxShadow: scrolled ? '0 6px 20px rgba(49,159,212,0.25)' : 'none' }}
            >
              {t.header.bookDemo}
            </Link>
          </div>

          {/* Mobile: theme, language, menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle language={language} />
            <button onClick={() => setLanguage(ar ? 'en' : 'ar')} className="p-2 text-soft hover:text-strong font-medium transition-colors duration-200">
              {ar ? 'EN' : 'العربية'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-soft hover:text-strong"
              aria-label={ar ? 'القائمة' : 'Toggle menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation: the same menus as collapsible groups */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="nav-sheet lg:hidden overflow-hidden"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <nav aria-label={ar ? 'القائمة الرئيسية' : 'Main'} className="flex flex-col gap-1 py-4 px-2">
                <MobileNavGroup label={t.header.product} sections={productSections} onNavigate={closeMobile} />
                <MobileNavGroup label={t.header.pricing} sections={pricingSections} onNavigate={closeMobile} />
                <a href={href('/about')} onClick={closeMobile} className="text-soft hover:text-strong font-medium transition-colors duration-200 py-2.5">
                  {t.header.about}
                </a>
                <MobileNavGroup label={ar ? 'الموارد' : 'Resources'} sections={resourcesSections} onNavigate={closeMobile} />

                {/* Sign in: flat, since a nested dropdown in a drawer is an extra tap. */}
                <div className="mt-3 pt-3 flex flex-col gap-1" style={{ borderTop: '1px solid var(--border)' }}>
                  <p className="text-[0.7rem] uppercase tracking-wider pb-1 text-muted">{t.header.signIn}</p>
                  {PLATFORM_SOLUTIONS.map((s) => (
                    <a key={s.key} href={s.loginUrl} target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="text-soft hover:text-strong font-medium transition-colors duration-200 py-2">
                      {s.role[language]}
                    </a>
                  ))}
                </div>

                <Link
                  href={href('/#contact')}
                  prefetch={false}
                  onClick={closeMobile}
                  className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all duration-200 text-center mt-2"
                  style={{ background: 'var(--accent-solid)' }}
                >
                  {t.header.bookDemo}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
        style={{ scaleX: scrollProgress, background: 'linear-gradient(90deg, var(--accent), var(--accent-hi))' }}
      />
    </header>
  )
}
