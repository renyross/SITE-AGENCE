import {parseLead,leadConfig,deliverLead} from '../../../lib/integrations/leads';
export const dynamic = 'force-static';
export const runtime='nodejs';
const attempts=new Map<string,{count:number,expires:number}>();
const reply=(body:object,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){return reply({enabled:!!leadConfig()});}
export async function POST(request:Request){
 const expectedOrigin=process.env.SITE_URL?new URL(process.env.SITE_URL).origin:new URL(request.url).protocol+'//'+request.headers.get('host');
 if(request.headers.get('origin')!==expectedOrigin)return reply({error:'Origine non autorisée.'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Format non pris en charge.'},415);
 // Bound the stream even when Content-Length is absent or dishonest.
 const reader=request.body?.getReader();if(!reader)return reply({error:'Données manquantes.'},400);
 let size=0;const chunks:Uint8Array[]=[];
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>12000){await reader.cancel();return reply({error:'Message trop volumineux.'},413);}chunks.push(value);}
 let input;try{input=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return reply({error:'Données invalides.'},400);}
 if(input?.company_url)return reply({error:'Demande refusée.'},400);
 const lead=parseLead(input);if(!lead)return reply({error:'Vérifiez les champs du formulaire.'},400);
 const config=leadConfig();if(!config)return reply({error:'Envoi indisponible : aucun message n’a été transmis.'},503);
 const now=Date.now();for(const [key,value] of attempts)if(value.expires<now)attempts.delete(key);
 // Instance-local backstop; deployment must add a shared edge rate limit.
 const key=lead.email.toLowerCase();const bucket=attempts.get(key)||{count:0,expires:now+600000};
 if(bucket.count>=3||attempts.size>=10000)return reply({error:'Veuillez réessayer plus tard.'},429);
 bucket.count++;attempts.set(key,bucket);
 try{await deliverLead(lead,config);return reply({ok:true,message:'Demande transmise. Aucun rendez-vous n’est encore réservé.'});}catch{return reply({error:'La transmission n’a pas pu être confirmée. Réessayez plus tard.'},502);}
}
