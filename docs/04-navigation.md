# Point 4 — Navigation

Statut : validé par l’utilisateur. Passage au point 5 autorisé.

## Header

Header sticky sur fond noir opaque, séparé du contenu par une ligne fine. Largeur intérieure maximale de 1 440 px, marges fluides. Le logo est à gauche, la navigation au centre et les deux actions à droite lorsque la largeur le permet.

Le nom de l’agence reste à définir : le prototype utilise un symbole géométrique original et la mention explicite « Nom agence ». « Signal » reste le nom de la direction artistique, pas un nom commercial validé.

Les libellés anglais du brief sont conservés. La langue finale reste à confirmer.

## Liens et destinations prévues

| Libellé | Destination du site final |
| --- | --- |
| Logo | `/` |
| Services | `/services` |
| Solutions | `/services#solutions` |
| Industries | `/industries` |
| Case Studies | `/case-studies` |
| Insights | `/blog` |
| About | `/about` |
| Free AI Visibility Audit | `/free-ai-visibility-audit` |
| Book a Strategy Call | `/book-call` |

« Solutions » conduira à un bloc dédié de la page Services présentant les audits et la stratégie de croissance, conformément aux offres du brief. Ce bloc sera créé lors de la réalisation des pages ; aucune page supplémentaire n’est nécessaire pour cette navigation.

## Hiérarchie des actions

**Free AI Visibility Audit** : bouton vert acidulé à texte noir, action principale.

**Book a Strategy Call** : bouton secondaire à bordure grise. Les deux libellés complets restent visibles sur grand écran.

Liens en Manrope 600, 14 px de référence ; focus clavier vert et décalé. Au survol, les liens passent du gris au blanc. Sur les pages finales, le lien actif comportera un repère graphique et `aria-current="page"`.

## Tablette et mobile

Sous 1 280 px de référence, la navigation passe dans un panneau dépliant sous le header. Le seuil privilégie l’espace disponible pour les six liens et les deux CTA.

Le bandeau compact conserve le logo, un bouton « Free audit » et une commande « Menu ». Le nom accessible du bouton d’audit conserve son libellé complet. Le panneau présente les six liens, puis les deux CTA complets. À très petite largeur, le logo affiche uniquement son symbole avec un nom accessible.

Le panneau reste dans le flux du document : il ne masque pas une zone interactive derrière un voile. Sa hauteur est limitée à l’espace disponible avec défilement interne si nécessaire. Les cibles tactiles mesurent au moins 44 px de haut.

## Comportements

- Ouverture et fermeture par la commande native du menu, au clavier ou au toucher.
- Échap ferme le panneau et rend le focus à sa commande.
- Sélection d’un lien : fermeture du panneau, puis accès à la destination.
- Passage au format desktop : fermeture du menu compact.
- Lien d’évitement « Aller au contenu » visible au focus.
- Le prototype fonctionne aussi sans JavaScript grâce à `details` et aux ancres HTML ; Échap et la fermeture automatique sont des améliorations JavaScript.

## Prototype

Ouvrir `04-navigation.html` dans un navigateur puis réduire sa largeur pour examiner le menu compact. Les liens conduisent à des zones de démonstration locales, afin de vérifier le parcours sans créer les pages des étapes suivantes. Ces zones ne constituent ni une homepage ni les contenus finaux.

Le prototype charge Manrope depuis Google Fonts avec Arial en secours. L’hébergement local de la police reste prévu pour le site final.

## Étape suivante

Point 5 : hero section, après validation explicite de la navigation.
