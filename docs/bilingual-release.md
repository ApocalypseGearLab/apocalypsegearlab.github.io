# Bilingual GitHub Pages release

This release adds complete static English/French Canadian editions, an accessible persistent language selector, localized SEO and sitemaps, and the shared responsive product-specification fix. English URLs, Amazon.ca destinations and tracking, GA4, Search Console verification, artwork and safety restrictions are preserved.

The release is prepared locally on `feat/four-universes-cinematic`. Nothing has been pushed, merged or deployed as part of this preparation. The exact commit file list is [bilingual-release-files.txt](bilingual-release-files.txt).

## Validated scope

- Production build: 112 pages (56 per language).
- Astro/TypeScript: zero errors, warnings or hints.
- Unit tests: 123 passed.
- Complete Chromium browser suite: 198 passed, including English/French specifications at 320, 375 and 768 px.
- Site/bilingual validation, affiliate and verification audits passed; all 61 protected original sources retained.
- All 112 rendered pages preserve their text, specifications, metadata, links, images, inline scripts and buying holds across the responsive fix.

See the [implementation report](bilingual-implementation.md), [final visual review](qa/bilingual/final-visual-review/README.md) and [responsive specification results](qa/bilingual/mobile-specifications/README.md).

Only validated implementation, tests, preservation records and review documentation/screenshots are included. `tmp/`, `check-hash.js`, generated builds, local tools/dependencies, browser output directories and environment/credential files are excluded. An additional unstaged `src/components/UniverseHero.astro` hover-color edit is outside this release and remains untouched. It must be reviewed separately before any later local build intended for publication.

## Confirmed Pages configuration

Read-only inspection on November 5, 2026 confirmed:

- Repository: `ApocalypseGearLab/apocalypsegearlab.github.io`.
- Production URL: **https://apocalypsegearlab.github.io/**.
- Live Pages `build_type`: `workflow` (GitHub Actions); `cname`: null; public site; status: built.
- `astro.config.mjs` uses `https://apocalypsegearlab.github.io`, directory output and trailing slashes. No repository base prefix or `public/CNAME` is configured.
- `.github/workflows/deploy.yml` runs only through `workflow_dispatch`, and its build job requires `refs/heads/main` plus `confirm_publish == true`.
- The workflow installs Node from `.nvmrc` (22.23.4), runs `npm ci`, `npm run check`, `npm test`, `npm run build`, and `npm run test:site`, then uploads only `dist/`. The deploy job uses the `github-pages` environment and Pages/OIDC permissions.
- `.github/workflows/ci.yml` validates pull requests to `main`. The current feature branch is not in its historical push allowlist; opening a pull request to `main` triggers the full validation job. Neither a push nor a merge triggers the deployment workflow.

No workflow or repository setting was changed.

## Deployment procedure — only after explicit owner approval

These steps are instructions for a later approved release; they were not executed during preparation.

1. After approval to push, push the local release commit: `git push origin feat/four-universes-cinematic`.
2. Open or update a pull request from `feat/four-universes-cinematic` to `main`. Review the complete PR diff and let **Validate Astro site** finish successfully. An existing feature branch can include earlier commits; review the whole PR, not only this bilingual commit. Keep the excluded local hero edit out until separately reviewed.
3. After explicit approval to merge, merge the reviewed PR into `main`. A merge alone does not publish.
4. Confirm Repository **Settings → Pages → Build and deployment → Source** remains **GitHub Actions**.
5. After explicit approval to deploy, open **Actions → Deploy to GitHub Pages (manual approval) → Run workflow**. Select **main** and check **confirm_publish** (true). Run the workflow and satisfy any configured `github-pages` environment approval.
6. Wait for both the build and deploy jobs to succeed. Verify the reported deployment URL is `https://apocalypsegearlab.github.io/`; smoke-check `/`, `/fr/`, the four universes in each language, product specifications, the selector and both locale sitemaps.

Equivalent dispatch command for step 5, to use only after deployment approval:

```sh
gh workflow run deploy.yml --repo ApocalypseGearLab/apocalypsegearlab.github.io --ref main -f confirm_publish=true
```

Use Actions run logs and the `github-pages` deployment result to confirm success. Do not publish `dist/` by committing it or by using a `gh-pages` branch; this repository publishes the workflow artifact.
