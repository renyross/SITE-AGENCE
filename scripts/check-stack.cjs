const {chromium}=require('@playwright/test');const assert=require('node:assert/strict');const fs=require('node:fs');
const base=process.env.SITE_URL||'http://127.0.0.1:3108';
(async()=>{const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});try{
 const page=await browser.newPage();const response=await page.request.get(base+'/api/leads');assert.deepEqual(await response.json(),{enabled:false});
 const input={kind:'contact',name:'Local test',email:'test@example.invalid',message:'Test only'};
 for(const [data,origin,status] of [[input,base,503],[input,'https://other.invalid',403],[{...input,email:'invalid'},base,400],[{...input,message:'x'.repeat(13000)},base,413]]){
  const response=await page.request.post(base+'/api/leads',{data,headers:{Origin:origin}});assert.equal(response.status(),status);
 }
 await page.goto(base+'/contact');await page.waitForSelector('.app-form');assert(await page.locator('.app-form button[type=submit]').isDisabled());
 await page.goto(base);await page.waitForFunction(()=>document.querySelector('#contact-form-feedback')?.textContent.includes('aucune donnée'));assert(await page.locator('#agency-contact-form button[type=submit]').isDisabled());
 const source=fs.readFileSync('public/legacy/25-tracking.js','utf8');
 for(const mode of ['direct','gtm']){
  const ctx=await browser.newContext();const p=await ctx.newPage();const external=[];
  await p.route('**/*',route=>{const url=route.request().url();if(!url.startsWith(base)){external.push(url);return route.fulfill({body:'',contentType:'application/javascript'});}if(url.endsWith('/tracking-fixture'))return route.fulfill({contentType:'text/html',body:'<footer id="site-footer"></footer><script type="application/json" id="tracking-config">'+JSON.stringify({mode,ga4:'G-TEST123',meta:'12345',linkedin:'67890',gtm:'GTM-TEST123'})+'</script>'});return route.continue();});
  await p.goto(base+'/tracking-fixture');await p.evaluate(source);assert.equal(external.length,0);
  await p.getByRole('button',{name:'Refuser',exact:true}).click();assert.equal(external.length,0);
  await p.getByRole('button',{name:'Préférences de mesure',exact:true}).click();await p.getByRole('button',{name:'Autoriser',exact:true}).click();
  await p.waitForFunction(()=>document.querySelectorAll('head script[src]').length>0);
  const urls=await p.locator('head script[src]').evaluateAll(els=>els.map(e=>e.src));assert.equal(urls.length,mode==='gtm'?1:3);
  if(mode==='gtm')assert(urls[0].includes('/gtm.js'));else assert(urls.some(u=>u.includes('fbevents.js'))&&urls.some(u=>u.includes('insight.min.js')));
  await p.getByRole('button',{name:'Préférences de mesure',exact:true}).click();await Promise.all([p.waitForEvent('load'),p.getByRole('button',{name:'Refuser',exact:true}).click()]);await p.evaluate(source);assert.equal(await p.locator('head script[src]').count(),0);
  await ctx.close();
 }
 console.log('API rejection paths, honest disabled forms, consent gating, direct/GTM separation and consent withdrawal passed; third-party calls intercepted.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
