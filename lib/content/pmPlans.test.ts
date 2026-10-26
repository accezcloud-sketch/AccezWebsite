import { describe, expect, it } from 'vitest'
import { en } from '@/translations/en'
import { ar } from '@/translations/ar'
import { FAQS } from './faqs'
import { PM_PLAN_COUNT, PM_PLAN_PRICES, formatSar, pmMonthlyPrices } from './pmPlans'
import { softwareApplicationSchema } from './siteSchema'

describe('property-manager plan prices', () => {
  it('has one price per plan, a year being twelve months', () => {
    for (const p of Object.values(PM_PLAN_PRICES)) expect(p.yearly).toBe(p.monthly * 12)
    expect(pmMonthlyPrices()).toEqual([0, 40, 150])
    expect(PM_PLAN_COUNT).toBe(4)
  })

  it('formats a price the way the plans section shows it', () => {
    expect(formatSar(40, 'en')).toBe('SAR 40')
    expect(formatSar(40, 'ar')).toBe('40 ريال')
  })

  it('gives the structured data offers the same prices', () => {
    expect(softwareApplicationSchema('en', 'd').offers).toMatchObject({ lowPrice: 0, highPrice: 150, offerCount: 4 })
  })

  it('quotes the same prices in the pricing FAQ, in both languages', () => {
    const cost = FAQS.find((f) => f.question === 'How much does Accez.cloud cost?')!
    expect(cost.answer).toContain(`SAR ${PM_PLAN_PRICES.basic.monthly}/month`)
    expect(cost.answer).toContain(`SAR ${PM_PLAN_PRICES.professional.monthly}/month`)
    expect(cost.answerAr).toContain(`${PM_PLAN_PRICES.basic.monthly} ريالًا`)
    expect(cost.answerAr).toContain(`${PM_PLAN_PRICES.professional.monthly} ريالًا`)
  })

  it('shows no discount or launch offer wording', () => {
    const text = JSON.stringify([en.pricing, ar.pricing, FAQS])
    for (const word of [/50 ?%/, /launch/i, /discount/i, /\boff\b/i, /خصم/, /وفر/]) expect(text, String(word)).not.toMatch(word)
  })

  it('lists no plan feature the product does not have', () => {
    const text = JSON.stringify([en, ar])
    for (const claim of [/tenant perks/i, /news feed/i, /amenit/i, /owner portal/i, /announcement/i, /api access/i, /branded domain/i, /امتيازات/, /حجز المرافق/, /بوابة مالك/]) {
      expect(text, String(claim)).not.toMatch(claim)
    }
  })
})
