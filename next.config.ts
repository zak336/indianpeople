import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"picsum.photos"
      },
      {
        protocol: "https",
        hostname:"images.openai"
      },
      {
        protocol:"https",
        hostname:"png.pngtree",
      },
      {
        protocol:"https",
        hostname:"img.freepik"
      }
    ],
  },
};

export default nextConfig;
