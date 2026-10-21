import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { getLegalDocument } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { ADDRESS, EMAIL, PHONES, SITE, WHATSAPP_URL, mailtoLink, telLink } from "@/lib/site";
import { legalCopy } from "@/lib/site-copy";

export const metadata: Metadata = pageMetadata({
  title: legalCopy.privacy.title,
  description: legalCopy.privacy.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  const doc = getLegalDocument("privacy-policy");
  const intro = doc.parsed?.intro;
  const sections = doc.parsed?.sections ?? [];

  return (
    <LegalPage
      title={doc.title || legalCopy.privacy.title}
      breadcrumb={legalCopy.privacy.breadcrumb}
      lastUpdated={doc.lastUpdated}
      intro={
        intro ? (
          <p>{intro}</p>
        ) : (
          <p>
            We keep this simple: <strong className="text-white">this website uses no cookies, no analytics and no tracking.</strong>{" "}
            We only receive your details when you choose to message or call us. This notice explains what we collect, why,
            and your rights under the <strong className="text-white">Digital Personal Data Protection Act, 2023</strong> and
            the Information Technology Act, 2000.
          </p>
        )
      }
    >
      {sections.map((section) => {
        if (section.id === "who") {
          return (
            <LegalSection key={section.id} id={section.id} title={section.title}>
              <p>
                {SITE.name} (&ldquo;LIFE&rdquo;, &ldquo;we&rdquo;), run by {SITE.founder} ({SITE.founderAlias}),{" "}
                {ADDRESS.building}, {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.city}, {ADDRESS.region} - {ADDRESS.postalCode}.
                For the personal data described here, LIFE is the Data Fiduciary.
              </p>
            </LegalSection>
          );
        }

        if (section.id === "contact") {
          return (
            <LegalSection key={section.id} id={section.id} title={section.title}>
              <p>For any privacy question, request to exercise your rights, or grievance, contact our Grievance / Privacy contact:</p>
              <ul>
                <li>
                  <strong>Name:</strong> {SITE.founderAlias} ({SITE.founder}), Founder
                </li>
                <li>
                  <strong>Email:</strong> <a href={mailtoLink("Privacy / Grievance request")}>{EMAIL}</a>
                </li>
                <li>
                  <strong>Phone:</strong> <a href={telLink()}>{PHONES.primary.display}</a> (call or{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  )
                </li>
                <li>
                  <strong>Address:</strong> {ADDRESS.building}, {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.city} -{" "}
                  {ADDRESS.postalCode}
                </li>
              </ul>
              <p>We will respond as early as possible and within the time limits set by law.</p>
            </LegalSection>
          );
        }

        return (
          <LegalSection key={section.id} id={section.id} title={section.title}>
            {section.paragraphs?.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul>
                {section.bullets.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            )}
          </LegalSection>
        );
      })}
    </LegalPage>
  );
}
