import type { Metadata } from 'next'
import Link from 'next/link'

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

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/modules', label: 'Product modules' },
  { href: '/owners', label: 'Owners & payouts' },
  { href: '/hotels', label: 'Hotels & serviced apartments' },
  { href: '/blog', label: 'Blog' },
  { href: '/support', label: 'Support' },
]

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-24"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-xl text-center">
        <p
          className="text-xs font-semibold tracking-[0.16em] uppercase mb-4"
          style={{ color: 'var(--accent-hi)' }}
        >
          Error 404
        </p>

        <h1
          className="text-white font-bold tracking-tight mb-4"
          style={{
            fontSize: 'clamp(28px, 4.5vw, 42px)',
            fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
            fontWeight: 800,
          }}
        >
          We couldn&apos;t find that page
        </h1>

        <p
          className="mb-10 leading-relaxed mx-auto"
          style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: '34rem' }}
        >
          The link may be out of date, or the page may have moved. Here is where most
          people are heading.
        </p>

        <nav aria-label="Helpful links">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid var(--accent-line)',
                    color: 'var(--accent-hi)',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  )
}
