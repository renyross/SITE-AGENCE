import {spawn} from 'node:child_process';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
const base=process.env.AUDIT_URL||'http://127.0.0.1:3000';
const services=JSON.parse(await readFile('content/services.json','utf8'));
const cases=[['final-home-mobile','/',false],['home-desktop','/',true],['service-mobile','/services/'+services[0].slug,false],['article-mobile','/blog/seo-and-ai-search-shared-foundations',false]];
await mkdir('reports/lighthouse',{recursive:true});
const summary=[];
for(const [name,path,desktop] of cases){
 const args=['node_modules/lighthouse/cli/index.js',base+path,'--only-categories=performance,accessibility,best-practices,seo','--chrome-flags=--headless --no-sandbox','--output=json','--output=html','--output-path=reports/lighthouse/'+name,'--quiet',...(desktop?['--preset=desktop']:[])];
 await new Promise((resolve,reject)=>{const child=spawn(process.execPath,args,{stdio:'inherit',env:process.env});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error('Lighthouse failed: '+code)));});
 const report=JSON.parse(await readFile('reports/lighthouse/'+name+'.report.json','utf8'));
 console.log(name,JSON.stringify(Object.fromEntries(Object.entries(report.categories).map(([k,v])=>[k,Math.round(v.score*100)]))));
 summary.push({name,url:report.finalDisplayedUrl,date:report.fetchTime,scores:Object.fromEntries(Object.entries(report.categories).map(([key,value])=>[key,Math.round(value.score*100)])),lcpMs:report.audits['largest-contentful-paint'].numericValue,tbtMs:report.audits['total-blocking-time'].numericValue,cls:report.audits['cumulative-layout-shift'].numericValue,transferBytes:report.audits['total-byte-weight'].numericValue,warnings:report.runWarnings});
}
await writeFile('reports/lighthouse/summary.json',JSON.stringify(summary,null,2)+'\n');
