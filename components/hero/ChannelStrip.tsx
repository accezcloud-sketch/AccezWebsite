import type { Locale } from '@/lib/i18n'

const CHANNELS = ['Airbnb', 'Booking.com', 'Expedia', 'VRBO', 'HomeAway', 'Agoda', 'TripAdvisor', 'Hotels.com']

const INTRO = {
  en: 'Syncs with 400+ booking channels including',
  ar: 'متكاملة مع أكثر من 400 قناة حجز بما في ذلك',
} as const

/** The booking channels reservations sync with, scrolling. */
export default function ChannelStrip({ locale }: { locale: Locale }) {
  return (
    <div className="w-full overflow-hidden">
      <p className="text-xs text-faint uppercase tracking-widest mb-4 font-medium text-center lg:text-start">{INTRO[locale]}</p>
      <div
        className="overflow-hidden"
        dir="ltr"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="marquee-track">
          {[...CHANNELS, ...CHANNELS].map((name, i) => (
            <span key={i} className="text-faint text-sm font-semibold whitespace-nowrap" aria-hidden={i >= CHANNELS.length}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
