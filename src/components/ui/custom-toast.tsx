"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface CustomToastProps extends React.ComponentProps<typeof Toast> {
  children: React.ReactNode;
}

export const CustomToast = React.forwardRef<HTMLDivElement, CustomToastProps>(
  ({ className, children, ...props }, ref) => {
    const animations = {
      initial: { scale: 0.8, opacity: 0, y: 10 },
      animate: { scale: 1, opacity: 1, y: 0 },
      exit: { scale: 0.8, opacity: 0, y: 10 },
    };

    return (
      <motion.div
        ref={ref}
        initial={animations.initial}
        animate={animations.animate}
        exit={animations.exit}
        transition={{ type: "spring", stiffness: 350, damping: 40 }}
        className={cn("relative", className)}
      >
        <Toast {...props}>{children}</Toast>
      </motion.div>
    );
  }
);

CustomToast.displayName = "CustomToast";

export default CustomToast;