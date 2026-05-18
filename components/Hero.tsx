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
      ctaPrimary: 'Start free 14-day trial',
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
      ctaPrimary: 'ابدأ تجربة مجانية لمدة 14 يومًا',
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
        @keyframes float {
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

        .card-float { animation: float 6s ease-in-out infinite; }

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
          min-height: 1.1em;
          white-space: pre;
          vertical-align: top;
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

        @media (prefers-reduced-motion: reduce) {
          .orb-1, .orb-2, .orb-3, .card-float, .shimmer-bar, .grain-overlay,
          .marquee-track, .tw-cursor {
            animation: none !important;
          }
        }
      `}</style>

      <section
        className="relative min-h-screen overflow-hidden"
        style={{ background: '#080c18' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="orb-1 absolute rounded-full opacity-30 blur-[120px]"
            style={{
              width: 700, height: 700,
              top: '-15%', left: '-10%',
              background: 'radial-gradient(circle, #6366f1 0%, #4f46e5 40%, transparent 70%)',
            }}
          />
          <div
            className="orb-2 absolute rounded-full opacity-20 blur-[100px]"
            style={{
              width: 600, height: 600,
              top: '20%', right: '-8%',
              background: 'radial-gradient(circle, #06b6d4 0%, #0891b2 40%, transparent 70%)',
            }}
          />
          <div
            className="orb-3 absolute rounded-full opacity-20 blur-[140px]"
            style={{
              width: 500, height: 500,
              bottom: '-10%', left: '35%',
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="hero-body flex flex-col items-start">

              <h1
                className="hero-display anim-fade-up-2 text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontSize: 'clamp(38px, 5.5vw, 70px)', fontWeight: 800 }}
              >
                {t.headlineLead}
                <br />
                <span className="tw-line">
                  <span className="grad-text">{displayText || ' '}</span>
                  <span className={`tw-cursor${isTyping ? ' pause' : ''}`} aria-hidden="true" />
                </span>
              </h1>

              <p
                className="anim-fade-up-3 text-slate-400 leading-relaxed max-w-lg mb-10"
                style={{ fontSize: 'clamp(16px, 1.6vw, 19px)' }}
              >
                {t.subtitle}
              </p>

              <div className="anim-fade-up-4 flex flex-wrap gap-3 mb-12">
                <a
                  href="https://portal.accez.cloud/sign-up"
                  className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
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
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-300 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
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
                <p className="text-xs text-slate-600 uppercase tracking-widest mb-4 font-medium">
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

            <div className="relative flex justify-center lg:justify-end lg:pr-4">
              <div
                className="absolute inset-0 rounded-3xl blur-[80px] opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, #6366f1, #06b6d4, transparent 70%)' }}
                aria-hidden="true"
              />

              <div
                className="card-float card-tilt relative w-full max-w-md rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(15,23,42,.9)',
                  border: '1px solid rgba(255,255,255,.1)',
                  boxShadow: '0 30px 64px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.06)',
                  backdropFilter: 'blur(20px)',
                }}
                dir="ltr"
              >
                <div
                  className="shimmer-bar px-4 py-3 flex items-center justify-between"
                  style={{
                    background: 'linear-gradient(90deg,#1e1b4b,#1e3a5f,#0f172a)',
                    borderBottom: '1px solid rgba(255,255,255,.07)',
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono tracking-wider">{t.mock.url}</span>
                  <div className="w-12" />
                </div>

                <div className="p-5 space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="grid grid-cols-3 gap-3">
                    {t.mock.stats.map(({ label, value, delta, color }) => (
                      <div
                        key={label}
                        className="rounded-xl p-3"
                        style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}
                      >
                        <p className="text-[10px] text-slate-500 mb-1 leading-tight">{label}</p>
                        <p className="text-white font-bold text-lg leading-none mb-1">{value}</p>
                        <p className="text-[10px] font-semibold" style={{ color }}>{delta} {t.mock.deltaSuffix}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="rounded-xl p-3"
                    style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] text-slate-400 font-medium">{t.mock.chartTitle}</span>
                      <span className="text-[11px] text-green-400 font-semibold">{t.mock.chartDelta}</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-14">
                      {[55, 72, 48, 90, 65, 88, 100].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-sm transition-all"
                            style={{
                              height: `${h * 0.48}px`,
                              background: i === 6
                                ? 'linear-gradient(to top, #6366f1, #818cf8)'
                                : 'rgba(99,102,241,.25)',
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-1.5">
                      {t.mock.dayLabels.map((d, i) => (
                        <span key={i} className="flex-1 text-center text-[9px] text-slate-600">{d}</span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="rounded-xl p-3"
                    style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }}
                  >
                    <p className="text-[11px] text-slate-400 font-medium mb-3">{t.mock.bookingsTitle}</p>
                    <div className="space-y-2.5">
                      {t.mock.bookings.map(({ name, channel, nights, status, statusColor }) => (
                        <div key={name} className="flex items-center gap-2.5">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                            style={{ background: statusColor + '33', border: `1px solid ${statusColor}55` }}
                          >
                            {name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-[11px] font-medium truncate">{name}</p>
                            <p className="text-slate-500 text-[10px]">{channel} · {nights}</p>
                          </div>
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-semibold capitalize flex-shrink-0"
                            style={{ background: statusColor + '22', color: statusColor }}
                          >
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)' }}
                  >
                    <div className="relative w-2 h-2 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-green-400" />
                      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                    </div>
                    <span className="text-[11px] text-green-400 font-medium">{t.mock.syncStatus}</span>
                  </div>
                </div>
              </div>

              <div
                className={`absolute -top-4 flex items-center gap-2.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white ${
                  isRTL ? '-left-4 lg:-left-6' : '-right-4 lg:-right-6'
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
                className={`absolute -bottom-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl ${
                  isRTL ? '-right-4 lg:-right-6' : '-left-4 lg:-left-6'
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
