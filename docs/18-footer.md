# Point 18 — Footer et newsletter

Statut : validé par l’utilisateur. Passage au point 19 autorisé.

## Composition

Le footer suit le CTA principal et se situe hors du contenu `main`. Sa partie supérieure réunit l’identité provisoire de l’agence et le formulaire newsletter. Cinq colonnes donnent ensuite accès aux rubriques demandées.

| Colonne | Entrées |
| --- | --- |
| Services | SEO, GEO, AI Search, AI Automation, Paid Media, Content, Analytics |
| Solutions | AI Visibility Audit, SEO Audit, Automation Audit, Growth Strategy |
| Company | About, Cases, Insights, Contact, Careers |
| Resources | Blog, Guides, Tools, Glossary |
| Social | LinkedIn, Instagram, YouTube, X |

Le nom reste « Nom agence » en attendant l’identité réelle. Aucun lien vers un profil social supposé n’est inventé.

## Navigation du prototype

Les 24 entrées sont des liens fonctionnels vers des sections existantes ou des repères explicites en fin d’aperçu. Chaque repère indique la destination future ou l’absence d’URL officielle. Les repères de démonstration sont déplacés après le footer afin que le CTA principal soit suivi directement par celui-ci.

Destinations envisagées :

- Services : routes `/services/...` du brief.
- Solutions : `/free-ai-visibility-audit` et ancres dédiées dans `/services`.
- Company : `/about`, `/case-studies`, `/blog`, `/contact` ; Careers utilise `/contact?subject=careers`, sans inventer de recrutement ouvert.
- Resources : `/blog`, `/blog?category=guides`, `/tools`, `/glossary`. Les deux dernières pages complètent les ressources demandées dans le brief et seront à inclure lors de la réalisation des pages.
- Social : URL des profils officiels à renseigner.

Un lien « Back to top » ramène au contenu principal. Aucun lien vide `href="#"` n’est ajouté.

## Newsletter

Titre : **Stay ahead of search.**

Texte : Perspectives on SEO, AI search and marketing automation.

Champ : **Email address**. CTA : **Subscribe**.

Le formulaire vérifie le format de l’adresse avec la validation native du navigateur. La mention de démonstration est visible avant la soumission. Le retour confirme uniquement la validité du format et précise qu’aucune inscription ni aucun envoi n’ont eu lieu.

Aucune requête réseau, sauvegarde locale ou transmission de l’adresse n’est implémentée. Sans JavaScript, le bouton reste désactivé. Le raccordement à un service d’e-mailing, les informations de confidentialité et la gestion de désinscription seront traités lors de l’intégration finale, selon le fonctionnement réel.

## Responsive et accessibilité

Cinq colonnes sur grand écran, trois sous 1 024 px, deux sous 768 px. L’identité et le formulaire s’empilent sous 1 024 px ; le champ et le bouton s’empilent sur mobile.

Les liens offrent une hauteur minimale de 44 px. Le champ dispose d’un label explicite et d’une description ; le message de validation utilise une région de statut. Les focus sont visibles et aucun contenu ne dépend d’une animation.

## Aperçu

Ouvrir `18-footer.html` avec `18-footer.js` dans le même dossier, en conservant les scripts des étapes précédentes. Le prototype réunit désormais les sections de homepage jusqu’au footer, suivies des repères de démonstration.

## Étape suivante

Point 19 : création des pages et des routes, après validation explicite du footer. Les choix techniques devront être concrétisés pour relier ces pages ; la configuration complète de la stack reste prévue au point 25.
