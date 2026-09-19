const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.SITE_URL||'http://127.0.0.1:3000';
const sample=(file,prefix)=>prefix+'/'+JSON.parse(fs.readFileSync('content/'+file+'.json'))[0].slug;
const routes=['/','/services',sample('services','/services'),'/industries',sample('industries','/industries'),'/case-studies',sample('cases','/case-studies'),'/blog',sample('articles','/blog'),'/about','/contact','/free-ai-visibility-audit','/book-call','/tools','/glossary','/comparisons/seo-vs-geo','/authors/editorial-profile','/editorial-policy'];
const sizes=[[320,780],[390,844],[768,1024],[1024,768],[1280,800],[1440,900]];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const results=[];
 try{
  const page=await browser.newPage();
  for(const [width,height] of sizes){
   await page.setViewportSize({width,height});
   for(const route of routes){
    const response=await page.goto(base+route);assert.equal(response.status(),200,route);
    await page.evaluate(()=>document.fonts.ready);
    // Lay out every section, including content-visibility sections outside the viewport.
    await page.addStyleTag({content:'main>section{content-visibility:visible!important}'});
    const overflow=await page.evaluate(()=>{
     const failures=[];
     if(document.documentElement.scrollWidth>innerWidth+2)failures.push('document');
     for(const e of document.querySelectorAll('main h1,main h2,main h3,main p,main input,main textarea,main button,.app-header-row')){
      const r=e.getBoundingClientRect();if(!r.width||!r.height||e.closest('[aria-hidden="true"],.sr-only'))continue;
      let clipped=false;for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){if(['auto','scroll'].includes(getComputedStyle(a).overflowX)||a.getBoundingClientRect().width<=1){clipped=true;break;}}
      if(!clipped&&(r.left < -2||r.right>innerWidth+2))failures.push(e.id||e.className||e.tagName);
     }
     return failures;
    });
    assert.deepEqual(overflow,[],`${route} at ${width}px: overflow`);
    results.push({route,width,height});
   }
   console.log(`${width}px: ${routes.length} pages without horizontal overflow`);
  }
  for(const [width,height] of [[320,780],[844,390],[640,450]]){
   await page.setViewportSize({width,height});await page.goto(base);
   await page.locator('.app-menu>summary').click();
   await page.locator('.mobile-services-summary').click();
   const last=page.locator('.app-menu-panel>.button').last();await last.scrollIntoViewIfNeeded();assert(await last.isVisible());
   await page.locator('.app-menu>summary').focus();await page.keyboard.press('Escape');assert.equal(await page.locator('.app-menu').getAttribute('open'),null);
   await page.evaluate(()=>scrollTo(0,1100));
   const header=await page.locator('.app-header').boundingBox();assert(Math.abs(header.y)<2,'Sticky mobile CTA must remain visible');
   assert(await page.locator('.app-header-actions .primary').isVisible());
  }
  await page.setViewportSize({width:390,height:844});await page.goto(base);
  for(const selector of ['.services-carousel-track','.industries-carousel-track']){
   const cards=await page.locator(selector+'>li').evaluateAll(els=>els.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width}}));
   assert(cards.length>1);assert(cards[1].y>cards[0].y);assert(Math.abs(cards[1].x-cards[0].x)<2);
  }
  await page.locator('#mc-team').scrollIntoViewIfNeeded();await page.locator('#mc-team').focus();
  const before=await page.locator('#mc-team').inputValue();await page.keyboard.press('ArrowRight');assert.notEqual(await page.locator('#mc-team').inputValue(),before);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.multilingual-ticker-track').evaluate(e=>getComputedStyle(e).animationName),'none');
  fs.mkdirSync('reports/responsive',{recursive:true});
  for(const [width,height] of [[320,780],[768,1024],[1440,900]]){await page.setViewportSize({width,height});await page.goto(base);await page.screenshot({path:`reports/responsive/home-${width}.png`});}
  fs.writeFileSync('reports/responsive/summary.json',JSON.stringify({date:new Date().toISOString(),browser:await browser.version(),base,checks:results,interactions:['menu, submenu, Escape at 320/844/640px','sticky header CTA','vertical mobile cards','keyboard calculator slider','reduced motion'],limitations:'Chrome local; viewport emulation, not physical devices'},null,2)+'\n');
  console.log('Responsive navigation, sticky CTA, vertical cards, slider and reduced motion passed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
