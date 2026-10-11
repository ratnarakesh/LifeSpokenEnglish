export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-emerald-500/20 bg-linear-to-r from-emerald-600/25 via-cyan-600/20 to-emerald-600/25 text-center text-xs font-medium text-emerald-50 sm:text-sm">
      <p className="mx-auto max-w-7xl px-4 py-2">
        <span aria-hidden="true">🎉 </span>
        <span className="font-semibold">New Offline & Online Batches Starting Soon</span>
        <span className="mx-2 text-emerald-300/70" aria-hidden="true">•</span>
        <span>Attend First 10 Classes 100% Free</span>
        <span className="hidden sm:inline">
          <span className="mx-2 text-emerald-300/70" aria-hidden="true">•</span>
          Zero Upfront Payment
        </span>
      </p>
    </div>
  );
}
