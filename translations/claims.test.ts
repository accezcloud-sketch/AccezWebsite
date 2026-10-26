import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { en } from './en'
import { ar } from './ar'

// Owner decisions (2026-10-26): no WhatsApp integration, and people can
// contact Accez any day (no hours limited to some days).
describe('contact and integration claims', () => {
  it('lists no WhatsApp integration', () => {
    const trust = readFileSync(path.resolve(import.meta.dirname, '../components/Trust.tsx'), 'utf8')
    const items = trust.slice(trust.indexOf('const INTEGRATIONS'), trust.indexOf('interface TrustPoint'))
    expect(items).not.toMatch(/whatsapp/i)
    expect(items).toContain('Twilio SMS')
  })

  it('shows no working days, in either language', () => {
    const text = JSON.stringify([en.contact, ar.contact])
    for (const day of [/monday|friday|sunday|thursday|saturday/i, /الاثنين|الجمعة|الأحد|الخميس|السبت/, /9 ?am|6 ?pm|صباحًا|مساءً/]) {
      expect(text, String(day)).not.toMatch(day)
    }
    expect(en.contact.businessHours).toMatch(/any day/i)
    expect(ar.contact.businessHours).toContain('أي يوم')
  })
})
