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
import type { CSSProperties } from 'react'
import type { Locale } from '@/lib/i18n'

interface Party {
  icon: LucideIcon
  title: string
  titleAr: string
}

const PARTIES: Party[] = [
  {
    icon: Briefcase,
    title: 'Residential and compounds',
    titleAr: 'المباني السكنية والمجمعات',
  },
  {
    icon: Home,
    title: 'Vacation rentals',
    titleAr: 'الإيجارات قصيرة الأجل',
  },
  {
    icon: Hotel,
    title: 'Serviced apartments',
    titleAr: 'الشقق المخدومة',
  },
  {
    icon: Building2,
    title: 'Developers and sales teams',
    titleAr: 'المطورون وفرق المبيعات',
  },
  {
    icon: Wrench,
    title: 'Barbers, salons and spas',
    titleAr: 'الحلاقون والصالونات والسبا',
  },
  {
    icon: UsersRound,
    title: 'Coaches and personal trainers',
    titleAr: 'المدربون الشخصيون',
  },
]

const CONTENT = {
  en: {
    eyebrow: 'Who Accez is for',
    titleLead: 'One platform,',
    titleAccent: 'two solutions',
    subtitle:
      'Property management, and bookings for service businesses. Two separate solutions, each with its own app, plans and sign-in.',
    hub: 'Accez',
    hubSub: 'Two solutions',
  },
  ar: {
    eyebrow: 'لمن أكسيز',
    titleLead: 'منصة واحدة،',
    titleAccent: 'وحلّان',
    subtitle:
      'إدارة العقارات، والحجوزات للأنشطة الخدمية. حلّان منفصلان، لكل منهما تطبيقه وباقاته وتسجيل دخوله.',
    hub: 'أكسيز',
    hubSub: 'حلّان',
  },
} as const

// Six cards evenly spaced (60 degrees apart) on one ring, starting at the top.
// The ring turns slowly clockwise and each card turns back the same amount,
// so the text always stays upright. There are no lines to the centre: the
// two solutions are separate.
const ANGLES = [-90, -30, 30, 90, 150, 210]

export default function Ecosystem({ locale: language }: { locale: Locale }) {
  const t = CONTENT[language]

  return (
    <section className="section-y" id="ecosystem" style={{ background: 'var(--section-bg, var(--bg))' }}>
      <style>{`
        .eco-ring { --r: 124px; --card: 92px; --hub: 96px; width: 340px; height: 340px; }
        @media (min-width: 768px) {
          .eco-ring { --r: 205px; --card: 178px; --hub: 140px; width: 500px; height: 500px; }
        }
        .eco-orbit { position: absolute; inset: 0; animation: eco-spin 90s linear infinite; }
        .eco-slot {
          position: absolute; left: 50%; top: 50%; width: 0; height: 0;
          transform: rotate(var(--a)) translateX(var(--r)) rotate(calc(-1 * var(--a)));
        }
        .eco-upright { width: 0; height: 0; animation: eco-spin 90s linear infinite reverse; }
        .eco-card {
          position: absolute; left: 0; top: 0; width: var(--card);
          transform: translate(-50%, -50%);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .eco-card:hover { border-color: var(--accent-line); }
        .eco-ring:hover .eco-orbit, .eco-ring:hover .eco-upright { animation-play-state: paused; }
        @keyframes eco-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .eco-orbit, .eco-upright { animation: none; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:items-center">
        <div className="text-center lg:text-start mb-10 lg:mb-0">
          <div className="flex justify-center lg:justify-start mb-4"><span className="ui-chip">{t.eyebrow}</span></div>
          <h2
            className="hero-display text-strong leading-tight tracking-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {t.titleLead}{' '}
            <span className="grad-text">{t.titleAccent}</span>
          </h2>
          <p className="max-w-xl mx-auto lg:mx-0 mt-4 leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>
            {t.subtitle}
          </p>
        </div>

        <div className="eco-ring relative mx-auto" dir="ltr">
          {/* The path the cards travel on */}
          <div
            aria-hidden="true"
            className="absolute rounded-full"
            style={{
              left: 'calc(50% - var(--r))',
              top: 'calc(50% - var(--r))',
              width: 'calc(2 * var(--r))',
              height: 'calc(2 * var(--r))',
              border: '1px solid rgb(var(--fg-rgb) / 0.06)',
            }}
          />

          <div
            className="absolute z-10 flex flex-col items-center justify-center rounded-full text-center"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'var(--hub)',
              height: 'var(--hub)',
              background: 'radial-gradient(circle at 50% 40%, rgb(var(--accent-rgb) / 0.22), var(--panel))',
              border: '1px solid var(--accent-line)',
              boxShadow: '0 0 0 8px rgb(var(--accent-rgb) / 0.05), 0 20px 60px rgb(var(--accent-rgb) / 0.3)',
            }}
          >
            <Image src="/images/accez-logo.png" alt="Accez" width={36} height={36} className="rounded-lg mb-1.5 w-7 h-7 md:w-9 md:h-9" />
            <span className="hero-display text-strong text-sm md:text-lg leading-none">{t.hub}</span>
            <span className="text-[10px] md:text-[11px] mt-1 leading-tight" style={{ color: 'var(--text-faint)' }}>
              {t.hubSub}
            </span>
          </div>

          <ul className="eco-orbit z-20" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {PARTIES.map((party, i) => {
              const Icon = party.icon
              return (
                <li key={party.title} className="eco-slot" style={{ '--a': `${ANGLES[i]}deg` } as CSSProperties}>
                  <div className="eco-upright">
                    <div className="ui-card eco-card flex flex-col md:flex-row items-center gap-1.5 md:gap-3 px-2 py-2.5 md:px-3.5 md:py-3 text-center md:text-start">
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                      >
                        <Icon size={17} color="var(--accent-hi)" strokeWidth={1.75} />
                      </div>
                      <p className="min-w-0 text-strong font-semibold leading-tight text-[11px] md:text-[13.5px]">
                        {language === 'ar' ? party.titleAr : party.title}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
