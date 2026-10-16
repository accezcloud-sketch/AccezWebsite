import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { productCta } from './productPages'
import type { ProductPageKey } from './productMatch'

const keys: ProductPageKey[] = ['owners', 'sales', 'hotels', 'modules']

describe('productCta', () => {
  it.each(keys)('%s has complete copy in both languages', (key) => {
    for (const locale of ['en', 'ar'] as const) {
      const c = productCta(key, locale)
      for (const [field, value] of Object.entries(c)) expect(value, `${key}.${locale}.${field}`).toBeTruthy()
    }
  })

  it.each(keys)('%s points at a page that exists in both languages', (key) => {
    const route = productCta(key, 'en').route.replace(/^\//, '')
    const app = path.join(process.cwd(), 'app')
    expect(fs.existsSync(path.join(app, route, 'page.tsx')), `app/${route}`).toBe(true)
    expect(fs.existsSync(path.join(app, 'ar', route, 'page.tsx')), `app/ar/${route}`).toBe(true)
  })

  it('uses Arabic copy for the Arabic locale', () => {
    expect(productCta('owners', 'ar').title).toMatch(/[؀-ۿ]/)
    expect(productCta('modules', 'ar').bookDemo).toMatch(/[؀-ۿ]/)
  })
})
