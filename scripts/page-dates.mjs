// Writes lib/content/page-dates.json: when each static page last changed, from
// the git history of its own source files (see lib/build/pageDates.mjs).
// Run it after changing a page and commit the JSON with the change:
//   node scripts/page-dates.mjs          update the file
//   node scripts/page-dates.mjs --check  exit 1 if it is out of date
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { pageDates } from '../lib/build/pageDates.mjs'

const FILE = path.join(process.cwd(), 'lib/content/page-dates.json')
const git = (args) => execFileSync('git', args, { encoding: 'utf8' })

if (git(['rev-parse', '--is-shallow-repository']).trim() === 'true') {
  console.error('page dates: this clone is shallow, so its history is incomplete; run `git fetch --unshallow` first.')
  process.exit(1)
}

const next = `${JSON.stringify(pageDates(git), null, 2)}\n`
let current = ''
try { current = readFileSync(FILE, 'utf8') } catch {}

if (process.argv.includes('--check')) {
  if (current !== next) {
    console.error('page dates: lib/content/page-dates.json is out of date; run `node scripts/page-dates.mjs`.')
    process.exit(1)
  }
  console.log('page dates: up to date')
} else if (current !== next) {
  writeFileSync(FILE, next)
  console.log('page dates: lib/content/page-dates.json updated')
} else {
  console.log('page dates: no change')
}
