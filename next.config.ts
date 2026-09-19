import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/SITE-AGENCE' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/SITE-AGENCE/' : '',
};
export default config;

