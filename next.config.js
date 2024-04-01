/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "picsum.photos",
      "https://www.google.com/",
      "products.ls.graphics",
    ],
  },
  target: 'serverless',
};

module.exports = nextConfig;
