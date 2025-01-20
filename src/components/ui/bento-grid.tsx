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
        "grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8",
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
  cta?: string;
  background?: React.ReactNode;
  className?: string;
}

export function BentoCard({
  Icon,
  name,
  description,
  className,
  background,
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all hover:shadow-xl",
        className
      )}
    >
      <div className="relative z-10">
        {Icon && (
          <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <h3 className="mb-2 font-semibold leading-none tracking-tight text-xl">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {background && (
        <div className="pointer-events-none absolute inset-0 z-0">{background}</div>
      )}
    </motion.div>
  );
}