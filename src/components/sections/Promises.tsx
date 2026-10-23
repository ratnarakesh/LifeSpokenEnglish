import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { getPromises, getSiteSettings } from "@/lib/cms";
import { PROMISES as FALLBACK_PROMISES } from "@/lib/content";
import { storyCopy } from "@/lib/site-copy";

export function Promises() {
  const dynamicPromises = getPromises();
  const settings = getSiteSettings();
  const promises = dynamicPromises.map((p, i) => {
    const fallback = FALLBACK_PROMISES[i % FALLBACK_PROMISES.length];
    return {
      title: p.title || fallback.title,
      description: p.description || fallback.description,
      icon: fallback.icon,
    };
  });

  const titleNode = settings.promisesSectionTitle ? (
    settings.promisesSectionTitle
  ) : (
    <>
      {storyCopy.promisesHeading.titleLead}{" "}
      <GradientText>{storyCopy.promisesHeading.titleGradient}</GradientText>
    </>
  );

  return (
    <section id="promises" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-mesh opacity-70" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={storyCopy.promisesHeading.eyebrow}
          title={titleNode}
          description={settings.promisesSectionSubtitle || storyCopy.promisesHeading.description}
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {promises.map(({ icon: Icon, title, description }, i) => (
            <li key={title} className={i >= 9 ? "lg:col-start-2 xl:col-start-auto" : undefined}>
              <Reveal delay={(i % 5) * 0.06} className="h-full">
                <GlowCard className="group flex h-full flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-ember-500/20 to-sun-500/10 text-ember-300 ring-1 ring-ember-500/30 transition duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-600 transition group-hover:text-ember-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base leading-snug font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">{description}</p>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
