// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { copyFileSync, readFileSync } from 'node:fs';
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
