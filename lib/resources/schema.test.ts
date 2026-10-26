import { describe, expect, it } from 'vitest'
import { breadcrumbSchema, webApplicationSchema, webPageSchema } from './schema'

describe('resource structured data', () => {
  it('builds breadcrumbs with canonical URLs per language', () => {
    const crumbs = breadcrumbSchema([{ name: 'الرئيسية', route: '' }, { name: 'التنزيلات', route: 'resources/downloads' }], 'ar') as Record<string, any>
    expect(crumbs['@type']).toBe('BreadcrumbList')
    expect(crumbs.itemListElement.map((i: { item: string }) => i.item)).toEqual(['https://www.accez.cloud/ar/', 'https://www.accez.cloud/ar/resources/downloads/'])
    expect(crumbs.itemListElement[1].position).toBe(2)
  })

  it('describes a page in its language, published by the site organization', () => {
    const page = webPageSchema({ route: 'resources/saudi-regulations', locale: 'en', name: 'N', description: 'D', type: 'CollectionPage' }) as Record<string, any>
    expect(page['@type']).toBe('CollectionPage')
    expect(page.url).toBe('https://www.accez.cloud/resources/saudi-regulations/')
    expect(page.inLanguage).toBe('en')
    expect(page.publisher).toEqual({ '@id': 'https://www.accez.cloud/#organization' })
  })

  it('marks the calculator as a free web application without ratings', () => {
    const app = webApplicationSchema({ route: 'tools/rental-revenue-calculator', locale: 'en', name: 'N', description: 'D' }) as Record<string, any>
    expect(app['@type']).toBe('WebApplication')
    expect(app.offers.price).toBe('0')
    expect(app.isAccessibleForFree).toBe(true)
    expect(app).not.toHaveProperty('aggregateRating')
    expect(app).not.toHaveProperty('review')
  })
})
