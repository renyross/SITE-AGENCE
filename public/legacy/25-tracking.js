(function(){
 'use strict';
 const element=document.getElementById('tracking-config');
 if(!element||document.getElementById('tracking-preferences'))return;
 const config=JSON.parse(element.textContent);
 const key='agency_tracking_v1';
 const stored=document.cookie.split('; ').find(value=>value.startsWith(key+'='))?.split('=')[1];
 let choice=['granted','denied'].includes(stored)?stored:null;
 let loaded=false;
 function script(src){const node=document.createElement('script');node.async=true;node.src=src;document.head.append(node);}
 function load(){
  if(loaded)return;loaded=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
  if(config.mode==='gtm'){
   window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
   script('https://www.googletagmanager.com/gtm.js?id='+config.gtm);
   return;
  }
  if(config.ga4){
   window.gtag('js',new Date());
   window.gtag('config',config.ga4,{page_location:location.origin+location.pathname,page_referrer:'',allow_google_signals:false});
   script('https://www.googletagmanager.com/gtag/js?id='+config.ga4);
  }
  if(config.meta){
   const fbq=function(){if(fbq.callMethod)fbq.callMethod.apply(fbq,arguments);else fbq.queue.push(arguments);};
   fbq.queue=[];fbq.loaded=true;fbq.version='2.0';fbq.push=fbq;
   window.fbq=window._fbq=fbq;
   fbq('consent','grant');fbq('set','autoConfig',false,config.meta);fbq('init',config.meta);fbq('track','PageView');
   script('https://connect.facebook.net/en_US/fbevents.js');
  }
  if(config.linkedin){
   window._linkedin_partner_id=config.linkedin;
   window._linkedin_data_partner_ids=[config.linkedin];
   script('https://snap.licdn.com/li.lms-analytics/insight.min.js');
  }
 }
 const panel=document.createElement('section');panel.id='tracking-preferences';panel.className='tracking-preferences';panel.setAttribute('aria-label','Préférences de mesure');
 const text=document.createElement('p');text.textContent='Autoriser les outils de mesure d’audience et de publicité ? Vous pouvez refuser et modifier votre choix à tout moment.';
 const actions=document.createElement('div');actions.className='tracking-actions';
 function save(value){
  choice=value;
  document.cookie=key+'='+value+'; Max-Age='+180*86400+'; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');
  panel.hidden=true;
  if(value==='granted')load();
  else if(loaded){window.gtag?.('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});window.fbq?.('consent','revoke');location.reload();}
  settings.focus();
 }
 for(const [label,value] of [['Refuser','denied'],['Autoriser','granted']]){const button=document.createElement('button');button.type='button';button.className='button';button.textContent=label;button.onclick=()=>save(value);actions.append(button);}
 panel.append(text,actions);panel.hidden=choice!==null;document.body.append(panel);
 const settings=document.createElement('button');settings.type='button';settings.className='button tracking-settings';settings.textContent='Préférences de mesure';settings.onclick=()=>{panel.hidden=false;actions.querySelector('button').focus();};
 (document.getElementById('site-footer')||document.body).append(settings);
 if(choice==='granted')load();
}());
