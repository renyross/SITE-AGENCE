# Point 6 — Section problème

Statut : validé par l’utilisateur. Passage au point 7 autorisé.

## Texte retenu

**Search has changed.**

Your customers no longer search only on Google.

They ask ChatGPT.  
They compare with Gemini.  
They validate with Perplexity.

Your brand needs to exist everywhere decisions are made.

Le texte reprend le brief comme message éditorial, sans ajouter de statistique de marché non documentée.

## Direction visuelle

Après la hero, une section aérée dispose le titre à gauche et les usages à droite. Les noms des plateformes sont accentués en vert, séparés par des filets fins. Sur petit écran, les deux colonnes s’empilent.

Trois cartes de métriques suivent le texte : grands chiffres tabulaires, libellés courts et annotation sur leur statut. Elles s’affichent sur une ligne sur grand écran et verticalement sous 1 024 px.

## Données du prototype

| Valeur | Libellé | Statut |
| --- | --- | --- |
| —% | Searches influenced by AI | Valeur absente, source à fournir |
| 5 | AI platforms monitored | Exemple de périmètre à confirmer |
| 24/7 | Visibility tracking | Exemple de disponibilité à confirmer |

Un avertissement visible et une annotation par carte distinguent les exemples des données validées. Aucun pourcentage de marché n’est inventé. Les deux valeurs numériques servent à examiner le traitement graphique et l’animation ; elles ne décrivent pas une prestation déjà disponible.

## Animation

Les valeurs numériques progressent une seule fois à l’entrée du groupe dans la fenêtre, pendant 900 ms. Le pourcentage sans source reste « —% ». Les lecteurs d’écran accèdent directement aux valeurs finales, sans annonces successives.

Si la réduction des animations est activée, les chiffres restent fixes. Si cette préférence change pendant l’animation, celle-ci se termine immédiatement. Sans IntersectionObserver, les valeurs finales restent affichées. Sans JavaScript, un texte de remplacement expose les informations encore à valider.

## Préparation du CMS

Les trois métriques sont centralisées dans le bloc JSON `problem-stat-data` de `06-probleme.html`. Modifier ce bloc met à jour le rendu sans changer les composants.

Champs prévus par métrique :

- `id` : identifiant stable.
- `value` : valeur numérique ou `null` si inconnue.
- `prefix` et `suffix` : unités et présentation.
- `label` et `note` : libellé et précision visible.
- `status` : `pending`, `demo`, puis `verified` dans l’intégration finale.
- `sourceUrl`, `sourceTitle`, `period`, `scope` : source, période et périmètre de mesure.

Le CMS sera raccordé lors de l’implémentation de la stack. Ce prototype n’inclut pas encore de back-office ni de workflow de publication. Lors de cette intégration, les métriques non validées devront être exclues du site public ; les sources et périmètres des chiffres validés devront être affichés. Pour une promesse de suivi, la validation dépendra des capacités réelles du service.

## Aperçu

Ouvrir `06-probleme.html` : navigation, hero validée et nouvelle section problème sont réunies. Les repères de liens du prototype restent placés après cette section.

## Étape suivante

Point 7 : grille de services, après validation explicite de cette section.
