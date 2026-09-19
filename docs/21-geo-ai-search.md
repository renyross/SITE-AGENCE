# Point 21 — Contenus GEO / AI Search

Statut : validé par l’utilisateur. Passage au point 22 autorisé.

## Livraison

Les pages services disposent de réponses directes, complémentaires aux FAQ déjà visibles. Le glossaire partage désormais ses huit définitions avec un schéma `DefinedTermSet` : SEO, GEO, AEO, AI Search, CRO, attribution, citation IA et échantillon de visibilité.

Six pages complètent les 36 routes existantes :

- `/comparisons` : index des comparatifs.
- `/comparisons/seo-vs-geo` : objectifs, travail éditorial, observation et fondations communes.
- `/comparisons/geo-vs-aeo` : réponses, citations et chevauchement des pratiques.
- `/editorial-policy` : processus proposé de sources, revue et corrections.
- `/authors` : état des attributions éditoriales.
- `/authors/editorial-profile` : profil préparé, sans identité fictive.

Les comparatifs comprennent une réponse directe, un tableau HTML, les limites de l’explication et un lien vers une source primaire. Ils ne prétendent pas garantir un placement dans une réponse IA.

## Expertise et informations vérifiables

La page À propos affiche le nom, la raison sociale et l’origine officielle lorsqu’ils sont configurés ; sinon leur absence est indiquée. La liste d’expertises décrit le périmètre proposé sans ajouter de certifications ni de références clients.

Les articles pointent vers leur statut d’attribution et la politique éditoriale. Le fichier `content/authors.json` prépare les champs nom, rôle, biographie, qualifications et profils officiels. Aucun auteur réel n’a été fourni : la page expose cette limite et aucun schéma `Person` n’est généré. Les pages auteurs restent non indexables dans le modèle actuel.

Les études de cas détaillées du point 19 sont conservées. Elles restent explicitement fictives ; elles ne servent pas de preuves d’expertise ou de résultats mesurés.

## Fichier llms.txt

La route `/llms.txt` renvoie un document texte structuré en Markdown : présentation, statut de revue, informations d’entreprise, services, définitions, comparatifs et ressources optionnelles.

Ses liens reprennent l’origine configurée dans `SITE_URL`, ou l’origine locale pour cet aperçu. Le fichier signale que les études de cas, témoignages et chiffres sont fictifs, que les articles sont des brouillons et que les formulaires ne transmettent rien. Il ne répertorie pas les cas fictifs comme des preuves clients.

Un lien `rel="describedby"` rend le fichier découvrable depuis les pages HTML. Les pages liées sont du HTML rendu côté serveur ; des variantes Markdown exhaustives ne sont pas implémentées à cette étape.

`llms.txt` reste une proposition de convention, pas une garantie d’utilisation par chaque fournisseur. La documentation Google précise qu’un fichier IA spécial n’est pas nécessaire pour apparaître dans ses fonctionnalités de recherche IA. Sources : [proposition llms.txt](https://llmstxt.org/) et [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features).

## Données structurées et accès

Les nouvelles routes héritent du SEO du point 20 : métadonnées propres, canoniques, Open Graph, Twitter Cards et fil d’Ariane. Le glossaire expose des entités définies avec identifiants stables et descriptions identiques au contenu visible.

Le contenu des réponses, tableaux, définitions et profils est accessible dans le HTML sans exécution de JavaScript. Les règles de revue et de non-indexation restent en place. Le fichier `llms.txt` ne remplace ni robots.txt, ni le sitemap, ni les sources citées.

## Vérification

Compilation et TypeScript ; contrôles navigateur des routes et métadonnées ; contrôle du format de `llms.txt` et des destinations qu’il référence ; comparaison des définitions visibles avec leur schéma ; absence de personne inventée dans le JSON-LD des auteurs. Les scripts de vérification des points 19 et 20 sont étendus aux 42 routes.

Ces contrôles vérifient l’implémentation. Ils ne mesurent pas la citation du site par des moteurs IA et ne démontrent aucun gain de visibilité.

## Étape suivante

Point 22 : performance, Lighthouse et Core Web Vitals, après validation explicite du contenu GEO / AI Search.
