const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.SITE_URL || 'http://127.0.0.1:3000';
const routes = ['/', '/services','/case-studies','/industries','/blog','/about','/contact','/free-ai-visibility-audit','/book-call','/tools','/glossary'];
routes.push('/comparisons','/comparisons/seo-vs-geo','/comparisons/geo-vs-aeo','/editorial-policy','/authors','/authors/editorial-profile');
for(const [file,prefix] of [['services','services'],['industries','industries'],['cases','case-studies'],['articles','blog']]) for(const item of require('../content/'+file+'.json')) routes.push('/'+prefix+'/'+item.slug);
(async()=>{
 const options = {headless:true};
 if(process.env.CHROME_PATH) options.executablePath=process.env.CHROME_PATH;
 const browser=await chromium.launch(options);
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 for(const route of routes){
  const res=await page.goto(base+route);
  assert.equal(res.status(),200,route);
  assert.equal(await page.locator('h1').count(),1,route+' H1');
  assert.equal(await page.locator('main').count(),1,route+' main');
  assert.equal(await page.locator('footer').count(),1,route+' footer');
  const problems=await page.evaluate(()=>{
   const ids=[...document.querySelectorAll('[id]')].map(x=>x.id);
   const broken=[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>!document.getElementById(h.slice(1)));
   return {duplicates:ids.filter((id,i)=>ids.indexOf(id)!==i),broken,overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.deepEqual(problems,{duplicates:[],broken:[],overflow:false},route);
 }
 const absent=await page.goto(base+'/services/unknown');assert.equal(absent.status(),404);
 await page.goto(base+'/');
 await page.locator('#calc-traffic').fill('10000');
 await page.locator('#calc-conversion').fill('2');
 await page.waitForFunction(()=>document.getElementById('result-revenue')?.textContent==='€7,200');
 await page.locator('#report-toggle').click();await page.locator('#report-email').fill('test@example.com');await page.getByRole('button',{name:'Preview my report'}).click();
 assert.equal(await page.locator('#report-download').isVisible(),true);
 await page.locator('#calc-traffic').fill('0');assert.equal(await page.locator('#report-download').isVisible(),false);
 await page.goto(base+'/blog?category=guides');assert.equal(await page.locator('.page-card').count(),2);
 await page.goto(base+'/free-ai-visibility-audit');
 const form=page.locator('main form');await form.locator('[name=name]').fill('Test');await form.locator('[name=email]').fill('test@example.com');await form.locator('[name=website]').fill('https://example.com');await form.locator('textarea').fill('Test request');await form.getByRole('button').click();assert.match(await form.locator('[role=status]').textContent(),/no request/);
 for(const width of [320,390,768]){
  await page.setViewportSize({width,height:900});
  for(const route of routes){await page.goto(base+route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,route+' mobile '+width);}
 }
 await page.goto(base+'/');await page.locator('.app-menu summary').click();assert.equal(await page.locator('.app-menu-panel').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('.app-menu-panel').isVisible(),false);
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.technology-track').evaluate(e=>getComputedStyle(e).animationName),'none');
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/');await page.screenshot({path:'/tmp/agency-home-desktop.png'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'/tmp/agency-home-mobile.png'});
 assert.deepEqual(errors,[]);
 console.log(`${routes.length} routes: HTTP 200, semantic structure, anchors and 320/390/768px overflow checks passed. 404, filters, forms, calculator, mobile menu and reduced motion passed.`);
 } finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
