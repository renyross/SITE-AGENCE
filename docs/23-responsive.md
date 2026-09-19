# Point 23 — Responsive

Statut : adaptations validées par l’utilisateur ; passage au point 24 autorisé.

## Comportement

- Navigation hamburger sous 1280 px et sur les appareils sans survol. Le panneau peut défiler dans la hauteur disponible, y compris en paysage ; Échap le ferme et replace le focus sur son déclencheur.
- En-tête collant conservant le CTA « Appel stratégique » pendant le défilement. Le menu passe au-dessus des éléments flottants.
- Sous 768 px, services et secteurs sont présentés en cartes verticales. Les commandes des carrousels disparaissent ; toutes les cartes restent accessibles sans JavaScript.
- Calculateur : largeur utile augmentée, valeurs et libellés adaptables, boutons tactiles d’au moins 44 px et zone de manipulation des curseurs de 44 px avec un tracé visuel fin.
- Formulaires : saisies d’au moins 16 px sur mobile, boutons pouvant revenir à la ligne et grilles sur une colonne. Les filtres éditoriaux peuvent revenir à la ligne.
- Les raccourcis WhatsApp et retour en haut rejoignent le flux du pied de page sur mobile pour dégager le contenu. Le bandeau flottant d’audit est masqué ; les CTA d’en-tête et de section restent disponibles.
- Défilements décoratifs et pulsation simplifiés sur mobile. Les commandes de carrousel et retour en haut respectent aussi la préférence de mouvement réduit.
- Les décorations sont contenues dans leur section ; les textes longs, les grilles et les titres s’adaptent à la largeur disponible.

## Vérification

Le script `scripts/check-responsive.cjs` couvre 18 routes représentatives des modèles : accueil, index et détails des services, secteurs, cas et articles, à propos, contact, réservation, audit, outils, glossaire, comparatif, auteur et politique éditoriale.

Largeurs : 320, 390, 768, 1024, 1280 et 1440 px, soit 108 combinaisons. Le test force le calcul de mise en page des sections différées pour ne pas ignorer leur contenu hors écran. Il contrôle les débordements de page et les limites des principaux textes et contrôles, sans confondre les carrousels défilants avec un débordement accidentel.

Contrôles interactifs supplémentaires : menu et sous-menu à 320 × 780, 844 × 390 et 640 × 450 ; fermeture avec Échap ; position collante de l’en-tête ; CTA visible ; cartes verticales ; curseur au clavier ; mouvement réduit. La largeur de 640 px couvre également un espace de mise en page réduit comparable à un zoom de 200 % sur une fenêtre de 1280 px ; ce n’est pas un test de zoom natif.

Captures : `reports/responsive/home-320.png`, `home-768.png` et `home-1440.png`. Résultats détaillés et version du navigateur : `reports/responsive/summary.json`.

```sh
npm run build
npm run typecheck
npm run start
# Dans un second terminal :
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/check-responsive.cjs
```

La variable `SITE_URL` change l’origine testée. Les contrôles sont exécutés dans Chrome local avec dimensions de fenêtre simulées. Ils ne remplacent pas une recette sur appareils physiques Safari/iOS et Android, ni une vérification exhaustive de tous les contenus futurs. Les limites de performance du point 22 restent documentées ; aucun nouveau score Lighthouse n’est annoncé ici.

## Étape suivante

Point 24 : animations et micro-interactions, après accord explicite.
