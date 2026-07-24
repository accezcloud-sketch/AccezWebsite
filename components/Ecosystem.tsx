'use client'

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
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'

interface Party {
  icon: LucideIcon
  title: string
  titleAr: string
  blurb: string
  blurbAr: string
  /** 'property' businesses that supply space, 'people' who use it. */
  side: 'property' | 'people'
}

const PARTIES: Party[] = [
  {
    icon: Building2,
    title: 'Real estate companies',
    titleAr: 'شركات العقارات',
    blurb: 'List and manage portfolios at scale',
    blurbAr: 'إدراج وإدارة المحافظ العقارية على نطاق واسع',
    side: 'property',
  },
  {
    icon: Briefcase,
    title: 'Property managers',
    titleAr: 'مديرو العقارات',
    blurb: 'Run bookings, rent and operations',
    blurbAr: 'إدارة الحجوزات والإيجارات والعمليات',
    side: 'property',
  },
  {
    icon: Home,
    title: 'Vacation rentals',
    titleAr: 'الإيجارات السياحية',
    blurb: 'Sync 400+ channels, fill every night',
    blurbAr: 'مزامنة أكثر من 400 قناة وملء كل ليلة',
    side: 'property',
  },
  {
    icon: Hotel,
    title: 'Hotels',
    titleAr: 'الفنادق',
    blurb: 'Manage rooms, guests and services',
    blurbAr: 'إدارة الغرف والنزلاء والخدمات',
    side: 'property',
  },
  {
    icon: UsersRound,
    title: 'Residents & guests',
    titleAr: 'السكان والنزلاء',
    blurb: 'Book stays and services in a tap',
    blurbAr: 'حجز الإقامة والخدمات بلمسة واحدة',
    side: 'people',
  },
  {
    icon: Wrench,
    title: 'Service providers',
    titleAr: 'مقدمو الخدمات',
    blurb: 'Reach customers and take bookings',
    blurbAr: 'الوصول إلى العملاء واستقبال الحجوزات',
    side: 'people',
  },
]

const CONTENT = {
  en: {
    eyebrow: 'The Accez Ecosystem',
    titleLead: 'One platform,',
    titleAccent: 'every party connected',
    subtitle:
      'Accez is the connective layer for the whole property world. On one side, the businesses that own and run space. On the other, the people inside it and the providers who serve them. Accez links all of them in one place.',
    hub: 'Accez',
    hubSub: 'One connected platform',
    tagline: 'One platform. Every party connected.',
    propertySide: 'They supply the space',
    peopleSide: 'They live, stay and serve',
  },
  ar: {
    eyebrow: 'منظومة أكسيز',
    titleLead: 'منصة واحدة،',
    titleAccent: 'والجميع متصل',
    subtitle:
      'أكسيز هي الطبقة التي تربط عالم العقارات بأكمله. في جانب، الأنشطة التي تملك المساحات وتديرها. وفي الجانب الآخر، الأشخاص داخلها ومقدمو الخدمات الذين يخدمونهم. تربط أكسيز بينهم جميعًا في مكان واحد.',
    hub: 'أكسيز',
    hubSub: 'منصة واحدة متصلة',
    tagline: 'منصة واحدة. والجميع متصل.',
    propertySide: 'يوفّرون المساحة',
    peopleSide: 'يقيمون ويخدمون',
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

export default function Ecosystem() {
  const { language, isRTL } = useLanguage()
  const t = CONTENT[language]

  return (
    <section className="py-20" id="ecosystem" style={{ background: 'var(--bg)' }}>
      <style>{`
        /* Flow of connections travelling inward toward the hub. */
        @keyframes eco-flow {
          to { stroke-dashoffset: -24; }
        }
        @keyframes eco-pulse {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%      { transform: scale(1.6); opacity: 0;   }
        }
        .eco-line {
          stroke: url(#eco-grad);
          stroke-width: 1.5;
          stroke-dasharray: 4 8;
          animation: eco-flow 1.1s linear infinite;
        }
        .eco-node {
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .eco-node:hover {
          transform: translate(-50%, -50%) scale(1.05);
          border-color: var(--accent-line);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 0 1px var(--accent-line);
        }
        .eco-card {
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.3s ease;
        }
        .eco-card:hover { transform: translateY(-4px); border-color: var(--accent-line); }
        @media (prefers-reduced-motion: reduce) {
          .eco-line { animation: none; }
          .eco-node:hover, .eco-card:hover { transform: none; }
        }
      `}</style>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <FadeUp>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to left, transparent, var(--accent))'
                  : 'linear-gradient(to right, transparent, var(--accent))' }}
              />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent-hi)' }}>
                {t.eyebrow}
              </span>
              <div
                className="h-px w-8"
                style={{ background: isRTL
                  ? 'linear-gradient(to right, transparent, var(--accent))'
                  : 'linear-gradient(to left, transparent, var(--accent))' }}
              />
            </div>

            <h2
              className="text-white font-bold text-center leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif',
                fontWeight: 800,
              }}
            >
              {t.titleLead}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #7fcdef, #5fb8e8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t.titleAccent}
              </span>
            </h2>

            <p className="text-center max-w-2xl mx-auto mt-4 leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>
              {t.subtitle}
            </p>
          </div>
        </FadeUp>

        {/* ── Desktop: radial hub-and-spoke ─────────────────────────── */}
        <FadeUp delay={0.15} className="hidden lg:block">
          <div className="relative mx-auto" style={{ width: 620, height: 620 }}>
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
                  <stop offset="0%" stopColor="#7fcdef" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#5fb8e8" stopOpacity="0.25" />
                </radialGradient>
              </defs>

              {/* concentric guide rings */}
              {[46, 34, 22].map((r) => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
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
                width: 168,
                height: 168,
                background: 'radial-gradient(circle at 50% 40%, rgba(49, 159, 212,0.22), rgba(16,18,28,0.96))',
                border: '1px solid var(--accent-line)',
                boxShadow: '0 0 0 8px rgba(49, 159, 212,0.05), 0 20px 60px rgba(38, 120, 166,0.35)',
              }}
            >
              <Image src="/images/accez-logo.png" alt="Accez" width={40} height={40} className="rounded-lg mb-2" />
              <span className="text-white font-bold text-lg leading-none" style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif' }}>
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
                  className="eco-node absolute z-20 flex items-center gap-3 rounded-2xl px-4 py-3"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    transform: 'translate(-50%, -50%)',
                    width: 244,
                    background: 'rgba(16,18,28,0.92)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                  >
                    <Icon size={19} color="var(--accent-hi)" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold leading-tight" style={{ fontSize: 14 }}>
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

          <p className="text-center mt-6 font-medium" style={{ fontSize: 15, color: 'var(--text-muted)' }}>
            {t.tagline}
          </p>
        </FadeUp>

        {/* ── Mobile / tablet: hub card + party grid ────────────────── */}
        <div className="lg:hidden">
          <FadeUp delay={0.1}>
            <div
              className="flex items-center gap-4 rounded-2xl p-5 max-w-md mx-auto mb-6"
              style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(49, 159, 212,0.16), var(--surface))',
                border: '1px solid var(--accent-line)',
              }}
            >
              <Image src="/images/accez-logo.png" alt="Accez" width={40} height={40} className="rounded-lg flex-shrink-0" />
              <div>
                <p className="text-white font-bold text-lg leading-none">{t.hub}</p>
                <p className="text-[13px] mt-1" style={{ color: 'var(--text-faint)' }}>{t.hubSub}</p>
              </div>
            </div>

            {/* connector cue */}
            <div className="flex justify-center mb-6" aria-hidden="true">
              <div className="w-px h-6" style={{ background: 'linear-gradient(to bottom, var(--accent-line), transparent)' }} />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {PARTIES.map((party) => {
              const Icon = party.icon
              return (
                <div
                  key={party.title}
                  className="eco-card flex items-center gap-3 rounded-2xl px-4 py-3.5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                  >
                    <Icon size={19} color="var(--accent-hi)" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold leading-tight" style={{ fontSize: 14 }}>
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
