import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-config";

const lastContentUpdate = new Date("2026-08-23T00:00:00-04:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return [
    {
      url: baseUrl.toString(),
      lastModified: lastContentUpdate,
      changeFrequency: "monthly",
      priority: 1,
      images: [new URL("/images/jipa-fachada.webp", baseUrl).toString()],
    },
    {
      url: new URL("/politica-de-privacidade", baseUrl).toString(),
      lastModified: lastContentUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

