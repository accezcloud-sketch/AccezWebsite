import { describe, expect, it } from 'vitest'
import { splitBilingualBody, stripLeadingFrontmatter } from './postBody'

describe('splitBilingualBody', () => {
  it('splits on the Arabic marker', () => {
    expect(splitBilingualBody('English body\n\n<!-- AR -->\n\nالنص العربي')).toEqual({ en: 'English body', ar: 'النص العربي' })
  })

  it('uses the whole body for both languages when there is no marker', () => {
    expect(splitBilingualBody('Only English')).toEqual({ en: 'Only English', ar: 'Only English' })
  })

  it('falls back to English when the Arabic half is empty', () => {
    expect(splitBilingualBody('English\n<!-- AR -->\n   ')).toEqual({ en: 'English', ar: 'English' })
  })

  it('normalises Windows line endings', () => {
    expect(splitBilingualBody('Line one\r\nLine two').en).toBe('Line one\nLine two')
  })

  it('removes a repeated frontmatter block after the marker', () => {
    const raw = 'EN\n<!-- AR -->\n\n---\ntitle: "عنوان"\nmetaTitle: "عنوان"\ntags: ["أ", "ب"]\n---\n\n> ملخص\n\nنص'
    expect(splitBilingualBody(raw).ar).toBe('> ملخص\n\nنص')
  })
})

describe('stripLeadingFrontmatter', () => {
  it('keeps a genuine horizontal rule followed by prose', () => {
    const md = '---\nThis is a paragraph, not metadata.\n---\nMore text'
    expect(stripLeadingFrontmatter(md)).toBe(md)
  })

  it('keeps content that does not start with ---', () => {
    expect(stripLeadingFrontmatter('Intro\n---\ntitle: x\n---')).toBe('Intro\n---\ntitle: x\n---')
  })

  it('keeps an unclosed block', () => {
    expect(stripLeadingFrontmatter('---\ntitle: x\nbody')).toBe('---\ntitle: x\nbody')
  })

  it('keeps an empty --- pair (two rules)', () => {
    expect(stripLeadingFrontmatter('---\n---\ntext')).toBe('---\n---\ntext')
  })
})
