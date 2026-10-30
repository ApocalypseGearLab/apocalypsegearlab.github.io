# Phase 4.7 — liens 3M et illustration 2091

Base : `59ba20b83c5d895ad132f97d01b18465c467edbc`, dernier `main` inspecté. Les PR #17, #18 et #19 sont confirmées fusionnées sur GitHub. Branche : `feat/phase4-7-3m-links-and-2091-artwork`.

## Décisions commerciales

| Produit | Image | ASIN / modèle | Bouton | Justification |
|---|---|---|---|---|
| 3M 2091 | Nouvelle illustration propre au 2091 | `B001D1JCK4` enregistré ; offre canadienne non corroborée | Bloqué | Quantité du paquet et variante de l'offre encore insuffisamment documentées |
| 3M 2097 | Illustration existante conservée | `B07FMJPFTY` / 2097, documenté par le propriétaire | Actif | Offre annoncée de cinq paires, soit dix filtres |
| 3M 60921 | Illustration existante conservée | `B07571LR2K` / 60921, documenté par le propriétaire | Actif | Titre retranscrit « Pack of 2 » : une paire de cartouches |
| 3M 60926 | Illustration existante conservée | `B009POHLRC` / 60926, documenté par le propriétaire | Actif | Titre retranscrit « 2 Count » ; « Unit Count: 1 » peut désigner un paquet commercial |

La mission du propriétaire fournit une **retranscription écrite des éléments de captures Amazon.ca**, pas les fichiers des captures elles-mêmes. Cette retranscription est enregistrée comme `owner-document` et liée aux ASIN et modèles exacts. Aucune consultation indépendante des captures originales, visite réussie de l'offre en direct, inspection physique du colis ou authentification des unités n'est revendiquée.

Les quatre URL Amazon.ca ont été tentées avec l'outil de lecture web : aucune n'était accessible par cet outil, qui ne fournit pas de code HTTP observable dans ce cas. Ce résultat technique ne prouve pas une URL invalide. Les trois anciens blocages de correspondance modèle/quantité sont levés sur la base documentaire apportée par le propriétaire ; le 2091 ne reçoit pas cette autorisation faute de preuve équivalente.

La nuance du 60926 est conservée : le titre annonce deux cartouches ; le champ de comptage unitaire peut représenter un paquet, sans constituer une preuve de son contenu livré. Le texte public qualifie le conditionnement d'**annoncé**, avec les vérifications à faire à réception.

Les observations historiques de prix et de vendeurs du propriétaire sont conservées uniquement dans `qa/phase4-7/commercial-evidence.json`, sans date de capture inventée. Aucun prix, vendeur actuel, stock, note ou avis n'est ajouté au site public.

Les trois liens réutilisent les URL enregistrées, `tag=apocalypsegear-20`, les composants existants et leurs décisions par produit. Les mécanismes globaux d'affiliation et de sécurité ne sont pas modifiés. Le catalogue passe de **21 à 24 liens actifs**, sur 30 fiches informatives. Les six liens restant bloqués concernent Kidde, INIU, Explorer 300, EcoFlow RIVER 2 Pro, NANUK 904 et 3M 2091. Leurs motifs préexistants restent inchangés.

`listingVerified=false`, `safetyStatus=pending`, `publicationApproved=false`, `reviewStatus=draft`, `testing=not-tested` et `lastVerified=null` restent inchangés pour les trois fiches réévaluées. L'autorisation du lien ne constitue pas une recommandation ni une publication éditoriale approuvée. Les noindex et les données structurées restent soumis à la même politique. L'approbation finale Amazon n'est pas déclarée acquise.

## Illustration 2091 et droits

Le PNG fourni est conservé sans modification à `assets/media/outbreak/originals/3m-2091-outbreak.png` : **1 254 × 1 254 px, 2 547 916 octets**, SHA-256 `19a993ca0bc131ab7f5f611ce1c9ed20a9f92b2b6ad55d33c5666a1f006c7567`.

| Variante | Dimensions | Octets |
|---|---|---:|
| `3m-2091-outbreak.webp` | 1 254 × 1 254 | 298 638 |
| `3m-2091-outbreak-960.webp` | 960 × 960 | 200 534 |
| `3m-2091-outbreak-480.webp` | 480 × 480 | 59 814 |

Encodage WebP qualité 85, effort 6, redimensionnement carré sans recadrage ni recoloration. La variante pleine taille représente **88,28 % d'octets en moins** que le PNG ; le navigateur choisit une seule variante selon le `srcset` et le `sizes` existants. Le PNG original n'est pas livré dans les routes publiques d'images. Aucune autre illustration ni variante du bunker n'est réencodée.

Le PNG et le WebP pleine taille ont été inspectés : deux disques magenta, marquages 2091/P100, cadre HUD vert complet. Les marquages répétés et tournés appartiennent à l'illustration et ne prouvent ni une certification, ni l'authenticité d'un filtre, ni la quantité vendue. L'image n'est pas une photographie fabricant et ne documente pas le conditionnement de l'ASIN.

La mission Phase 4.7 autorise explicitement l'intégration de **cette** illustration fournie par le propriétaire. Le manifeste enregistre ce périmètre ; cela ne devient pas un audit indépendant de la chaîne de droits, une approbation 3M ou une permission pour d'autres médias. Aucun visuel n'a été régénéré.

Le mapping unique du produit 2091 est ajouté au manifeste existant et au CSV `assets/media/phase4-7-image-manifest.csv`, avec dimensions et empreintes des trois fichiers. Les 29 anciennes entrées sont conservées. La légende discrète reste « Concept illustration, not a product photograph. » et l'alt exact demandé est utilisé. Les cartes restent lazy, l'image de fiche eager, avec dimensions intrinsèques et ratio 1:1.

## Sécurité et vérification technique

Les pages fabricant 3M Canada et les notices des familles concernées ont été consultées : [2091](https://www.3mcanada.ca/3M/en_CA/p/dc/v101229317/), [2097](https://www.3mcanada.ca/3M/en_CA/p/d/v000075275/), [60921](https://www.3mcanada.ca/3M/en_CA/p/d/v000075262/), [60926](https://www.3mcanada.ca/3M/en_CA/p/d/v000057497/), [filtres 2000/2200](https://multimedia.3m.com/mws/media/528153O/3m-particulate-filters-2000-and-2200-series-p100-user-instructions.pdf?fn=UserInstruction-Reusable-Respirator_Filter_P-100_2096_R6.pdf), [cartouches P100](https://multimedia.3m.com/mws/media/525967O/3m-combination-cartridge-filter-p100-user-instructions.pdf?fn=34872376057_INT_R5.pdf), [masques 6000 dont 6800](https://multimedia.3m.com/mws/media/95995O/3m-full-facepiece-respirator-6000-series-user-instructions.pdf?fn=Facepieces_6700-6800-6900.pdf).

Les distinctions de protection sont conservées : 2091 particules ; 2097 particules et soulagement limité des vapeurs organiques à concentration nuisible ; 60921 certaines vapeurs organiques et particules ; 60926 gaz/vapeurs spécifiés et particules. Aucun des quatre ne devient une protection universelle, un apport d'oxygène ou un système d'évacuation CBRN. Les avertissements d'ajustement, formation, paire de composants identiques, configuration approuvée et atmosphères interdites sont inchangés.

Le système GA4 de #19 est réutilisé tel quel : aucun nouveau gestionnaire n'est créé. Les tests isolent Google et Amazon ; les clics d'essai ne créent ni visite du marchand ni fausse activité dans la propriété. Les nouvelles assertions couvrent les trois boutons dans `/gear/`, `/outbreak/`, leurs fiches et la section 6800, leurs attributs, les six paramètres GA4 et un seul événement par action. Le 2091 conserve son image tout en restant sans lien marchand.

Les contrôles responsive couvrent 320, 375, 768, 1 024, 1 440 et 1 920 px. Les dimensions, sources responsives, légendes, liens internes, canonicals, sitemap, noindex, données structurées et avertissements sont testés. Le contrôle de CLS est un test de laboratoire local ; il ne remplace pas les données de terrain Core Web Vitals. Les audits axe disponibles ne constituent pas une certification WCAG exhaustive.

Deux lancements locaux ont dépassé la fenêtre de démarrage de 60 secondes avant l'exécution des tests. Le journal de diagnostic montre un démarrage à froid du serveur Astro de développement de 50 114 ms, auquel s'ajoutent le lancement npm et le contrôle HTTP. `playwright.config.ts` accorde désormais 120 secondes au seul serveur dev ; la disponibilité HTTP reste obligatoire et aucun délai de test ou d'assertion n'est augmenté. Ce réglage suit l'[option officielle de délai de démarrage Playwright](https://playwright.dev/docs/test-webserver#adding-a-server-timeout) et ne modifie pas le serveur de production.

## Validation finale locale

| Contrôle | Résultat |
|---|---|
| `npm run check` | 77 fichiers, zéro erreur, avertissement ou hint |
| `npm test` | 59/59 tests réussis |
| `npm run test:images` | 30 mappings uniques, 29 illustrations admissibles et Explorer 300 rejeté ; PNG et WebP décodés, dimensions et empreintes vérifiées |
| `npm run release:check` | 30 fiches visibles, 24 liens autorisés, 6 blocages documentés ; approbation finale Amazon toujours non confirmée |
| `npm run audit:affiliate` | URL, domaine, ASIN, tag et décisions cohérents |
| `npm run test:products` | Schémas et scénarios de publication validés ; données réelles restaurées après fixtures |
| `npm run build` | 37 pages HTML produites |
| `npm run test:site` | 1 208 références internes et 5 URL de sitemap, canonicals et JSON-LD valides |
| `npm run test:browser` | 80/80 tests réussis lors de la relance complète ; échecs de démarrage précédents documentés séparément |

La nouvelle suite vérifie 12 ouvertures isolées des trois liens dans les quatre emplacements demandés, avec un seul événement `affiliate_click` par action. La suite générale vérifie également 72 ouvertures isolées sur l'ensemble du catalogue, des secteurs et des fiches. Le test de la fiche 2091 observe **CLS = 0** aux six largeurs, les variantes mobiles 480 et ordinateur 960, et aucune violation des règles axe WCAG 2 A/AA et 2.1 AA testées. Les sources PNG ne sont pas publiées dans les routes d'images.

Captures du candidat relues : section 6800 [mobile](qa/phase4-7/compatible-375.webp) et [ordinateur](qa/phase4-7/compatible-1440.webp), fiche 2091 [mobile](qa/phase4-7/profile-2091-375.webp) et [ordinateur](qa/phase4-7/profile-2091-1440.webp). Le HUD complet et le produit ont aussi été inspectés isolément à 375 px et dans le WebP pleine taille.

## Fichiers et preuves

- Trois JSON produits modifiés : 2097, 60921 et 60926. **Le JSON 2091 est conservé**, sa fiche et ses liens associés existaient déjà.
- Un PNG original, trois WebP, un CSV de mapping et une entrée ajoutée à `src/data/media/imported-manifest.json`.
- Vérificateur d'images renforcé pour le PNG conservé ; attentes et tests commerciaux/médias adaptés à cette phase, sans réécrire les snapshots historiques.
- Nouveaux tests `tests/phase47.test.ts` et `tests/browser/phase47.spec.ts` ; tests existants actualisés pour 24 liens actifs, 29 illustrations affichables et le 2091 illustré.
- `qa/phase4-7/preservation.json` protège les autres produits, tous les anciens médias, les composants, les politiques, GA4, GSC, le design et le workflow de déploiement. `commercial-evidence.json` et `artwork-review.json` documentent les limites des preuves.

Les logs et résultats horodatés sont dans `qa/phase4-7/`. Le lien de CI et son état réel sont fournis avec la PR. **Verdict technique : MERGE après revue**, avec le lien du 2091 volontairement bloqué jusqu'à validation de son offre. Aucune fusion ni publication automatique n'est autorisée dans cette phase.
