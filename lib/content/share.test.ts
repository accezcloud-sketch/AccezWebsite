import { describe, expect, it } from 'vitest'
import { shareLinks } from './share'

describe('shareLinks', () => {
  const url = 'https://www.accez.cloud/ar/blog/my-post/'
  const links = shareLinks(url, 'إدارة الفواتير & المرافق')

  it('puts the full, encoded page URL in every link', () => {
    for (const href of Object.values(links)) expect(href).toContain(encodeURIComponent(url))
  })

  it('builds a WhatsApp link with title and URL in one text field', () => {
    expect(links.whatsapp).toBe(`https://wa.me/?text=${encodeURIComponent(`إدارة الفواتير & المرافق ${url}`)}`)
  })

  it('encodes characters that would break the query string', () => {
    expect(links.x).toContain('text=%D8%A5') // Arabic is percent-encoded
    expect(links.x).not.toContain('& ')
  })
})
