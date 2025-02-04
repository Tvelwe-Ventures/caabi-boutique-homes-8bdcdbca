import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-x-2.5 rounded-full bg-background px-2.5 py-1.5 text-sm border",
  {
    variants: {
      status: {
        success: "border-primary-light bg-primary-light/10 text-primary-dark",
        error: "border-red-200 bg-red-50 text-red-700",
        default: "border-secondary bg-secondary/10 text-secondary-dark",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
)

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  leftLabel: string
  rightLabel: string
}

export function StatusBadge({
  className,
  status,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftLabel,
  rightLabel,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
        {LeftIcon && (
          <LeftIcon 
            className={cn(
              "-ml-0.5 h-4 w-4 shrink-0",
              status === "success" && "text-primary",
              status === "error" && "text-red-600"
            )} 
            aria-hidden={true}
          />
        )}
        {leftLabel}
      </span>
      <span className="h-4 w-px bg-border" />
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        {RightIcon && (
          <RightIcon 
            className="-ml-0.5 h-4 w-4 shrink-0" 
            aria-hidden={true}
          />
        )}
        {rightLabel}
      </span>
    </span>
  )
}