# Phase 4.3 — cinq nouvelles fiches FALLOUT et OUTBREAK

Rapport du 29 octobre 2026 ; recherches et intégration commencées le 28 octobre. **Verdict technique : MERGE pour cette livraison avec les blocages documentés**, après revue et CI verte. Ce verdict ne constitue ni une recommandation d'achat des 26 produits ni une approbation finale Amazon. Aucune fusion ou publication effectuée.

## Base et inventaire réel

La [PR nº 10](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/10) est réellement fusionnée depuis le 28 octobre 2026, 04:09:45 UTC. Base vérifiée : `8955a3f848a9203052d2130f44dee1aa15a42827`. Branche dédiée : `feat/phase4-3-new-fallout-outbreak-products`. Les 21 anciennes fiches sont conservées ; seules deux listes de produits associés existantes ont reçu un lien complémentaire. Aucun ancien ASIN, statut commercial ou média n'a changé.

| Collection | Avant | Après |
|---|---:|---:|
| BLACKOUT | 9 | 9 |
| FALLOUT | 5 | 9 |
| OUTBREAK | 7 | 8 |
| **Total** | **21** | **26** |

Les 26 fiches sont des références informatives `draft`, `not-tested`, `listingVerified=false`, `lastVerified=null`. Aucun essai physique, calibration professionnelle, authentification de vendeur, prix, stock, avis ou note n'est inventé.

## Cinq produits intégrés

Toutes les nouvelles fiches existent dans le build, le catalogue et leur collection ; les cartes, fiches et équipements associés réutilisent les composants existants. Les URL ci-dessous seront publiques après fusion et déploiement ; elles ne sont pas annoncées comme déjà déployées.

| Produit | Collection | ASIN et URL affiliée enregistrée | Fiche | CTA | Réserve |
|---|---|---|---|---|---|
| FNIRSI GC-01 Geiger Counter | FALLOUT | [B0BHH9X1WG](https://www.amazon.ca/dp/B0BHH9X1WG?tag=apocalypsegear-20) | [`fnirsi-gc-01-geiger-counter`](https://apocalypsegearlab.github.io/gear/fnirsi-gc-01-geiger-counter/) | Bloqué | The exact B0BHH9X1WG Canadian listing/model match is not established, and the manufacturer page conflicts on the maximum dose-rate range (1,000 versus 10,000 µSv/h). Resolve both before enabling the CTA. |
| ReadyWise 84 Servings Gluten-Free Emergency Food Supply | FALLOUT | [B00TX5J74S](https://www.amazon.ca/dp/B00TX5J74S?tag=apocalypsegear-20) | [`readywise-84-servings-emergency-food-bucket`](https://apocalypsegearlab.github.io/gear/readywise-84-servings-emergency-food-bucket/) | Bloqué | Exact Canadian gluten-free assortment is unverified. Manufacturer content conflicts on dessert identity and total energy: 15,420 kcal advertised versus 15,180 from the linked labels and listed portions. Reconcile the delivered variant and allergen labels before enabling the CTA. |
| Datrex DX2400F Emergency Food Ration — 2400 Calories | FALLOUT | [B08T57RVBY](https://www.amazon.ca/dp/B08T57RVBY?tag=apocalypsegear-20) | [`datrex-dx2400f-emergency-food-ration`](https://apocalypsegearlab.github.io/gear/datrex-dx2400f-emergency-food-ration/) | Actif | Recorded-link permission follows model-document and food-safety-limitation review. No concrete ASIN/model contradiction was established. Canadian listing, pack count, ingredients of the delivered lot and seller remain unverified; no certification or exact mass is inferred. |
| S.O.S. Emergency Food Rations — 3600 Calories | FALLOUT | [B00W20PIHQ](https://www.amazon.ca/dp/B00W20PIHQ?tag=apocalypsegear-20) | [`sos-3600-calorie-emergency-food-rations`](https://apocalypsegearlab.github.io/gear/sos-3600-calorie-emergency-food-rations/) | Bloqué | The B00W20PIHQ Canadian packet count (possible two-pack) is unconfirmed. Manufacturer data also conflicts: nine 410-kcal servings equal 3,690 rather than 3,600 kcal. Resolve the lot and nutrition label before enabling the CTA; 7,200 kcal is not established. |
| 3M 6800 Full Facepiece Reusable Respirator | OUTBREAK | [B00MA4K4C8](https://www.amazon.ca/dp/B00MA4K4C8?tag=apocalypsegear-20) | [`3m-6800-full-facepiece-respirator`](https://apocalypsegearlab.github.io/gear/3m-6800-full-facepiece-respirator/) | Actif | Recorded-link permission follows Canadian manufacturer model/Medium-size and use-limitation review, with no concrete ASIN/model contradiction established. This does not authenticate the seller or unit, establish included filters, or verify the live Canadian listing. |

Les cinq URL ont été contrôlées localement : HTTPS, domaine exact Amazon.ca, ASIN inchangé, tag unique `apocalypsegear-20`, aucun paramètre ou fragment supplémentaire. Les lectures publiques Amazon ont échoué pour les cinq ASIN le 28 octobre : cela **ne prouve pas leur invalidité**, mais ne constitue pas une vérification d'annonce. Aucune alternative navigateur précédemment refusée n'a été réessayée. Aucun résultat de moteur, miroir ou illustration ne tient lieu de preuve d'annonce canadienne.

## Exactitude, alimentation et protection respiratoire

- **GC-01** : la page FNIRSI donne 10 000 µSv/h dans les caractéristiques et 1 000 µSv/h dans son tableau, avec une conversion entre parenthèses incohérente. Aucune plage fiable ni calibration n'est attribuée à l'appareil vendu. Le modèle/ASIN canadien doit être établi avant CTA, comme demandé. L'appareil ne certifie ni l'absence de contamination ni la sécurité d'une zone, d'un aliment ou d'une eau ; les instructions des autorités priment.
- **ReadyWise** : 84 portions désignent des portions, pas 84 repas. La page spécifique indique environ 63 cups d'eau et une conservation maximale conditionnelle en lieu frais et sec ; la FAQ générique donne une estimation différente et ne remplace pas les instructions des sachets. Le titre est bien la variante gluten-free. Les étiquettes fabricant inspectées donnent 270/160/190/100 kcal ; avec 24/18/18/24 portions, cela fait **15 180 kcal**, alors que la page annonce **15 420**. La liste parle de dessert au yogourt, les informations nutritionnelles de pudding vanille. Le riz déclare du soja ; pomme de terre et pudding déclarent du lait. Ces divergences et le lot canadien restent à clarifier ; aucun total n'est présenté comme vérifié pour l'ASIN.
- **Datrex** : DX2400F est distingué de DX3600F. Le document de modèle décrit **12 barres de 200 kcal, soit 2 400 kcal pour le paquet complet**. Blé et ingrédients à base/arôme de noix de coco sont signalés. La masse diffère entre la fiche ancienne (482 g) et le catalogue (500 g) : aucune masse livrée n'est affirmée. Le lien enregistré peut être exposé avec ces réserves, sans prétendre avoir vérifié le vendeur ou le nombre de paquets vendus. La durée de cinq ans part de la fabrication et dépend du lot, de l'emballage et des instructions de stockage.
- **S.O.S.** : le fabricant désigne une ration 3 600 kcal, mais sa propre fiche donne neuf portions de 410 kcal (**3 690 kcal**). Le possible lot de deux n'est pas confirmé ; **7 200 kcal pour l'ASIN ne sont pas établies**. Blé, noix de coco et soja restent à contrôler sur le lot. La durée de cinq ans est une conception fabricant, pas cinq années restantes garanties. Le CTA attend le lot et des informations cohérentes.
- **3M 6800** : référence canadienne Medium documentée, réutilisable, visière polycarbonate et raccords à baïonnette. Masque seul, **sans cartouches installées sur l'illustration** ; aucun filtre inclus n'est promis. Ensemble homologué adapté au danger, ajustement étanche, formation et fit test requis. Il ne fournit pas d'oxygène et n'est pas utilisable en atmosphère déficiente, inconnue ou IDLH. Pas de protection automatique contre tous gaz, virus, produits chimiques ou dangers nucléaires. Usage professionnel selon les instructions ; aucune authentification du vendeur/exemplaire.

Les sources primaires sont liées directement dans chaque fiche (fabricants, étiquettes et instructions 3M, CNSC, Public Safety Canada). La provenance de chaque caractéristique est enregistrée ; des recherches documentaires ne sont pas des mesures physiques.

## Affiliation : 17 actifs / 9 bloqués

Deux nouveaux liens autorisés : Datrex et 3M 6800. Trois nouveaux maintiens : GC-01, ReadyWise, S.O.S. Les six maintiens historiques sont conservés :

| Produit | Anomalie conservée |
|---|---|
| EcoFlow RIVER 2 Pro | L'annonce demandée B0BVLPGS79 renvoyait une sélection B0D2HX1ZS9 ; variante à clarifier. |
| Jackery Explorer 300 | 292/293 Wh, résumé LiFePO4 contre détails Lithium Ion, champs 110/120 V ; modèle exact à établir. Illustration incorrecte toujours exclue. |
| Midland ER310 | Documents actuels 2 600/3 500 mAh ; révision non établie. |
| Kidde C3010 | Équivalence C3010-CA et certification canadienne non établies. |
| INIU P62 | Configuration P62/P62-E1, câbles et preuves de sécurité canadiennes incomplètes. |
| NANUK 904 | Lot canadien et inventaire 109/110 éléments non résolus. |

Ces anomalies sont héritées de l'audit Phase 4.2, sans nouvelle déclaration de vérification des annonces anciennes. Les quinze anciens liens actifs restent actifs. [État réel des 26 URL et motifs détaillés](qa/phase4-3/product-status.json).

`AMAZON_CA_LINKING_ENABLED=true` et **`AMAZON_CA_FINAL_APPROVAL_CONFIRMED=false`**, configuration inchangée. Les règles officielles [de révision initiale Amazon.ca](https://associates.amazon.ca/help/node/topic/G8TW5AE9XL2VX9VM) permettent une période initiale avant la révision après ventes admissibles ; la validation d'un tag n'établit pas l'approbation finale ou la situation privée du compte. Les [obligations de déclaration](https://associates.amazon.ca/help/operating/agreement) restent respectées. Chaque bouton actif conserve le suivi sortant existant, le nouvel onglet, `rel="sponsored nofollow noopener"` et la déclaration Amazon compacte à proximité. Aucun grand texte d'affiliation ajouté.

## Sources et WebP

Autorisation **scopée à ces cinq PNG** : le propriétaire les désigne comme images finales approuvées pour ApocalypseGearLab dans son ordre Phase 4.3. Il ne s'agit pas de photographies officielles des fabricants. Cette instruction est documentée ; elle ne remplace pas un audit indépendant des droits d'éventuelles photographies de référence non divulguées et ne s'étend pas à d'autres médias.

Les noms réellement trouvés sont sans les suffixes numériques cités dans l'ordre de travail. Les cinq contenus fournis ont été inspectés puis associés, sans substitution Internet. SHA-256, dimensions et noms exacts figurent dans le manifeste. Aucun original supprimé, recadrage, retouche, recoloration ou régénération.

| Produit | PNG réellement utilisé | WebP principal (1254 px) | Octets PNG → WebP | Variantes |
|---|---|---|---:|---|
| FNIRSI GC-01 Geiger Counter | Détecteur de radiation futuriste GC-01.png | `assets/media/fallout/fnirsi-gc-01-geiger-counter-fallout.webp` | 1950914 → 162448 | 480 / 960 / 1254 px |
| ReadyWise 84 Servings Gluten-Free Emergency Food Supply | Présentation ReadyWise sous lumière rouge.png | `assets/media/fallout/readywise-84-servings-emergency-food-fallout.webp` | 2150479 → 194652 | 480 / 960 / 1254 px |
| Datrex DX2400F Emergency Food Ration — 2400 Calories | Ration de secours Datrex sous interface rouge.png | `assets/media/fallout/datrex-dx2400f-emergency-rations-fallout.webp` | 2457132 → 271838 | 480 / 960 / 1254 px |
| S.O.S. Emergency Food Rations — 3600 Calories | Ration d’urgence S.O.S. sous éclairage rouge.png | `assets/media/fallout/sos-3600-calorie-emergency-food-fallout.webp` | 2738564 → 317940 | 480 / 960 / 1254 px |
| 3M 6800 Full Facepiece Reusable Respirator | Masque respiratoire 3M en halo néon.png | `assets/media/outbreak/3m-6800-full-facepiece-respirator-outbreak.webp` | 2407628 → 228614 | 480 / 960 / 1254 px |

**11 704 717 octets PNG → 1 175 492 octets pour les cinq principaux WebP : −90.0 %.** Les quinze variantes représentent 2 216 898 octets au total. Qualité 83, effort 6, compositions carrées 1254×1254 conservées, métadonnées inutiles absentes. Les images des cartes sont différées et les détails utilisent `srcset/sizes` avec dimensions intrinsèques. Aucun score Lighthouse ou Core Web Vitals terrain n'est revendiqué.

[CSV de correspondance](../assets/media/phase4-3-image-manifest.csv) · [Revue des pixels, droits, poids et empreintes](qa/phase4-3/media-review.json).

Inspections : WebP finaux vus, cadres rouges/verts et teintes d'origine conservés, aucune déformation ou coupe. Datrex/S.O.S. : chiffres, ingrédients et certifications dessinés ne sont pas des étiquettes authentiques. ReadyWise : illustration d'une variante, pas preuve du contenu vendu. GC-01 : graphique fictif, taux affiché sans /h et valeurs incohérentes ; aucune mesure réelle. 3M : raccords vides conservés. Les légendes discrètes existantes signalent la nature conceptuelle et précisent sur la fiche que les labels illustrés ne sont pas les spécifications. **Aucun de ces défauts de texte synthétique n'est annoncé comme retouché.**

Les 21 anciennes entrées médias et **38 fichiers principaux/variantes**, dont les trois du bunker, sont inchangés octet par octet. Wave+, Aqua-Tainer, couleurs BLACKOUT/FALLOUT/OUTBREAK, accueil, navigation, tiroir mobile, cartes, légendes, mentions légales et contrôles SEO préservés. La route binaire FALLOUT est étendue pour livrer les variantes, avec le même contrôle de permission et les mêmes octets.

## Validation réellement exécutée

| Contrôle | Résultat local |
|---|---|
| `npm run check` | 61 fichiers, 0 erreur / avertissement / hint |
| `npm test` | 39 réussis, 0 échec |
| `npm run test:products` | Schéma, fixtures publiées, affiliation active/en attente et nettoyage/restauration réussis |
| `npm run test:images` | 26 associations uniques, 25 illustrations autorisées, 1 rejetée ; hashes, dimensions, décodage, CSV et droits contrôlés |
| `npm run build` | 33 pages HTML dont 26 fiches |
| `npm run test:site` | 993 références internes, 5 URL sitemap, robots/canonicals/H1/JSON-LD et médias validés |
| `npm run test:browser` | 56 scénarios Chromium validés : 54 dans la suite puis 2 repris avec succès, 0 échec restant |

Deux contrôles longs ont initialement dépassé le délai de 30 secondes : les six audits du catalogue complet et les 51 onglets simulés. Leurs budgets ciblés sont désormais 60 et 90 secondes, sans suppression d'assertion. La reprise ciblée valide les deux scénarios. Les tests couvrent les 26 fiches et les catalogues, les six largeurs **320/375/768/1024/1440/1920 px**, l'absence de débordement horizontal, axe WCAG A/AA et 2.1 AA, clavier/menu/sans JavaScript, et le bunker. Les cinq nouvelles images sont aussi vérifiées dans les détails et équipements associés, et leurs sources initiales 480/960 sont testées dans des contextes sans cache aux largeurs téléphone/ordinateur. **51 ouvertures des vrais formats d'URL enregistrés ont été entièrement interceptées localement**, sans trafic Amazon ni fausses visites affiliées. Les nouvelles réserves alimentaires et les limites d'assemblage du masque disposent de tests spécifiques. L'accessibilité automatisée ne vaut pas certification WCAG complète ; aucun appareil physique, Safari ou Firefox n'a été testé.

Titles, descriptions et H1 propres à chaque fiche, canonicals exacts, ALT anglais descriptifs et absence de lien/asset interne cassé vérifiés. La stratégie d'indexation est inchangée : toutes les fiches informatives restent `noindex, nofollow`, sans Product/Offer/Review/AggregateRating inventés ; BreadcrumbList uniquement. Le sitemap contient toujours les cinq pages indexables et n'expose pas les brouillons.

[Résultats structurés](qa/phase4-3/test-results.json) · [Index des 16 captures et dimensions](qa/phase4-3/captures.json).

## Captures inspectées

| Page | Ordinateur | Téléphone |
|---|---|---|
| catalogue | [1440 px](qa/phase4-3/catalogue-1440.webp) | [375 px](qa/phase4-3/catalogue-375.webp) |
| fallout | [1440 px](qa/phase4-3/fallout-1440.webp) | [375 px](qa/phase4-3/fallout-375.webp) |
| outbreak | [1440 px](qa/phase4-3/outbreak-1440.webp) | [375 px](qa/phase4-3/outbreak-375.webp) |
| fnirsi-gc-01-geiger-counter | [1440 px](qa/phase4-3/fnirsi-gc-01-geiger-counter-1440.webp) | [375 px](qa/phase4-3/fnirsi-gc-01-geiger-counter-375.webp) |
| readywise-84-servings-emergency-food-bucket | [1440 px](qa/phase4-3/readywise-84-servings-emergency-food-bucket-1440.webp) | [375 px](qa/phase4-3/readywise-84-servings-emergency-food-bucket-375.webp) |
| datrex-dx2400f-emergency-food-ration | [1440 px](qa/phase4-3/datrex-dx2400f-emergency-food-ration-1440.webp) | [375 px](qa/phase4-3/datrex-dx2400f-emergency-food-ration-375.webp) |
| sos-3600-calorie-emergency-food-rations | [1440 px](qa/phase4-3/sos-3600-calorie-emergency-food-rations-1440.webp) | [375 px](qa/phase4-3/sos-3600-calorie-emergency-food-rations-375.webp) |
| 3m-6800-full-facepiece-respirator | [1440 px](qa/phase4-3/3m-6800-full-facepiece-respirator-1440.webp) | [375 px](qa/phase4-3/3m-6800-full-facepiece-respirator-375.webp) |

Les captures de grandes pages dépassant 16 383 px de hauteur ont été réduites uniquement pour l'export QA WebP ; le viewport testé reste celui indiqué et les PNG intégraux sont conservés localement dans `.tools/qa/phase4-1/`. Aucun asset produit n'est réduit à cause de cette limite.

## Livraison GitHub

Branche : `feat/phase4-3-new-fallout-outbreak-products` ; base main : `8955a3f848a9203052d2130f44dee1aa15a42827`.

Commit d'implémentation : **ac4cb3a64170ba59de480319adc14ece812d90d1**. Le commit de rapport suivant documente ce SHA ; le HEAD final et le résultat réel de CI sont indiqués dans la PR.

PR unique créée : [**nº 11 — Phase 4.3 — Add 5 Fallout & Outbreak Products**](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/11), ouverte et fusionnable.

**CI GitHub réussie** sur le commit de code et QA `cc91d6cb4a91dde6b5744a575334d38b35989219` : [run 40936476462](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/40936476462), terminé le 29 octobre 2026 à 19:05:14 UTC. Journaux Ubuntu relus : Astro 61 fichiers sans erreur/avertissement/hint, **39 tests unitaires et 56 tests navigateur tous réussis en une seule exécution**, 33 HTML, 993 références internes, 5 URL sitemap.

Le commit documentaire suivant ajoute uniquement le lien de la PR et cette preuve ; le [statut du HEAD final est visible dans ses contrôles](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/11/checks). [Preuve structurée de CI](qa/phase4-3/github-ci.json). Aucune fusion, suppression de branche ou exécution manuelle du workflow Pages.

Après revue : fusionner cette unique PR si la CI est verte. Le déploiement reste une action séparée du propriétaire dans le workflow Pages manuel existant, sur main et avec sa confirmation explicite. Les trois nouveaux CTA bloqués et les six anciens ne doivent être activés qu'après résolution des points documentés. Les droits non divulgués de références éventuelles restent une responsabilité de provenance à clarifier si de telles références existent.
