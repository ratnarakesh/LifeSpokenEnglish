import { COURSES } from "@/lib/content";
import { ADDRESS, LINKS, PHONES, SITE } from "@/lib/site";

export function JsonLd() {
  const orgId = `${SITE.url ?? ""}/#organization`;
  const data = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": orgId,
    name: SITE.name,
    alternateName: ["LIFE Spoken English", "English by Mani Sir"],
    description:
      "Spoken English & Soft Skills training institute in Madhurawada, Visakhapatnam offering live offline and online batches with 10 free trial classes.",
    ...(SITE.url && { url: SITE.url }),
    telephone: PHONES.primary.e164,
    priceRange: "₹2,000 – ₹10,000 per month",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ADDRESS.building}, ${ADDRESS.street}, ${ADDRESS.landmark}`,
      addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    areaServed: [
      { "@type": "City", name: "Visakhapatnam" },
      { "@type": "Place", name: "Madhurawada" },
    ],
    hasMap: LINKS.googleMaps,
    founder: { "@type": "Person", name: SITE.founder, alternateName: SITE.founderAlias },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONES.primary.e164,
        contactType: "admissions",
        description: "Offline batches & Mani Sir direct",
        availableLanguage: ["English", "Telugu"],
      },
      {
        "@type": "ContactPoint",
        telephone: PHONES.online.e164,
        contactType: "customer support",
        description: "Online batches desk",
        availableLanguage: ["English", "Telugu"],
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      bestRating: "5",
      reviewCount: SITE.rating.count,
    },
    sameAs: [LINKS.youtube, LINKS.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spoken English & Soft Skills Courses",
      itemListElement: COURSES.map((course) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: `${course.name} – Spoken English`,
          description: `${course.tagline} Ideal for: ${course.audience} Focus: ${course.focus.join(", ")}.`,
          timeRequired: course.duration,
          provider: { "@id": orgId },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
