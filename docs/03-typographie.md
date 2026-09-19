# Point 3 — Typographie

Statut : validé par l’utilisateur. Passage au point 4 autorisé.

## Choix : Manrope

**Manrope** devient la famille principale pour les titres, les paragraphes, les boutons et les données. Ses formes géométriques donnent une présence nette aux grands titres ; une seule famille permet de conserver une identité cohérente dans les contenus et les interfaces.

Source de la famille : [Manrope sur Google Fonts](https://fonts.google.com/specimen/Manrope).

Graisses retenues : 400 pour la lecture, 500 pour les labels, 600 pour les boutons et 700 pour les titres. Les grands chiffres peuvent utiliser 800. Les italiques ne sont pas nécessaires à la direction proposée.

Police de secours : `Arial, sans-serif`. Le site final devra servir les fichiers de police localement avec leur licence et `font-display: swap`. La planche de validation charge provisoirement Manrope depuis Google Fonts et nécessite Internet pour afficher cette famille.

## Hiérarchie

Tailles exprimées en pixels de référence, à convertir en rem dans le code. Les tailles intermédiaires évoluent de manière fluide selon la largeur disponible.

| Usage | Mobile | Desktop | Graisse | Interligne | Approche |
| --- | --- | --- | --- | --- | --- |
| Titre hero | 44–56 | 72–96 | 700 | 1,06 | −0,045 em |
| Titre de section | 32–40 | 48–64 | 700 | 1,12 | −0,035 em |
| Titre de carte | 24 | 28–32 | 700 | 1,2 | −0,025 em |
| Introduction | 18 | 20–22 | 400 | 1,5 | −0,01 em |
| Texte courant | 16 | 18 | 400 | 1,65 | 0 |
| Bouton / navigation | 14–16 | 14–16 | 600 | 1,4 | 0 |
| Label | 12 | 12 | 500 | 1,5 | +0,12 em |
| Légende | 14 | 14 | 400 | 1,5 | 0 |
| Chiffre majeur | 48–64 | 72–88 | 800 | 1,08 | −0,04 em |

## Règles de composition

- Titres en casse naturelle ; majuscules réservées aux labels courts.
- Hero limité à environ 15–18 caractères par ligne selon les mots et la langue. Ajuster les retours à la ligne au contenu réel, sans couper les mots.
- Paragraphes limités à 60 caractères environ par ligne ; introductions à 48 caractères environ.
- Texte aligné à gauche. La taille et l’espace créent la hiérarchie avant la couleur.
- Accent vert appliqué à une courte expression ou une donnée sélectionnée ; éviter de colorer tout un long titre.
- Chiffres tabulaires dans les tableaux, compteurs et métriques pour stabiliser les alignements.
- Pas de hauteur fixe sur les conteneurs de texte. Les boutons peuvent passer sur deux lignes.

## Responsive et lisibilité

Utiliser des tailles en `rem` et des interpolations `clamp()` qui conservent une part relative à la taille de police utilisateur. Prévoir une règle distincte pour le hero mobile afin de respecter les plages demandées.

Préserver les accents, les jambages et les signes monétaires. Ne pas utiliser `overflow: hidden` sur les blocs de texte. Vérifier ensuite les pages réelles à 320 px de large, avec zoom à 200 % et avec une police de secours chargée.

La taille visuelle d’un titre ne détermine pas son niveau HTML : conserver un H1 unique par page puis une structure H2/H3 logique.

## Support de validation

`03-planche-typographique.html` présente un grand titre, des paragraphes, des labels, des chiffres et un spécimen mobile. Les textes illustrent la typographie ; la hero et la navigation seront traitées à leurs étapes respectives. La planche indique si Manrope a effectivement été chargée.

## Étape suivante

Point 4 : navigation, après validation explicite du choix typographique.
