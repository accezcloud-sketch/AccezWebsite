import { describe, expect, it } from 'vitest'
import { isArabicPage, setArabicHtmlLang } from './htmlLang.mjs'

describe('isArabicPage', () => {
  it('matches the Arabic home page and everything under ar/', () => {
    expect(isArabicPage('ar/index.html')).toBe(true)
    expect(isArabicPage('ar.html')).toBe(true)
    expect(isArabicPage('ar/blog/some-post/index.html')).toBe(true)
  })
  it('leaves English pages alone, including ones that merely start with "ar"', () => {
    expect(isArabicPage('index.html')).toBe(false)
    expect(isArabicPage('about/index.html')).toBe(false)
    expect(isArabicPage('articles/index.html')).toBe(false)
  })
})

describe('setArabicHtmlLang', () => {
  it('replaces lang and adds dir on the html tag only', () => {
    const out = setArabicHtmlLang('<!DOCTYPE html><html lang="en" class="x"><head><meta lang="en"></head></html>')
    expect(out).toContain('<html lang="ar" dir="rtl" class="x">')
    expect(out).toContain('<meta lang="en">')
  })
  it('is idempotent', () => {
    const once = setArabicHtmlLang('<html lang="en">')
    expect(setArabicHtmlLang(once)).toBe(once)
  })
})
