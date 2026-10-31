# Phase 4.8 — 3M 2091 : autorisation du lien canadien

Base inspectée : `main` à `0fb4c38f91b3990e68289bb2a31675bf92b692a4`, après fusion confirmée de la PR #20. Branche dédiée : `feat/phase4-8-3m-2091-amazon-activation`. Aucune autre PR ouverte lors de la reprise ; aucune fiche ni image recréée.

## Décision et preuves

Le lien enregistré `https://www.amazon.ca/dp/B001D1JCK4?tag=apocalypsegear-20` est désormais autorisé par `affiliateReview.decision = link-permitted`. La transcription fournie par le propriétaire relie :

- La marque 3M, le titre `3M Particulate Filters P100 #2091/07000, Pink, 2 Count` et l'ASIN `B001D1JCK4`.
- Le modèle annoncé `2091/07000` et le conditionnement de **deux filtres, une paire**.
- Les composants annoncés `3M Filter #2091P100 2/Bag`.

`listingEvidence` utilise `method: owner-document`, l'ASIN exact, l'URL canadienne sans tag comme source et le modèle canonique existant `2091`. La désignation `2091/07000` figure aussi sur la [page 3M Canada consultée](https://www.3mcanada.ca/3M/en_CA/p/dc/v101229317/), qui distingue bien le P100 particules du 2097 et n'indique pas de soulagement des odeurs pour ce modèle. Sa caisse fabricant de 100 unités ne détermine pas le conditionnement Amazon.

Le champ Amazon `FBA_51131070009` est conservé comme valeur **rapportée par le détaillant**, sans l'authentifier comme identifiant fabricant 3M. La quantité annoncée relève des preuves de l'offre, pas d'une spécification technique fabricant : aucun champ technique n'est réécrit avec cette preuve de détaillant.

La date `2026-10-31` est la date de cette revue documentaire. La date de capture reste inconnue. Le fichier de capture original n'est pas joint à cette phase et n'a pas été inspecté indépendamment. L'outil de lecture web ne permet pas de lire l'URL Amazon.ca tentée et ne fournit pas de code HTTP observable ; ce résultat n'est pas une preuve de lien invalide.

Les observations du propriétaire (15,75 CAD, vendeur ENmobile, expédition Amazon) restent seulement dans [le dossier de preuve interne](qa/phase4-8/commercial-evidence.json). Elles ne deviennent pas des prix, vendeurs, modes d'expédition ou stocks actuels affichés sur le site.

Les anciennes phrases affirmant l'absence totale de preuve du modèle ou du paquet sont remplacées par un **conditionnement annoncé**, avec vérification de l'offre sélectionnée et des unités à réception. Cette permission du lien ne prouve pas l'authenticité physique, le contenu livré, le vendeur actuel, le lot, l'expiration ou la pertinence pour un danger donné.

## Protections conservées

Le 2091 reste une fiche informative en brouillon : `visibility=informational`, `reviewStatus=draft`, `testing=not-tested`, `listingVerified=false`, `safetyStatus=pending`, `publicationApproved=false`, `lastVerified=null`. La revue complète de l'offre actuelle, des unités livrées, de l'assemblage approuvé et de la sécurité demeure requise avant publication éditoriale approuvée.

Les précautions respiratoires, spécifications et références fabricant restent identiques : filtre de particules, aucune attribution du soulagement limité des vapeurs organiques du 2097, pas de cartouche universelle gaz/vapeurs, aucun apport d'oxygène, sélection du danger, paire compatible approuvée, ajustement et formation. Aucun essai physique n'est revendiqué.

Les fiches 2097, 60921 et 60926 sont inchangées. Les protections Kidde, INIU, Explorer 300, EcoFlow RIVER 2 Pro et NANUK 904 sont conservées. Le catalogue comporte toujours 30 profils informatifs, avec **25 liens autorisés et cinq blocages**. L'approbation finale du compte Amazon n'est toujours pas déclarée confirmée.

Le PNG original, ses trois variantes WebP 480/960/1254, les manifestes, légendes conceptuelles et droits documentés restent inchangés. Aucun réencodage d'image produit n'a lieu. Le bunker et les autres illustrations sont préservés.

Les composants, fonctions d'autorisation commerciale, GA4, GSC, CSS et workflows ne sont pas modifiés. Le même bouton partagé conserve `target=_blank`, `rel="sponsored nofollow noopener"`, les données de suivi et la déclaration d'affiliation. Les canonicals, `noindex, nofollow` et données structurées conditionnelles restent soumis aux règles existantes ; aucune donnée `Product`, `Offer` ou notation n'est inventée.

## Validation

| Contrôle | Résultat |
|---|---|
| Astro check | 79 fichiers, zéro erreur, avertissement ou hint |
| Tests unitaires | 61/61 réussis |
| Médias | 30 associations uniques, 29 illustrations admissibles, un visuel rejeté ; empreintes et dimensions valides |
| Contrôles commerciaux | 25 liens actifs, cinq blocages documentés ; URL, ASIN, tag et preuves cohérents |
| Scénarios produits | Validés, fixtures restaurées après le test |
| Build de production | 37 pages HTML |
| Validation du site | 1 209 références internes, cinq URL de sitemap, robots, canonicals, noindex et JSON-LD valides |
| Playwright | Relance complète : 82/82 réussis (3,2 min localement) |
| CI GitHub | Voir la PR dédiée pour le résultat de la CI sur le commit livré |

La première exécution unitaire a signalé une assertion historique qui exigeait l'absence de `listingEvidence` pour le 2091. Cette attente obsolète a été actualisée pour inclure la nouvelle preuve propriétaire ; la relance passe 61/61. Aucun contrôle de sécurité n'est supprimé. Les snapshots historiques de la Phase 4.7 ne sont pas réécrits : la seule exception produit nouvelle est protégée par le nouveau test Phase 4.8.

La première passe navigateur a donné 80 succès et deux échecs d'assertion : le compteur OUTBREAK attendait encore 11 liens au lieu des 12 désormais autorisés, et le nouveau test comparait directement l'objet `arguments` de gtag à un tableau. Le compteur a été corrigé et le test convertit cet objet avec `Array.from`, comme les contrôles Analytics existants. Les paramètres de l'événement observé étaient déjà corrects ; aucun code de tracking n'est modifié. Les journaux de cette première passe sont conservés séparément de la relance finale.

Les tests ajoutés vérifient le contenu documentaire, les limites d'approbation, les garde-fous commerciaux, la conservation de tous les autres produits et médias. Le navigateur contrôle le 2091 dans `/gear/`, `/outbreak/`, sa fiche et le module 6800, sur téléphone et ordinateur : vrai lien, nouvel onglet isolé, attributs, déclaration et un seul `affiliate_click` avec les paramètres attendus. Les essais Amazon et Google sont isolés : pas de visite marchand réelle ni de pollution volontaire de la propriété Analytics.

La suite existante conserve ses contrôles responsive 320–1 920 px, accessibilité axe, images, maillage et SEO. Ces tests de laboratoire ne constituent pas une certification WCAG exhaustive ni une validation d'ingestion dans les consoles Google privées.

Les journaux locaux sont dans `.tools/qa/phase4-8/`. Les preuves et empreintes persistantes sont dans `docs/qa/phase4-8/`. Aucun déploiement et aucune fusion ne sont autorisés par cette livraison.

Captures de production inspectées : fiche 2091 [téléphone](qa/phase4-8/profile-2091-375.webp) et [ordinateur](qa/phase4-8/profile-2091-1440.webp), section 6800 [téléphone](qa/phase4-8/compatible-375.webp) et [ordinateur](qa/phase4-8/compatible-1440.webp). Les captures de QA sont encodées séparément ; aucun média produit n’est recomprimé. Les huit clics 2091 (quatre emplacements × deux largeurs) produisent chacun un seul événement affilié. La suite générale vérifie aussi 75 ouvertures isolées sur l’ensemble du catalogue, des secteurs et des fiches.

Fichiers modifiés : un seul JSON produit (2091), les attentes de tests affectées par son activation, deux nouveaux fichiers de tests Phase 4.8, la liste des tests dans `package.json`, ce rapport et le dossier de preuves/empreintes/captures. Les 175 autres fichiers sources, produits, politiques et médias protégés restent identiques à la base.
