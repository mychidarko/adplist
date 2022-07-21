/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DYTE_API_URL: process.env.DYTE_API_URL,
    DYTE_API_KEY: process.env.DYTE_API_KEY,
    DYTE_ORG_ID: process.env.DYTE_ORG_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  },
};

module.exports = nextConfig
