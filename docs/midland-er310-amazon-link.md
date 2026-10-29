# Midland ER310 — autorisation ciblée du lien Amazon.ca

Revue du 29 octobre 2026, depuis `main` après fusion de la PR nº 12 (`7985ad230a520a04352ce93621f9e3313926160f`). Branche : `feat/midland-er310-amazon-link`. Aucun déploiement ni fusion effectué par l’agent.

## Décision

Le lien enregistré pour **B015QIC1PW** est autorisé : `https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20`. Le catalogue passe de **18 actifs / 8 bloqués à 19 actifs / 7 bloqués**. Les 26 fiches restent visibles. Seule la décision Midland est modifiée ; les autres produits, médias, règles commerciales et SEO sont préservés.

La marque Midland, la référence fabricant ER310, la désignation de fiche ER310-MFN et la sélection rouge/noir transmises par le propriétaire sont cohérentes avec la famille ER310 documentée par Midland. Cette concordance autorise l’exposition du lien enregistré ; elle ne prouve pas que toutes les révisions de batterie sont identiques. Aucun document fabricant définissant le suffixe MFN ou l’associant à une capacité précise n’a été trouvé. Aucune caractéristique de l’ER310PRO n’est transférée à cette fiche.

## Provenance des éléments

Le propriétaire décrit les champs de captures Amazon.ca dans son message. **Aucun fichier de capture n’était joint à ce message et aucun pixel de ces captures n’a été inspecté.** Le dossier enregistre donc une **transcription du propriétaire**, sans la rebaptiser capture inspectée, fiche récupérée en direct ou vérification indépendante. La [preuve structurée](qa/midland-er310/evidence.json) conserve les champs et leurs limites. L’échec du lecteur public sur les URL Amazon.ca ne constitue pas une preuve d’invalidité du lien.

Sources fabricant consultées :

- [Produit officiel ER310](https://midlandusa.com/products/er310-portable-emergency-crank-weather-radio) : modèle et fonctions de référence.
- [Guide officiel ER310](https://support.midlandusa.com/hc/en-us/articles/33020284947351-Midland-ER310-Emergency-Crank-Weather-Alert-Radio-Full-User-Guide) : 3 500 mAh dans les fonctions/options et 2 600 mAh dans le tableau ; la contradiction n’est pas résolue.
- [FAQ Midland](https://support.midlandusa.com/hc/en-us/articles/29999147473431-ER310-FAQs) : limites de recharge solaire et des téléphones, référence à 2 600 mAh.
- [Batterie BATT26L](https://midlandusa.com/products/batt26l-e-ready-rechargeable-battery) : compatibilité annoncée pour une génération d’ER310, sans preuve de la révision livrée sous cet ASIN.
- [Avis Weatheradio d’ECCC](https://www.canada.ca/en/environment-climate-change/services/weatheradio.html) : service canadien arrêté.

## Limites conservées

Aucune capacité de batterie ni autonomie garantie ne figure dans les spécifications. Les valeurs contradictoires restent des références documentaires contextualisées. L’acheteur doit vérifier le pack Midland et les instructions de l’unité reçue ; aucun pack universel ou câble arbitraire n’est recommandé. Le contenu exact de boîte, le vendeur et la révision livrée ne sont pas authentifiés. Le solaire et la manivelle restent des sources d’appoint ; aucune recharge de téléphone ou couverture d’alerte NOAA locale n’est garantie. Weatheradio Canada n’est pas présenté comme opérationnel.

La fiche reste `draft`, `informational`, `not-tested`, `noindex, nofollow`, avec `listingVerified=false`, `lastVerified=null`, `safetyStatus=pending` et `publicationApproved=false`. Le nouveau statut concerne uniquement `affiliateReview.decision=link-permitted`. L’approbation finale Amazon reste `false`, le commutateur d’accès initial reste applicable, et les protections fixes Kidde/INIU/Explorer 300 ne changent pas.

Le CTA conserve son libellé `View on Amazon.ca`, son ASIN et le tag `apocalypsegear-20`, `target="_blank"`, `rel="sponsored nofollow noopener"`, sa déclaration d’affiliation et son suivi des clics. Aucun prix, stock, avis, certification ou essai physique n’est inventé.

## Validation et conservation

| Contrôle | Résultat |
|---|---|
| Astro check | 62 fichiers, aucun diagnostic |
| npm test | 44 réussis, 0 échec |
| Tests produits | Trois fixtures publiées, états d’affiliation, blocages fixes et restauration validés |
| Tests médias | 26 associations, 25 illustrations autorisées, Explorer 300 rejeté ; octets préservés |
| Build | 33 pages générées |
| Site / SEO / liens | 1 035 références internes, 5 URL sitemap, robots, canonicals, JSON-LD et filtrage validés |
| Tests navigateur | 63 réussis, 0 échec, en 2,9 min |
| Responsive et axe | 320/375/768/1024/1440/1920 px, aucun débordement horizontal ni violation axe détectée sur les routes testées |
| Liens affiliés | 57 nouveaux onglets simulés localement, aucun trafic envoyé à Amazon ; attributs, tag/ASIN, déclaration, opener et suivi contrôlés |

Le nouveau test unitaire distingue explicitement la transcription propriétaire d’une capture inspectée, protège le statut noindex/brouillon, exclut toute capacité/autonomie garantie et compare les autres JSON à main. Une ancienne attente classait encore Midland comme bloqué ; elle a été adaptée sans retirer les tests des blocages réellement maintenus. [Résultats structurés](qa/midland-er310/test-results.json). Les tests sur fenêtres Chromium ne constituent pas une certification WCAG exhaustive ou un essai sur téléphone physique.

Les [empreintes des autres JSON](qa/midland-er310/preservation.json) protègent les 25 autres produits et le modèle de fiche interne par comparaison avec le dernier `main`. Le manifeste Phase 4.4 continue à protéger les 80 fichiers médias/configuration/politique. Les rapports Phase 4.4 restent des instantanés historiques ; l’[état commercial de ce suivi](qa/midland-er310/product-status.json) donne les nouveaux totaux.

Captures de production inspectées : [carte téléphone, 375 px](qa/midland-er310/card-375.webp) et [carte ordinateur, 1 440 px](qa/midland-er310/card-1440.webp). Le bouton actif est visible, sans modification de l’illustration, de la légende ou des couleurs. Les seuls WebP encodés pour ce suivi sont ces captures de QA, hors site public.

## Livraison

Branche de suivi : [feat/midland-er310-amazon-link](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/tree/feat/midland-er310-amazon-link). [PR associée à cette branche](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pulls?q=is%3Apr+head%3Afeat%2Fmidland-er310-amazon-link). Le résultat final des contrôles GitHub est indiqué dans la description de la PR ; les chiffres ci-dessus sont ceux des validations locales. La PR nº 12 étant déjà fusionnée, elle n’est pas modifiée rétroactivement.

Verdict : autoriser le CTA Midland avec les limites documentées ; conserver les sept autres blocages. Aucune fusion ni publication automatique.
