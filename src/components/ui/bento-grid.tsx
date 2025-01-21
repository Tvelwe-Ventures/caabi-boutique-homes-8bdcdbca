import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  Icon?: React.ElementType;
  name: string;
  description: string;
  href?: string;
  className?: string;
}

export function BentoCard({
  Icon,
  name,
  description,
  className,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10",
        "backdrop-blur-xl transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 p-8">
        {Icon && (
          <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary-light" />
          </div>
        )}
        <h3 className="mb-2 font-semibold leading-none tracking-tight text-xl text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}