import {absolute,brand} from '../../lib/seo';
import {services} from '../../lib/content';
import {comparisons} from '../../lib/geo';
export const dynamic = 'force-static';
export function GET(){
 const link=(title:string,path:string,note:string)=>`- [${title}](${absolute(path)}): ${note}`;
 const text=[`# ${brand}`,'','> Version de revue d’un site d’agence marketing. Identité de l’entreprise et attribution des articles à confirmer.','',
 'Les cas et leurs chiffres sont des scénarios fictifs, pas des références clients. Les articles sont des brouillons. Les formulaires indiquent si la transmission est disponible ; aucun rendez-vous n’est réservé automatiquement. Aucune position ni citation IA n’est garantie.','',
 '## Agence et méthode éditoriale',link('Informations agence','/about','Identité et domaines d’intervention.'),link('Politique éditoriale','/editorial-policy','Sources, validation et corrections.'),link('Auteurs','/authors','Attribution à confirmer.'),'',
 '## Services',...services.map(s=>link(s.title,'/services/'+s.slug,s.intro)),'',
 '## Définitions et comparatifs',link('Glossaire','/glossary','SEO, GEO, AEO et mesure.'),...comparisons.map(c=>link(c.title,'/comparisons/'+c.slug,c.answer)),'',
 '## Ressources',link('Articles','/blog','Guides en cours de validation.'),link('Calculateur','/tools','Modèle hypothétique avec hypothèses explicites, pas une prévision.'),''
 ].join('\n');
 return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8','X-Robots-Tag':'noindex','Link':`<${absolute('/llms.txt')}>; rel="describedby"`}});
}
