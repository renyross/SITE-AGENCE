import Script from 'next/script';
export default function Tracking(){
 if(process.env.TRACKING_ENABLED!=='true')return null;
 const valid=(value:string|undefined,pattern:RegExp)=>value&&pattern.test(value)?value:'';
 const config={mode:process.env.TRACKING_MODE==='gtm'?'gtm':'direct',gtm:valid(process.env.GTM_ID,/^GTM-[A-Z0-9]+$/),ga4:valid(process.env.GA4_ID,/^G-[A-Z0-9]+$/),meta:valid(process.env.META_PIXEL_ID,/^\d+$/),linkedin:valid(process.env.LINKEDIN_PARTNER_ID,/^\d+$/)};
 if(config.mode==='gtm'?!config.gtm:!config.ga4&&!config.meta&&!config.linkedin)return null;
 return <><script id="tracking-config" type="application/json" dangerouslySetInnerHTML={{__html:JSON.stringify(config).replace(/</g,'\\u003c')}}/><Script strategy="lazyOnload" src="/legacy/25-tracking.js"/></>;
}
