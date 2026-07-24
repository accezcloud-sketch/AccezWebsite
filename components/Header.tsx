'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface MenuItem { name: string; nameAr: string; href: string; desc: string; descAr: string }

// The dedicated module pages, surfaced under the Product dropdown.
const PRODUCT_MENU: MenuItem[] = [
  { name: 'Owners & payouts', nameAr: 'الملاك والمدفوعات', href: '/owners', desc: 'Portal, ledger and Stripe payouts', descAr: 'بوابة وسجل ومدفوعات' },
  { name: 'Sales & projects', nameAr: 'المبيعات والمشاريع', href: '/sales', desc: 'Developer projects and pipeline', descAr: 'مشاريع المطورين ومسار المبيعات' },
  { name: 'Communities & HOA', nameAr: 'المجتمعات واتحاد الملاك', href: '/communities', desc: 'Feed, polls and engagement', descAr: 'موجز واستطلاعات وتفاعل' },
  { name: 'Hotels & serviced apartments', nameAr: 'الفنادق والشقق المخدومة', href: '/hotels', desc: 'Room types and channel manager', descAr: 'أنواع الغرف ومدير القنوات' },
  { name: 'Service providers', nameAr: 'مقدمو الخدمات', href: '/service-providers', desc: 'List on the Accez marketplace', descAr: 'أدرج في سوق أكسيز' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [mobileProductOpen, setMobileProductOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const { language, setLanguage, t } = useLanguage()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    { name: t.header.pricing, href: '/#pricing' },
    { name: t.header.about, href: '/about' },
    { name: t.header.blog, href: '/blog' },
    { name: t.header.support, href: '/support' },
  ]

  const linkClass = [
    'text-sm font-medium transition-colors duration-200 hover:text-white',
    scrolled ? 'text-slate-300' : 'text-slate-400',
  ].join(' ')

  const openProduct = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setProductOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setProductOpen(false), 120)
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-[100] w-full',
        'transition-all duration-300 ease-in-out',
        scrolled ? 'border-b border-white/[0.08]' : 'border-b border-transparent',
      ].join(' ')}
      style={{
        backgroundColor: scrolled ? 'rgba(9, 19, 28, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            prefetch={false}
            aria-label={language === 'ar' ? 'أكسيز.كلاود، الصفحة الرئيسية' : 'Accez.cloud, go to home'}
            className="flex items-center gap-2 text-2xl font-bold text-white rounded-lg hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#319FD4] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ transition: 'opacity 0.3s ease', opacity: atTop ? 0.9 : 1 }}
          >
            <Image src="/images/accez-logo.png" alt="Accez Logo" width={32} height={32} className="rounded-lg" />
            Accez.cloud
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Product dropdown */}
            <div className="relative" onMouseEnter={openProduct} onMouseLeave={scheduleClose}>
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute top-full start-0 mt-3 w-[320px] rounded-2xl overflow-hidden p-2"
                    style={{
                      background: 'rgba(13, 23, 35, 0.97)',
                      border: '1px solid var(--border-hi)',
                      boxShadow: '0 20px 48px rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {PRODUCT_MENU.map((m) => (
                      <a
                        key={m.href}
                        href={m.href}
                        onClick={() => setProductOpen(false)}
                        className="block rounded-xl px-3 py-2.5 transition-colors duration-150"
                        style={{ color: 'var(--text)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hi)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span className="block text-sm font-semibold text-white">{language === 'ar' ? m.nameAr : m.name}</span>
                        <span className="block text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{language === 'ar' ? m.descAr : m.desc}</span>
                      </a>
                    ))}
                    <div className="my-1.5 h-px" style={{ background: 'var(--border)' }} />
                    <a
                      href="/modules"
                      onClick={() => setProductOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150"
                      style={{ color: 'var(--accent-hi)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hi)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {language === 'ar' ? 'كل الوحدات ←' : 'All modules →'}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <a key={item.name} href={item.href} className={linkClass}>{item.name}</a>
            ))}
          </nav>

          {/* Right side - Language Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className={linkClass}>
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              href="/#contact"
              prefetch={false}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', boxShadow: scrolled ? '0 6px 20px rgba(49,159,212,0.25)' : 'none' }}
            >
              {t.header.bookDemo}
            </Link>
          </div>

          {/* Mobile - Language Toggle & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="p-2 text-slate-300 hover:text-white font-medium transition-colors duration-200">
              {language === 'en' ? 'العربية' : 'EN'}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-300 hover:text-white" aria-label="Toggle menu">
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
              style={{ backgroundColor: 'rgba(9,19,28,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <nav className="flex flex-col gap-1 py-4 px-2">
                {/* Product group (collapsible) */}
                <button
                  type="button"
                  onClick={() => setMobileProductOpen((v) => !v)}
                  className="flex items-center justify-between text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2"
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
                        <a key={m.href} href={m.href} onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white text-sm py-1.5 transition-colors">
                          {language === 'ar' ? m.nameAr : m.name}
                        </a>
                      ))}
                      <a href="/modules" onClick={() => setIsMobileMenuOpen(false)} className="text-sm py-1.5 font-medium" style={{ color: 'var(--accent-hi)' }}>
                        {language === 'ar' ? 'كل الوحدات ←' : 'All modules →'}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                {navItems.map((item) => (
                  <a key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 hover:text-white font-medium transition-colors duration-200 py-2">
                    {item.name}
                  </a>
                ))}

                <Link
                  href="/#contact"
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-5 py-2.5 text-white font-semibold rounded-lg transition-all duration-200 text-center mt-2"
                  style={{ background: 'var(--accent)' }}
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
