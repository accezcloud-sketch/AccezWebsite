import type { Metadata } from 'next'
import Link from 'next/link'
import { localeHref, type Locale } from '@/lib/i18n'

// The site previously shipped Next.js's stock 404 — the text "404: This page
// could not be found." and nothing else. Any mistyped URL, stale external link
// or link-rot hit was a dead end with no way back into the site.
//
// A 404 still correctly returns a 404 status and is not indexed; the value here
// is recovering the visitor (and the crawler's link equity) by offering real
// routes onward instead of a blank wall.
export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist or has moved.',
  robots: { index: false, follow: true },
}

// A static export has one 404 page for every URL, English or Arabic, so it
// speaks both languages; each block links into its own language's pages.
const COPY: Record<Locale, { eyebrow: string; title: string; body: string; nav: string; links: { href: string; label: string }[] }> = {
  en: {
    eyebrow: 'Error 404',
    title: "We couldn't find that page",
    body: 'The link may be out of date, or the page may have moved. Here is where most people are heading.',
    nav: 'Helpful links',
    links: [
      { href: '/', label: 'Home' },
      { href: '/modules', label: 'Product modules' },
      { href: '/owners', label: 'Owners & payouts' },
      { href: '/hotels', label: 'Hotels & serviced apartments' },
      { href: '/blog', label: 'Blog' },
      { href: '/support', label: 'Support' },
    ],
  },
  ar: {
    eyebrow: 'خطأ 404',
    title: 'لم نتمكن من العثور على هذه الصفحة',
    body: 'ربما يكون الرابط قديماً أو تم نقل الصفحة. إليك الصفحات التي يقصدها معظم الزوار.',
    nav: 'روابط مفيدة',
    links: [
      { href: '/', label: 'الرئيسية' },
      { href: '/modules', label: 'وحدات المنتج' },
      { href: '/owners', label: 'إدارة الملاك' },
      { href: '/hotels', label: 'الفنادق والشقق المخدومة' },
      { href: '/blog', label: 'المدونة' },
      { href: '/support', label: 'الدعم' },
    ],
  },
}

function Block({ locale, isTitle }: { locale: Locale; isTitle: boolean }) {
  const c = COPY[locale]
  const Heading = isTitle ? 'h1' : 'h2'
  return (
    <section lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="w-full max-w-xl text-center">
      <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-4" style={{ color: 'var(--accent-hi)' }}>
        {c.eyebrow}
      </p>
      <Heading
        className="text-white font-bold tracking-tight mb-4"
        style={{
          fontSize: 'clamp(26px, 4vw, 38px)',
          fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
          fontWeight: 800,
        }}
      >
        {c.title}
      </Heading>
      <p className="mb-8 leading-relaxed mx-auto" style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: '34rem' }}>
        {c.body}
      </p>
      <nav aria-label={c.nav}>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {c.links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={localeHref(href, locale)}
                className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2"
                style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-14 px-6 py-24" style={{ background: 'var(--bg)' }}>
      <Block locale="en" isTitle />
      <div aria-hidden="true" className="w-24" style={{ borderTop: '1px solid var(--border)' }} />
      <Block locale="ar" isTitle={false} />
    </main>
  )
}
