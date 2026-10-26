import { describe, expect, it } from 'vitest'
import { CATEGORY_KEYS, FAQS, faqsInCategory, localizedFaq } from './faqs'

describe('FAQ data', () => {
  it('gives every question and answer in both languages', () => {
    for (const f of FAQS) {
      expect(f.question.trim(), f.question).not.toBe('')
      expect(f.answer.trim(), f.question).not.toBe('')
      expect(f.questionAr, f.question).toMatch(/[؀-ۿ]/)
      expect(f.answerAr, f.question).toMatch(/[؀-ۿ]/)
      expect(CATEGORY_KEYS).toContain(f.category)
    }
  })

  it('has pricing and billing questions for the pricing pages', () => {
    const pricing = faqsInCategory('pricingBilling')
    expect(pricing.length).toBeGreaterThan(0)
    expect(pricing.every((f) => f.category === 'pricingBilling')).toBe(true)
    expect(localizedFaq(pricing[0], 'ar').question).toBe(pricing[0].questionAr)
    expect(localizedFaq(pricing[0], 'en').answer).toBe(pricing[0].answer)
  })

  it('makes none of the claims the product does not support', () => {
    // See notes/PRODUCT_FACTS.md: the two solutions are independent, and
    // GDPR, on-premise and fee-free cancellation are not confirmed.
    const text = FAQS.flatMap((f) => [f.question, f.answer, f.questionAr, f.answerAr]).join('\n')
    for (const claim of [/GDPR/i, /on-premise/i, /commission/i, /عمولة/, /no cancellation fees/i, /cancel .*at any time/i, /في أي وقت/, /at rest/i]) {
      expect(text, String(claim)).not.toMatch(claim)
    }
  })

  it('uses no dashes as punctuation', () => {
    for (const f of FAQS) for (const s of [f.question, f.answer, f.questionAr, f.answerAr]) expect(s).not.toMatch(/[–—]| - /)
  })
})
