# Site agence — point 26

Application Next.js, React et TypeScript reprenant les sections validées. Les anciennes planches HTML restent dans `docs/`.

## Lancer le site

```sh
npm ci
npm run dev
```

Ouvrir http://127.0.0.1:3000. Pour la version de production locale : `npm run build`, puis `npm run start`.

## Contenus

- `content/services.json`, `industries.json`, `cases.json`, `articles.json` : données des pages détaillées.
- `content/home.json` : contenu HTML local de la homepage validée, conservé pendant la migration en composants.
- `content/calculator.json` : calculateur partagé avec `/tools`.
- `components/` : navigation, footer, formulaires et modèles de pages React.
- `app/[...slug]/page.tsx` : résolution des routes autorisées ; une route inconnue renvoie une 404.
- `public/legacy/` : scripts du calculateur et des animations déjà validées.

Les chaînes HTML sont des fichiers locaux de confiance, pas des entrées utilisateur ou un CMS. Ne pas injecter de HTML externe sans assainissement lors d’une future intégration.

## Vérifier

```sh
npm run build
npm run typecheck
```

Avec le serveur lancé et Chrome installé sur macOS :

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/check-pages.cjs
```

Sinon, installer le navigateur Playwright avec `npx playwright install chromium`, puis lancer `node scripts/check-pages.cjs`. La variable `SITE_URL` permet de changer l’URL locale testée.

## État de la livraison

Des routes de contenu, une page 404, un blog filtrable et des formulaires de démonstration. Comparatifs, politique éditoriale, profils d’attribution en attente et `/llms.txt` complètent le contenu GEO du point 21. Les références fictives sont signalées et l’indexation est désactivée pour cette version de revue. Manrope est servie localement.

Les formulaires ne transmettent aucune donnée dans la configuration locale par défaut. Le point 25 prépare le raccordement CRM par webhook, l’import d’articles Supabase et les outils de mesure derrière un choix utilisateur. Les comptes réels, le calendrier et le déploiement restent à raccorder. Le nom, l’identité légale, les profils sociaux, les témoignages et les références réels restent à fournir.

Le point 20 ajoute les titres, descriptions, canoniques, Open Graph, Twitter Cards, JSON-LD et les routes robots/sitemap. Voir `docs/20-seo.md` pour la configuration du domaine réel et les conditions d’indexation. Les étapes suivantes restent soumises aux validations demandées. Tailwind et Framer Motion sont installés ; les intégrations externes sont configurables et désactivées par défaut.

Le point 22 optimise le chargement initial et fournit des audits Lighthouse reproductibles. Voir [le bilan de performance](docs/22-performance.md) et `reports/lighthouse/summary.json` pour les scores mesurés et leurs limites.

Le point 23 adapte les cartes, les contrôles tactiles, la navigation et les CTA aux écrans mobiles. Voir [le bilan responsive](docs/23-responsive.md). Les captures et contrôles reproductibles sont dans `reports/responsive/` et `scripts/check-responsive.cjs`.

Le [point 24](docs/24-animations.md) ajoute les révélations, le compteur et les interactions avec préférence de mouvement réduit. Vérification : `scripts/check-motion.cjs`.

Le [point 25 — stack et raccordements](docs/25-stack-technique.md) détaille le CMS, les webhooks HubSpot/Brevo/GoHighLevel et la configuration GA4/GTM/Meta/LinkedIn/Search Console. Copier `.env.example` vers `.env.local` pour renseigner les accès localement.

Le [point 26 — copywriting](docs/26-copywriting.md) harmonise les textes en français, clarifie les bénéfices et distingue les exemples des preuves vérifiées.
