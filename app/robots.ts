import type { MetadataRoute } from 'next';
import { publicOrigin, hasOrganization } from '../lib/seo';
export const dynamic = 'force-static';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/'},...(publicOrigin && hasOrganization && process.env.SITE_INDEXING==='true'?{sitemap:publicOrigin+'/sitemap.xml'}:{})}}
