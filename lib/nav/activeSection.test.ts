import { describe, expect, it } from 'vitest'
import { activeNavSection, isCurrentPath } from './activeSection'

describe('activeNavSection', () => {
  it('maps pages to their menu item, in both languages', () => {
    expect(activeNavSection('/solutions/property-managers/')).toBe('solutions')
    expect(activeNavSection('/ar/solutions/service-providers/')).toBe('solutions')
    expect(activeNavSection('/pricing/service-providers/')).toBe('pricing')
    expect(activeNavSection('/blog/some-post/')).toBe('blog')
    expect(activeNavSection('/ar/blog/')).toBe('blog')
    expect(activeNavSection('/support/')).toBe('support')
    expect(activeNavSection('/about/')).toBe('about')
    expect(activeNavSection('/terms/property-managers/')).toBe('resources')
    expect(activeNavSection('/ar/faq/')).toBe('resources')
    expect(activeNavSection('/resources/saudi-regulations/')).toBe('resources')
    expect(activeNavSection('/ar/resources/downloads/move-in-move-out-inspection-checklist/')).toBe('resources')
    expect(activeNavSection('/tools/rental-revenue-calculator/')).toBe('resources')
    expect(activeNavSection('/integrations/stripe/')).toBe('resources')
  })

  it('leaves the homepage and unknown pages unmarked', () => {
    expect(activeNavSection('/')).toBeNull()
    expect(activeNavSection('/ar/')).toBeNull()
    expect(activeNavSection('/thankyou/')).toBeNull()
  })

  it('does not match on a prefix of a word', () => {
    expect(activeNavSection('/aboutness/')).toBeNull()
    expect(activeNavSection('/arabic/')).toBeNull()
  })
})

describe('isCurrentPath', () => {
  it('ignores the trailing slash', () => {
    expect(isCurrentPath('/pricing/property-managers', '/pricing/property-managers/')).toBe(true)
    expect(isCurrentPath('/pricing/property-managers', '/pricing/service-providers/')).toBe(false)
  })
})
