import type { Metadata } from 'next';
import { origin, brand } from '../lib/seo';
import Header from '../components/Header';
import Tracking from '../components/Tracking';
import Footer from '../components/Footer';
import localFont from 'next/font/local';
const manrope = localFont({src:'../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',variable:'--font-manrope',display:'optional',weight:'200 800',adjustFontFallback:'Arial'});
import './globals.css';
export const metadata: Metadata = {metadataBase:new URL(origin),title:{default:brand,template:'%s | '+brand},robots:{index:false,follow:true},verification:{google:process.env.GOOGLE_SITE_VERIFICATION}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr" className={manrope.variable} suppressHydrationWarning><head><link rel="describedby" href="/llms.txt"/></head><body suppressHydrationWarning><Header/>{children}<Footer/><Tracking/></body></html>}
