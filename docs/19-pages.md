# Point 19 — Pages et routes

Statut : validé par l’utilisateur. Passage au point 20 autorisé.

## Livraison

Application Next.js App Router, React et TypeScript avec **36 routes** de contenu. Le header, le footer, les formulaires et les modèles de pages sont partagés. La homepage reprend les sections validées ; les ancres de démonstration destinées aux pages ont été remplacées par de véritables liens.

Les routes sont résolues dans `app/[...slug]/page.tsx` à partir d’une liste explicite. Les chemins inconnus renvoient une page 404. La homepage conserve temporairement le HTML validé et les scripts du prototype ; la conversion complète en composants pourra être poursuivie dans les étapes techniques.

## Inventaire

| Famille | Routes |
| --- | --- |
| Accueil | `/` |
| Services | `/services` |
| Expertises | `/services/seo`, `/services/geo`, `/services/ai-search`, `/services/ai-automation`, `/services/content-marketing`, `/services/paid-media`, `/services/data-analytics`, `/services/cro` |
| Expertise complémentaire du brief | `/services/ai-strategy` |
| Études de cas | `/case-studies` et trois routes `/case-studies/[slug]` issues des exemples validés |
| Industries | `/industries` et dix routes `/industries/[slug]` |
| Blog | `/blog` et trois routes `/blog/[slug]` |
| Entreprise | `/about`, `/contact` |
| Conversion | `/free-ai-visibility-audit`, `/book-call` |
| Ressources du footer | `/tools`, `/glossary` |

Les dix secteurs sont SaaS, e-commerce, professional services, finance, real estate, healthcare, education, local businesses, agencies et B2B.

Le blog propose trois articles de travail : fondations communes SEO/AI Search, préparation d’un audit de visibilité IA et choix d’une première automatisation. Leur statut de brouillon éditorial est visible ; aucune identité d’auteur fictive n’est créée. Le premier article cite la documentation Google utilisée au point 15.

Le filtre `/blog?category=guides` présente les deux guides. La route `/contact?subject=careers` affiche un contexte adapté, sans annoncer d’offre d’emploi. Les audits SEO, automatisation et stratégie sont accessibles par des ancres dédiées dans `/services`.

## Parcours

- Les cartes services et industries de l’accueil mènent aux pages correspondantes.
- Les études de cas disposent de pages autonomes avec contexte, problème, stratégie et métriques fictives explicitement signalées.
- Le calculateur est également disponible sur `/tools` avec rapport local téléchargeable.
- Les CTA d’audit et de rendez-vous mènent à des pages dédiées.
- Les formulaires vérifient les champs mais ne transmettent aucune donnée ni ne créent de réservation. Une mention de démonstration reste visible.
- Les réseaux sociaux restent affichés sans lien tant que les comptes officiels ne sont pas fournis.

## Technique et périmètre

Les versions sont fixées dans `package.json` et `package-lock.json`. La police Manrope est hébergée localement via son package. Les contenus sont centralisés dans `content/` et les planches précédentes sont conservées.

La mise en place de Next.js était nécessaire pour concrétiser les routes du point 19 ; elle suit la stack demandée dans le brief. Tailwind, Framer Motion, le CMS et les intégrations complètes restent à traiter au point 25. Aucun service externe d’envoi ou de collecte n’est connecté.

Des titres de pages et un `noindex` de revue sont en place. Canonicals, Open Graph, schémas et architecture SEO complète relèvent du point 20 et ne sont pas déclarés terminés ici.

## Vérification

Compilation de production et vérification TypeScript. Contrôles navigateur automatisés des 36 routes, de la 404, des H1, des ancres, du filtre Guides, du formulaire d’audit, du calculateur, du téléchargement proposé, du menu mobile et de la réduction des animations. Contrôle du débordement horizontal à 320, 390 et 768 px. Revue visuelle de la hero sur desktop et mobile.

Ces contrôles ne constituent pas encore un audit Lighthouse ou une validation exhaustive d’accessibilité : ces travaux sont prévus dans les étapes dédiées.

## Consulter

Lancer `npm run dev`, puis ouvrir `http://127.0.0.1:3000`. Le fichier `README.md` détaille les commandes et les limites de cette version de revue.

## Étape suivante

Point 20 : architecture SEO et métadonnées, après validation explicite des pages.
