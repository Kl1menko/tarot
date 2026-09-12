import type { MetadataRoute } from "next";
import { site } from "@/data/content";

/**
 * Сайт односторінковий, тож у мапі один URL. Якірні секції (#courses, #faq…)
 * окремими записами не подаються — для пошукових систем це та сама сторінка.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
