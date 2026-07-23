'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const { language, setLanguage, t } = useLanguage()

  const { scrollYProgress } = useScroll()
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  })

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

  const navItems = [
    { name: t.header.features, href: '/#features' },
    { name: t.header.forProviders, href: '/#service-providers' },
    { name: t.header.pricing, href: '/#pricing' },
    { name: t.header.faq, href: '/#faq' },
    { name: t.header.blog, href: '/blog' },
    { name: t.header.support, href: '/support' },
    { name: t.header.contact, href: '/#contact' },
  ]

  const linkClass = [
    'text-sm font-medium transition-colors duration-200',
    'hover:text-white',
    scrolled ? 'text-slate-300' : 'text-slate-400',
  ].join(' ')

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 w-full',
        'transition-all duration-300 ease-in-out',
        scrolled ? 'border-b border-white/[0.08]' : 'border-b border-transparent',
      ].join(' ')}
      style={{
        backgroundColor: scrolled ? 'rgba(8, 12, 24, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
        boxShadow: scrolled
          ? '0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.3)'
          : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2 text-2xl font-bold text-white"
            style={{ transition: 'opacity 0.3s ease', opacity: atTop ? 0.9 : 1 }}
          >
            <Image
              src="/images/accez-logo.png"
              alt="Accez Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            Accez.cloud
          </Link>

          {/* Desktop Navigation — `lg` (not `md`) so the 7 links have room to
              sit on one line; tablets fall back to the mobile menu below. */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className={linkClass}>
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side - Language Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={linkClass}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>

            <Link
              href="/#pricing"
              prefetch={false}
              className={[
                'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300',
                'hover:-translate-y-0.5',
                scrolled
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
              ].join(' ')}
            >
              {t.header.startFreeTrial}
            </Link>
          </div>

          {/* Mobile - Language Toggle & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="p-2 text-slate-300 hover:text-white font-medium transition-colors duration-200"
            >
              {language === 'en' ? 'العربية' : 'EN'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
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
              style={{
                backgroundColor: 'rgba(8,12,24,0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <nav className="flex flex-col gap-4 py-4 px-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-white font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}

                <Link
                  href="/#pricing"
                  prefetch={false}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all duration-200 text-center mt-2 shadow-lg shadow-indigo-500/20"
                >
                  {t.header.startFreeTrial}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 origin-left"
        style={{ scaleX: scrollProgress }}
      />
    </header>
  )
}
