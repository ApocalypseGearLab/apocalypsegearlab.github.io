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
1. Review the current feature Pull Request to `main`; CI validates without deploying. The current eight-profile work is on `feat/visible-blackout-info-catalogue` (issue #6).
2. Obtain the owner's authorization before merging or publishing.
3. After authorization, merge and select Repo Settings > Pages > Source: **GitHub Actions**.
4. Manually run **Deploy to GitHub Pages (manual approval)** on `main`, explicitly setting `confirm_publish` to true.

Pushes and merges do not trigger deployment. The manual workflow refuses publication from any branch other than `main`. No custom domain or `CNAME` is configured; the target is `https://apocalypsegearlab.github.io/`, so no repository `base` prefix is needed.

The former static site from the original remote commit is preserved in `docs/legacy/`, including its README, stylesheet, robots and sitemap. Astro builds only `src/` and `public/`; this archive is not published.
The former `/sitemap.xml` URL remains available as an alias of the generated sitemap index, and the homepage keeps its `#scenarios` and `#mission` anchors.

## Adding a product
1. Copy `src/data/products/template-product.json` to `src/data/products/<slug>.json`.
2. Fill only verified information. Leave unknown values `null` / empty.
3. Keep `reviewStatus` at `draft` until commercial/editorial review is complete. Drafts default to `visibility: "internal"`. After reviewing the documented content and necessary caveats, explicitly set `visibility: "informational"` to make a reference profile public without commercial approval. Missing artwork does not block this visibility.
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
Set `AMAZON_ASSOCIATE_ENROLLED = true` only after confirming active Canadian participation, the site's authorization and its Canadian tracking ID. Final application review is distinct from initial participation permission. This flag alone cannot activate an unverified/held product. Canadian enrollment never enables Amazon.com links; a US program needs its own confirmation.

Rebuild and follow the authorized publication workflow after modifying JSON or configuration: this is a static site, so editing source files alone does not update the public HTML.

## Custom domain later
Change `site` in `astro.config.mjs` and add `public/CNAME`.


## Verification status

The current behavior is documented in [the eight-product release report](docs/public-blackout-catalogue.md). Production contains eight informational BLACKOUT profiles with seven owner-authorized concept illustrations, a neutral Explorer 300 visual and disabled Amazon.ca buttons. Their commercial review state remains draft; no recommendation, safety clearance or hands-on test is implied. The template stays internal. Earlier phase reports record historical states.

### BLACKOUT editorial workflow

The eight selected ASINs use the owner-supplied `apocalypsegear-20` tracking ID. A correct URL is not evidence of account approval, commission attribution, seller identity or product safety. `AMAZON_ASSOCIATE_ENROLLED` remains false.

Use `npm run build` and `npm run preview` to review the actual public `/blackout/`, `/gear/` and all eight `/gear/<slug>/` routes. They distinguish manufacturer-documented facts from unresolved identity and safety questions. Never host the development server publicly: it also contains internal drafts, a template and artwork review material. Production excludes the internal `/review/` routes and template.

For records with research metadata, changing `reviewStatus` alone cannot publish the product. The shared schema requires `listingVerified: true`, `safetyStatus: "cleared"`, no publication blockers and `publicationApproved: true` before accepting `published`. Update these fields only after the underlying checks and owner approval; they are not a shortcut around those checks. Affiliate-program approval is a separate configuration gate.

`research.checkedAt` dates the source review. `lastVerified` remains null while the exact listing and regional unit are unverified. Kidde, INIU and Explorer 300 keep their commercial holds and prominent public cautions, while their reference profiles remain accessible. Related-product links use the same visibility filter as the catalogue. Pending profiles/catalogue are noindex and excluded from the sitemap; BLACKOUT remains an indexable hub. `npm run release:check` reports informational visibility separately from commercial eligibility; `--require-ready` checks commercial eligibility only and is not a deployment prerequisite for informational pages.

### Portable Windows runtime used for verification

The installed system Node is 20.5.0. A checksum-verified Node 22.23.4 runtime was downloaded into the ignored `.tools/` directory for this workspace. In PowerShell, use it for the current terminal:

```powershell
$env:PATH = "$PWD\.tools\node-v22.23.4-win-x64;$env:PATH"
$env:ASTRO_TELEMETRY_DISABLED = '1'
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD\.tools\playwright"
npm run dev
```

On another machine, install the Node version from `.nvmrc` and run `npm ci`. Portable tools and browser downloads are local only and are not committed.

### Imported BLACKOUT/FALLOUT WebP pack

See [the media integration report](docs/webp-pack-integration.md). The fourteen unchanged sources and original CSV are under assets/media. The imported manifest maps eight current products, reserves the extra HM50R headlamp and five FALLOUT assets, and records owner provenance confirmation. Only assets with current-product mapping, confirmed rights and reviewed accuracy get a static image route. Explorer 300 remains rejected. No FALLOUT product record is added.
