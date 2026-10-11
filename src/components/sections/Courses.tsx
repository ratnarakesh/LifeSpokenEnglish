import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { CourseTabs } from "./CourseTabs";

export function Courses() {
  return (
    <section id="courses" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Course Tracks"
          title={
            <>
              Three clear paths. <GradientText>One fluent you.</GradientText>
            </>
          }
          description="Start where you are today. Every track is taught live, with practical, situation-based speaking drills."
        />
        <CourseTabs />
      </div>
    </section>
  );
}
