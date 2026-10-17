'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { localeHref } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'
import HeroLayout from '@/components/hero/HeroLayout'
import RotatingHeadline from '@/components/hero/RotatingHeadline'
import PlatformVisual from '@/components/visuals/PlatformVisual'

const CONTENT = {
  en: {
    lead: 'One platform for',
    phrases: ['property managers', 'service providers'],
    readAs: 'property managers and service providers',
    subtitle:
      'Two solutions on one platform. Property management for property managers, landlords and hotels. And a solution for independent businesses, from barbers to fitness coaches, to take bookings from their own clients and new customers.',
    doorsLabel: 'Choose your solution',
  },
  ar: {
    lead: 'منصة واحدة تخدم',
    phrases: ['مديري العقارات', 'مقدمي الخدمات'],
    readAs: 'مديري العقارات ومقدمي الخدمات',
    subtitle:
      'حلّان على منصة واحدة. إدارة العقارات لمديري العقارات والملاك والفنادق. وحل للأنشطة المستقلة، من الحلاقين إلى مدربي اللياقة، لاستقبال الحجوزات من عملائها ومن عملاء جدد.',
    doorsLabel: 'اختر الحل المناسب لك',
  },
} as const

/** One door per solution (lib/platform/solutions.ts), equal weight. */
function SolutionDoors() {
  const { language } = useLanguage()
  return (
    <nav aria-label={CONTENT[language].doorsLabel} className="w-full">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PLATFORM_SOLUTIONS.map((s) => (
          <li key={s.key}>
            <Link
              href={localeHref(s.href, language)}
              prefetch={false}
              className="solution-door group flex h-full flex-col gap-1 rounded-[var(--radius-md)] px-5 py-4 text-start"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--accent-hi)' }}>
                {s.audience[language]}
              </span>
              <span className="flex items-center justify-between gap-3 font-semibold text-strong" style={{ fontSize: 16 }}>
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

/** The homepage top: the platform first, then a door into each solution. */
export default function Hero() {
  const { language } = useLanguage()
  const t = CONTENT[language]
  return (
    <HeroLayout
      headline={<RotatingHeadline lead={t.lead} phrases={t.phrases} readAs={t.readAs} />}
      subtitle={t.subtitle}
      actions={<SolutionDoors />}
      visual={<PlatformVisual />}
    />
  )
}
