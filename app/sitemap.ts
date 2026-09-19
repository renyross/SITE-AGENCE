import type { MetadataRoute } from 'next';
import { allRoutes } from '../lib/content';
import { canIndex, absolute, pathFor } from '../lib/seo';
export const dynamic = 'force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['',...allRoutes].filter(canIndex).map(route=>({url:absolute(pathFor(route))}))}
