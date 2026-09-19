const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.SITE_URL_TEST||'http://127.0.0.1:3000';
const routes=['/','/services','/industries','/case-studies','/blog','/about','/contact','/free-ai-visibility-audit','/book-call','/tools','/glossary'];
routes.push('/comparisons','/comparisons/seo-vs-geo','/comparisons/geo-vs-aeo','/editorial-policy','/authors','/authors/editorial-profile');
for(const [file,prefix] of [['services','services'],['industries','industries'],['cases','case-studies'],['articles','blog']])for(const item of require('../content/'+file+'.json'))routes.push('/'+prefix+'/'+item.slug);
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const page=await browser.newPage();const titles=new Set(),descriptions=new Set();
  for(const route of routes){
   assert.equal((await page.goto(base+route)).status(),200);
   const values=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,canonical:[...document.querySelectorAll('link[rel=canonical]')].map(x=>x.href),robots:document.querySelector('meta[name=robots]')?.content,og:document.querySelector('meta[property="og:url"]')?.content,image:document.querySelector('meta[property="og:image"]')?.content,twitter:document.querySelector('meta[name="twitter:card"]')?.content,schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>JSON.parse(x.textContent)),faq:[...document.querySelectorAll('.page-faq details')].map(x=>({question:x.querySelector('summary').textContent,answer:x.querySelector('p').textContent}))}));
   assert(values.title && values.description,route);assert(!titles.has(values.title),route+' duplicate title');assert(!descriptions.has(values.description),route+' duplicate description');titles.add(values.title);descriptions.add(values.description);
   assert.deepEqual(values.canonical,[base+route]);assert.equal(new URL(values.og).href,base+route);assert.match(values.robots,/noindex/);assert.equal(values.twitter,'summary_large_image');assert(values.image.startsWith(base+'/share?'));
   assert.equal(values.schema.length,1);const graph=values.schema[0]['@graph'];assert.equal(values.schema[0]['@context'],'https://schema.org');
   assert(!graph.some(x=>x['@type']==='Organization'),'No invented company identity');
   assert.equal(graph.some(x=>x['@type']==='BreadcrumbList'),route!=='/');
   assert.equal(graph.some(x=>x['@type']==='Service'),route.startsWith('/services/'));
   assert.equal(graph.some(x=>x['@type']==='Article'),route.startsWith('/blog/'));
   const faq=graph.find(x=>Array.isArray(x['@type'])&&x['@type'].includes('FAQPage'));
   assert.deepEqual(faq?.mainEntity.map(q=>({question:q.name,answer:q.acceptedAnswer.text}))||[],values.faq);
  }
  for(const [route,canonical] of [['/blog?category=guides','/blog'],['/contact?subject=careers','/contact']]){await page.goto(base+route);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),base+canonical);}
  const missing=await page.goto(base+'/services/not-real');assert.equal(missing.status(),404);assert.equal(await page.locator('link[rel=canonical]').count(),0);
  const llms=await page.request.get(base+'/llms.txt');assert.equal(llms.status(),200);assert.match(llms.headers()['content-type'],/text\/plain/);const llmsText=await llms.text();assert.match(llmsText,/fictional demonstrations/);assert(!llmsText.includes('/case-studies/'));
  for(const match of llmsText.matchAll(/\]\((https?:[^)]+)\)/g))assert.equal((await page.request.get(match[1])).status(),200,match[1]);
  await page.goto(base+'/glossary');const terms=await page.locator('script[type="application/ld+json"]').evaluate(e=>JSON.parse(e.textContent)['@graph'].find(n=>n['@type']==='DefinedTermSet').hasDefinedTerm);assert.equal(terms.length,8);for(const term of terms)assert.equal(await page.locator('#'+new URL(term['@id']).hash.slice(1)+' dd').textContent(),term.description);
  await page.goto(base+'/authors/editorial-profile');assert.equal(await page.locator('script[type="application/ld+json"]').evaluate(e=>JSON.parse(e.textContent)['@graph'].some(n=>n['@type']==='Person')),false);
  const sitemap=await page.request.get(base+'/sitemap.xml');assert.equal(sitemap.status(),200);assert(!(await sitemap.text()).includes('<loc>'));
  const robots=await page.request.get(base+'/robots.txt');assert.equal(robots.status(),200);assert.match(await robots.text(),/Allow: \//);
  for(const route of ['','blog/seo-and-ai-search-shared-foundations']){const image=await page.request.get(base+'/share?page='+encodeURIComponent(route));assert.equal(image.status(),200);assert.match(image.headers()['content-type'],/image\/png/);const data=await image.body();assert.equal(data.readUInt32BE(16),1200);assert.equal(data.readUInt32BE(20),630);if(!route)fs.writeFileSync('/tmp/agency-share.png',data);}
  assert.equal((await page.request.get(base+'/share?page=nonexistent')).status(),404);
  console.log('42 unique titles/descriptions, canonicals, OG/Twitter tags, JSON-LD types and visible FAQ parity passed. Query canonicals, 404, robots, preview sitemap and 1200×630 PNGs passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
