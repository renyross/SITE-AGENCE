# Point 2 — Style visuel

Statut : validé par l’utilisateur. Passage au point 3 autorisé.

## Direction artistique : « Signal »

Un univers éditorial sombre dans lequel quelques repères lumineux matérialisent la visibilité et la progression. Le caractère premium vient des proportions, du rythme et de la retenue : grandes surfaces calmes, lignes précises, contrastes nets et détails graphiques peu nombreux.

La signature graphique associe un petit carré vert, des graduations fines et des tracés qui relient des points. Ces éléments évoquent la mesure et le passage de la découverte à la conversion. Ils seront dessinés en CSS ou SVG, sans illustrations génériques.

## Palette

| Rôle | Couleur | Usage |
| --- | --- | --- |
| Fond principal | `#0B0B0D` | Toile générale |
| Fond secondaire | `#111114` | Sections et cartes |
| Surface active | `#19191E` | Survols et panneaux en relief |
| Texte principal | `#F7F7F7` | Titres, chiffres et contenu essentiel |
| Texte secondaire | `#9B9B9B` | Descriptions et légendes |
| Accent | `#C6F564` | CTA principal, repères et données sélectionnées |
| Accent au survol | `#D6FF85` | Retour visuel des boutons principaux |
| Séparateur décoratif | `#2B2B32` | Bordures de cartes et lignes de composition |
| Bordure fonctionnelle | `#73737D` | Champs et contrôles qui nécessitent une délimitation visible |

Le vert acidulé occupe environ 5 % de la surface visible. Les boutons verts portent un texte noir. Le gris secondaire reste réservé aux fonds sombres. Les séparateurs discrets ne servent pas seuls à identifier un contrôle interactif.

## Composition et surfaces

- Sections très aérées : respiration indicative de 112 à 144 px sur grand écran, 64 à 80 px sur mobile.
- Composition éditoriale : alignements francs, grands blocs de texte, chiffres isolés et zones de repos visuel.
- Cartes larges sur fond secondaire, bordure de 1 px, rayon de 12 px ; panneaux majeurs avec rayon de 16 px.
- Boutons légèrement arrondis, rayon de 8 px ; les formes de pilule sont réservées aux petits labels.
- Ombres presque absentes ; la hiérarchie des surfaces repose sur les variations de fond et les bordures.

## Traitement graphique

Une ligne graduée ponctuée d’un carré vert forme le motif récurrent. Elle peut accompagner une donnée, séparer deux zones ou suggérer une progression. Son emploi reste ponctuel pour conserver sa force.

Les graphiques utilisent des tracés fins et une seule série mise en avant en vert. Les légendes et les formes complètent la couleur pour transmettre l’information.

Un halo vert très diffus peut soutenir un visuel majeur : opacité faible, zone limitée, sans nuire à la lisibilité. Les dégradés restent confinés aux éléments décoratifs.

## Principes d’interaction

Au survol, une carte éclaircit légèrement sa surface et sa bordure. Un bouton principal éclaircit son fond. Les transitions de couleur durent environ 180 à 240 ms. Le focus clavier dispose d’un contour vert visible et décalé.

Les animations de révélation et de tracé seront précisées au point 24. Leur éventuelle désactivation doit préserver tout le contenu et toutes les fonctions.

## À exclure

Robots, cerveaux lumineux, visages synthétiques, globes holographiques, accumulation de néons, effets de verre omniprésents et fonds animés continus. Aucun logo, texte ou agencement d’une agence existante n’est repris.

## Support de validation

Ouvrir `02-planche-visuelle.html` dans un navigateur pour examiner la palette, les surfaces, le motif et les états des boutons. Cette planche autonome illustre la direction artistique ; les textes sont des exemples de composition et la police système est provisoire.

## Étape suivante

Point 3 : choix de la typographie et définition de sa hiérarchie, après validation explicite de cette direction.
