import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import SEOPageLayout from "@/components/SEOPageLayout";

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug("stvorennya-saitiv-bila-tserkva");
  if (!service) return {};

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";
  const canonicalUrl = `${SITE_URL}/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

export default function ServicePage() {
  const service = getServiceBySlug("stvorennya-saitiv-bila-tserkva");
  if (!service) {
    notFound();
  }

  return <SEOPageLayout service={service} />;
}
