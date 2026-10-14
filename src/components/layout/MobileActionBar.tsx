import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { buttonStyles, cn } from "@/lib/cn";
import { telLink, whatsappLink } from "@/lib/site";

const base = cn(buttonStyles.base, "gap-1.5 px-3 py-3 text-[13px] leading-tight min-[400px]:text-sm");

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-800/80 bg-obsidian-950/85 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <a href={telLink()} className={cn(base, buttonStyles.secondary, "whitespace-nowrap")}>
          <Phone className="size-4 shrink-0 text-ember-400" />
          Call Mani&nbsp;Sir
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(base, buttonStyles.whatsapp, "text-center")}
        >
          <WhatsAppIcon className="size-4 shrink-0" />
          WhatsApp 10 Days Free
        </a>
      </div>
    </div>
  );
}
