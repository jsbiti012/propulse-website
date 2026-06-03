import type { MetadataRoute } from "next";

/**
 * robots.txt : on autorise tout le site à être exploré et on indique où se
 * trouve le sitemap, pour que Google le découvre automatiquement.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://propulse.ma/sitemap.xml",
    host: "https://propulse.ma",
  };
}
