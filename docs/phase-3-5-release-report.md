# ApocalypseGearLab — Phase 3.5 : catalogue et préparation de publication

**Correction de la PR nº 5 :** bunker restauré dans le build public après confirmation du propriétaire, limitée à cette image. Voir le [rapport de correction](pr-5-bunker-correction.md). Verdict : **MERGE pour le site protégé**, sans publication de produits ni activation Amazon.

Rapport du **25 octobre 2026**. Branche : `feat/phase3-5-safe-blackout-catalogue`, créée depuis le dernier main `8b0a722c70ed4ef15dd1f8e7ec0744d5d3412ef0`. La [PR #4](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/4) était déjà fusionnée. État initial propre ; aucune modification de main, fusion ou publication effectuée.

## 1. Admissibilité réelle

**Aucun des huit produits n'est actuellement admissible à une publication immédiate.** Les cinq produits hors blocages obligatoires sont préparés pour revue, sans assimiler des données fabricant à une vérification d'annonce canadienne, de certification ou à un essai physique. Les états existants listingVerified=false, safetyStatus=pending/blocked et publicationApproved=false restent inchangés. Leur suppression ou changement automatique aurait contourné les protections demandées.

| Produit | ASIN conservé | Résultat | Réserve à résoudre |
|---|---|---|---|
| ecoflow-river-2-pro | `B0BVLPGS79` | Candidat préparé, non admissible immédiatement | Cached Amazon result names the ASIN but contains conflicting fields and older variant reviews. It is not current listing or Canadian certification verification. |
| fenix-cl26r-pro | `B0CGKWX5YT` | Candidat préparé, non admissible immédiatement | Exact camouflage package, battery and current Canadian listing remain unverified. |
| jackery-explorer-1000-v2 | `B0D7PPG25F` | Candidat préparé, non admissible immédiatement | Exact Canadian unit, certification labels and ASIN listing identity remain unverified. No medical or whole-home backup claim. |
| jackery-solarsaga-100w-air | `B0FX8P4JST` | Candidat préparé, non admissible immédiatement | JS-100H revision, ASIN mapping and delivered regional cable need evidence. A connector adapter alone proves no electrical compatibility. |
| midland-er310 | `B015QIC1PW` | Candidat préparé, non admissible immédiatement | Current ASIN battery revision is unverified; the guide has 2600/3500 mAh references. No Canadian weather-alert reception, runtime or recharge-count promise. |
| kidde-c3010-co-alarm | `B00FHW7PBS` | Blocage obligatoire | Mandatory hold: actual Canadian certification mark, model and installation evidence missing. |
| iniu-p62-20000mah-65w | `B0DB888L9F` | Blocage obligatoire | Mandatory hold: exact-model Canadian safety evidence and cable configuration are incomplete. Different-model recall does not clear this model. |
| jackery-explorer-300 | `B082TMBYR6` | Blocage obligatoire | Mandatory hold: rejected artwork plus unresolved capacity/regional listing revision; neutral imagery does not remove this hold. |

Les trois dossiers Kidde, INIU et Explorer 300 n'ont aucune modification de contenu. Leurs blocages sont également inscrits dans la politique de livraison, par identifiant **et ASIN**, pour qu'un renommage ou une modification accidentelle de drapeaux ne les publie pas. Le visuel neutre de remplacement n'annule jamais le blocage Explorer 300.

### Audit documentaire

Les faits ci-dessous portent sur les modèles documentés, pas sur l'unité réellement vendue par un vendeur Amazon. Les fiches conservent toutes leurs caractéristiques et références antérieures ; aucune nouvelle mesure, capacité utile, autonomie, note, prix ou disponibilité n'est inventée.

- **ecoflow-river-2-pro** : Manufacturer identifies 768 Wh LFP capacity and 800 W rated output; boost marketing does not increase the normal AC budget. [Référence fabricant](https://ca.ecoflow.com/products/river-2-pro-portable-power-station). Manufacturer identity/core-fact comparison; not a complete safety or listing verification.
- **fenix-cl26r-pro** : Manufacturer identifies CL26R PRO, 650 lm combined maximum, ARB-L21-5000 V2.0 cell and IP66. [Référence fabricant](https://www.fenixlight.com/product/cl26r-pro/). Manufacturer identity/core-fact comparison; not a complete safety or listing verification.
- **jackery-explorer-1000-v2** : JE-1000D; 1070 Wh LiFePO4, 1500 W shared by three AC outlets, USB-C outputs 100/30 W. [Référence fabricant](https://faq.jackery.com/hc/en-us/articles/52303615153051-Explorer-1000-V2-Basic-Information). Manufacturer identity/core-fact comparison; not a complete safety or listing verification.
- **jackery-solarsaga-100w-air** : Canadian manufacturer page identifies 100 Air; it excludes Explorer 300, 300 v2, 300D and 240D recharging. [Référence fabricant](https://ca.jackery.com/products/jackery-solarsaga-100-air). Manufacturer identity/core-fact comparison; not a complete safety or listing verification.
- **midland-er310** : Manufacturer describes AM/FM, weather-band hardware, crank/solar/USB charging and battery options. Canadian Weatheradio is discontinued. [Référence fabricant](https://support.midlandusa.com/hc/en-us/articles/33020284947351-Midland-ER310-Emergency-Crank-Weather-Alert-Radio-Full-User-Guide). Manufacturer identity/core-fact comparison; not a complete safety or listing verification.
- **kidde-c3010-co-alarm** : US C3010 data sheet identifies part 21010045 and UL 2034; it does not establish Canadian C3010-CA equivalence. [Référence fabricant](https://brand.kidde.com/m/f4ea19b2ad5aed6/original/PDS_C3010.pdf). Current PDF unavailable; prior documented findings retained without claiming a fresh verification.
- **iniu-p62-20000mah-65w** : Manufacturer page identifies P62-E1 family and 20000 mAh/65 W marketing specifications; no independent delivered-capacity measurement. [Référence fabricant](https://iniushop.com/products/iniu-p62-e1-power-bank-smallest-20000mah-65w). Manufacturer identity/core-fact comparison; not a complete safety or listing verification.
- **jackery-explorer-300** : Legacy manufacturer information identifies NCM, two AC outlets, 300 W maximum and USB-C 60 W. [Référence fabricant](https://faq.jackery.com/hc/en-us/articles/52303678342683-Explorer-300-Basic-Information). Manufacturer identity/core-fact comparison; not a complete safety or listing verification.

Le [service Weatheradio canadien](https://www.canada.ca/en/environment-climate-change/services/weatheradio.html) n'est plus en service : aucune couverture canadienne n'est promise. Les exclusions du [SolarSaga 100 Air canadien](https://ca.jackery.com/products/jackery-solarsaga-100-air) priment sur une simple présence d'adaptateur.

Les huit liens directs Amazon.ca ont été essayés ; ils n'étaient pas lisibles par l'outil. Un résultat Amazon indexé ancien pour EcoFlow associait l'ASIN au RIVER 2 Pro, mais comportait des champs contradictoires et des avis de variantes. Il ne suffit pas à vérifier l'annonce actuelle. Le PDF Kidde n'était pas relisible lors de cette passe : les observations antérieures sont conservées sans prétendre à une nouvelle vérification. Les preuves manquantes ont été demandées au propriétaire ; aucune confirmation n'a été déduite de l'absence de réponse. [Audit détaillé des huit dossiers](qa/phase-3-5/product-audit.json), [résultat du contrôle d'admissibilité](qa/phase-3-5/release-readiness.json).

## 2. Modifications réalisées

- Cinq résumés et listes de vérifications d'achat rédigés pour les besoins réels : charges essentielles, éclairage, compatibilité, rechargement et information radio. Les réserves de recherche originales restent dans les données internes.
- Fiches et catalogue extraits en composants partagés `ProductProfile.astro` et `ProductCatalogue.astro`. Les routes existantes les utilisent également : aucun doublon de fiches ni nouveau produit ajouté.
- Routes de revue **exclusivement locales** : `/review/gear/`, `/review/blackout/` et les cinq fiches sous `/review/gear/{slug}/`. Leurs chemins sont absents du build de production, toujours noindex/nofollow dans le serveur de développement, et canoniques vers les futures routes normales. Elles portent un avertissement de prévisualisation et ne prétendent pas être des recommandations publiques. Le test confirme leurs 404 en production.
- Visuel neutre en HTML/CSS/SVG : grille sombre, accent ambre, proportions carrées et symbole générique d'inventaire, sans inventer l'apparence du produit. Les fiches affichent simplement Product image unavailable lorsque nécessaire.
- Retrait des détails de fabrication et d'approbation internes du rendu public. Les illustrations conservées en revue portent une légende courte indiquant qu'il s'agit d'une illustration conceptuelle, pas d'une photographie du produit. Aucun outil d'IA n'est promu. La provenance complète reste dans les données médias et rapports.
- Renforcement du schéma : retirer la recherche ne permet plus de valider un produit publié ; les caractéristiques publiées doivent citer une source fabricant présente dans le dossier.
- Filtre public, JSON-LD et liens marchands partagent l'éligibilité éditoriale. L'inscription Associates seule n'active plus les liens d'un brouillon ou d'un dossier bloqué.
- Contrôle `npm run release:check`, avec variante stricte `--require-ready`, et nouvelles vérifications de régression. CI actualisée pour la nouvelle branche.

Fichiers principaux : `src/lib/release-policy.ts`, `products.ts`, `product-schema.ts`, `product-seo.ts`, `affiliate.ts`, `media-policy.ts` ; composants ProductProfile, ProductCatalogue, ProductCard, ProductImage, UniverseHub, Footer ; BaseLayout et routes gear, review, accueil ; cinq JSON produits ; scripts release-check/verify-products/verify-site/verify-images ; tests unitaires et navigateur ; configuration Astro, package.json et CI ; ce rapport et les preuves de QA. Aucune dépendance nouvelle et aucun changement de lockfile nécessaire.

## 3. Illustrations et droits

Les droits commerciaux et les permissions des photographies de référence des **illustrations produits** restent **en attente de confirmation du propriétaire**. La génération d'une illustration n'établit pas les droits sur ces références. Le dépôt public n'est pas un stockage confidentiel.

Les **19 fichiers WebP sont inchangés octet pour octet**, dont les deux Explorer 300 déjà rejetés et conservés hors de public. Les 17 autres fichiers restent disponibles comme sources de revue, sans recompression. Le build retire seulement leurs copies générées non autorisées de dist ; aucun original ou fichier de travail n'est supprimé. Le test confirme **0 illustration non autorisée livrée**, y compris pour un accès direct à son ancien chemin.

Le propriétaire confirme que le bunker a été créé pour ApocalypseGearLab sans reproduction d'une photographie appartenant à un tiers, et demande sa restauration publique. Cette autorisation est enregistrée uniquement pour hero dans review.json ; le manifeste et le pipeline la conservent. Les variantes 768/1280/1672 sont livrées publiquement avec leurs dimensions, srcset et priorité d'origine. Les illustrations produits non autorisées restent exclues de dist.

## 4. Affiliation

`AMAZON_ASSOCIATE_ENROLLED=false`, huit ASIN et tag `apocalypsegear-20` inchangés. Les futures fiches publiques doivent cumuler les validations éditoriales, l'annonce vérifiée et l'inscription confirmée avant d'afficher un lien Amazon actif. Dans la présentation destinée au lecteur, aucun bouton trompeusement actif n'est affiché quand les liens ne sont pas disponibles. Les mentions générales d'affiliation restent présentes ; la déclaration Amazon conditionnelle est conservée sans prétendre à une inscription acquise. Aucun prix, avis ou stock ajouté.

## 5. SEO et rendu

Titles, H1 uniques, descriptions adaptées, canoniques et données de fil d'Ariane sont conservés. Les brouillons n'émettent aucun Product/Offer/Review ; un produit réellement validé conserve son JSON-LD d'identité sans prix ou avis inventés. Les essais avec trois fixtures synthétiques publiées vérifient la construction des fiches, le catalogue, les liens de secteur, le sitemap et les visuels neutres ; ces fixtures sont retirées dans finally et ne font jamais partie de la livraison réelle.

Livrable réel : **7 pages HTML, 5 URL de sitemap, 117 références internes vérifiées**, catalogue vide noindex et huit fiches réelles toujours exclues. Les paramètres d'URL ne peuvent pas contourner ces filtres. Aucun produit FALLOUT de phase 4 ajouté.

Chromium et axe : **320, 375, 768, 1024, 1440 et 1920 px**. Contrôles du débordement, des proportions, des textes alternatifs, des contrastes WCAG 2 A/AA et 2.1 AA, du clavier, du menu, du lien d'évitement et du mouvement réduit. Les vues réelles de l'accueil, du catalogue et d'une fiche ont été inspectées sur captures. Les styles tactiques, les cadres complets des illustrations de revue et la transparence utile sont préservés.

## 6. Performance mesurée

Lighthouse **13.5.0**, Chromium 156 headless, Windows, Node 22.23.4, serveur Astro de production sur loopback. Une mesure froide mobile et une ordinateur ; mesures de laboratoire, pas de données de terrain. La nouvelle mesure porte sur l'accueil avec bunker autorisé, pas sur un catalogue fictivement publié. [Réglages et résultats exacts](qa/phase-3-5/performance.json).

| Profil | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | Octets réseau |
|---|---|---|---|---|---|---|---|
| mobile | 100 | 100 | 100 | 100 | 1 514 ms | 0 | 115 184 octets |
| desktop | 100 | 100 | 100 | 100 | 569 ms | 0 | 380 968 octets |

Les caractéristiques WebP responsives du bunker sont testées dans le build public et celles des produits dans la revue locale ; la production ne télécharge pas d'illustration non autorisée. Aucune mesure de cache GitHub Pages ou de Core Web Vitals de visiteurs n'est inventée.

## 7. Tests réellement exécutés

| Vérification | Résultat |
|---|---|
| npm run check | 49 fichiers ; 0 erreur, 0 avertissement, 0 hint |
| npm test | 21/21 réussis |
| npm run test:images | 9 correspondances sources, 19 WebP décodés et empreintes/dimensions/permissions vérifiées |
| npm run test:products | 3 fixtures publiées validées puis retirées ; build réel restauré |
| npm run build | Réussite ; 7 pages réelles |
| npm run test:site | 117 références, sitemap, robots, srcsets, absence de médias non autorisés et filtrage des brouillons validés |
| npm run test:browser | 30/30 réussis, dont 7 tests de préparation de publication |
| npm run release:check | 0 admissible, 3 blocages obligatoires : diagnostic attendu |
| npm run release:check -- --require-ready | Refus attendu, code 1 ; preuve qu'aucune publication n'est autorisée par défaut |
| Comparaison avec origin/main | ASIN, liens, caractéristiques, preuves, états, approbations et 19 empreintes WebP identiques ; seuls cinq résumés et purchaseChecks sont préparés |
| Lighthouse local | Deux profils mesurés ci-dessus |

Les premiers essais ont détecté un problème de vue par paramètre sur les pages statiques et un nom de dossier exclu par le routeur Astro. Ces problèmes sont corrigés par une unique route dynamique locale de revue et des composants partagés. Les tests ont été relancés après correction. Aucun résultat intermédiaire en échec n'est présenté comme réussi. Safari/Firefox et appareils physiques non testés.

## 8. Captures et revue locale

| Page | Mobile 375 px | Ordinateur 1440 px |
|---|---|---|
| Accueil public avec bunker | [Capture](qa/phase-3-5/home-public-375.webp) | [Capture](qa/phase-3-5/home-public-1440.webp) |
| Catalogue des cinq candidats, local uniquement | [Capture](qa/phase-3-5/catalogue-preview-375.webp) | [Capture](qa/phase-3-5/catalogue-preview-1440.webp) |
| Fiche Explorer 1000 v2, local uniquement | [Capture](qa/phase-3-5/profile-preview-375.webp) | [Capture](qa/phase-3-5/profile-preview-1440.webp) |

Pour consulter les vues : lancer `npm run dev`, puis ouvrir `http://localhost:4321/review/gear/` ou `http://localhost:4321/review/blackout/`. Les routes normales de brouillon restent disponibles dans ce serveur local. Le build public ne contient aucun répertoire review.

La nouvelle PR vers main et ses résultats GitHub Actions sont fournis dans le message de livraison. Aucun merge ni déploiement déclenché ; workflow manuel conservé.

## 9. Verdict — CORRECT avant publication des produits

La préparation concrète des cinq candidats, des rendus neutres et des contrôles est livrée pour revue. **CORRECT** reste le verdict de publication : la vérification actuelle des annonces/modèles canadiens et les validations de sécurité/éditoriales requises ne sont pas acquises. Kidde/INIU/Explorer 300 restent expressément bloqués. L'inscription Associates et les droits des illustrations produits n'ont pas été confirmés. Le bunker bénéficie désormais de sa propre confirmation de provenance et de restauration publique. Ces points demandent des preuves réelles, pas une bascule de drapeaux. La PR ne prétend donc pas contenir cinq produits déjà publiables et ne contourne aucune protection pour remplir le catalogue.
