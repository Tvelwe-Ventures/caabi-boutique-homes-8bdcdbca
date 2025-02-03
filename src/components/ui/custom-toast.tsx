"use client"

import * as React from "react"
import { Check, AlertCircle, X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CustomToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  variant?: "default" | "success" | "error"
  onClose?: () => void
}

const springConfig = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 1,
}

export function CustomToast({
  title,
  description,
  variant = "default",
  onClose,
  className,
  ...props
}: CustomToastProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full",
        "bg-background/95 backdrop-blur min-h-[40px]",
        "border border-black/[0.08] dark:border-white/[0.08]",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_8px_16px_-4px_rgba(0,0,0,0.1)]",
        "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_16px_-4px_rgba(0,0,0,0.2)]",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={springConfig}
      {...props}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <motion.div
          key={variant}
          className="flex items-center gap-2 text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {variant === "success" && (
            <div className="p-0.5 bg-emerald-500/10 dark:bg-emerald-500/25 rounded-[99px] shadow-sm border border-emerald-500/20 dark:border-emerald-500/25 justify-center items-center gap-1.5 flex overflow-hidden">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
            </div>
          )}
          {variant === "error" && (
            <div className="p-0.5 bg-red-500/10 dark:bg-red-500/25 rounded-[99px] shadow-sm border border-red-500/20 dark:border-red-500/25 justify-center items-center gap-1.5 flex overflow-hidden">
              <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-500" />
            </div>
          )}
          {variant === "default" && (
            <div className="text-foreground/80">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
          <div className="flex flex-col">
            {title && (
              <div className="text-[13px] font-medium leading-tight">
                {title}
              </div>
            )}
            {description && (
              <div className="text-[13px] text-muted-foreground">
                {description}
              </div>
            )}
          </div>
        </motion.div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 p-1 hover:bg-muted/80 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </motion.div>
  )
}