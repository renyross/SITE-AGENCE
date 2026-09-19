'use client';
import {useEffect,useState} from 'react';
import {LazyMotion,domAnimation,m,useReducedMotion} from 'framer-motion';
export default function DemoForm({kind}:{kind:'audit'|'contact'|'call'|'newsletter'}){
 const [enabled,setEnabled]=useState(false),[status,setStatus]=useState(''),[busy,setBusy]=useState(false);
 const reduced=useReducedMotion();
 useEffect(()=>{fetch('/api/leads').then(r=>r.json()).then(d=>setEnabled(d.enabled===true)).catch(()=>{});},[]);
 const newsletter=kind==='newsletter';
 return <form className="app-form" onSubmit={async e=>{
  e.preventDefault();if(!enabled||busy)return;setBusy(true);setStatus('');
  const fields=Object.fromEntries(new FormData(e.currentTarget));
  try{const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,kind})});const result=await response.json();setStatus(response.ok?result.message:result.error||'Envoi indisponible.');}catch{setStatus('La transmission n’a pas pu être confirmée.');}finally{setBusy(false);}
 }}>
 <p className="form-notice">{enabled?'Votre demande sera transmise à notre équipe.':'Envoi non connecté : aucune donnée n’est transmise.'}</p>
 <fieldset disabled={busy} className="demo-fields"><legend className="sr-only">Votre demande</legend>
 {!newsletter&&<label>Nom<input name="name" autoComplete="name" required maxLength={120}/></label>}
 <label>Adresse e-mail<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>
 {!newsletter&&<label>Entreprise<input name="company" autoComplete="organization" maxLength={160}/></label>}
 {kind==='audit'&&<label>Site internet<input name="website" type="url" required maxLength={2048}/></label>}
 {!newsletter&&<label>Votre demande<textarea name="message" required rows={4} maxLength={4000}/></label>}
 <div hidden><label>Ne pas remplir<input name="company_url" autoComplete="off" tabIndex={-1}/></label></div>
 <button className="button primary" type="submit" disabled={!enabled||busy}>{busy?'Transmission…':newsletter?'Demander l’inscription':'Envoyer ma demande'}</button>
 </fieldset><noscript><p>Activez JavaScript pour envoyer ce formulaire.</p></noscript>
 <LazyMotion features={domAnimation}><m.p key={status} role="status" className="min-h-6 text-sm" initial={reduced?false:{opacity:.65}} animate={{opacity:1}} transition={{duration:reduced?0:.18}}>{status}</m.p></LazyMotion>
 </form>;
}
