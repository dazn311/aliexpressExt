/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  env:{
    BASE_URL:process.env.BASE_URL,
    X_RapidAPI_Key:process.env.X_RapidAPI_Key,
    X_rapidapi_host:process.env.X_rapidapi_host,
    DEFAULT_PAGE:process.env.DEFAULT_PAGE,
  },
  experimental: {
    serverActions: {
      // edit: updated to new key. Was previously `allowedForwardedHosts`
      allowedOrigins: ['dazreact.ru','localhost:3000'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ae-pic-a1.aliexpress-media.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
