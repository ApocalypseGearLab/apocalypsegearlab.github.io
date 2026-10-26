# Reprise commerciale après PR nº 9 — résultat réel des 14 liens

Contrôle du 26 octobre 2026, America/Toronto. **Résultat commercial : 0/14 boutons réels actifs.** Les 14 fiches restent visibles, avec les 13 illustrations permises et le visuel neutre Explorer 300. L’objectif 14/14 n’est pas revendiqué comme atteint.

## Dépôt et livraison

Au démarrage, la PR nº 9 est encore ouverte et non fusionnée, son head est `02fd0e2f327f7a322c981841b1847f5fa4118124`, et main reste `13d7260cfd7db0ae8b3bcf5b0ddb2433286664a3`. Le dossier local est propre. Pour éviter une seconde PR concurrente contenant les mêmes changements, cette reprise complète **la même PR nº 9**, sur `feat/phase4-1-commercial-corrections`. Aucun changement local existant n’est écrasé ; aucune fusion ni publication déclenchée.

## Participation initiale Amazon.ca

La [documentation canadienne sur l’examen des candidatures](https://associates.amazon.ca/help/node/topic/G8TW5AE9XL2VX9VM), consultée à nouveau, place l’examen après les ventes admissibles, dont au moins trois dans les 180 premiers jours. L’approbation finale n’est pas un préalable global à l’usage initial de liens spéciaux. Les commandes personnelles ne qualifient pas.

La configuration initiale reste donc active : `AMAZON_CA_LINKING_ENABLED = true`. `AMAZON_CA_FINAL_APPROVAL_CONFIRMED = false` reste inchangé. L’accès au compte, le site déclaré, le tag et le formulaire fiscal sont des informations communiquées par le propriétaire ; ils ne sont pas transformés en preuve indépendante d’approbation définitive. Le succès du Vérificateur de liens porte sur un seul lien et son tag, pas sur les 14 annonces. La recherche ciblée des nouveaux messages pertinents n’apporte pas de confirmation supplémentaire du statut privé. Aucun contenu de courriel, adresse ou identifiant privé n’est ajouté au dépôt.

La déclaration requise reste visible au pied de page, dans la page d’affiliation et près des boutons : « As an Amazon Associate I earn from qualifying purchases. » Les éventuelles notifications de retrait, refus ou suspension de la candidature actuelle restent à respecter ; elles ne peuvent être remplacées par une validation de tag. [Operating Agreement, sections 1, 5 et 6](https://associates.amazon.ca/help/operating/agreement).

## Recherches effectuées et limites des preuves

Les 14 URL canoniques Amazon.ca ont été soumises au connecteur de lecture publique ; elles n’y étaient pas accessibles. La recherche a ensuite fourni quelques pages primaires avec URL produit complète, lues avec l’outil web public. Le contenu indexé ancien et la représentation plus récemment récupérée sont distingués. Une occurrence d’ASIN dans une URL, un titre de famille ou un site tiers ne vaut pas automatiquement vérification de la variante sélectionnée.

Trois observations primaires exploitables changent l’audit :

- **EcoFlow :** [la page demandée pour B0BVLPGS79](https://www.amazon.ca/EF-ECOFLOW-Portable-Charging-Generator/dp/B0BVLPGS79) contient un champ de formulaire ASIN `B0D2HX1ZS9`. Le titre RIVER 2 Pro ne résout pas la sélection. L’autre code n’a pas été substitué dans les données.
- **Explorer 300 :** [la représentation récupérée de B082TMBYR6](https://www.amazon.ca/Jackery-Portable-Explorer-Generator-Emergency/dp/B082TMBYR6) conserve cet ASIN mais décrit désormais 292 Wh et LiFePO4. Le profil repose sur la documentation originale NCM/293,8 Wh. L’ancien résultat indexé mentionnant 293 Wh/110 V n’est pas utilisé pour certifier la révision actuelle. L’avertissement public et les blocages sont précisés ; l’image rejetée reste exclue.
- **INIU :** [la page B0DB888L9F](https://www.amazon.ca/INIU-20000mAh-Compact-Portable-Charger/dp/B0DB888L9F) contient P62 dans les informations produit et P62-E1 dans le comparatif. Cela ne tranche ni la révision du câble ni la sécurité canadienne. Le maintien reste en place.

Les autres résultats de recherche ne fournissent pas la preuve suffisante des annonces cibles. Les sources secondaires servent seulement à trouver des pistes, pas à certifier une annonce canadienne. Aucun prix, stock, note, témoignage client, disponibilité ou validation Amazon n’est importé.

21 références fabricant existantes hors PDF ont fait l’objet de lectures HTTP ordinaires : les réussites et refus sont consignés sans contournement. Des sources supplémentaires de soins/usage et la page canadienne Leatherman ont été consultées. Les pages inaccessibles n’ont pas été déclarées relues avec succès. [Preuves et méthode](qa/commercial-activation/research-evidence.json).

## Contrôles réellement terminés

Les revues documentaires **du modèle** et du contenu éditorial sont terminées pour **Wave+, Aqua-Tainer, Sawyer Squeeze et SOL Emergency Bivvy**. Leurs flags correspondants sont actualisés, mais `listingVerified` reste faux et aucune preuve d’annonce fictive n’est créée. Cela ne certifie ni un exemplaire livré ni un vendeur. Les statuts draft, la visibilité informative, `testing: not-tested` et les dates de vérification d’annonce non acquises sont conservés.

- La [page Leatherman Canada](https://ca.leatherman.com/collections/work/products/wave) complète les sources du Wave+ ; la mention d’étui vendu séparément sur cette offre ne se substitue pas au contenu du lot Amazon.
- Les [consignes Reliance](https://relianceoutdoors.com/pages/care-and-use) et sa [FAQ](https://relianceoutdoors.com/pages/faqs) étayent nettoyage, rotation de l’eau, absence d’empilage plein et précautions de gel. Ces limites utiles sont ajoutées au dossier.
- Le [guide Squeeze de Sawyer](https://help.sawyer.com/retail/products/squeeze-water-filter) complète les [limites et précautions de filtration](https://help.sawyer.com/retail/filtration). Le poids du filtre seul n’est plus présenté comme établi pour l’annonce canadienne à partir d’une page donnant un poids de lot.
- La [page fabricant du bivvy SOL](https://www.surviveoutdoorslonger.com/products/emergency-bivvy-with-rescue-whistle), lisible en HTTP ordinaire alors que le lecteur web renvoyait un refus, confirme les dimensions et accessoires du modèle standard. L’absence de température de confort garantie et l’avertissement fabricant restent documentés.

Pour HM50R, les [références globale](https://www.fenixlight.com/product/hm50r-v2-0/) et [américaine](https://www.fenixlighting.com/products/fenix-hm50r-v2-rechargeable-headlamp) décrivent des batteries/révisions différentes ; la réserve devient précise. La [page NANUK](https://nanuk.com/products/nanuk-904-first-aid-kit) contient des comptes de contenu divergents ; l’inventaire canadien, les péremptions et les mentions médicales doivent être établis pour le lot réellement vendu. Le maintien Kidde sur le modèle et la certification canadienne n’est pas levé.

## État produit par produit

Les 14 URL enregistrées restent immuables, sous la forme `https://www.amazon.ca/dp/ASIN?tag=apocalypsegear-20`. Le [fichier détaillé](qa/commercial-activation/product-status.json) contient chaque URL complète et sa décision. Le manque de preuve d’annonce est indépendant de l’approbation finale du compte.

| Produit | ASIN | Revue documentaire | Bouton réel | Vérification exacte encore manquante |
|---|---|---|---|---|
| Jackery Explorer 1000 v2 | `B0D7PPG25F` | À compléter pour la variante | Non | Apparier B0D7PPG25F au JE-1000D canadien, à sa tension et aux preuves de certification applicables ; ne pas substituer l’autre ASIN trouvé. |
| EcoFlow RIVER 2 Pro | `B0BVLPGS79` | À compléter pour la variante | Non | Résoudre le B0BVLPGS79 enregistré face au B0D2HX1ZS9 présent dans le formulaire de la page retrouvée, puis confirmer le modèle canadien. |
| Jackery Explorer 300 | `B082TMBYR6` | À compléter pour la variante | Non | Résoudre la version LiFePO4 292 Wh affichée face au modèle NCM 293,8 Wh documenté, la tension et les instructions exactes ; maintien sensible conservé. |
| Midland ER310 emergency radio | `B015QIC1PW` | À compléter pour la variante | Non | Confirmer ER310 et sa révision de batterie (2600/3500 mAh dans les références). Aucune promesse Weatheradio canadienne. |
| Fenix CL26R Pro rechargeable lantern | `B0CGKWX5YT` | À compléter pour la variante | Non | Apparier le CL26R Pro Grey Camo, sa batterie protégée et les accessoires au bon ASIN canadien. |
| Jackery SolarSaga 100 W Air | `B0FX8P4JST` | À compléter pour la variante | Non | Apparier JS-100H / 100 Air et les câbles/adaptateurs réellement inclus ; préserver l’exclusion Explorer 300. |
| Kidde C3010 carbon monoxide alarm | `B00FHW7PBS` | À compléter pour la variante | Non | Prouver le modèle canadien, le marquage reconnu et les instructions ; C3010 / 21010045 US n’est pas établi équivalent à C3010-CA. |
| INIU P62 20000 mAh 65 W power bank | `B0DB888L9F` | À compléter pour la variante | Non | Résoudre P62/P62-E1 et le câble ; obtenir les preuves canadiennes de sécurité du modèle exact. Le rappel BI-B41 ne valide pas P62. |
| Fenix HM50R V2.0 rechargeable headlamp | `B0H6R34CBL` | À compléter pour la variante | Non | Apparier révision, LED et batterie incluse : ARB-L16-700P global contre ARB-L16-800P dans la référence US. |
| Sawyer Squeeze SP129 water filtration system | `B00B1OSU4W` | Terminée pour le modèle | Non | Fournir la preuve de l’ASIN canadien SP129 et de son inventaire de poches/adaptateurs ; la revue documentaire du filtre est terminée. |
| Reliance Aqua-Tainer 7-gallon water container | `B001QC31G6` | Terminée pour le modèle | Non | Prouver la fiche canadienne B001QC31G6 = 9410-03R / 7 US gal, avec le bouchon/robinet ; ne pas substituer 4 gal. |
| NANUK 904 first aid kit | `B0G3XYHL33` | À compléter pour la variante | Non | Obtenir le SKU canadien rempli, résoudre les comptes 109/110 articles et vérifier contenu, péremptions et indications de stérilité ; aucune conformité professionnelle présumée. |
| Leatherman Wave+ multi-tool | `B079MJBP21` | Terminée pour le modèle | Non | Prouver la variante canadienne Wave Plus, sa finition et le contenu étui/embouts ; la vente actuelle du fabricant canadien mentionne un étui séparé. |
| SOL Emergency Bivvy with rescue whistle | `B08NC9BLQ5` | Terminée pour le modèle | Non | Prouver le bivvy canadien standard 84 × 36 pouces, sa couleur et le lot sifflet/cordon ; distinguer XL et Escape. |

## Corrections techniques effectuées

Les validations qui imposaient à tous les produits `listingVerified=false`, `publicationApproved=false` ou un bouton toujours désactivé sont retirées. Les tests de médias ne figent plus l’état commercial des produits. NANUK n’est plus traité comme un maintien statique dans un test de fixture : il reste bloqué par ses vraies données et vérifications manquantes. Les tests négatifs utilisent des états explicitement non vérifiés ; les maintiens sensibles restent testés par identifiant et ASIN.

Les tests navigateur vérifient maintenant le lien actif ou le bouton en attente selon la décision propre au dossier, avec URL exacte, tag, nouvel onglet, rel et disclosure. Un test positif parcourt les **14 dossiers en simulation**, avec preuves et validations synthétiques non enregistrées : les 11 dossiers sans maintien statique peuvent fournir leur lien ; les 3 maintenus restent bloqués. Il s’agit d’une preuve de fonctionnement du code, jamais de 11 annonces réellement validées.

Le bouton en attente identifie le préalable manquant : identité de l’annonce canadienne, revue de sécurité ou vérification produit. Pour les maintiens, la raison précise est conservée. Aucun blocage nouveau lié à l’attente de l’approbation finale n’est ajouté.

Le diagnostic commercial expose le nombre réel de boutons actifs, la cible, les revues documentaires terminées et `allAmazonCaLinksReady`. L’option `--require-all` échoue tant que les 14 boutons ne sont pas actifs, sans empêcher le build ni le catalogue informatif. Ce contrôle évite de confondre une CI technique verte avec un objectif commercial atteint.

## Tests et résultat de publication

| Contrôle | Résultat réel |
|---|---|
| npm run check | 56 fichiers, 0 erreur/avertissement/hint |
| npm test | 32/32 réussis |
| npm run test:products | Réussi : rendu Astro actif/inactif, preuve de modèle, ASIN/tag, disclosure et maintiens ; restauration des données réelles |
| npm run test:images | Réussi : 13 visuels permis, Explorer 300 exclu ; empreintes des 11 autres illustrations et des 3 variantes du bunker inchangées |
| npm run build | Réussi : 21 pages HTML, dont 14 fiches |
| npm run test:site | Réussi : 527 références internes, 5 URL sitemap, canoniques, indexation et JSON-LD |
| npm run test:browser | 38/38 réussis ; Chromium, axe et six largeurs de 320 à 1920 px |
| release-check.ts (diagnostic normal) | 14 fiches, 0 bouton réel, 4 revues documentaires terminées, 3 maintiens |
| release-check.ts --require-all | Code de sortie **1** : objectif 14/14 **non atteint** ; cet échec commercial est attendu et n’est pas masqué par les tests techniques verts |

[Résultats structurés](qa/commercial-activation/test-results.json), [diagnostic des boutons](qa/commercial-activation/release-readiness.json). Les tests positifs sont simulés et ne créent pas de preuves produit ou d’achats fictifs.

Les 14 pages conservent canoniques, titres, descriptions, H1 et `noindex` adaptés aux fiches informatives en draft. Elles n’émettent pas de Product/Review/Offer/AggregateRating non justifiés. Le sitemap conserve les cinq pages indexables. Images, variantes du bunker, navigation, identité visuelle et workflow de déploiement restent inchangés. Les contrôles axe sont automatisés, sur Chromium et les largeurs 320/375/768/1024/1440/1920 ; ils ne constituent pas une certification WCAG exhaustive ni des tests sur appareils physiques.

## Limite de la vérification navigateur privée

Le contrôle automatique d’approbation a refusé le chemin Computer Use : l’URL du navigateur ne peut pas être vérifiée avec assez de confiance pour garantir le contexte de l’action. Aucun autre outil d’automatisation ou exécution indirecte de cette session n’est utilisé pour contourner le refus. La vérification manuelle des titres, modèles/révisions et contenus, avec ASIN, a été demandée au propriétaire ; le propriétaire a confirmé ne disposer d’aucune preuve supplémentaire. Les tests Playwright locaux du site et la lecture publique autorisée restent indépendants de ce refus.

## Décision et suite

**Verdict commercial : CORRECT.** Le but 14/14 n’est pas atteint : **0/14 actifs, 4 revues de modèle terminées, 3 maintiens sensibles conservés**. La correction technique peut être relue dans l’unique PR nº 9 avec ses validations ; elle n’est pas une promesse de 14 liens opérationnels après fusion.

Pour débloquer chaque ligne, fournir une lecture récente ou un document de l’annonce canadienne exposant ASIN sélectionné, modèle/révision et lot. Résoudre les écarts techniques ou de certification cités ; enregistrer seulement les preuves établies, puis lever les réserves résolues. Les quatre revues terminées ne nécessitent pas une nouvelle autorisation générale du propriétaire. Aucun changement de tag ou d’ASIN n’est proposé silencieusement. Ne pas passer l’approbation finale à vrai sans preuve officielle.

Une fois les preuves complètes, les tests positifs couvrent le parcours d’activation ; le contrôle strict doit alors refléter les activations réelles. Aucune fusion ni exécution de publication Pages n’a été réalisée pendant cette reprise.
