import { describe, expect, it } from 'vitest'
import { ORGANIZATION_ID, providerMarketplaceSchema, providerPlanPrices, softwareApplicationSchema, websiteSchema } from './siteSchema'

describe('site schema', () => {
  it('describes the website and points to the one Organization', () => {
    const w = websiteSchema()
    expect(w['@type']).toBe('WebSite')
    expect(w.publisher).toEqual({ '@id': ORGANIZATION_ID })
  })

  it('builds the product for each homepage language', () => {
    const ar = softwareApplicationSchema('ar', 'وصف')
    expect(ar.url).toBe('https://www.accez.cloud/ar/')
    expect(ar.offers.url).toBe('https://www.accez.cloud/ar/pricing/')
    expect(ar.provider).toEqual({ '@id': ORGANIZATION_ID })
  })

  it('reads provider plan prices from the plans copy', () => {
    expect(providerPlanPrices()).toEqual([0, 75, 184])
  })

  it('gives the marketplace a full price range and no second Organization', () => {
    const s = providerMarketplaceSchema('en', 'desc')
    expect(s.offers).toMatchObject({ lowPrice: 0, highPrice: 184, offerCount: 3 })
    expect(s.provider).toEqual({ '@id': ORGANIZATION_ID })
  })
})
