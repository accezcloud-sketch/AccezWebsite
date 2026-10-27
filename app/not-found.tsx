import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, CalendarCheck, Tags } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { localeHref, type Locale } from '@/lib/i18n'

// A 404 returns a 404 status and is not indexed; its job is to bring the
// visitor back into the site. A static export has ONE 404 page for every URL,
// English or Arabic, so the page holds both languages and a tiny script shows
// the Arabic one on /ar/ addresses (English without JavaScript).
export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist or has moved.',
  robots: { index: false, follow: true },
  // Set explicitly so the 404 doesn't inherit the homepage's social preview.
  openGraph: { title: 'Page not found | Accez', description: 'The page you are looking for does not exist or has moved.' },
}

const COPY: Record<Locale, {
  title: string
  body: string
  home: string
  support: string
  nav: string
  links: { href: string; label: string; text: string; icon: typeof Building2 }[]
}> = {
  en: {
    title: "This page doesn't exist",
    body: 'The link may be out of date, or the page may have moved. These will get you back on track.',
    home: 'Go to the homepage',
    support: 'Contact support',
    nav: 'Helpful links',
    links: [
      { href: '/solutions/property-managers', label: 'Property management', text: 'Rentals, leases, owners and sales.', icon: Building2 },
      { href: '/solutions/service-providers', label: 'Service providers', text: 'Bookings, team and customers.', icon: CalendarCheck },
      { href: '/pricing/property-managers', label: 'Pricing', text: 'Plans for each solution.', icon: Tags },
      { href: '/blog', label: 'Blog', text: 'Guides for running your business.', icon: BookOpen },
    ],
  },
  ar: {
    title: 'هذه الصفحة غير موجودة',
    body: 'ربما يكون الرابط قديمًا أو نُقلت الصفحة. هذه الروابط تعيدك إلى المسار الصحيح.',
    home: 'الذهاب إلى الصفحة الرئيسية',
    support: 'تواصل مع الدعم',
    nav: 'روابط مفيدة',
    links: [
      { href: '/solutions/property-managers', label: 'إدارة العقارات', text: 'الإيجارات والعقود والملاك والمبيعات.', icon: Building2 },
      { href: '/solutions/service-providers', label: 'مقدمو الخدمات', text: 'الحجوزات والفريق والعملاء.', icon: CalendarCheck },
      { href: '/pricing/property-managers', label: 'الأسعار', text: 'باقات كل حل.', icon: Tags },
      { href: '/blog', label: 'المدونة', text: 'أدلة لإدارة نشاطك.', icon: BookOpen },
    ],
  },
}

function Content({ locale }: { locale: Locale }) {
  const c = COPY[locale]
  const ar = locale === 'ar'
  return (
    <div data-nf={locale} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <section className="nf-hero relative overflow-hidden px-4 pb-16" style={{ paddingTop: 'calc(var(--nav-h) + 56px)' }}>
        <div className="nf-ring mx-auto flex items-center justify-center">
          {[0, 1.5, 3].map((d) => <span key={d} className="nf-wave" style={{ animationDelay: `${d}s` }} aria-hidden="true" />)}
          <p className="relative hero-display grad-text leading-none" style={{ fontSize: 'clamp(80px, 14vw, 150px)' }} dir="ltr">404</p>
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <h1 className="hero-display text-strong tracking-tight mt-10" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>{c.title}</h1>
          <p className="mt-4 leading-relaxed mx-auto" style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: '34rem' }}>{c.body}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localeHref('/', locale)} className="ui-btn ui-btn-primary">
              {c.home}
              <ArrowRight size={16} style={{ transform: ar ? 'scaleX(-1)' : undefined }} aria-hidden="true" />
            </Link>
            <Link href={localeHref('/support', locale)} className="ui-btn ui-btn-glass">{c.support}</Link>
          </div>
        </div>
      </section>

      <nav aria-label={c.nav} className="px-4 pb-24">
        <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.links.map(({ href, label, text, icon: Icon }) => (
            <li key={href} className="flex">
              <Link href={localeHref(href, locale)} className="ui-card ui-card-interactive w-full p-5 flex flex-col gap-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}>
                  <Icon size={18} color="var(--accent-hi)" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-strong font-semibold">{label}</span>
                <span className="text-sm text-muted leading-relaxed">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Footer locale={locale} />
    </div>
  )
}

// Runs before paint: on an Arabic address, mark <html> so the CSS shows the
// Arabic page. Only <html> changes (it allows that), so React hydrates the
// page unchanged.
const PICK_LANGUAGE = `(function(){if(/^\\/ar(\\/|$)/.test(location.pathname)){var h=document.documentElement;h.lang='ar';h.classList.add('nf-ar')}})()`

export default function NotFound() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <style>{`
        [data-nf="ar"], html.nf-ar [data-nf="en"] { display: none; }
        html.nf-ar [data-nf="ar"] { display: block; }
        .nf-hero { --nf-size: 260px; }
        @media (min-width: 768px) { .nf-hero { --nf-size: 340px; } }
        .nf-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(60% 50% at 50% 30%, rgb(var(--accent-rgb) / 0.14), transparent 70%);
        }
        .nf-ring {
          position: relative; width: var(--nf-size); height: var(--nf-size); border-radius: 9999px;
          border: 1px solid var(--accent-line);
          box-shadow: 0 0 24px rgb(var(--accent-rgb) / 0.16), inset 0 0 24px rgb(var(--accent-rgb) / 0.08);
        }
        .nf-wave {
          position: absolute; inset: 22%; border-radius: 9999px; border: 1.5px solid var(--accent-hi);
          opacity: 0; animation: nf-wave 4.5s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
        }
        @keyframes nf-wave { 0% { transform: scale(1); opacity: 0.45; } 100% { transform: scale(1.75); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .nf-wave { display: none; } }
      `}</style>
      <script dangerouslySetInnerHTML={{ __html: PICK_LANGUAGE }} />
      <Header />
      <Content locale="en" />
      <Content locale="ar" />
    </main>
  )
}
