'use client'

import { useLanguage } from '@/contexts/LanguageContext'

/** Sample figures for the property-manager dashboard mock-up. */
const COPY = {
  en: {
      url: 'portal.accez.cloud',
      stats: [
        { label: 'Active listings',  value: '47',     delta: '+3'   },
        { label: 'Monthly revenue',  value: 'SAR 24.8k', delta: '+18%' },
        { label: 'Occupancy rate',   value: '91%',    delta: '+5%'  },
      ],
      deltaSuffix: 'this mo.',
      chartTitle: 'Revenue',
      chartRange: 'Last 7 days',
      chartDelta: '18.4%',
      dayLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      bookingsTitle: 'Recent bookings',
      bookings: [
        { name: 'Sarah M.', channel: 'Airbnb',      nights: '3 nights', status: 'Check in',  state: 'active'    },
        { name: 'James K.', channel: 'Booking.com', nights: '5 nights', status: 'Confirmed', state: 'confirmed' },
        { name: 'Layla R.', channel: 'VRBO',        nights: '2 nights', status: 'Pending',   state: 'pending'   },
      ],
      syncStatus: 'All 400+ channels synced',
      syncMeta: 'Updated 2 min ago',
      notif: 'New booking · Airbnb · SAR 340',
      pillValue: '+SAR 3,240',
      pillLabel: 'Service revenue this week',
    },
  ar: {
      url: 'portal.accez.cloud',
      stats: [
        { label: 'القوائم النشطة',   value: '47',     delta: '+3'   },
        { label: 'الإيرادات الشهرية', value: '24.8k ر.س', delta: '+18%' },
        { label: 'معدل الإشغال',      value: '91%',    delta: '+5%'  },
      ],
      deltaSuffix: 'هذا الشهر',
      chartTitle: 'الإيرادات',
      chartRange: 'آخر 7 أيام',
      chartDelta: '18.4%',
      dayLabels: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
      bookingsTitle: 'الحجوزات الأخيرة',
      bookings: [
        { name: 'سارة م.',  channel: 'Airbnb',      nights: '3 ليالٍ', status: 'تسجيل دخول', state: 'active'    },
        { name: 'جيمس ك.', channel: 'Booking.com', nights: '5 ليالٍ', status: 'مؤكد',       state: 'confirmed' },
        { name: 'ليلى ر.',  channel: 'VRBO',        nights: 'ليلتان',  status: 'قيد الانتظار', state: 'pending'  },
      ],
      syncStatus: 'تمت مزامنة جميع القنوات الـ 400+',
      syncMeta: 'آخر تحديث منذ دقيقتين',
      notif: 'حجز جديد · Airbnb · 340 ر.س',
      pillValue: '+3,240 ر.س',
      pillLabel: 'إيرادات الخدمات هذا الأسبوع',
    },
} as const

/**
 * The property-manager dashboard, drawn in code: stat tiles, a revenue chart,
 * recent bookings and channel sync, with two floating notifications. Sample
 * data only. Used at the top of the property management solution page.
 */
export default function PmDashboardMock() {
  const { language, isRTL } = useLanguage()
  const m = COPY[language]
  return (

    <div className="relative flex flex-col items-center lg:items-end w-full lg:pr-4 mt-4 lg:mt-0">
      <div className="relative w-full max-w-[420px] lg:max-w-md">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-3xl blur-[60px] sm:blur-[80px] opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(49, 159, 212,0.7), transparent 68%)',
          }}
          aria-hidden="true"
        />

        <div
          className="card-float card-tilt relative rounded-2xl overflow-hidden"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--border-hi)',
            boxShadow: '0 20px 48px rgb(var(--shadow-rgb) / calc(0.5 * var(--shadow-k))), 0 0 0 1px rgb(var(--fg-rgb) / 0.06)',
            backdropFilter: 'blur(20px)',
          }}
          dir="ltr"
        >
          {/* Header bar */}
          <div
            className="px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between"
            style={{
              background: 'var(--surface)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgb(var(--fg-rgb) / 0.16)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgb(var(--fg-rgb) / 0.12)' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgb(var(--fg-rgb) / 0.09)' }} />
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide" style={{ color: 'var(--text-faint)' }}>
              {m.url}
            </span>
            <div className="w-10 sm:w-12" />
          </div>

          <div className="p-3 sm:p-5 space-y-3" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {m.stats.map(({ label, value, delta }) => (
                <div
                  key={label}
                  className="rounded-lg sm:rounded-xl p-2 sm:p-3"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p className="text-[9px] sm:text-[10px] mb-1 leading-tight truncate" style={{ color: 'var(--text-faint)' }}>{label}</p>
                  <p className="text-strong font-semibold text-sm sm:text-lg leading-none mb-1 tracking-tight">{value}</p>
                  <p className="text-[9px] sm:text-[10px] font-medium" style={{ color: 'var(--ok)' }}>
                    {delta} <span style={{ color: 'var(--text-faint)' }}>{m.deltaSuffix}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div
              className="rounded-lg sm:rounded-xl p-2.5 sm:p-3.5"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[11px] sm:text-xs text-strong font-medium leading-none mb-1">{m.chartTitle}</p>
                  <p className="text-[9px] sm:text-[10px]" style={{ color: 'var(--text-faint)' }}>{m.chartRange}</p>
                </div>
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium"
                  style={{ background: 'var(--ok-dim)', color: 'var(--ok)' }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                    <path d="M4 6.5v-5M1.8 3.7 4 1.5l2.2 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {m.chartDelta}
                </span>
              </div>
              <div className="flex items-end gap-1 sm:gap-1.5 h-10 sm:h-14">
                {[55, 72, 48, 90, 65, 88, 100].map((h, i) => (
                  <div key={i} className="flex-1">
                    <div
                      className="w-full rounded-[3px]"
                      style={{
                        height: `${h * 0.38}px`,
                        background: i === 6 ? 'var(--accent)' : 'rgba(49, 159, 212,.22)',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {m.dayLabels.map((d, i) => (
                  <span key={i} className="flex-1 text-center text-[8px] sm:text-[9px]" style={{ color: 'var(--text-faint)' }}>{d}</span>
                ))}
              </div>
            </div>

            {/* Recent bookings */}
            <div
              className="rounded-lg sm:rounded-xl p-2.5 sm:p-3.5"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-[11px] sm:text-xs text-strong font-medium mb-2.5 sm:mb-3">{m.bookingsTitle}</p>
              <div className="space-y-2 sm:space-y-2.5">
                {m.bookings.map(({ name, channel, nights, status, state }) => {
                  const dot =
                    state === 'confirmed' ? 'var(--ok)'
                    : state === 'active'  ? 'var(--accent-hi)'
                    : 'rgb(var(--fg-rgb) / 0.28)'
                  return (
                    <div key={name} className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-semibold flex-shrink-0"
                        style={{
                          background: 'var(--surface-hi)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-strong text-[10px] sm:text-[11px] font-medium truncate leading-tight">{name}</p>
                        <p className="text-[9px] sm:text-[10px] truncate" style={{ color: 'var(--text-faint)' }}>{channel} · {nights}</p>
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-medium flex-shrink-0"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
                        {status}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Sync status */}
            <div
              className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-lg"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="relative w-1.5 h-1.5 flex-shrink-0">
                <div className="absolute inset-0 rounded-full" style={{ background: 'var(--ok)' }} />
                <div className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: 'var(--ok)' }} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium truncate" style={{ color: 'var(--text-muted)' }}>
                {m.syncStatus}
              </span>
              <span className="text-[9px] sm:text-[10px] ms-auto flex-shrink-0" style={{ color: 'var(--text-faint)' }}>
                {m.syncMeta}
              </span>
            </div>
          </div>
        </div>

        {/* Floating pills, DESKTOP ONLY (absolutely positioned, can clip on mobile) */}
        <div
          className={`hidden lg:flex absolute -top-9 items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium ${
            isRTL ? '-left-6' : '-right-6'
          }`}
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--accent-line)',
            boxShadow: '0 10px 30px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))',
            backdropFilter: 'blur(12px)',
            color: 'var(--text)',
            animation: 'fade-up .7s .8s both ease-out',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-hi)' }} />
          {m.notif}
        </div>

        <div
          className={`hidden lg:flex absolute -bottom-5 items-center gap-3 px-3.5 py-2.5 rounded-xl ${
            isRTL ? '-right-6' : '-left-6'
          }`}
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--border-hi)',
            boxShadow: '0 12px 32px rgb(var(--shadow-rgb) / calc(0.45 * var(--shadow-k)))',
            backdropFilter: 'blur(12px)',
            animation: 'fade-up .7s .95s both ease-out',
          }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--accent-dim)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 10l3-3 2.5 2.5L11 4" stroke="var(--accent-hi)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-strong text-sm font-semibold leading-none mb-1 tracking-tight">{m.pillValue}</p>
            <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{m.pillLabel}</p>
          </div>
        </div>
      </div>

      {/* Inline pill strip, MOBILE/TABLET ONLY (replaces clipping absolute pills) */}
      <div className="flex lg:hidden gap-2 mt-4 w-full max-w-[420px]">
        <div
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-center"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--accent-line)',
            color: 'var(--text)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-hi)' }} />
          {m.notif}
        </div>
        <div
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-hi)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 8l2.5-2.5 2 2L10 3" stroke="var(--accent-hi)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold text-xs" style={{ color: 'var(--text)' }}>{m.pillValue}</span>
        </div>
      </div>
    </div>
  )
}
