import type { ReactNode } from 'react'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import Band from '@/components/ui/Band'
import CenteredHero, { type HeroBackdrop } from '@/components/hero/CenteredHero'
import HeroActions, { type HeroAction } from '@/components/hero/HeroActions'
import PhotoCta from '@/components/hero/PhotoCta'
import SectionHeader from '@/components/SectionHeader'
import ProductShot from '@/components/product/ProductShot'
import FeatureSteps from '@/components/product/FeatureSteps'
import MoreFeatures from '@/components/product/MoreFeatures'
import Breadcrumbs, { type Crumb } from '@/components/blog/Breadcrumbs'
import PostStrip from '@/components/blog/PostStrip'
import type { BlogPostMeta } from '@/lib/blog'
import type { ShotKey } from '@/lib/product/shots'
import { localeHref, type Locale } from '@/lib/i18n'

export interface DetailLink {
  label: string
  text: string
  /** Site route (localised here) or an absolute URL. */
  href: string
}

/** Everything a detail page shows, already in the page's language. */
export interface DetailView {
  locale: Locale
  crumbs: Crumb[]
  eyebrow?: string
  title: string
  accent?: string
  subtitle: string
  primary: HeroAction
  secondary?: HeroAction
  shots: { shot: ShotKey; title: string; text: string }[]
  pointsTitle: string
  points: { icon: LucideIcon; title: string; text: string }[]
  faqTitle: string
  faqs: { q: string; a: string }[]
  linksTitle: string
  links: DetailLink[]
  postsTitle: string
  posts: BlogPostMeta[]
  cta: { title: string; subtitle: string; photo: HeroBackdrop }
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 rtl:-scale-x-100" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** A real screenshot with its caption under it. */
function CaptionedShot({ shot, title, text, locale, priority = false }: { shot: ShotKey; title: string; text: string; locale: Locale; priority?: boolean }) {
  return (
    <figure>
      <ProductShot shot={shot} locale={locale} priority={priority} />
      <figcaption className="mt-4 text-center text-sm leading-relaxed">
        <span className="block font-semibold text-strong">{title}</span>
        <span className="block text-muted">{text}</span>
      </figcaption>
    </figure>
  )
}

/** One section on its band, with the site's usual width and spacing. */
function Section({ shade, id, children, width = 'max-w-7xl' }: { shade: 'base' | 'alt'; id?: string; children: ReactNode; width?: string }) {
  return (
    <Band shade={shade}>
      <section id={id} className="section-y" style={{ background: 'var(--section-bg, var(--bg))' }}>
        <div className={`${width} mx-auto px-4 sm:px-8 lg:px-12`}>{children}</div>
      </section>
    </Band>
  )
}

/**
 * The one layout of every detail page (a module, a kind of customer, an
 * integration): the breadcrumb trail and headline over a real screen, the
 * benefits, more real screens, short answers, where to go next, related
 * posts and a closing action. Little text: buyers scan.
 */
export default function DetailPage(v: DetailView) {
  const [first, ...more] = v.shots
  const href = (h: string) => (h.startsWith('/') ? localeHref(h, v.locale) : h)
  const shades = ['alt', 'base'] as const
  let n = 0
  const nextShade = () => shades[n++ % 2]

  return (
    <>
      <Band shade="base">
        <CenteredHero
          above={<Breadcrumbs items={v.crumbs} locale={v.locale} className="justify-center" />}
          eyebrow={v.eyebrow}
          title={v.title}
          accent={v.accent}
          subtitle={v.subtitle}
          actions={<HeroActions primary={v.primary} secondary={v.secondary} />}
          media={first && <CaptionedShot {...first} locale={v.locale} priority />}
        />
      </Band>

      <Section shade={nextShade()}>
        <SectionHeader lead={v.pointsTitle} />
        <MoreFeatures items={v.points} />
      </Section>

      {more.length > 0 && (
        <Section shade={nextShade()}>
          {more.length > 1 ? (
            <FeatureSteps id="detail-shots" steps={more} locale={v.locale} />
          ) : (
            <div className="max-w-4xl mx-auto">
              <CaptionedShot {...more[0]} locale={v.locale} />
            </div>
          )}
        </Section>
      )}

      {v.faqs.length > 0 && (
        <Section shade={nextShade()} width="max-w-5xl">
          <SectionHeader lead={v.faqTitle} />
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {v.faqs.map((f) => (
              <div key={f.q} className="ui-card p-6">
                <dt className="font-semibold text-strong leading-snug mb-2" style={{ fontSize: 17 }}>{f.q}</dt>
                <dd className="text-muted text-[15px] leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Section shade={nextShade()}>
        <SectionHeader lead={v.linksTitle} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {v.links.map((l) => (
            <li key={l.href} className="flex">
              <Link href={href(l.href)} prefetch={false} className="ui-card ui-card-interactive w-full p-6 flex flex-col gap-1.5">
                <span className="flex items-center justify-between gap-3 font-semibold text-strong">
                  {l.label}
                  <span className="text-accent-hi"><Arrow /></span>
                </span>
                <span className="text-sm text-muted leading-relaxed">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {v.posts.length > 0 && (
        <Band shade={nextShade()}>
          <PostStrip id="related-posts" heading={v.postsTitle} posts={v.posts} locale={v.locale} />
        </Band>
      )}

      <PhotoCta
        title={v.cta.title}
        subtitle={v.cta.subtitle}
        photo={v.cta.photo}
        actions={<HeroActions primary={v.primary} secondary={v.secondary} />}
      />
    </>
  )
}
