/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
  },
  images: {
    domains: ["openweathermap.org"],
  },
  transpilePackages: ["@mui/x-charts"],
};

module.exports = nextConfig;
