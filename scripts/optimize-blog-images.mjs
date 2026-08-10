#!/usr/bin/env node
/**
 * Convert blog cover images to WebP at build time.
 *
 * WHY THIS EXISTS
 * ---------------
 * The n8n workflow (accez-blog-auto-deploy) hardcodes the cover image path:
 *
 *     coverImagePath = '/images/blog/' + topicSlug + '.jpg'
 *
 * That is fine and nothing breaks — but a JPEG cover is roughly twice the bytes
 * of the equivalent WebP, and Largest Contentful Paint on a blog post is almost
 * always the cover image. Without this step every new automated post would
 * quietly undo the image optimisation.
 *
 * Rather than change the automation (which would risk breaking publishing), the
 * site fixes it up at build time. n8n keeps doing exactly what it does today.
 *
 * WHAT IT DOES
 * ------------
 * For every post in content/blog:
 *   1. Reads the `coverImage` frontmatter value.
 *   2. If it points at .jpg/.jpeg/.png and no .webp twin exists, creates one.
 *   3. Rewrites the frontmatter to point at the .webp.
 *
 * The ORIGINAL raster is deliberately kept on disk. Facebook, LinkedIn and X do
 * not reliably render WebP in link previews, so the Open Graph tags map the
 * extension back to .jpg (see app/blog/[slug]/page.tsx).
 *
 * SAFETY
 * ------
 * This must never break a deploy. Any failure is logged and skipped — a post
 * keeps its JPEG cover, which works perfectly well. Posts whose .webp already
 * exists are skipped, so a normal build converts only the newest post or two.
 */

import { readdir, readFile, writeFile, access } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { constants } from 'node:fs'

const BLOG_DIR = 'content/blog'
const PUBLIC_DIR = 'public'
const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png'])
const QUALITY = 82 // visually lossless for photographic covers at these sizes

async function exists(p) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('[blog-images] sharp unavailable — skipping WebP conversion.')
    return
  }

  let files
  try {
    files = (await readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'))
  } catch {
    console.warn(`[blog-images] no ${BLOG_DIR} directory — nothing to do.`)
    return
  }

  let converted = 0
  let repointed = 0
  let savedBytes = 0

  for (const file of files) {
    const mdPath = join(BLOG_DIR, file)
    let md
    try {
      md = await readFile(mdPath, 'utf8')
    } catch {
      continue
    }

    const match = md.match(/^coverImage:\s*"([^"]+)"/m)
    if (!match) continue

    const ref = match[1]
    if (ref.startsWith('http')) continue // remote image, not ours to optimise

    const ext = extname(ref).toLowerCase()
    if (!CONVERTIBLE.has(ext)) continue // already .webp

    const srcDisk = join(PUBLIC_DIR, ref)
    const webpRef = ref.slice(0, -ext.length) + '.webp'
    const webpDisk = join(PUBLIC_DIR, webpRef)

    if (!(await exists(srcDisk))) {
      console.warn(`[blog-images] ${file}: cover missing on disk (${ref}) — left as-is.`)
      continue
    }

    if (!(await exists(webpDisk))) {
      try {
        const before = (await readFile(srcDisk)).length
        await sharp(srcDisk).webp({ quality: QUALITY, effort: 5 }).toFile(webpDisk)
        const after = (await readFile(webpDisk)).length
        savedBytes += before - after
        converted++
      } catch (err) {
        console.warn(`[blog-images] ${file}: conversion failed (${err.message}) — left as-is.`)
        continue
      }
    }

    await writeFile(mdPath, md.replace(match[0], `coverImage: "${webpRef}"`), 'utf8')
    repointed++
  }

  if (converted || repointed) {
    const mb = (savedBytes / 1048576).toFixed(2)
    console.log(
      `[blog-images] converted ${converted} image(s), repointed ${repointed} post(s), saved ${mb} MB.`
    )
  } else {
    console.log('[blog-images] all covers already WebP — nothing to do.')
  }
}

// Never fail the build over an image optimisation.
main().catch((err) => {
  console.warn('[blog-images] skipped:', err.message)
})
