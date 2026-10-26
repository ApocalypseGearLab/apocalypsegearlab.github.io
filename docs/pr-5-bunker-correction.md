# PR nº 5 — restauration du bunker public

Correction du 25 octobre 2026 sur `feat/phase3-5-safe-blackout-catalogue`, après le commit `cb5e5726ceeae5bc37a1d813ae2f545b270dc8c4`. [PR existante nº 5](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/5) ; aucune autre PR, fusion ou mise en production.

## Correction et provenance

Le contrôle ajouté en Phase 3.5 utilisait l'attente générale des droits produits pour retirer aussi le bunker de `dist`. L'accueil public affichait alors une grille neutre. Le propriétaire confirme explicitement que **l'illustration du bunker a été créée pour ApocalypseGearLab sans reproduction d'une photographie appartenant à un tiers**, et demande sa restauration publique.

Cette déclaration est enregistrée dans `src/data/media/review.json`, sous `assets.hero`, avec sa date, son origine et sa portée. Il s'agit d'une confirmation du propriétaire, pas d'une expertise juridique indépendante. L'autorisation porte uniquement sur cette illustration et ses trois variantes existantes. Le statut général des illustrations produits reste `pending-owner-confirmation`.

La politique de rendu et le contrôle de livraison Astro prennent maintenant cette décision séparément pour le bunker. Le manifeste enregistre sa confirmation, et le générateur préserve ce statut lors d'une future optimisation. Aucun élément de l'accueil ni style cinématique n'a eu besoin d'être recréé : les dimensions intrinsèques, le `srcset`, `sizes="100vw"`, la priorité élevée, le chargement immédiat, le ratio et `object-fit: contain` sont conservés. La légende indique toujours une illustration de bunker fictif, sans la présenter comme une photographie de lieu réel.

## WebP, rendu et performance

Les **19 WebP d'origine sont identiques octet pour octet** à main. Aucune image de livraison n'a été régénérée ou recompressée. Le build public livre seulement les trois variantes autorisées du bunker ; les 14 variantes produits précédemment disponibles sous `public/images` restent exclues de `dist`. Les deux variantes Explorer 300 restent archivées hors de public.

| Variante bunker | Dimensions | Octets |
|---|---|---|
| mobile | 768 × 432 | 108 300 |
| intermédiaire | 1280 × 720 | 255 560 |
| grande | 1672 × 941 | 374 084 |

Le navigateur choisit 768, 1280 ou 1672 selon la largeur. Le cadrage complet est conservé ; le titre et le CTA sont lisibles dans le panneau sombre sur ordinateur, puis sous l'image sur mobile. Captures réelles inspectées : [mobile 375 px](qa/phase-3-5/home-public-375.webp), [ordinateur 1440 px](qa/phase-3-5/home-public-1440.webp). La capture attend le décodage du WebP et utilise une visite neuve par largeur afin d'éviter des artefacts de peinture liés à une navigation précédente.

Lighthouse 13.5.0, Chromium 156 headless, Node 22.23.4, Windows, serveur Astro de production local : une mesure froide par profil, sans avertissement. [Réglages et mesures](qa/phase-3-5/performance.json).

| Profil | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | Octets réseau |
|---|---|---|---|---|---|---|---|
| mobile | 100 | 100 | 100 | 100 | 1 514 ms | 0 | 115 184 |
| ordinateur | 100 | 100 | 100 | 100 | 569 ms | 0 | 380 968 |

Ces mesures remplacent celles de l'accueil neutre ; elles ne constituent pas des Core Web Vitals de visiteurs ni une mesure du cache GitHub Pages.

## Protections préservées

- Huit produits toujours en brouillon, aucun produit réel admissible actuellement, trois blocages obligatoires inchangés : Kidde C3010, INIU P62, Explorer 300.
- ASIN, preuves fabricant, caractéristiques, états de sécurité et approbations éditoriales inchangés.
- Autorisation du bunker sans propagation aux illustrations produits, y compris Fenix et Explorer 1000 v2.
- `AMAZON_ASSOCIATE_ENROLLED=false`, tag `apocalypsegear-20` conservé ; aucun lien Amazon activé.
- Routes locales de revue exclues du build, catalogue public vide/noindex, aucun ajout FALLOUT de Phase 4.
- Workflow de déploiement manuel inchangé ; aucune action de déploiement exécutée.

Le propriétaire confirme également n'avoir aucune preuve supplémentaire pour lever les réserves sur les produits et une inscription Associates non confirmée/en attente. Ces réponses n'autorisent aucune activation commerciale.

## Validation exécutée

| Commande / contrôle | Résultat |
|---|---|
| `npm run check` | 49 fichiers, 0 erreur, avertissement ou hint |
| `npm test` | 21/21 ; confirmation du bunker et absence d'autorisation produits vérifiées |
| `npm run test:images` | 9 sources, 19 WebP décodés ; dimensions, empreintes, métadonnées et droits vérifiés |
| `npm run test:products` | 3 fixtures synthétiques validées puis retirées ; build réel restauré |
| `npm run build` | Réussite, 7 pages HTML réelles |
| `npm run test:site` | 117 références internes, 5 URL sitemap, robots, canoniques, JSON-LD, srcsets, livraison autorisée et filtrage des brouillons validés |
| `npm run test:browser` | 30/30 ; test ciblé de l'accueil relancé après correction des captures |
| Responsive / accessibilité | Chromium à 320/375/768/1024/1440/1920 px, axe WCAG 2 A/AA et 2.1 AA sans violation détectée ; clavier, menu, lien d'évitement, sans JavaScript, mouvement réduit, absence de débordement |
| Médias publics | Trois URL bunker répondent 200 ; URL des illustrations produits non autorisées répondent 404 |
| Contrôles de conservation | Huit dossiers protégés comparés à main ; 19 empreintes WebP inchangées |
| Contrôle strict de publication | 0 admissible et 3 blocages ; `--require-ready` refuse comme attendu avec code 1 |

Le premier lancement isolé des tests unitaires a été empêché par `spawn EPERM` dans le bac à sable Windows ; ils ont ensuite été exécutés avec succès avec les permissions de processus nécessaires. Le serveur local de mesure a été arrêté. Safari, Firefox, appareils physiques et audit WCAG manuel exhaustif non effectués.

## Fichiers modifiés par cette correction

- `src/data/media/review.json`, `manifest.json`, `src/lib/media-policy.ts` : confirmation du bunker et politique indépendante.
- `astro.config.mjs`, `scripts/optimize-images.mjs` : livraison et conservation de l'autorisation spécifique.
- `scripts/verify-images.mjs`, `verify-site.mjs`, `tests/media-policy.test.ts`, `tests/browser/media.spec.ts`, `release.spec.ts` : contrôles adaptés au bunker public et aux produits toujours bloqués.
- Ce rapport, `docs/phase-3-5-release-report.md`, `docs/qa/phase-3-5/performance.json` et les deux captures d'accueil : documentation et preuves actualisées.

## Verdict : MERGE

**MERGE pour la PR nº 5 comme préparation protégée et restauration du bunker autorisé.** Aucun défaut bloquant identifié sur cette correction. Ce verdict ne rend aucun produit admissible et n'autorise aucune activation Amazon. La publication commerciale du catalogue nécessite encore les preuves de modèle/annonce, sécurité, approbation éditoriale et droits produits décrites dans le rapport Phase 3.5. La PR reste à la revue du propriétaire, sans fusion ni déploiement automatique.
