/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // This folder is the project root. Without it, a stray package-lock.json in
  // the home folder makes Next.js guess the wrong workspace root (build warning).
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig