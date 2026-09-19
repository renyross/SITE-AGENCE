# Point 11 — Études de cas

Statut : validé par l’utilisateur. Passage au point 12 autorisé.

## Message

**Proof, not promises.**

Le titre du brief est conservé. Un avertissement placé immédiatement en dessous précise que les trois exemples sont fictifs et montrent la présentation envisagée pour de futures références vérifiées. Chaque carte et chaque fiche détaillée portent également cette mention.

## Trois scénarios

| Exemple | Expertise | Métriques illustratives |
| --- | --- | --- |
| CLIENT A | SEO + GEO | +68 % de trafic organique, +42 % de leads qualifiés, 12 citations IA gagnées |
| CLIENT B | AI Automation | −45 % de travail manuel, +31 % de taux de conversion |
| CLIENT C | SEO + Content | +112 % de clics organiques, positions Top 3 sur des requêtes sélectionnées |

Les chiffres sont ceux du brief, sans attribution à un client réel. Les contextes, problèmes et stratégies sont des scénarios éditoriaux fictifs. Aucune période ni preuve non fournie n’est inventée.

## Présentation et parcours

Trois cartes sur grand écran, une colonne sous 1 024 px. Chaque carte présente le statut de démonstration, le client fictif, l’expertise, un titre orienté bénéfice et les métriques.

**View case study** ouvre et rejoint la fiche correspondante, sous la grille. Les fiches contiennent contexte, problème, stratégie, résultats illustratifs et note sur l’absence de données justificatives. Le visiteur peut refermer chaque fiche par sa commande native.

Un CTA **Discuss a similar challenge** conduit au repère local de prise de rendez-vous. Les pages autonomes `/case-studies/[slug]` seront créées au point 19 ; les fiches de cette étape restent intégrées à l’aperçu.

Le lien « Case Studies » du header conduit désormais à cette section dans la planche cumulative.

## Données modifiables

Modifier `11-case-studies.json`, puis régénérer la planche avec :

```sh
python3 docs/11-build-case-studies.py
```

Chaque objet définit `slug`, `client`, `category`, `title`, `context`, `problem`, `strategy`, `results`, `metrics`, `status`, `period`, `source` et `measurementNotes`. Le générateur échappe les textes pour les afficher comme contenu HTML et refuse les slugs dupliqués.

Le générateur de prototype accepte uniquement le statut `demo` afin de conserver les mentions cohérentes avec les exemples. Le raccordement à un CMS, la publication de références réelles et leur workflow de validation restent à implémenter dans la stack finale.

Avant toute publication comme preuve commerciale, il faudra documenter les sources, la période, le périmètre, les valeurs de départ et d’arrivée ainsi que la nature des évolutions : relative ou en points de pourcentage. Une position Top 3 devra préciser les requêtes, le marché et la date de mesure.

## Accessibilité

Titres de cartes en H3 sous le H2 de section, métriques en listes de définitions, liens nommés par client et focus clavier visible. Les boutons de dépliage utilisent `details` / `summary` et restent utilisables sans JavaScript. Le script améliore l’ouverture par lien et prend en charge une URL contenant l’ancre d’une fiche.

Les transitions de survol sont discrètes et désactivées avec la préférence de réduction des animations. Les fiches et leurs textes sont générés dans le HTML et n’exigent pas de requête réseau pour être lus.

## Aperçu

Ouvrir `11-case-studies.html` ; conserver les scripts des points 9, 10 et 11 dans le même dossier. Cette planche réunit les sections jusqu’aux études de cas.

## Étape suivante

Point 12 : technologies et bandeau d’outils, après validation explicite des études de cas.
