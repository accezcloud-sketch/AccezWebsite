'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

/** Sample data for the homepage visual: one window per solution. */
const COPY = {
  en: {
    platform: 'One platform',
    pm: {
      tag: 'Property management',
      url: 'portal.accez.cloud',
      stats: [
        { label: 'Occupancy', value: '91%' },
        { label: 'Properties', value: '24' },
        { label: 'Revenue', value: 'SAR 353k' },
      ],
      rows: [
        { name: 'Unit 4B · Al Olaya', state: 'Check-in today' },
        { name: 'Villa 3 · Hittin', state: 'Booked · 5 nights' },
        { name: 'Unit 12A · Al Malqa', state: 'Work order done' },
      ],
    },
    sp: {
      tag: 'Service providers',
      url: 'provider.accez.cloud',
      title: 'Today',
      meta: '6 bookings',
      rows: [
        { time: '4:30 pm', service: 'Haircut & beard' },
        { time: '3:00 pm', service: 'Hair colour' },
        { time: '1:15 pm', service: 'Deep tissue massage' },
      ],
    },
    chipPm: 'Check-in confirmed · Unit 4B',
    chipSp: 'New booking · Haircut · 4:30 pm',
  },
  ar: {
    platform: 'منصة واحدة',
    pm: {
      tag: 'إدارة العقارات',
      url: 'portal.accez.cloud',
      stats: [
        { label: 'الإشغال', value: '91%' },
        { label: 'العقارات', value: '24' },
        { label: 'الإيرادات', value: '353 ألف ر.س' },
      ],
      rows: [
        { name: 'وحدة 4B · العليا', state: 'تسجيل وصول اليوم' },
        { name: 'فيلا 3 · حطين', state: 'محجوزة · 5 ليالٍ' },
        { name: 'وحدة 12A · الملقا', state: 'اكتمل أمر العمل' },
      ],
    },
    sp: {
      tag: 'مقدمو الخدمات',
      url: 'provider.accez.cloud',
      title: 'اليوم',
      meta: '6 حجوزات',
      rows: [
        { time: '4:30 م', service: 'قص شعر ولحية' },
        { time: '3:00 م', service: 'صبغة شعر' },
        { time: '1:15 م', service: 'مساج عميق' },
      ],
    },
    chipPm: 'تأكيد تسجيل الوصول · وحدة 4B',
    chipSp: 'حجز جديد · قص شعر · 4:30 م',
  },
} as const

function Window({ url, tag, children, className = '' }: { url: string; tag: string; children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{ background: 'var(--panel)', border: '1px solid var(--border-hi)', boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))' }}
    >
      <div className="px-3.5 py-2 flex items-center gap-3" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex gap-1.5" dir="ltr">
          {[0.16, 0.12, 0.09].map((a) => <div key={a} className="w-2 h-2 rounded-full" style={{ background: `rgb(var(--fg-rgb) / ${a})` }} />)}
        </div>
        <span className="text-[10px] font-medium text-faint truncate" dir="ltr">{url}</span>
        <span className="ms-auto text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0" style={{ background: 'var(--accent-dim)', color: 'var(--accent-hi)', border: '1px solid var(--accent-line)' }}>
          {tag}
        </span>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  )
}

/**
 * The homepage visual: one window for each solution, overlapping, joined by
 * the Accez mark. Sample data only.
 */
export default function PlatformVisual() {
  const { language, isRTL } = useLanguage()
  const m = COPY[language]
  const dots = ['var(--accent-hi)', 'var(--ok)', 'rgb(var(--fg-rgb) / 0.3)']

  return (
    <div className="relative w-full max-w-[500px]" aria-hidden="true">
      <div className="absolute inset-0 rounded-3xl blur-[80px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 45% 45%, var(--accent), transparent 68%)' }} />

      {/* Property management window */}
      <div className="card-float-soft relative w-[88%]">
        <Window url={m.pm.url} tag={m.pm.tag}>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {m.pm.stats.map((s) => (
              <div key={s.label} className="rounded-lg p-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="text-[9px] text-faint truncate mb-1">{s.label}</p>
                <p className="text-strong font-semibold text-xs sm:text-sm leading-none tracking-tight truncate">{s.value}</p>
              </div>
            ))}
          </div>
          <ul className="space-y-1.5">
            {m.pm.rows.map((r, i) => (
              <li key={r.name} className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: 'var(--surface)' }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dots[i] }} />
                <span className="text-[10px] sm:text-[11px] text-strong font-medium truncate">{r.name}</span>
                <span className="ms-auto text-[9px] sm:text-[10px] text-faint shrink-0">{r.state}</span>
              </li>
            ))}
          </ul>
        </Window>
      </div>

      {/* Service provider window, overlapping the first; the Accez mark sits
          in the gap beside it, joining the two. */}
      <div className="card-float-soft relative w-[80%] ms-auto -mt-6" style={{ animationDelay: '-3.5s' }}>
        <div className="hero-chip absolute z-20 top-8 -start-14 sm:-start-16 w-11 h-11 rounded-full flex items-center justify-center" title={m.platform}>
          <Image src="/images/accez-logo.png" alt="" width={26} height={26} className="rounded-md" />
        </div>
        <Window url={m.sp.url} tag={m.sp.tag}>
          <div className="rounded-lg px-3 py-2.5 mb-2.5 flex items-baseline justify-between" style={{ background: 'linear-gradient(135deg, var(--navy-from), var(--navy-to))' }}>
            <span className="text-sm font-semibold" style={{ color: '#fff' }}>{m.sp.title}</span>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.7)' }}>{m.sp.meta}</span>
          </div>
          <ul className="space-y-1.5">
            {m.sp.rows.map((r, i) => (
              <li key={r.time} className="flex items-center gap-2.5 rounded-md px-2 py-1.5" style={{ background: i === 0 ? 'var(--accent-dim)' : 'var(--surface)' }}>
                <span className="text-[10px] sm:text-[11px] font-semibold tabular-nums shrink-0" style={{ color: 'var(--accent-hi)' }}>{r.time}</span>
                <span className="text-[10px] sm:text-[11px] text-strong font-medium truncate">{r.service}</span>
              </li>
            ))}
          </ul>
        </Window>
      </div>

      {/* Floating notifications, one per solution: desktop only. */}
      <div className={`hero-chip anim-pop-1 hidden lg:flex absolute -top-9 items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-strong ${isRTL ? 'left-0' : 'right-0'}`}>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--ok)' }} />
        {m.chipPm}
      </div>
      <div className={`hero-chip anim-pop-2 hidden lg:flex absolute -bottom-9 items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-strong ${isRTL ? 'right-0' : 'left-0'}`}>
        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent-hi)' }} />
        {m.chipSp}
      </div>
    </div>
  )
}
