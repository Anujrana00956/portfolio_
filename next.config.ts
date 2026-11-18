import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/work", destination: "/#projects", permanent: false },
    ];
  },
};

export default nextConfig;
