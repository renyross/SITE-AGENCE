import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allRoutes } from '../../lib/content';
import { metadataFor } from '../../lib/seo';
import { StructuredData } from '../../components/SEO';
import ContentPage from '../../components/ContentPages';
type Props={params:Promise<{slug:string[]}>};
export function generateStaticParams(){return allRoutes.map(route=>({slug:route.split('/')}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const route=(await params).slug.join('/');if(!allRoutes.includes(route))return {title:'Page not found',robots:{index:false,follow:false}};return metadataFor(route)}
export default async function Page({params}:Props){const route=(await params).slug.join('/');if(!allRoutes.includes(route))notFound();return <><StructuredData route={route}/><ContentPage route={route} search={{}}/></>}
