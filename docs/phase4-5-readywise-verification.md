# Phase 4.5 — ReadyWise 84 Servings : vérification documentaire et CTA

Revue du 29 octobre 2026. Base : `main` après fusion confirmée de la [PR nº 14](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/14), commit `3d13b171558115a67413ddb6a046865913abe51a`. Les modifications des PR nº 12, 13 et 14 sont conservées. Branche unique : `feat/phase4-5-readywise-amazon-verification`.

## Résultat et décision

Le lien ReadyWise est autorisé pour l’ASIN **B00TX5J74S** : `https://www.amazon.ca/dp/B00TX5J74S?tag=apocalypsegear-20`. Le build préparé contient **21 liens actifs sur 26 et cinq blocages maintenus**, contre 20/6 à la base de ce travail. Les 26 fiches restent visibles : neuf BLACKOUT, neuf FALLOUT et huit OUTBREAK.

La variante documentée est un seau sans gluten de 84 portions avec dessert au yaourt. Son étiquette réellement inspectée et la liste fabricant permettent de reproduire les **15 420 kcal déclarées**. Le calcul antérieur de 15 180 mélangeait cette liste avec une fiche de pudding à 100 kcal ; cette autre recette n’est plus utilisée pour calculer la version au yaourt à 110 kcal. L’arrondissement nutritionnel et l’existence de références différentes ne créent pas un blocage permanent lorsque la version est correctement distinguée.

L’autorisation concerne le lien enregistré, pas une certification, une recommandation d’achat, une mesure en laboratoire ou l’authentification d’un vendeur/lot. Les précautions alimentaires restent présentes. Aucun prix, disponibilité, note, avis ou résultat d’essai physique n’est inventé.

## Identité et portée des preuves

| Champ | Valeur retenue | Origine et limite |
|---|---|---|
| Marque / famille | ReadyWise, 84 Serving Gluten Free Grab and Go Bucket | Page fabricant consultée ; ne pas confondre avec les variantes 72/120/240 portions ou contenant du gluten |
| Modèle enregistré | WGF01-184 | Champs Amazon.ca transcrits dans le cahier des charges et correspondance modèle/UPC du catalogue Zoro ; pas de validation indépendante du modèle livré |
| UPC | 851238005318 | Même couple modèle/UPC dans la référence détaillant ; chiffre de contrôle vérifié, sans prétendre authentifier le produit |
| GTIN | 00851238005318 | Identifiant fourni par l’utilisateur, représentation du même UPC préfixée de deux zéros ; pas de vérification de licence GS1 |
| ASIN / domaine | B00TX5J74S / Amazon.ca | URL et tag contrôlés localement ; accès direct par le lecteur public indisponible |
| Quantité | Un seau de 84 portions | Sélection canadienne rapportée par l’utilisateur, cohérente avec le fabricant |
| Contenu de référence | Quatre recettes ; 13 sachets | Nombre de sachets explicitement publié par ReadyWise ; le champ Amazon « Number of Packs: 84 » n’est pas interprété comme 84 sachets |

La seule image jointe à ce tour est celle du dos du seau. Elle a été **inspectée directement**. Les captures distinctes des champs et de la galerie Amazon.ca ne sont pas jointes sous forme de fichiers : leurs identifiants et sélections sont documentés comme **transcription utilisateur**, sans les présenter comme des pixels inspectés ou une annonce récupérée en direct.

Une copie haute résolution de l’image d’étiquette reliée depuis la page officielle ReadyWise a également été téléchargée et inspectée. Elle correspond visuellement à l’image jointe. Ses panneaux nutritionnels, noms de recettes et avertissements ont été agrandis pour lecture. Empreinte SHA-256 de cette copie fabricant : `6d00d75d5fb511ceee0f65a15571c73f0cf7cbb28565afb2d759690d998e67bb`, 347 338 octets. Cela n’est pas une comparaison binaire avec la pièce jointe ni une inspection d’un lot livré. L’original fabricant reste hors fichiers publics et hors commit ; l’illustration FALLOUT existante n’est pas remplacée.

Le catalogue détaillant est utilisé uniquement pour rapprocher les identifiants. Ses champs commerciaux, pays, catégorie, avertissements génériques et disponibilités ne sont pas transférés comme des preuves techniques ou de conformité du produit alimentaire. Le catalogue JSON du fabricant n’a pas pu être récupéré ; aucune équivalence universelle de formulation associée au SKU n’est inventée.

## Portions, sachets et calcul nutritionnel

L’étiquette donne les portions **par sachet** : 6/6/6/8. La page fabricant donne le nombre de sachets : 4/3/3/3. Leur combinaison établit les quantités de référence suivantes.

| Recette | Sachets | Portions / sachet | Portions / seau | Portion indiquée | kcal / portion | Calcul du sous-total |
|---|---:|---:|---:|---:|---:|---:|
| Teriyaki Rice | 4 | 6 | 24 | 76 g | 270 | 24 × 270 = 6 480 |
| Hearty Tortilla Soup | 3 | 6 | 18 | 44 g | 160 | 18 × 160 = 2 880 |
| Potatoes & Chicken Flavored Pot Pie | 3 | 6 | 18 | 47 g | 190 | 18 × 190 = 3 420 |
| Creamy Yogurt Style Dessert | 3 | 8 | 24 | 25 g | 110 | 24 × 110 = 2 640 |
| **Total** | **13** | | **84** | | | **15 420 kcal déclarées** |

Vérifications : `24 + 18 + 18 + 24 = 84` ; `6 480 + 2 880 + 3 420 + 2 640 = 15 420`. Les calories sont des valeurs déclarées et susceptibles d’arrondi. Le calcul est exact sur ces valeurs, mais ne constitue pas un dosage en laboratoire, une énergie mesurée du lot ou une garantie que tous les lots utilisent la même formulation. Les 84 portions ne sont pas 84 repas complets.

## Référence distincte au pudding et divergences restantes

La page fabricant cite Creamy Yogurt Style Dessert dans son contenu et montre cette recette à 110 kcal sur le dos du seau. Son onglet nutrition renvoie encore à une fiche **Vanilla Pudding**, également inspectée : 100 kcal par portion de 22 g, huit portions par sachet. La formule antérieure `24×270 + 18×160 + 18×190 + 24×100` donne 15 180 kcal. La différence de 240 kcal vient des 24 portions de dessert avec 10 kcal d’écart.

Ces deux fiches ne sont pas interchangeables. L’ancienne référence est conservée comme source distincte, identifiée comme telle, sans être mélangée aux spécifications de la version inspectée. Aucune chronologie de fabrication ou de substitution des lots n’a été confirmée par le fabricant. Le problème est résolu pour la version au yaourt documentée ; la page officielle n’est pas déclarée entièrement débarrassée de ses références divergentes.

Restent non établis indépendamment : offre/vendeur canadien actuels, contenu et formulation de l’exemplaire livré, dates, état des scellés et conditions de stockage. Ces limites restent des contrôles avant achat/utilisation et avant publication éditoriale complète, sans recréer l’ancien blocage calorique pour la version identifiée.

## Préparation, eau, conservation et allergènes

Les deux pages du PDF officiel de préparation ont été rendues en PNG puis inspectées visuellement. Elles distinguent les entrées nécessitant de la chauffe du dessert au yaourt mélangé à l’eau. Pour les sachets de référence, les recettes concernées utilisent six tasses par sachet d’entrée et une tasse par sachet de yaourt : `(4+3+3)×6 + 3×1 = 63 tasses`. Cela corrobore l’estimation **d’environ 63 tasses** publiée pour ce produit ; les instructions de chaque sachet livré priment, et l’eau de boisson doit être prévue séparément. Aucun temps de cuisson universel n’est attribué à toutes les révisions.

L’étiquette demande de retirer l’absorbeur d’oxygène avant préparation. Utiliser de l’eau potable, suivre les consignes réelles de quantité, température et cuisson, vérifier l’intégrité des sachets et ne pas déduire une aptitude alimentaire de l’illustration conceptuelle.

L’étiquette inspectée déclare du **soja** pour le riz et du **lait** pour le plat de pommes de terre et le dessert au yaourt. Elle mentionne des équipements traitant aussi lait, soja, blé, œuf et fruits à coque. Une référence sans gluten n’est pas une garantie d’absence de tous les allergènes ni une recommandation médicale ; consulter chaque sachet reçu.

La conservation annoncée **jusqu’à 25 ans** concerne des conditions adaptées, notamment sachets non ouverts, milieu frais et sec, protection contre humidité, oxygène et lumière. Les dates et scellés du lot doivent être contrôlés. Cette durée maximale n’est pas garantie pour chaque exemplaire ni après ouverture.

## Modification publique et protections

Seul le JSON ReadyWise change parmi les produits. Le nom est complété par « Bucket » et le modèle enregistré devient WGF01-184. Les quatre recettes, les portions, les calories déclarées, les consignes et les précautions sont rédigées en anglais. Les anciennes affirmations de blocage devenues obsolètes sont retirées ou replacées dans le contexte de la référence au pudding.

L’ASIN, l’URL, le tag unique `apocalypsegear-20`, `target="_blank"`, `rel="sponsored nofollow noopener"`, la déclaration Amazon et le suivi des clics sont conservés. La fiche reste `draft`, `informational`, `not-tested`, `noindex, nofollow`, avec `listingVerified=false`, `lastVerified=null`, `safetyStatus=pending` et `publicationApproved=false`. L’approbation finale Amazon reste `false` et le commutateur d’accès initial aux liens reste applicable.

Aucun autre ASIN ni décision commerciale n’est changé. Midland et S.O.S. restent actifs. EcoFlow, Explorer 300, Kidde, INIU et NANUK restent bloqués. Les 25 autres JSON et le modèle interne sont comparés au dernier `main` ; les 80 fichiers médias/configuration/politique sont toujours protégés. Aucune illustration, PNG/WebP produit, règle de publication, navigation, page légale, composant ou CSS n’est modifié. Les anciens rapports sont des instantanés historiques conservés.

## Sources et preuves structurées

- [Page ReadyWise, contenu, eau et stockage](https://readywise.com/collections/master-collection/products/84-serving-gluten-free-grab-and-go-bucket-1).
- [Étiquette arrière officielle, dessert au yaourt à 110 kcal](https://readywise.com/cdn/shop/files/84ServingGlutenFreeGrab_GoBucket_NFP_2000x2000_33148317-bb73-45b5-b692-dc7efce26990.png?v=1727414894).
- [Fiche séparée de pudding à 100 kcal](https://cdn.shopify.com/s/files/1/0063/3818/3250/files/RW-GFvanillapudding.png?v=1696354528).
- [Instructions officielles ReadyWise, deux pages](https://cdn.shopify.com/s/files/1/0063/3818/3250/files/PKGRW113.081624_ReadyWise_Cooking_Instructions.pdf?v=1727709879).
- [Rapprochement modèle/UPC dans le catalogue Zoro](https://www.zoro.com/wise-84-serving-breakfast-and-entree-grab-and-go-gluten-free-kit-wgf01-184/i/G410909013/).
- [Preuves, calculs, limites et décision](qa/phase4-5/evidence.json), [conservation des autres produits](qa/phase4-5/preservation.json), [état commercial des 26 produits](qa/phase4-5/product-status.json).

## Tests et captures

Validations locales réellement exécutées avec Node 22.23.4 / npm 10.9.9 :

| Contrôle | Résultat |
|---|---|
| `npm run check` | 63 fichiers ; zéro erreur, avertissement ou indication |
| `npm test` | 46 tests réussis, zéro échec ; calcul indépendant, identifiants, tag, décision et conservation des autres produits inclus |
| `npm run test:images` | 26 associations vérifiées, 25 illustrations autorisées, un visuel rejeté ; dimensions, empreintes, droits et bunker préservés |
| `npm run test:products` | Scénarios de publication synthétiques, rendu des liens actifs/bloqués, protections réelles et restauration des données réussis |
| `npm run build` | Build de production réussi, 33 pages HTML |
| `npm run test:site` | 33 pages, 1 038 références internes, cinq URL sitemap, robots, canonicals, JSON-LD et filtrage vérifiés |
| `npm run test:browser` | 64 tests réussis, zéro échec, dont contrôles automatisés axe, clavier, navigation et responsive à 320, 375, 768, 1 024, 1 440 et 1 920 px |

Les CTA sont contrôlés sur les fiches, le catalogue, les collections et les cartes associées. Le scénario de liens ouvre 63 nouveaux onglets **simulés et isolés du réseau Amazon**, avec URL/ASIN/tag/attributs vérifiés ; il ne prétend pas inspecter 63 annonces en direct. Le test ReadyWise spécifique vérifie aussi portions, calories, dessert à 110 kcal, précautions, `noindex` et absence de débordement mobile. Les contrôles automatisés ne constituent pas une certification WCAG complète ni des essais sur appareils physiques. Aucun audit Lighthouse, achat ou test alimentaire physique n’est revendiqué.

[Résultats structurés des tests et dimensions des captures](qa/phase4-5/test-results.json).

Captures du build local, réellement inspectées après les tests :

- Carte catalogue : [téléphone 375 px](qa/phase4-5/card-375.webp), [ordinateur 1 440 px](qa/phase4-5/card-1440.webp).
- Bloc d’achat de la fiche : [téléphone 375 px](qa/phase4-5/purchase-375.webp), [ordinateur 1 440 px](qa/phase4-5/purchase-1440.webp).

Le CTA, sa mention d’affiliation et le contenu sont lisibles sans débordement dans ces captures. Le bandeau « Information only · Verification pending » reste le statut éditorial de la fiche ; l’ancien blocage du lien ReadyWise est retiré. Le cadrage et les couleurs FALLOUT sont conservés. Seules ces captures QA ont été exportées en WebP sans perte ; **aucun WebP produit ni variante du bunker n’a été recomprimé**.

## GitHub et verdict

PR unique créée vers `main` : [Phase 4.5 — Verify ReadyWise 84 Servings & Amazon CTA, nº 15](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/15).

Le commit fonctionnel `db22e2b22aed1565de51a3c3e89c7b90367b1bcd` a passé la [CI GitHub « Validate Astro site », exécution 40972665460](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/40972665460) : **success**. Les journaux terminés confirment les 46 tests unitaires, les 64 tests navigateur et la validation des 33 pages / 1 038 références internes / cinq URL sitemap. Les étapes Astro, médias, statut commercial, scénarios produits, build et installation Chromium ont également réussi sur Ubuntu.

Ce résultat concerne le commit fonctionnel indiqué. La mise à jour suivante ajoute uniquement les coordonnées de livraison et cette preuve CI au rapport et à ses résultats structurés ; la CI du dernier commit est également contrôlée avant livraison dans la description de la PR. Le contenu de `main` n’est pas modifié par cette préparation. La PR reste ouverte, non fusionnée ; aucun workflow de déploiement n’a été déclenché et la branche est conservée.

Verdict : **MERGE avec les cinq blocages restants maintenus**. Aucune fusion, suppression de branche ou publication automatique.
