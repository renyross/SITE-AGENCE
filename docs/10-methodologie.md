# Point 10 — Méthodologie

Statut : validé par l’utilisateur. Passage au point 11 autorisé.

## Message

**How we grow.**

A clear starting point. Shared priorities. Execution you can measure.

Les quatre étapes reprennent les textes du brief et précisent chacune le livrable attendu.

| Étape | Description | Livrable proposé |
| --- | --- | --- |
| 01 — Discover | Audit data, competitors, market and visibility. | A baseline and a prioritised opportunity map. |
| 02 — Strategy | Build the SEO + GEO + AI growth roadmap. | A roadmap with priorities, owners and success measures. |
| 03 — Execute | Deploy content, automation, campaigns and technical optimization. | Coordinated implementation across the agreed channels. |
| 04 — Scale | Measure, iterate and expand what performs. | Performance reviews and the next set of growth priorities. |

## Composition

Une colonne éditoriale à gauche contient le titre, l’introduction et le CTA **Book a Strategy Call**. À droite, une liste verticale présente les quatre étapes, leurs numéros et leurs livrables.

Une ligne fine relie les repères carrés de chaque étape. Ce motif reprend la direction « Signal ». Les blocs sont séparés par des filets, avec une respiration généreuse et sans cartes supplémentaires.

Sous 1 024 px, la présentation s’empile : introduction puis étapes. La liste conserve une progression verticale sur tous les écrans. Les contenus n’ont pas de hauteur fixe.

## Animation au défilement

À l’entrée d’une étape dans la fenêtre, son repère devient vert et le segment suivant se dessine en 650 ms. Chaque étape s’anime une seule fois. Le texte reste visible à tout moment.

Avec réduction des animations, sans JavaScript ou sans IntersectionObserver, la ligne et les repères sont directement affichés dans leur état final. Une modification de la préférence système est prise en compte pendant la consultation.

## Accessibilité et action

Une liste ordonnée HTML exprime la séquence. Le titre de section est un H2 et les étapes utilisent des H3. La progression graphique est décorative : elle ne représente ni l’état d’un projet réel ni un contrôle interactif.

Le CTA pointe vers le repère `#call` dans l’aperçu, puis vers `/book-call` dans le site final.

## Aperçu

Ouvrir `10-methodologie.html`, qui réunit le prototype jusqu’au point 10. Garder `09-calculator.js` et `10-methodologie.js` dans le même dossier pour activer le calculateur et l’animation de la méthode.

Les livrables présentés constituent une proposition de méthode de travail ; aucun délai, résultat chiffré ou engagement contractuel supplémentaire n’est inventé.

## Étape suivante

Point 11 : études de cas, après validation explicite de la méthodologie.
