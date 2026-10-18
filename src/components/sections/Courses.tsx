import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { getCourseTracks } from "@/lib/cms";
import { courseCopy } from "@/lib/site-copy";
import { CourseTabs } from "./CourseTabs";

export function Courses() {
  const tracks = getCourseTracks();

  return (
    <section id="courses" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={courseCopy.sectionHeading.eyebrow}
          title={
            <>
              {courseCopy.sectionHeading.titleLead}{" "}
              <GradientText>{courseCopy.sectionHeading.titleGradient}</GradientText>
            </>
          }
          description={courseCopy.sectionHeading.description}
        />
        <CourseTabs tracks={tracks} />
      </div>
    </section>
  );
}

