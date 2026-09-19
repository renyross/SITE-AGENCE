import { geoDescriptions, terms } from './geo';
import type { Metadata } from 'next';
import site from '../content/site.json';
import { services, industries, cases, articles, titleFor } from './content';

function configuredOrigin(): string | null {
  if (!process.env.SITE_URL) return null;
  const url = new URL(process.env.SITE_URL);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || ['localhost','127.0.0.1','[::1]'].includes(url.hostname)) {
    throw new Error('SITE_URL must be an official HTTPS origin without credentials, path, query or fragment.');
  }
  return url.origin;
}
export const publicOrigin = configuredOrigin();
export const origin = publicOrigin || 'http://127.0.0.1:3000';
export const brand = site.name || 'Nom agence';
export const hasOrganization = Boolean(publicOrigin && site.name);
export function absolute(path:string){return new URL(path, origin).toString()}
export function pathFor(route:string){return route ? '/'+route : '/'}
export function canIndex(route:string){
  // Case studies are demonstrative and articles are drafts in the current content model.
  const unverified = route.startsWith('authors') || route === '' || route.startsWith('case-studies') || route.startsWith('blog');
  return Boolean(process.env.SITE_INDEXING === 'true' && hasOrganization && !unverified && (site.approvedRoutes as string[]).includes(pathFor(route)));
}
const descriptions:Record<string,string> = {
  "": "Reliez référencement, contenu et automatisation pour attirer les bons prospects et faciliter la prise de contact. Découvrez notre approche.",
  "services": "Découvrez nos services de stratégie, SEO, visibilité IA, contenu et automatisation. Des priorités et des indicateurs définis pour chaque mission.",
  "industries": "Découvrez les priorités marketing de votre secteur : questions des acheteurs, contenus utiles, prise de contact et suivi commercial.",
  "case-studies": "Trois scénarios fictifs illustrent des missions de SEO, de contenu et d’automatisation. Leurs chiffres ne sont pas des résultats clients vérifiés.",
  "blog": "Des guides pour préparer un audit de visibilité, comprendre la recherche IA et choisir une première automatisation. Textes en cours de validation.",
  "about": "Notre approche relie visibilité, conversion et mesure. Découvrez les priorités de travail et les informations sur l’agence à valider.",
  "contact": "Présentez votre activité, vos objectifs et votre besoin. Le formulaire indique si la transmission de votre demande est disponible.",
  "free-ai-visibility-audit": "Préparez un diagnostic de visibilité SEO et IA avec votre site et vos priorités. Le périmètre et le délai sont définis ensemble.",
  "book-call": "Présentez vos objectifs pour préparer un échange stratégique. Le formulaire ne réserve pas automatiquement de créneau.",
  "tools": "Ajustez les hypothèses d’un calculateur pour explorer un scénario. Les estimations ne constituent ni des revenus prévus ni des économies garanties.",
  "glossary": "Comprenez le SEO, le GEO, l’AEO, la recherche IA, le CRO et l’attribution à travers des définitions courtes."
};
export function descriptionFor(route:string):string {
  if(geoDescriptions[route]) return geoDescriptions[route];
  if(descriptions[route]) return descriptions[route];
  const [group,slug]=route.split('/');
  if(group==='services'){const item=services.find(x=>x.slug===slug);return item ? `${item.intro} Découvrez le périmètre et les indicateurs de cette mission.` : site.description;}
  if(group==='industries'){const item=industries.find(x=>x.slug===slug);return item ? `${item.title} : ${item.intro} Découvrez les priorités du secteur.` : site.description;}
  if(group==='case-studies'){const item=cases.find(x=>x.slug===slug);return item ? `Scénario fictif ${item.category} : ${item.title} Les chiffres sont illustratifs, sans résultat client vérifié.` : site.description;}
  return articles.find(x=>x.slug===slug)?.intro || site.description;
}
export function pageTitle(route:string){return route ? titleFor(route)||'Page introuvable' : 'SEO, visibilité IA et acquisition'}
export function metadataFor(route:string):Metadata {
  const title=pageTitle(route), description=descriptionFor(route), url=absolute(pathFor(route));
  const image=absolute('/share?page='+encodeURIComponent(route));
  return {
    title: {absolute:`${title} | ${brand}`}, description,
    alternates:{canonical:url}, robots:{index:canIndex(route),follow:true},
    openGraph:{title,description,url,siteName:brand,locale:'fr_FR',type:route.startsWith('blog/')?'article':'website',images:[{url:image,width:1200,height:630,alt:`${title} — ${brand}`}]},
    twitter:{card:'summary_large_image',title,description,images:[{url:image,alt:`${title} — ${brand}`} ]}
  };
}
export type FAQ={question:string,answer:string};
export function faqsFor(route:string):FAQ[]{
 if(route.startsWith('services/')){
  const service=services.find(s=>'services/'+s.slug===route);if(!service)return [];
  return [{question:`Comment débute une mission ${service.title} ?`,answer:service.approach},{question:'Comment évaluer les progrès ?',answer:service.measurement},{question:'Les résultats sont-ils garantis ?',answer:'Aucune position, citation IA ni performance commerciale n’est garantie. Le périmètre, le point de départ et les indicateurs sont convenus avant la mission.'}];
 }
 if(route==='free-ai-visibility-audit')return [{question:'Cette page lance-t-elle un scan de visibilité IA ?',answer:'Non. Le formulaire sert à préparer la demande. Le périmètre du diagnostic et sa méthode sont définis ensemble.'},{question:'Quelles informations préparer ?',answer:'Votre site, vos priorités et les questions que posent vos acheteurs. Ne transmettez aucun mot de passe dans le formulaire.'}];
 if(route==='book-call')return [{question:'Le formulaire confirme-t-il un rendez-vous ?',answer:'Non. Le calendrier n’est pas connecté. Aucun créneau ni invitation ne sont générés.'}];
 return [];
}
export function schemaFor(route:string){
  const url=absolute(pathFor(route)); const title=pageTitle(route); const description=descriptionFor(route);
  const graph:Record<string,unknown>[]=[{'@type':'WebPage','@id':url+'#webpage',url,name:title,description,inLanguage:'fr'}];
  const organizationId=absolute('/#organization');
  if(hasOrganization)graph.push({'@type':'Organization','@id':organizationId,name:site.name,url:publicOrigin,description:site.description,...(site.legalName?{legalName:site.legalName}:{}),...(site.sameAs.length?{sameAs:site.sameAs}:{})});
  if(route){
    const parts=route.split('/');
    const crumbs=[{name:'Accueil',item:absolute('/')}];
    if(parts.length>1)crumbs.push({name:pageTitle(parts[0]),item:absolute('/'+parts[0])});
    crumbs.push({name:title,item:url});
    graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
    graph[0].breadcrumb={'@id':url+'#breadcrumb'};
  }
  if(route.startsWith('services/'))graph.push({'@type':'Service','@id':url+'#service',name:title,serviceType:title,description,url,...(hasOrganization?{provider:{'@id':organizationId}}:{})});
  const article=articles.find(a=>'blog/'+a.slug===route);
  if(article)graph.push({'@type':'Article','@id':url+'#article',headline:article.title,description:article.intro,articleSection:article.category,inLanguage:'fr',mainEntityOfPage:{'@id':url+'#webpage'},creativeWorkStatus:'Draft',image:absolute('/share?page='+encodeURIComponent(route)),...(hasOrganization?{publisher:{'@id':organizationId}}:{})});
  const faq=faqsFor(route);
  if(faq.length){graph[0]['@type']=['WebPage','FAQPage'];graph[0].mainEntity=faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}));}
  if(route==='glossary')graph.push({'@type':'DefinedTermSet','@id':url+'#terms',name:'Glossaire marketing et recherche IA',hasDefinedTerm:terms.map(t=>({'@type':'DefinedTerm','@id':url+'#'+t.id,name:t.name,description:t.definition,inDefinedTermSet:{'@id':url+'#terms'}}))});
  return {'@context':'https://schema.org','@graph':graph};
}
