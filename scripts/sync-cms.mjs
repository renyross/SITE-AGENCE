import {mkdir,readFile,writeFile,rename} from 'node:fs/promises';
import {validateArticles} from './cms-content.mjs';
const {SUPABASE_URL:origin,SUPABASE_PUBLISHABLE_KEY:key}=process.env;
if(!origin||!key)throw new Error('Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in the local environment.');
const url=new URL(origin);if(url.protocol!=='https:'||!url.hostname.endsWith('.supabase.co'))throw new Error('Expected an HTTPS Supabase project URL.');
url.pathname='/rest/v1/agency_articles';url.search='select=payload&published=eq.true&order=slug&limit=1000';
const response=await fetch(url,{headers:{apikey:key},signal:AbortSignal.timeout(10000),redirect:'error'});
if(!response.ok)throw new Error('CMS read failed: '+response.status);
const articles=validateArticles((await response.json()).map(row=>row.payload));
await mkdir('reports/cms',{recursive:true});
await writeFile('reports/cms/articles.preview.json',JSON.stringify(articles,null,2)+'\n');
if(process.argv.includes('--apply')){
 await writeFile('reports/cms/articles.backup.json',await readFile('content/articles.json'));
 await writeFile('content/articles.json.tmp',JSON.stringify(articles,null,2)+'\n');
 await rename('content/articles.json.tmp','content/articles.json');
 console.log('Articles imported. Rebuild and review routes, metadata and sitemap before publishing.');
}else console.log('Preview created; content is unchanged. Review then rerun with --apply.');
