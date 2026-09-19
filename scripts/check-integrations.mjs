import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {parseLead,leadConfig,deliverLead} from '../lib/integrations/leads.ts';
import {validateArticles} from './cms-content.mjs';
const lead={kind:'contact',name:'Test local',email:'test@example.invalid',company:'Test',website:'https://example.invalid',message:'Local test only',topic:'seo'};
assert(parseLead(lead));assert.equal(parseLead({...lead,email:'not-an-email'}),null);assert.equal(parseLead({...lead,website:'javascript:alert(1)'}),null);assert.equal(parseLead({...lead,message:'x'.repeat(4001)}),null);
assert.equal(leadConfig({}),null);assert.equal(leadConfig({LEADS_ENABLED:'true',CRM_PROVIDER:'hubspot',CRM_WEBHOOK_URL:'http://example.invalid',CRM_WEBHOOK_TOKEN:'local-test'}),null);
for(const provider of ['hubspot','brevo','gohighlevel']){
 const config=leadConfig({LEADS_ENABLED:'true',CRM_PROVIDER:provider,CRM_WEBHOOK_URL:'https://example.invalid/leads',CRM_WEBHOOK_TOKEN:'local-test'});
 assert(config);let forwarded;
 await deliverLead(lead,config,async(url,options)=>{forwarded=JSON.parse(options.body);assert.equal(options.headers.Authorization,'Bearer local-test');return new Response('{}',{status:200});});
 assert.equal(forwarded.provider,provider);assert.deepEqual(forwarded.lead,lead);
 await assert.rejects(()=>deliverLead(lead,config,async()=>new Response('',{status:500})));
}
const articles=JSON.parse(await readFile('content/articles.json','utf8'));assert.equal(validateArticles(articles).length,articles.length);
assert.throws(()=>validateArticles([]));assert.throws(()=>validateArticles([articles[0],articles[0]]));assert.throws(()=>validateArticles([{...articles[0],sources:[{title:'bad',url:'javascript:alert(1)'}]}]));
console.log('CRM validation, disabled defaults, all three webhook mappings, delivery failures and CMS validation passed; no external calls.');
