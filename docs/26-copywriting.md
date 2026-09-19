# Point 26 — Copywriting

Statut : révision des textes réalisée ; validation du point 27 en attente.

## Direction éditoriale

Français retenu pour harmoniser l’accueil et les pages détaillées. Les URL existantes sont conservées. Le titre de hero actuel, « Faites de votre marque la réponse évidente », est conservé ; le texte qui suit précise le travail proposé sans garantir un résultat.

Le ton privilégie les verbes concrets, les phrases courtes et la décision du client : trouver les bons prospects, faciliter la prise de contact, réduire les tâches répétitives, mesurer ce qui change. Les termes SEO, GEO et CRO restent utilisés lorsqu’ils aident à identifier une expertise ; le glossaire les explique simplement.

## Révisions appliquées

- Accueil : proposition de valeur raccourcie, bénéfices du calculateur, méthode, technologies, exemples de missions et contact.
- Services : promesses recentrées sur le besoin client et les indicateurs. Les noms de produits restent inchangés ; Gemini et Perplexity ne sont plus traduits.
- Pages commerciales, cas fictifs, articles, comparatifs, glossaire, politique éditoriale et attribution : textes et libellés harmonisés en français.
- FAQ, titres, descriptions SEO, langue du document et données structurées : cohérence avec les contenus visibles. Les liens et slugs sont conservés.
- Formulaires : libellés correspondant à l’action disponible. Une demande ne confirme pas un rendez-vous ; un téléchargement local ne prétend plus envoyer un e-mail.
- Pied de page : description raccourcie, suppression des villes présentées sans justification comme implantations et remplacement du faux statut opérationnel par l’heure locale. Les labels de liens reflètent mieux leurs destinations.

## Affirmations et preuves

Les contenus actuels ne fournissent pas de justificatifs de certifications ni de références clients vérifiées. Les badges de certification sont remplacés par une présentation neutre des plateformes publicitaires. Les chiffres cumulés « +140k », « 98.4 % » et « x2.8 » sont retirés ; l’espace présente les quatre étapes de travail.

Les trois cas restent des scénarios fictifs, signalés dès l’accueil et sur leurs pages détaillées. Leurs métriques sont illustratives, pas des preuves. Les dates de mission, délais de réponse et délais d’audit non confirmés ne sont plus formulés comme des engagements.

Le taux de 70 % du calculateur reste une hypothèse modifiable. Il n’est plus présenté comme une statistique générale sur les organisations. Le résultat est décrit comme le coût théorique du temps libéré ; la mise en place et la maintenance ne sont pas déduites, donc il ne s’agit pas d’une économie nette garantie.

Aucun client, diplôme, auteur, témoignage ni résultat supplémentaire n’a été inventé. L’identité de l’agence, les preuves et les modalités commerciales restent à valider avant publication. Le `noindex` reste actif.

## Exemples de reformulation

| Avant | Après |
| --- | --- |
| « CONÇU POUR REMPORTER DES PRIX DANS » | « Votre visibilité sur les moteurs IA » |
| « Jusqu’à 70 % des tâches […] peuvent être automatisées » | « Renseignez le temps consacré aux tâches manuelles et la part que vous envisagez d’automatiser. » |
| « Écoute forensique » | « Nous examinons votre offre, les questions de vos acheteurs et vos données disponibles. » |
| « Recettes, pas promesses : nos cas clients » | « Du besoin au plan d’action. Trois exemples illustratifs. » |
| « Rapport […] transmis à [e-mail] » | « Simulation téléchargée sur votre appareil. Aucun e-mail envoyé. » |

## Vérification

Build et TypeScript vérifiés. La recette navigateur contrôle les pages et métadonnées françaises, les mentions de scénarios fictifs et le téléchargement de la simulation sans requête POST. Les 108 combinaisons de pages et largeurs de la suite responsive du point 23 passent également. Un débordement des cartes publicitaires à 320 px a été corrigé. Résumé : `reports/copywriting/summary.json`.

Les scripts du calculateur conservent leurs formules. Le formulaire de simulation de l’accueil propose maintenant un fichier texte local cohérent avec son libellé ; il ne recueille plus d’adresse e-mail inutile à cette action. Le jeu de brouillons SQL Supabase est régénéré depuis les articles français, sans accès à une base externe.

## Étape suivante

Point 27 : objectif business, hiérarchie des CTA et parcours vers la prise de contact, après accord explicite.
