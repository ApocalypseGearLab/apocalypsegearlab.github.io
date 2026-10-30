# Phase 4.6 — Filtres et cartouches 3M OUTBREAK

Revue documentaire du 29 octobre 2026. Base distante réellement vérifiée : `main`, commit `f027d539fd2b4621fc55ec4b103dcdc63245d0ee`, après fusion de la [PR ReadyWise nº 15](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/15) le 29 octobre 2026 à 23:49:40 UTC. La branche de travail est `feat/outbreak-3m-respirator-filters`.

## Catalogue et décisions commerciales

Le catalogue passe de **26 à 29 profils informatifs** : BLACKOUT reste à neuf, FALLOUT à neuf, OUTBREAK passe de huit à onze. Les 26 anciens JSON et le modèle interne sont conservés intégralement, notamment les titres, ASIN, liens, statuts et illustrations. Les décisions Midland, S.O.S. et ReadyWise ne sont pas réévaluées ni modifiées.

Les trois nouvelles URL sont préparées avec l’unique tag `apocalypsegear-20`. Le lecteur web public n’a pu récupérer aucune des trois annonces Amazon.ca. Aucune capture Amazon indépendante n’est jointe à cette phase. L’inaccessibilité technique n’est pas une preuve de lien invalide, mais elle ne satisfait pas la vérification explicite des quantités exigée par la Phase 4.6.

| Modèle / profil | ASIN / URL enregistrée | Conditionnement rapporté | Quantité Amazon vérifiée | Nouveau CTA |
|---|---|---|---|---|
| [3M 60921](https://apocalypsegearlab.github.io/gear/3m-60921-organic-vapor-p100-cartridges/) | [B07571LR2K](https://www.amazon.ca/dp/B07571LR2K?tag=apocalypsegear-20) | Une paire, deux cartouches | **Non** | En attente |
| [3M 60926](https://apocalypsegearlab.github.io/gear/3m-60926-multi-gas-vapor-p100-cartridges/) | [B009POHLRC](https://www.amazon.ca/dp/B009POHLRC?tag=apocalypsegear-20) | Une paire, deux cartouches | **Non** | En attente |
| [3M 2097](https://apocalypsegearlab.github.io/gear/3m-2097-p100-particulate-filters/) | [B07FMJPFTY](https://www.amazon.ca/dp/B07FMJPFTY?tag=apocalypsegear-20) | Cinq paires, dix filtres | **Non** | En attente |

Les liens de profils ci-dessus sont les routes prévues **après fusion et déploiement**, pas une affirmation de mise en ligne déjà réalisée. Les URL Amazon sont des données enregistrées dans la documentation ; aucune URL des trois ASIN en attente n’est exposée comme lien cliquable dans le site construit, y compris dans ses sources et cartes associées. Un statut compact et un lien « Details » mènent à l’explication sur la fiche.

Pour lever chaque attente, il faut une preuve exploitable de l’annonce canadienne sélectionnée montrant simultanément la marque 3M, le modèle exact, l’ASIN, la variante et le conditionnement ci-dessus. Vérifier aussi le vendeur et la provenance du produit, sans utiliser l’illustration comme preuve d’authenticité. Aucune approbation finale Amazon Associates n’est inventée, aucun blocage administratif nouveau n’est ajouté et le mécanisme existant d’autorisation reste intact.

État commercial calculé sur les données réelles : **21 liens actifs et huit liens bloqués sur 29 produits**, contre 21/5 sur 26 au départ. Les trois nouvelles attentes s’ajoutent aux cinq antérieures ; aucune décision ancienne n’est modifiée.

## Documentation technique et limites

Les fiches publiques sont entièrement rédigées en anglais. Elles distinguent les champs suivants à partir des sources officielles :

| Référence | Portée documentée | Distinction essentielle |
|---|---|---|
| 60921 | Certaines vapeurs organiques et particules P100 | Ce n’est pas une cartouche multi-gaz |
| 60926 | Particules P100 et gaz/vapeurs expressément listés par 3M | « Multi-gas » ne signifie pas tous contaminants, toutes concentrations ou toutes situations |
| 2097 | Particules P100 ; soulagement des odeurs organiques au niveau « nuisance » | Ne remplace pas une cartouche choisie pour des gaz/vapeurs dangereux ; les limites d’exposition applicables priment |

Les trois pages canadiennes présentent des conditionnements de caisse fabricant : 30 paires pour 60921/60926 et 50 paires pour 2097. **Ces nombres ne vérifient pas le lot commercial Amazon.** Les dix filtres représentés ne prouvent pas davantage le contenu du colis.

La compatibilité avec le 6800 s’appuie sur les pages 3M Canada et la notice des masques complets 6000 : tableaux des cartouches et filtres aux pages imprimées 8–9 et instructions d’installation à la page 10. Cette notice cite les trois références et l’installation du second composant. Les notices des composants complètent les limitations et les procédures ; elles ne sont pas utilisées seules pour extrapoler une approbation d’ensemble.

Les précautions expliquent l’emploi de **deux composants identiques et compatibles**, la sélection selon le contaminant/concentration, l’ajustement, les essais d’ajustement, la formation et le contrôle d’étanchéité. Un contrôle d’étanchéité ne remplace pas un essai d’ajustement. Les instructions et étiquettes d’approbation de l’ensemble livré restent déterminantes.

Aucun composant ne fournit d’oxygène. Les fiches excluent les atmosphères déficientes en oxygène, inconnues ou immédiatement dangereuses pour la vie ou la santé (IDLH). Elles ne promettent pas une protection absolue contre les rayonnements, agents biologiques ou armes chimiques ; la filtration de particules ne constitue ni un blindage contre les rayonnements ionisants ni une garantie contre l’infection. Aucun essai physique, certification d’un exemplaire livré ou avis utilisateur n’est inventé.

Les consignes de remplacement sont conditionnelles aux instructions et à l’application, sans durée universelle. Les trois profils restent `draft`, `informational`, `not-tested`, `listingVerified=false`, `publicationApproved=false`, `safetyStatus=pending`, `lastVerified=null`, avec `noindex, nofollow`. Aucun schéma Product/Offer/Review/AggregateRating n’est ajouté aux brouillons. Aucun prix, disponibilité ou note n’est publié.

## Images et intégration du 6800

Les trois PNG fournis ont été ouverts et inspectés directement. L’instruction du propriétaire d’utiliser ces visuels finaux est enregistrée comme autorisation d’intégration de ces trois fichiers uniquement. Ce n’est pas un audit indépendant de chaîne de droits, une approbation 3M ou une preuve de droits sur une photographie de référence non divulguée.

- `3m-60921-outbreak` : deux cartouches roses avec bande noire.
- `3m-60926-outbreak` : deux cartouches roses avec bande olive/jaune.
- `3m-2097-outbreak` : dix filtres ronds roses, cinq paires visuelles.

Le cadrage carré, les cadres HUD, le halo vert et les couleurs produits sont conservés. Les inscriptions de lot, dates, microtexte et mentions de certification de ces illustrations synthétiques ne sont pas présentées comme des étiquettes authentiques. La légende discrète existante « Concept illustration, not a product photograph » et l’avertissement de fiche sur les inscriptions restent présents.

Chaque PNG est encodé une fois en trois variantes WebP **480, 960 et 1 254 px**, qualité 83, effort 6, sans recadrage, recoloration ou agrandissement. Les images sont servies par le mécanisme existant avec dimensions intrinsèques, `srcset`, `sizes`, chargement différé des cartes et texte alternatif descriptif. Les sources PNG originales restent intactes dans Downloads ; les neuf WebP, le manifeste CSV et leurs empreintes sont enregistrés dans le dépôt. Aucun autre média ni variante du bunker n’est recomprimé.

Les trois PNG totalisent **7 705 420 octets**. Les trois WebP pleine définition totalisent **862 708 octets**, soit **88.8 % de moins** ; les neuf variantes totalisent 1 618 238 octets. Il s’agit de tailles de fichiers, pas d’un score de performance réseau mesuré.

Le catalogue `/gear/`, `/outbreak/` et les trois routes individuelles utilisent ces données. Chaque nouvelle fiche renvoie au 6800 et aux deux autres composants. Une section **« Compatible 3M Filters & Cartridges »** est ajoutée à la seule fiche 6800, avec comparaison des domaines de protection, liens et cartes. Les données JSON du 6800 restent inchangées. Le nouveau module de présentation fournit des avertissements adaptés aux cartouches chimiques au lieu de leur appliquer l’ancien avertissement générique des filtres à particules ; les avertissements et décisions des anciens produits restent identiques.

## Validation et captures

| Contrôle réellement exécuté | Résultat |
|---|---|
| Astro check | 65 fichiers, zéro erreur, avertissement ou indication |
| Tests unitaires et catalogue | 50 réussis, zéro échec ; identités, domaines de protection, attentes de quantité et conservation des anciens produits inclus |
| Médias | 29 associations, 28 illustrations autorisées et un visuel rejeté ; dimensions, décodage, empreintes, CSV, droits et bunker vérifiés |
| Scénarios produits | Réussis ; cas synthétiques de publication et restauration des données réelles |
| Build de production | Réussi, 36 pages HTML |
| SEO et liens | 1 161 références internes, cinq URL sitemap, robots, canonicals, JSON-LD, noindex et absence de lien vers un ASIN bloqué vérifiés |
| Navigateur | 71 tests réussis, zéro échec ; trois fiches, images, compatibilité 6800, liens réciproques, navigation, clavier et axe |
| Responsive | 320, 375, 768, 1 024, 1 440 et 1 920 px ; aucune régression de débordement constatée par les assertions |
| CTA existants | 63 ouvertures simulées en nouvel onglet : catalogue, collections et fiches ; attributs, tag, domaine et déclaration contrôlés |

[Résultats structurés](qa/phase4-6/test-results.json).

Corrections détectées pendant la validation : le total d’une simulation de publication devait augmenter avec les trois ajouts ; le nouvel instantané de conservation devait distinguer les empreintes binaires des normalisations de fins de ligne des fichiers texte. Le contrôle de liens a ensuite détecté une URL Amazon non vérifiée exposée dans les sources publiques d’un produit bloqué. Cette entrée n’était pas une source consultable et a été retirée des trois fiches ; les URL préparées restent dans `links.amazonCa`, avec une assertion de non-contournement et le contrôle existant sur tout le HTML. Aucun contrôle de sécurité ou de lien n’est affaibli pour faire passer le build.

Captures du build réellement inspectées : cartes [60921 mobile](qa/phase4-6/card-60921-375.webp) / [ordinateur](qa/phase4-6/card-60921-1440.webp), [60926 mobile](qa/phase4-6/card-60926-375.webp) / [ordinateur](qa/phase4-6/card-60926-1440.webp), [2097 mobile](qa/phase4-6/card-2097-375.webp) / [ordinateur](qa/phase4-6/card-2097-1440.webp), section 6800 [mobile](qa/phase4-6/compatible-375.webp) / [ordinateur](qa/phase4-6/compatible-1440.webp). Les captures des trois fiches mobiles ont aussi été ouvertes pour vérifier les titres, illustrations et avertissements. Les images sont distinctes, les cadres complets, les textes et liens « Details » lisibles ; le statut d’attente est visible sans faux bouton actif. Ces WebP sont des captures QA ; leur conversion ne modifie pas les médias produit.

Les tests de nouvel onglet restent des simulations locales isolées du réseau Amazon, pas des vérifications d’annonces. Les audits automatisés axe et les tailles de viewport ne constituent pas une certification WCAG complète ou des essais sur appareils physiques. Aucun résultat Lighthouse n’est revendiqué.

## Sources et preuves

- [3M Canada 60921](https://www.3mcanada.ca/3M/en_CA/p/d/v000075262/).
- [3M Canada 60926](https://www.3mcanada.ca/3M/en_CA/p/d/v000057497/).
- [3M Canada 2097](https://www.3mcanada.ca/3M/en_CA/p/d/v000075275/).
- [Notice 3M masques complets 6000, dont 6800](https://multimedia.3m.com/mws/media/95995O/3m-full-facepiece-respirator-6000-series-user-instructions.pdf?fn=Facepieces_6700-6800-6900.pdf).
- [Notice 3M cartouches/filtres combinés 60921–60928](https://multimedia.3m.com/mws/media/525967O/3m-combination-cartridge-filter-p100-user-instructions.pdf?fn=34872376057_INT_R5.pdf).
- [Notice 3M filtres 2000/2200 incluant 2097](https://multimedia.3m.com/mws/media/528153O/3m-particulate-filters-2000-and-2200-series-p100-user-instructions.pdf?fn=UserInstruction-Reusable-Respirator_Filter_P-100_2096_R6.pdf).
- [Preuves et limites par produit](qa/phase4-6/evidence.json), [conservation des données et médias antérieurs](qa/phase4-6/preservation.json), [état commercial réel](qa/phase4-6/product-status.json).
- [Manifeste des neuf WebP](../assets/media/phase4-6-image-manifest.csv).

## GitHub

Les contrôles locaux sont terminés. La création de la PR et la vérification de la CI GitHub sont en cours ; les liens et résultats seront consignés avant livraison finale.

Aucune fusion ni publication automatique ; la branche est conservée pour la revue du propriétaire. La mise en ligne nécessite une fusion explicitement approuvée, puis le workflow manuel de déploiement existant.
