'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Sample data for a provider's public booking page. */
const COPY = {
  en: {
    url: 'accez.cloud/business/lumiere-salon',
    category: 'Hair & beauty',
    name: 'Lumière Salon',
    meta: 'Open until 9:00 pm · Riyadh',
    reviews: '(128)',
    servicesTitle: 'Services',
    services: [
      { name: 'Haircut & beard', duration: '45 mins', price: 'SAR 90' },
      { name: 'Hair colour', duration: '90 mins', price: 'SAR 240' },
      { name: 'Manicure', duration: '30 mins', price: 'SAR 70' },
    ],
    slotsTitle: 'Pick a time',
    slots: ['10:00', '11:30', '1:00', '3:00', '4:30'],
    book: 'Book now',
  },
  ar: {
    url: 'accez.cloud/business/lumiere-salon',
    category: 'الشعر والتجميل',
    name: 'صالون لوميير',
    meta: 'مفتوح حتى 9:00 م · الرياض',
    reviews: '(128)',
    servicesTitle: 'الخدمات',
    services: [
      { name: 'قص شعر ولحية', duration: '45 دقيقة', price: '90 ر.س' },
      { name: 'صبغة شعر', duration: '90 دقيقة', price: '240 ر.س' },
      { name: 'مانيكير', duration: '30 دقيقة', price: '70 ر.س' },
    ],
    slotsTitle: 'اختر وقتًا',
    slots: ['10:00', '11:30', '1:00', '3:00', '4:30'],
    book: 'احجز الآن',
  },
} as const

const STEP_MS = 1600

/**
 * A provider's public booking page, after the real Accez listing page: the
 * business, its services with prices, and a time being picked. Sample data.
 */
export default function SpListingVisual() {
  const { language } = useLanguage()
  const m = COPY[language]
  const reduced = usePrefersReducedMotion()
  const [slot, setSlot] = useState(m.slots.length - 1)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setSlot((s) => (s + 1) % m.slots.length), STEP_MS)
    return () => clearInterval(id)
  }, [reduced, m.slots.length])

  return (
    <div className="relative w-full max-w-[460px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-3xl blur-[80px] opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 68%)' }} />
      <div className="relative rounded-2xl overflow-hidden" style={{ background: 'var(--panel)', border: '1px solid var(--border-hi)', boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k)))' }}>
        <div className="px-3.5 py-2 flex items-center gap-3" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-1.5" dir="ltr">
            {[0.16, 0.12, 0.09].map((a) => <div key={a} className="w-2 h-2 rounded-full" style={{ background: `rgb(var(--fg-rgb) / ${a})` }} />)}
          </div>
          <span className="text-[10px] font-medium text-faint truncate" dir="ltr">{m.url}</span>
        </div>

        <div className="p-4 sm:p-5">
          <p className="text-[9px] uppercase tracking-[0.14em] text-faint mb-1">{m.category}</p>
          <p className="text-strong font-bold text-lg sm:text-xl leading-tight hero-display">{m.name}</p>
          <p className="text-[10px] sm:text-[11px] text-faint mt-1">
            <span style={{ color: '#E0A44B' }}>★</span> <span className="text-strong font-semibold">4.9</span> {m.reviews} · {m.meta}
          </p>

          <p className="text-[11px] font-semibold text-strong mt-4 mb-2">{m.servicesTitle}</p>
          <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {m.services.map((s, i) => (
              <li key={s.name} className="flex items-center gap-3 py-2" style={{ borderColor: 'var(--border)' }}>
                <span className="w-8 h-8 rounded-md shrink-0" style={{ background: i === 0 ? 'var(--accent-dim)' : 'var(--surface-hi)' }} />
                <span className="flex-1 min-w-0">
                  <span className="block text-[11px] sm:text-xs text-strong font-medium truncate">{s.name}</span>
                  <span className="block text-[9px] sm:text-[10px] text-faint">{s.duration}</span>
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-strong shrink-0">{s.price}</span>
              </li>
            ))}
          </ul>

          <p className="text-[11px] font-semibold text-strong mt-3 mb-2">{m.slotsTitle}</p>
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {m.slots.map((t, i) => (
              <span
                key={t}
                className="text-[10px] sm:text-[11px] font-semibold tabular-nums px-2.5 py-1.5 rounded-md transition-colors duration-300"
                style={i === slot ? { background: 'var(--accent-solid)', color: '#fff', border: '1px solid var(--accent-solid)' } : { background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-lg py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.14em]" style={{ background: 'var(--navy-from)', color: '#fff' }}>
            {m.book}
          </div>
        </div>
      </div>
    </div>
  )
}
