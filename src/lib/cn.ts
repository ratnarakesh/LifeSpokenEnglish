export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:opacity-60",
  primary:
    "bg-linear-to-r from-emerald-500 to-cyan-500 text-obsidian-950 shadow-[0_10px_40px_-10px_rgb(16_185_129/0.6)] hover:shadow-[0_14px_50px_-10px_rgb(6_182_212/0.7)] hover:brightness-110",
  secondary:
    "glass text-white hover:border-emerald-500/50 hover:bg-slate-800/60",
  whatsapp: "bg-[#25D366] text-obsidian-950 hover:brightness-110",
  size: {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  },
} as const;

export function button(
  variant: "primary" | "secondary" | "whatsapp" = "primary",
  size: keyof typeof buttonStyles.size = "md",
  className?: string,
) {
  return cn(buttonStyles.base, buttonStyles[variant], buttonStyles.size[size], className);
}
