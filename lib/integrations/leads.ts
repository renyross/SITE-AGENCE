export type Lead={kind:'audit'|'contact'|'call'|'newsletter';name:string;email:string;company:string;website:string;message:string;topic:string};
export function parseLead(input:unknown):Lead|null {
 if(!input||typeof input!=='object'||Array.isArray(input))return null;
 const value=input as Record<string,unknown>;
 const limits={kind:12,name:120,email:254,company:160,website:2048,message:4000,topic:100};
 const out:Record<string,string>={};
 for(const [key,limit] of Object.entries(limits)){
  const item=value[key]??'';if(typeof item!=='string'||item.length>limit)return null;out[key]=item.trim();
 }
 if(!['audit','contact','call','newsletter'].includes(out.kind)||!/^\S+@[^\s@]+\.[^\s@]+$/.test(out.email))return null;
 if(out.kind!=='newsletter'&&(!out.name||!out.message))return null;
 if(out.kind==='audit'&&!out.website)return null;
 if(out.website){try{const url=new URL(out.website);if(!['http:','https:'].includes(url.protocol))return null;}catch{return null;}}
 return out as Lead;
}
export function leadConfig(env:NodeJS.ProcessEnv=process.env){
 if(env.LEADS_ENABLED!=='true')return null;
 if(!['hubspot','brevo','gohighlevel'].includes(env.CRM_PROVIDER||''))return null;
 try{const url=new URL(env.CRM_WEBHOOK_URL||'');if(url.protocol!=='https:'||url.username||url.password||!env.CRM_WEBHOOK_TOKEN)return null;return {url:url.href,provider:env.CRM_PROVIDER!,token:env.CRM_WEBHOOK_TOKEN};}catch{return null;}
}
export async function deliverLead(lead:Lead,config:NonNullable<ReturnType<typeof leadConfig>>,send:typeof fetch=fetch){
 const response=await send(config.url,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+config.token},body:JSON.stringify({version:1,provider:config.provider,submittedAt:new Date().toISOString(),lead}),signal:AbortSignal.timeout(8000),redirect:'error',cache:'no-store'});
 if(!response.ok)throw new Error('CRM delivery failed');
}
