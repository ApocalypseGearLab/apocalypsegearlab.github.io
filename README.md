# ApocalypseGearLab

Static Astro site prepared for GitHub Pages. Phase 1 (foundation).

## Requirements
- Node >= 22.23.4 and npm >= 9.6.5 (`.nvmrc` pins the verified Node version).
- Astro 7.4.2 or newer within major 7. The original Astro 6 dependency was upgraded after npm audit reported security vulnerabilities.

## Commands
```bash
npm ci           # reproducible installation from the committed package-lock.json
npm run dev      # http://localhost:4321
npm run check    # Astro and TypeScript diagnostics
npm test         # affiliate URL and enrollment checks
npm run test:products # temporary published fixtures; always restores the real build
npm run build    # outputs dist/
npm run test:site # routes, internal links, canonical URLs, sitemap, robots, publication status
npx playwright install chromium
npm run test:browser # Chromium + axe, desktop/mobile, keyboard, no-JS, draft preview
npm run preview
```

## Deployment
1. Review the Pull Request from `feat/astro-foundation` to `main`; CI validates without deploying.
2. Obtain the owner's authorization before merging or publishing.
3. After authorization, merge and select Repo Settings > Pages > Source: **GitHub Actions**.
4. Manually run **Deploy to GitHub Pages (manual approval)** on `main`, explicitly setting `confirm_publish` to true.

Pushes and merges do not trigger deployment. The manual workflow refuses publication from any branch other than `main`. No custom domain or `CNAME` is configured; the target is `https://apocalypsegearlab.github.io/`, so no repository `base` prefix is needed.

The former static site from the original remote commit is preserved in `docs/legacy/`, including its README, stylesheet, robots and sitemap. Astro builds only `src/` and `public/`; this archive is not published.
The former `/sitemap.xml` URL remains available as an alias of the generated sitemap index, and the homepage keeps its `#scenarios` and `#mission` anchors.

## Adding a product
1. Copy `src/data/products/template-product.json` to `src/data/products/<slug>.json`.
2. Fill only verified information. Leave unknown values `null` / empty.
3. Keep `reviewStatus` at `draft` until reviewed. Only `published` products are built in production.
4. Set `testing` to `hands-on` only if we physically tested the product.

## Adding affiliate links (rebuild required)
Edit the product JSON only:
```json
"links": {
  "amazonCa":  { "url": "https://www.amazon.ca/dp/ASIN?tag=YOURTAG", "asin": "ASIN" },
  "amazonCom": { "url": "https://www.amazon.com/dp/ASIN?tag=YOURTAG", "asin": "ASIN" }
}
```
Only credential-free HTTPS URLs on the appropriate amazon.ca / amazon.com marketplace (or amzn.to) are accepted. Anything else renders as "link pending". Amazon links also remain inactive while enrollment is false.
Then set `AMAZON_ASSOCIATE_ENROLLED = true` in `src/config/site.ts` once the Associates account is approved.

Rebuild and follow the authorized publication workflow after modifying JSON or configuration: this is a static site, so editing source files alone does not update the public HTML.

## Custom domain later
Change `site` in `astro.config.mjs` and add `public/CNAME`.


## Verification status

See `docs/phase-1-status.md` for executed checks, results and remaining editorial work. The only supplied product is a template; production intentionally contains no product reviews or active Amazon links.

### Portable Windows runtime used for verification

The installed system Node is 20.5.0. A checksum-verified Node 22.23.4 runtime was downloaded into the ignored `.tools/` directory for this workspace. In PowerShell, use it for the current terminal:

```powershell
$env:PATH = "$PWD\.tools\node-v22.23.4-win-x64;$env:PATH"
$env:ASTRO_TELEMETRY_DISABLED = '1'
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD\.tools\playwright"
npm run dev
```

On another machine, install the Node version from `.nvmrc` and run `npm ci`. Portable tools and browser downloads are local only and are not committed.
