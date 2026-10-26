import { describe, expect, it } from 'vitest'
import { ORGANIZATION_ID, organizationSchema, pricingUrl, providerMarketplaceSchema, providerPlanPrices, softwareApplicationSchema, websiteSchema } from './siteSchema'

describe('site schema', () => {
  it('describes the website and points to the one Organization', () => {
    const w = websiteSchema()
    expect(w['@type']).toBe('WebSite')
    expect(w.publisher).toEqual({ '@id': ORGANIZATION_ID })
  })

  it('builds the product for each homepage language', () => {
    const ar = softwareApplicationSchema('ar', 'وصف')
    expect(ar.url).toBe('https://www.accez.cloud/ar/')
    expect(ar.offers.url).toBe('https://www.accez.cloud/ar/pricing/property-managers/')
    expect(softwareApplicationSchema('en', 'd').offers.url).toBe('https://www.accez.cloud/pricing/property-managers/')
    expect(ar.provider).toEqual({ '@id': ORGANIZATION_ID })
  })

  it('reads provider plan prices from the plans copy', () => {
    expect(providerPlanPrices()).toEqual([0, 75, 184])
  })

  it('gives the marketplace a full price range and no second Organization', () => {
    const s = providerMarketplaceSchema('en', 'desc')
    expect(s.offers).toMatchObject({ lowPrice: 0, highPrice: 184, offerCount: 3 })
    expect(s.provider).toEqual({ '@id': ORGANIZATION_ID })
    expect(s.offers.url).toBe('https://www.accez.cloud/pricing/service-providers/')
    expect(providerMarketplaceSchema('ar', 'd').offers.url).toBe('https://www.accez.cloud/ar/pricing/service-providers/')
  })

  it('refuses a pricing link for a solution that does not exist', () => {
    expect(pricingUrl('property-managers', 'en')).toBe('https://www.accez.cloud/pricing/property-managers/')
    expect(() => pricingUrl('nope', 'en')).toThrow()
  })

  it('lists only features the product has', () => {
    const list = softwareApplicationSchema('en', 'd').featureList.join('\n')
    for (const claim of [/e-?sign/i, /campaign/i, /whatsapp/i, /portal/i]) expect(list, String(claim)).not.toMatch(claim)
  })

  it('gives the Organization the office address shown on About, and no phone', () => {
    const org = organizationSchema()
    expect(org['@id']).toBe(ORGANIZATION_ID)
    expect(org.address).toEqual({ '@type': 'PostalAddress', streetAddress: 'Almalqa', addressLocality: 'Riyadh', addressCountry: 'SA' })
    expect(JSON.stringify(org)).not.toMatch(/telephone|openingHours/)
  })
})
