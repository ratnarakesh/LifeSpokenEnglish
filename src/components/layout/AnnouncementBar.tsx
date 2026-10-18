import { announcementCopy } from "@/lib/site-copy";

const Dot = () => (
  <span className="mx-2 text-ember-300/70" aria-hidden="true">
    •
  </span>
);

export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-ember-500/20 bg-linear-to-r from-bark-800/90 via-ember-800/60 to-bark-800/90 text-center text-xs font-medium text-ember-50 sm:text-sm">
      <p className="mx-auto max-w-7xl px-4 py-2">
        <span aria-hidden="true">{announcementCopy.barPrefix} </span>
        <span className="font-semibold">
          {announcementCopy.barBatchNotice}
        </span>
        <span className="hidden min-[480px]:inline">
          <Dot />
        </span>
        <span className="block whitespace-nowrap min-[480px]:inline">{announcementCopy.barFreeNotice}</span>
        <span className="hidden md:inline">
          <Dot />
          {announcementCopy.barZeroPaymentNotice}
        </span>
      </p>
    </div>
  );
}

