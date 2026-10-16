'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ThemeToggle from '@/components/ThemeToggle'
import { localeHref } from '@/lib/i18n'
import { PORTAL_LOGIN, PROVIDER_LOGIN } from '@/lib/links'

interface MenuItem { name: string; nameAr: string; href: string; desc: string; descAr: string }

// The dedicated module pages, surfaced under the Product dropdown.
const PRODUCT_MENU: MenuItem[] = [
  { name: 'Owners & payouts', nameAr: 'الملاك والمدفوعات', href: '/owners', desc: 'Portal, ledger and Stripe payouts', descAr: 'بوابة وسجل ومدفوعات' },
  { name: 'Sales & projects', nameAr: 'المبيعات والمشاريع', href: '/sales', desc: 'Developer projects and pipeline', descAr: 'مشاريع المطورين ومسار المبيعات' },
  { name: 'Hotels & serviced apartments', nameAr: 'الفنادق والشقق المخدومة', href: '/hotels', desc: 'Room types and channel manager', descAr: 'أنواع الغرف ومدير القنوات' },
  { name: 'Service providers', nameAr: 'مقدمو الخدمات', href: '/service-providers', desc: 'List on the Accez marketplace', descAr: 'أدرج في سوق أكسيز' },
]

// Reading and help, plus the legal pages. The legal pages were promoted from
// the footer on purpose (a marketplace that holds other people's money should
// make its policies easy to find), so they stay one click away here.
const RESOURCES_MENU: MenuItem[] = [
  { name: 'Blog', nameAr: 'المدونة', href: '/blog', desc: 'Guides and insights for Saudi operators', descAr: 'أدلة ورؤى لمشغّلي العقارات في السعودية' },
  { name: 'FAQ', nameAr: 'الأسئلة الشائعة', href: '/faq', desc: 'Answers to common questions', descAr: 'إجابات عن الأسئلة الشائعة' },
  { name: 'Support', nameAr: 'الدعم', href: '/support', desc: 'Get help from our team', descAr: 'احصل على مساعدة من فريقنا' },
  { name: 'Terms of Service', nameAr: 'شروط الخدمة', href: '/terms', desc: 'The agreement that governs the platform', descAr: 'الاتفاقية التي تحكم استخدام المنصة' },
  { name: 'Privacy Policy', nameAr: 'سياسة الخصوصية', href: '/privacy', desc: 'How we handle personal data under PDPL', descAr: 'كيف نتعامل مع البيانات الشخصية' },
  { name: 'Refund & Cancellation', nameAr: 'الاسترداد والإلغاء', href: '/refund-policy', desc: 'Cancellations, refunds and chargebacks', descAr: 'الإلغاء والاسترداد والمنازعات' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileProductOpen, setMobileProductOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const { language, setLanguage, t } = useLanguage()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resourcesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Flat items alongside the Product dropdown.
  const navItems = [
    { name: t.header.pricing, href: '/pricing' },
    { name: t.header.about, href: '/about' },
  ]

  const linkClass = [
    'text-sm font-medium transition-colors duration-200 hover:text-strong',
    scrolled ? 'text-soft' : 'text-muted',
  ].join(' ')

  const openProduct = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setProductOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setProductOpen(false), 120)
  }
  const openResources = () => {
    if (resourcesTimer.current) clearTimeout(resourcesTimer.current)
    setResourcesOpen(true)
  }
  const scheduleResourcesClose = () => {
    if (resourcesTimer.current) clearTimeout(resourcesTimer.current)
    resourcesTimer.current = setTimeout(() => setResourcesOpen(false), 120)
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-[100] w-full',
        'transition-all duration-300 ease-in-out',
        scrolled ? 'border-b border-white/[0.08]' : 'border-b border-transparent',
      ].join(' ')}
      style={{
        backgroundColor: scrolled ? 'var(--glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgb(var(--fg-rgb) / 0.05), 0 4px 24px rgb(var(--shadow-rgb) / calc(0.3 * var(--shadow-k)))' : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={localeHref("/", language)}
            prefetch={false}
            aria-label={language === 'ar' ? 'أكسيز.كلاود، الصفحة الرئيسية' : 'Accez.cloud, go to home'}
            className="flex items-center gap-2 text-2xl font-bold text-strong rounded-lg hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#319FD4] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ transition: 'opacity 0.3s ease', opacity: atTop ? 0.9 : 1 }}
          >
            <Image src="/images/accez-logo.png" alt="Accez Logo" width={32} height={32} className="rounded-lg" />
            Accez.cloud
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Product dropdown — the wrapper spans the full navbar height so
                top-full lands at the divider, and paddingTop on the panel adds
                a clean gap that stays part of the hover area. */}
            <div className="relative h-16 flex items-center" onMouseEnter={openProduct} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className={`${linkClass} inline-flex items-center gap-1`}
                aria-haspopup="true"
                aria-expanded={productOpen}
                onClick={() => setProductOpen((v) => !v)}
                onFocus={openProduct}
              >
                {t.header.product}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200" style={{ transform: productOpen ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute top-full start-0"
                    style={{ paddingTop: 12 }}
                  >
                  <div
                    className="w-[320px] rounded-2xl overflow-hidden p-2"
                    style={{
                      background: 'var(--panel)',
                      border: '1px solid var(--border-hi)',
                      boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {PRODUCT_MENU.map((m) => (
                      <a
                        key={m.href}
                        href={localeHref(m.href, language)}
                        onClick={() => setProductOpen(false)}
                        className="block rounded-xl px-3 py-2.5 transition-colors duration-150"
                        style={{ color: 'var(--text)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hi)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span className="block text-sm font-semibold text-strong">{language === 'ar' ? m.nameAr : m.name}</span>
                        <span className="block text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{language === 'ar' ? m.descAr : m.desc}</span>
                      </a>
                    ))}
                    <div className="my-1.5 h-px" style={{ background: 'var(--border)' }} />
                    <a
                      href={localeHref("/modules", language)}
                      onClick={() => setProductOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150"
                      style={{ color: 'var(--accent-hi)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hi)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {language === 'ar' ? 'كل الوحدات ←' : 'All modules →'}
                    </a>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <a key={item.name} href={localeHref(item.href, language)} className={linkClass}>{item.name}</a>
            ))}

            {/* Resources dropdown — same interaction as Product. The panel is
                anchored with end-0 rather than start-0 because this is the last
                nav item, so a start-anchored panel would overflow the viewport
                on narrower desktop widths. */}
            <div className="relative h-16 flex items-center" onMouseEnter={openResources} onMouseLeave={scheduleResourcesClose}>
              <button
                type="button"
                className={`${linkClass} inline-flex items-center gap-1`}
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                onClick={() => setResourcesOpen((v) => !v)}
                onFocus={openResources}
              >
                {language === 'ar' ? 'الموارد' : 'Resources'}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200" style={{ transform: resourcesOpen ? 'rotate(180deg)' : 'none' }} aria-hidden="true">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute top-full end-0"
                    style={{ paddingTop: 12 }}
                  >
                    <div
                      className="w-[320px] rounded-2xl overflow-hidden p-2"
                      style={{
                        background: 'var(--panel)',
                        border: '1px solid var(--border-hi)',
                        boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      {RESOURCES_MENU.map((m) => (
                        <a
                          key={m.href}
                          href={localeHref(m.href, language)}
                          onClick={() => setResourcesOpen(false)}
                          className="block rounded-xl px-3 py-2.5 transition-colors duration-150"
                          style={{ color: 'var(--text)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hi)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <span className="block text-sm font-semibold text-strong">{language === 'ar' ? m.nameAr : m.name}</span>
                          <span className="block text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{language === 'ar' ? m.descAr : m.desc}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right side - Language Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle language={language} />
            <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className={linkClass}>
              {language === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Sign in: one control, two destinations. Property managers and
                service providers use different portals, so the menu names the
                role rather than making the visitor guess which one is theirs. */}
            <div
              className="relative"
              onMouseEnter={() => setSignInOpen(true)}
              onMouseLeave={() => setSignInOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSignInOpen((v) => !v)}
                aria-expanded={signInOpen}
                aria-haspopup="true"
                className={`${linkClass} inline-flex items-center gap-1.5`}
              >
                {t.header.signIn}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`transition-transform duration-200 ${signInOpen ? 'rotate-180' : ''}`}>
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <AnimatePresence>
                {signInOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute end-0 top-full pt-3 w-[19rem] z-50"
                  >
                    <div
                      className="rounded-2xl p-2"
                      style={{
                        // Opaque. --surface is rgb(var(--fg-rgb) / 0.035), which is
                        // near-transparent and let page text bleed through the menu.
                        background: 'var(--panel)',
                        border: '1px solid var(--border-hi)',
                        boxShadow: '0 24px 48px -12px rgb(var(--shadow-rgb) / calc(0.7 * var(--shadow-k))), 0 0 0 1px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))',
                      }}
                    >
                      <a href={PORTAL_LOGIN} target="_blank" rel="noopener noreferrer" className="block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-[rgb(var(--fg-rgb)/0.05)]">
                        <span className="block text-sm font-semibold text-strong">{t.header.signInPM}</span>
                        <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.header.signInPMDesc}</span>
                      </a>
                      <a href={PROVIDER_LOGIN} target="_blank" rel="noopener noreferrer" className="block rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-[rgb(var(--fg-rgb)/0.05)]">
                        <span className="block text-sm font-semibold text-strong">{t.header.signInSP}</span>
                        <span className="block text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.header.signInSPDesc}</span>
                      </a>
                      </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={localeHref("/#contact", language)}
              prefetch={false}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--accent-solid)', boxShadow: scrolled ? '0 6px 20px rgba(49,159,212,0.25)' : 'none' }}
            >
              {t.header.bookDemo}
            </Link>
          </div>

          {/* Mobile - Language Toggle & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle language={language} />
            <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="p-2 text-soft hover:text-strong font-medium transition-colors duration-200">
              {language === 'en' ? 'العربية' : 'EN'}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-soft hover:text-strong" aria-label="Toggle menu">
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:hidden overflow-hidden"
              style={{ backgroundColor: 'var(--panel)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}
            >
              <nav className="flex flex-col gap-1 py-4 px-2">
                {/* Product group (collapsible) */}
                <button
                  type="button"
                  onClick={() => setMobileProductOpen((v) => !v)}
                  className="flex items-center justify-between text-soft hover:text-strong font-medium transition-colors duration-200 py-2"
                  aria-expanded={mobileProductOpen}
                >
                  {t.header.product}
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ transform: mobileProductOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} aria-hidden="true">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileProductOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ps-3 flex flex-col gap-1 border-s" style={{ borderColor: 'var(--border)' }}>
                      {PRODUCT_MENU.map((m) => (
                        <a key={m.href} href={localeHref(m.href, language)} onClick={() => setIsMobileMenuOpen(false)} className="text-muted hover:text-strong text-sm py-1.5 transition-colors">
                          {language === 'ar' ? m.nameAr : m.name}
                        </a>
                      ))}
                      <a href={localeHref("/modules", language)} onClick={() => setIsMobileMenuOpen(false)} className="text-sm py-1.5 font-medium" style={{ color: 'var(--accent-hi)' }}>
                        {language === 'ar' ? 'كل الوحدات ←' : 'All modules →'}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                {navItems.map((item) => (
                  <a key={item.name} href={localeHref(item.href, language)} onClick={() => setIsMobileMenuOpen(false)} className="text-soft hover:text-strong font-medium transition-colors duration-200 py-2">
                    {item.name}
                  </a>
                ))}

                {/* Resources group (collapsible) */}
                <button
                  type="button"
                  onClick={() => setMobileResourcesOpen((v) => !v)}
                  className="flex items-center justify-between text-soft hover:text-strong font-medium transition-colors duration-200 py-2"
                  aria-expanded={mobileResourcesOpen}
                >
                  {language === 'ar' ? 'الموارد' : 'Resources'}
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ transform: mobileResourcesOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} aria-hidden="true">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden ps-3 flex flex-col gap-1 border-s" style={{ borderColor: 'var(--border)' }}>
                      {RESOURCES_MENU.map((m) => (
                        <a key={m.href} href={localeHref(m.href, language)} onClick={() => setIsMobileMenuOpen(false)} className="text-muted hover:text-strong text-sm py-1.5 transition-colors">
                          {language === 'ar' ? m.nameAr : m.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sign in — same two destinations as the desktop menu, laid
                    out flat because a nested dropdown inside a mobile drawer is
                    an extra tap for no benefit. */}
                <div className="mt-3 pt-3 flex flex-col gap-1" style={{ borderTop: '1px solid var(--border)' }}>
                  <p className="text-[0.7rem] uppercase tracking-wider pb-1" style={{ color: 'var(--text-muted)' }}>
                    {t.header.signIn}
                  </p>
                  <a href={PORTAL_LOGIN} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-soft hover:text-strong font-medium transition-colors duration-200 py-1.5">
                    {t.header.signInPM}
                  </a>
                  <a href={PROVIDER_LOGIN} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} className="text-soft hover:text-strong font-medium transition-colors duration-200 py-1.5">
                    {t.header.signInSP}
                  </a>
                </div>

                <Link
                  href={localeHref("/#contact", language)}
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
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
        style={{ scaleX: scrollProgress, background: 'linear-gradient(90deg, #319FD4, #7FCDEF)' }}
      />
    </header>
  )
}
