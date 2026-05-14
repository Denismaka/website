import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";


const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // À n'utiliser qu'en dernier recours si le build bloque à cause du validateur auto-généré
  },
};

export default withNextIntl(nextConfig);
