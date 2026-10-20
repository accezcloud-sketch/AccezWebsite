import { shotSources, type ShotKey } from '@/lib/product/shots'
import type { Locale } from '@/lib/i18n'

interface ShotProps {
  shot: ShotKey
  locale: Locale
  /** Above the fold: load at once instead of lazily. */
  priority?: boolean
  sizes?: string
  className?: string
}

/** The screenshot image alone, at its real size and shape. */
export function ShotImage({ shot, locale, priority = false, sizes = '(min-width: 1280px) 900px, 92vw', className = '' }: ShotProps) {
  const s = shotSources(shot, locale)
  return (
    <img
      src={s.src}
      srcSet={s.srcSet}
      sizes={sizes}
      width={s.width}
      height={s.height}
      alt={s.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={`block w-full h-auto ${className}`}
    />
  )
}

/**
 * A real screenshot of the product in a plain frame: rounded, a hairline
 * border and a soft shadow, nothing else, so the interface is what you see.
 */
export default function ProductShot({ className = '', ...props }: ShotProps) {
  return (
    <div className={`product-shot ${className}`}>
      <ShotImage {...props} />
    </div>
  )
}
