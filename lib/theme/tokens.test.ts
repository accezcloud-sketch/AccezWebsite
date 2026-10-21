/**
 * Both themes must stay readable: WCAG AA contrast (4.5:1 for text, 3:1 for
 * UI boundaries) for the colour pairs the site actually uses. Reads the real
 * stylesheet, so a token edit that breaks contrast fails here.
 */
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const css = fs.readFileSync(path.join(process.cwd(), 'app/globals.css'), 'utf8')

function tokens(selector: RegExp): Record<string, string> {
  const block = css.match(selector)?.[1] ?? ''
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
}

const dark = tokens(/:root,\s*:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)
const light = tokens(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/)
const shared = tokens(/^:root\s*\{([\s\S]*?)\n\}/m)

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const f = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe.each([
  ['dark', dark],
  ['light', light],
])('%s theme', (_name, t) => {
  const v = (name: string) => t[name] ?? shared[name]

  it.each(['text-strong', 'text', 'text-soft', 'text-muted', 'text-faint', 'accent-hi'])('%s is readable on the page background', (name) => {
    expect(contrast(v(name), v('bg'))).toBeGreaterThanOrEqual(4.5)
    expect(contrast(v(name), v('bg-alt'))).toBeGreaterThanOrEqual(4.5)
  })

  it('white text on filled accent controls passes AA', () => {
    expect(contrast(v('on-accent'), v('accent-solid'))).toBeGreaterThanOrEqual(4.5)
    expect(contrast(v('on-accent'), v('accent-solid-hover'))).toBeGreaterThanOrEqual(4.5)
  })

  it('filled accent controls stand out from the page (3:1)', () => {
    expect(contrast(v('accent-solid'), v('bg'))).toBeGreaterThanOrEqual(3)
  })
})

it('light theme buttons, icons and links use the brand navy #102634', () => {
  for (const name of ['accent', 'accent-solid', 'accent-hi']) expect(light[name]?.toUpperCase(), name).toBe('#102634')
})

it('both themes define the same tokens', () => {
  expect(Object.keys(light).sort()).toEqual(Object.keys(dark).sort())
})
