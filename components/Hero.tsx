'use client'

import { useEffect, useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const TYPING_SPEED = 95
const DELETING_SPEED = 55
const PAUSE_AFTER_TYPE = 2400
const PAUSE_AFTER_DELETE = 500

type Phase = 'typing' | 'pausing' | 'deleting' | 'waiting'

function useTypewriter(strings: readonly string[]) {
  const [displayText, setDisplayText] = useState('')
  const [stringIndex, setStringIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [charIndex, setCharIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setDisplayText('')
    setStringIndex(0)
    setCharIndex(0)
    setPhase('typing')
  }, [strings])

  useEffect(() => {
    const current = strings[stringIndex] ?? ''
    const clear = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }

    if (phase === 'typing') {
      if (charIndex < current.length) {
        timerRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
        }, TYPING_SPEED)
      } else {
        timerRef.current = setTimeout(() => setPhase('pausing'), PAUSE_AFTER_TYPE)
      }
    }
    if (phase === 'pausing') {
      timerRef.current = setTimeout(() => setPhase('deleting'), 0)
    }
    if (phase === 'deleting') {
      if (charIndex > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
        }, DELETING_SPEED)
      } else {
        timerRef.current = setTimeout(() => {
          setStringIndex((i) => (i + 1) % strings.length)
          setPhase('waiting')
        }, PAUSE_AFTER_DELETE)
      }
    }
    if (phase === 'waiting') {
      timerRef.current = setTimeout(() => setPhase('typing'), 0)
    }
    return clear
  }, [phase, charIndex, stringIndex, strings])

  const isTyping = phase === 'typing' || phase === 'pausing'
  return { displayText, isTyping }
}

const PARTNERS = [
  'Airbnb', 'Booking.com', 'Expedia', 'VRBO', 'HomeAway', 'Agoda', 'TripAdvisor', 'Hotels.com',
]

const CONTENT = {
  en: {
    headlineLead: 'Smarter property management for',
    typewriter: ['Property Managers', 'Vacation Rental Hosts', 'HOA Teams'],
    subtitle:
      'One unified platform for 400+ channel integrations, automated rent collection, maintenance scheduling, and a built-in service marketplace that adds 15–30% revenue on day one.',
    ctaPrimary: 'Get started free',
    ctaSecondary: 'Watch demo',
    partnersIntro: 'Syncs with 400+ platforms including',
    mock: {
      url: 'portal.accez.cloud',
      stats: [
        { label: 'Active listings', value: '47', delta: '+3', color: '#6366f1' },
        { label: 'Monthly revenue', value: '$24.8k', delta: '+18%', color: '#06b6d4' },
        { label: 'Occupancy rate', value: '91%', delta: '+5%', color: '#10b981' },
      ],
      deltaSuffix: 'this mo.',
      chartTitle: 'Revenue · last 7 days',
      chartDelta: '↑ 18.4%',
      dayLabels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      bookingsTitle: 'Recent bookings',
      bookings: [
        { name: 'Sarah M.', channel: 'Airbnb', nights: '3 nights', status: 'check-in', statusColor: '#6366f1' },
        { name: 'James K.', channel: 'Booking.com', nights: '5 nights', status: 'confirmed', statusColor: '#10b981' },
        { name: 'Layla R.', channel: 'VRBO', nights: '2 nights', status: 'pending', statusColor: '#f59e0b' },
      ],
      syncStatus: 'All 400+ channels synced · Last updated 2 min ago',
      notif: '🎉 New booking — Airbnb · $340',
      pillValue: '+$3,240 this week',
      pillLabel: 'Marketplace commissions',
    },
  },
  ar: {
    headlineLead: 'إدارة عقارية أذكى لـ',
    typewriter: ['مدراء العقارات', 'مضيفي الإيجارات السياحية', 'فرق اتحاد الملاك'],
    subtitle:
      'منصة موحدة تضم أكثر من 400 قناة متكاملة، تحصيل آلي للإيجارات، جدولة الصيانة، وسوق خدمات مدمج يضيف 15–30% من الإيرادات من اليوم الأول.',
    ctaPrimary: 'ابدأ مجانًا',
    ctaSecondary: 'شاهد العرض التوضيحي',
    partnersIntro: 'متكاملة مع أكثر من 400 منصة بما في ذلك',
    mock: {
      url: 'portal.accez.cloud',
      stats: [
        { label: 'القوائم النشطة', value: '47', delta: '+3', color: '#6366f1' },
        { label: 'الإيرادات الشهرية', value: '24.8k $', delta: '+18%', color: '#06b6d4' },
        { label: 'معدل الإشغال', value: '91%', delta: '+5%', color: '#10b981' },
      ],
      deltaSuffix: 'هذا الشهر',
      chartTitle: 'الإيرادات · آخر 7 أيام',
      chartDelta: '↑ 18.4%',
      dayLabels: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
      bookingsTitle: 'الحجوزات الأخيرة',
      bookings: [
        { name: 'سارة م.', channel: 'Airbnb', nights: '3 ليالٍ', status: 'تسجيل دخول', statusColor: '#6366f1' },
        { name: 'جيمس ك.', channel: 'Booking.com', nights: '5 ليالٍ', status: 'مؤكد', statusColor: '#10b981' },
        { name: 'ليلى ر.', channel: 'VRBO', nights: 'ليلتان', status: 'قيد الانتظار', statusColor: '#f59e0b' },
      ],
      syncStatus: 'تمت مزامنة جميع القنوات الـ 400+ · آخر تحديث منذ دقيقتين',
      notif: '🎉 حجز جديد — Airbnb · 340 $',
      pillValue: '+3,240 $ هذا الأسبوع',
      pillLabel: 'عمولات السوق',
    },
  },
} as const

export default function Hero() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]
  const { displayText, isTyping } = useTypewriter(t.typewriter)

  return (
    <>
      <style>{`
        @keyframes orb-1 {
          0%,100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(60px,-40px) scale(1.08); }
          66%      { transform: translate(-30px,50px) scale(0.95); }
        }
        @keyframes orb-2 {
          0%,100% { transform: translate(0, 0) scale(1); }
          40%      { transform: translate(-70px,30px) scale(1.12); }
          70%      { transform: translate(40px,-60px) scale(0.9); }
        }
        @keyframes orb-3 {
          0%,100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(50px,40px) scale(1.06); }
        }
        @keyframes float-mobile {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes float-desktop {
          0%,100% { transform: translateY(0px) rotate(-1.5deg); }
          50%      { transform: translateY(-18px) rotate(-0.5deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes fade-up {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes grain {
          0%,100% { background-position: 0 0; }
          20%      { background-position: -5% -10%; }
          40%      { background-position: -15% 5%; }
          60%      { background-position: 7% -20%; }
          80%      { background-position: -5% 15%; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .anim-fade-up-2 { animation: fade-up .7s .18s both ease-out; }
        .anim-fade-up-3 { animation: fade-up .7s .30s both ease-out; }
        .anim-fade-up-4 { animation: fade-up .7s .44s both ease-out; }
        .anim-fade-up-5 { animation: fade-up .7s .58s both ease-out; }

        .orb-1 { animation: orb-1 18s ease-in-out infinite; }
        .orb-2 { animation: orb-2 22s ease-in-out infinite; }
        .orb-3 { animation: orb-3 15s ease-in-out infinite; }

        /* Card float: translate-only on small screens, rotate+translate on desktop */
        .card-float { animation: float-mobile 5s ease-in-out infinite; }
        @media (min-width: 1024px) {
          .card-float { animation: float-desktop 6s ease-in-out infinite; }
        }

        .shimmer-bar {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,.15) 40%,
            rgba(255,255,255,.3) 50%,
            rgba(255,255,255,.15) 60%,
            rgba(255,255,255,0) 100%
          );
          background-size: 400px 100%;
          animation: shimmer 2.8s linear infinite;
        }

        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          animation: grain 8s steps(1) infinite;
        }

        .hero-display { font-family: var(--font-manrope), var(--font-inter), system-ui, sans-serif; }
        .hero-body    { font-family: var(--font-inter), system-ui, sans-serif; }
        [dir="rtl"] .hero-display,
        [dir="rtl"] .hero-body { font-family: var(--font-cairo), system-ui, sans-serif; }

        .grad-text {
          background: linear-gradient(135deg, #a5f3fc 0%, #818cf8 45%, #f0abfc 100%);
          background-size: 200% 200%;
          background-position: 50% 50%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tw-line {
          display: inline-block;
          min-height: 1.15em;
          white-space: pre;
          vertical-align: top;
          word-break: break-word;
          overflow-wrap: break-word;
        }

        .btn-glow:hover {
          box-shadow: 0 0 0 3px rgba(99,102,241,.3), 0 8px 32px rgba(99,102,241,.4);
        }

        .card-tilt { transition: transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s; }
        .card-tilt:hover {
          transform: rotate(0deg) translateY(-8px) scale(1.015) !important;
          box-shadow: 0 40px 80px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.12) !important;
        }

        .marquee-track {
          animation: marquee 24s linear infinite;
          display: flex;
          gap: 48px;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }

        .tw-cursor {
          display: inline-block;
          width: 4px;
          height: .85em;
          background: #a5b4fc;
          border-radius: 2px;
          margin-inline-start: 6px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }
        .tw-cursor.pause { animation: none; opacity: 1; }

        /* Lighten orb effect on phones to avoid heavy GPU & visible bleed */
        @media (max-width: 767px) {
          .orb-1, .orb-2, .orb-3 {
            animation-duration: 25s;
            opacity: 0.15;
          }
          .grain-overlay { animation: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-1, .orb-2, .orb-3, .card-float, .shimmer-bar, .grain-overlay,
          .marquee-track, .tw-cursor {
            animation: none !important;
          }
        }
      `}</style>

      <section
        className="relative min-h-screen overflow-hidden w-full"
        style={{ background: '#080c18' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Orbs — clamped so they don't cause horizontal scroll on phones */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="orb-1 absolute rounded-full blur-[80px] sm:blur-[120px]"
            style={{
              width: 'min(700px, 120vw)',
              height: 'min(700px, 120vw)',
              top: '-15%',
              left: '-20%',
              background: 'radial-gradient(circle, #6366f1 0%, #4f46e5 40%, transparent 70%)',
            }}
          />
          <div
            className="orb-2 absolute rounded-full blur-[70px] sm:blur-[100px]"
            style={{
              width: 'min(600px, 100vw)',
              height: 'min(600px, 100vw)',
              top: '20%',
              right: '-20%',
              background: 'radial-gradient(circle, #06b6d4 0%, #0891b2 40%, transparent 70%)',
            }}
          />
          <div
            className="orb-3 absolute rounded-full blur-[80px] sm:blur-[140px]"
            style={{
              width: 'min(500px, 90vw)',
              height: 'min(500px, 90vw)',
              bottom: '-10%',
              left: '30%',
              background: 'radial-gradient(circle, #d946ef 0%, #a21caf 40%, transparent 70%)',
            }}
          />
        </div>

        <div className="grain-overlay absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden="true" />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-16 lg:pt-36 lg:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: Text column */}
            <div className="hero-body flex flex-col items-center text-center lg:items-start lg:text-left w-full">
              <h1
                className="hero-display anim-fade-up-2 text-white leading-[1.08] tracking-tight mb-5 w-full"
                style={{ fontSize: 'clamp(30px, 8vw, 70px)', fontWeight: 800 }}
              >
                {t.headlineLead}
                <br />
                <span className="tw-line">
                  <span className="grad-text">{displayText || ' '}</span>
                  <span className={`tw-cursor${isTyping ? ' pause' : ''}`} aria-hidden="true" />
                </span>
              </h1>

              <p
                className="anim-fade-up-3 text-slate-400 leading-relaxed w-full max-w-lg mx-auto lg:mx-0 mb-8"
                style={{ fontSize: 'clamp(15px, 2vw, 19px)' }}
              >
                {t.subtitle}
              </p>

              <div className="anim-fade-up-4 flex flex-col sm:flex-row flex-wrap gap-3 mb-10 w-full sm:w-auto items-stretch sm:items-center lg:items-start">
                <a
                  href="https://portal.accez.cloud/sign-up"
                  className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)',
                    fontSize: 15,
                  }}
                >
                  {t.ctaPrimary}
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=wBE2eZ8qnzc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-300 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid rgba(255,255,255,.1)',
                    fontSize: 15,
                  }}
                >
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                  >
                    <polygon points="5,3 13,8 5,13" fill="currentColor" />
                  </svg>
                  {t.ctaSecondary}
                </a>
              </div>

              <div className="anim-fade-up-5 mt-2 w-full overflow-hidden">
                <p className="text-xs text-slate-600 uppercase tracking-widest mb-4 font-medium text-center lg:text-left">
                  {t.partnersIntro}
                </p>
                <div
                  className="overflow-hidden"
                  style={{ maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)' }}
                >
                  <div className="marquee-track">
                    {[...PARTNERS, ...PARTNERS].map((name, i) => (
                      <span
                        key={i}
                        className="text-slate-500 text-sm font-semibold whitespace-nowrap hover:text-slate-300 transition-colors"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Floating mockup */}
            <div className="relative flex flex-col items-center lg:items-end w-full lg:pr-4 mt-4 lg:mt-0">
              <div className="relative w-full max-w-[420px] lg:max-w-md">
                {/* Glow */}
                <div
                  className="absolute inset-0 rounded-3xl blur-[60px] sm:blur-[80px] opacity-25 sm:opacity-30 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, #6366f1, #06b6d4, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div
                  className="card-float card-tilt relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(15,23,42,.9)',
                    border: '1px solid rgba(255,255,255,.1)',
                    boxShadow: '0 20px 48px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06)',
                    backdropFilter: 'blur(20px)',
                  }}
                  dir="ltr"
                >
                  {/* Header bar */}
                  <div
                    className="shimmer-bar px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between"
                    style={{
                      background: 'linear-gradient(90deg,#1e1b4b,#1e3a5f,#0f172a)',
                      borderBottom: '1px solid rgba(255,255,255,.07)',
                    }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 font-mono tracking-wider">
                      {t.mock.url}
                    </span>
                    <div className="w-10 sm:w-12" />
                  </div>

                  <div className="p-3 sm:p-5 space-y-3 sm:space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Stat tiles */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                      {t.mock.stats.map(({ label, value, delta, color }) => (
                        <div
                          key={label}
                          className="rounded-lg sm:rounded-xl p-2 sm:p-3"
                          style={{
                            background: 'rgba(255,255,255,.04)',
                            border: '1px solid rgba(255,255,255,.06)',
                          }}
                        >
                          <p className="text-[9px] sm:text-[10px] text-slate-500 mb-0.5 sm:mb-1 leading-tight">{label}</p>
                          <p className="text-white font-bold text-sm sm:text-lg leading-none mb-0.5 sm:mb-1">{value}</p>
                          <p className="text-[9px] sm:text-[10px] font-semibold" style={{ color }}>
                            {delta} {t.mock.deltaSuffix}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Bar chart */}
                    <div
                      className="rounded-lg sm:rounded-xl p-2.5 sm:p-3"
                      style={{
                        background: 'rgba(255,255,255,.04)',
                        border: '1px solid rgba(255,255,255,.06)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">{t.mock.chartTitle}</span>
                        <span className="text-[10px] sm:text-[11px] text-green-400 font-semibold">{t.mock.chartDelta}</span>
                      </div>
                      <div className="flex items-end gap-1 sm:gap-1.5 h-10 sm:h-14">
                        {[55, 72, 48, 90, 65, 88, 100].map((h, i) => (
                          <div key={i} className="flex-1">
                            <div
                              className="w-full rounded-sm"
                              style={{
                                height: `${h * 0.38}px`,
                                background: i === 6
                                  ? 'linear-gradient(to top, #6366f1, #818cf8)'
                                  : 'rgba(99,102,241,.25)',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-1">
                        {t.mock.dayLabels.map((d, i) => (
                          <span key={i} className="flex-1 text-center text-[8px] sm:text-[9px] text-slate-600">{d}</span>
                        ))}
                      </div>
                    </div>

                    {/* Recent bookings */}
                    <div
                      className="rounded-lg sm:rounded-xl p-2.5 sm:p-3"
                      style={{
                        background: 'rgba(255,255,255,.04)',
                        border: '1px solid rgba(255,255,255,.06)',
                      }}
                    >
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mb-2 sm:mb-3">{t.mock.bookingsTitle}</p>
                      <div className="space-y-2 sm:space-y-2.5">
                        {t.mock.bookings.map(({ name, channel, nights, status, statusColor }) => (
                          <div key={name} className="flex items-center gap-2">
                            <div
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-[8px] sm:text-[9px] font-bold flex-shrink-0"
                              style={{
                                background: statusColor + '33',
                                border: `1px solid ${statusColor}55`,
                              }}
                            >
                              {name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-[10px] sm:text-[11px] font-medium truncate">{name}</p>
                              <p className="text-slate-500 text-[9px] sm:text-[10px] truncate">{channel} · {nights}</p>
                            </div>
                            <span
                              className="px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold capitalize flex-shrink-0"
                              style={{
                                background: statusColor + '22',
                                color: statusColor,
                              }}
                            >
                              {status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sync status */}
                    <div
                      className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                      style={{
                        background: 'rgba(16,185,129,.08)',
                        border: '1px solid rgba(16,185,129,.2)',
                      }}
                    >
                      <div className="relative w-2 h-2 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-green-400" />
                        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-green-400 font-medium truncate">{t.mock.syncStatus}</span>
                    </div>
                  </div>
                </div>

                {/* Floating pills — DESKTOP ONLY (absolutely positioned, can clip on mobile) */}
                <div
                  className={`hidden lg:flex absolute -top-4 items-center gap-2.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white ${
                    isRTL ? '-left-6' : '-right-6'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
                    boxShadow: '0 8px 24px rgba(99,102,241,.5)',
                    border: '1px solid rgba(255,255,255,.15)',
                    animation: 'fade-up .7s .8s both ease-out',
                  }}
                >
                  {t.mock.notif}
                </div>

                <div
                  className={`hidden lg:flex absolute -bottom-5 items-center gap-2.5 px-3.5 py-2.5 rounded-2xl ${
                    isRTL ? '-right-6' : '-left-6'
                  }`}
                  style={{
                    background: 'rgba(15,23,42,.95)',
                    border: '1px solid rgba(255,255,255,.1)',
                    boxShadow: '0 12px 32px rgba(0,0,0,.4)',
                    backdropFilter: 'blur(12px)',
                    animation: 'fade-up .7s .95s both ease-out',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(16,185,129,.15)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 10l3-3 2.5 2.5L11 4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{t.mock.pillValue}</p>
                    <p className="text-slate-500 text-[10px]">{t.mock.pillLabel}</p>
                  </div>
                </div>
              </div>

              {/* Inline pill strip — MOBILE/TABLET ONLY (replaces clipping absolute pills) */}
              <div className="flex lg:hidden gap-2 mt-4 w-full max-w-[420px]">
                <div
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white text-center"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)' }}
                >
                  {t.mock.notif}
                </div>
                <div
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl"
                  style={{
                    background: 'rgba(15,23,42,.95)',
                    border: '1px solid rgba(255,255,255,.1)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 8l2.5-2.5 2 2L10 3" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-green-400 font-semibold text-xs">{t.mock.pillValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #080c18)' }}
          aria-hidden="true"
        />
      </section>
    </>
  )
}
