import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { button } from "@/lib/cn";
import { telLink, whatsappLink } from "@/lib/site";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800/80 bg-obsidian-950/85 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={telLink()} className={button("secondary", "md", "py-3")}>
          <Phone className="size-4 text-emerald-400" />
          Call Mani Sir
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={button("whatsapp", "md", "py-3")}>
          <WhatsAppIcon className="size-4" />
          WhatsApp 10 Days Free
        </a>
      </div>
    </div>
  );
}
