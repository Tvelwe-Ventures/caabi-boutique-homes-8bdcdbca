import { cn } from "@/lib/utils";

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export function GradientCard({ children, className, variant = "light", ...props }: GradientCardProps) {
  return (
    <div
      className={cn(
        "w-full p-1.5 rounded-2xl relative isolate overflow-hidden transition-all duration-300",
        // Light mode styles
        "bg-white/90 dark:bg-black/40",
        "bg-gradient-to-br from-primary/5 to-primary/[0.02] dark:from-white/5 dark:to-white/[0.02]",
        "backdrop-blur-xl backdrop-saturate-[180%]",
        "border border-primary/10 dark:border-white/10",
        "shadow-[0_8px_16px_rgb(0_0_0_/_0.05)] dark:shadow-[0_8px_16px_rgb(0_0_0_/_0.25)]",
        "hover:shadow-lg hover:-translate-y-1",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full p-6 rounded-xl relative",
          "bg-gradient-to-br from-primary/[0.05] to-transparent dark:from-white/[0.08] dark:to-transparent",
          "backdrop-blur-md backdrop-saturate-150",
          "border border-primary/[0.05] dark:border-white/[0.08]",
          "text-gray-900 dark:text-white",
          "shadow-sm",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/[0.02] before:to-primary/[0.01] dark:before:from-white/[0.03] dark:before:to-white/[0.01] before:opacity-0 before:transition-opacity before:pointer-events-none",
          "hover:before:opacity-100"
        )}
      >
        {children}
      </div>
    </div>
  );
}