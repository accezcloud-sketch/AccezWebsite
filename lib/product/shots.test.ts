import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { SHOTS, SHOT_WIDTHS, shotSources, type ShotKey } from './shots'

const PUBLIC = path.join(process.cwd(), 'public')

describe('product screenshots', () => {
  it('every screenshot exists in both languages and every width', () => {
    for (const key of Object.keys(SHOTS) as ShotKey[]) {
      for (const locale of ['en', 'ar'] as const) {
        for (const entry of shotSources(key, locale).srcSet.split(', ')) {
          const file = entry.split(' ')[0]
          expect(existsSync(path.join(PUBLIC, file)), `${key} ${locale} ${file}`).toBe(true)
        }
      }
    }
  })

  it('has no leftover files that no page uses', () => {
    const used = new Set(Object.values(SHOTS).map((s) => `${s.app}/${s.name}`))
    for (const app of ['pm', 'sp']) {
      for (const lang of ['en', 'ar']) {
        for (const f of readdirSync(path.join(PUBLIC, 'product', app, lang))) {
          const m = f.match(/^(.+)-(\d+)\.webp$/)
          expect(m, f).not.toBeNull()
          expect(used.has(`${app}/${m![1]}`), `${app}/${lang}/${f}`).toBe(true)
          expect(SHOT_WIDTHS).toContain(Number(m![2]))
        }
      }
    }
  })
})
