import * as React from "react";
import { cn } from "@/lib/utils";

interface FeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function FeyButton({ className, children, ...props }: FeyButtonProps) {
  return (
    <button
      className={cn(
        "group relative flex items-center justify-center gap-1",
        "h-10 min-w-[136px] whitespace-nowrap rounded-[28px] px-4 py-2",
        "text-sm font-semibold leading-tight",
        "text-white",
        "bg-[#8798CE]",
        "shadow-sm",
        "border border-white/20",
        "[box-shadow:inset_0_0_0_0.5px_rgba(255,255,255,0.2)]",
        "after:absolute after:inset-0 after:rounded-[28px] after:opacity-0 after:transition-opacity after:duration-200",
        "after:bg-[radial-gradient(61.35%_50.07%_at_48.58%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%)]",
        "hover:after:opacity-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1">
        {children}
      </span>
    </button>
  );
}