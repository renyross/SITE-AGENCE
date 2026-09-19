import { faqsFor, schemaFor } from '../lib/seo';
export function StructuredData({route}:{route:string}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schemaFor(route)).replace(/</g,'\\u003c')}}/>}
export function FAQ({route}:{route:string}){const faqs=faqsFor(route);return faqs.length ? <section className="page-section page-faq" aria-labelledby="faq-title"><h2 id="faq-title">Questions fréquentes</h2>{faqs.map(f=><details key={f.question}><summary>{f.question}</summary><p>{f.answer}</p></details>)}</section> : null}
