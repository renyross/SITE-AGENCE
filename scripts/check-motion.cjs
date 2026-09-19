const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH});
 const base=process.env.SITE_URL||'http://127.0.0.1:3000';
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  await page.addInitScript(()=>{window.motionCalls=[];const original=Element.prototype.animate;Element.prototype.animate=function(frames,options){window.motionCalls.push({className:this.className,frames,options});return original.call(this,frames,options)};});
  await page.goto(base);await page.waitForSelector('main[data-motion-ready="true"]');
  await page.locator('#mc-team').scrollIntoViewIfNeeded();
  await page.waitForSelector('#mc-savings-display .sr-only');
  await page.locator('#mc-team').evaluate(e=>{e.value='9';e.dispatchEvent(new Event('input',{bubbles:true}));});
  assert.equal((await page.locator('#mc-savings-display .sr-only').textContent()).replace(/[^0-9]/g,''),'163296');
  await page.waitForFunction(()=>{const e=document.querySelector('#mc-savings-display');return e.querySelector('.sr-only').textContent===e.querySelector('[aria-hidden]').textContent;});
  await page.locator('.services-heading').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>window.motionCalls.some(x=>x.className.includes('services-heading')));
  assert((await page.evaluate(()=>window.motionCalls)).some(x=>x.options.duration===420));
  const button=page.locator('.motion-toggle');await button.scrollIntoViewIfNeeded();await button.click();await page.mouse.move(0,0);
  assert.equal(await button.getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('.multilingual-ticker-track').evaluate(e=>getComputedStyle(e).animationPlayState),'running');
  await button.click();assert.equal(await button.getAttribute('aria-pressed'),'false');
  await page.evaluate(()=>scrollTo(0,0));await page.mouse.move(1000,200);
  await page.waitForFunction(()=>document.querySelector('.hero-video-backdrop').style.translate!=='');
  const translation=await page.locator('.hero-video-backdrop').evaluate(e=>e.style.translate.split(' ').map(parseFloat));assert(translation.every(n=>Math.abs(n)<=3));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>document.querySelector('.motion-toggle').hidden);
  assert.equal(await page.locator('.hero-video-backdrop').evaluate(e=>getComputedStyle(e).translate),'none');
  assert.equal(await page.locator('.multilingual-ticker-track').evaluate(e=>getComputedStyle(e).animationName),'none');
  await page.locator('.method-step').first().scrollIntoViewIfNeeded();assert.equal(await page.locator('.method-step').first().evaluate(e=>getComputedStyle(e).opacity),'1');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:390,height:844});await page.reload();await page.waitForSelector('main[data-motion-ready="true"]');
  await page.locator('.services-heading').scrollIntoViewIfNeeded();await page.waitForFunction(()=>window.motionCalls.length>0);
  assert((await page.evaluate(()=>window.motionCalls)).every(x=>x.options.duration===180&&x.frames[0].transform==='none'));
  assert(await button.isHidden());
  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const staticPage=await noJS.newPage();await staticPage.goto(base);await staticPage.locator('.method-step').first().scrollIntoViewIfNeeded();assert.equal(await staticPage.locator('.method-step').first().evaluate(e=>getComputedStyle(e).opacity),'1');await staticPage.locator('.app-menu>summary').click();assert(await staticPage.locator('.app-menu-panel').isVisible());await noJS.close();
  fs.mkdirSync('reports/motion',{recursive:true});fs.writeFileSync('reports/motion/summary.json',JSON.stringify({date:new Date().toISOString(),base,browser:await browser.version(),checks:['calculator counter reaches exact value with immediate accessible result','desktop reveal 420ms','marquee play and pause','pointer translation bounded to 3px','live reduced-motion toggle','mobile fade 180ms without translation','no-JS content and native navigation'],passed:true},null,2)+'\n');
  console.log('Motion: desktop, mobile, pause, live reduced motion and no-JS checks passed.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
