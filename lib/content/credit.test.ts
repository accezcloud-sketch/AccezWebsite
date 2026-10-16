import { describe, expect, it } from 'vitest'
import { photoCreditText } from './credit'

describe('photoCreditText', () => {
  it('does not repeat "Photo by"', () => {
    expect(photoCreditText('Photo by Jason Leung on Unsplash')).toBe('Photo by Jason Leung on Unsplash')
    expect(photoCreditText('photo by Jason Leung')).toBe('photo by Jason Leung')
  })

  it('adds "Photo by" to a bare name', () => {
    expect(photoCreditText('Jason Leung')).toBe('Photo by Jason Leung')
  })
})
