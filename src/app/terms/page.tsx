import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { BATCH_POLICY } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { EMAIL, PHONES, SITE, TIMINGS, mailtoLink, telLink } from "@/lib/site";
import { legalCopy } from "@/lib/site-copy";

export const metadata: Metadata = pageMetadata({
  title: legalCopy.terms.title,
  description: legalCopy.terms.description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title={legalCopy.terms.title}
      breadcrumb={legalCopy.terms.breadcrumb}
      intro={
        <p>
          By using this website you agree to these terms. They also summarise how classes at {SITE.name} work, so there
          are no surprises.
        </p>
      }
    >
      <LegalSection id="website" title="1. Using this website">
        <p>
          This website gives information about LIFE&apos;s courses and lets you contact us. Please use it lawfully and do
          not attempt to disrupt it or misuse its content.
        </p>
      </LegalSection>

      <LegalSection id="information" title="2. Course information and fees">
        <p>
          We keep course details, timings and fees accurate and up to date, but they may change. The details confirmed by
          {` ${SITE.founderAlias} `}on call or WhatsApp at the time you join apply.
        </p>
        <ul>
          <li>
            <strong>10-Class Free Trial:</strong> 10 live sessions with no fee and no advance payment. You may stop at any
            time during the trial.
          </li>
          <li>
            <strong>Regular Batch:</strong> ₹3,000 for the first month, then ₹2,000 per month, paid month by month.
          </li>
          <li>
            <strong>1-on-1 Personal Mentorship:</strong> ₹10,000 per month.
          </li>
          <li>{BATCH_POLICY.customRequest}</li>
        </ul>
        <p>For any question about fees, payments or refunds, please speak to {SITE.founderAlias} directly before paying.</p>
      </LegalSection>

      <LegalSection id="refunds" title="3. Refund policy">
        <p>
          10-Class Free Trial allows 100% risk-free evaluation. Once a monthly batch fee is paid, fees are non-refundable
          for that active calendar month due to the strict 15 - 20 student seat limit. Batch pauses or transfers for
          genuine emergencies may be granted at Mani&nbsp;Sir&apos;s sole discretion.
        </p>
      </LegalSection>

      <LegalSection id="classes" title="4. Batches, timings and backup sessions">
        <ul>
          <li>{BATCH_POLICY.capacity}</li>
          <li>
            Classes run {TIMINGS.weekdays}, {TIMINGS.weekdayDetail}. {TIMINGS.weekend}: {TIMINGS.weekendDetail.toLowerCase()}.
          </li>
          <li>
            Students who miss weekday sessions can take personalized on-demand makeup classes on Saturday and Sunday,
            arranged directly with {SITE.founderAlias}.
          </li>
          <li>Learners under 18 join with the consent of a parent or legal guardian.</li>
        </ul>
      </LegalSection>

      <LegalSection id="results" title="5. Outcome disclaimer">
        <p>
          LIFE Spoken English provides practical spoken communication and soft skills mentorship. We do not offer or
          guarantee job placements, employment contracts, or academic degrees. Individual fluency outcomes depend
          entirely on learner practice, attendance, and commitment.
        </p>
      </LegalSection>

      <LegalSection id="content" title="6. Our content">
        <p>
          The LIFE name and logo, the {BATCH_POLICY.booklet.title}, class material and videos belong to LIFE. Please do
          not copy or reuse them commercially without permission. Sharing links to our pages and videos is always
          welcome.
        </p>
      </LegalSection>

      <LegalSection id="links" title="7. Other websites">
        <p>
          Links to WhatsApp, YouTube, Instagram and Google Maps take you to services run by other companies under their
          own terms and privacy policies.
        </p>
      </LegalSection>

      <LegalSection id="law" title="8. Governing law and contact">
        <p>
          These terms are governed by the laws of India. For any question, concern or grievance, contact{" "}
          {SITE.founderAlias} at <a href={mailtoLink("Question about LIFE terms")}>{EMAIL}</a> or on{" "}
          <a href={telLink()}>{PHONES.primary.display}</a>. See our <Link href="/privacy">Privacy Policy</Link> for how we
          handle personal data.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
