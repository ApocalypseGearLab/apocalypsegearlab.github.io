# Finalisation des boutons Amazon.ca — liens enregistrés et anomalies concrètes

Contrôle du 26 octobre 2026. **7 liens actifs / 14 produits visibles ; 7 liens bloqués pour anomalies documentées.** Cette livraison complète la PR nº 9 existante, sans fusion ni déploiement.

## Règle appliquée

La demande du propriétaire autorise l’usage des URL déjà enregistrées lorsqu’aucune anomalie concrète n’a été identifiée. L’impossibilité technique de lire Amazon n’est ni une preuve d’invalidité du lien, ni une preuve de conformité. Elle n’entraîne plus à elle seule la désactivation.

L’activation d’un lien ne vaut **pas** vérification de l’annonce, certification, essai physique, approbation éditoriale complète ou approbation finale du compte. Les 14 champs `listingVerified` restent faux, les 14 `lastVerified` restent nuls et aucune `listingEvidence` n’est créée. Les statuts draft, les réserves et les caractéristiques documentées sont conservés.

Une décision `research.affiliateReview`, datée, liée à l’ASIN exact et aux sources existantes, distingue `link-permitted` de `hold`. Les contrôles de domaine, HTTPS, absence d’identifiants/port non standard, chemin `/dp/ASIN`, tag unique et absence de paramètre supplémentaire restent obligatoires. Un nouveau dossier sans revue ne devient pas admissible par la seule présence d’une URL. Les blocages de sécurité et les preuves contradictoires ne sont pas ignorés. Les maintiens Kidde, INIU et Explorer 300 résistent aussi à un simple changement de drapeau ou de slug grâce à leur ASIN.

Les recherches de la reprise précédente sont conservées dans [l’audit documentaire](amazon-ca-activation.md) et ses [preuves](qa/commercial-activation/research-evidence.json). Aucun nouvel accès à la session navigateur Amazon précédemment refusée n’a été tenté. Les observations d’annonces existantes ne sont pas annoncées comme une nouvelle vérification en direct.

## Participation initiale et déclaration

La [procédure canadienne Amazon](https://associates.amazon.ca/help/node/topic/G8TW5AE9XL2VX9VM), relue pour cette correction, prévoit l’examen après les ventes admissibles pendant la période initiale. L’approbation finale n’est donc pas exigée comme verrou général préalable aux liens spéciaux. L’accès au compte, le site déclaré, le formulaire fiscal et le résultat positif du vérificateur de tag sont des informations du propriétaire, pas une confirmation indépendante du statut privé du compte.

`AMAZON_CA_LINKING_ENABLED = true` reste inchangé ; `AMAZON_CA_FINAL_APPROVAL_CONFIRMED = false` reste inchangé. Toute notification effective de suspension, refus ou clôture doit toujours être respectée. [Accord de participation Amazon.ca](https://associates.amazon.ca/help/operating/agreement).

Chaque bouton actif conserve `target="_blank"`, `rel="sponsored nofollow noopener"` et un nom accessible annonçant l’ouverture d’un nouvel onglet et le lien affilié. La déclaration « As an Amazon Associate I earn from qualifying purchases. » est visible près des boutons, sur les cartes, les fiches, dans le pied de page et sur la page de divulgation. Aucun prix, stock, avis ou score n’est ajouté.

## Tableau de livraison

Les liens de cette documentation recensent les URL enregistrées ; seuls les produits marqués actifs ont un lien marchand dans le site public construit. Les titres et variantes des annonces actives ne sont pas déclarés indépendamment vérifiés.

| Produit | ASIN et URL affiliée enregistrée | État | Motif du blocage ou portée de l’activation |
|---|---|---|---|
| Jackery Explorer 1000 v2 | [B0D7PPG25F](https://www.amazon.ca/dp/B0D7PPG25F?tag=apocalypsegear-20) | Actif | Aucune contradiction concrète établie pour ce lien ; fiche et limites JE-1000D conservées, annonce et certification de l’exemplaire non vérifiées. |
| EcoFlow RIVER 2 Pro | [B0BVLPGS79](https://www.amazon.ca/dp/B0BVLPGS79?tag=apocalypsegear-20) | Bloqué | La page récupérée contient l’ASIN sélectionné B0D2HX1ZS9 : résoudre la correspondance avant activation. |
| Jackery Explorer 300 | [B082TMBYR6](https://www.amazon.ca/dp/B082TMBYR6?tag=apocalypsegear-20) | Bloqué | Version affichée 292 Wh LiFePO4 face au modèle original NCM 293,8 Wh documenté ; chimie, capacité et tension régionale à résoudre. |
| Midland ER310 | [B015QIC1PW](https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20) | Bloqué | Le guide fabricant donne 2600 et 3500 mAh : batterie et instructions de la révision vendue à apparier. Aucune promesse Weatheradio canadienne. |
| Fenix CL26R Pro | [B0CGKWX5YT](https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20) | Actif | Couleur et accessoires non vérifiés, sans anomalie concrète établie ; précautions de batterie protégée conservées. |
| Jackery SolarSaga 100 W Air | [B0FX8P4JST](https://www.amazon.ca/dp/B0FX8P4JST?tag=apocalypsegear-20) | Actif | Limites JS-100H conservées, dont l’exclusion Explorer 300 ; aucun lot de câbles ni compatibilité non établie promis. |
| Kidde C3010 | [B00FHW7PBS](https://www.amazon.ca/dp/B00FHW7PBS?tag=apocalypsegear-20) | Bloqué | C3010 / 21010045 US non établi équivalent à C3010-CA ; marquage canadien et instructions exactes requis. |
| INIU P62 | [B0DB888L9F](https://www.amazon.ca/dp/B0DB888L9F?tag=apocalypsegear-20) | Bloqué | P62/P62-E1 et câble intégré/détachable contradictoires ; sécurité canadienne exacte incomplète. |
| Fenix HM50R V2.0 | [B0H6R34CBL](https://www.amazon.ca/dp/B0H6R34CBL?tag=apocalypsegear-20) | Bloqué | Sources fabricant divergentes sur LED et batterie ARB-L16-700P/800P ; cellule et instructions à apparier. |
| Sawyer Squeeze SP129 | [B00B1OSU4W](https://www.amazon.ca/dp/B00B1OSU4W?tag=apocalypsegear-20) | Actif | Revue documentaire du filtre terminée ; lot et vendeur non vérifiés, limites de filtration et précautions de gel conservées. |
| Reliance Aqua-Tainer 7 gallons | [B001QC31G6](https://www.amazon.ca/dp/B001QC31G6?tag=apocalypsegear-20) | Actif | Revue documentaire du modèle terminée ; accessoires non promis, nettoyage, gel et empilage à vide explicités. |
| NANUK 904 First Aid Kit | [B0G3XYHL33](https://www.amazon.ca/dp/B0G3XYHL33?tag=apocalypsegear-20) | Bloqué | Comptes 109/110 articles divergents ; lot canadien rempli/boîte vide, contenu et informations de péremption/stérilité non résolus. |
| Leatherman Wave+ | [B079MJBP21](https://www.amazon.ca/dp/B079MJBP21?tag=apocalypsegear-20) | Actif | Revue documentaire terminée ; finition/étui/embouts non promis, précautions outils non isolés conservées. |
| SOL Emergency Bivvy | [B08NC9BLQ5](https://www.amazon.ca/dp/B08NC9BLQ5?tag=apocalypsegear-20) | Actif | Revue documentaire terminée ; couleur/accessoires non vérifiés, aucune température de confort garantie. |

## Affichage et conservation

Le même composant applique la décision sur `/gear/`, `/blackout/`, `/fallout/`, les fiches individuelles et leurs cartes associées. Le catalogue affiche sept boutons actifs et sept boutons désactivés avec motif ; BLACKOUT en affiche trois actifs sur neuf, FALLOUT quatre actifs sur cinq. Le blocage d’un produit ne désactive pas les cartes d’autres produits présentes sur sa fiche.

Les messages publics ne prétendent plus qu’un modèle lié possède une annonce et une sécurité vérifiées. Les légendes conceptuelles, les 13 illustrations permises, le visuel neutre Explorer 300, les corrections Wave+/Aqua-Tainer et les trois variantes WebP du bunker sont conservés. Aucun asset produit n’est remplacé, régénéré ou recomprimé dans cette correction.

L’activation des liens ne modifie pas l’indexation des fiches draft : leurs canoniques, titres, descriptions, H1 et `noindex, nofollow` restent présents. Pas de Product/Offer/Review/AggregateRating injustifié ; le sitemap reste limité aux cinq pages indexables.

## Validation

| Contrôle exécuté | Résultat réel |
|---|---|
| npm run check | 57 fichiers, 0 erreur, 0 avertissement, 0 hint |
| npm test | 36/36 réussis |
| npm run test:products | Réussi : fixtures Astro actives/inactives, ASIN/tag, disclosure, maintiens, restauration des vraies données |
| npm run test:images | Réussi : 13 illustrations permises, Explorer 300 rejeté, empreintes des images conservées et du bunker inchangées |
| npm run build | 21 pages HTML, dont les 14 fiches |
| npm run test:site | 553 références internes ; 5 URL sitemap ; liens actifs/bloqués sur toutes les cartes et fiches, déclarations, SEO et médias validés |
| npm run test:browser | 39/39 réussis ; Chromium, axe, largeurs 320/375/768/1024/1440/1920 px |
| release-check.ts --require-ready | Code 0 : au moins un lien actif, sept en réalité |
| release-check.ts --require-all | Code 1 attendu : objectif 14/14 non atteint |

[Diagnostic par produit](qa/amazon-ca-buttons/product-status.json) · [Catalogue ordinateur](qa/amazon-ca-buttons/catalogue-1440.webp) · [Catalogue téléphone](qa/amazon-ca-buttons/catalogue-375.webp).

Les captures locales ont été inspectées, notamment la carte CL26R Pro sur téléphone, les boutons actifs et les raisons des blocages. Les fichiers WebP de cette section sont des captures QA, sans remplacement ni recompression des illustrations de produits. Les contrôles axe automatisés sur Chromium ne constituent pas une certification WCAG exhaustive ni des tests sur appareils physiques. Aucun essai de produit n’a été effectué.

Les tests de clic ouvrent les URL réellement enregistrées dans des onglets **entièrement interceptés et servis localement** : ils vérifient le bouton, le tag, le nouvel onglet et `window.opener === null`, sans envoyer de trafic affilié, sans accès à une session Amazon et sans achat. Ils ne prouvent pas l’existence, le titre, le vendeur, la disponibilité ou la conformité de l’annonce distante.

## Verdict

La correction permet l’activation des sept liens sans anomalie concrète identifiée et maintient les sept réserves justifiées. La cible universelle 14/14 n’est pas atteinte et n’est pas revendiquée. Le diagnostic strict `--require-all` doit continuer d’échouer tant que ces réserves existent. Aucune approbation Amazon ni preuve de sécurité/annonce n’est inventée. L’unique PR nº 9 est soumise à revue, sans fusion ni déploiement automatique.
