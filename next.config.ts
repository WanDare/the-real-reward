/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "the-real-reward";

const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
