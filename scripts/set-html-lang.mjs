// Runs after `next build`: marks every exported Arabic page as lang="ar" dir="rtl".
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { isArabicPage, setArabicHtmlLang } from '../lib/build/htmlLang.mjs'

const OUT = path.join(process.cwd(), 'out')

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) yield* htmlFiles(full)
    else if (name.endsWith('.html')) yield full
  }
}

let changed = 0
for (const file of htmlFiles(OUT)) {
  if (!isArabicPage(path.relative(OUT, file))) continue
  const html = readFileSync(file, 'utf8')
  const next = setArabicHtmlLang(html)
  if (next !== html) { writeFileSync(file, next); changed++ }
}
console.log(`html lang: ${changed} Arabic pages set to lang="ar" dir="rtl"`)
