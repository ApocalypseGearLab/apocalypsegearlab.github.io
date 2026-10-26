# Huit équipements BLACKOUT — catalogue informatif public

**Finalisation avec le ZIP :** sept illustrations désormais autorisées et affichées, Explorer 300 conservé en visuel neutre ; cinq médias FALLOUT et la frontale supplémentaire organisés pour la suite. Voir le [rapport d’import et de revue des 14 WebP](webp-pack-integration.md).

Livraison du 25 octobre 2026, liée à l'[issue nº 6](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/issues/6). La PR nº 5 est fusionnée dans main (`f3559b7406b4b2fb80526e3e8d576d8eb7a16523`). La branche `feat/visible-blackout-info-catalogue`, déjà commencée depuis ce main et sans PR ouverte, a été reprise au commit `348267359f9eccb9f88020d79c9c9b43bf45dee7`. Son premier état ne montrait que cinq fiches : cette livraison complète les huit sans recréer leurs données ni leur architecture.

## Résultat réellement construit

Les huit équipements sont présents dans **le build de production**, sur `/gear/`, `/blackout/` et leurs pages `/gear/<slug>/`. Ils ne sont pas déclarés déployés : le site distant ne changera qu'après fusion et exécution autorisées du workflow Pages.

| Produit | ASIN conservé | Fiche produite | Bouton Amazon.ca |
|---|---|---|---|
| Jackery Explorer 1000 v2 | B0D7PPG25F | `/gear/jackery-explorer-1000-v2/` | En attente |
| EcoFlow RIVER 2 Pro | B0BVLPGS79 | `/gear/ecoflow-river-2-pro/` | En attente |
| Jackery Explorer 300 | B082TMBYR6 | `/gear/jackery-explorer-300/` | En attente |
| Midland ER310 | B015QIC1PW | `/gear/midland-er310/` | En attente |
| Fenix CL26R Pro | B0CGKWX5YT | `/gear/fenix-cl26r-pro/` | En attente |
| Jackery SolarSaga 100 W Air | B0FX8P4JST | `/gear/jackery-solarsaga-100w-air/` | En attente |
| Kidde C3010 | B00FHW7PBS | `/gear/kidde-c3010-co-alarm/` | En attente |
| INIU P62 | B0DB888L9F | `/gear/iniu-p62-20000mah-65w/` | En attente |

### Deux décisions distinctes

`visibility: "informational"` sélectionne explicitement une fiche documentaire pour affichage. La valeur par défaut est `internal` : un futur brouillon ou le template ne devient pas public automatiquement. Le schéma exige des caractéristiques sourcées et un dossier documentaire pour les fiches informatives.

`isCommerciallyApproved` conserve les contrôles d'annonce, sécurité, approbation éditoriale et les trois blocages obligatoires. Les huit fiches restent `reviewStatus: "draft"`, `testing: "not-tested"`, `lastVerified: null`, `listingVerified: false` et `publicationApproved: false`. Leur visibilité n'est ni une certification, ni un essai physique, ni une recommandation d'achat. Le diagnostic affiche séparément **8 fiches informatives visibles / 0 produit commercialement admissible / 3 blocages obligatoires**. Le refus de `--require-ready` concerne uniquement l'admissibilité commerciale et n'empêche pas le build informatif.

Les tableaux, avantages, limites, usages conditionnels et sources existants sont conservés. Les textes Kidde/INIU sont reformulés pour le lecteur ; trois listes de vérifications d'achat sont ajoutées. Les étapes internes d'approbation et notes de développement ne sont pas affichées dans les fiches publiques. BLACKOUT donne accès aux huit cartes sans feuille de route devant les équipements.

### Réserves visibles

- **Kidde C3010** : avertissement sur la carte et en tête de fiche ; certification canadienne et équivalence C3010-CA non établies. Aucune recommandation d'installation au Canada sans étiquette de certification réelle et instructions canadiennes.
- **INIU P62** : avertissement sur la carte et en tête de fiche ; révision, câble et preuves de sécurité du modèle exact incomplets. Aucun rappel d'un autre modèle n'est utilisé pour déclarer ce modèle sûr ou rappelé.
- **Explorer 300** : avertissement sur la carte et en tête de fiche ; capacité et révision régionale non rattachées à l'annonce. Aucune réutilisation de l'illustration incorrecte ni transfert de compatibilité SolarSaga 100 Air.
- Les autres fiches conservent leurs incertitudes de variante, d'annonce et d'usage. Midland ne promet pas de service Weatheradio canadien. Aucun prix, stock, évaluation ou avis commercial n'est ajouté.

## Amazon.ca : contrôles faits et manquants

Les huit URL sources sont intactes et correspondent syntaxiquement au bon domaine, à `/dp/<ASIN>` et à un seul `tag=apocalypsegear-20`. Cette validation n'authentifie pas le modèle actuellement vendu. Les huit pages directes Amazon.ca ont été tentées et sont inaccessibles à l'outil de lecture. Une ancienne [copie indexée INIU](https://www.amazon.ca/INIU-20000mAh-Compact-Portable-Charger/dp/B0DB888L9F) associe P62 et son ASIN, mais ne résout ni la révision P62-E1 actuelle ni sa sécurité ; aucune donnée de prix, avis ou disponibilité n'en est reprise.

Les boutons **« Voir sur Amazon.ca »** sont préparés sur les huit fiches, sans `href` et avec `aria-disabled="true"`. Il n'y a **aucun bouton Amazon actif**. Les raisons affichées portent sur la correspondance de l'annonce canadienne et l'admissibilité d'affiliation. Le [dossier détaillé par produit](qa/public8/product-audit.json) conserve les contrôles spécifiques manquants.

Amazon Canada décrit une [évaluation après trois ventes admissibles dans la période initiale de 180 jours](https://associates.amazon.ca/help/node/topic/G7MJTPEP9NC3YKMG). La validation finale de la candidature est donc distincte de la possibilité de participer pendant cette période. Cela ne confirme pas l'état du compte du propriétaire, l'autorisation du site ni l'attribution canadienne du tag. Le statut fourni reste non confirmé/en attente ; la validation fiscale mentionnée dans l'issue n'est pas une confirmation du programme actif. `AMAZON_ASSOCIATE_ENROLLED=false` reste inchangé. Le code ne transfère pas une permission canadienne à Amazon.com.

Les divulgations d'affiliation restent sur chaque fiche et dans la page dédiée. La formule Amazon prévue par le [contrat canadien](https://associates.amazon.ca/help/operating/agreement) est conservée pour affichage lorsque la participation est confirmée. Les futurs liens actifs conservent `sponsored nofollow noopener`, le balisage explicite et l'annonce d'ouverture d'un nouvel onglet. Aucun énoncé public ne prétend que le compte est déjà autorisé.

## Images et identité visuelle

Sept produits affichent maintenant l’illustration WebP fournie, après confirmation des droits par le propriétaire et revue visuelle. Explorer 300 garde son emplacement neutre carré avec grille charbon et ambre #F5A623, car ses marquages demeurent incorrects. Les illustrations sont identifiées comme conceptuelles, sans les présenter comme des photographies authentiques ou comme des preuves techniques. Les fichiers réservés FALLOUT et HM50R ne sont pas livrés publiquement.

Le bunker demeure public, avec sa confirmation propriétaire spécifique et les trois WebP responsives 768/1280/1672. **Les 19 WebP antérieurs sont identiques à main**. Les 14 nouveaux WebP sont conservés sans recompression, sous leurs noms SEO. Les sept fichiers autorisés sont livrés octet pour octet. La confirmation propriétaire du nouveau pack est distincte de celle du bunker et ne vaut pas approbation des produits ou des liens Amazon. Seules les captures QA sont réencodées.

## SEO, accessibilité et tests exécutés

| Contrôle | Résultat |
|---|---|
| `npm run check` | 52 fichiers, 0 erreur, 0 avertissement, 0 hint après correction de deux erreurs TypeScript initiales |
| `npm test` | 25/25 ; visibilité explicite, commercialisation toujours bloquée, modèle de preuve et séparation CA/US |
| `npm run build` | Réussite : 15 pages HTML, dont les huit fiches réelles |
| `npm run test:site` | 344 références internes, 5 URL sitemap ; liens, fragments, canoniques, descriptions, H1 uniques, JSON-LD, robots, srcsets et filtrage des médias validés |
| `npm run test:browser` | 31/31 ; production et revues locales distinctes, navigation, clavier, menu, sans JavaScript, mouvement réduit, erreurs JS |
| `npm run test:images` | 9 correspondances antérieures et 14 fichiers importés ; 33 WebP décodés, empreintes et dimensions vérifiées |
| `npm run test:products` | 3 fixtures synthétiques validées puis retirées ; build réel restauré |
| Contrôles de conservation | Huit ASIN/URL, modèles, tableaux techniques, sources, preuves, statuts et 19 WebP comparés à main : inchangés |
| Diagnostic commercial strict | Refus attendu, code 1 ; 8 visibles informativement, 0 admissible commercialement, 3 blocages |

Les huit fiches de production et les deux catalogues sont testés à **320/375/768/1024/1440/1920 px**. Axe WCAG 2 A/AA et 2.1 AA ne détecte aucune violation ; pas de débordement horizontal. Ces contrôles ne constituent pas une certification WCAG exhaustive. Safari, Firefox et appareils physiques non testés. Aucun nouveau score Lighthouse n'est revendiqué pour ce catalogue.

Les fiches en attente et le catalogue sont `noindex, nofollow`, exclus du sitemap mais pleinement consultables par navigation. BLACKOUT reste un hub indexable. Le sitemap contient exactement les cinq pages indexables. Les huit fiches ont leurs canoniques définitifs et des BreadcrumbList, sans Product/Offer/Review/AggregateRating pour ces dossiers non approuvés. Le template et `/review/` restent absents de production.

## Captures réelles inspectées

| Catalogue | Téléphone 375 px | Ordinateur 1440 px |
|---|---|---|
| BLACKOUT — huit cartes | [Capture](qa/public8/blackout-375.webp) | [Capture](qa/public8/blackout-1440.webp) |
| Gear — huit cartes | [Capture](qa/public8/catalogue-375.webp) | [Capture](qa/public8/catalogue-1440.webp) |

Les huit fiches ont également été inspectées : [Explorer 1000 v2](qa/public8/jackery-explorer-1000-v2-1440.webp), [EcoFlow](qa/public8/ecoflow-river-2-pro-1440.webp), [Explorer 300](qa/public8/jackery-explorer-300-1440.webp), [Midland](qa/public8/midland-er310-1440.webp), [Fenix](qa/public8/fenix-cl26r-pro-1440.webp), [SolarSaga](qa/public8/jackery-solarsaga-100w-air-1440.webp), [Kidde](qa/public8/kidde-c3010-co-alarm-1440.webp), [INIU](qa/public8/iniu-p62-20000mah-65w-1440.webp). Captures mobiles supplémentaires des deux dossiers de sécurité : [Kidde](qa/public8/kidde-c3010-co-alarm-375.webp), [INIU](qa/public8/iniu-p62-20000mah-65w-375.webp). Les captures pleine page doivent être ouvertes et agrandies pour lire chaque ligne sur téléphone.

## Fusion et déploiement — à effectuer par le propriétaire

1. Ouvrir la PR de `feat/visible-blackout-info-catalogue` vers main, consulter les captures et attendre la réussite de **Validate Astro site**.
2. Choisir **Merge pull request** (ou **Squash and merge**) puis confirmer la fusion. La fusion seule ne déploie pas le site.
3. Dans **Settings → Pages**, vérifier **Source: GitHub Actions**.
4. Dans **Actions → Deploy to GitHub Pages (manual approval) → Run workflow**, sélectionner **main**, cocher **confirm_publish** et lancer **Run workflow**.
5. Attendre la réussite des jobs **build** et **deploy** ; approuver l'environnement `github-pages` si GitHub le demande.
6. Ouvrir `https://apocalypsegearlab.github.io/gear/` et `/blackout/`, vérifier les huit cartes et ouvrir les huit fiches. Les huit boutons doivent rester en attente. Vérifier aussi le bunker sur l'accueil. Consulter le lien du déploiement pour confirmer la version servie.

**Verdict : MERGE pour la visibilité informative des huit équipements.** Leur activation commerciale demeure une décision ultérieure sur preuves. Aucune fusion, modification de main ou exécution du workflow de déploiement n'a été effectuée par l'agent.
