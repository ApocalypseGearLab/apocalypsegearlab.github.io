# Phase 4.1 — images et activation Amazon.ca par produit

Contrôle du 26 octobre 2026, America/Toronto. Ce rapport décrit cette branche et son build de production local, pas une publication déjà effectuée. Il actualise les conclusions des rapports précédents sur les trois nouveaux visuels et sur l’affiliation.

## Résultat et périmètre

**TERMINÉ :** 14 fiches publiques informatives, 9 BLACKOUT et 5 FALLOUT ; 13 illustrations permises et un emplacement neutre Explorer 300. Les variantes du bunker, la navigation et les 11 autres illustrations sont préservées octet pour octet. Aucun produit, ASIN, URL enregistrée, statut draft ou avertissement de sécurité n’a été remplacé. Les huit anciens JSON perdent uniquement la ligne « Owner approval to publish is pending. », devenue obsolète puisque le propriétaire a autorisé le travail. Les vérifications techniques restantes et les flags de revue restent inchangés.

**CONFIRMÉ :** PR nº 8 fusionnée le 26 octobre UTC ; base main `13d7260cfd7db0ae8b3bcf5b0ddb2433286664a3`. Branche `feat/phase4-1-commercial-corrections`, créée depuis cette base après récupération distante ; aucun changement local antérieur écrasé. Aucune PR ouverte concurrente au départ. Aucune fusion ni publication déclenchée.

**NON CONFIRMÉ :** identité des 14 annonces Amazon.ca, statut privé actuel et approbation finale du compte. **BLOQUÉ :** 14 boutons réels, pour absence de preuve exploitable des annonces et revue produit incomplète. Les trois cas sensibles conservent leurs maintiens spécifiques. Ce résultat ne doit pas être présenté comme 14 liens commercialement validés.

## Images : décisions réellement appliquées

Le propriétaire a confirmé que les trois nouveaux PNG ont été créés pour ApocalypseGearLab, sans reproduction non autorisée de photographies tierces, et sont autorisés commercialement. Cette confirmation est enregistrée individuellement dans le manifeste ; elle est distincte de celle du ZIP et du bunker. Une sortie de génération ne confère pas automatiquement de droits sur des références tierces. L’autorisation du propriétaire porte sur ces fichiers ; elle ne vaut ni certification de produit ni approbation d’Amazon.

| Fichier de sortie | Source PNG (octets) | WebP (octets) | Réduction | Décision |
|---|---:|---:|---:|---|
| jackery-explorer-300-portable-power-station-blackout.webp | 2 194 352 | 168 652 | 92,3 % | BLOQUÉ pour l’affichage ; emplacement neutre conservé |
| leatherman-wave-plus-multitool-fallout.webp | 2 166 870 | 176 614 | 91,8 % | TERMINÉ : intégré au catalogue, FALLOUT et à la fiche |
| reliance-aqua-tainer-9410-03r-water-container-fallout.webp | 2 173 121 | 204 054 | 90,6 % | TERMINÉ : intégré au catalogue, FALLOUT et à la fiche |

Conversion Sharp, WebP qualité 83, effort 6, 1254 × 1254, sans redimensionnement, recadrage, modification de couleur ou régénération. Total : 6 534 343 → 549 320 octets (−91,6 %). Le fichier Explorer 300 reste en source contrôlée et n’est ni servi ni téléchargé publiquement. Seuls les deux nouveaux visuels admis ajoutent 380 668 octets de médias publiables ; cela ne signifie pas qu’un visiteur les télécharge tous au premier affichage (cartes lazy).

- **Explorer 300 rejeté après inspection du PNG et du WebP.** L’image affiche USB-C 100 W et USB-A 15 W, tandis que [la fiche officielle Jackery](https://faq.jackery.com/hc/en-us/articles/52303678342683-Explorer-300-Basic-Information) documente respectivement 60 W et 12 W pour le modèle décrit. La disposition écran/boutons n’est pas établie pour l’annonce canadienne. Aucun marquage n’a été artificiellement corrigé. La capacité et la tension régionales restent à apparier à l’ASIN.
- **Wave+ admis comme illustration conceptuelle.** La vue complète des outils déployés sur [la page officielle Leatherman](https://www.leatherman.com/products/wave) fournit une meilleure référence que les vues partielles utilisées dans l’audit précédent. L’objection générale sur la disposition des outils est retirée ; la pince, les coupe-fils remplaçables, les lames et les outils secondaires concordent dans leur organisation générale. La couleur argentée du PNG est conservée. Cela ne certifie pas la métrologie, chaque détail gravé, les accessoires ou l’annonce Amazon.
- **Aqua-Tainer admis comme illustration conceptuelle.** Le nouveau dessin ne porte plus l’ancien marquage de masse problématique. [Reliance identifie 9410-03R comme la version 7G/26L](https://relianceoutdoors.com/products/aqua-tainer-4g-15l). 7 US gal ≈ 26,5 L : l’écart d’arrondi ne constitue pas une nouvelle incompatibilité. L’objection antérieure à « 5 year warranty » était excessive : [la garantie officielle](https://relianceoutdoors.com/pages/warranty-coverage) couvre cinq ans les défauts des contenants, sous conditions. Elle ne permet pas de promettre une garantie inconditionnelle ou de certifier la petite typographie du dessin.

Les mentions publiques précisent qu’il s’agit d’illustrations conceptuelles et que les marquages dessinés ne constituent pas des preuves techniques. ALT spécifiques, dimensions intrinsèques, `srcset`, `sizes`, image complète en `object-fit: contain`. Les trois versions remplacées sont conservées dans `assets/rejected/phase4-superseded/` avec leurs anciens SHA-256. L’ancien nom Aqua-Tainer reste archivé en source sans route publique. Aucun fichier existant supprimé. [Preuve des 11 images et des 3 variantes du bunker inchangées](qa/phase4-1/media-preservation.json).

## Amazon Canada : distinction des statuts

La documentation actuelle prévoit l’utilisation de liens spéciaux pendant la période initiale : l’examen de la candidature intervient après les ventes admissibles. Il n’est donc pas justifié d’attendre systématiquement l’approbation finale avant tout lien. L’exigence annoncée est au moins trois ventes admissibles dans les 180 premiers jours ; les commandes personnelles ne qualifient pas. Une ancienne candidature expirée ou rejetée impose de vérifier la candidature et le marqueur actuels. Sources : [Application Review Process](https://associates.amazon.ca/help/node/topic/G8TW5AE9XL2VX9VM), [Account Dormancy](https://associates.amazon.ca/help/node/topic/G7MJTPEP9NC3YKMG).

Le propriétaire confirme l’accès au compte canadien, le site déclaré, le W-8BEN validé et le tag `apocalypsegear-20`. Il rapporte un succès du Vérificateur de liens pour **une seule URL**, celle de B0D7PPG25F. C’est une reconnaissance du tag, pas une validation de modèle, de sécurité ou d’approbation finale. La réponse de support consultée ne tranche pas le statut actuel du compte. Aucun courrier privé ni renseignement personnel n’est joint au dépôt.

La configuration opérationnelle `AMAZON_CA_LINKING_ENABLED = true` applique la demande de préparer la participation initiale, sans prétendre avoir vérifié indépendamment le statut privé. `AMAZON_CA_FINAL_APPROVAL_CONFIRMED = false` reste explicite. Aucun élément obtenu ne confirme une autorisation définitive. Avant une activation commerciale effective, le propriétaire doit vérifier les dates de sa candidature actuelle et l’absence de clôture/rejet/suspension affectant ce marqueur. Une suspension connue exige de désactiver immédiatement la participation ; elle ne peut être contournée. [Operating Agreement, sections 1, 5 et 6](https://associates.amazon.ca/help/operating/agreement).

La déclaration obligatoire est maintenant présente en pied de page, sur la page d’affiliation et près des boutons : « As an Amazon Associate I earn from qualifying purchases. » Aucune promesse de commission, prix, note, stock ou promotion n’est ajoutée.

### Activation technique livrée

Le libellé des cartes distingue également une fiche informative vérifiée d’une vérification encore en attente. Le lien canadien ne dépend plus du statut SEO `published`. Une fiche informative en draft peut afficher son bouton après les vérifications nécessaires, tout en restant `noindex` sans Product/Review/Offer. L’image n’est pas un prérequis au bouton. La politique exige une annonce documentée, ASIN et modèle exacts, date, méthode de contrôle et notes de correspondance, une revue de sécurité terminée et aucun maintien applicable. `publicationApproved` enregistre la revue éditoriale terminée ; ce champ ne représente pas une nouvelle demande générale d’autorisation au propriétaire.

L’URL doit être HTTPS, sans identifiants, pointer sur `/dp/ASIN` au Canada avec un seul paramètre `tag=apocalypsegear-20`, sans fragment ni autre suivi. Les liens courts ne peuvent contourner ce contrôle canadien. Le droit de participation Canada n’active pas Amazon.com. Les maintiens Kidde/INIU/Explorer 300 restent attachés également aux ASIN pour résister à un simple renommage.

Les 14 lectures HTTP ordinaires, sans tag, ont reçu une réponse générique HTTP 200 sans titre de produit ni identité de modèle exploitable. Elles ne prouvent ni l’existence, ni l’exactitude, ni la disponibilité des annonces. Les essais de lecture web n’ont pas donné de preuve supplémentaire. Aucun contournement des contrôles Amazon n’a été tenté. L’outil de contrôle de la session Chrome a également interrompu l’accès, faute de pouvoir vérifier son URL ; aucune autre automation de cette session privée n’a été utilisée. Cette limite ne concerne pas les tests Chromium locaux du site.

## Tableau commercial des 14 produits

**Règle commune :** toutes les URL ci-dessous sont enregistrées avec le tag demandé ; aucune correspondance d’annonce n’est déclarée vérifiée. Tous les produits restent visibles comme fiches informatives. Les photos de fabricant consultées servent uniquement à la comparaison et ne sont pas republiées.

| Produit | ASIN | Collection | Illustration | URL enregistrée | Correspondance Amazon | Bouton | Motif précis | Action pour débloquer |
|---|---|---|---|---|---|---|---|---|
| Jackery Explorer 1000 v2 | `B0D7PPG25F` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B0D7PPG25F?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Apparier JE-1000D / 1000 v2, variante Canada, tension, étiquettes et charges prévues. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| EcoFlow RIVER 2 Pro | `B0BVLPGS79` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B0BVLPGS79?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Apparier RIVER 2 Pro, référence Canada, tension et documents de certification. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Jackery Explorer 300 | `B082TMBYR6` | BLACKOUT | Neutre ; nouvelle image rejetée | `https://www.amazon.ca/dp/B082TMBYR6?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée ; maintien explicite de sécurité/identité. | Résoudre la capacité et la variante 110/120 V ; remplacer le visuel 100 W par un visuel fidèle. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Midland ER310 emergency radio | `B015QIC1PW` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer ER310 et révision de batterie ; ne pas promettre la disponibilité Weatheradio au Canada. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Fenix CL26R Pro rechargeable lantern | `B0CGKWX5YT` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Apparier CL26R Pro, finition camouflage et batterie incluse aux instructions. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Jackery SolarSaga 100 W Air | `B0FX8P4JST` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B0FX8P4JST?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer JS-100H / 100 Air, câbles inclus et compatibilité de la station. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Kidde C3010 carbon monoxide alarm | `B00FHW7PBS` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B00FHW7PBS?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée ; maintien explicite de sécurité/identité. | Obtenir la preuve du modèle canadien, marquage de certification et instructions ; C3010 US ≠ C3010-CA. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| INIU P62 20000 mAh 65 W power bank | `B0DB888L9F` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B0DB888L9F?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée ; maintien explicite de sécurité/identité. | Résoudre la révision exacte P62 / P62-E1, configuration du câble et sécurité canadienne. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Fenix HM50R V2.0 rechargeable headlamp | `B0H6R34CBL` | BLACKOUT | WebP existant conservé | `https://www.amazon.ca/dp/B0H6R34CBL?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer HM50R V2.0, batterie fournie et instructions de charge. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Sawyer Squeeze SP129 water filtration system | `B00B1OSU4W` | FALLOUT | WebP existant conservé | `https://www.amazon.ca/dp/B00B1OSU4W?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer SP129 et accessoires ; documenter les limites de filtration et le gel. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Reliance Aqua-Tainer 7-gallon water container | `B001QC31G6` | FALLOUT | Nouveau WebP intégré | `https://www.amazon.ca/dp/B001QC31G6?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer 9410-03R, 7 US gal, et non 9405-03R / 4 gal ; vérifier entretien et rangement. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| NANUK 904 first aid kit | `B0G3XYHL33` | FALLOUT | WebP existant conservé | `https://www.amazon.ca/dp/B0G3XYHL33?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer la variante de trousse remplie au Canada, contenu et péremptions ; ne pas assimiler une caisse vide à une trousse. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| Leatherman Wave+ multi-tool | `B079MJBP21` | FALLOUT | Nouveau WebP intégré | `https://www.amazon.ca/dp/B079MJBP21?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer Wave Plus, finition et accessoires ; vérifier transport et limites électriques. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |
| SOL Emergency Bivvy with rescue whistle | `B08NC9BLQ5` | FALLOUT | WebP existant conservé | `https://www.amazon.ca/dp/B08NC9BLQ5?tag=apocalypsegear-20` | NON CONFIRMÉ | Inactif — BLOQUÉ | Annonce exacte non vérifiée ; revue de sécurité/compatibilité non terminée. | Confirmer taille et contenu avec sifflet ; documenter les limites thermiques de l’abri. Puis consigner la preuve d’annonce et terminer la revue éditoriale. |

Pour chaque ligne : obtenir une lecture récente de l’annonce canadienne ou un document/capture fourni par le propriétaire qui expose l’ASIN, le modèle/révision et le contenu ; consigner ces éléments dans `research.listingEvidence`. Terminer les contrôles de sécurité et de compatibilité cités dans le JSON, puis la revue éditoriale ; ne pas modifier les flags pour simuler une vérification. Les trois maintiens sensibles exigent une levée explicite et documentée après résolution. Aucune nouvelle demande des 14 URL n’est nécessaire. [Audit détaillé et sources de chaque produit](qa/phase4-1/product-audit.json), [synthèse Amazon](qa/phase4-1/amazon-ca-review.json).

## Validation et limites

Les résultats finaux et les captures sont consignés ci-dessous après contrôle. Les données de test synthétiques ne sont jamais ajoutées au catalogue réel : création exclusive, nettoyage et restauration du build dans un `finally`.

| Commande | Résultat réel |
|---|---|
| npm run check | 56 fichiers ; 0 erreur, avertissement ou hint |
| npm test | 30/30 réussis |
| npm run test:products | Réussi : 3 fixtures publiées, liens actif/inactif sur draft informatif, holds réels et restauration finale |
| npm run test:images | 14 associations ; 13 permises / 1 rejetée ; SHA, décodage et 11 images + 3 variantes du bunker conservées |
| npm run build | Réussi ; 21 pages HTML, dont les 14 fiches |
| npm run test:site | Réussi ; 526 références internes, 5 URL de sitemap, robots, canoniques, métadonnées, JSON-LD et exclusions vérifiés |
| npm run test:browser | 38/38 réussis ; puis 16/16 tests ciblés repassés après le correctif des libellés ; Chromium production + développement ; 320, 375, 768, 1024, 1440, 1920 px |
| npm run release:check | Réussi comme diagnostic ; 14 fiches informatives, 0 produit admissible à un lien réel, 3 maintiens spécifiques |

Le test navigateur d’affiliation utilise le vrai composant Astro précompilé avec un ASIN synthétique : état désactivé hors tabulation, href exact, tag unique, target _blank, rel sponsored/nofollow/noopener, disclosure, focus, activation clavier, nouvel onglet et window.opener nul. Toute navigation Amazon de ce test est satisfaite localement par une réponse simulée ; aucune requête ni faux clic affilié n’est envoyé à Amazon. Le build réel est restauré après les fixtures et demeure à 0 bouton actif. [Résultats structurés](qa/phase4-1/test-results.json).

Les contrôles axe automatisés couvrent les tags WCAG A/AA et 2.1 AA, sans constituer une certification exhaustive WCAG ou un audit de lecteur d’écran. Tests locaux Chromium seulement : aucun résultat Safari, Firefox ou matériel mobile réel n’est revendiqué. Les mesures de mise en page et la sélection responsive sont contrôlées ; aucun score Lighthouse, débit réseau réel ou Core Web Vitals terrain n’est inventé. Le bunker conserve ses trois sources 768/1280/1672, son chargement eager/high priority et une boîte réservée ; son déplacement de mise en page est inférieur à 0,01 dans le scénario testé.

### Captures inspectées

Captures du build local : [catalogue ordinateur](qa/phase4-1/catalogue-1440.webp), [catalogue téléphone](qa/phase4-1/catalogue-375.webp), [BLACKOUT ordinateur](qa/phase4-1/blackout-1440.webp), [BLACKOUT téléphone](qa/phase4-1/blackout-375.webp), [FALLOUT ordinateur](qa/phase4-1/fallout-1440.webp), [FALLOUT téléphone](qa/phase4-1/fallout-375.webp). Les 14 fiches ont été capturées aux deux largeurs et leur association visuelle inspectée ; le catalogue complet et les nouvelles fiches ont été relus visuellement.

Détails conservés : [Wave+ ordinateur](qa/phase4-1/leatherman-wave-plus-multitool-1440.webp), [Wave+ téléphone](qa/phase4-1/leatherman-wave-plus-multitool-375.webp), [Aqua-Tainer ordinateur](qa/phase4-1/reliance-aqua-tainer-7-gallon-1440.webp), [Aqua-Tainer téléphone](qa/phase4-1/reliance-aqua-tainer-7-gallon-375.webp), [Explorer 300 ordinateur](qa/phase4-1/jackery-explorer-300-1440.webp), [Explorer 300 téléphone](qa/phase4-1/jackery-explorer-300-375.webp), [bunker ordinateur](qa/phase4-1/home-1440.webp), [bunker téléphone](qa/phase4-1/home-375.webp). Les captures QA sont exportées en WebP ; cela ne recomprime pas les illustrations du site.

## Fichiers modifiés

- `.github/workflows/ci.yml`
- `assets/media/blackout/jackery-explorer-300-portable-power-station-blackout.webp`
- `assets/media/fallout/leatherman-wave-plus-multitool-fallout.webp`
- `assets/media/fallout/reliance-aqua-tainer-9410-03r-water-container-fallout.webp`
- `assets/media/phase4-1-image-manifest.csv`
- `assets/rejected/phase4-superseded/jackery-explorer-300-portable-power-station-blackout.webp`
- `assets/rejected/phase4-superseded/leatherman-wave-plus-multitool-fallout.webp`
- `assets/rejected/phase4-superseded/reliance-aqua-tainer-7-gallon-water-container-fallout.webp`
- `docs/phase4-1-commercial-release.md`
- `docs/qa/phase4-1/amazon-ca-review.json`
- `docs/qa/phase4-1/blackout-1440.webp`
- `docs/qa/phase4-1/blackout-375.webp`
- `docs/qa/phase4-1/catalogue-1440.webp`
- `docs/qa/phase4-1/catalogue-375.webp`
- `docs/qa/phase4-1/fallout-1440.webp`
- `docs/qa/phase4-1/fallout-375.webp`
- `docs/qa/phase4-1/home-1440.webp`
- `docs/qa/phase4-1/home-375.webp`
- `docs/qa/phase4-1/jackery-explorer-300-1440.webp`
- `docs/qa/phase4-1/jackery-explorer-300-375.webp`
- `docs/qa/phase4-1/leatherman-wave-plus-multitool-1440.webp`
- `docs/qa/phase4-1/leatherman-wave-plus-multitool-375.webp`
- `docs/qa/phase4-1/media-preservation.json`
- `docs/qa/phase4-1/product-audit.json`
- `docs/qa/phase4-1/release-readiness.json`
- `docs/qa/phase4-1/reliance-aqua-tainer-7-gallon-1440.webp`
- `docs/qa/phase4-1/reliance-aqua-tainer-7-gallon-375.webp`
- `docs/qa/phase4-1/test-results.json`
- `scripts/release-check.ts`
- `scripts/verify-images.mjs`
- `scripts/verify-products.mjs`
- `scripts/verify-site.mjs`
- `src/components/AffiliateButton.astro`
- `src/components/DisclosureNotice.astro`
- `src/components/Footer.astro`
- `src/components/ProductCatalogue.astro`
- `src/components/ProductCard.astro`
- `src/components/ProductProfile.astro`
- `src/components/UniverseHub.astro`
- `src/config/site.ts`
- `src/data/media/imported-manifest.json`
- `src/data/products/ecoflow-river-2-pro.json`
- `src/data/products/fenix-cl26r-pro.json`
- `src/data/products/iniu-p62-20000mah-65w.json`
- `src/data/products/jackery-explorer-1000-v2.json`
- `src/data/products/jackery-explorer-300.json`
- `src/data/products/jackery-solarsaga-100w-air.json`
- `src/data/products/kidde-c3010-co-alarm.json`
- `src/data/products/midland-er310.json`
- `src/lib/affiliate.ts`
- `src/lib/product-schema.ts`
- `src/lib/release-policy.ts`
- `src/pages/affiliate-disclosure.astro`
- `tests/affiliate.test.ts`
- `tests/browser/affiliate.spec.ts`
- `tests/browser/blackout.spec.ts`
- `tests/browser/media.spec.ts`
- `tests/media-policy.test.ts`
- `tests/release.test.ts`

## Livraison et décision

La CI valide les push de la branche corrective et les PR vers main. Le workflow de publication reste manuel, limité à main avec `confirm_publish=true` ; il n’a pas été modifié ni exécuté. Consulter l’onglet Checks de la PR pour le résultat GitHub Actions du commit livré.

**Verdict : MERGE pour cette correction avec ses protections**, sous réserve de CI verte. Cela autorise la revue/fusion de l’intégration sûre, pas une déclaration d’admissibilité commerciale des 14 annonces. **Le volet commercial reste BLOQUÉ sur les preuves décrites ci-dessus.** Le catalogue informatif est prêt ; rien ne justifie de le cacher en attendant Amazon ou une image Explorer 300 correcte.

Après revue par le propriétaire : fusionner cette seule PR vers main lorsque les Checks sont verts ; pour publier ensuite, ouvrir Actions → Deploy to GitHub Pages (manual approval) → Run workflow, choisir main et confirmer `confirm_publish=true`. Vérifier ensuite le résultat Pages et les routes publiques. Ces opérations de fusion et de publication n’ont pas été effectuées.
