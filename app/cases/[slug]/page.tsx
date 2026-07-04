import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASES } from "@/data/cases";
import CaseStudyClient from "@/components/CaseStudyClient";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return CASES.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseItem = CASES.find((c) => c.slug === params.slug);
  if (!caseItem) return {};

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";
  const canonicalUrl = `${SITE_URL}/cases/${caseItem.slug}`;
  const ogImageUrl = `${SITE_URL}${caseItem.bannerPath}`;

  return {
    title: caseItem.seoTitle,
    description: caseItem.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: caseItem.seoTitle,
      description: caseItem.seoDescription,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: caseItem.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: caseItem.seoTitle,
      description: caseItem.seoDescription,
      images: [ogImageUrl],
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const caseItem = CASES.find((c) => c.slug === params.slug);
  if (!caseItem) {
    notFound();
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.agency-hella.site";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Проєкти",
        item: `${SITE_URL}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseItem.title,
        item: `${SITE_URL}/cases/${caseItem.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CaseStudyClient caseItem={caseItem} />
    </>
  );
}
