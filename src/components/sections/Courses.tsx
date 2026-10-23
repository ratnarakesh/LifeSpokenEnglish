import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { getCourseTracks, getSiteSettings } from "@/lib/cms";
import { courseCopy } from "@/lib/site-copy";
import { CourseTabs } from "./CourseTabs";

export function Courses() {
  const tracks = getCourseTracks();
  const settings = getSiteSettings();

  const titleNode = settings.coursesSectionTitle ? (
    settings.coursesSectionTitle
  ) : (
    <>
      {courseCopy.sectionHeading.titleLead}{" "}
      <GradientText>{courseCopy.sectionHeading.titleGradient}</GradientText>
    </>
  );

  return (
    <section id="courses" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={courseCopy.sectionHeading.eyebrow}
          title={titleNode}
          description={settings.coursesSectionSubtitle || courseCopy.sectionHeading.description}
        />
        <CourseTabs tracks={tracks} />
      </div>
    </section>
  );
}

