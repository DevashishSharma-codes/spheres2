import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // These are sections of the landing page, so old links go there.
  redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/how-we-work", destination: "/#how-we-work", permanent: false },
      { source: "/industries", destination: "/#industries", permanent: false },
      { source: "/testimonials", destination: "/#testimonials", permanent: false },
      { source: "/portfolio", destination: "/case-studies", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
