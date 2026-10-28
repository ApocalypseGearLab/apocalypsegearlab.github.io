# Phase 4.2 + OUTBREAK — livraison de 21 fiches

Contrôle du **27 octobre 2026**, contexte client America/Toronto. Cette phase part de main après fusion confirmée de la PR nº 9, commit de base `5a765de8181a13c226864e4fa50343d43b4cdc16`. Le dossier était propre ; aucune autre PR ouverte ni branche Phase 4.2 concurrente n’a été trouvée. Branche unique : `feat/phase4-2-outbreak-commercial-completion`. Aucun changement de code sur main, aucune fusion ni publication automatique.

## Résultat réel

**21 fiches visibles dans le build : 9 BLACKOUT, 5 FALLOUT, 7 OUTBREAK. 15 liens actifs, 6 bloqués.** Les sept liens précédemment actifs restent actifs. HM50R gagne un lien après résolution documentaire de sa réserve de batterie ; les sept nouveaux dossiers disposent chacun d’une décision documentée, de leurs limites et de leur URL enregistrée. Aucun des 21 dossiers n’est déclaré physiquement testé ou doté d’une annonce indépendamment vérifiée.

### BLACKOUT

- EcoFlow RIVER 2 Pro
- Fenix CL26R Pro rechargeable lantern
- Fenix HM50R V2.0 rechargeable headlamp
- INIU P62 20000 mAh 65 W power bank
- Jackery Explorer 1000 v2
- Jackery Explorer 300
- Jackery SolarSaga 100 W Air
- Kidde C3010 carbon monoxide alarm
- Midland ER310 emergency radio

### FALLOUT

- Leatherman Wave+ multi-tool
- NANUK 904 first aid kit
- Reliance Aqua-Tainer 7-gallon water container
- Sawyer Squeeze SP129 water filtration system
- SOL Emergency Bivvy with rescue whistle

### OUTBREAK

- 3M Aura 9205+ N95 particulate respirator
- 3M GoggleGear 500 protective goggles
- 5.11 Tactical RUSH72 2.0 55 L backpack
- Garmin GPSMAP 67i satellite communicator
- Marmot PreCip rain jacket
- Mechanix Wear M-Pact work gloves
- Merrell Moab 3 Mid Waterproof hiking boots

## Sept nouvelles pages

Les URL ci-dessous désignent les routes prévues **après fusion et déploiement** ; la production distante n’a pas été modifiée par cette tâche.

- [3M Aura 9205+ N95 particulate respirator](https://apocalypsegearlab.github.io/gear/3m-aura-9205-n95-respirator/) — `/gear/3m-aura-9205-n95-respirator/`
- [3M GoggleGear 500 protective goggles](https://apocalypsegearlab.github.io/gear/3m-gogglegear-500-safety-goggles/) — `/gear/3m-gogglegear-500-safety-goggles/`
- [5.11 Tactical RUSH72 2.0 55 L backpack](https://apocalypsegearlab.github.io/gear/511-tactical-rush72-2-backpack/) — `/gear/511-tactical-rush72-2-backpack/`
- [Garmin GPSMAP 67i satellite communicator](https://apocalypsegearlab.github.io/gear/garmin-gpsmap-67i-satellite-gps/) — `/gear/garmin-gpsmap-67i-satellite-gps/`
- [Marmot PreCip rain jacket](https://apocalypsegearlab.github.io/gear/marmot-precip-rain-jacket/) — `/gear/marmot-precip-rain-jacket/`
- [Mechanix Wear M-Pact work gloves](https://apocalypsegearlab.github.io/gear/mechanix-m-pact-work-gloves/) — `/gear/mechanix-m-pact-work-gloves/`
- [Merrell Moab 3 Mid Waterproof hiking boots](https://apocalypsegearlab.github.io/gear/merrell-moab-3-mid-waterproof-boots/) — `/gear/merrell-moab-3-mid-waterproof-boots/`

Chaque fiche comporte description originale, spécifications liées à une source fabricant, avantages, limites, usages, contrôles avant achat, sources, H1 et title uniques, meta description, canonical et breadcrumbs. Les liens croisés rejoignent les collections existantes sans dupliquer les anciens produits.

## Médias et fidélité

Les sept PNG ont été retrouvés dans Downloads, inspectés, puis comparés aux références fabricant accessibles. Le sac, le respirateur, les lunettes, les gants, les bottes, la veste sans personne et le GPS sont intégrés dans un cadre vert tactique. Aucun produit n’est recoloré, aucun visuel n’est régénéré. Chaque nouveau média a trois WebP : 480, 960 et 1254 px, avec dimensions intrinsèques, ALT anglais et srcset/sizes. Le CSV dédié conserve les associations et les empreintes.

La commande du propriétaire identifie ces illustrations comme ses créations destinées aux sept produits et demande leur intégration. Cette autorisation est documentée par fichier et n’est pas étendue à des photos fabricant. Les photos de référence ne sont ni publiées ni ajoutées au dépôt. Cette revue ne certifie pas les droits sur d’éventuelles références originales non déclarées, ni les unités représentées. Les légendes signalent une illustration conceptuelle ; les marquages et écrans ne constituent pas une preuve technique. Taille, couleur, génération et contenu de boîte non établis restent explicitement non vérifiés.

Les sept sources totalisent **17 460 302 octets**. Les sept WebP principaux totalisent **1 630 182 octets**, soit environ **90,7 % de réduction**. Les 21 variantes totalisent **2 995 510 octets**, soit environ **82,8 % de moins que les sept PNG**. Les 14 illustrations précédentes, y compris l’archive rejetée, et les trois variantes du bunker sont préservées octet par octet. [Revue et empreintes](qa/phase4-2/media-review.json).

## Explorer 300 : autorisation conservée, erreur technique maintenue hors ligne

Le fichier exact `Jackery Explorer 300 en lumière ambre.png` a été retrouvé et inspecté ; son empreinte est consignée dans le manifeste. L’autorisation de style/utilisation du propriétaire est enregistrée et n’a pas été redemandée. Il porte toujours **USB-C 100 W** et **USB-A 15 W**. Il n’est donc pas réactivé, `image: null` reste adapté et le visuel neutre est conservé.

Correction précise proposée : **retirer les mentions de puissance 100 W et 15 W, garder les seuls libellés génériques USB-C / USB-A tant que la révision représentée n’est pas établie**, puis inspecter les pixels corrigés avant tout remplacement. Aucun chiffre de puissance de remplacement n’est inventé. Cette réserve d’image est indépendante du lien Amazon.

La réserve technique du produit a également été précisée : la représentation du détaillant juxtapose 292/293 Wh, Lithium Ion/LiFePO4 et 110/120 V. La chaîne Product Summary ne prouve pas à elle seule qu’une unité livrée est une nouvelle version LiFePO4. Le profil ne présente plus cette interprétation comme une identité certaine.

## Amazon.ca : 21 URL et décisions

Les 14 ASIN et URL précédents sont conservés intégralement ; les sept nouvelles URL sont celles de la commande. Tag unique : `apocalypsegear-20`. Domaine, HTTPS, chemin ASIN, absence d’identifiants/port non standard, tag unique et absence de paramètres supplémentaires sont vérifiés localement. Les boutons actifs sont des liens natifs `target="_blank"`, `rel="sponsored nofollow noopener"`, disponibles dans les catalogues, fiches et cartes associées. Les boutons sont uniformément **View on Amazon.ca**.

Les URL de cette documentation recensent également les liens bloqués ; leur présence dans le rapport n’active pas leur bouton sur le site.

| Collection | Produit | ASIN / URL affiliée enregistrée | Bouton | Réserve restante |
|---|---|---|---|---|
| OUTBREAK | 3M Aura 9205+ N95 particulate respirator | [B09FM2P1KF](https://www.amazon.ca/dp/B09FM2P1KF?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| OUTBREAK | 3M GoggleGear 500 protective goggles | [B016L26QS0](https://www.amazon.ca/dp/B016L26QS0?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| OUTBREAK | 5.11 Tactical RUSH72 2.0 55 L backpack | [B0D9R239MT](https://www.amazon.ca/dp/B0D9R239MT?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| BLACKOUT | EcoFlow RIVER 2 Pro | [B0BVLPGS79](https://www.amazon.ca/dp/B0BVLPGS79?tag=apocalypsegear-20) | Bloqué | The retrieved page for B0BVLPGS79 contains selected-ASIN B0D2HX1ZS9. Resolve this concrete listing identity conflict before enabling the recorded link. |
| BLACKOUT | Fenix CL26R Pro rechargeable lantern | [B0CGKWX5YT](https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| BLACKOUT | Fenix HM50R V2.0 rechargeable headlamp | [B0H6R34CBL](https://www.amazon.ca/dp/B0H6R34CBL?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| OUTBREAK | Garmin GPSMAP 67i satellite communicator | [B0C3WQPQPL](https://www.amazon.ca/dp/B0C3WQPQPL?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| BLACKOUT | INIU P62 20000 mAh 65 W power bank | [B0DB888L9F](https://www.amazon.ca/dp/B0DB888L9F?tag=apocalypsegear-20) | Bloqué | Exact-model safety verification is incomplete. |
| BLACKOUT | Jackery Explorer 1000 v2 | [B0D7PPG25F](https://www.amazon.ca/dp/B0D7PPG25F?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| BLACKOUT | Jackery Explorer 300 | [B082TMBYR6](https://www.amazon.ca/dp/B082TMBYR6?tag=apocalypsegear-20) | Bloqué | Regional model identity, capacity and voltage must be matched to the Canadian listing. |
| BLACKOUT | Jackery SolarSaga 100 W Air | [B0FX8P4JST](https://www.amazon.ca/dp/B0FX8P4JST?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| BLACKOUT | Kidde C3010 carbon monoxide alarm | [B00FHW7PBS](https://www.amazon.ca/dp/B00FHW7PBS?tag=apocalypsegear-20) | Bloqué | Canadian model and certification evidence are incomplete. |
| FALLOUT | Leatherman Wave+ multi-tool | [B079MJBP21](https://www.amazon.ca/dp/B079MJBP21?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| OUTBREAK | Marmot PreCip rain jacket | [B0CMS33YXX](https://www.amazon.ca/dp/B0CMS33YXX?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| OUTBREAK | Mechanix Wear M-Pact work gloves | [B00939MRAA](https://www.amazon.ca/dp/B00939MRAA?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| OUTBREAK | Merrell Moab 3 Mid Waterproof hiking boots | [B0987Z7CKY](https://www.amazon.ca/dp/B0987Z7CKY?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| BLACKOUT | Midland ER310 emergency radio | [B015QIC1PW](https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20) | Bloqué | The manufacturer guide contains conflicting 2600 / 3500 mAh rechargeable-battery figures. Match the supplied battery revision and instructions before enabling this link. |
| FALLOUT | NANUK 904 first aid kit | [B0G3XYHL33](https://www.amazon.ca/dp/B0G3XYHL33?tag=apocalypsegear-20) | Bloqué | The manufacturer lists both 109 and 110 items, and the Canadian filled kit is not distinguished from US fills or an empty case. Resolve the kit inventory and applicable expiry/sterility information. |
| FALLOUT | Reliance Aqua-Tainer 7-gallon water container | [B001QC31G6](https://www.amazon.ca/dp/B001QC31G6?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| FALLOUT | Sawyer Squeeze SP129 water filtration system | [B00B1OSU4W](https://www.amazon.ca/dp/B00B1OSU4W?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |
| FALLOUT | SOL Emergency Bivvy with rescue whistle | [B08NC9BLQ5](https://www.amazon.ca/dp/B08NC9BLQ5?tag=apocalypsegear-20) | Actif | Annonce et vendeur non vérifiés ; consulter les limites du modèle. |

### Anciens blocages : un résolu, six conservés

- **HM50R :** le fabricant recommande la famille ARB-L16 16340, 3,6/3,7 V. Les références 700P et 800P sont traitées comme des révisions documentées. Le lien est permis sans attribuer à l’ASIN des temps de charge, autonomies ou calibrations d’indicateur propres à une autre version. L’annonce reste non vérifiée.
- **Midland :** le guide actuel mentionne 3500 mAh et la FAQ 2600 mAh. Aucune capacité n’est assignée à l’ASIN ; la réserve reste ouverte, sans promesse Weatheradio canadienne.
- **NANUK :** la page mélange 109 et 110 articles, une référence USA et des substitutions possibles. Le contenu canadien exact et les informations médicales restent à établir.
- **EcoFlow :** le formulaire de la page B0BVLPGS79 contient l’ASIN sélectionné B0D2HX1ZS9. Aucun remplacement silencieux de code.
- **Explorer 300 :** contradictions de capacité, chimie et tension ci-dessus ; le maintien reste nécessaire.
- **INIU :** le numéro de pièce P62-E1 est partiellement corroboré dans le détaillant, mais ni le câble exact ni les preuves canadiennes de sécurité ne sont établis.
- **Kidde :** le fabricant canadien décrit C3010-CA ; le lien vers C3010/21010045 US ne prouve pas l’équivalence ou le marquage canadien requis.

[Preuves et méthode](qa/phase4-2/research-evidence.json). L’inaccessibilité technique d’une annonce n’est pas traitée comme preuve d’invalidité. Les sept URL canoniques OUTBREAK n’étaient pas lisibles par le lecteur public ; leurs annonces, vendeurs et variantes ne sont pas déclarés vérifiés. Les décisions de lien reposent sur la revue du modèle, les précautions, la validation locale des URL et l’absence d’anomalie importante établie, conformément à la règle autorisée par le propriétaire. Un nouveau produit ne reçoit pas automatiquement une autorisation par la seule présence de son URL.

## Protections OUTBREAK

- **9205+ :** protection contre certaines particules non huileuses, sans protection contre gaz/vapeurs ou manque d’oxygène ; ajustement, formation/fit testing applicables et alertes 3M sur les contrefaçons. La référence NIOSH documente le modèle et n’authentifie pas le vendeur ou le lot.
- **GG501SGAF :** normes documentées par 3M Canada et variantes de lentille/sangle distinguées ; vérifier les marquages réels. Aucune protection universelle biologique ou de tout le visage promise.
- **M-Pact :** ni barrière biologique ni garantie contre perforations, aiguilles ou morsures. Les performances d’une nouvelle génération ne sont pas appliquées à une annonce non vérifiée.
- **Moab :** aucune disponibilité de pointure ou largeur inventée. Une sélection de taille peut changer l’ASIN.
- **PreCip :** les caractéristiques de la référence Eco sont étiquetées comme telles, sans les attribuer à la génération inconnue de l’annonce.
- **GPSMAP 67i :** abonnement compatible actif et activation pour messagerie/SOS satellite ; limites de couverture, visibilité du ciel et règles locales ; aucune garantie de secours.

## Déclaration, design, SEO et accessibilité

Les grands encadrés répétitifs sont remplacés par une mention compacte contenant **As an Amazon Associate I earn from qualifying purchases.** et un lien vers `/affiliate-disclosure/`. La mention demeure visible près des boutons et le pied de page/page complète sont conservés. Les titres, descriptions et boutons ne sont pas réduits.

Les légendes utilisent **10,5 px**, un gris secondaire contrasté, interligne 1,35, marges réduites et aucun cadre. Les trois collections gardent leur identité : ambre, rouge et vert tactique lumineux `#b6f566`. Le bunker et ses variantes sont inchangés. Les conseils réels restent séparés des scénarios fictifs.

Les 21 fiches demeurent draft/informatives/noindex, sans faux Product/Offer/Review/AggregateRating. Le sitemap conserve les cinq pages indexables ; la visibilité et les liens affiliés n’impliquent pas une approbation SEO complète. Les titres, descriptions, H1, canoniques, images, fragments et liens internes sont validés.

Le statut de participation initiale reste distinct de l’approbation finale, conformément aux pages officielles Amazon relues. `AMAZON_CA_LINKING_ENABLED=true` et `AMAZON_CA_FINAL_APPROVAL_CONFIRMED=false`. Les informations privées du compte proviennent du propriétaire ; aucune validation finale n’est inventée.

## Tests exécutés

| Contrôle | Résultat |
|---|---|
| npm run check | 60 fichiers, 0 erreur / avertissement / hint |
| npm test | 37/37 réussis |
| npm run test:products | Réussi ; fixtures temporaires actives/inactives et publication, données réelles restaurées |
| npm run test:images | Réussi ; 21 associations, 20 illustrations permises, 1 rejetée ; variantes, SHA, métadonnées et préservation vérifiées |
| npm run build | 28 pages HTML, dont 21 fiches |
| npm run test:site | 815 références internes, 5 URL sitemap, canoniques/robots/JSON-LD/médias validés |
| npm run test:browser | 47/47 réussis ; Chromium et axe, six largeurs de 320 à 1920 px |
| Diagnostic commercial | 15 actifs / 21 ; --require-all retourne 1 attendu pour les six maintiens |

Les 45 ouvertures des URL enregistrées sont intégralement interceptées et servies localement : aucun faux clic vers Amazon ni achat. Les sources 480/960 px sont vérifiées au premier chargement dans des contextes neufs. Navigation clavier, menu mobile, lien d’évitement et fonctionnement sans JavaScript sont couverts. Les deux premiers échecs de test (HMR de développement, cache d’image à la réduction de viewport) ont été corrigés ; les passes suivantes sont vertes. Il ne s’agit pas de tests physiques des équipements, d’une certification WCAG exhaustive ou de tests sur appareils physiques/Safari/Firefox.

`images:build`, générateur historique des médias Phase 3, n’est pas relancé : cela recomprimerait inutilement les assets à préserver. Les nouveaux PNG sont optimisés séparément, leur livraison étant contrôlée par test:images et test:site. [Résultats structurés](qa/phase4-2/test-results.json).

## Captures et verdict

| Vue | Ordinateur | Téléphone |
|---|---|---|
| Catalogue | [1440 px](qa/phase4-2/catalogue-1440.webp) | [375 px](qa/phase4-2/catalogue-375.webp) |
| BLACKOUT | [1440 px](qa/phase4-2/blackout-1440.webp) | [375 px](qa/phase4-2/blackout-375.webp) |
| FALLOUT | [1440 px](qa/phase4-2/fallout-1440.webp) | [375 px](qa/phase4-2/fallout-375.webp) |
| OUTBREAK | [1440 px](qa/phase4-2/outbreak-1440.webp) | [375 px](qa/phase4-2/outbreak-375.webp) |

Les dimensions du tableau désignent les viewports capturés. L’export WebP de la très longue capture catalogue mobile est réduit à 16000 px de hauteur pour respecter la limite du format ; les PNG originaux restent disponibles dans le dossier QA local. Cette adaptation de capture ne touche aucune illustration produit.

**Verdict technique : MERGE pour cette livraison de catalogue sûre**, sous réserve de la revue du propriétaire et de la CI de la PR. Cela n’équivaut pas à une autorisation pour 21 liens actifs ou à l’acceptation du PNG Explorer 300. Les six liens et le visuel rejeté restent protégés. Une seule PR est prévue sur la branche Phase 4.2 ; aucune fusion ni publication n’a été effectuée.
