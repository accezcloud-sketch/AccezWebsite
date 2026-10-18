/**
 * Arabic and English: the letters ع and A. Replaces the generic "languages"
 * icon, whose second glyph is Chinese. Same props as a lucide icon, so it can
 * stand in wherever one is expected.
 */
export default function ArabicEnglishIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <text x="1" y="18" fontSize="16" fontWeight="700" fill={color} fontFamily="var(--font-cairo), system-ui, sans-serif">ع</text>
      <text x="13" y="18" fontSize="13" fontWeight="700" fill={color} fontFamily="var(--font-inter), system-ui, sans-serif">A</text>
    </svg>
  )
}
