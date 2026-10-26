// Prints each checklist page of the built site to a PDF in public/downloads/:
//   <id>-en.pdf from /resources/downloads/<id>/ and <id>-ar.pdf from /ar/...
//
// The PDFs are committed, not built on the host, because printing needs a
// browser. Run after changing a checklist (lib/resources/checklists.ts) or
// its page, then rebuild so out/ carries the new files:
//   npx next build && node scripts/set-html-lang.mjs
//   node scripts/build-checklist-pdfs.mjs
//   npx next build && node scripts/set-html-lang.mjs
//
// Uses Google Chrome through the DevTools protocol (no extra packages). Set
// CHROME_PATH if Chrome is not in the default macOS location. The page's own
// print styles (app/globals.css, "Printable checklists") shape the sheet.
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'

const OUT = path.join(process.cwd(), 'out')
const DEST = path.join(process.cwd(), 'public/downloads')
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon' }

const listDir = path.join(OUT, 'resources/downloads')
if (!fs.existsSync(listDir)) {
  console.error('checklist PDFs: no out/resources/downloads; build the site first (npx next build).')
  process.exit(1)
}
const ids = fs.readdirSync(listDir).filter((d) => fs.existsSync(path.join(listDir, d, 'index.html')))

// A static server for out/.
const server = http.createServer((req, res) => {
  let file = path.join(OUT, decodeURIComponent(new URL(req.url, 'http://x').pathname))
  if (!file.startsWith(OUT)) return res.writeHead(403).end()
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
  if (!fs.existsSync(file)) return res.writeHead(404).end()
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`

const port = 9500 + Math.floor(Math.random() * 400)
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'checklist-pdf-'))
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

try {
  let wsUrl
  for (let i = 0; i < 50 && !wsUrl; i++) {
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page')?.webSocketDebuggerUrl } catch {}
    if (!wsUrl) await wait(200)
  }
  if (!wsUrl) throw new Error(`Chrome did not start (${CHROME})`)

  const ws = new WebSocket(wsUrl)
  await new Promise((r, j) => { ws.addEventListener('open', r, { once: true }); ws.addEventListener('error', j, { once: true }) })
  let seq = 0
  const pending = new Map()
  const events = []
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id)
      pending.delete(msg.id)
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result)
    } else if (msg.method) events.forEach((f) => f(msg))
  })
  const send = (method, params = {}) => new Promise((res, rej) => { const id = ++seq; pending.set(id, { res, rej }); ws.send(JSON.stringify({ id, method, params })) })
  const loaded = () => new Promise((r) => { const f = (m) => { if (m.method === 'Page.loadEventFired') { events.splice(events.indexOf(f), 1); r() } }; events.push(f) })

  await send('Page.enable')
  // Light theme and no chat widget, whatever the defaults: the sheet is for paper.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: "try{localStorage.setItem('accez-theme','light')}catch(e){}" })
  await send('Emulation.setEmulatedMedia', { media: 'print', features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] })

  fs.mkdirSync(DEST, { recursive: true })
  for (const id of ids) {
    for (const locale of ['en', 'ar']) {
      const done = loaded()
      await send('Page.navigate', { url: `${base}${locale === 'ar' ? '/ar' : ''}/resources/downloads/${id}/` })
      await done
      // Load every web font face now: Arabic faces otherwise load lazily and miss the print.
      await send('Runtime.evaluate', { expression: 'Promise.all([...document.fonts].map((f) => f.load().catch(() => null))).then(() => document.fonts.ready)', awaitPromise: true })
      await wait(500)
      const { data } = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false })
      const file = path.join(DEST, `${id}-${locale}.pdf`)
      fs.writeFileSync(file, Buffer.from(data, 'base64'))
      console.log(`checklist PDFs: ${path.relative(process.cwd(), file)} (${Math.round(fs.statSync(file).size / 1024)} KB)`)
    }
  }
  ws.close()
} finally {
  chrome.kill()
  server.close()
}
