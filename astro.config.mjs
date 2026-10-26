// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { load } from 'cheerio';

// The sitemap hook runs after HTML generation. Use the rendered robots metadata
// so empty catalogues and future noindex pages cannot drift into the sitemap.
let outputDirectory = new URL('./dist/', import.meta.url);

// When apocalypsegearlab.com is purchased and attached in GitHub Pages:
// 1) change `site` below, 2) add public/CNAME with the domain. Nothing else.
export default defineConfig({
  site: 'https://apocalypsegearlab.github.io',
  compressHTML: true,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    {
      name: 'deliver-only-permitted-artwork',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const media = JSON.parse(readFileSync(new URL('./src/data/media/manifest.json', import.meta.url), 'utf8'));
          const review = JSON.parse(readFileSync(new URL('./src/data/media/review.json', import.meta.url), 'utf8'));
          for (const asset of media.assets) {
            const permitted = asset.id === 'hero'
              ? review.assets.hero?.rightsStatus === 'confirmed-by-owner'
              : review.rightsStatus === 'confirmed-by-owner' && review.assets[asset.id]?.accuracyStatus === 'reviewed-illustration';
            if (permitted) continue;
            for (const variant of asset.variants) {
              if (!variant.src) continue;
              if (!/^\/images\/[a-z0-9-]+\.webp$/.test(variant.src)) throw new Error('Unexpected artwork delivery path');
              const output = new URL(`.${variant.src}`, dir);
              if (!output.href.startsWith(dir.href)) throw new Error('Artwork output escaped build directory');
              // Remove only generated delivery copies; owner sources and tracked WebP files stay intact.
              if (existsSync(output)) unlinkSync(output);
            }
          }
        },
      },
    },
    {
      name: 'capture-output-directory',
      hooks: { 'astro:config:done': ({ config }) => { outputDirectory = config.outDir; } },
    },
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        if (pathname === '/404/' || pathname === '/404.html') return false;
        const file = new URL(`.${pathname}index.html`, outputDirectory);
        const html = load(readFileSync(file, 'utf8'));
        return !html('meta[name="robots"]').attr('content')?.split(/[\s,]+/).includes('noindex');
      },
    }),
    {
      name: 'preserve-legacy-sitemap-url',
      hooks: {
        'astro:build:done': ({ dir }) => {
          copyFileSync(new URL('sitemap-index.xml', dir), new URL('sitemap.xml', dir));
        },
      },
    },
  ],
});
