import { describe, expect, it } from 'vitest'
import { HOME_TITLE, TITLE_MAX } from './site'

describe('homepage titles', () => {
  it('fit in a search result, category first, naming Saudi Arabia', () => {
    expect(HOME_TITLE.en.length).toBeLessThanOrEqual(TITLE_MAX)
    expect(HOME_TITLE.ar.length).toBeLessThanOrEqual(TITLE_MAX)
    expect(HOME_TITLE.en).toMatch(/^Property Management/)
    expect(HOME_TITLE.en).toContain('Saudi Arabia')
    expect(HOME_TITLE.ar).toContain('إدارة العقارات')
    expect(HOME_TITLE.ar).toContain('السعودية')
  })
})
