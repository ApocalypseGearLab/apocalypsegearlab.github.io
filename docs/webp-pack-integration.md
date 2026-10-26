# Finalisation BLACKOUT et import des médias FALLOUT

Cette livraison reprend la branche `feat/visible-blackout-info-catalogue` et ses modifications locales, sans réinitialisation. Elle complète le [rapport des huit fiches informatives](public-blackout-catalogue.md) et remplace son état initial où toutes les images produits étaient neutres. Main demeure `f3559b7406b4b2fb80526e3e8d576d8eb7a16523`. La PR nº 5 est fusionnée ; aucune PR ouverte concurrente n'a été trouvée avant cette livraison.

## ZIP et provenance

Le ZIP fourni contient **14 WebP de 1254 × 1254**, un CSV et un README. Il a été extrait dans `assets/media/` avec validation des chemins et refus d'écraser un fichier existant. Empreinte SHA-256 du ZIP : `6bdbd85aa93340b06bc023c12f3dd88064960c9a2f7bfa48ef6f84c292f4428e`.

Le propriétaire a ensuite confirmé : **illustrations créées pour ApocalypseGearLab, sans reproduction de photos tierces, autorisées commercialement**. Cette déclaration est enregistrée dans `src/data/media/imported-manifest.json`, avec sa portée limitée aux quatorze fichiers fournis. Elle n'accorde aucune certification de produit, vérification d'annonce ou autorisation Amazon. Le manifeste CSV d'origine et le README du ZIP sont conservés comme données de provenance ; leurs textes n'ont pas remplacé les instructions du propriétaire.

Les quatorze fichiers sont conservés **octet pour octet**, sous leurs noms SEO, sans changement de couleur, génération, recadrage ou recompression. Le manifeste relève les dimensions, tailles, SHA-256, associations et décisions de revue. Les dix-neuf WebP antérieurs, dont les trois du bunker, restent également inchangés.

## Neuf images BLACKOUT pour huit fiches existantes

| Fichier SEO | Association | Décision |
|---|---|---|
| `jackery-explorer-1000-v2-power-station-blackout.webp` | Explorer 1000 v2 | Illustration revue, affichée |
| `ecoflow-river-2-pro-power-station-blackout.webp` | RIVER 2 Pro | Illustration revue, affichée |
| `jackery-explorer-300-portable-power-station-blackout.webp` | Explorer 300 | Rejetée, visuel neutre maintenu |
| `midland-er310-emergency-radio-blackout.webp` | ER310 | Illustration revue, affichée ; écran non probant |
| `fenix-cl26r-pro-camping-lantern-blackout.webp` | CL26R Pro | Illustration revue, affichée |
| `jackery-solarsaga-100w-air-solar-panel-blackout.webp` | SolarSaga 100 Air | Illustration revue, affichée |
| `kidde-c3010-carbon-monoxide-alarm-blackout.webp` | C3010 | Illustration du modèle US revue, affichée ; réserve canadienne visible |
| `iniu-p62-20000mah-power-bank-blackout.webp` | P62 | Illustration de famille revue, affichée ; réserve de sécurité visible |
| `fenix-hm50r-v2-headlamp-blackout.webp` | Aucune des huit fiches | Réserve BLACKOUT, pas de nouvelle fiche ni substitution à la lanterne |

L'image Explorer 300 n'est pas une correction de celle précédemment rejetée : elle conserve **USB-C 100 W au lieu de 60 W**, des marquages USB-A différents, un affichage circulaire et le bouton POWER. Elle est enregistrée comme rejetée et ne dispose d'aucune route publique, même après confirmation des droits. [Référence Jackery](https://faq.jackery.com/hc/en-us/articles/52303678342683-Explorer-300-Basic-Information).

Les sept illustrations acceptées ont été inspectées visuellement et comparées à la composition antérieure revue ou aux vues fabricant : [Fenix](https://www.fenixlight.com/product/cl26r-pro/), [Jackery 1000 v2](https://ca.jackery.com/products/jackery-explorer-1000-v2-portable-power-station), [EcoFlow](https://ca.ecoflow.com/products/river-2-pro-portable-power-station), [Midland](https://midlandusa.com/products/er310-portable-emergency-crank-weather-radio), [INIU](https://iniushop.com/products/iniu-p62-e1-power-bank-smallest-20000mah-65w), [Kidde US](https://www.kidde.com/products/carbon-monoxide-alarms/10-year-battery-power-carbon-monoxide-alarm), [SolarSaga Air](https://ca.jackery.com/products/jackery-solarsaga-100-air). Forme, commandes et disposition visible des connecteurs sont cohérentes à ce niveau illustratif. Les petites inscriptions, numéros de série et écrans ne sont pas authentifiés. La revue visuelle ne confirme ni la variante Amazon actuelle ni la sécurité d'une unité vendue.

Chaque image porte un texte alternatif descriptif et une légende **« Concept illustration, not a product photograph »**. La fiche précise que les marquages et écrans rendus ne sont pas des preuves techniques. La conformité canadienne Kidde et la sécurité INIU restent non confirmées, indépendamment de l'illustration.

## Livraison technique et FALLOUT

Les sources restent dans `assets/media/blackout/` et `assets/media/fallout/`. Une route Astro statique ne produit que les sept WebP de produits autorisés et revus, sous `/images/blackout/<nom-seo>.webp`. Elle restitue exactement leurs octets ; aucun service de transformation n'est utilisé. Le composant partagé sélectionne le bon fichier par identifiant de produit. Les fichiers rejetés ou réservés ne sont jamais copiés dans dist.

Les images sont carrées, avec dimensions intrinsèques, `object-fit: contain`, affichage fluide et chargement différé sur les cartes. Le pack ne fournit qu'une taille par image : elle est conservée pour éviter une recompression inutile ; aucun téléchargement multi-résolution n'est revendiqué pour ces fichiers. Le bunker garde son srcset de trois tailles et sa priorité d'origine. Les styles BLACKOUT ambre et FALLOUT rouge restent intacts.

Les cinq médias FALLOUT sont prêts dans une structure dédiée, **sans publication de fiches Phase 4** : SOL Emergency Bivvy, Leatherman Wave Plus, Sawyer Squeeze SP129, Nanuk 904 et Reliance Aqua-Tainer. Leurs droits sont confirmés pour le pack, mais les modèles et détails seront revus pendant leur phase. Le manifeste signale notamment les accessoires et textes thermiques SOL, la géométrie des outils Leatherman, le bundle Sawyer, le contenu médical Nanuk et les marquages de volume ambigus Reliance. Aucune couleur ni détail n'a été corrigé ou inventé.

## Catalogue, affiliation et SEO

Le build contient toujours les **huit fiches informatives**, les huit cartes sur `/gear/` et sur `/blackout/`. Sept cartes et fiches affichent leur illustration ; Explorer 300 conserve son emplacement neutre. Le template reste interne. Aucun produit n'est créé en doublon.

Les huit boutons **« Voir sur Amazon.ca »** restent préparés mais désactivés. ASIN, URL et tag `apocalypsegear-20` sont inchangés. Le statut actif du compte et la correspondance actuelle des annonces restent non confirmés ; la confirmation des droits d'image ne les valide pas. Les contrôles de sécurité, avertissements et divulgations demeurent présents.

Les fiches et le catalogue en attente restent noindex et hors sitemap, mais consultables par navigation. BLACKOUT demeure indexable. Les canoniques, H1 et descriptions sont conservés, sans prix, disponibilité, notes, avis ou données Offer inventés. Le [rapport du catalogue](public-blackout-catalogue.md) contient les étapes exactes de fusion et de déploiement manuel.

## Validation finale

Résultats locaux : **Astro check 52 fichiers, 0 erreur/avertissement/hint ; 25 tests unitaires ; 31 tests navigateur ; 15 pages HTML ; 344 références internes ; 5 URL sitemap**. Les validations de schéma, de fixtures et des 33 WebP passent. Les étapes intermédiaires ont révélé un type de srcset trop restrictif et deux assertions/chargements propres à Playwright, corrigés avant la relance réussie. La capture des pages attend aussi le décodage des images différées avant l'inspection visuelle.

Les résultats exacts et les liens GitHub Actions sont consignés dans la PR. Les contrôles couvrent Astro, tests unitaires, données produits, les 33 WebP (19 antérieurs et 14 importés), build réel, sitemap/liens, navigateur, responsive 320 à 1920 px, axe, rendu des huit profils et comparaison des octets des sept réponses WebP avec les sources du ZIP. Les captures actualisées sont accessibles dans [le rapport du catalogue](public-blackout-catalogue.md#captures-réelles-inspectées).

**Verdict : MERGE pour le catalogue informatif avec sept illustrations autorisées et les réserves de médias organisées.** Explorer 300 nécessite toujours un remplacement fidèle. Les contrôles commerciaux sont conservés. Aucune fusion ni aucun déploiement automatique n'est effectué.
