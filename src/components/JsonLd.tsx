import { COURSES } from "@/lib/content";
import { ADDRESS, LINKS, PHONES, SITE, VIDEO_ID } from "@/lib/site";

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
    ...(SITE.url && {
      url: SITE.url,
      logo: `${SITE.url}/brand/life-logo.png`,
      image: `${SITE.url}/brand/og-image.png`,
    }),
    slogan: "Live It For Eternity",
    foundingDate: "2018",
    foundingLocation: { "@type": "Place", name: "Madhurawada, Visakhapatnam, Andhra Pradesh, India" },
    telephone: PHONES.primary.e164,
    priceRange: "₹2,000 - ₹10,000 per month",
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
    founder: {
      "@type": "Person",
      name: SITE.founder,
      alternateName: SITE.founderAlias,
      jobTitle: "Founder, Director & Lead Trainer",
      ...(SITE.url && { image: `${SITE.url}/media/people/mani-sir-portrait.webp`, url: `${SITE.url}/about` }),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONES.primary.e164,
        contactType: "admissions",
        description: "Mani Sir direct: offline and online batches",
        availableLanguage: ["English", "Telugu"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "06:00",
        closes: "22:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating.value,
      bestRating: "5",
      reviewCount: SITE.rating.count,
    },
    sameAs: [LINKS.youtube, LINKS.instagram],
    subjectOf: {
      "@type": "VideoObject",
      name: "LIFE Spoken English: Official Orientation by Mani Sir",
      description: "Mani Sir explains how LIFE Spoken English & Soft Skills classes work.",
      embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`,
      thumbnailUrl: `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`,
      uploadDate: "2025-01-28T04:48:12-08:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spoken English & Soft Skills Courses",
      itemListElement: COURSES.map((course) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: `${course.name}: Spoken English`,
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
