/**
 * Fails the build if the English and Arabic legal documents drift apart.
 *
 * WHY THIS EXISTS
 *
 * The Terms, Privacy Policy and Refund Policy are published in two languages.
 * Neither version claims priority over the other, which is a deliberate choice:
 * a "the English version prevails" clause is really an admission that the two
 * texts are allowed to disagree. We do not want them to be allowed to disagree.
 *
 * But a one-time manual alignment survives exactly until the next edit. Someone
 * adds a clause to the English Terms, ships it, and the Arabic silently becomes
 * a different contract — and in a Saudi court the Arabic is the one that gets
 * read. This check makes that failure mode impossible to ship: the structures
 * have to match or the build stops.
 *
 * WHAT IT CHECKS
 *
 * Structure, not wording. It cannot verify that a translation is accurate — no
 * script can. What it can guarantee is that every section, table, table row,
 * callout, list item and paragraph in one language has a counterpart in the
 * other, so a clause can never exist on one side only.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIR = join(ROOT, 'components', 'legal')

const PAIRS = [
  { name: 'Terms of Service', en: 'TermsContent.tsx', ar: 'TermsContentAr.tsx' },
  { name: 'Privacy Policy', en: 'PrivacyContent.tsx', ar: 'PrivacyContentAr.tsx' },
  { name: 'Refund & Cancellation', en: 'RefundContent.tsx', ar: 'RefundContentAr.tsx' },
]

const count = (src, re) => (src.match(re) || []).length

/**
 * Section ids are the anchor of the comparison. They are language-independent
 * by design (id="fees" on both sides), so they line up section-for-section even
 * though the titles are in different scripts.
 */
function profile(file) {
  const src = readFileSync(join(DIR, file), 'utf8')
  return {
    sections: [...src.matchAll(/<S id="([^"]+)"/g)].map((m) => m[1]),
    perSection: Object.fromEntries(
      src
        .split(/<S id="([^"]+)"/)
        .slice(1)
        .reduce((acc, part, i, arr) => {
          if (i % 2 === 0) acc.push([part, arr[i + 1] ?? ''])
          return acc
        }, [])
        .map(([id, body]) => [
          id,
          {
            p: count(body, /<p>/g),
            li: count(body, /<li>/g),
            h3: count(body, /<h3>/g),
            tables: count(body, /<LegalTable/g),
            callouts: count(body, /<LegalCallout/g),
          },
        ])
    ),
    totals: {
      tables: count(src, /<LegalTable/g),
      callouts: count(src, /<LegalCallout/g),
      rows: count(src, /^\s*\[/gm),
    },
  }
}

const problems = []

for (const { name, en, ar } of PAIRS) {
  const E = profile(en)
  const A = profile(ar)

  const missing = E.sections.filter((s) => !A.sections.includes(s))
  const extra = A.sections.filter((s) => !E.sections.includes(s))
  if (missing.length) problems.push(`${name}: section(s) missing from Arabic — ${missing.join(', ')}`)
  if (extra.length) problems.push(`${name}: section(s) in Arabic with no English counterpart — ${extra.join(', ')}`)

  if (missing.length === 0 && extra.length === 0) {
    const order = E.sections.filter((s, i) => A.sections[i] !== s)
    if (order.length) problems.push(`${name}: sections are in a different order — first mismatch at "${order[0]}"`)
  }

  for (const [key, val] of Object.entries(E.totals)) {
    if (A.totals[key] !== val) {
      problems.push(`${name}: ${key} count differs — English ${val}, Arabic ${A.totals[key]}`)
    }
  }

  for (const id of E.sections) {
    const e = E.perSection[id]
    const a = A.perSection[id]
    if (!e || !a) continue
    for (const key of Object.keys(e)) {
      if (e[key] !== a[key]) {
        problems.push(`${name} §${id}: ${key} differs — English ${e[key]}, Arabic ${a[key]}`)
      }
    }
  }
}

if (problems.length) {
  console.error('\n✗ English and Arabic legal documents are out of alignment:\n')
  for (const p of problems) console.error(`   • ${p}`)
  console.error(
    '\n  Both languages must carry the same clauses. Neither version claims priority,\n' +
      '  so a clause that exists on only one side is a contract that says two things.\n' +
      '  Add the counterpart, then rebuild.\n'
  )
  process.exit(1)
}

console.log(`✓ Legal documents aligned: ${PAIRS.length} document pairs, EN/AR structures identical`)
