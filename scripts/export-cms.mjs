import {readFile,writeFile} from 'node:fs/promises';
import {validateArticles} from './cms-content.mjs';
const articles=validateArticles(JSON.parse(await readFile('content/articles.json','utf8')));
const quote=value=>"'"+value.replaceAll("'","''")+"'";
const sql=articles.map(article=>`insert into public.agency_articles (slug,payload,published) values (${quote(article.slug)},${quote(JSON.stringify(article))}::jsonb,false) on conflict (slug) do nothing;`).join('\n');
await writeFile('supabase/seed-articles.sql','-- Unpublished drafts: review in Supabase before publication.\n'+sql+'\n');
console.log('supabase/seed-articles.sql prepared locally; no database writes.');
