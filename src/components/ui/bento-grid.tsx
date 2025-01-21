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
        className
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            "linear-gradient(to right, rgba(162, 176, 220, 0.1), transparent)",
            "linear-gradient(to left, rgba(162, 176, 220, 0.1), transparent)",
            "linear-gradient(to right, rgba(162, 176, 220, 0.1), transparent)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative z-10 p-8">
        {Icon && (
          <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary-light" />
          </div>
        )}
        <h3 className="mb-2 font-semibold leading-none tracking-tight text-xl text-white animated-gradient-text">
          {name}
        </h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <motion.div
        className="absolute inset-0 border border-primary/20"
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(162, 176, 220, 0.2), transparent)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}