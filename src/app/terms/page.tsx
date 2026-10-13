import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { BATCH_POLICY } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PHONES, SITE, TIMINGS, telLink } from "@/lib/site";

const description =
  "Terms of use for the LIFE Spoken English & Soft Skills Institute website, and how our free trial, monthly fees, batches and backup sessions work.";

export const metadata: Metadata = pageMetadata({ title: "Terms of Use & Class Policies", description, path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use & Class Policies"
      breadcrumb="Terms of Use"
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

      <LegalSection id="classes" title="3. Batches, timings and backup sessions">
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

      <LegalSection id="results" title="4. Learning outcomes">
        <p>
          We give every learner live practice, personal correction and full support. Progress in speaking also depends on
          each learner&apos;s attendance and practice, so specific results such as interview selection cannot be
          guaranteed.
        </p>
      </LegalSection>

      <LegalSection id="content" title="5. Our content">
        <p>
          The LIFE name and logo, the {BATCH_POLICY.booklet.title}, class material and videos belong to LIFE. Please do
          not copy or reuse them commercially without permission. Sharing links to our pages and videos is always
          welcome.
        </p>
      </LegalSection>

      <LegalSection id="links" title="6. Other websites">
        <p>
          Links to WhatsApp, YouTube, Instagram and Google Maps take you to services run by other companies under their
          own terms and privacy policies.
        </p>
      </LegalSection>

      <LegalSection id="law" title="7. Governing law and contact">
        <p>
          These terms are governed by the laws of India. For any question or concern, contact {SITE.founderAlias} on{" "}
          <a href={telLink()}>{PHONES.primary.display}</a>. See our <Link href="/privacy">Privacy Policy</Link> for how we
          handle personal data.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
