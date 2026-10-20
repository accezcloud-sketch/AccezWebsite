'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import CenteredHero from '@/components/hero/CenteredHero'
import HeroProductTabs from '@/components/home/HeroProductTabs'

/** Riyadh at dusk (Kingdom Centre). Photo by Ibrahim Abdullah on Unsplash. */
const RIYADH = { src: '/images/hero/riyadh-1600.webp', srcSet: '/images/hero/riyadh-1600.webp 1600w, /images/hero/riyadh-2880.webp 2880w' }

const CONTENT = {
  en: {
    title: 'One platform for property managers',
    accent: 'and service providers',
    subtitle: 'Property management for rentals, hotels and sales. Bookings for barbers, salons, spas and coaches.',
    doorsLabel: 'Choose your solution',
  },
  ar: {
    title: 'منصة واحدة لمديري العقارات',
    accent: 'ومقدمي الخدمات',
    subtitle: 'إدارة العقارات للإيجارات والفنادق والمبيعات. وحجوزات للحلاقين والصالونات والمنتجعات الصحية والمدربين.',
    doorsLabel: 'اختر الحل المناسب لك',
  },
} as const

/** One door per solution (lib/platform/solutions.ts), equal weight. */
function SolutionDoors() {
  const { language } = useLanguage()
  return (
    <nav aria-label={CONTENT[language].doorsLabel} className="w-full max-w-2xl">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PLATFORM_SOLUTIONS.map((s) => (
          <li key={s.key}>
            <Link
              href={localeHref(s.href, language)}
              prefetch={false}
              className="solution-door group flex h-full items-center rounded-[var(--radius-md)] px-5 py-4 text-start"
            >
              <span className="flex w-full items-center justify-between gap-3 font-semibold text-strong" style={{ fontSize: 16 }}>
                {s.name[language]}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** The homepage top: the platform, a door into each solution, then the real product. */
export default function Hero() {
  const { language } = useLanguage()
  const t = CONTENT[language]
  return (
    <CenteredHero
      title={t.title}
      accent={t.accent}
      subtitle={t.subtitle}
      actions={<SolutionDoors />}
      media={<HeroProductTabs locale={language} />}
      backdrop={RIYADH}
    />
  )
}
