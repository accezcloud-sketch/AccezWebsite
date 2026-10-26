import { describe, expect, it } from 'vitest'
import { breadcrumbSchema } from './breadcrumbSchema'

describe('breadcrumbSchema', () => {
  it('lists the trail in order with canonical URLs in the page language, and nothing else', () => {
    const schema = breadcrumbSchema([{ name: 'الرئيسية', route: '' }, { name: 'التكاملات', route: '/integrations' }], 'ar')
    expect(schema).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://www.accez.cloud/ar/' },
        { '@type': 'ListItem', position: 2, name: 'التكاملات', item: 'https://www.accez.cloud/ar/integrations/' },
      ],
    })
  })
})
