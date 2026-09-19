import Script from 'next/script';
import { metadataFor } from '../lib/seo';
import { StructuredData } from '../components/SEO';
export const metadata = metadataFor('');
import home from '../content/home.json';
import stats from '../content/stats.json';
export default function Home(){return <><StructuredData route=""/><main id="content" tabIndex={-1} dangerouslySetInnerHTML={{__html:home.html}}/><script id="problem-stat-data" type="application/json" dangerouslySetInnerHTML={{__html:JSON.stringify(stats).replace(/</g,'\\u003c')}}/><Script strategy="lazyOnload" src="/legacy/home-stats.js"/><Script strategy="lazyOnload" src="/legacy/09-calculator.js"/><Script strategy="lazyOnload" src="/legacy/24-motion.js"/></>}
