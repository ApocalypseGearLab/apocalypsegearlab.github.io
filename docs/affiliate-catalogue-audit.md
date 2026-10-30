# Audit complet des liens Amazon.ca et ajout distinct du filtre 2091

Revue du 29 octobre 2026, heure de Toronto (lectures réseau le 30 octobre UTC). Branche : `fix/amazon-ca-catalogue-audit`. Base distante vérifiée : `main`, commit `836f7e10dae4b381a2d6c51607165509d4996bc4`, après fusion réelle de la [PR nº 16](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/16) à 00:58:06 UTC.

## Résultat et cause des boutons en attente

Les 29 fiches existantes ont été analysées ; le 2091 demandé ne figurait pas dans le dépôt. Une trentième fiche est ajoutée sous `/gear/3m-2091-p100-particulate-filters/`, avec **B001D1JCK4**, séparément du 2097 **B07FMJPFTY**. L’ASIN est celui fourni par le propriétaire ; aucune correspondance d’annonce actuelle ou quantité n’est inventée.

Le contrôle final parse **31 fichiers JSON** : les 30 fiches produits et le modèle interne. Ce modèle sans offre commerciale est exclu du tableau public et demeure non publiable.

Les URL enregistrées satisfont les contrôles techniques : HTTPS, domaine Amazon.ca exact, ASIN du chemin identique au champ JSON, unique `tag=apocalypsegear-20`, absence d’identifiants, port inhabituel, fragment et paramètres supplémentaires. Aucun doublon d’ASIN ou d’URL n’a été trouvé. Il n’y avait donc pas d’URL mal formée à remplacer dans les anciens produits.

Les 60921 et 60926 ne sont pas désactivées par un défaut du composant : leur `affiliateReview.decision` est explicitement `hold`. `getMerchantLinks()` applique cette décision et rend `href=null`. Le composant affiche alors un statut d’attente ; les cartes proposent un lien interne « Details ». Sur les fiches, le contrôle sans `href` porte `aria-disabled=true` et ne constitue pas un lien Amazon actif. Aucun script côté client ne rétablit une URL bloquée.

La cause de ces deux attentes est la vérification manquante du modèle et de la paire actuellement vendue au Canada. Pour 2091, le modèle/ASIN enregistré et la quantité de l’offre doivent être établis indépendamment. La mission précise elle-même que les URL fournies ne prouvent ni conditionnement ni authenticité et demande de conserver les contrôles si Amazon est inaccessible. Aucun de ces trois CTA n’est donc activé sans preuve nouvelle. Le 2097 conserve également son attente de cinq paires.

Les **21 liens déjà autorisés restent actifs**. Les huit anciens blocages sont conservés et le 2091 ajoute une neuvième attente : **30 profils informatifs, 21 liens actifs, neuf bloqués**. Aucun statut de compte, vérification d’annonce, approbation éditoriale ou sécurité n’est falsifié pour atteindre un objectif commercial.

## Trois validations séparées

1. **URL techniquement valide** : syntaxe, hôte, ASIN, tag et unicité. Ce résultat ne signifie pas qu’Amazon a renvoyé l’annonce.
2. **Offre vérifiée** : preuve spécifique de l’ASIN, marque/modèle, variante, quantité et, lorsque vérifiables, vendeur et provenance. Les données actuelles ne déclarent aucune annonce indépendante vérifiée ; certains anciens liens sont autorisés comme liens enregistrés sur la base de leurs revues documentaires explicites, sans transformer cela en vérification en direct.
3. **Publication éditoriale et sécurité** : statuts de recherche, sélection selon le risque, approbation de publication et règles SEO. Les fiches informatives restent en brouillon et `noindex, nofollow` ; cette visibilité ne constitue pas une recommandation ni un essai physique.

Les fonctions de permission existantes dans `src/lib/affiliate.ts` et `src/lib/release-policy.ts` restent inchangées. L’activation ne dépend pas automatiquement de l’approbation finale Amazon : le commutateur de participation initiale demeure activé et `AMAZON_CA_FINAL_APPROVAL_CONFIRMED` reste `false`. Les revues `link-permitted` existantes fonctionnent déjà dans ce cadre.

## Vérifications réseau réellement effectuées

Les **30 URL canoniques Amazon.ca** ont été soumises au lecteur web public, sans tag affilié pour ces lectures. Les 30 ont renvoyé une indisponibilité du lecteur. Aucun statut HTTP Amazon, chaîne de redirections, contenu de boîte, vendeur ou preuve d’authenticité n’a été exposé. Les champs correspondants restent `null` dans les preuves ; l’erreur de l’outil n’est pas présentée comme un HTTP 403/404 ou une preuve de lien invalide. Aucune automatisation navigateur Amazon, contournement de restriction ou simulation décrite comme une annonce réelle n’est utilisé.

Les recherches limitées à Amazon.ca sur les trois couples ASIN/modèle prioritaires n’ont pas fourni de résultat indexé exploitable. Cette absence de résultat ne démontre pas l’inexistence des annonces et ne vérifie aucune quantité.

Le site public a été lu séparément par HTTP : `/gear/` a répondu **200**, sans redirection, avec **29 cartes, 21 ancres affiliées et huit cartes en attente**. Les 29 routes individuelles existantes ont répondu 200 ; la route du futur 2091 a répondu 404. Cet instantané décrit le site déjà déployé, pas la nouvelle branche. Le détail des routes individuelles figure dans [les lectures publiques](qa/affiliate-audit/deployed-profiles.json).

Les tests d’ouverture de nouveaux onglets utilisent des réponses locales simulées. Ils démontrent le comportement du HTML et les attributs du bouton ; ils ne prouvent pas qu’Amazon a chargé une annonce. Les attributs `data-affiliate-click`, `data-product`, `data-merchant` et `data-marketplace` sont contrôlés. Aucune collecte analytique, événement envoyé à un service tiers ou mesure réelle des conversions n’est inventé ou ajouté à cet audit.

## Contrôles 3M prioritaires

| Modèle | ASIN enregistré | Documentation officielle | Conditionnement Amazon indépendant | Décision |
|---|---|---|---|---|
| 60926 | B009POHLRC | Multi-gaz/vapeurs spécifiés et P100 ; compatibilité 6800 sous instructions/approbations | Paire annoncée, non vérifiée | Attente conservée |
| 60921 | B07571LR2K | Certaines vapeurs organiques et P100 ; compatibilité 6800 sous instructions/approbations | Paire annoncée, non vérifiée | Attente conservée |
| 2091 | B001D1JCK4 | P100 particules ; aucune fonction de soulagement des vapeurs organiques de nuisance attribuée | Quantité non établie | Nouvelle fiche distincte, CTA en attente |
| 2097, à ne pas confondre | B07FMJPFTY | P100 avec soulagement limité des odeurs organiques ; pas un remplacement des cartouches chimiques | Cinq paires annoncées, non vérifiées | Fiche, image et attente conservées |

Le 6800 utilise deux filtres/cartouches identiques compatibles dans une configuration approuvée. Le nombre installé n’établit pas la quantité vendue. Les conditionnements de caisse du fabricant ne sont pas substitués aux offres canadiennes. Les quatre modèles sont comparés dans la section « Compatible 3M Filters & Cartridges », avec liens vers leurs fiches.

Le 2091 conserve les exclusions indispensables : aucun apport d’oxygène, pas d’atmosphère déficiente en oxygène, inconnue ou IDLH, sélection selon le contaminant/concentration et approbation de l’ensemble, ajustement, formation et étanchéité. Aucune protection universelle contre gaz, rayonnements, agents biologiques ou armes chimiques n’est revendiquée. Aucun essai physique ni certification d’un exemplaire livré n’est inventé.

## Tableau complet demandé

« Offre vérifiée » signifie ici preuve indépendante correspondant à l’annonce, pas seulement une autorisation d’exposer le lien enregistré. « URL valide » désigne les contrôles techniques locaux. Les motifs complets et problèmes éditoriaux sont conservés dans [l’audit JSON](qa/affiliate-audit/catalogue-audit.json).

| Produit | ASIN | URL valide | Offre vérifiée | Bouton actif | Cause du blocage | Correction | Résultat du test |
|---|---|---|---|---|---|---|---|
| 3M 2091 P100 Particulate Filters | [B001D1JCK4](https://www.amazon.ca/dp/B001D1JCK4?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Modèle/variante de l’offre et quantité non vérifiés | Fiche distincte ajoutée ; URL préparée ; attente justifiée | Réussi : URL, HTML et navigateur |
| 3M 2097 P100 Particulate Filters | [B07FMJPFTY](https://www.amazon.ca/dp/B07FMJPFTY?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Modèle et cinq paires non vérifiés | URL et décision conservées | Réussi : URL, HTML et navigateur |
| 3M 60921 Organic Vapor/P100 Cartridge Filters | [B07571LR2K](https://www.amazon.ca/dp/B07571LR2K?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Modèle et paire de l’offre canadienne non vérifiés | URL et décision conservées | Réussi : URL, HTML et navigateur |
| 3M 60926 Multi-Gas/Vapor P100 Cartridge Filters | [B009POHLRC](https://www.amazon.ca/dp/B009POHLRC?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Modèle et paire de l’offre canadienne non vérifiés | URL et décision conservées | Réussi : URL, HTML et navigateur |
| 3M 6800 Full Facepiece Reusable Respirator | [B00MA4K4C8](https://www.amazon.ca/dp/B00MA4K4C8?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| 3M Aura 9205+ N95 particulate respirator | [B09FM2P1KF](https://www.amazon.ca/dp/B09FM2P1KF?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| 3M GoggleGear 500 protective goggles | [B016L26QS0](https://www.amazon.ca/dp/B016L26QS0?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| 5.11 Tactical RUSH72 2.0 55 L backpack | [B0D9R239MT](https://www.amazon.ca/dp/B0D9R239MT?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Datrex DX2400F Emergency Food Ration — 2400 Calories | [B08T57RVBY](https://www.amazon.ca/dp/B08T57RVBY?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| EcoFlow RIVER 2 Pro | [B0BVLPGS79](https://www.amazon.ca/dp/B0BVLPGS79?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Discordance EFR620 / EFR617 et ASIN de l’offre | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Fenix CL26R Pro rechargeable lantern | [B0CGKWX5YT](https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Fenix HM50R V2.0 rechargeable headlamp | [B0H6R34CBL](https://www.amazon.ca/dp/B0H6R34CBL?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| FNIRSI GC-01 Geiger Counter | [B0BHH9X1WG](https://www.amazon.ca/dp/B0BHH9X1WG?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Garmin GPSMAP 67i satellite communicator | [B0C3WQPQPL](https://www.amazon.ca/dp/B0C3WQPQPL?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| INIU P62 20000 mAh 65 W power bank | [B0DB888L9F](https://www.amazon.ca/dp/B0DB888L9F?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Vérification de sécurité de la révision exacte incomplète | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Jackery Explorer 1000 v2 | [B0D7PPG25F](https://www.amazon.ca/dp/B0D7PPG25F?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Jackery Explorer 300 | [B082TMBYR6](https://www.amazon.ca/dp/B082TMBYR6?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Variante régionale, capacité/chimie et tension contradictoires | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Jackery SolarSaga 100 W Air | [B0FX8P4JST](https://www.amazon.ca/dp/B0FX8P4JST?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Kidde C3010 carbon monoxide alarm | [B00FHW7PBS](https://www.amazon.ca/dp/B00FHW7PBS?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Modèle et certification canadienne incomplets | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Leatherman Wave+ multi-tool | [B079MJBP21](https://www.amazon.ca/dp/B079MJBP21?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Marmot PreCip rain jacket | [B0CMS33YXX](https://www.amazon.ca/dp/B0CMS33YXX?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Mechanix Wear M-Pact work gloves | [B00939MRAA](https://www.amazon.ca/dp/B00939MRAA?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Merrell Moab 3 Mid Waterproof hiking boots | [B0987Z7CKY](https://www.amazon.ca/dp/B0987Z7CKY?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Midland ER310 emergency radio | [B015QIC1PW](https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| NANUK 904 first aid kit | [B0G3XYHL33](https://www.amazon.ca/dp/B0G3XYHL33?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Non | Contenu/variante FSA03 et ASIN non rapprochés | URL et décision conservées | Réussi : URL, HTML et navigateur |
| ReadyWise 84 Servings Gluten-Free Emergency Food Supply Bucket | [B00TX5J74S](https://www.amazon.ca/dp/B00TX5J74S?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Reliance Aqua-Tainer 7-gallon water container | [B001QC31G6](https://www.amazon.ca/dp/B001QC31G6?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| Sawyer Squeeze SP129 water filtration system | [B00B1OSU4W](https://www.amazon.ca/dp/B00B1OSU4W?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| SOL Emergency Bivvy with rescue whistle | [B08NC9BLQ5](https://www.amazon.ca/dp/B08NC9BLQ5?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |
| S.O.S. Emergency Food Rations — 3600 Calories | [B00W20PIHQ](https://www.amazon.ca/dp/B00W20PIHQ?tag=apocalypsegear-20) | Oui, syntaxe | Non, indépendante | Oui | — | URL et décision conservées | Réussi : URL, HTML et navigateur |

## Modifications effectivement réalisées

- Ajout de la fiche 2091, de son ASIN et de son lien exact ; aucune conversion ou réutilisation du 2097.
- Ajout du 2091 à la section de filtres du 6800 et de liens vers les autres composants compatibles.
- Visuel neutre pour le 2091, sans réutilisation de photo/illustration d’un autre modèle. Correction du repli de couleur du composant d’image : le placeholder reçoit désormais l’univers OUTBREAK vert au lieu d’un défaut ambre. Aucun média n’est modifié ou recomprimé.
- Commande reproductible `npm run audit:affiliate`, avec sortie JSON optionnelle et échec en cas d’URL incorrecte, doublons ou blocage non documenté. Elle est intégrée à la CI.
- Validateur diagnostic indépendant, séparant URL, offre, permission du lien et publication éditoriale, sans modifier les permissions de production.
- Vérification renforcée du véritable élément `<a>`, de l’ouverture `_blank`, de `sponsored nofollow noopener`, du tag, de la déclaration visible et des quatre attributs de suivi.
- Tests du 2091, de la distinction 2097, des quatre filtres du 6800, des doublons, URL malveillantes et états non documentés ; totaux intentionnels adaptés.

Les **29 anciens JSON**, toutes les images, les manifestes, la configuration Amazon, les politiques de publication/sécurité, le déploiement manuel et les anciens rapports sont préservés et comparés à la base Git. Les changements de présentation sont limités au nouveau composant informatif et à la couleur de repli ; aucune refonte, nouvelle dépendance ou modification de navigation n’est effectuée. Aucun score Core Web Vitals ou Lighthouse n’est revendiqué : le code d’audit s’exécute dans le CLI/CI et n’ajoute pas de script analytique au visiteur.

Fichiers fonctionnels : `src/data/products/3m-2091-p100-particulate-filters.json`, `src/lib/respirator-filters.ts`, `src/lib/affiliate-audit.ts`, `scripts/audit-affiliate-links.ts`, `src/components/ProductImage.astro`, `ProductCard.astro`, `ProductProfile.astro`, `scripts/verify-site.mjs`, `scripts/verify-images.mjs`, `package.json`, `.github/workflows/ci.yml`. Les autres changements concernent les tests, ce rapport et ses preuves.

## Tests, captures et limites

| Validation exécutée | Résultat |
|---|---|
| Astro / TypeScript | 68 fichiers, zéro erreur, avertissement ou indication |
| Unités et catalogue | 55 tests réussis, zéro échec |
| Audit des URL | 30 URL valides, aucun doublon, neuf blocages documentés ; 21 permissions de lien conservées |
| Médias | 29 associations existantes vérifiées, 28 illustrations autorisées et une rejetée, 2091 neutre et distinct |
| Scénarios produits | Réussis ; cas synthétiques et restauration de la configuration réelle |
| Build | Réussi, 37 pages HTML |
| SEO/liens | 1 201 références internes, cinq URL sitemap ; canonicals, robots, JSON-LD et noindex validés |
| Navigateur | 74 tests réussis, zéro échec ; toutes les fiches, cartes, liens associés et quatre composants du 6800 |
| Responsive et accessibilité | 320, 375, 768, 1 024, 1 440 et 1 920 px ; axe, clavier et absence de débordement |
| Boutons actifs | 63 nouveaux onglets simulés sur catalogue, collections et fiches ; attributs et absence de window.opener vérifiés |

[Résultats structurés](qa/affiliate-audit/test-results.json). Aucun échec de validation finale ; aucun résultat n’est déclaré comme une annonce Amazon effectivement chargée.

Captures du build réellement inspectées : carte 2091 [mobile](qa/affiliate-audit/card-2091-375.webp) / [ordinateur](qa/affiliate-audit/card-2091-1440.webp), comparaison 6800 à quatre composants [mobile](qa/affiliate-audit/compatible-375.webp) / [ordinateur](qa/affiliate-audit/compatible-1440.webp). La fiche mobile a également été ouverte pour contrôler titre, visuel neutre et avertissements. Le 2091 reste distinct du 2097, la teinte neutre est verte et le statut d’attente lisible. Leur conversion en WebP concerne uniquement ces captures QA.

L’accessibilité est contrôlée automatiquement avec axe et au clavier ; il ne s’agit pas d’une certification WCAG complète ou d’essais sur appareils physiques. Les métriques de build et les ouvertures simulées sont distinguées des lectures réseau et de l’état public.

## Interventions encore nécessaires

Les neuf blocages documentés restent à résoudre par leurs preuves propres : identité régionale EcoFlow et Explorer 300, certification canadienne Kidde, sécurité exacte INIU, contenu/variante NANUK, offre/paire 60921, offre/paire 60926, offre/cinq paires 2097 et offre/quantité 2091. Le vendeur, la provenance, les étiquettes et dates d’un exemplaire livré ne sont pas authentifiés par une URL ou une illustration. Aucun de ces motifs n’est remplacé par une demande d’approbation générale du propriétaire.

## Sources et preuves

- [3M Canada 2091](https://www.3mcanada.ca/3M/en_CA/p/dc/v101229317/), [60921](https://www.3mcanada.ca/3M/en_CA/p/d/v000075262/), [60926](https://www.3mcanada.ca/3M/en_CA/p/d/v000057497/), [2097](https://www.3mcanada.ca/3M/en_CA/p/d/v000075275/).
- [Notice filtres 2000/2200 incluant 2091 et 2097](https://multimedia.3m.com/mws/media/528153O/3m-particulate-filters-2000-and-2200-series-p100-user-instructions.pdf?fn=UserInstruction-Reusable-Respirator_Filter_P-100_2096_R6.pdf).
- [Notice du masque complet 6000 incluant 6800, tableaux et installation de deux composants](https://multimedia.3m.com/mws/media/95995O/3m-full-facepiece-respirator-6000-series-user-instructions.pdf?fn=Facepieces_6700-6800-6900.pdf).
- [Notice 60921–60928](https://multimedia.3m.com/mws/media/525967O/3m-combination-cartridge-filter-p100-user-instructions.pdf?fn=34872376057_INT_R5.pdf).
- [Résultats des 30 tentatives Amazon](qa/affiliate-audit/network-results.json), [catalogue public](qa/affiliate-audit/deployed-catalogue.json), [routes publiques](qa/affiliate-audit/deployed-profiles.json), [audit local](qa/affiliate-audit/catalogue-audit.json), [conservation des anciens fichiers](qa/affiliate-audit/preservation.json).

## GitHub

Les contrôles locaux sont terminés. La PR et la CI GitHub sont en cours de préparation ; leurs coordonnées et résultats seront consignés avant livraison finale.

Aucune fusion ni aucun déploiement automatique. Le site public ne reçoit le nouveau 2091 qu’après revue, fusion approuvée et déclenchement explicite du workflow de publication.
