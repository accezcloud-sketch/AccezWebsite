import Link from 'next/link'
import { localeHref, type Locale } from '@/lib/i18n'
import { PORTAL_SIGN_UP } from '@/lib/links'
import { productCta } from '@/lib/content/productPages'
import type { ProductPageKey } from '@/lib/content/productMatch'

/**
 * End-of-post call to action pointing at the product page that matches the
 * post's topic (see lib/content/productMatch.ts), with the site's standard
 * "Book a demo" / "Start free" pair.
 *
 * Server-rendered and not animated, so the product link is in the static HTML
 * for crawlers and visible without JavaScript.
 */

interface ProductCtaProps {
  product: ProductPageKey
  locale: Locale
}

export default function ProductCta({ product, locale }: ProductCtaProps) {
  const c = productCta(product, locale)
  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: locale === 'ar' ? 'scaleX(-1)' : undefined }} aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <section aria-labelledby="post-product-cta" className="pb-16" style={{ background: 'var(--section-bg, var(--bg))' }}>
      <div className="container mx-auto px-4">
        <div
          className="rounded-3xl px-6 py-10 sm:px-10 max-w-3xl mx-auto"
          style={{ background: 'linear-gradient(135deg, rgba(49,159,212,0.14), var(--surface))', border: '1px solid var(--accent-line)' }}
        >
          <span
            className="ui-chip mb-4"
          >
            {c.eyebrow}
          </span>
          <h2
            id="post-product-cta"
            className="text-strong font-bold tracking-tight mb-3"
            style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontFamily: 'var(--font-heading), system-ui, sans-serif', fontWeight: 800 }}
          >
            {c.title}
          </h2>
          <p className="mb-6 leading-relaxed" style={{ fontSize: 16, color: 'var(--text-muted)' }}>
            {c.description}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center">
            <a
              href={localeHref('/#contact', locale)}
              className="ui-btn ui-btn-primary"
            >
              {c.bookDemo}
              {arrow}
            </a>
            <a
              href={PORTAL_SIGN_UP}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-btn ui-btn-glass"
            >
              {c.startFree}
            </a>
            <Link
              href={localeHref(c.route, locale)}
              prefetch={false}
              className="inline-flex items-center justify-center gap-1.5 px-2 py-3 text-sm font-medium"
              style={{ color: 'var(--accent-hi)' }}
            >
              {c.learnMore}: {c.eyebrow}
              {arrow}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
