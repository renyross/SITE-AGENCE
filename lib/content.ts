import { geoRoutes, geoTitles } from './geo';
import services from '../content/services.json';
import industries from '../content/industries.json';
import cases from '../content/cases.json';
import articles from '../content/articles.json';
export { services, industries, cases, articles };
export const staticRoutes = ['services','case-studies','industries','blog','about','contact','free-ai-visibility-audit','book-call','tools','glossary'];
export const allRoutes = [...staticRoutes, ...geoRoutes, ...services.map(s=>'services/'+s.slug), ...industries.map(i=>'industries/'+i.slug), ...cases.map(c=>'case-studies/'+c.slug), ...articles.map(a=>'blog/'+a.slug)];
export function titleFor(route:string){
  if(geoTitles[route]) return geoTitles[route];
  const [group,slug]=route.split('/');
  if(slug){if(group==='services')return services.find(x=>x.slug===slug)?.title;if(group==='industries')return industries.find(x=>x.slug===slug)?.title;if(group==='case-studies')return cases.find(x=>x.slug===slug)?.title;if(group==='blog')return articles.find(x=>x.slug===slug)?.title;}
  return ({services:'Services','case-studies':'Exemples de missions',industries:'Secteurs',blog:'Articles',about:'À propos',contact:'Contact','free-ai-visibility-audit':'Audit gratuit de visibilité IA','book-call':'Échange stratégique',tools:'Outils',glossary:'Glossaire'} as Record<string,string>)[route];
}
