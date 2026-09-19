export function validateArticles(rows){
 if(!Array.isArray(rows)||!rows.length||rows.length>=1000)throw new Error('Expected 1–999 articles; empty or possibly truncated imports are refused.');
 const slugs=new Set();
 const text=(value,max=20000)=>typeof value==='string'&&value.trim().length>0&&value.length<=max;
 return rows.map(row=>{
  if(!row||!text(row.slug,120)||!/^([a-z0-9]+-)*[a-z0-9]+$/.test(row.slug)||slugs.has(row.slug))throw new Error('Invalid or duplicate slug');
  slugs.add(row.slug);
  for(const key of ['title','category','intro'])if(!text(row[key],key==='intro'?2000:200))throw new Error('Invalid '+key);
  if(!Array.isArray(row.sections)||!row.sections.length||row.sections.length>50||row.sections.some(s=>!s||!text(s.heading,300)||!text(s.text)))throw new Error('Invalid sections');
  if(!Array.isArray(row.sources)||row.sources.length>30||row.sources.some(s=>{try{return !text(s.title,300)||new URL(s.url).protocol!=='https:'}catch{return true}}))throw new Error('Invalid sources');
  return {slug:row.slug,title:row.title,category:row.category,intro:row.intro,sections:row.sections.map(({heading,text})=>({heading,text})),sources:row.sources.map(({title,url})=>({title,url}))};
 });
}
