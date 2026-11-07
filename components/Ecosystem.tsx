import Image from 'next/image'
import {
  BedDouble,
  Building2,
  Dumbbell,
  HardHat,
  Scissors,
  TreePalm,
  type LucideIcon,
} from 'lucide-react'
import type { CSSProperties } from 'react'
import type { Locale } from '@/lib/i18n'

interface Party {
  icon: LucideIcon
  title: string
  titleAr: string
  blurb: string
  blurbAr: string
}

// Wording follows each customer type's own page in lib/platform/audiences.ts.
const PARTIES: Party[] = [
  { icon: Building2, title: 'Residential and compounds', titleAr: 'المباني السكنية والمجمعات', blurb: 'Leases and rent', blurbAr: 'العقود والإيجارات' },
  { icon: TreePalm, title: 'Vacation rentals', titleAr: 'الإيجارات قصيرة الأجل', blurb: 'Channel sync', blurbAr: 'مزامنة القنوات' },
  { icon: BedDouble, title: 'Serviced apartments', titleAr: 'الشقق المخدومة', blurb: 'Stays and add-ons', blurbAr: 'الإقامات والإضافات' },
  { icon: HardHat, title: 'Developers and sales teams', titleAr: 'المطورون وفرق المبيعات', blurb: 'Projects and sale units', blurbAr: 'المشاريع ووحدات البيع' },
  { icon: Scissors, title: 'Barbers, salons and spas', titleAr: 'الحلاقون والصالونات والسبا', blurb: 'Bookings and clients', blurbAr: 'الحجوزات والعملاء' },
  { icon: Dumbbell, title: 'Coaches and personal trainers', titleAr: 'المدربون الشخصيون', blurb: 'One-to-one sessions', blurbAr: 'جلسات فردية' },
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
        /* margin-block: room for a card passing the top or bottom of the circle
           (half a card plus a gap), so a turning card never reaches the section edge. */
        .eco-ring { --r: 122px; --card-w: 96px; --card-h: 100px; --hub: 96px; --wave: 1.4; width: 320px; height: 320px; margin-block: calc(var(--card-h) / 2 + 16px); }
        @media (min-width: 768px) {
          .eco-ring { --r: 236px; --card-w: 214px; --card-h: 72px; --hub: 140px; --wave: 1.7; width: 540px; height: 540px; }
        }
        .eco-path {
          border: 1px solid var(--accent-line);
          box-shadow: 0 0 18px rgb(var(--accent-rgb) / 0.18), inset 0 0 18px rgb(var(--accent-rgb) / 0.10);
        }
        .eco-wave {
          position: absolute; left: 50%; top: 50%;
          width: var(--hub); height: var(--hub); margin: calc(var(--hub) / -2) 0 0 calc(var(--hub) / -2);
          border-radius: 9999px; border: 1.5px solid var(--accent-hi);
          opacity: 0; animation: eco-wave 4.5s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
        }
        @keyframes eco-wave {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(var(--wave)); opacity: 0; }
        }
        .eco-orbit { position: absolute; inset: 0; animation: eco-spin 90s linear infinite; }
        .eco-slot {
          position: absolute; left: 50%; top: 50%; width: 0; height: 0;
          transform: rotate(var(--a)) translateX(var(--r)) rotate(calc(-1 * var(--a)));
        }
        .eco-upright { width: 0; height: 0; animation: eco-spin 90s linear infinite reverse; }
        .eco-card {
          position: absolute; left: 0; top: 0; width: var(--card-w); height: var(--card-h);
          transform: translate(-50%, -50%);
          transition: border-color 0.3s ease;
        }
        .eco-card:hover { border-color: var(--accent-line); }
        .eco-ring:hover .eco-orbit, .eco-ring:hover .eco-upright { animation-play-state: paused; }
        @keyframes eco-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .eco-orbit, .eco-upright { animation: none; }
          .eco-wave { display: none; }
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
            className="eco-path absolute rounded-full"
            style={{
              left: 'calc(50% - var(--r))',
              top: 'calc(50% - var(--r))',
              width: 'calc(2 * var(--r))',
              height: 'calc(2 * var(--r))',
            }}
          />

          {/* Waves leave the centre and fade before they reach the cards */}
          <div aria-hidden="true">
            {[0, 1.5, 3].map((d) => (
              <span key={d} className="eco-wave" style={{ animationDelay: `${d}s` }} />
            ))}
          </div>

          <div
            className="absolute z-10 flex flex-col items-center justify-center rounded-full text-center"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'var(--hub)',
              height: 'var(--hub)',
              background: 'var(--card-bg)',
              border: '1px solid var(--accent-line)',
              boxShadow: '0 8px 24px rgb(var(--shadow-rgb) / calc(0.16 * var(--shadow-k)))',
            }}
          >
            <Image src="/images/accez-logo.png" alt="Accez" width={112} height={116} className="rounded-lg mb-1.5 w-7 md:w-9 h-auto" />
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
                    <div className="ui-card eco-card flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-3 px-2 md:px-3.5 text-center md:text-start">
                      <div
                        className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)' }}
                      >
                        <Icon size={17} color="var(--accent-hi)" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-strong font-semibold leading-tight text-[11px] md:text-[13px] md:line-clamp-2">
                          {language === 'ar' ? party.titleAr : party.title}
                        </p>
                        <p className="hidden md:block leading-tight mt-0.5 truncate" style={{ fontSize: 11.5, color: 'var(--text-faint)' }}>
                          {language === 'ar' ? party.blurbAr : party.blurb}
                        </p>
                      </div>
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
