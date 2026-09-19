import { ImageResponse } from 'next/og';
import { allRoutes } from '../../lib/content';
import { brand, pageTitle } from '../../lib/seo';
export const dynamic = 'force-static';
export async function GET(){
  const route='';
  return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',background:'#0B0B0D',color:'#F7F7F7',padding:72,fontFamily:'sans-serif'}}><div style={{display:'flex',color:'#C6F564',fontSize:26}}>MARKETING ET IA · {brand}</div><div style={{display:'flex',fontSize:64,lineHeight:1.12,letterSpacing:-2,maxWidth:1056}}>{pageTitle(route)}</div><div style={{display:'flex',fontSize:24,color:'#9B9B9B'}}>SEO · GEO · DONNÉES · AUTOMATISATION</div></div>,{width:1200,height:630});
}
