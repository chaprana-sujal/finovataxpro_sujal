/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  /* experimental: {
     // Allow local network requests to suppress warnings
     allowedDevOrigins: [
       '100.113.168.112:3000', 
       'localhost:3000'
     ],
  }, */
}

module.exports = nextConfig