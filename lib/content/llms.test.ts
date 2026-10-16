import { describe, expect, it } from 'vitest'
import { buildLlmsTxt } from './llms'

describe('buildLlmsTxt', () => {
  const out = buildLlmsTxt({
    name: 'Accez',
    summary: 'All-in-one property\noperations platform.',
    details: ['Languages: Arabic and English.'],
    sections: [
      { heading: 'Product', links: [{ title: 'Owners', url: 'https://www.accez.cloud/owners/', description: 'Owner portal.' }] },
      { heading: 'Empty', links: [] },
    ],
  })

  it('follows the llms.txt layout: title, summary quote, details, linked sections', () => {
    expect(out).toBe(
      '# Accez\n\n> All-in-one property operations platform.\n\nLanguages: Arabic and English.\n\n## Product\n\n- [Owners](https://www.accez.cloud/owners/): Owner portal.\n',
    )
  })

  it('omits empty sections', () => {
    expect(out).not.toContain('## Empty')
  })
})
