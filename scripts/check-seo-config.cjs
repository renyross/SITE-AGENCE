const fs=require('node:fs');
const assert=require('node:assert/strict');
const {stripTypeScriptTypes}=require('node:module');
const source=stripTypeScriptTypes(fs.readFileSync('lib/seo.ts','utf8')).replace(/^import .*;\s*$/gm,'').replace(/\bexport /g,'');
const load=new Function('site','services','industries','cases','articles','titleFor','process','geoDescriptions','terms',source+'\nreturn {schemaFor,canIndex,metadataFor,publicOrigin};');
const services=require('../content/services.json'),industries=require('../content/industries.json'),cases=require('../content/cases.json'),articles=require('../content/articles.json');
const titleFor=route=>services.find(s=>'services/'+s.slug===route)?.title||route;
function config(site,env){return load(site,services,industries,cases,articles,titleFor,{env},{},[]);}
const draft={name:null,legalName:null,description:'Test fixture',sameAs:[],approvedRoutes:[]};
assert.equal(config(draft,{}).canIndex('services/seo'),false);
assert(!config(draft,{}).schemaFor('')['@graph'].some(n=>n['@type']==='Organization'));

const published={...draft,name:'Test fixture agency',legalName:'Test fixture legal entity',sameAs:['https://example.org/profile'],approvedRoutes:['/services/seo','/','/case-studies','/blog']};
const ready=config(published,{SITE_URL:'https://example.org',SITE_INDEXING:'true'});
assert(ready.canIndex('services/seo'));
assert(!ready.canIndex('services/geo'));
for(const route of ['', 'case-studies','blog'])assert(!ready.canIndex(route));
const graph=ready.schemaFor('services/seo')['@graph'];
const org=graph.find(n=>n['@type']==='Organization');
assert.equal(org.name,published.name);assert.equal(org.url,'https://example.org');
assert.equal(graph.find(n=>n['@type']==='Service').provider['@id'],org['@id']);
assert.equal(ready.metadataFor('services/seo').alternates.canonical,'https://example.org/services/seo');
for(const url of ['http://example.org','https://example.org/path','https://localhost','https://name:secret@example.org','https://example.org?x=1'])assert.throws(()=>config(published,{SITE_URL:url}));
console.log('Review and production configuration: indexation gating, canonical origin validation, Organization and Service references passed using isolated test fixtures.');
