import { describe, expect, it } from 'vitest'
import { committedDay, lastChangeDay, localDay, newestDay, pageDates, routeKey } from './pageDates.mjs'

/** A fake git: `log` prints the given days, `status` the given dirty files. */
const fakeGit = (logDays: string[], dirty = '') => (args: string[]) => (args[0] === 'status' ? dirty : logDays.join('\n'))

describe('page dates', () => {
  it('normalises routes', () => {
    expect(routeKey('/pricing/property-managers/')).toBe('pricing/property-managers')
    expect(routeKey('')).toBe('')
  })

  it('takes the newest day, ignoring blanks and time parts', () => {
    expect(newestDay(['2026-09-01', '', '2026-10-02T10:00:00Z', '2026-07-01'])).toBe('2026-10-02')
    expect(newestDay(['', 'not a date'])).toBeUndefined()
  })

  it('dates a page by the newest commit to its sources', () => {
    expect(committedDay(['app/about'], fakeGit(['2026-10-19', '2026-10-21', '2026-10-18']))).toBe('2026-10-21')
  })

  it('uses today for sources with uncommitted edits', () => {
    expect(lastChangeDay(['app/about'], fakeGit(['2026-10-19'], ' M app/about/page.tsx'), '2026-10-26')).toBe('2026-10-26')
    expect(lastChangeDay(['app/about'], fakeGit(['2026-10-19']), '2026-10-26')).toBe('2026-10-19')
  })

  it('refuses a page whose sources have no history (a typo in PAGE_SOURCES)', () => {
    expect(() => pageDates(fakeGit([]), '2026-10-26')).toThrow(/No git history/)
  })

  it('formats the local day', () => {
    expect(localDay(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})
