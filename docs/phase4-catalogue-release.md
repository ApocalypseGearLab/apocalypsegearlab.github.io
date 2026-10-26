# Phase 4 — catalogue BLACKOUT + FALLOUT et préparation commerciale

Contrôle du 25 octobre 2026 (America/Toronto). Ce rapport remplace les comptes de la Phase 3.5 pour le catalogue courant. Il décrit le build local et les tests réellement exécutés ; le site déployé ne change qu'après fusion et déclenchement manuel par le propriétaire.

## A. État du dépôt

PR [nº 7](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/7) confirmée fusionnée le 26 octobre UTC (25 octobre à Toronto). Base distante et départ de cette phase : `971c0c6171e22d7005d0d41e108934f8f5403d99`. Aucun changement local à écraser ni PR Phase 4 ouverte au départ. Branche dédiée : `feat/phase4-complete-affiliate-catalogue`.

Six nouveaux JSON informatifs ajoutés à `src/data/products/`. Les huit JSON précédents sont conservés octet pour octet, ASIN, sources, réserves, statuts draft, flags commerciaux et dates compris. Le bunker, la page d'accueil, la navigation, la configuration du compte et le workflow de déploiement restent inchangés. Aucun fichier existant supprimé.

Modifications ciblées : composants ProductCard, ProductImage, ProductProfile, ProductCatalogue et AffiliateButton ; catégorie FALLOUT `tools` ajoutée sans réaffecter les catégories existantes ; manifeste importé ; route statique FALLOUT et filtre de collection dans la route BLACKOUT ; contrôles de schéma et d'URL d'affiliation ; validateurs, tests et déclencheur CI de la nouvelle branche. `package.json` prépare les fixtures navigateur si elles manquent ou sont périmées. Aucun ajout de dépendance.

## B. Inventaire complet

**14 fiches publiques informatives dans le build**, indépendamment des droits de participation Amazon : 14 cartes sur `/gear/`, 9 sur `/blackout/`, 5 sur `/fallout/`. Les liens ci-dessous désignent les destinations après publication ; ils ne prétendent pas que cette branche est déjà déployée.

| Produit | Collection | URL prévue |
|---|---|---|
| EcoFlow RIVER 2 Pro | BLACKOUT | [/gear/ecoflow-river-2-pro/](https://apocalypsegearlab.github.io/gear/ecoflow-river-2-pro/) |
| Fenix CL26R Pro | BLACKOUT | [/gear/fenix-cl26r-pro/](https://apocalypsegearlab.github.io/gear/fenix-cl26r-pro/) |
| Fenix HM50R V2.0 | BLACKOUT | [/gear/fenix-hm50r-v2-headlamp/](https://apocalypsegearlab.github.io/gear/fenix-hm50r-v2-headlamp/) |
| INIU P62 | BLACKOUT | [/gear/iniu-p62-20000mah-65w/](https://apocalypsegearlab.github.io/gear/iniu-p62-20000mah-65w/) |
| Jackery Explorer 1000 v2 | BLACKOUT | [/gear/jackery-explorer-1000-v2/](https://apocalypsegearlab.github.io/gear/jackery-explorer-1000-v2/) |
| Jackery Explorer 300 | BLACKOUT | [/gear/jackery-explorer-300/](https://apocalypsegearlab.github.io/gear/jackery-explorer-300/) |
| Jackery SolarSaga 100 W Air | BLACKOUT | [/gear/jackery-solarsaga-100w-air/](https://apocalypsegearlab.github.io/gear/jackery-solarsaga-100w-air/) |
| Kidde C3010 | BLACKOUT | [/gear/kidde-c3010-co-alarm/](https://apocalypsegearlab.github.io/gear/kidde-c3010-co-alarm/) |
| Leatherman Wave+ | FALLOUT | [/gear/leatherman-wave-plus-multitool/](https://apocalypsegearlab.github.io/gear/leatherman-wave-plus-multitool/) |
| Midland ER310 | BLACKOUT | [/gear/midland-er310/](https://apocalypsegearlab.github.io/gear/midland-er310/) |
| NANUK 904 | FALLOUT | [/gear/nanuk-904-first-aid-kit/](https://apocalypsegearlab.github.io/gear/nanuk-904-first-aid-kit/) |
| Reliance Aqua-Tainer 7 gallons | FALLOUT | [/gear/reliance-aqua-tainer-7-gallon/](https://apocalypsegearlab.github.io/gear/reliance-aqua-tainer-7-gallon/) |
| Sawyer Squeeze SP129 | FALLOUT | [/gear/sawyer-squeeze-sp129-water-filter/](https://apocalypsegearlab.github.io/gear/sawyer-squeeze-sp129-water-filter/) |
| SOL Emergency Bivvy | FALLOUT | [/gear/sol-emergency-bivvy/](https://apocalypsegearlab.github.io/gear/sol-emergency-bivvy/) |

Toutes les fiches restent `visibility: informational`, `reviewStatus: draft`, `testing: not-tested`. Le template reste interne. Aucun doublon de slug, ASIN ou fiche.

## C. Images, fidélité et provenance

Les 14 WebP du ZIP restent aux mêmes noms, dimensions 1254 × 1254 et SHA-256. Aucun réencodage, changement de couleur, cadrage ou régénération. **11 illustrations livrées, 3 visuels neutres**. Les six réserves de la phase précédente sont maintenant associées aux six nouveaux produits, sans copie supplémentaire des fichiers sources.

| Produit | Fichier exact | Rendu public |
|---|---|---|
| Fenix HM50R V2.0 | `assets/media/blackout/fenix-hm50r-v2-headlamp-blackout.webp` | Illustration affichée |
| SOL Emergency Bivvy | `assets/media/fallout/sol-emergency-bivvy-survival-shelter-fallout.webp` | Illustration affichée |
| Leatherman Wave+ | `assets/media/fallout/leatherman-wave-plus-multitool-fallout.webp` | Neutre ; source rejetée |
| Sawyer Squeeze SP129 | `assets/media/fallout/sawyer-squeeze-sp129-water-filter-fallout.webp` | Illustration affichée |
| NANUK 904 | `assets/media/fallout/nanuk-904-first-aid-kit-fallout.webp` | Illustration affichée |
| Reliance Aqua-Tainer 7 gallons | `assets/media/fallout/reliance-aqua-tainer-7-gallon-water-container-fallout.webp` | Neutre ; source rejetée |
| Midland ER310 | `assets/media/blackout/midland-er310-emergency-radio-blackout.webp` | Illustration affichée |
| Jackery Explorer 300 | `assets/media/blackout/jackery-explorer-300-portable-power-station-blackout.webp` | Neutre ; source rejetée |
| INIU P62 | `assets/media/blackout/iniu-p62-20000mah-power-bank-blackout.webp` | Illustration affichée |
| EcoFlow RIVER 2 Pro | `assets/media/blackout/ecoflow-river-2-pro-power-station-blackout.webp` | Illustration affichée |
| Jackery Explorer 1000 v2 | `assets/media/blackout/jackery-explorer-1000-v2-power-station-blackout.webp` | Illustration affichée |
| Fenix CL26R Pro | `assets/media/blackout/fenix-cl26r-pro-camping-lantern-blackout.webp` | Illustration affichée |
| Kidde C3010 | `assets/media/blackout/kidde-c3010-carbon-monoxide-alarm-blackout.webp` | Illustration affichée |
| Jackery SolarSaga 100 W Air | `assets/media/blackout/jackery-solarsaga-100w-air-solar-panel-blackout.webp` | Illustration affichée |

Nouvelles comparaisons : HM50R avec la photographie Fenix Lighting V2.0 ; Sawyer avec la composition officielle des accessoires Squeeze ; NANUK avec les photos 904 et la fiche USA ; SOL avec l'emballage et les photos du bivvy orange standard. Ces comparaisons portent sur l'apparence générale, pas sur l'authenticité de l'annonce ou la performance. HM50R porte aussi « HM50R » sur la photo constructeur V2.0 : ce marquage seul ne prouve pas une mauvaise génération.

**Rejets conservés sans remplacement inventé :**

- Explorer 300 : 100 W USB-C dessiné contre 60 W dans la documentation, détails d'écran/commande et inscriptions incompatibles. Aucun téléchargement public de cette illustration.
- Wave+ : formes et proportions de ciseaux, petit tournevis et ouvre-boîte déformées par rapport aux outils officiels. La silhouette ne permet pas de valider un assemblage fidèle.
- Aqua-Tainer : textes latéraux malformés, indication 22,7 kg / 50 lb non établie et garantie de cinq ans dessinée non vérifiée. Le constructeur affiche actuellement 7G/26L ; le dessin indique 26,5 L. Cette divergence d'arrondi n'est pas à elle seule une preuve de mauvais modèle, mais les inscriptions inventées rendent ce visuel impropre à la publication commerciale.

Les quatre nouveaux médias diffusés ajoutent **1 080 590 octets** de sources livrables, sans transformation. Les images produit gardent une seule résolution source 1254 px, avec dimensions intrinsèques, sizes et affichage adaptatif ; aucune variante 480/960 supplémentaire n'est prétendue. Les trois variantes du bunker (768, 1280, 1672 px) et leur sélection responsive sont inchangées. Chargement différé des cartes et priorité haute réservée au bunker sur l'accueil.

Le propriétaire a explicitement confirmé que les quatorze illustrations ont été créées pour ApocalypseGearLab sans reproduction de photos tierces et en autorise l'exploitation commerciale. Cette déclaration est conservée dans le manifeste. Elle est une déclaration du propriétaire, pas une vérification juridique indépendante : une sortie de génération ne crée pas automatiquement de droits sur une éventuelle référence tierce. Les photographies constructeur consultées servent uniquement de références locales de contrôle, ne sont pas ajoutées au site ni à cette PR. Le bunker possède sa confirmation distincte. La légende publique indique une illustration conceptuelle, jamais une photographie du produit ; les inscriptions dessinées ne servent pas de preuve technique.

## D. Contenu éditorial

Six fiches originales et complètes en anglais, langue du site : aperçu, cinq ou six caractéristiques sourcées, avantages et limites, usages conditionnels, vérifications avant achat, notes de sécurité, sources et équipements complémentaires. Aucune expérience personnelle, aucun essai physique, prix, disponibilité, note ou avis inventé.

| Nouvelle fiche | Informations documentées et limites conservées |
|---|---|
| HM50R V2.0 | 700 lm annoncés, cellule 16340, USB-C, dimensions. Les pages globales et USA divergent sur cellule, LED, portée et masse ; aucune révision canadienne n'est arbitrairement choisie. |
| Sawyer SP129 | Membrane Squeeze 0,1 micron, pas de 28 mm, entretien. Pas de promesse contre les virus, substances dissoutes ou contamination radioactive ; paquet SP129 à vérifier séparément. |
| Aqua-Tainer | Référence 9410-03R, taille 7G/26L actuelle, dimensions et poids vide, rangement empilé à vide uniquement. Aucune purification attribuée au contenant. |
| NANUK 904 | Dimensions, volume et organisation de la version documentée. Page constructeur contradictoire 109/110 articles, substitutions possibles et fiche USA ; aucun contenu canadien exact ou conformité au travail affirmé. |
| Wave+ | 18 fonctions, longueur fermée, masse du catalogue et lame 420HC. Finition, étui et embouts non confirmés ; outil non isolé. |
| SOL | Taille standard 84 × 36 pouces, 3,8 oz annoncés, accessoires de la version constructeur. Réflexion thermique non assimilée à une température d'usage ni à une garantie contre l'hypothermie. |

Les huit fiches précédentes restent intactes. Les pages constructeur correspondantes ont été rouvertes dans cette phase ; cela ne requalifie pas les recherches précédentes en essais ni en validation des annonces Amazon.

## E. Amazon Associates

`AMAZON_ASSOCIATE_ENROLLED = false` conservé : **participation actuellement autorisée non confirmée**, et non simple attente mécanique de l'approbation finale. Le propriétaire confirme l'accès au compte Canada, le site ajouté et le tag existant. Les messages accessibles confirment des changements d'accès et de contact ; aucune réponse confirmant le statut actuel ou l'effet de l'ancien délai de ventes n'a été identifiée. Aucun identifiant privé ou détail fiscal n'est publié ici.

La [règle officielle Canada sur la période initiale](https://associates.amazon.ca/help/node/topic/G7MJTPEP9NC3YKMG) distingue l'inscription, les ventes et la révision ultérieure. Une participation initiale effectivement autorisée peut donc suffire ; **l'approbation finale n'est pas une condition supplémentaire inventée**. La validation fiscale ne démontre pas cette permission. Voir aussi l'[accord du programme Canada](https://associates.amazon.ca/help/operating/agreement).

Dernière instruction du propriétaire appliquée : ne pas attendre Amazon pour terminer le catalogue ou créer la PR. Les fiches demeurent visibles. Les 14 URL exactes sont enregistrées et les boutons préparés ; une fiche synthétique admissible a permis de tester réellement le rendu actif et sa déclaration, sans requête ni clic Amazon. Cela ne déclare pas les vrais produits admissibles.

L'activation réelle exige la participation Canada autorisée pour le site/tag, puis la correspondance de l'annonce et la levée des réserves applicables au produit. Les URL ont été tentées en lecture directe : les 14 pages sont inaccessibles à l'outil. Une URL structurellement valide n'est pas présentée comme une annonce actuelle vérifiée.

La mention **As an Amazon Associate I earn from qualifying purchases.** apparaît près du bouton et sur la page d'affiliation lorsque la participation est activée ; présence validée dans la fixture active. La notice générale et le lien vers la politique restent présents sur les fiches réelles. Les liens actifs ont target=_blank et rel=sponsored nofollow noopener ; permission Canada distincte de celle des USA.

## F. Audit des 14 liens affiliés

Codes : **A** = droit de participation actuel non confirmé ; **L** = annonce canadienne inaccessible, correspondance indépendante non établie ; **S** = blocage matériel spécifique conservé. Les trois S ont leur avertissement public renforcé. Les autres variantes gardent les contrôles d'usage indiqués dans leur JSON et dans [l'état commercial détaillé](qa/phase4/release-readiness.json).

| Produit | ASIN | Destination stockée | Tag | Correspondance vérifiée | Bouton réel | Motif |
|---|---|---|---|---|---|---|
| EcoFlow RIVER 2 Pro | `B0BVLPGS79` | [URL exacte](https://www.amazon.ca/dp/B0BVLPGS79?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| Fenix CL26R Pro | `B0CGKWX5YT` | [URL exacte](https://www.amazon.ca/dp/B0CGKWX5YT?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| Fenix HM50R V2.0 | `B0H6R34CBL` | [URL exacte](https://www.amazon.ca/dp/B0H6R34CBL?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| INIU P62 | `B0DB888L9F` | [URL exacte](https://www.amazon.ca/dp/B0DB888L9F?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L + S |
| Jackery Explorer 1000 v2 | `B0D7PPG25F` | [URL exacte](https://www.amazon.ca/dp/B0D7PPG25F?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| Jackery Explorer 300 | `B082TMBYR6` | [URL exacte](https://www.amazon.ca/dp/B082TMBYR6?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L + S |
| Jackery SolarSaga 100 W Air | `B0FX8P4JST` | [URL exacte](https://www.amazon.ca/dp/B0FX8P4JST?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| Kidde C3010 | `B00FHW7PBS` | [URL exacte](https://www.amazon.ca/dp/B00FHW7PBS?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L + S |
| Leatherman Wave+ | `B079MJBP21` | [URL exacte](https://www.amazon.ca/dp/B079MJBP21?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| Midland ER310 | `B015QIC1PW` | [URL exacte](https://www.amazon.ca/dp/B015QIC1PW?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| NANUK 904 | `B0G3XYHL33` | [URL exacte](https://www.amazon.ca/dp/B0G3XYHL33?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| Reliance Aqua-Tainer 7 gallons | `B001QC31G6` | [URL exacte](https://www.amazon.ca/dp/B001QC31G6?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| Sawyer Squeeze SP129 | `B00B1OSU4W` | [URL exacte](https://www.amazon.ca/dp/B00B1OSU4W?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |
| SOL Emergency Bivvy | `B08NC9BLQ5` | [URL exacte](https://www.amazon.ca/dp/B08NC9BLQ5?tag=apocalypsegear-20) | `apocalypsegear-20` | Non : page inaccessible | Inactif | A + L ; revue de variante à terminer |

**0 bouton actif / 14 en attente.** Il ne s'agit pas de liens morts : les boutons indisponibles n'ont pas de href et ne déclenchent aucune navigation. Ils sont identifiés comme indisponibles avec un motif public concis et un motif interne complet. Aucun autre tag, paramètre superflu, prix ou avis n'a été introduit. Une activation ultérieure ne nécessite aucune réécriture des 14 destinations.

## G. Sécurité

- **Kidde** : le document [C3010-CA distinct](https://www.shareddocs.com/hvac/docs/2001/Public/0E/C3010-CA_Datasheet_EN.pdf) existe ; il ne relie pas l'ASIN choisi ni le modèle US 21010045 à cette désignation canadienne. Vérifier la marque sur l'unité, le dossier de certification et les instructions canadiennes. Blocage maintenu.
- **INIU** : la [notification CPSC BI-B41](https://www.cpsc.gov/Recalls/2026/INIU-Recalls-Power-Banks-Due-to-Fire-and-Burn-Hazards-Sold-on-Amazon) vise un autre modèle et des lots spécifiques. Elle ne rappelle pas automatiquement P62 et ne le déclare pas sûr. Révision P62/P62-E1, câble et preuves exactes toujours à établir.
- **Explorer 300** : capacité et révision de tension non reliées à l'annonce. Pas de compatibilité SolarSaga Air transférée depuis une autre station. Visuel erroné non réutilisé.
- **Eau** : stockage propre, limites de charge et d'empilage, séparation eau brute/eau traitée, gel du filtre et avis d'évitement de l'eau. FALLOUT n'implique aucune protection antiradiation.
- **Premiers secours** : matériel, intégrité, péremption et formation à contrôler ; pas de promesse de soins complets ni de conformité canadienne au travail.
- **Électricité / lumière / outils / abri** : cellules et chargeurs adaptés, chaleur, charges et connectique, outil non isolé, lames, ventilation et isolation distincte du bivvy. Aucune recherche de rappel incomplète n'est traitée comme une autorisation de sécurité.

## H. SEO et performance

21 pages HTML, dont les 14 profils. Titles distincts, H1 uniques, descriptions, canonicals, Open Graph, BreadcrumbList, liens et ancres contrôlés. Fiches non admissibles et catalogue en noindex, nofollow selon la politique existante ; hubs de collections indexables. **5 URL dans le sitemap**, exactement les pages indexables ; robots.txt cohérent et ancienne URL sitemap.xml préservée. Aucun Product/Offer/Review/AggregateRating pour les fiches non approuvées.

518 références internes résolues dans le build. Les 11 images diffusées ont un hash identique à leur source et les trois rejetées restent en 404. Dimensions, alt descriptifs, srcset/sizes, lazy loading, ratio carré et object-fit:contain contrôlés. Le bunker garde un seul téléchargement initial à 375 px, son ratio cinématique, la sélection responsive et un CLS observé inférieur à 0,01 dans le test local. Pas de score Lighthouse ou de mesure réseau terrain revendiqué.

## I. UX, captures et responsive

Chromium local : 320, 375, 768, 1024, 1440 et 1920 px. Aucun débordement horizontal détecté ; navigation, menu clavier, Escape, lien d'évitement, absence de JavaScript et réduction des animations vérifiés. Axe WCAG 2 A/AA et 2.1 AA : aucune violation détectée sur la matrice testée. Les rôles et noms accessibles sont vérifiés ; aucun essai manuel NVDA/VoiceOver ou appareil physique n'est prétendu.

Les 14 fiches et les trois catalogues ont été réellement capturés et inspectés. Les cartes indiquent leur univers, conservent les cadres et utilisent une teinte rouge accessible pour les modules FALLOUT. Le bunker ne masque ni titre ni CTA ; texte sous l'image sur mobile.

| Page | Téléphone | Ordinateur |
|---|---|---|
| Catalogue — 14 | [375 px](qa/phase4/catalogue-375.webp) | [1440 px](qa/phase4/catalogue-1440.webp) |
| BLACKOUT — 9 | [375 px](qa/phase4/blackout-375.webp) | [1440 px](qa/phase4/blackout-1440.webp) |
| FALLOUT — 5 | [375 px](qa/phase4/fallout-375.webp) | [1440 px](qa/phase4/fallout-1440.webp) |
| Accueil / bunker | [375 px](qa/phase4/home-375.webp) | [1440 px](qa/phase4/home-1440.webp) |

| Fiche | Ordinateur | Téléphone |
|---|---|---|
| EcoFlow RIVER 2 Pro | [1440 px](qa/phase4/ecoflow-river-2-pro-1440.webp) | Capture PNG contrôlée localement |
| Fenix CL26R Pro | [1440 px](qa/phase4/fenix-cl26r-pro-1440.webp) | Capture PNG contrôlée localement |
| Fenix HM50R V2.0 | [1440 px](qa/phase4/fenix-hm50r-v2-headlamp-1440.webp) | [375 px](qa/phase4/fenix-hm50r-v2-headlamp-375.webp) |
| INIU P62 | [1440 px](qa/phase4/iniu-p62-20000mah-65w-1440.webp) | Capture PNG contrôlée localement |
| Jackery Explorer 1000 v2 | [1440 px](qa/phase4/jackery-explorer-1000-v2-1440.webp) | Capture PNG contrôlée localement |
| Jackery Explorer 300 | [1440 px](qa/phase4/jackery-explorer-300-1440.webp) | Capture PNG contrôlée localement |
| Jackery SolarSaga 100 W Air | [1440 px](qa/phase4/jackery-solarsaga-100w-air-1440.webp) | Capture PNG contrôlée localement |
| Kidde C3010 | [1440 px](qa/phase4/kidde-c3010-co-alarm-1440.webp) | Capture PNG contrôlée localement |
| Leatherman Wave+ | [1440 px](qa/phase4/leatherman-wave-plus-multitool-1440.webp) | [375 px](qa/phase4/leatherman-wave-plus-multitool-375.webp) |
| Midland ER310 | [1440 px](qa/phase4/midland-er310-1440.webp) | Capture PNG contrôlée localement |
| NANUK 904 | [1440 px](qa/phase4/nanuk-904-first-aid-kit-1440.webp) | [375 px](qa/phase4/nanuk-904-first-aid-kit-375.webp) |
| Reliance Aqua-Tainer 7 gallons | [1440 px](qa/phase4/reliance-aqua-tainer-7-gallon-1440.webp) | [375 px](qa/phase4/reliance-aqua-tainer-7-gallon-375.webp) |
| Sawyer Squeeze SP129 | [1440 px](qa/phase4/sawyer-squeeze-sp129-water-filter-1440.webp) | [375 px](qa/phase4/sawyer-squeeze-sp129-water-filter-375.webp) |
| SOL Emergency Bivvy | [1440 px](qa/phase4/sol-emergency-bivvy-1440.webp) | [375 px](qa/phase4/sol-emergency-bivvy-375.webp) |

Les captures de documentation sont exportées en WebP séparément ; **aucun WebP produit ou bunker n'a été recomprimé**. [Sélection des variantes du bunker](qa/phase4/hero-responsive-sources.json).

## J. Tests exécutés et résultats

| Commande | Résultat final local |
|---|---|
| npm run check | 56 fichiers ; 0 erreur, avertissement ou hint |
| npm test | 28/28 tests réussis |
| npm run test:images | 33 WebP décodés, métadonnées, dimensions, SHA-256 et associations vérifiés |
| npm run test:products | Trois fiches synthétiques, filtrage/indexation et états actif/inactif réels validés ; fixtures retirées et compte restauré en finally, build réel régénéré |
| npm run build | Succès ; 21 pages HTML, 14 profils et 11 réponses WebP statiques |
| npm run test:site | Succès ; 518 références internes, 5 URL sitemap, SEO et règles de livraison |
| npm run test:browser | **38/38**, Chromium, axe et six largeurs ; aucun clic ou appel à Amazon |
| npm run release:check | Succès du diagnostic : 14 visibles, 0 commercialement admissible, 3 blocages obligatoires |

Les nouveaux tests couvrent les six fiches, les catégories 9/5, les 14 ASIN uniques, le tag exact, les paramètres surnuméraires, la résistance au changement d'ASIN/tag, les nouveaux médias et les deux états du bouton réellement rendu. La préparation des fixtures navigateur vérifie leur empreinte source ; aucune fixture périmée utilisée lors d'une invocation isolée.

Erreurs intermédiaires corrigées : parenthèse du script local d'extension des tests ; ancienne assertion d'aperçu à cinq images au lieu de six ; typage strict du motif facultatif des boutons. Un test axe du premier passage a été interrompu par le rechargement du serveur de développement pendant une modification. Nouveau passage stable : 38/38, sans masquer l'échec initial. Aucun test de production déployée, Firefox/Safari ou essai physique de produit revendiqué.

## K. GitHub et publication

Une seule PR vers main pour `feat/phase4-complete-affiliate-catalogue` ; le lien, le commit final et les liens GitHub Actions sont consignés dans la description de la PR et le compte rendu de livraison. Ce document décrit les résultats locaux ; les résultats Ubuntu sont rapportés séparément après leur observation effective.

Après examen et autorisation du propriétaire :

1. Vérifier les validations vertes de la PR Phase 4 et examiner les captures.
2. Fusionner la PR vers main depuis GitHub.
3. Dans Actions, ouvrir **Deploy to GitHub Pages (manual approval)**, choisir main et lancer avec **confirm_publish=true**.
4. Attendre la réussite du déploiement et visiter /gear/, /blackout/, /fallout/ et les 14 fiches sur le domaine public ; vérifier le bunker et les trois visuels neutres.
5. Ne passer à l'activation commerciale qu'après confirmation de participation et validation des annonces/risques concernés. Refaire les tests et une PR de contrôle pour cette activation ; aucune vente ou clic artificiel.

Aucune fusion ou publication n'a été déclenchée par l'agent.

## L. Verdict

**MERGE pour le catalogue informatif Phase 4**, sous réserve des validations CI vertes et de la revue du propriétaire. Les 14 fiches sont utilisables ; les images impropres sont remplacées par les visuels neutres autorisés. Aucun blocage externe ne retient la PR.

**L'exploitation affiliée n'est pas encore autorisée par les éléments disponibles.** Il reste à établir le statut actuel du programme et la correspondance des annonces, ainsi que les réserves de sécurité propres aux variantes. Ce constat ne masque aucun produit et ne revendique aucune approbation privée.
