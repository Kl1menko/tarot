import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Роути прийому заявок і чекауту індексувати нема чого.
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
