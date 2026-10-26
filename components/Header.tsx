'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { usePresence } from '@/components/ui/usePresence'
import { useLanguage } from '@/contexts/LanguageContext'
import ThemeToggle from '@/components/ThemeToggle'
import { localeHref } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS, solutionForPath } from '@/lib/platform/solutions'
import { LEGAL_DOCUMENTS, legalHref } from '@/lib/legal/documents'
import NavDropdown from '@/components/nav/NavDropdown'
import MobileNavGroup from '@/components/nav/MobileNavGroup'
import type { NavSection } from '@/components/nav/types'
import { activeNavSection, isCurrentPath, type NavSectionKey } from '@/lib/nav/activeSection'
import { DOWNLOADS_ROUTE, REGULATIONS_HUB_ROUTE, RESOURCE_MENU } from '@/lib/resources/routes'

/** Pages whose top is a photo (components/hero/photos.ts): the header starts in white on it. */
const PHOTO_TOPS = new Set(['/', '/ar', '/solutions/property-managers', '/ar/solutions/property-managers', '/solutions/service-providers', '/ar/solutions/service-providers'])

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname() ?? '/'
  const section = activeNavSection(pathname)
  // The main action follows the audience of the page: a provider page offers a
  // provider account, everything else a demo.
  const audienceAction = solutionForPath(pathname)?.primaryAction
  const action = audienceAction
    ? { label: audienceAction.label[language], href: audienceAction.external ? audienceAction.href : localeHref(audienceAction.href, language), external: !!audienceAction.external }
    : { label: t.header.bookDemo, href: localeHref('/#contact', language), external: false }
  const actionProps = action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  // Scroll progress bar: its width is set straight on the element (no React
  // render per scroll event), and eased by a short CSS transition.
  const progressRef = useRef<HTMLDivElement>(null)
  const mobileMenu = usePresence(isMobileMenuOpen, 280)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 50)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // ── Menus, built from the platform's solutions (lib/platform/solutions.ts) ──
  const ar = language === 'ar'
  const href = (route: string) => localeHref(route, language)

  // Solutions: one entry per solution, each opening that solution's page.
  const productSections: NavSection[] = [
    { links: PLATFORM_SOLUTIONS.map((s) => ({ label: s.name[language], description: s.audience[language], href: href(s.href) })) },
  ]

  // Pricing: one entry per audience, straight to that solution's plans.
  const pricingSections: NavSection[] = [
    {
      links: PLATFORM_SOLUTIONS.map((s) => ({ label: s.audience[language], description: s.pricingNote[language], href: href(s.pricingHref) })),
    },
  ]

  // Resources: the FAQ and the free resources, then the legal documents
  // (lib/legal/documents.ts). Each legal link goes to its short "who are you?"
  // page, which leads to the reader's version.
  const resourcesSections: NavSection[] = [
    { links: [{ label: t.header.faq, href: href('/faq') }, { label: t.footer.integrations, href: href('/integrations') }] },
    { links: LEGAL_DOCUMENTS.map((d) => ({ label: d.title[language], href: href(legalHref(d.key)) })) },
  ]

  // Sign in: each solution has its own portal, so the menu names the role.
  const signInSections: NavSection[] = [
    { links: PLATFORM_SOLUTIONS.map((s) => ({ label: s.role[language], description: s.roleSummary[language], href: s.loginUrl, external: true })) },
  ]

  // Before scrolling, on a photo, the header is white text on the photo.
  const onPhoto = !scrolled && !isMobileMenuOpen && PHOTO_TOPS.has(pathname.replace(/\/$/, '') || '/')
  const linkClass = [
    'text-sm font-medium transition-colors duration-200',
    onPhoto ? 'text-white/85 hover:text-white' : scrolled ? 'text-soft hover:text-strong' : 'text-muted hover:text-strong',
  ].join(' ')
  // Where the visitor is: the menu item of the current page is marked, and so
  // is the current page inside an open menu.
  const navClass = (key: NavSectionKey) => `${linkClass}${section === key ? ' nav-active' : ''}`
  const markCurrent = (sections: NavSection[]): NavSection[] =>
    sections.map((s) => ({ ...s, links: s.links.map((l) => ({ ...l, current: !l.external && isCurrentPath(l.href, pathname) })) }))
  const topLinks: { key: NavSectionKey; label: string; to: string }[] = [
    { key: 'blog', label: t.header.blog, to: '/blog' },
    { key: 'support', label: t.header.support, to: '/support' },
    { key: 'about', label: t.header.about, to: '/about' },
  ]
  const closeMobile = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-[100] w-full border-b',
        'transition-all duration-300 ease-in-out',
        // The open mobile menu needs the bar's own background: its buttons switch to
        // dark text, which would vanish over a dark photo on a transparent bar.
        scrolled || isMobileMenuOpen ? 'glass-bar' : 'border-transparent',
        onPhoto ? 'header-on-photo' : '',
      ].join(' ')}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo: the mark alone, linking home */}
          <Link
            href={href('/')}
            prefetch={false}
            aria-label={ar ? 'أكسيز.كلاود، الصفحة الرئيسية' : 'Accez.cloud, go to home'}
            className="flex items-center shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <Image src="/images/accez-logo.png" alt="" width={40} height={40} className="rounded-lg" priority />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label={ar ? 'القائمة الرئيسية' : 'Main'} className="hidden lg:flex items-center gap-6 xl:gap-8">
            <NavDropdown name="solutions" label={t.header.product} sections={markCurrent(productSections)} triggerClassName={linkClass} active={section === 'solutions'} />
            <NavDropdown name="pricing" label={t.header.pricing} sections={markCurrent(pricingSections)} triggerClassName={linkClass} active={section === 'pricing'} />
            {topLinks.map((item) => (
              <a key={item.key} href={href(item.to)} className={navClass(item.key)} aria-current={isCurrentPath(href(item.to), pathname) ? 'page' : undefined}>
                {item.label}
              </a>
            ))}
            <NavDropdown name="resources" label={ar ? 'الموارد' : 'Resources'} sections={markCurrent(resourcesSections)} align="end" triggerClassName={linkClass} active={section === 'resources'} />
          </nav>

          {/* Right side: theme, language, sign in, primary action */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle language={language} />
            <button onClick={() => setLanguage(ar ? 'en' : 'ar')} className={linkClass}>
              {ar ? 'English' : 'العربية'}
            </button>
            <NavDropdown name="sign-in" label={t.header.signIn} sections={signInSections} align="end" triggerClassName={linkClass} />
            <a href={action.href} {...actionProps} className="ui-btn ui-btn-primary" style={{ padding: '.55rem 1rem', fontSize: 14 }}>
              {action.label}
            </a>
          </div>

          {/* Mobile: theme, language, menu button */}
          <div className="lg:hidden flex items-center gap-1.5 min-[400px]:gap-2 ms-3">
            <ThemeToggle language={language} />
            <button onClick={() => setLanguage(ar ? 'en' : 'ar')} className={`p-2 font-medium transition-colors duration-200 ${onPhoto ? 'text-white/90 hover:text-white' : 'text-soft hover:text-strong'}`}>
              {ar ? 'EN' : 'العربية'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${onPhoto ? 'text-white/90 hover:text-white' : 'text-soft hover:text-strong'}`}
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
        {mobileMenu.mounted && (
          <div className="nav-sheet lg:hidden" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="motion-collapse" data-open={mobileMenu.shown}>
              <div>
                <nav aria-label={ar ? 'القائمة الرئيسية' : 'Main'} className="flex flex-col gap-1 py-4 px-2">
                  <MobileNavGroup name="solutions" label={t.header.product} sections={markCurrent(productSections)} onNavigate={closeMobile} />
                  <MobileNavGroup name="pricing" label={t.header.pricing} sections={markCurrent(pricingSections)} onNavigate={closeMobile} />
                  {topLinks.map((item) => (
                    <a
                      key={item.key}
                      href={href(item.to)}
                      onClick={closeMobile}
                      aria-current={isCurrentPath(href(item.to), pathname) ? 'page' : undefined}
                      className={`hover:text-strong font-medium transition-colors duration-200 py-2.5 ${section === item.key ? 'text-strong' : 'text-soft'}`}
                    >
                      {item.label}
                    </a>
                  ))}
                  <MobileNavGroup name="resources" label={ar ? 'الموارد' : 'Resources'} sections={markCurrent(resourcesSections)} onNavigate={closeMobile} />

                  {/* Sign in: flat, since a nested dropdown in a drawer is an extra tap. */}
                  <div className="mt-3 pt-3 flex flex-col gap-1" style={{ borderTop: '1px solid var(--border)' }}>
                    <p className="text-[0.7rem] uppercase tracking-wider pb-1 text-muted">{t.header.signIn}</p>
                    {PLATFORM_SOLUTIONS.map((s) => (
                      <a key={s.key} href={s.loginUrl} target="_blank" rel="noopener noreferrer" onClick={closeMobile} className="text-soft hover:text-strong font-medium transition-colors duration-200 py-2">
                        {s.role[language]}
                      </a>
                    ))}
                  </div>

                  <a href={action.href} {...actionProps} onClick={closeMobile} className="ui-btn ui-btn-primary mt-2">
                    {action.label}
                  </a>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
        style={{ transform: 'scaleX(0)', transition: 'transform .12s linear', background: 'linear-gradient(90deg, var(--accent), var(--accent-hi))' }}
      />
    </header>
  )
}
