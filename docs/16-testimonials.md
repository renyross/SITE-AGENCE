# Point 16 — Témoignages

Statut : validé par l’utilisateur. Passage au point 17 autorisé.

## Message et contenu

**What our clients say.**

Trois cartes minimalistes présentent une citation, un nom d’exemple, une entreprise fictive, une fonction et un résultat qualitatif illustratif. Elles évoquent respectivement une feuille de route commune, un suivi commercial simplifié et un meilleur alignement entre contenu et ventes.

Le titre demandé est accompagné d’un avertissement immédiatement visible. Chaque carte porte également **Fictional testimonial · Demo**. Aucun nom réel, portrait, logo client, note ou résultat quantifié n’est inventé.

Les citations devront être remplacées par des témoignages authentiques et autorisés avant publication. Le prototype ne constitue pas une preuve de satisfaction client.

## Design

Trois colonnes sur grand écran, une colonne sous 1 024 px. Fond anthracite, bordure fine, rayon de 12 px. La citation constitue le premier niveau de lecture ; l’identité et la fonction suivent, puis le résultat est séparé par une ligne et mis en vert.

Les cartes restent statiques et entièrement visibles, sans carrousel. Les conteneurs s’adaptent à la longueur des textes.

## Vidéo

Un emplacement explicite présente le futur format vidéo. En l’absence de fichier, aucun faux bouton de lecture ni lecteur vide n’est affiché.

Le générateur accepte un objet `video` facultatif dans chaque témoignage. Avec une vidéo locale MP4, un fichier de sous-titres et une transcription, il produit un lecteur natif avec contrôles, sans lecture automatique et avec `preload="none"`. La transcription reste consultable sous le lecteur.

Exemple de structure à renseigner uniquement après ajout des fichiers :

```json
{
  "src": "assets/testimonial-demo.mp4",
  "captions": "assets/testimonial-demo.en.vtt",
  "language": "en",
  "transcript": "Transcription complète de la vidéo."
}
```

Le générateur vérifie la présence des deux fichiers dans le dossier du prototype et exige une transcription et une langue. Aucun fichier vidéo n’a été fourni à cette étape : le lecteur n’a donc pas été testé avec un média réel.

## Données et génération

Modifier `16-testimonials.json`, puis lancer :

```sh
python3 docs/16-build-testimonials.py
```

Champs : `id`, `name`, `company`, `role`, `quote`, `result`, `status`, `video`. Le générateur échappe les textes et conserve le statut `demo` obligatoire dans cet aperçu. Le workflow de publication de témoignages authentiques sera intégré au CMS ultérieurement.

## Accessibilité et action

Les citations utilisent `blockquote`, avec l’identité dans `figcaption`. Tout le contenu est disponible dans le HTML, sans JavaScript. Le CTA **Book a Strategy Call** rejoint le repère local `#call`, puis pointera vers `/book-call` sur le site final.

## Aperçu

Ouvrir `16-testimonials.html` pour examiner le prototype jusqu’au point 16. Les scripts des étapes précédentes restent nécessaires uniquement à leurs fonctionnalités respectives.

## Étape suivante

Point 17 : grande section CTA, après validation explicite des témoignages.
