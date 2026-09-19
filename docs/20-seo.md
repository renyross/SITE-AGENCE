# Point 20 — SEO et métadonnées

Statut : validé par l’utilisateur. Passage au point 21 autorisé.

## Livraison

Les 36 routes disposent d’un titre et d’une meta description propres, d’une URL canonique absolue, de métadonnées Open Graph et Twitter Cards et d’un graphe JSON-LD adapté au contenu.

Les H1 et la structure des pages du point 19 sont conservés. Des FAQ visibles sont ajoutées aux neuf pages d’expertise, à l’audit et à la prise de rendez-vous. Leur contenu et leur schéma proviennent de la même fonction pour éviter les divergences.

## URL canoniques

La variable `SITE_URL` définit le domaine officiel. Sans cette valeur, l’aperçu utilise `http://127.0.0.1:3000` et reste non indexable. Aucun domaine commercial n’est inventé.

Les variantes `/blog?category=guides` et `/contact?subject=careers` désignent respectivement `/blog` et `/contact` comme URL canoniques. Les chemins inexistants répondent en 404 et ne reçoivent pas de canonique vers une page valide.

## Partage social

Chaque page possède un titre, une description et une image de partage propres. La route `/share?page=...` génère un PNG de 1 200 × 630 px avec la palette validée et le titre de la page. Twitter utilise le format `summary_large_image`. Les noms de compte social restent absents tant que les profils officiels ne sont pas fournis.

## Données structurées

| Type | Application |
| --- | --- |
| WebPage | Toutes les pages de contenu |
| Organization | Générateur prêt ; activation uniquement avec nom réel et domaine officiel |
| Service | Neuf pages d’expertise, avec référence au fournisseur lorsque l’organisation est configurée |
| Article | Trois brouillons du blog, avec `creativeWorkStatus: Draft` |
| BreadcrumbList | Toutes les pages hors accueil |
| FAQPage | Pages comportant effectivement une FAQ visible |

Les types ne sont pas ajoutés indistinctement à toutes les pages. Aucune note client, aucun auteur, aucune date de publication, aucune adresse ni certification non fournis ne sont inventés. Les exemples fictifs ne sont pas balisés comme des avis clients.

Le JSON-LD est sérialisé avec échappement du caractère `<`. La présence d’un schéma n’est pas présentée comme une garantie de résultat enrichi ou de recommandation IA.

## Configuration et indexation

Fichiers de référence :

- `.env.example` : `SITE_URL` et `SITE_INDEXING`.
- `content/site.json` : nom, raison sociale facultative, description, profils officiels et `approvedRoutes`.
- `lib/seo.ts` : métadonnées, règles d’indexation, FAQ et graphes structurés.
- `app/sitemap.ts` et `app/robots.ts` : sitemap et règles d’exploration.

Par défaut, toutes les pages portent `noindex, follow` et le sitemap est vide. Le fichier robots autorise l’exploration pour permettre la lecture de la directive `noindex` ; il ne constitue pas un contrôle d’accès.

Pour préparer une publication, renseigner l’origine HTTPS réelle, le nom de l’entreprise, les routes approuvées et activer `SITE_INDEXING=true`, puis reconstruire l’application. Les URLs mal formées, les origines locales et les origines comportant des identifiants sont refusées dans `SITE_URL`.

Les pages de blog, études de cas et l’accueil contenant des preuves fictives restent explicitement exclus de l’indexation dans le modèle actuel, même s’ils sont ajoutés à la liste des routes approuvées. Leur publication nécessitera d’abord de remplacer ou de valider les contenus et d’adapter cette règle. Les pages non indexables ne figurent pas au sitemap. Aucune date de dernière modification artificielle n’est générée.

## Vérification effectuée

- Compilation Next.js et vérification TypeScript réussies.
- 36 titres et 36 descriptions distincts contrôlés dans le navigateur.
- Canoniques, Open Graph, Twitter Cards et types JSON-LD contrôlés sur les 36 routes.
- Questions et réponses structurées identiques aux FAQ affichées.
- Canoniques des variantes filtrées, 404, robots et sitemap de revue vérifiés.
- Génération de deux images PNG de 1 200 × 630 px vérifiée, avec revue visuelle de l’image d’accueil.
- Configuration de publication, liens Organization/Service et filtrage d’indexation testés avec des données isolées, sans modifier l’identité réelle du projet.

Commandes : `npm run build`, `npm run typecheck`, `node scripts/check-seo-config.cjs` et, serveur lancé, `CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/check-seo.cjs`.

Ces vérifications portent sur le code et le HTML généré. Aucun résultat d’indexation, de classement, de Rich Results Test externe ou de Search Console n’est revendiqué.

## Sources techniques consultées

- [Next.js — generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).
- [Google Search Central — Organization](https://developers.google.com/search/docs/appearance/structured-data/organization).
- [Google Search Central — Article](https://developers.google.com/search/docs/appearance/structured-data/article).
- [Schema.org — Service](https://schema.org/Service) et [FAQPage](https://schema.org/FAQPage).

## Étape suivante

Point 21 : contenus et structure GEO / AI Search, après validation explicite du SEO.
