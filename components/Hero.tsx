'use client'

import { useEffect, useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { localeHref } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS } from '@/lib/platform/solutions'

const TYPING_SPEED = 95
const DELETING_SPEED = 55
const PAUSE_AFTER_TYPE = 2400
const PAUSE_AFTER_DELETE = 500

type Phase = 'typing' | 'pausing' | 'deleting' | 'waiting'

function useTypewriter(strings: readonly string[]) {
  // SEO: seed with the FIRST phrase rather than an empty string.
  //
  // This is the H1 of the homepage. Starting empty meant the server-rendered
  // HTML contained only the lead-in — "One platform to run" — an incomplete
  // sentence with no product category and no keywords. Googlebot renders
  // JavaScript so it eventually saw the full text, but the H1 is one of the
  // signals Google uses to build the title link, and AI crawlers (GPTBot,
  // ClaudeBot, PerplexityBot) do not execute JavaScript at all, so they only
  // ever saw the fragment.
  //
  // Seeding means the static HTML now reads "One platform to run residential
  // communities" — a complete, meaningful heading — and the animation takes
  // over on hydration exactly as before.
  const first = strings[0] ?? ''
  const [displayText, setDisplayText] = useState(first)
  const [stringIndex, setStringIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('pausing')
  const [charIndex, setCharIndex] = useState(first.length)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Language switch: restart from the new set's first phrase, already typed,
    // so the heading is never momentarily blank.
    const next = strings[0] ?? ''
    setDisplayText(next)
    setStringIndex(0)
    setCharIndex(next.length)
    setPhase('pausing')
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
    // The first phrase is the server-rendered H1, so it names both audiences.
    headlineLead: 'One platform for',
    typewriter: ['property managers and service providers', 'vacation rentals', 'hotels & serviced apartments', 'residential communities', 'salons & spas', 'fitness coaches', 'home services'],
    subtitle:
      'Two solutions on one platform. Property management for property managers, landlords and hotels. And a marketplace where independent businesses, from barbers to fitness coaches, take bookings from their own clients and new customers. In Arabic and English, built for Saudi Arabia.',
    doorsLabel: 'Choose your solution',
    partnersIntro: 'Syncs with 400+ booking channels including',
    mock: {
      url: 'portal.accez.cloud',
      stats: [
        { label: 'Active listings',  value: '47',     delta: '+3'   },
        { label: 'Monthly revenue',  value: '$24.8k', delta: '+18%' },
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
      notif: 'New booking · Airbnb · $340',
      pillValue: '+$3,240',
      pillLabel: 'Marketplace commissions this week',
    },
  },
  ar: {
    headlineLead: 'منصة واحدة تخدم',
    typewriter: ['مديري العقارات ومقدمي الخدمات', 'الإيجارات السياحية', 'الفنادق والشقق المخدومة', 'المجمعات السكنية', 'الصالونات والسبا', 'مدربي اللياقة', 'الخدمات المنزلية'],
    subtitle:
      'حلّان على منصة واحدة. إدارة العقارات لمديري العقارات والملاك والفنادق. وسوق خدمات تستقبل فيه الأنشطة المستقلة، من الحلاقين إلى مدربي اللياقة، الحجوزات من عملائها ومن عملاء جدد. بالعربية والإنجليزية، ومبنية للسعودية.',
    doorsLabel: 'اختر الحل المناسب لك',
    partnersIntro: 'متكاملة مع أكثر من 400 قناة حجز بما في ذلك',
    mock: {
      url: 'portal.accez.cloud',
      stats: [
        { label: 'القوائم النشطة',   value: '47',     delta: '+3'   },
        { label: 'الإيرادات الشهرية', value: '24.8k $', delta: '+18%' },
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
      notif: 'حجز جديد · Airbnb · 340 $',
      pillValue: '+3,240 $',
      pillLabel: 'عمولات السوق هذا الأسبوع',
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

        .hero-display { font-family: var(--font-heading), var(--font-inter), system-ui, sans-serif; }
        .hero-body    { font-family: var(--font-inter), system-ui, sans-serif; }
        [dir="rtl"] .hero-display,
        [dir="rtl"] .hero-body { font-family: var(--font-cairo), system-ui, sans-serif; }

        /* Rotating headline word. Kept inside one hue family so every phrase
           it cycles through reads the same weight, instead of jumping from
           cyan to magenta mid-sentence. */
        .grad-text {
          background: linear-gradient(135deg, var(--grad-from), var(--grad-to));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* Rotating headline line: allowed to wrap (was white-space:pre, which
           forced one line and let long phrases like "hotels & serviced
           apartments" overflow the column and slide under the mockup). A fixed
           min-height reserves space for the longest phrase (2 lines) so the
           block below never jumps as the word swaps. */
        .tw-line {
          display: block;
          min-height: 2.3em;
          white-space: normal;
          overflow-wrap: break-word;
          word-break: normal;
        }

        .card-tilt { transition: transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s; }
        .card-tilt:hover {
          transform: rotate(0deg) translateY(-8px) scale(1.015) !important;
          box-shadow: 0 40px 80px rgb(var(--shadow-rgb) / calc(0.55 * var(--shadow-k))), 0 0 0 1px rgb(var(--fg-rgb) / 0.12) !important;
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
          background: #7fcdef;
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
        style={{ background: 'var(--bg)' }}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Signature top wash, #18384A fading into the #09131C canvas.
            No dot grid, no grain (removed at the user's request). */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '75%',
            background:
              'radial-gradient(125% 75% at 50% 0%, var(--glow) 0%, var(--glow-fade) 30%, transparent 62%)',
          }}
          aria-hidden="true"
        />

        <div className="page-top relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT: Text column. min-w-0 keeps it from overflowing the grid
                column when the rotating word is long. */}
            <div className="hero-body flex flex-col items-center text-center lg:items-start lg:text-left w-full min-w-0">
              <h1
                className="hero-display anim-fade-up-2 text-strong leading-[1.08] tracking-tight mb-5 w-full min-w-0"
                style={{ fontSize: 'clamp(28px, 5.2vw, 52px)', fontWeight: 800 }}
              >
                {/* The space keeps the words apart for crawlers, which read the
                    text without the line break. */}
                {t.headlineLead}{' '}
                <br />
                <span className="tw-line">
                  <span className="grad-text">{displayText || ' '}</span>
                  <span className={`tw-cursor${isTyping ? ' pause' : ''}`} aria-hidden="true" />
                </span>
              </h1>

              <p
                className="anim-fade-up-3 text-muted leading-relaxed w-full max-w-lg mx-auto lg:mx-0 mb-8"
                style={{ fontSize: 'clamp(15px, 2vw, 19px)' }}
              >
                {t.subtitle}
              </p>

              {/* One door per solution (lib/platform/solutions.ts): the platform
                  leads, and each audience finds its own way in. */}
              <nav aria-label={t.doorsLabel} className="anim-fade-up-4 w-full mb-10">
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
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" style={{ transform: isRTL ? 'scaleX(-1)' : undefined }} aria-hidden="true">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="anim-fade-up-5 mt-2 w-full overflow-hidden">
                <p className="text-xs text-faint uppercase tracking-widest mb-4 font-medium text-center lg:text-left">
                  {t.partnersIntro}
                </p>
                <div
                  className="overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
                  }}
                >
                  <div className="marquee-track">
                    {[...PARTNERS, ...PARTNERS].map((name, i) => (
                      <span
                        key={i}
                        className="text-faint text-sm font-semibold whitespace-nowrap hover:text-soft transition-colors"
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
                      {t.mock.url}
                    </span>
                    <div className="w-10 sm:w-12" />
                  </div>

                  <div className="p-3 sm:p-5 space-y-3" dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Stat tiles */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                      {t.mock.stats.map(({ label, value, delta }) => (
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
                            {delta} <span style={{ color: 'var(--text-faint)' }}>{t.mock.deltaSuffix}</span>
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
                          <p className="text-[11px] sm:text-xs text-strong font-medium leading-none mb-1">{t.mock.chartTitle}</p>
                          <p className="text-[9px] sm:text-[10px]" style={{ color: 'var(--text-faint)' }}>{t.mock.chartRange}</p>
                        </div>
                        <span
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-medium"
                          style={{ background: 'var(--ok-dim)', color: 'var(--ok)' }}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                            <path d="M4 6.5v-5M1.8 3.7 4 1.5l2.2 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {t.mock.chartDelta}
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
                        {t.mock.dayLabels.map((d, i) => (
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
                      <p className="text-[11px] sm:text-xs text-strong font-medium mb-2.5 sm:mb-3">{t.mock.bookingsTitle}</p>
                      <div className="space-y-2 sm:space-y-2.5">
                        {t.mock.bookings.map(({ name, channel, nights, status, state }) => {
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
                        {t.mock.syncStatus}
                      </span>
                      <span className="text-[9px] sm:text-[10px] ms-auto flex-shrink-0" style={{ color: 'var(--text-faint)' }}>
                        {t.mock.syncMeta}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating pills, DESKTOP ONLY (absolutely positioned, can clip on mobile) */}
                <div
                  className={`hidden lg:flex absolute -top-4 items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium ${
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
                  {t.mock.notif}
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
                    <p className="text-strong text-sm font-semibold leading-none mb-1 tracking-tight">{t.mock.pillValue}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{t.mock.pillLabel}</p>
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
                  {t.mock.notif}
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
                  <span className="font-semibold text-xs" style={{ color: 'var(--text)' }}>{t.mock.pillValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }}
          aria-hidden="true"
        />
      </section>
    </>
  )
}
