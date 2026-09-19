# Point 9 — Calculateur / Lead magnet

Statut : validé par l’utilisateur. Passage au point 10 autorisé.

## Message et parcours

**See how much growth you’re leaving on the table.**

Le visiteur ajuste cinq champs et obtient immédiatement un scénario mensuel. Le caractère hypothétique est indiqué avant les champs et sous les résultats.

| Champ | Exemple initial | Limites |
| --- | --- | --- |
| Monthly website traffic | 10 000 | 0 à 100 millions, entier |
| Conversion rate | 2 % | 0 à 100 %, deux décimales |
| Average customer value | 500 € | 0 à 100 millions €, deux décimales |
| AI visibility score | 40/100 | 0 à 100, entier |
| Organic traffic share | 60 % | 0 à 100 %, deux décimales |

La devise de cet aperçu est l’euro. Le score est saisi manuellement ; aucun audit automatique n’est effectué.

## Modèle de simulation

Avec T le trafic mensuel, O la part organique entre 0 et 1, S le score entre 0 et 100, C le taux de conversion entre 0 et 1, et V la valeur moyenne :

```
Trafic supplémentaire = T × O × (1 − S / 100) × 0,20
Conversions supplémentaires = trafic supplémentaire × C
Opportunité de revenus = conversions supplémentaires × V
```

Le coefficient de 20 % est une hypothèse de simulation fixe, sans fondement statistique revendiqué. La relation entre score et trafic est elle aussi hypothétique. Le panneau « How this scenario is calculated » expose la formule et ses limites.

Les entrées initiales donnent **720 visites**, **14 conversions affichées** et **7 200 €** par mois. Le revenu utilise les 14,4 conversions non arrondies ; l’affichage arrondit les comptes à l’entier.

Le libellé « Potential additional leads / customers » explicite que les conversions du modèle correspondent à des clients acquis. Si l’utilisateur renseigne un taux de conversion en leads, il doit utiliser le revenu moyen par lead pour obtenir un calcul cohérent. Sans taux de transformation des leads en clients, leur nombre ne permet pas de calculer un revenu client fiable.

## Rapport

Le CTA **Email me the full report** ouvre un formulaire avec un champ e-mail. Une mention visible précise immédiatement que l’envoi n’est pas raccordé. Le bouton **Preview my report** prépare un fichier texte téléchargeable : entrées, résultats, formule et limites.

L’adresse est vérifiée par le navigateur pour le prototype de formulaire mais n’est ni envoyée, ni sauvegardée, ni incluse dans le fichier. Aucune confirmation d’envoi n’est simulée. Modifier une entrée invalide le rapport préparé pour éviter de télécharger des chiffres obsolètes.

L’intégration future devra connecter l’envoi au service choisi et adapter les informations de confidentialité au traitement réel. Ce point ne met pas en place une collecte de leads opérationnelle.

## Interface et accessibilité

Champs à gauche et résultats à droite sur desktop ; empilement sous 1 024 px. Les labels restent visibles, les limites sont contrôlées et les saisies invalides effacent les résultats. Une annonce différée évite de lire chaque résultat à chaque frappe.

Valeurs nulles acceptées, divisions par zéro évitées, aucune extrapolation hors des limites autorisées. Sans JavaScript, un message explique que le calculateur nécessite son activation et les résultats restent indisponibles.

## Fichiers

- `09-calculateur.html` : aperçu cumulatif jusqu’au point 9.
- `09-calculator.js` : formule pure, mise à jour des résultats et rapport local. Conserver ce fichier à côté du HTML.

## Étape suivante

Point 10 : méthodologie « How we grow. », après validation explicite du calculateur.
