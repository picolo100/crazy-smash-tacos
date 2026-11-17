import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crazy Smash & Tacos",
    short_name: "CRAZY",
    description: "Smash burgers & tacos 100 % halal à Bourg-en-Bresse",
    start_url: "/",
    display: "browser",
    background_color: "#fff4e6",
    theme_color: "#e3121b",
    lang: "fr-FR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
