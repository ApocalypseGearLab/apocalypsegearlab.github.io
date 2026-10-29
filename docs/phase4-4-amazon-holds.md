# Phase 4.4 — Liens Amazon.ca et cartes commerciales

Revue documentaire du 29 octobre 2026. Base : dernier main après fusion de la [PR nº 11](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/11), commit e3f65a79895fc66215d42bdd1cbd29372a648c7d. Branche unique : feat/phase4-4-resolve-amazon-commercial-holds. Aucune fusion ni publication effectuée.

## Résultat commercial

**18 liens actifs sur 26, 8 bloqués**, contre 17 actifs et 9 bloqués auparavant. Les 26 fiches informatives restent visibles dans le catalogue, leur collection et leur URL individuelle. Le GC-01 est le seul nouveau lien autorisé. Les 17 décisions actives préexistantes sont conservées ; cela ne constitue pas une nouvelle vérification de leurs offres en temps réel.

Tous les liens enregistrés restent inchangés, avec le tag apocalypsegear-20. Les liens actifs conservent View on Amazon.ca, target=_blank, rel="sponsored nofollow noopener", déclaration Amazon et suivi des clics sortants. L’accès initial aux liens demeure activé ; **AMAZON_CA_FINAL_APPROVAL_CONFIRMED reste false**. Aucune confirmation privée de compte, de vendeur, de prix, de stock ou d’authenticité n’est inventée.

| Produit | ASIN | Avant | Après | Preuve | Blocage ou limite restante |
|---|---|---|---|---|---|
| FNIRSI GC-01 Geiger Counter | B0BHH9X1WG | Bloqué | **Actif** | Représentation Amazon.ca ancienne : ASIN, FNIRSI, GC-01, jaune, une unité. | Plage/calibration et offre actuelle non garanties ; maximum contradictoire retiré. |
| ReadyWise 84 Servings Gluten-Free Emergency Food Supply | B00TX5J74S | Bloqué | Bloqué | Page fabricant et quatre étiquettes de référence. | Assortiment canadien, dessert, allergènes et lot non établis. |
| S.O.S. Emergency Food Rations — 3600 Calories | B00W20PIHQ | Bloqué | Bloqué | Fiche nutritionnelle officielle : neuf portions, 410 kcal. | Nombre de paquets et étiquettes du lot canadien non établis. |
| NANUK 904 first aid kit | B0G3XYHL33 | Bloqué | Bloqué | Canada FSA03 et US FSA02 documentés séparément. | ASIN/trousse remplie non reliés ; contenu, dates et emballages stériles à établir. |
| EcoFlow RIVER 2 Pro | B0BVLPGS79 | Bloqué | Bloqué | Représentation Amazon.ca : sélection B0D2HX1ZS9, modèle EFR620, pièce EFR617. | ASIN/variante et configuration électrique canadienne contradictoires. |
| Jackery Explorer 300 | B082TMBYR6 | Bloqué | Bloqué | ASIN/JE-300E documentés ; manuel original et FAQ fabricant. | Chimie, capacité/révision et sortie électrique non réconciliées. |
| Midland ER310 emergency radio | B015QIC1PW | Bloqué | Bloqué | Guide, FAQ, instructions et batterie fabricant BATT26L. | ER310 et configuration de l’offre canadienne non établis ; capacité seule non bloquante. |
| Kidde C3010 carbon monoxide alarm | B00FHW7PBS | Bloqué | Bloqué | Kidde Canada déclare C3010-CA « CSA Listed ». | Cette déclaration ne relie pas B00FHW7PBS au modèle canadien certifié. |
| INIU P62 20000 mAh 65 W power bank | B0DB888L9F | Bloqué | Bloqué | Champ Amazon.ca P62-E1 et documentation fabricant. | Câble, configuration et documentation de sécurité de la révision vendue incomplets. |

## Méthode et portée des preuves

Les sources fabricant, instructions et représentations publiques Amazon.ca ont été comparées. Un échec de lecture ne prouve ni validité ni invalidité d’une annonce. Aucun accès privé au compte, essai physique, achat, mesure indépendante, inspection d’un lot livré ou authentification de vendeur n’a eu lieu. Aucun ASIN n’a été remplacé. La [matrice structurée](qa/phase4-4/evidence-matrix.json) distingue identité, ASIN, configuration, faits fiables, contradictions, sécurité, corrections et preuves manquantes pour chaque produit. L’[état commercial complet](qa/phase4-4/product-status.json) expose les 26 décisions effectives.

Le GC-01 possède une correspondance documentaire explicite ASIN/modèle dans une représentation canadienne dont le lecteur annonce un crawl vieux d’environ cinq mois. Elle n’est pas présentée comme une offre actuelle vérifiée. Le maximum contradictoire a été retiré des spécifications publiques ; aucune valeur n’a été choisie, aucune précision professionnelle ou sécurité nucléaire n’est garantie. La permission de lien ne transforme pas la fiche en recommandation ou en test : listingVerified=false, lastVerified=null, safetyStatus=pending et publicationApproved=false sont conservés.

Pour les huit autres produits, les doutes concernent l’identité/configuration, la conformité ou le contenu vendu ; ils ne sont pas simplement des erreurs techniques du lecteur ou l’attente d’approbation finale Amazon. Les trois protections fixes Kidde/INIU/Explorer 300 sont intégralement conservées.

## Corrections des neuf fiches

### FNIRSI GC-01 Geiger Counter

Lien enregistré : [B0BHH9X1WG](https://www.amazon.ca/dp/B0BHH9X1WG?tag=apocalypsegear-20) — actif sur le site.

- Identité documentaire ASIN/modèle établie dans une source primaire canadienne.
- Maximum numérique incertain retiré des spécifications commerciales ; aucune valeur n’est choisie arbitrairement.

Contradictions et limites : Plage fabricant : caractéristiques 0–10 000 µSv/h, tableau 0–1 000 µSv/h avec conversion entre parenthèses incompatible. Plage exacte, calibration, révision livrée et offre/vendeur actuels non établis ; ces limites sont publiées et aucun usage de sûreté n’est garanti.

Preuves exactes encore utiles pour une publication éditoriale complète, sans recréer un blocage du lien :

- Pour une publication éditoriale complète : capture actuelle de la sélection canadienne et manuel de la révision livrée ; confirmation fabricant de la plage si elle doit être chiffrée.

Sources : [1](https://www.amazon.ca/Geiger-Counter-Nuclear-Radiation-Detector/dp/B0BHH9X1WG), [2](https://www.fnirsi.com/products/gc-01), [3](https://www.cnsc-ccsn.gc.ca/eng/resources/emergency-management-and-safety/protecting-your-family-during-a-nuclear-emergency.cfm).

### ReadyWise 84 Servings Gluten-Free Emergency Food Supply

Lien enregistré : [B00TX5J74S](https://www.amazon.ca/dp/B00TX5J74S?tag=apocalypsegear-20) — non cliquable sur le site.

- Distinction explicite entre marketing fabricant, calcul documentaire et contenu réel du lot Amazon ; aucune mesure du lot n’est inventée.

Contradictions et limites : Total marketing 15 420 ≠ calcul documentaire 15 180 ; aucun des deux ne vérifie un lot livré. Dessert décrit comme yogourt dans la liste et pudding vanille dans la rubrique nutrition. Assortiment canadien, dessert, étiquettes et conditionnement exacts non confirmés.

Preuves exactes encore utiles :

- Capture Amazon.ca montrant URL/ASIN B00TX5J74S, titre, variante sélectionnée « 84 servings — gluten-free », nombre de seaux et contenu vendu.
- Liste des recettes/sachets du SKU canadien, photographies de leurs étiquettes nutritionnelles et allergènes, et dessert inclus.
- Dates/lot ou politique de fraîcheur du vendeur et conditions fabricant ; une capture de prix ou une simple URL ne suffit pas.

Sources : [1](https://readywise.com/collections/master-collection/products/84-serving-gluten-free-grab-and-go-bucket-1), [2](https://cdn.shopify.com/s/files/1/0063/3818/3250/files/RW-GFteriyakirice.png?v=1696354528), [3](https://cdn.shopify.com/s/files/1/0063/3818/3250/files/RW-GFheartytortillasoup.png?v=1696354528), [4](https://cdn.shopify.com/s/files/1/0063/3818/3250/files/RW-GFpotpie.png?v=1696354528), [5](https://cdn.shopify.com/s/files/1/0063/3818/3250/files/RW-GFvanillapudding.png?v=1696354528).

### S.O.S. Emergency Food Rations — 3600 Calories

Lien enregistré : [B00W20PIHQ](https://www.amazon.ca/dp/B00W20PIHQ?tag=apocalypsegear-20) — non cliquable sur le site.

- La désignation commerciale est distinguée d’un total nutritionnel mesuré ; aucune déduction 7 200 kcal.

Contradictions et limites : 9 × 410 = 3 690, différent de la désignation 3 600 ; le lot et sa révision ne sont pas établis. Nombre de paquets et étiquettes du lot canadien inconnus.

Preuves exactes encore utiles :

- Capture Amazon.ca de B00W20PIHQ avec la sélection du lot et le nombre exact de paquets vendus.
- Faces avant/arrière ou document fournisseur correspondant au paquet : nom, poids, ingrédients/allergènes, portions et nutrition.
- Dates de fabrication/péremption ou politique du lot ; pas de promesse de cinq ans restants sans preuve.

Sources : [1](https://sosfoodlab.com/wp-content/uploads/2021/07/SOS-3600-KCAL-Emergency-Food-Ration.pdf), [2](https://sosfoodlab.com/faq/).

### NANUK 904 first aid kit

Lien enregistré : [B0G3XYHL33](https://www.amazon.ca/dp/B0G3XYHL33?tag=apocalypsegear-20) — non cliquable sur le site.

- Référence canadienne remplie et SKU FSA03 identifiés ; distinction avec FSA02 américaine ajoutée.
- La lecture du second descriptif évite de déclarer à tort la contradiction américaine résolue.

Contradictions et limites : US : 109 dans le titre/premier aperçu, mais 110 dans une description répétée. Canada : 108 dans le titre et la sélection, mais 110 dans le descriptif. Le fabricant autorise des différences de contenu selon disponibilité. ASIN/SKU/remplissage non reliés ; inventaire réel, dates et conditions de stérilité non établis.

Preuves exactes encore utiles :

- Capture B0G3XYHL33 indiquant explicitement trousse remplie, SKU choisi, région et accessoires inclus.
- Liste datée du contenu du SKU canadien réellement vendu, fournie par NANUK/First Aid Central ou le fournisseur correspondant.
- Informations fournisseur sur péremption et conditionnement stérile ; inspection du lot avant utilisation.

Sources : [1](https://nanuk.com/products/nanuk-904-first-aid-kit), [2](https://nanukcases.ca/products/nanuk-904-first-aid-kit), [3](https://nanuk.com/cdn/shop/files/904_FSA_With_Accessories_US_Specsheet_EN.pdf?v=2436375852341375636).

### EcoFlow RIVER 2 Pro

Lien enregistré : [B0BVLPGS79](https://www.amazon.ca/dp/B0BVLPGS79?tag=apocalypsegear-20) — non cliquable sur le site.

- Le titre, les deux identifiants de modèle/pièce et l’ASIN sélectionné sont désormais distingués explicitement.

Contradictions et limites : ASIN demandé différent de l’ASIN sélectionné. Modèle EFR620 et numéro de pièce EFR617 différents dans les champs de l’annonce. Correspondance exacte du lien et de la variante canadienne non établie. Aucun remplacement ASIN fiable proposé faute de preuve.

Preuves exactes encore utiles :

- Capture de B0BVLPGS79 avec la variante sélectionnée et les détails indiquant l’ASIN final.
- Étiquette du modèle/numéro de pièce, valeurs AC et documentation canadienne correspondant à la station vendue.
- Si le vendeur propose B0D2HX1ZS9 : preuve fabricant ou annonce reliant explicitement les références et différences avant toute modification du lien.

Sources : [1](https://www.amazon.ca/EF-ECOFLOW-Portable-Charging-Generator/dp/B0BVLPGS79), [2](https://ca.ecoflow.com/products/river-2-pro-portable-power-station).

### Jackery Explorer 300

Lien enregistré : [B082TMBYR6](https://www.amazon.ca/dp/B082TMBYR6?tag=apocalypsegear-20) — non cliquable sur le site.

- JE-300E corroboré dans les détails ; la valeur LiFePO4 n’est plus présentée comme chimie certaine.
- Spécifications NCM/110 V/60 W USB-C qualifiées comme références originales uniquement.

Contradictions et limites : Représentation détaillant 292/293 Wh et Lithium Ion, mais titre différenciateur/résumé LiFePO4. Champs régionaux 110/120 V non réconciliés avec un manuel de l’unité. Chimie, capacité nominale et variante électrique réellement vendues non établies.

Preuves exactes encore utiles :

- Capture de la sélection B082TMBYR6 et photographie de la plaque JE-300E/variante effectivement vendue.
- Manuel fabricant canadien de la même révision donnant chimie, capacité, sortie AC et entrées de charge.
- Confirmation fabricant si les titres LiFePO4 et les champs électriques restent contradictoires ; conserver le visuel neutre.

Sources : [1](https://www.amazon.ca/Jackery-Portable-Explorer-Generator-Emergency/dp/B082TMBYR6), [2](https://r.jackery.net/productGuide/Jackery%20Explorer%20300%20user%20manual.pdf), [3](https://faq.jackery.com/hc/en-us/articles/52303678342683-Explorer-300-Basic-Information), [4](https://ca.jackery.com/products/explorer-300-portable-power-station).

### Midland ER310 emergency radio

Lien enregistré : [B015QIC1PW](https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20) — non cliquable sur le site.

- La divergence de capacité seule n’est plus considérée comme blocage commercial suffisant.
- Les sources ne sont pas transformées en histoire de révision inventée.

Contradictions et limites : Guide actuel : 3500 mAh dans les fonctions/options et 2600 mAh dans son tableau ; FAQ et ancienne instruction : 2600. La compatibilité BATT26L ne prouve pas une chronologie de révisions 2600 → 3500. Modèle ER310 et configuration de l’offre canadienne à confirmer.

Preuves exactes encore utiles :

- Capture B015QIC1PW montrant ER310 (pas ER310PRO), variante et contenu de boîte.
- Référence/étiquette du pack fourni ou documentation Midland correspondant au lot ; aucune capacité garantie n’est exigée si elle demeure explicitement non établie.

Sources : [1](https://support.midlandusa.com/hc/en-us/articles/33020284947351-Midland-ER310-Emergency-Crank-Weather-Alert-Radio-Full-User-Guide), [2](https://support.midlandusa.com/hc/en-us/articles/29999147473431-ER310-FAQs), [3](https://midlandusa.com/products/batt26l-e-ready-rechargeable-battery), [4](https://www.canada.ca/en/environment-climate-change/services/weatheradio.html).

### Kidde C3010 carbon monoxide alarm

Lien enregistré : [B00FHW7PBS](https://www.amazon.ca/dp/B00FHW7PBS?tag=apocalypsegear-20) — non cliquable sur le site.

- La déclaration fabricant CSA Listed du modèle canadien est documentée séparément du produit vendu.

Contradictions et limites : Un nom C3010 proche ou une certification UL américaine ne prouve pas l’équivalence canadienne de l’exemplaire. Équivalence ASIN/modèle canadien, marquage et documentation de certification non établis.

Preuves exactes encore utiles :

- Photo lisible du modèle et du marquage canadien figurant sur l’alarme réellement vendue sous B00FHW7PBS.
- Document fabricant ou fichier de certification reliant cette référence exacte au modèle/mark reconnu au Canada.
- Instructions canadiennes correspondantes et informations de remplacement ; un simple texte vendeur « certifié » ne suffit pas.

Sources : [1](https://www.kiddecanada.com/en/products/carbon-monoxide-alarms/c3010-ca).

### INIU P62 20000 mAh 65 W power bank

Lien enregistré : [B0DB888L9F](https://www.amazon.ca/dp/B0DB888L9F?tag=apocalypsegear-20) — non cliquable sur le site.

- Numéro de pièce P62-E1 corroboré ; ambiguïté de nom réduite sans prétendre certifier l’unité.

Contradictions et limites : P62 comme nom abrégé ne suffit pas à spécifier toutes les révisions et le contenu de boîte. La description de protections et le rappel BI-B41, autre modèle, ne constituent pas une preuve de sécurité du lot P62-E1. Configuration livrée, câble et documentation de sécurité exacte incomplets.

Preuves exactes encore utiles :

- Capture B0DB888L9F avec variante/numéro de pièce et contenu de boîte.
- Photos de la plaque du produit et des ports, référence et puissance du câble fourni ; manuel de cette révision.
- Documentation fabricant de sécurité/essais applicable au modèle et au lot concernés, plutôt qu’une simple promesse vendeur ou le rappel d’un autre modèle.

Sources : [1](https://www.amazon.ca/INIU-20000mAh-Compact-Portable-Charger/dp/B0DB888L9F), [2](https://iniushop.com/products/iniu-p62-e1-power-bank-smallest-20000mah-65w), [3](https://iniushop.com/pages/recall-b41).


## Correction des cartes et conservation du site

Les cartes bloquées affichent uniquement le statut court **Amazon link pending verification** et le lien interne **Details**, dont le nom accessible inclut le produit. Les paragraphes commerciaux techniques ont été déplacés/conservés sur les fiches. Aucun faux bouton Amazon actif, aucun lien externe pour les ASIN bloqués et aucun statut non interactif dans le parcours clavier. Les vrais CTA et leur déclaration compacte restent présents pour les 18 produits actifs. Les raisons détaillées des trois blocages fixes sont aussi accessibles dans Where to buy, au lieu d’être masquées par le seul avertissement générique.

Les 26 identités, ASIN, URL, images, catégories, liens entre produits et statuts éditoriaux sont protégés par comparaison avec main. Les 17 JSON non audités sont identiques après normalisation JSON. Le [manifeste de conservation](qa/phase4-4/preservation.json) protège 80 fichiers : médias, manifestes, configuration de compte, taxonomie, politique de publication et workflow de déploiement. Les octets des illustrations et des trois variantes bunker sont inchangés. **Aucune image produit régénérée, remplacée ou recomprimée ; aucun gain WebP revendiqué.** Seules les captures de QA sont exportées séparément en WebP pour le rapport.

Les 26 fiches restent draft, informational, not-tested, noindex/nofollow. Canonicals, cinq URL du sitemap, robots.txt, BreadcrumbList, absence d’Offer/Review/Rating inventés et exclusion des fiches non approuvées du sitemap restent contrôlés. Pas de refonte, de nouvelle dépendance ou de modification des pages légales.

## Validation

| Contrôle | Résultat local définitif |
|---|---|
| npm run check | 62 fichiers, 0 erreur, 0 avertissement, 0 hint |
| npm test | 43 réussis, 0 échec |
| npm run test:products | Trois fixtures publiées, états d’affiliation, véritables blocages et restauration des données validés |
| npm run test:images | 26 associations, 25 illustrations admissibles, Explorer 300 rejeté ; dimensions, empreintes et permissions validées |
| npm run build | 33 pages HTML générées |
| npm run test:site | 1 035 références internes, 5 URL sitemap, robots, canonicals, JSON-LD et filtrage validés |
| npm run release:check | 26 visibles, 18 actifs, 8 bloqués ; approbation Amazon finale false |
| npm run test:browser | **63 réussis, 0 échec**, passe complète en 2,8 min |
| Captures ciblées finales | 2 tests supplémentaires réussis aux largeurs 375 et 1 440 px |

Les contrôles navigateur couvrent les 26 fiches, les trois collections, le catalogue, l’accueil et les pages générales : six largeurs 320/375/768/1024/1440/1920, absence de débordement horizontal, images décodées et routes privées exclues de production. Les tests axe ne signalent aucune violation sur les routes testées avec les tags WCAG 2 A/AA et 2.1 AA. Les huit liens Details sont ouverts au clavier ; les 54 liens actifs (catalogue, collection, fiche) sont ouverts dans des onglets isolés simulés, avec opener=null, tag/ASIN/attributs et suivi contrôlés.

Les quatre nouveaux tests unitaires vérifient les neuf décisions, les identités des 26 produits, l’intégrité des 17 JSON non audités et des 80 fichiers protégés, ainsi que l’impossibilité d’utiliser une source détaillant pour remplacer une preuve technique fabricant. Les sept nouveaux tests navigateur couvrent six largeurs et le clavier. L’élargissement du type de source à retailer documente l’identité GC-01 ; les contraintes de publication ne sont pas assouplies.

Échecs corrigés pendant le travail : citations Amazon sur des ASIN encore bloqués retirées des sources publiques et conservées dans la matrice interne ; comptage des liens de titre adapté à l’ajout de Details ; six assertions anciennes de la première passe navigateur (57/63) mises à jour, puis **suite complète 63/63**. Aucun échec résiduel. [Résultats structurés](qa/phase4-4/test-results.json).

Limites : Chromium sur Windows et CI Linux, dimensions de fenêtre simulées ; pas de certification WCAG exhaustive, de test manuel sur téléphone physique, de Lighthouse ou de validation de disponibilité Amazon. Les ouvertures des liens sont interceptées et servies localement : ce test confirme le comportement des 54 nouveaux onglets, pas la réponse du serveur Amazon.

## Captures comparatives

Les neuf cartes auditées ont été inspectées visuellement à 375 et 1 440 px. La zone de statut bloqué reste inférieure à 115 px dans les six dimensions contrôlées. Aucun chevauchement du texte ou débordement horizontal constaté ; les avertissements courts restent visibles. La hauteur totale réelle du catalogue passe de **23 358 à 22 572 px** à 375 px (−786 px), et de **7 631 à 7 232 px** à 1 440 px (−399 px). Il s’agit d’un allègement de présentation, pas d’un gain de temps de chargement mesuré.

| Vue | Comparatif avant/après | Catalogue final | BLACKOUT final | FALLOUT final | OUTBREAK final |
|---|---|---|---|---|---|
| Téléphone 375 px | [Comparer](qa/phase4-4/catalogue-375-comparison.webp) | [Catalogue](qa/phase4-4/catalogue-375-after.webp) | [BLACKOUT](qa/phase4-4/blackout-375-after.webp) | [FALLOUT](qa/phase4-4/fallout-375-after.webp) | [OUTBREAK](qa/phase4-4/outbreak-375-after.webp) |
| Ordinateur 1 440 px | [Comparer](qa/phase4-4/catalogue-1440-comparison.webp) | [Catalogue](qa/phase4-4/catalogue-1440-after.webp) | [BLACKOUT](qa/phase4-4/blackout-1440-after.webp) | [FALLOUT](qa/phase4-4/fallout-1440-after.webp) | [OUTBREAK](qa/phase4-4/outbreak-1440-after.webp) |

Gros plans des neuf cartes : [mobile 1](qa/phase4-4/audited-cards-375-1.webp), [mobile 2](qa/phase4-4/audited-cards-375-2.webp), [mobile 3](qa/phase4-4/audited-cards-375-3.webp), [desktop 1](qa/phase4-4/audited-cards-1440-1.webp), [desktop 2](qa/phase4-4/audited-cards-1440-2.webp), [desktop 3](qa/phase4-4/audited-cards-1440-3.webp). Les captures de page avant complètes sont également archivées dans ce dossier. Les captures comparatives ciblent EcoFlow, première carte bloquée, pour montrer le changement effectif du CTA.

Les gros plans masquent uniquement l’en-tête fixe pendant la prise de vue pour éviter son recouvrement artificiel par le défilement automatique du moteur de capture ; aucune règle du site n’est modifiée. Les captures de page complète conservent l’en-tête réel. Les exports QA de plus de 16 000 px de haut sont réduits proportionnellement à cause de la limite WebP ; les largeurs de fenêtre et dimensions originales sont consignées dans le [manifeste des captures](qa/phase4-4/captures.json).

## Livraison GitHub

Une seule PR sera ouverte vers main après enregistrement des changements et des preuves de QA. Les résultats GitHub seront ajoutés à sa description après la CI. Aucun déploiement automatique : le workflow de publication existant reste réservé à main, avec déclenchement manuel et confirm_publish=true. Verdict local : prêt à fusionner avec les huit protections maintenues ; cela ne constitue pas une déclaration de 26/26 liens prêts.
