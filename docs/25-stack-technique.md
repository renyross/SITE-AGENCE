# Point 25 — Stack technique et raccordements

Statut : stack locale et points de raccordement préparés ; les comptes externes ne sont pas connectés. Passage au point 26 autorisé par l’utilisateur.

## Application

Next.js, React et TypeScript conservés. Tailwind CSS 4 est installé avec son plugin PostCSS : seuls le thème et les utilitaires sont importés, sans Preflight, pour préserver les styles existants. Le formulaire utilise les utilitaires compilés. Framer Motion est chargé dans le composant de formulaire avec `LazyMotion` et `domAnimation` pour le retour d’état ; la préférence de mouvement réduit reste respectée. Les animations légères du point 24 restent en place.

Les versions exactes sont figées dans `package.json` et `package-lock.json`. `npm ci`, `npm run build` et `npm run typecheck` permettent de reproduire l’installation et les vérifications.

## CMS : Supabase

Le raccordement retenu concerne les **articles structurés du blog**. Les autres contenus restent dans les fichiers JSON locaux. Aucune clé ni aucun projet Supabase n’ont été fournis ; aucune base n’a été créée ou modifiée à distance.

1. Dans votre projet Supabase, exécuter `supabase/schema.sql`. La table `agency_articles` utilise RLS : lecture publique des seuls articles publiés, aucune écriture publique.
2. `node scripts/export-cms.mjs` prépare `supabase/seed-articles.sql` à partir du contenu local. Exécuter ce SQL crée des brouillons non publiés ; les lignes déjà présentes ne sont pas remplacées.
3. Éditer les champs JSON structurés dans le tableau de bord Supabase. Passer `published` à vrai après revue éditoriale.
4. Renseigner `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` dans `.env.local`.
5. `npm run cms:preview` télécharge les articles publiés dans `reports/cms/articles.preview.json`, sans modifier le site.
6. Après revue, `npm run cms:preview -- --apply` sauvegarde les articles locaux dans `reports/cms/articles.backup.json`, puis remplace atomiquement `content/articles.json`. L’import représente l’ensemble des articles publiés : une dépublication peut donc retirer une route lors de la prochaine compilation.
7. Reconstruire et vérifier le site. Les routes, titres et métadonnées utilisent alors les données importées. L’indexation reste gouvernée par les validations du point 20.

Les slugs, types, longueurs, doublons et URL HTTPS des sources sont contrôlés. Un résultat vide ou potentiellement tronqué est refusé. Aucun HTML distant n’est injecté. Ce fonctionnement est une synchronisation éditoriale avec compilation, pas un CMS temps réel ni un Studio personnalisé.

## Formulaires et CRM

`POST /api/leads` valide les champs, l’origine, le format et la taille du corps. Une limite par adresse e-mail et par instance réduit les envois répétés. En production, compléter cette limite locale par une limitation partagée au niveau de l’hébergement et une protection anti-abus adaptée.

La route est désactivée tant que la configuration complète n’est pas présente. Les formulaires affichent cet état et ne prétendent plus envoyer une demande. Les messages d’échec ne divulguent ni réponse privée du fournisseur ni clé. Les délais sont bornés et les redirections externes refusées.

Les trois destinations sont préparées **via un webhook de workflow**, pas via leurs API natives : HubSpot, Brevo ou GoHighLevel. Créer un workflow qui authentifie le jeton Bearer reçu et crée le contact/la demande dans l’outil choisi. Renseigner :

```dotenv
LEADS_ENABLED=true
CRM_PROVIDER=hubspot
CRM_WEBHOOK_URL=https://votre-workflow.example/webhook/leads
CRM_WEBHOOK_TOKEN=secret-configure-cote-serveur
```

Valeurs de `CRM_PROVIDER` : `hubspot`, `brevo`, `gohighlevel`. Le webhook reçoit :

```json
{
  "version": 1,
  "provider": "hubspot",
  "submittedAt": "date ISO",
  "lead": {
    "kind": "contact",
    "name": "Nom",
    "email": "adresse",
    "company": "Entreprise",
    "website": "https://exemple.fr",
    "message": "Demande",
    "topic": "Sujet"
  }
}
```

Mapper `name/email/company/website` aux propriétés de contact et conserver `message/topic/kind` dans une demande, une note ou des champs dédiés. Le workflow doit retourner un succès uniquement après avoir accepté durablement la demande, dédupliquer les tentatives et gérer ses reprises. Un timeout peut laisser une livraison incertaine : l’interface le signale sans annoncer un envoi certain. Une demande de contact n’est pas une inscription marketing ; une demande d’appel ne réserve aucun créneau.

Aucun workflow n’est provisionné automatiquement. Aucun message de test n’a été envoyé à un CRM réel. Les clés doivent rester dans l’environnement serveur, jamais dans `NEXT_PUBLIC_*` ni dans les JSON de contenu.

## Mesure et Search Console

`TRACKING_ENABLED=false` par défaut : aucun script tiers ni bandeau n’est ajouté. Après configuration, la première visite permet d’autoriser ou refuser les outils ; les deux choix ont le même traitement visuel. Le choix est mémorisé dans un cookie de préférence pendant 180 jours. Le bouton du pied de page permet de le modifier. Le retrait désactive les consentements Google/Meta et recharge la page pour supprimer les scripts actifs ; il ne promet pas d’effacer les cookies déjà déposés par les fournisseurs.

Deux modes exclusifs évitent de charger les mêmes outils deux fois :

- `TRACKING_MODE=direct` : `GA4_ID`, `META_PIXEL_ID` et `LINKEDIN_PARTNER_ID` chargent les trois outils uniquement après autorisation.
- `TRACKING_MODE=gtm` : `GTM_ID` charge uniquement Google Tag Manager après autorisation. Configurer ensuite GA4, Meta et LinkedIn dans ce conteneur. Les identifiants du mode direct ne sont pas utilisés.

Les scripts restent bloqués avant un choix positif, sans pixel de secours `noscript`. Google reçoit les paramètres de consentement avant la configuration des balises. Le code applicatif ne transmet aucun champ de formulaire aux outils de mesure. Pour GA4 direct, l’URL de page exclut query et fragment ; désactiver dans le compte les mesures automatiques non souhaitées. Les outils tiers peuvent collecter leurs propres données après chargement : vérifier leur configuration avant lancement. La navigation actuelle utilise des liens HTML avec rechargement ; si elle passe en navigation SPA, prévoir les événements de changement de route sans doublons.

`GOOGLE_SITE_VERIFICATION` ajoute la balise de vérification Search Console. La propriété Search Console, la vérification du domaine, la publication du conteneur GTM et le contrôle des événements dans les comptes restent à effectuer avec les accès réels. La configuration fournie ne constitue pas une certification juridique de consentement.

## Vérifications

- `node scripts/check-integrations.mjs` : validation des leads, configurations désactivées, enveloppes webhook des trois CRM, refus fournisseur et validation CMS ; requêtes simulées.
- `scripts/check-stack.cjs` : erreurs API, formulaires désactivés, absence de traceurs avant accord, choix direct/GTM et retrait. Les requêtes tierces sont interceptées dans le navigateur.
- Suite responsive du point 23 pour détecter une régression visuelle liée à Tailwind ou aux formulaires.

Build, TypeScript, tests des connecteurs et tests navigateur réussis. Les 108 combinaisons responsive passent également. Résumé : `reports/stack/summary.json` ; détails responsive : `reports/responsive/summary.json`.

## Sources techniques

[Next.js / Tailwind](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Motion et mouvement réduit](https://motion.dev/docs/react-use-reduced-motion), [Supabase REST](https://supabase.com/docs/guides/api), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [consentement Google](https://developers.google.com/tag-platform/security/guides/consent), [pages vues GA4](https://developers.google.com/analytics/devguides/collection/ga4/views), [LinkedIn Insight Tag](https://business.linkedin.com/advertise/ads/insight-tag).

## Étape suivante

Point 26 : copywriting, après accord explicite.
