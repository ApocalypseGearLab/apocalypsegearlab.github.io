# Audit GA4, Search Console et SEO technique

Audit du 29 octobre 2026 (soir, America/Toronto ; preuves horodatées le 30 octobre UTC).
Branche : `fix/ga4-gsc-technical-audit`, base `80f740804469cbd3bf622e4a38d6d1ad471dcac3`.

## Diagnostic et corrections

La [PR #18](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/pull/18) est réellement fusionnée (`a0b71e4`). Le [déploiement manuel #15](https://github.com/ApocalypseGearLab/apocalypsegearlab.github.io/actions/runs/40989921443) a réussi sur la base ci-dessus, qui contient aussi la PR #17.

L'alerte « collecte inactive » n'est pas reproductible comme une panne du tag : le site public charge déjà `gtag.js` en HTTP 200 et envoie des `page_view` acceptés par `/g/collect` en HTTP 204 pour `G-YFJJ5N9RBX`. Les rapports privés GA4/GSC n'ont pas été consultés dans cet audit ; les outils de dépôt et le navigateur de test n'authentifient pas ces interfaces. Un HTTP 204 ne prouve pas le traitement ni l'affichage de l'événement dans la propriété.

Le défaut démontré était l'absence d'un gestionnaire pour `data-affiliate-click`. Il est maintenant installé dans le layout partagé, par un composant Google unique. Aucun changement de produit, d'ASIN, d'autorisation commerciale, d'image ou de déploiement n'est nécessaire.

| Élément | Diagnostic | Correction | Test | Statut |
|---|---|---|---|---|
| GA4 | Tag présent et fonctionnel en production ; alerte privée non vérifiable | Identifiants centralisés, composant unique ; chargement async réservé au build production | 1 loader et 1 config par document, Google 200, aucune erreur JS | Conforme côté navigateur ; rapports privés à contrôler |
| Page views | Envoi automatique déjà observé | Conserver `config` automatique, sans second envoi manuel ni écouteur d'historique | Accueil puis deux fiches : 3 événements HTTP 204, sans double page_view | Conforme |
| Affiliate clicks | Attributs préparés mais aucun émetteur | Gestionnaire délégué `affiliate_click`, souris, clavier et clic central ; navigation native indépendante de GA | Événement réel accepté 204, contrôles bloqués sans événement ; exception GA sans navigation cassée | Corrigé dans le candidat |
| Search Console | Balise publique présente ; validation déjà réussie selon propriétaire | Token exact et propriété conservés | Balise unique vérifiée sur toutes les pages générées et dans le HTML public | Conforme publiquement ; état privé non consulté |
| Sitemap index | Deux index HTTP 200, même enfant absolu | Générateur existant conservé ; tests de non-régression renforcés | XML strict, namespace, alias identique, enfant existant | Conforme |
| Sitemap enfant | 5 URL HTTPS uniques, aucune redirection ni noindex | Tests de doublons, URL et égalité exacte avec les pages indexables | Parseur XML navigateur + contrôle exhaustif du build + GET publics | Conforme |
| Robots.txt | Autorise le crawl et indique le bon index | Aucune réécriture inutile | GET 200 UTF-8 et directive Sitemap correcte | Conforme |
| Canonicals | URLs HTTPS cohérentes avec le domaine public | Conservation ; validation exhaustive | 37 pages, canonicals et `og:url` contrôlés | Conforme |
| Indexation | 5 pages indexables ; catalogue, 30 fiches et 404 volontairement exclus | Préserver les décisions éditoriales, sans retirer les noindex | Égalité sitemap/indexables ; protections produit et JSON-LD vérifiées | Conforme au projet ; indexation Google non garantie |

## HTTP public et sitemaps

Les GET réels de `/`, `/gear/`, `/blackout/`, `/fallout/`, `/outbreak/`, `/sitemap.xml`, `/sitemap-index.xml`, `/sitemap-0.xml`, `/robots.txt` ont tous retourné **200 sans redirection**. HTML : `text/html; charset=utf-8` ; XML : `application/xml` ; robots : `text/plain; charset=utf-8`. Les octets se décodent en UTF-8. Les XML sont analysés sans erreur et utilisent le namespace sitemaps.org attendu.

Aucun en-tête `X-Robots-Tag` ou CSP n'a été observé sur ces réponses publiques. Les requêtes de contrôle avec un User-Agent `Googlebot` réussissent aussi ; cette simulation ne prouve pas un passage depuis l'infrastructure Google. `robots.txt` contient `Allow: /` et `Sitemap: https://apocalypsegearlab.github.io/sitemap-index.xml`.

Les cinq URL soumises, toutes réellement vérifiées par GET, sont :

- `https://apocalypsegearlab.github.io/`
- `https://apocalypsegearlab.github.io/affiliate-disclosure/`
- `https://apocalypsegearlab.github.io/blackout/`
- `https://apocalypsegearlab.github.io/fallout/`
- `https://apocalypsegearlab.github.io/outbreak/`

`astro.config.mjs` filtre déjà les fichiers HTML rendus d'après leur robots metadata, exclut la 404 et copie l'index vers l'ancienne URL `/sitemap.xml`. Cette génération et `src/pages/robots.txt.ts` ont été conservées. Les trois XML sont validés à chaque QA. Une ancienne erreur GSC n'établit donc pas une panne permanente : il faut consulter son horodatage et relancer le test en direct dans la propriété existante.

## Émission des clics et absence de double comptage

`src/lib/affiliate-analytics.ts` ne crée ni ne réactive de liens. Il observe seulement les ancres actives portant `data-affiliate-click`, avec une URL canadienne, le chemin ASIN exact et le tag unique `apocalypsegear-20`. Il ignore les contrôles désactivés, les clics annulés et les métadonnées invalides. Un `WeakSet` rend l'installation idempotente dans un document. Une interaction souris/clavier émet un événement ; un `auxclick` central est traité séparément. Aucun `preventDefault`, délai de navigation, lien de remplacement ou attente de callback Analytics n'est ajouté.

Paramètres envoyés : `product_id`, `asin`, `merchant=amazon-ca`, `marketplace=ca`, `destination_url`, `page_location`. Ce dernier est transmis par GA dans le champ réseau `dl`, plutôt que comme `ep.page_location`. Les paramètres arbitraires et fragments de l'URL de la page ne sont pas transmis par notre événement. La destination conserve l'ASIN et le tag autorisés.

Le test avec le vrai script Google a observé **un `affiliate_click` et zéro événement automatique `click`** pour l'action simulée. La réponse était 204. Ce constat vaut pour le paramétrage de flux observé pendant ce test, pas pour une future modification du compte. Pour conserver ce comportement, dans GA4 → Administration → Flux de données → flux web → Mesures améliorées → roue dentée, garder **Clics sortants désactivé** si les clics affiliés sont mesurés par cet événement. Ne pas créer en plus un événement dérivé `affiliate_click` à partir de `click`, ni une seconde balise GTM pour les mêmes ancres. Les rapports de clics affiliés doivent filtrer `event_name = affiliate_click`, sans additionner `click` et `affiliate_click`. Aucun paramètre gtag non documenté ni blocage de propagation DOM n'est utilisé pour tenter de changer ces réglages privés.

Le script standard charge de manière asynchrone ; aucun mode de consentement n'accorde artificiellement une permission. Aucun CMP n'était installé dans le code audité. Les signaux publicitaires Google et la personnalisation publicitaire sont désactivés dans cette intégration analytique. Aucun contournement d'extension, de CSP ou d'un refus de consentement n'est ajouté. Le fonctionnement en navigateur propre ne prouve pas le fonctionnement en présence d'une extension ; l'échec d'Analytics est explicitement testé sans casser le lien.

## Vérifications dans les interfaces du propriétaire

Ces étapes restent des vérifications privées, pas des résultats revendiqués :

1. **GA4** : ouvrir la propriété du site, Administration → Flux de données → Web ; confirmer `G-YFJJ5N9RBX` et le domaine HTTPS exact. Consulter Temps réel puis DebugView avec une visite de test identifiable. Vérifier aussi les filtres de trafic interne/développeur et leur état : un filtre actif peut exclure une visite QA des rapports. Ne pas installer une deuxième balise pour faire disparaître une alerte de statut.
2. **Définitions personnalisées** : Administration → Affichage des données → Définitions personnalisées → Créer une dimension personnalisée, portée **Événement**, pour `product_id`, `asin`, `merchant`, `marketplace`. `page_location` possède déjà la dimension standard Emplacement de la page. Créer `destination_url` uniquement si les rapports en ont besoin ; éviter les dimensions d'identifiant de visite ou d'URL arbitrairement variables. Les définitions ne remplacent pas le contrôle du payload dans DebugView.
3. **GSC** : sélectionner l'actuelle propriété préfixe `https://apocalypsegearlab.github.io/`. Ne pas recréer la propriété ni changer le token. Dans Sitemaps, soumettre ou réenvoyer **`sitemap-index.xml`** dans cette même propriété. Consulter la dernière lecture et le détail de l'enfant ; cinq URL attendues avec la politique éditoriale actuelle. L'alias `sitemap.xml` reste valide et n'a pas besoin d'une deuxième soumission.
4. **Inspection d'URL** : tester en direct l'accueil et chaque page de secteur ; examiner « exploration autorisée », récupération, canonical déclaré, rendu et ressources. Puis inspecter une fiche produit et `/gear/` : leur noindex est intentionnel ; ne pas demander leur indexation. Le canonical choisi par Google et la présence effective dans l'index nécessitent les données privées de l'inspection.
5. Si « Impossible de récupérer » persiste avec une **nouvelle** tentative, relever l'URL exacte, l'heure de lecture et l'erreur détaillée, puis comparer les réponses HTTP aux preuves jointes. Aucune soumission de sitemap ni demande d'indexation n'a été effectuée par cet audit.

## Preuves et reproduction

Les fichiers dans [`qa/google-audit/`](qa/google-audit/) ne contiennent pas de cookies, secrets ou identifiants client GA :

- `public-before.json` : première observation du déploiement existant, sans clic affilié.
- `public-network.json` : GET publics, les cinq URL soumises, XML strict, simulation User-Agent et navigation réelle sur deux fiches.
- `local-network.json` : candidat servi par Astro preview sur localhost, vrai réseau Google, destination Amazon simulée localement.
- `candidate-network.json` : candidat `dist` rendu à l'origine publique par interception Playwright **du seul site propriétaire** ; Google est réellement contacté, Amazon reste simulé. **Ce n'est pas un déploiement.** Trois `page_view` et un clic affilié sont acceptés en 204, sans événement automatique `click` supplémentaire ni erreur JS.
- `test-results.json` et les logs correspondants : validations locales et codes de sortie.

Commandes, avec Node compatible et Chromium Playwright installés :

```sh
npm run check
npm test
npm run test:images
npm run release:check
npm run audit:affiliate
npm run test:products
npm run build
npm run test:site
npm run test:browser
# HTTP public + navigateur sans émission GA :
npm run audit:google
# Test réseau explicite du candidat, sans déployer ; envoie du trafic QA à GA :
npm run audit:google -- --live --affiliate-smoke --render-dist --out=.tools/qa/candidate-google.json
```

Les tests de régression interceptent Google pour ne pas fabriquer des centaines de visites ou de clics dans la propriété. Le test réseau explicite reste séparé de la CI. Toutes les ouvertures Amazon des tests sont des simulations locales, sans visite du marchand ni achat.

Sources primaires consultées : [page views GA4](https://developers.google.com/analytics/devguides/collection/ga4/views), [API gtag](https://developers.google.com/tag-platform/gtagjs/reference), [mesures améliorées](https://support.google.com/analytics/answer/9216061?hl=en), [dimensions d'événement](https://support.google.com/analytics/answer/14239696), [DebugView](https://support.google.com/analytics/answer/7201382?hl=en), [rapport Sitemaps](https://support.google.com/webmasters/answer/7451001?hl=en), [inspection d'URL](https://support.google.com/webmasters/answer/9012289?hl=en), [format des sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [intégration Astro](https://docs.astro.build/en/guides/integrations-guide/sitemap/).

## Préservation et livraison

Validation locale complète : **75 fichiers Astro/TypeScript contrôlés, zéro diagnostic ; 57 tests unitaires ; 78 tests Playwright réussis**. Le build génère **37 pages HTML**, et `test:site` vérifie **1 201 références internes et 5 URL de sitemap**. Les contrôles médias, schémas produits, publication et audit affilié terminent tous avec le code 0. Les tests axe couvrent les règles WCAG 2 A/AA et 2.1 AA disponibles dans cet outil, avec des contrôles de largeur de 320 à 1 920 px ; cela ne constitue pas une certification WCAG exhaustive.

Captures du build candidat relues visuellement : [accueil mobile, 320 px](qa/google-audit/home-320.webp) et [accueil ordinateur, 1 440 px](qa/google-audit/home-1440.webp). Le bunker, le titre et le CTA restent lisibles dans les deux dispositions. Seules ces captures QA sont exportées en WebP ; aucune illustration du site n'est recompressée.

Les 30 fiches informatives, 21 liens autorisés et 9 blocages documentés restent identiques. Les ASIN, le tag, les statuts draft, les noindex, les avertissements de sécurité, le bunker et les illustrations ne changent pas. Les fichiers produit, politiques commerciales, styles et configuration de déploiement ne sont pas modifiés. Les données structurées continuent d'être vérifiées sans inventer d'Offer, de Review ou de Product approuvé.

`preservation.json` compare les objets Git de **132 fichiers protégés** à la base et enregistre aussi leurs empreintes SHA-256 locales. Les conversions de fins de ligne propres au checkout Windows sont prises en compte ; les médias restent identiques.

Fichiers de code concernés : `src/layouts/BaseLayout.astro`, nouveaux `src/components/GoogleAnalytics.astro`, `src/config/analytics.ts`, `src/lib/affiliate-analytics.ts`, `scripts/audit-google.mjs`, `scripts/verify-site.mjs`, `package.json`, `tests/analytics.test.ts`, `tests/browser/analytics.spec.ts` et `tests/browser/fixtures.ts`. Les douze suites navigateur existantes utilisent le même fixture d'isolation Google ; les trois suites créant leurs propres contextes appliquent aussi cette isolation. Ce rapport et `docs/qa/google-audit/` portent les preuves, captures et logs. Aucun nouveau paquet npm n'est ajouté.

**Verdict technique : MERGE**, après revue du propriétaire. Les observations privées de réception GA4 et d'indexation GSC restent à effectuer dans les interfaces décrites ; elles ne sont ni simulées ni revendiquées comme validées.

La PR doit être revue, fusionnée par le propriétaire puis publiée via **Deploy to GitHub Pages (manual approval)** depuis `main`, avec l'entrée `confirm_publish` explicitement activée. Aucune fusion et aucun déploiement n'ont été lancés ici. Le nouveau suivi affilié ne sera présent sur le site public qu'après ces actions. Les vérifications privées ci-dessus ne doivent pas être présentées comme déjà effectuées.
