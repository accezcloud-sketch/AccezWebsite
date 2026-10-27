import Image from 'next/image'
import {
  Building2,
  Briefcase,
  Home,
  Hotel,
  UsersRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { Locale } from '@/lib/i18n'

interface Party {
  icon: LucideIcon
  title: string
  titleAr: string
  blurb: string
  blurbAr: string
  /** Which of the two independent solutions the customer type uses. */
  side: 'property' | 'people'
}

const PARTIES: Party[] = [
  {
    icon: Briefcase,
    title: 'Residential and compounds',
    titleAr: 'المباني السكنية والمجمعات',
    blurb: 'Leases, rent, work orders and resident messages',
    blurbAr: 'العقود والإيجارات وأوامر العمل ورسائل السكان',
    side: 'property',
  },
  {
    icon: Home,
    title: 'Vacation rentals',
    titleAr: 'الإيجارات قصيرة الأجل',
    blurb: 'Stays synced with Airbnb, Booking.com and Expedia',
    blurbAr: 'حجوزات متزامنة مع Airbnb وBooking.com وExpedia',
    side: 'property',
  },
  {
    icon: Hotel,
    title: 'Serviced apartments',
    titleAr: 'الشقق المخدومة',
    blurb: 'Reservations, add-ons and guest emails',
    blurbAr: 'الحجوزات والإضافات ورسائل الضيوف',
    side: 'property',
  },
  {
    icon: Building2,
    title: 'Developers and sales teams',
    titleAr: 'المطورون وفرق المبيعات',
    blurb: 'Projects, sale units and the sales path',
    blurbAr: 'المشاريع ووحدات البيع ومسار المبيعات',
    side: 'property',
  },
  {
    icon: Wrench,
    title: 'Barbers, salons and spas',
    titleAr: 'الحلاقون والصالونات والسبا',
    blurb: 'Bookings, a calendar and your clients',
    blurbAr: 'الحجوزات والتقويم وعملاؤك',
    side: 'people',
  },
  {
    icon: UsersRound,
    title: 'Coaches and personal trainers',
    titleAr: 'المدربون الشخصيون',
    blurb: 'One-to-one sessions, hours and clients',
    blurbAr: 'الجلسات الفردية والساعات والعملاء',
    side: 'people',
  },
]

const CONTENT = {
  en: {
    eyebrow: 'Who Accez is for',
    titleLead: 'One platform,',
    titleAccent: 'two solutions',
    subtitle:
      'Accez has two separate solutions on one platform. Property management for residential buildings and compounds, vacation rentals, serviced apartments and developers. Bookings for service businesses such as barbers, salons, spas and coaches. Each solution has its own app, plans and sign-in.',
    hub: 'Accez',
    hubSub: 'Two solutions',
    tagline: 'One platform. Two solutions.',
    propertySide: 'Property management solution',
    peopleSide: 'Service provider solution',
  },
  ar: {
    eyebrow: 'لمن أكسيز',
    titleLead: 'منصة واحدة،',
    titleAccent: 'وحلّان',
    subtitle:
      'تضم أكسيز حلّين منفصلين على منصة واحدة: إدارة العقارات للمباني السكنية والمجمعات والإيجارات قصيرة الأجل والشقق المخدومة والمطورين، والحجوزات للأنشطة الخدمية مثل الحلاقين والصالونات والسبا والمدربين. ولكل حل تطبيقه وباقاته وتسجيل دخوله.',
    hub: 'أكسيز',
    hubSub: 'حلّان',
    tagline: 'منصة واحدة. وحلّان.',
    propertySide: 'حل إدارة العقارات',
    peopleSide: 'حل مقدمي الخدمات',
  },
} as const

// Six nodes evenly spaced on a ring, starting at the top and going clockwise.
// Angles are static (no randomness), so positions are deterministic.
const RADIUS = 42 // percent of the container half-size
const NODE_ANGLES = [-90, -30, 30, 90, 150, 210] // degrees, index-aligned to PARTIES

function nodePosition(index: number) {
  const rad = (NODE_ANGLES[index] * Math.PI) / 180
  return {
    left: 50 + RADIUS * Math.cos(rad),
    top: 50 + RADIUS * Math.sin(rad),
  }
}

export default function Ecosystem({ locale: language }: { locale: Locale }) {
  const t = CONTENT[language]

  return (
    <section className="section-y" id="ecosystem" style={{ background: 'var(--section-bg, var(--bg))' }}>
      <style>{`
        /* Connections to the hub: a still dashed line (no looping motion). */
        .eco-line {
          stroke: url(#eco-grad);
          stroke-width: 1.5;
          stroke-dasharray: 4 8;
        }
        .eco-node {
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .eco-node:hover {
          transform: translate(-50%, -50%) scale(1.05);
          border-color: var(--accent-line);
          box-shadow: 0 10px 30px rgb(var(--shadow-rgb) / calc(0.4 * var(--shadow-k))), 0 0 0 1px var(--accent-line);
        }
        .eco-card {
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.3s ease;
        }
        .eco-card:hover { transform: translateY(-4px); border-color: var(--accent-line); }
        @media (prefers-reduced-motion: reduce) {
          .eco-node:hover, .eco-card:hover { transform: none; }
        }
      `}</style>

      {/* On laptops the text sits beside the diagram, so both fit on one
          screen; on phones they stack. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:items-center">
        {/* Section header */}
        <div>
          <div className="text-center lg:text-start mb-12 lg:mb-0">
            <div className="flex justify-center lg:justify-start mb-4"><span className="ui-chip">{t.eyebrow}</span></div>

            <h2
              className="hero-display text-strong leading-tight tracking-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              {t.titleLead}{' '}
              <span className="grad-text">
                {t.titleAccent}
              </span>
            </h2>

            <p className="max-w-2xl mx-auto lg:mx-0 mt-4 leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>
              {t.subtitle}
            </p>
            <p className="hidden lg:block mt-6 font-medium" style={{ fontSize: 15, color: 'var(--text-muted)' }}>
              {t.tagline}
            </p>
          </div>
        </div>

        {/* ── Desktop: radial hub-and-spoke ─────────────────────────── */}
        <div className="hidden lg:block">
          <div className="relative mx-auto" style={{ width: 540, height: 540 }}>
            {/* Connecting lines + ambient rings */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* Centred on the hub so every spoke reads the same, bright
                    near Accez and fading out toward each party. */}
                <radialGradient id="eco-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style={{ stopColor: 'var(--accent-hi)' }} stopOpacity="0.85" />
                  <stop offset="100%" style={{ stopColor: 'var(--accent)' }} stopOpacity="0.25" />
                </radialGradient>
              </defs>

              {/* concentric guide rings */}
              {[46, 34, 22].map((r) => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgb(var(--fg-rgb) / 0.04)" strokeWidth="0.3" />
              ))}

              {/* spokes */}
              {PARTIES.map((_, i) => {
                const p = nodePosition(i)
                return (
                  <line
                    key={i}
                    className="eco-line"
                    x1="50" y1="50"
                    x2={p.left} y2={p.top}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                )
              })}
            </svg>

            {/* Center hub */}
            <div
              className="absolute z-10 flex flex-col items-center justify-center rounded-full text-center"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 150,
                height: 150,
                background: 'radial-gradient(circle at 50% 40%, rgb(var(--accent-rgb) / 0.22), var(--panel))',
                border: '1px solid var(--accent-line)',
                boxShadow: '0 0 0 8px rgb(var(--accent-rgb) / 0.05), 0 20px 60px rgb(var(--accent-rgb) / 0.35)',
              }}
            >
              <Image src="/images/accez-logo.png" alt="Accez" width={40} height={40} className="rounded-lg mb-2" />
              <span className="hero-display text-strong text-lg leading-none">
                {t.hub}
              </span>
              <span className="text-[11px] mt-1 px-3 leading-tight" style={{ color: 'var(--text-faint)' }}>
                {t.hubSub}
              </span>
            </div>

            {/* Nodes */}
            {PARTIES.map((party, i) => {
              const p = nodePosition(i)
              const Icon = party.icon
              return (
                <div
                  key={party.title}
                  className="ui-card eco-node absolute z-20 flex items-center gap-3 px-4 py-3"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 214,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                  >
                    <Icon size={19} color="var(--accent-hi)" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-strong font-semibold leading-tight" style={{ fontSize: 14 }}>
                      {language === 'ar' ? party.titleAr : party.title}
                    </p>
                    <p className="leading-tight mt-0.5" style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>
                      {language === 'ar' ? party.blurbAr : party.blurb}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {/* ── Mobile / tablet: hub card + party grid ────────────────── */}
        <div className="lg:hidden">
          <div>
            <div
              className="flex items-center gap-4 rounded-2xl p-5 max-w-md mx-auto mb-6"
              style={{
                background: 'radial-gradient(circle at 20% 30%, rgb(var(--accent-rgb) / 0.16), var(--surface))',
                border: '1px solid var(--accent-line)',
              }}
            >
              <Image src="/images/accez-logo.png" alt="Accez" width={40} height={40} className="rounded-lg flex-shrink-0" />
              <div>
                <p className="text-strong font-bold text-lg leading-none">{t.hub}</p>
                <p className="text-[13px] mt-1" style={{ color: 'var(--text-faint)' }}>{t.hubSub}</p>
              </div>
            </div>

            {/* connector cue */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, var(--accent-line), transparent)' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {PARTIES.map((party) => {
              const Icon = party.icon
              return (
                <div
                  key={party.title}
                  className="ui-card eco-card flex items-center gap-3 rounded-2xl px-4 py-3.5"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                  >
                    <Icon size={19} color="var(--accent-hi)" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-strong font-semibold leading-tight" style={{ fontSize: 14 }}>
                      {language === 'ar' ? party.titleAr : party.title}
                    </p>
                    <p className="leading-tight" style={{ fontSize: 12, color: 'var(--text-faint)' }}>
                      {language === 'ar' ? party.blurbAr : party.blurb}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-center mt-8 font-medium" style={{ fontSize: 15, color: 'var(--text-muted)' }}>
            {t.tagline}
          </p>
        </div>
      </div>
    </section>
  )
}
