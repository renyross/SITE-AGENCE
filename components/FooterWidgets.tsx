'use client';
import {useState,useEffect} from 'react';
export function FooterClock(){
  const [time,setTime]=useState('—');
  useEffect(()=>{const update=()=>setTime(new Date().toTimeString().split(' ')[0]);update();const id=setInterval(update,1000);return ()=>clearInterval(id)},[]);
  return <span>{time} · HEURE LOCALE</span>;
}
export function FooterWidgets(){
  const [showPill,setShowPill]=useState(true);
  const [showScrollTop,setShowScrollTop]=useState(false);
  useEffect(()=>{const update=()=>setShowScrollTop(window.scrollY>250);update();window.addEventListener('scroll',update,{passive:true});return ()=>window.removeEventListener('scroll',update)},[]);
  return <>
    {showPill && <div className="floating-audit-pill"><span className="floating-pill-text">Obtenez votre audit de croissance gratuit</span><a href="/free-ai-visibility-audit" className="floating-pill-btn">Obtenez mon audit gratuit <span aria-hidden="true">↗</span></a><button type="button" className="floating-pill-close" onClick={()=>setShowPill(false)} aria-label="Fermer">✕</button></div>}
    <a href="https://wa.me/14372919570" target="_blank" rel="noopener noreferrer" className="floating-whatsapp-btn" aria-label="Discuter sur WhatsApp"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.06c-1.49 0-2.94-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a7.877 7.877 0 0 1-1.22-4.29c0-4.41 3.59-8 8-8 2.14 0 4.15.83 5.66 2.34a7.99 7.99 0 0 1 2.34 5.66c0 4.41-3.59 8-8 8zm4.39-6c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.41-.54-.42l-.46-.01c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.02.4 1.38.52.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/></svg></a>
    <button type="button" id="scroll-to-top-btn" className={`floating-scroll-top-btn ${showScrollTop?'is-visible':''}`} aria-label="Remonter en haut du site" title="Remonter en haut" onClick={()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 14 12 8 18 14"/></svg></button>
  </>;
}
