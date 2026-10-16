import { describe, expect, it } from 'vitest'
import { classifyClick, thankYouEvent, thankYouUrl } from './conversions'

describe('classifyClick', () => {
  it('recognises sign-up links for both audiences', () => {
    expect(classifyClick('https://portal.accez.cloud/sign-up')).toEqual({ event: 'sign_up_click', params: { audience: 'property_manager' } })
    expect(classifyClick('https://provider.accez.cloud/sp/signup/')).toEqual({ event: 'sign_up_click', params: { audience: 'service_provider' } })
  })

  it('recognises WhatsApp contact links but not WhatsApp share links', () => {
    expect(classifyClick('https://wa.me/966500000000')?.event).toBe('whatsapp_click')
    expect(classifyClick('https://wa.me/?text=Read%20this')).toBeNull()
  })

  it('recognises "Book a demo" links to the contact form, in both languages', () => {
    expect(classifyClick('/#contact')?.event).toBe('book_demo_click')
    expect(classifyClick('/ar/#contact')?.event).toBe('book_demo_click')
    expect(classifyClick('https://www.accez.cloud/#contact')?.event).toBe('book_demo_click')
  })

  it('ignores ordinary links', () => {
    expect(classifyClick('/blog/')).toBeNull()
    expect(classifyClick('/owners/#contact')).toBeNull()
    expect(classifyClick('https://portal.accez.cloud/login')).toBeNull()
    expect(classifyClick('mailto:hello@accez.cloud')).toBeNull()
  })
})

describe('thankYouEvent', () => {
  it('maps each form to its conversion', () => {
    expect(thankYouEvent('?form=sales')?.event).toBe('generate_lead')
    expect(thankYouEvent('?form=support')?.event).toBe('support_request')
  })

  it('ignores visits without a known form', () => {
    expect(thankYouEvent('')).toBeNull()
    expect(thankYouEvent('?form=other')).toBeNull()
  })
})

describe('thankYouUrl', () => {
  it('returns to the thank-you page in the visitor’s language', () => {
    expect(thankYouUrl('sales', 'en')).toBe('https://www.accez.cloud/thankyou/?form=sales')
    expect(thankYouUrl('support', 'ar')).toBe('https://www.accez.cloud/ar/thankyou/?form=support')
  })
})
