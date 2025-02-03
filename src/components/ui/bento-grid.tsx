import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "grid w-full gap-4 auto-rows-[minmax(200px,auto)]",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }
);

BentoGrid.displayName = "BentoGrid";