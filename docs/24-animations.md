# Point 24 — Animations et micro-interactions

Statut : implémentation validée par l’utilisateur ; passage au point 25 autorisé.

## Effets retenus

- Révélation des titres de section, étapes de méthode et cartes : opacité de 0,65 à 1, déplacement vertical de 12 px et durée de 420 ms sur ordinateur. Chaque élément est animé une seule fois lors de son entrée dans la fenêtre. Le hero et le titre principal restent immédiatement visibles.
- Mobile et appareils sans pointeur précis : fondu de 180 ms, sans déplacement.
- Cartes au survol : déplacement maximal de 3 px sur ordinateur, variation de surface et de bordure en 200 ms. Les boutons donnent un retour de pression discret.
- Parallaxe du fond du hero au pointeur : déplacement borné à 3 px, calcul regroupé par `requestAnimationFrame`, sans boucle permanente. Le pointeur natif reste inchangé ; aucun effet sur mobile.
- Bandeau multilingue : statique par défaut, bouton explicite pour lancer ou mettre en pause le défilement. Pause au survol et lorsque l’onglet est masqué. La commande reste accessible, le texte décoratif est exclu de l’arbre d’accessibilité.
- Compteur du calculateur : transition de 360 ms entre deux résultats, sans modifier la formule ni ajouter de chiffres. La valeur finale est immédiatement disponible pour les technologies d’assistance ; seule une copie visuelle varie. La première valeur, le mobile et le mode mouvement réduit utilisent un affichage immédiat. Une nouvelle saisie annule la transition précédente.
- La pulsation du badge se limite à deux cycles.

## Accessibilité et coût

La préférence `prefers-reduced-motion` est surveillée en direct : les animations sont annulées, les valeurs finales rétablies et le déplacement du fond supprimé. Le focus clavier annule les révélations en cours. Aucun contenu n’est caché par une classe d’attente JavaScript : les cartes, titres, liens et le menu natif restent disponibles si les scripts sont bloqués.

Le script d’animation est chargé avec `lazyOnload`, observe les entrées dans la fenêtre avec `IntersectionObserver` et utilise la Web Animations API. Les révélations ne modifient aucune dimension de mise en page et aucune dépendance n’est ajoutée. L’ancien script de révélation de méthode n’est plus chargé par l’accueil. Les anciennes planches de validation sont conservées.

## Validation

Build et TypeScript réussis. `scripts/check-motion.cjs` vérifie le compteur et sa valeur finale exacte, les révélations ordinateur/mobile, la commande du bandeau, la borne du déplacement au pointeur, le changement de préférence en direct et le contenu/menu sans JavaScript.

Rapport : `reports/motion/summary.json`. La suite responsive du point 23 est également relancée sur la compilation de production. Ces contrôles dans Chrome ne constituent pas une nouvelle mesure Lighthouse ni une recette sur appareils physiques.

```sh
npm run build
npm run start
# Dans un autre terminal :
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/check-motion.cjs
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/check-responsive.cjs
```

Les deux scripts acceptent `SITE_URL` pour utiliser un autre port local.

## Étape suivante

Point 25 : stack technique et intégrations prévues par le brief, après accord explicite.
