import { CalendarClock, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText, SectionHeading } from "@/components/ui/SectionHeading";
import { button } from "@/lib/cn";
import { ADDRESS, DEFAULT_WA_MESSAGE, LINKS, PHONES, SITE, TIMINGS, telLink, whatsappLink } from "@/lib/site";

const ONLINE_WA_MESSAGE =
  "Hello, I am interested in the Live Online Spoken English batch at LIFE. Please share the details.";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Location & Contact"
          title={
            <>
              Visit us in <GradientText>Madhurawada, Vizag.</GradientText>
            </>
          }
          description="Drop by the centre for a chat, or call to reserve your free trial seat in the next batch."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="grid gap-6 lg:col-span-2">
            <Reveal>
              <GlowCard className="p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ember-500/10 text-ember-300 ring-1 ring-ember-500/30">
                    <MapPin className="size-5" />
                  </span>
                  <address className="text-sm leading-relaxed text-stone-300 not-italic">
                    <strong className="block text-base text-white">{SITE.name}</strong>
                    {ADDRESS.building}, {ADDRESS.street}
                    <br />
                    <span className="text-stone-400">({ADDRESS.landmark})</span>
                    <br />
                    {ADDRESS.locality}, {ADDRESS.city}, {ADDRESS.region} - {ADDRESS.postalCode}
                  </address>
                </div>
                <a
                  href={LINKS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={button("secondary", "sm", "mt-5")}
                >
                  <Navigation className="size-4 text-ember-400" /> Get Directions
                </a>
              </GlowCard>
            </Reveal>

            <Reveal delay={0.08}>
              <GlowCard className="space-y-5 p-5 sm:p-7">
                <ContactRow
                  label="Offline Batches & Mani Sir Direct"
                  phone={PHONES.primary}
                  waMessage={DEFAULT_WA_MESSAGE}
                />
                <div className="border-t border-stone-800" />
                <ContactRow label="Online Batches Desk" phone={PHONES.online} waMessage={ONLINE_WA_MESSAGE} />
              </GlowCard>
            </Reveal>

            <Reveal delay={0.16}>
              <GlowCard className="p-7">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30">
                    <Clock className="size-5" />
                  </span>
                  <div className="text-sm">
                    <p className="text-base font-semibold text-white">Class Timings</p>
                    <p className="mt-1 text-stone-300">
                      <span className="font-medium text-white">{TIMINGS.weekdays}:</span> {TIMINGS.weekdayDetail}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-stone-400">
                      <CalendarClock className="size-4 text-amber-400" /> {TIMINGS.saturday}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="glass relative h-full min-h-[22rem] overflow-hidden rounded-3xl p-2">
              <iframe
                src={LINKS.mapEmbed}
                title="Map showing LIFE Spoken English Institute in Madhurawada, Visakhapatnam"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full min-h-[22rem] rounded-2xl border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)_brightness(0.95)]"
                allowFullScreen
              />
              <a
                href={LINKS.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className={button("primary", "sm", "absolute right-5 bottom-5")}
              >
                <MapPin className="size-4" /> Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type ContactRowProps = {
  label: string;
  phone: { display: string; e164: string; wa: string };
  waMessage: string;
};

function ContactRow({ label, phone, waMessage }: ContactRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sun-500/10 text-sun-300 ring-1 ring-sun-500/30">
          <Phone className="size-5" />
        </span>
        <div>
          <p className="text-xs text-stone-400">{label}</p>
          <a
            href={telLink(phone.e164)}
            className="text-base font-bold whitespace-nowrap text-white hover:text-ember-300 min-[400px]:text-lg"
          >
            {phone.display}
          </a>
        </div>
      </div>
      <a
        href={whatsappLink(waMessage, phone.wa)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${phone.display}`}
        className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366] ring-1 ring-[#25D366]/40 transition hover:bg-[#25D366]/25"
      >
        <WhatsAppIcon className="size-5" />
      </a>
    </div>
  );
}
