# Rapport de vérification — 24 octobre 2026

La fondation Astro se construit et dispose de contrôles reproductibles. Le contenu reste celui de la phase 1 : aucun véritable produit publié, aucun programme Amazon activé, guides et outils encore annoncés comme prévus. Aucun déploiement ni fusion n'a été effectué.

## 1. Fichiers examinés

Les 36 fichiers initialement fournis ont été lus, ainsi que les cinq fichiers du dépôt distant d'origine et les nouveaux fichiers de vérification. Inventaire du résultat :

- Racine : `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `.gitignore`, `.gitattributes`, `README.md`, `playwright.config.ts`.
- Workflows : `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`.
- Configuration et données : `src/config/site.ts`, `src/config/taxonomy.ts`, `src/content.config.ts`, `src/data/products/template-product.json`.
- Layout et bibliothèques : `src/layouts/BaseLayout.astro`, `src/lib/affiliate.ts`, `src/lib/products.ts`.
- Composants : `AffiliateButton`, `Breadcrumbs`, `ComparisonTable`, `DisclosureNotice`, `Footer`, `Header`, `ProductCard`, `UniverseCard`, `UniverseHub` (tous en `.astro`).
- Pages : `index.astro`, `blackout.astro`, `fallout.astro`, `outbreak.astro`, `affiliate-disclosure.astro`, `404.astro`, `gear/index.astro`, `gear/[slug].astro`, `robots.txt.ts`.
- Styles et icône : `src/styles/global.css`, `src/styles/tokens.css`, `public/favicon.svg`.
- Vérification : `scripts/verify-site.mjs`, `scripts/verify-products.mjs`, `tests/affiliate.test.ts`, `tests/browser/site.spec.ts`.
- Documentation : ce rapport et `docs/legacy/{README.md,index.html,robots.txt,sitemap.xml,assets/style.css}`.

## 2. Anomalies corrigées

- Aucun `.git` local et aucun lockfile : dépôt initialisé à partir de l'historique distant, branche de travail suivie, verrouillage npm créé.
- Node système 20.5.0 incompatible : Node 22.23.4 portable téléchargé depuis nodejs.org, archive vérifiée par SHA-256, runtime conservé dans `.tools/` et ignoré par Git. `.nvmrc` et les moteurs npm correspondent désormais au runtime vérifié.
- L'installation Astro 6 signalait une vulnérabilité critique, une élevée et une faible. Migration vers Astro 7.4.2 après revue du guide officiel, puis mise à jour compatible des dépendances transitives : audit final sans vulnérabilité signalée. `compressHTML: true` conserve le traitement des espaces antérieur.
- Les tailles minimales de grilles pouvaient dépasser la largeur mobile : minimums adaptés au conteneur pour les cartes, les hubs, le pied de page et l'accueil. Le panneau d'état passe ses éléments à la ligne au lieu de couper les noms des secteurs.
- Le fondu d'apparition de l'accueil produisait un contraste insuffisant pendant l'animation : suppression de l'animation d'opacité, déplacement décoratif conservé. La préférence de réduction des animations reste prise en compte dans le CSS.
- Le catalogue vide portait `noindex` mais pouvait figurer dans le sitemap : le filtre lit maintenant les métadonnées des pages générées. Le catalogue redevient indexable lorsqu'un produit publié existe.
- La route spéciale Astro 404 utilisait `/404/` comme canonique alors que GitHub Pages reçoit `404.html` : canonique corrigée.
- Les liens Amazon pouvaient être rendus malgré un compte Associates inactif : désactivation jusqu'à activation explicite du compte, validation du domaine propre à chaque marketplace et refus des URL contenant des identifiants. Les paramètres d'affiliation et `sponsored nofollow noopener` sont conservés.
- Ancienne documentation erronée sur les mises à jour JSON « sans rebuild » : procédure corrigée pour un site statique.
- Absence de CI de PR : workflow de validation ajouté. La publication a été séparée et requiert un lancement manuel sur `main` avec `confirm_publish=true`.
- L'ancien site distant a été déplacé dans `docs/legacy/` pour conserver son contenu sans l'inclure dans le build Astro. L'URL `/sitemap.xml` est conservée comme alias du sitemap index ; les ancres `/#scenarios` et `/#mission` restent présentes.

## 3. Compilation

`npm install`, puis `npm ci` ont réussi avec Node 22.23.4 / npm 10.9.9. `npm run build` réussit avec Astro 7.4.2, en sortie statique :

| Route | Résultat |
| --- | --- |
| `/` | accueil généré |
| `/blackout/` | hub généré |
| `/fallout/` | hub généré |
| `/outbreak/` | hub généré, distinction fiction visible |
| `/gear/` | catalogue vide généré, `noindex` |
| `/affiliate-disclosure/` | déclaration générée |
| `/404.html` | page d'erreur générée, `noindex` |

Sept pages HTML, `robots.txt`, les assets CSS/JS, `sitemap-index.xml`, `sitemap-0.xml` et l'alias `sitemap.xml` sont produits dans `dist/`. Le modèle produit est volontairement absent de production.

## 4. Tests réellement exécutés

- `npm ci` : installation reproductible réussie ; audit intégré à l'installation : **0 vulnérabilité**.
- `npm run check` : **0 erreur, 0 avertissement, 0 indication** sur 31 fichiers contrôlés.
- `npm test` : **7 tests réussis** sur l'activation Associates, les marketplaces, les tags, les domaines trompeurs, les protocoles, les identifiants dans les URL, les liens absents et les relations d'affiliation.
- `npm run test:products` : trois fixtures de produits publiés créées temporairement, une par univers. Vérification des routes produit, des spécifications, du catalogue rempli indexable, du filtrage des univers, du sitemap et des boutons marchands en attente. Fixtures supprimées dans `finally`, puis reconstruction automatique des sept pages avec les seules données réelles.
- `npm run test:site` : **7 pages HTML, 116 références internes et 5 URL de sitemap** vérifiées ; fichiers et fragments cibles, titres uniques, H1, langue, description, viewport, canonique, Open Graph, JSON-LD, robots et exclusion des produits non publiés. Alias du sitemap et ancres historiques contrôlés également.
- `npm run test:browser` : **10 tests Chromium réussis**. Les sept pages ont été contrôlées à **320, 375, 768 et 1440 pixels**, sans débordement horizontal et sans violation détectée par axe sur les règles WCAG 2 A/AA et 2.1 AA sélectionnées. Menu au clavier, touche Échap, état courant, navigation sans JavaScript, lien d'évitement, aperçu du modèle en développement et réponse 404 du même modèle en production également testés.
- Captures d'accueil à 320 et 1440 pixels examinées visuellement ; nouvelle vérification ciblée de l'accueil après ajustement des coupures de mots.
- `git diff --check` et comparaison de l'état distant avant préparation de la révision.

Le premier build dans le bac à sable Windows avait échoué sur `spawn EPERM` ; le build relancé avec les permissions adaptées a réussi. Un premier audit navigateur avait échoué sur le contraste pendant le fondu, ce qui a conduit à la correction ci-dessus. Le lanceur du test de fixtures a également été adapté au nouveau chemin de CLI exposé par Astro 7. Ces échecs initiaux ne sont pas présentés comme des tests réussis.

## 5. Limites et travail restant

- Le catalogue reste vide : seul le fichier modèle a été fourni. Aucun nom, prix, ASIN, avis, score ou lien marchand réel n'a été inventé.
- Le compte Amazon Associates reste désactivé. Il faudra fournir les liens vérifiés et activer le compte après approbation avant de les publier.
- Guides, comparatifs éditoriaux, outils interactifs, pages confidentialité/conditions/contact/à propos/politique éditoriale et image Open Graph PNG/JPG restent à préparer. Aucun lien interne vers ces pages inexistantes n'est rendu.
- `ComparisonTable.astro` a été lu et contrôlé par Astro ; il n'existe pas encore de page éditoriale l'utilisant à auditer dans un navigateur.
- Les contrôles navigateur portent sur Chromium. Firefox, Safari, appareils physiques, lecteurs d'écran et Lighthouse n'ont pas été exécutés. Le contrôle DOM ne constitue pas une validation HTML complète par le validateur W3C, et axe ne certifie pas à lui seul la conformité WCAG.
- npm émet un avertissement de dépréciation transitif pour `whatwg-encoding` ; les tests passent et l'audit npm ne signale pas de vulnérabilité.
- Le Node installé globalement reste 20.5.0 : utiliser le runtime portable documenté dans le README ou installer la version indiquée par `.nvmrc` avant de lancer le projet dans un nouveau terminal.
- Les réglages Pages et la publication réelle ne sont pas modifiés ni testés par un déploiement. Après autorisation, sélectionner la source GitHub Actions, puis suivre le lancement manuel documenté.

## 6. GitHub

Dépôt : `https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io`. Branche de travail : `feat/astro-foundation`, suivie depuis `origin/feat/astro-foundation`. État distant récupéré avant les changements ; les deux branches étaient initialement au commit `ec56ccf37aa3bf85931b73cd46b80eeff3b534e8`.

Le connecteur GitHub connecté dispose des droits d'écriture. La CLI `gh` locale possède un jeton invalide ; elle n'est pas utilisée pour écrire sur GitHub. La révision et sa Pull Request sont préparées via le connecteur autorisé. Aucune écriture sur `main`, aucune fusion et aucun lancement du workflow de publication.

## 7. Revue et publication

La Pull Request cible `main` depuis `feat/astro-foundation`. Son URL et l'état observé de la CI sont indiqués dans le compte rendu remis avec cette révision. La CI valide sans publier. La fusion et le déploiement restent soumis à l'autorisation du propriétaire.

Références consultées : [migration Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/), [sitemap Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/), [GitHub Pages avec Astro](https://docs.astro.build/en/guides/deploy/github/), [release Astro 7.4.2](https://github.com/withastro/astro/releases/tag/astro%407.4.2). Les versions des actions GitHub ont également été vérifiées dans leurs dépôts officiels.
