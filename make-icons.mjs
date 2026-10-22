import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

/* Generate square home-screen / PWA icons from the Final Girl logo, centered
   on the app's deep-black background with padding so it isn't cropped or
   squashed. Run with: node make-icons.mjs  (output goes to /public). */

const LOGO = 'src/assets/final-girl-logo.png';
const BG = { r: 0x0a, g: 0x07, b: 0x08, alpha: 1 }; // --fg-black
const OUT_DIR = 'public';

await mkdir(OUT_DIR, { recursive: true });

async function makeIcon(size, file, padRatio = 0.14) {
  const inner = Math.round(size * (1 - padRatio * 2)); // logo box inside padding
  // Resize the logo to fit within the inner box, preserving aspect ratio.
  const logo = await sharp(LOGO)
    .resize(inner, inner, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(`${OUT_DIR}/${file}`);

  console.log('wrote', `${OUT_DIR}/${file}`, `(${size}x${size})`);
}

// Standard PWA icon sizes.
await makeIcon(192, 'icon-192.png');
await makeIcon(512, 'icon-512.png');
// Apple touch icon (iOS home screen). iOS adds its own rounded corners.
await makeIcon(180, 'apple-touch-icon.png', 0.1);
// A maskable icon needs more padding so the "safe zone" isn't clipped by
// Android's various icon shapes.
await makeIcon(512, 'icon-maskable-512.png', 0.22);

console.log('done');
