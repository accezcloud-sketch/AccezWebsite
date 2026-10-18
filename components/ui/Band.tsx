import type { ReactNode } from 'react'

/**
 * The background the section inside it sits on. Page sections alternate
 * between the two shades, so each reads as its own block, and both are softly
 * lit so the frosted cards on top have depth (globals.css, "Design system").
 * Sections read the shade through --section-bg; on their own they keep their
 * usual background.
 */
export default function Band({ shade, children }: { shade: 'base' | 'alt'; children: ReactNode }) {
  return <div className={shade === 'alt' ? 'band-alt' : 'band-base'}>{children}</div>
}
