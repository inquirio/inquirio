/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{host: process.env.NEXT_PUBLIC_HOST}
}

module.exports = nextConfig
