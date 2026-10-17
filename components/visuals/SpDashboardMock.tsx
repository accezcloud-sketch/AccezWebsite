'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/** Sample data for the service-provider dashboard mock-up. */
const COPY = {
  en: {
    url: 'provider.accez.cloud',
    bannerEyebrow: 'Service provider dashboard',
    welcome: 'Welcome back, Lumière Salon',
    welcomeSub: 'Here is what is happening with your bookings and team today.',
    stats: [
      { label: 'Bookings this month', value: '42', note: '+12% on last month' },
      { label: 'Revenue this month', value: 'SAR 8,420', note: 'Paid online' },
      { label: 'Average rating', value: '4.9', note: '128 reviews' },
    ],
    scheduleTitle: 'Today',
    scheduleMeta: 'Upcoming bookings',
    newTag: 'New',
    statusConfirmed: 'Confirmed',
    bookings: [
      { time: '4:30 pm', service: 'Haircut & beard', who: 'Omar · with Yousef' },
      { time: '3:00 pm', service: 'Hair colour', who: 'Sara · with Layan' },
      { time: '1:15 pm', service: 'Deep tissue massage', who: 'Faisal · with Noura' },
      { time: '11:00 am', service: 'Manicure', who: 'Huda · with Layan' },
      { time: '10:00 am', service: 'Kids haircut', who: 'Adam · with Yousef' },
    ],
    chipBooking: 'New booking · Haircut & beard · 4:30 pm',
    chipRatingValue: '4.9',
    chipRatingLabel: 'from 128 reviews',
  },
  ar: {
    url: 'provider.accez.cloud',
    bannerEyebrow: 'لوحة تحكم مقدم الخدمة',
    welcome: 'مرحبًا بعودتك، صالون لوميير',
    welcomeSub: 'هذا ما يحدث في حجوزاتك وفريقك اليوم.',
    stats: [
      { label: 'حجوزات هذا الشهر', value: '42', note: '+12% عن الشهر الماضي' },
      { label: 'إيرادات هذا الشهر', value: '8,420 ر.س', note: 'مدفوعة إلكترونيًا' },
      { label: 'متوسط التقييم', value: '4.9', note: '128 تقييمًا' },
    ],
    scheduleTitle: 'اليوم',
    scheduleMeta: 'الحجوزات القادمة',
    newTag: 'جديد',
    statusConfirmed: 'مؤكد',
    bookings: [
      { time: '4:30 م', service: 'قص شعر ولحية', who: 'عمر · مع يوسف' },
      { time: '3:00 م', service: 'صبغة شعر', who: 'سارة · مع ليان' },
      { time: '1:15 م', service: 'مساج عميق', who: 'فيصل · مع نورة' },
      { time: '11:00 ص', service: 'مانيكير', who: 'هدى · مع ليان' },
      { time: '10:00 ص', service: 'قص شعر للأطفال', who: 'آدم · مع يوسف' },
    ],
    chipBooking: 'حجز جديد · قص شعر ولحية · 4:30 م',
    chipRatingValue: '4.9',
    chipRatingLabel: 'من 128 تقييمًا',
  },
} as const

const VISIBLE_ROWS = 3
const ROTATE_MS = 3200

/** The navy icon rail of the Accez apps. */
function Rail() {
  return (
    <div className="hidden sm:flex flex-col items-center gap-3 py-3 w-10 shrink-0" style={{ background: 'var(--navy-from)' }} aria-hidden="true">
      <div className="w-5 h-5 rounded-md" style={{ background: 'rgba(255,255,255,0.9)' }} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-4 h-4 rounded" style={{ background: i === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.18)' }} />
      ))}
    </div>
  )
}

/**
 * The service-provider dashboard, drawn in code after the real Accez provider
 * dashboard: a welcome banner, this month's figures and today's bookings, with
 * a new booking arriving every few seconds. Sample data only.
 */
export default function SpDashboardMock() {
  const { language, isRTL } = useLanguage()
  const m = COPY[language]
  const reduced = usePrefersReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setOffset((o) => (o + 1) % m.bookings.length), ROTATE_MS)
    return () => clearInterval(id)
  }, [reduced, m.bookings.length])

  // The newest booking is on top; each tick a new one arrives.
  const rows = Array.from({ length: VISIBLE_ROWS }, (_, i) => m.bookings[(offset + i) % m.bookings.length])

  return (
    <div className="relative flex flex-col items-center lg:items-end w-full">
      <div className="relative w-full max-w-[460px]">
        <div className="absolute inset-0 rounded-3xl blur-[70px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 40%, var(--accent), transparent 68%)' }} aria-hidden="true" />

        <div
          className="card-float card-tilt relative rounded-2xl overflow-hidden"
          style={{ background: 'var(--panel)', border: '1px solid var(--border-hi)', boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k)))' }}
          dir="ltr"
          aria-hidden="true"
        >
          <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <div className="flex gap-1.5">
              {[0.16, 0.12, 0.09].map((a) => <div key={a} className="w-2 h-2 rounded-full" style={{ background: `rgb(var(--fg-rgb) / ${a})` }} />)}
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-faint">{m.url}</span>
            <div className="w-10" />
          </div>

          <div className="flex" dir={isRTL ? 'rtl' : 'ltr'}>
            <Rail />
            <div className="flex-1 min-w-0 p-3 sm:p-4 space-y-3">
              <div className="rounded-xl px-4 py-3.5" style={{ background: 'linear-gradient(135deg, var(--navy-from), var(--navy-to))' }}>
                <p className="text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{m.bannerEyebrow}</p>
                <p className="font-semibold text-sm sm:text-base leading-tight" style={{ color: '#fff' }}>{m.welcome}</p>
                <p className="text-[10px] mt-1 truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{m.welcomeSub}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {m.stats.map((s, i) => (
                  <div key={s.label} className="rounded-lg p-2 sm:p-2.5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="text-[8.5px] sm:text-[9px] uppercase tracking-wider leading-tight mb-1 text-faint truncate">{s.label}</p>
                    <p className="text-strong font-semibold text-xs sm:text-[15px] leading-none mb-1 tracking-tight">
                      {i === 2 && <span style={{ color: '#E0A44B' }}>★ </span>}
                      {s.value}
                    </p>
                    <p className="text-[8.5px] sm:text-[9.5px] truncate" style={{ color: i === 0 ? 'var(--ok)' : 'var(--text-faint)' }}>{s.note}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg p-2.5 sm:p-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-[11px] sm:text-xs text-strong font-medium">{m.scheduleTitle}</p>
                  <p className="text-[9px] sm:text-[10px] text-faint">{m.scheduleMeta}</p>
                </div>
                <ul className="space-y-1.5">
                  {rows.map((b, i) => (
                    <li
                      key={`${offset}-${b.time}`}
                      className="sp-row flex items-center gap-2.5 rounded-md px-2 py-1.5"
                      style={{ background: i === 0 ? 'var(--accent-dim)' : 'transparent', animationDelay: `${i * 60}ms` }}
                    >
                      <span className="text-[10px] sm:text-[11px] font-semibold tabular-nums w-14 shrink-0" style={{ color: 'var(--accent-hi)' }}>{b.time}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-strong text-[10px] sm:text-[11px] font-medium truncate leading-tight">{b.service}</span>
                        <span className="block text-[9px] sm:text-[10px] text-faint truncate">{b.who}</span>
                      </span>
                      <span
                        className="text-[9px] font-semibold px-1.5 py-0.5 rounded shrink-0"
                        style={i === 0 ? { background: 'var(--accent-solid)', color: '#fff' } : { background: 'var(--ok-dim)', color: 'var(--ok-text)' }}
                      >
                        {i === 0 ? m.newTag : m.statusConfirmed}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Floating notifications: desktop only, where there is room around the card. */}
        <div className={`hero-chip anim-pop-1 hidden lg:flex absolute -top-9 items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-strong ${isRTL ? '-left-6' : '-right-6'}`} aria-hidden="true">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent-hi)' }} />
          {m.chipBooking}
        </div>
        <div className={`hero-chip anim-pop-2 hidden lg:flex absolute -bottom-5 items-center gap-3 px-3.5 py-2.5 rounded-xl ${isRTL ? '-right-6' : '-left-6'}`} aria-hidden="true">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm" style={{ background: 'rgba(224,164,75,0.15)', color: '#E0A44B' }}>★</div>
          <div>
            <p className="text-strong text-sm font-semibold leading-none mb-1">{m.chipRatingValue}</p>
            <p className="text-[10px] text-faint">{m.chipRatingLabel}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
