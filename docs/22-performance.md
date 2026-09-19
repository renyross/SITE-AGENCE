# Point 22 — Performance et Lighthouse

Statut : optimisations et audits livrés pour revue. Objectif supérieur à 95 dans toutes les catégories non atteint ; passage au point 23 autorisé par l’utilisateur avec ces limites documentées.

## Périmètre

Audits Lighthouse de production locale : accueil mobile, accueil desktop, une page service et un article sur mobile. Le projet contient désormais des ajouts et textes français, dont une vidéo de hero et un nouveau calculateur ; les optimisations conservent ces contenus et s’appliquent à cette version du site.

Objectif du brief : dépasser 95 dans les quatre catégories. Les scores réellement obtenus figurent dans `reports/lighthouse/summary.json` et dans les rapports HTML ; ils ne sont pas remplacés par des scores théoriques.

## Résultats mesurés

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
| --- | ---: | ---: | ---: | ---: |
| Accueil mobile | 94 | 97 | 100 | 69 |
| Accueil ordinateur | 100 | 97 | 100 | 69 |
| Service mobile | 87 | 100 | 100 | 66 |
| Article mobile | 97 | 100 | 100 | 66 |

L’accueil mobile passe de 56 à 94 en performance et d’environ 4 772 à 259 Kio transférés. La version du contenu a évolué pendant le travail : cette comparaison porte sur deux instantanés, pas sur un protocole isolant chaque changement. Dernier LCP mobile de l’accueil : 2,9 s ; TBT : 100 ms ; CLS : 0. Aucun avertissement Lighthouse sur ces quatre mesures.

La dernière correction du rôle des listes du carrousel des secteurs est postérieure à ces audits. Aucun score d’accessibilité amélioré n’est extrapolé. Build, contrôle TypeScript et vérification Chrome du chargement différé, de la lecture programmée de la vidéo et de la saisie du calculateur réussis.

Restent à traiter : stabiliser le coût JavaScript mobile (TBT de 380 ms sur la page service), ramener le LCP de l’accueil sous 2,5 s et confirmer les scores après hébergement. Les mesures ne garantissent pas un score supérieur à 95, ni des Core Web Vitals réels conformes.

## Corrections

- Vidéo de hero : suppression du téléchargement et de la lecture automatiques, `preload="none"`, contrôles natifs et vignette WebP de 29 Ko extraite du fichier existant. Le fichier reste disponible ; le hero utilise actuellement cette vidéo en arrière-plan décoratif non interactif. Le contrôle automatisé de lecture ne valide pas un parcours de lecture accessible pour les visiteurs.
- Trois icônes PNG auparavant encodées dans le HTML : conversion en fichiers WebP de 44 px, environ 2 Ko chacun, conservant les dimensions d’affichage et le chargement différé.
- Police Manrope locale préchargée, secours Arial ajusté et `font-display: optional` : sur une connexion trop lente, la première vue peut garder la police de secours plutôt que changer tardivement de police. La famille validée reste disponible lorsque son fichier est prêt.
- Rendu des sections hors écran différé avec `content-visibility: auto` et espace intrinsèque de secours ; le contenu reste dans le HTML.
- Scripts d’interaction de la homepage chargés avec `lazyOnload`.
- Footer statique rendu côté serveur ; horloge et boutons flottants isolés dans de petits composants interactifs pour éviter de recalculer l’ensemble du footer chaque seconde.
- Contrastes insuffisants corrigés, champs du calculateur nommés et noms accessibles alignés sur les textes des liens.
- Icône de site SVG ajoutée pour supprimer une requête favicon en erreur.
- Préférence de réduction des animations respectée par les éléments animés concernés et le retour en haut.

L’essai d’intégration du CSS directement dans le document n’a pas montré de gain suffisant et n’est pas conservé. La configuration finale ne dépend pas de cette option expérimentale.

## SEO de la version de revue

Le `noindex` mis en place aux étapes précédentes est conservé : il empêche volontairement l’indexation des contenus fictifs et de l’identité incomplète. Lighthouse le compte comme un échec SEO. L’objectif supérieur à 95 en SEO ne peut donc pas être annoncé sur cette version de revue.

Il faudra mesurer à nouveau la configuration publique après validation des contenus et activation contrôlée de l’indexation. Aucun audit n’a été faussé en supprimant la directive uniquement pour obtenir un meilleur score.

## Méthode et limites

Les rapports sont produits par Lighthouse 13.5.0 avec Chrome local, sur une compilation Next.js de production. Mobile utilise la simulation Lighthouse par défaut ; desktop utilise le preset desktop. Les audits finaux sont séquentiels et ne supposent pas de données de visiteurs.

LCP, CLS et TBT sont des mesures de laboratoire. TBT n’est pas l’INP et ne prouve pas la conformité des Core Web Vitals en conditions réelles. L’INP et les valeurs au 75e percentile devront être mesurés après déploiement et collecte d’un volume de visites suffisant. Sources : [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) et [Web Vitals](https://web.dev/articles/vitals).

## Reproduire

Après `npm run build` et démarrage du serveur local :

```sh
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/audit-lighthouse.mjs
CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' node scripts/check-performance.cjs
```

`AUDIT_URL` permet de modifier l’origine auditée. Les rapports `.report.html` et `.report.json` sont enregistrés dans `reports/lighthouse/`. Les scores peuvent varier selon la machine, la charge, le navigateur et l’hébergement.

## Étape suivante

Point 23 : responsive complet, après présentation des mesures finales et accord explicite de l’utilisateur.
