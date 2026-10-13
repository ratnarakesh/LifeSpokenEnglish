import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { ADDRESS, EMAIL, PHONES, SITE, WHATSAPP_URL, mailtoLink, telLink } from "@/lib/site";

const description =
  "How LIFE Spoken English & Soft Skills Institute handles your personal data: no cookies, no tracking, enquiries only via WhatsApp, and your rights under India's Digital Personal Data Protection Act, 2023.";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy & Data Notice", description, path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy & Data Notice"
      breadcrumb="Privacy Policy"
      intro={
        <p>
          We keep this simple: <strong className="text-white">this website uses no cookies, no analytics and no tracking.</strong>{" "}
          We only receive your details when you choose to message or call us. This notice explains what we collect, why,
          and your rights under the <strong className="text-white">Digital Personal Data Protection Act, 2023</strong> and
          the Information Technology Act, 2000.
        </p>
      }
    >
      <LegalSection id="who" title="1. Who we are">
        <p>
          {SITE.name} (&ldquo;LIFE&rdquo;, &ldquo;we&rdquo;), run by {SITE.founder} ({SITE.founderAlias}),{" "}
          {ADDRESS.building}, {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.city}, {ADDRESS.region} - {ADDRESS.postalCode}.
          For the personal data described here, LIFE is the Data Fiduciary.
        </p>
      </LegalSection>

      <LegalSection id="collect" title="2. What we collect, and when">
        <ul>
          <li>
            <strong>Booking form:</strong> your name, mobile number, learner category, course of interest and preferred
            mode. The form does not send or store anything on our website. When you tap &ldquo;Register&rdquo;, it opens
            WhatsApp with a ready-made message, and we receive it only if you press send.
          </li>
          <li>
            <strong>Calls and WhatsApp messages</strong> you send us directly, and anything you choose to share in them.
          </li>
          <li>
            <strong>Enrolled learners:</strong> the details needed to run your classes, such as name, contact number,
            batch and attendance.
          </li>
        </ul>
        <p>We do not collect passwords, payment card details, health information or any other sensitive data on this website.</p>
      </LegalSection>

      <LegalSection id="purpose" title="3. Why we use it">
        <ul>
          <li>To reply to your enquiry and arrange your 10 free trial classes.</li>
          <li>To share batch timings, schedule backup sessions and run your course.</li>
          <li>To keep basic records required by law.</li>
        </ul>
        <p>
          We never sell your data, never add you to advertising lists, and do not share it with anyone except where the
          law requires.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="4. Cookies and tracking">
        <p>
          <strong>This website sets no cookies</strong> and uses no analytics, advertising pixels, fingerprinting or
          session recording. Because of this, there is no cookie banner to accept.
        </p>
        <p>
          To open instantly and work offline, your browser keeps a copy of the website&apos;s own files (pages, images,
          styles) using its standard cache and a service worker. These files contain no personal information, and you can
          clear them at any time from your browser settings.
        </p>
      </LegalSection>

      <LegalSection id="third-party" title="5. Third-party services (only when you choose)">
        <ul>
          <li>
            <strong>WhatsApp</strong> (Meta): used when you tap a WhatsApp button. WhatsApp&apos;s own privacy policy
            applies to messages you send.
          </li>
          <li>
            <strong>YouTube</strong> (Google): videos load from the privacy-enhanced youtube-nocookie.com player, and
            only after you press play.
          </li>
          <li>
            <strong>Google Maps</strong>: the map loads only when you tap &ldquo;Load interactive map&rdquo; or open
            Google Maps.
          </li>
          <li>
            <strong>Instagram and YouTube channel links</strong> open those platforms, where their policies apply.
          </li>
        </ul>
        <p>Until you use one of these, your browser does not contact these services from our website.</p>
      </LegalSection>

      <LegalSection id="children" title="6. Learners under 18">
        <p>
          LIFE welcomes school students. If the learner is under 18, the enquiry should be made by a parent or legal
          guardian, or with their permission. Before enrolling a minor, we confirm consent directly with the parent or
          guardian, as required by the Digital Personal Data Protection Act, 2023. We do not use children&apos;s data for
          tracking, profiling or advertising.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="7. How long we keep it">
        <p>
          Enquiry details are kept only as long as needed to answer you and, if you join, for the duration of your course
          and any records the law requires. You can ask us to delete your details at any time.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="8. Your rights">
        <p>Under the Digital Personal Data Protection Act, 2023, you can:</p>
        <ul>
          <li>ask what personal data we hold about you and how we use it;</li>
          <li>ask us to correct, complete, update or erase it;</li>
          <li>withdraw your consent at any time (this does not affect anything done before);</li>
          <li>nominate another person to exercise these rights for you;</li>
          <li>raise a grievance with us, and if you are not satisfied, complain to the Data Protection Board of India.</li>
        </ul>
      </LegalSection>

      <LegalSection id="contact" title="9. Contact and grievances">
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

      <LegalSection id="security" title="10. Security and changes">
        <p>
          The website is served securely over HTTPS and stores no personal data on its servers. Records we keep are
          protected with reasonable security safeguards. If this notice changes, we will update the date above. See also
          our <Link href="/terms">Terms of Use</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
