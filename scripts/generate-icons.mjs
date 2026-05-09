// scripts/generate-icons.mjs
//
// Generates all favicon/icon raster assets from public/favicon.svg.
//
// Usage:   node scripts/generate-icons.mjs
// Prereq:  npm install --save-dev sharp
//
// Outputs (all written to public/):
//   favicon.ico     — multi-size ICO (16x16 + 32x32), white background
//   apple-icon.png  — 180x180, transparent background (iOS home screen)
//   icon-192.png    — 192x192, transparent (Android / PWA)
//   icon-512.png    — 512x512, transparent (PWA + schema.org usage)
//   logo.png        — 512x512, transparent (LocalBusiness schema image)
//
// The source SVG has a 100x100 viewBox and no width/height, so sharp can
// rasterize it at any resolution without loss.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public')
const SRC = join(PUBLIC, 'favicon.svg')

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }

/** Render the SVG to a PNG buffer at an exact square size. */
async function renderPng(size, { background = TRANSPARENT } = {}) {
  const svg = await readFile(SRC)
  return sharp(svg, { density: 384 }) // high density → crisp rasterization
    .resize(size, size, {
      fit: 'contain',
      background,
    })
    .flatten(background.alpha === 1 ? { background } : false) // preserve transparency when requested
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** Build a minimal multi-size ICO (16x16 + 32x32) from PNG buffers. */
function buildIco(pngBuffers) {
  // ICO header (6 bytes) + directory entries (16 bytes each) + PNG payloads.
  // Chromium/Firefox/Windows all accept PNG-encoded ICO entries.
  const count = pngBuffers.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)     // reserved
  header.writeUInt16LE(1, 2)     // type: 1 = icon
  header.writeUInt16LE(count, 4) // image count

  const dir = Buffer.alloc(16 * count)
  let offset = 6 + 16 * count
  pngBuffers.forEach(({ buffer, size }, i) => {
    const base = i * 16
    dir.writeUInt8(size >= 256 ? 0 : size, base + 0)     // width (0 = 256)
    dir.writeUInt8(size >= 256 ? 0 : size, base + 1)     // height
    dir.writeUInt8(0, base + 2)                          // color palette
    dir.writeUInt8(0, base + 3)                          // reserved
    dir.writeUInt16LE(1, base + 4)                       // color planes
    dir.writeUInt16LE(32, base + 6)                      // bits per pixel
    dir.writeUInt32LE(buffer.length, base + 8)           // bytes in resource
    dir.writeUInt32LE(offset, base + 12)                 // offset to resource
    offset += buffer.length
  })

  return Buffer.concat([header, dir, ...pngBuffers.map((p) => p.buffer)])
}

async function main() {
  console.log(`• Source: ${SRC}`)

  // ── PNGs (transparent background) ──
  const outputs = [
    { file: 'apple-icon.png', size: 180 },
    { file: 'icon-192.png',   size: 192 },
    { file: 'icon-512.png',   size: 512 },
    { file: 'logo.png',       size: 512 },
  ]

  for (const { file, size } of outputs) {
    const buf = await renderPng(size, { background: TRANSPARENT })
    const outPath = join(PUBLIC, file)
    await writeFile(outPath, buf)
    console.log(`✓ ${file.padEnd(16)} ${size}x${size}  (${buf.length} bytes)`)
  }

  // ── favicon.ico (white background, 16x16 + 32x32 multi-size) ──
  const png16 = await renderPng(16, { background: WHITE })
  const png32 = await renderPng(32, { background: WHITE })
  const ico = buildIco([
    { buffer: png16, size: 16 },
    { buffer: png32, size: 32 },
  ])
  const icoPath = join(PUBLIC, 'favicon.ico')
  await writeFile(icoPath, ico)
  console.log(`✓ favicon.ico      16+32     (${ico.length} bytes)`)

  console.log('\nAll icons written to public/.')
}

main().catch((err) => {
  console.error('✗ icon generation failed:', err)
  process.exit(1)
})
