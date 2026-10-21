import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { getLegalDocument } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { EMAIL, PHONES, SITE, mailtoLink, telLink } from "@/lib/site";
import { legalCopy } from "@/lib/site-copy";

export const metadata: Metadata = pageMetadata({
  title: legalCopy.terms.title,
  description: legalCopy.terms.description,
  path: "/terms",
});

export default function TermsPage() {
  const doc = getLegalDocument("terms-of-use");
  const intro = doc.parsed?.intro;
  const sections = doc.parsed?.sections ?? [];

  return (
    <LegalPage
      title={doc.title || legalCopy.terms.title}
      breadcrumb={legalCopy.terms.breadcrumb}
      lastUpdated={doc.lastUpdated}
      intro={
        intro ? (
          <p>{intro}</p>
        ) : (
          <p>
            By using this website you agree to these terms. They also summarise how classes at {SITE.name} work, so there
            are no surprises.
          </p>
        )
      }
    >
      {sections.map((section) => {
        if (section.id === "law") {
          return (
            <LegalSection key={section.id} id={section.id} title={section.title}>
              <p>
                These terms are governed by the laws of India. For any question, concern or grievance, contact{" "}
                {SITE.founderAlias} at <a href={mailtoLink("Question about LIFE terms")}>{EMAIL}</a> or on{" "}
                <a href={telLink()}>{PHONES.primary.display}</a>. See our <Link href="/privacy">Privacy Policy</Link> for how we
                handle personal data.
              </p>
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
