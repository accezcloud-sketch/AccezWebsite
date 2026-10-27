import { describe, expect, it } from 'vitest'
import { campaignNote, readCampaign } from './campaign'

describe('readCampaign', () => {
  it('reads utm labels, an outside referrer and the landing page', () => {
    const c = readCampaign('?utm_source=facebook&utm_medium=paid&utm_campaign=oct&x=1', 'https://m.facebook.com/x', '/blog/post/', 'www.accez.cloud')
    expect(c).toEqual({ utm: { utm_source: 'facebook', utm_medium: 'paid', utm_campaign: 'oct' }, referrer: 'm.facebook.com', landing: '/blog/post/' })
  })
  it('ignores the site itself as a referrer and bad referrers', () => {
    expect(readCampaign('', 'https://www.accez.cloud/ar/', '/', 'www.accez.cloud').referrer).toBeUndefined()
    expect(readCampaign('', 'not a url', '/', 'www.accez.cloud').referrer).toBeUndefined()
  })
})

describe('campaignNote', () => {
  it('writes one line for the Lead description', () => {
    expect(campaignNote({ utm: { utm_source: 'google', utm_campaign: 'brand' }, referrer: 'google.com', landing: '/' })).toBe(
      '[Website visit] source=google, campaign=brand, referrer=google.com, landing page=/',
    )
  })
  it('says only the landing page for a direct visit, and nothing without data', () => {
    expect(campaignNote({ utm: {}, landing: '/pricing/' })).toBe('[Website visit] landing page=/pricing/')
    expect(campaignNote(null)).toBe('')
  })
})
