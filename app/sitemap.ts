import type { MetadataRoute } from "next";
import { CASES } from "@/data/cases";
import { SERVICES } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";

  // Base home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Service pages sitemaps
  SERVICES.forEach((service) => {
    routes.push({
      url: `${SITE_URL}/${service.slug}`,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Case study pages sitemaps
  CASES.forEach((caseItem) => {
    routes.push({
      url: `${SITE_URL}/cases/${caseItem.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return routes;
}
