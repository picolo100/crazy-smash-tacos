import type { NextConfig } from "next";

/**
 * Export statique : le site est servi tel quel par Cloudflare Pages (dossier `out`).
 * Les images sont pré-optimisées par `npm run images` (AVIF/WebP responsive),
 * d'où l'absence de l'optimiseur d'images de Next (indisponible en export statique).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
