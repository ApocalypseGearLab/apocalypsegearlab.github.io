# S.O.S. — lien Amazon.ca du lot de deux

Revue du 29 octobre 2026, depuis `main` après fusion de la PR nº 13 (`11cfc3963529f2c51ad80a284b4658ecf090277e`). Branche : `feat/sos-two-pack-amazon-link`. Aucun déploiement ni fusion effectué par l’agent.

## Décision commerciale

Autorisation du lien enregistré : **B00W20PIHQ**, `https://www.amazon.ca/dp/B00W20PIHQ?tag=apocalypsegear-20`. Le site préparé passe de **19 à 20 liens actifs sur 26**, avec **six blocages conservés**. Les 26 fiches restent visibles. Le seul JSON produit modifié est celui de S.O.S. ; l’autorisation Midland de la PR nº 13 est conservée.

Les champs utilisateur « 2 PK », « 2 Pack » et « Number of Items 2 » convergent vers un conditionnement de deux paquets. « Unit Count 1512 gram » concorde nominalement avec 9 × 84 g × 2. Cette cohérence documentaire suffit pour autoriser le lien selon les règles existantes ; elle n’authentifie pas un vendeur, ne mesure pas le lot et ne garantit pas sa fraîcheur.

## Preuves et limites

Le propriétaire décrit des captures datées du 29 octobre 2026 et une photo d’étiquette. Aucun fichier de capture ou de photo n’est joint à son message : les champs sont enregistrés comme **transcription utilisateur**, sans prétendre avoir inspecté leurs pixels. La [preuve structurée](qa/sos-two-pack/evidence.json) distingue cette origine de la documentation fabricant. Le lecteur public Amazon.ca reste indisponible ; cet échec n’est pas une preuve que l’annonce serait invalide.

La [fiche nutritionnelle officielle S.O.S.](https://sosfoodlab.com/wp-content/uploads/2021/07/SOS-3600-KCAL-Emergency-Food-Ration.pdf) corrobore neuf portions de 84 g et 410 calories par portion. La [FAQ du fabricant](https://sosfoodlab.com/faq/) documente la durée de conservation annoncée et l’absence d’offre sans gluten. Le champ de poids d’expédition de la fiche de référence n’est pas assimilé à une masse nette mesurée du lot canadien.

L’appellation « 3600 Calorie » est commerciale. Le calcul 9 × 410 = 3 690 utilise les valeurs arrondies de l’étiquette ; il ne mesure pas précisément l’énergie du paquet. **Aucun total nutritionnel exact de 7 200 ou 7 380 kcal n’est revendiqué pour le lot.** Les contenus publics n’attribuent aucun de ces totaux au conditionnement de deux paquets.

Les cinq ans de conservation annoncés partent de la fabrication/du conditionnement, sous les conditions du fabricant. Ils ne garantissent pas cinq années restantes après l’achat. Dates réelles, historique de stockage, ingrédients/allergènes et intégrité des deux scellés doivent être vérifiés à réception. Les avertissements concernant blé, noix de coco, soja, eau potable et diversité alimentaire sont conservés. L’illustration reste conceptuelle et ne sert pas de preuve nutritionnelle ou de certification.

## Protections conservées

La fiche reste `draft`, `informational`, `not-tested`, `noindex, nofollow`, avec `listingVerified=false`, `lastVerified=null`, `safetyStatus=pending` et `publicationApproved=false`. Seule la décision de lien passe à `link-permitted`. Aucune preuve d’approbation finale Amazon n’est inventée ; le commutateur d’affiliation initiale et les blocages Kidde/INIU/Explorer 300 restent applicables.

Le CTA conserve `View on Amazon.ca`, le tag unique `apocalypsegear-20`, `target="_blank"`, `rel="sponsored nofollow noopener"`, la déclaration d’affiliation et le suivi des clics. Prix, stocks, avis et essais physiques ne sont pas inventés. Aucune illustration, aucun fichier WebP produit, aucune règle commerciale, aucun composant ni style du site n’est modifié.

## Validation

| Contrôle | Résultat local |
|---|---|
| Astro check | 62 fichiers, aucun diagnostic |
| npm test | 45 réussis, 0 échec |
| Tests produits | Trois fixtures publiées, affiliation off/on, véritables blocages et restauration validés |
| Tests médias | 26 associations, 25 illustrations autorisées, Explorer 300 rejeté ; médias et bunker conservés |
| Build | 33 pages générées |
| Site / SEO / liens | 1 036 références internes, 5 URL sitemap ; robots, canonicals, JSON-LD et indexation validés |
| Tests navigateur | 63 réussis, 0 échec, en 2.7m |
| Responsive et axe | 320/375/768/1024/1440/1920 px ; aucun débordement horizontal ni violation axe détectée sur les routes testées |
| Liens affiliés | 60 nouveaux onglets simulés, sans trafic Amazon ; tag/ASIN, attributs, déclaration, opener et suivi contrôlés |

Le nouveau test unitaire protège les quantités transcrites, les limites de l’arithmétique nutritionnelle, la durée liée à la fabrication, le statut de brouillon et les autres produits. Les six blocages restants sont toujours testés. [Résultats structurés](qa/sos-two-pack/test-results.json). Pas de certification WCAG exhaustive, de test sur téléphone physique ou de validation de stock/vendeur Amazon.

Le [manifeste de conservation](qa/sos-two-pack/preservation.json) compare les 25 autres produits et le modèle interne au dernier `main`. Ce contrôle courant remplace le contrôle global rattaché au précédent suivi Midland ; les tests spécifiques et le dossier historique Midland restent conservés. Le manifeste Phase 4.4 protège toujours les 80 fichiers médias/configuration/politique. Les anciens rapports restent des instantanés historiques ; les nouveaux totaux figurent dans l’[état commercial de ce suivi](qa/sos-two-pack/product-status.json).

Captures de la carte S.O.S. en production inspectées à [375 px](qa/sos-two-pack/card-375.webp) et [1 440 px](qa/sos-two-pack/card-1440.webp). Le bouton actif, sa déclaration et la légende conceptuelle restent lisibles. Les seuls WebP encodés pour ce suivi sont ces captures de QA, hors site public.

## Livraison

Branche : [feat/sos-two-pack-amazon-link](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/tree/feat/sos-two-pack-amazon-link). [PR associée à cette branche](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pulls?q=is%3Apr+head%3Afeat%2Fsos-two-pack-amazon-link). Le résultat final de la CI est indiqué dans la description de la PR. Les PR nº 12 et nº 13 étant fusionnées, elles ne sont pas modifiées rétroactivement.

Verdict : autoriser le CTA S.O.S. du lot de deux avec les limites nutritionnelles et de conservation documentées ; maintenir les six autres blocages. Aucune fusion ni publication automatique.
