/**
 * Guards for how much JavaScript the pages ship. Content that needs no
 * interaction is rendered on the server and sent as HTML only; a stray
 * 'use client' or animation library would quietly put it back in every
 * visitor's download.
 */
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const ROOT = process.cwd()
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), 'utf8')

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((e) => {
    const rel = path.join(dir, e.name)
    if (e.isDirectory()) return sourceFiles(rel)
    return /\.(tsx?|mjs)$/.test(e.name) ? [rel] : []
  })
}

describe('client JavaScript', () => {
  it('uses no animation library (interface motion is CSS, see globals.css)', () => {
    const offenders = ['app', 'components', 'contexts', 'lib'].flatMap(sourceFiles).filter((f) => /from ['"](framer-motion|motion\/react)['"]/.test(read(f)))
    expect(offenders).toEqual([])
    expect(JSON.parse(read('package.json')).dependencies).not.toHaveProperty('framer-motion')
  })

  it('keeps static content server-rendered', () => {
    const serverOnly = [
      'components/Footer.tsx',
      'components/blog/PostArticle.tsx',
      'components/LegalLayout.tsx',
      ...sourceFiles('components/legal').filter((f) => /Content(Ar)?\.tsx$/.test(f)),
      'components/Hero.tsx',
      'components/Ecosystem.tsx',
      'components/Trust.tsx',
      'components/AboutPage.tsx',
      'components/ServiceProviderPage.tsx',
      'components/ProviderPricing.tsx',
      'components/pricing/PricingFaq.tsx',
    ]
    for (const file of serverOnly) expect(read(file), file).not.toMatch(/^['"]use client['"]/m)
  })

  it('keeps the reading-time measurer (Node stream code) out of browser code', () => {
    expect(read('lib/content/readingTime.ts')).not.toMatch(/from ['"]reading-time['"]/)
  })
})
