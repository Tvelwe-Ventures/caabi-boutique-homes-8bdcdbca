import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"

const badgeDeltaVariants = cva(
  "inline-flex items-center text-sm font-semibold",
  {
    variants: {
      variant: {
        outline: "gap-x-1 rounded-full px-2 py-1 ring-1 ring-inset ring-border",
        solid: "gap-x-1 rounded-full px-2 py-1",
        solidOutline: "gap-x-1 rounded-full px-2 py-1 ring-1 ring-inset",
        complex: "space-x-2.5 rounded-lg bg-background py-1 pl-2.5 pr-1 ring-1 ring-inset ring-border",
      },
      deltaType: {
        increase: "",
        decrease: "",
        neutral: "",
      },
      iconStyle: {
        filled: "",
        line: "",
      },
    },
    compoundVariants: [
      {
        deltaType: "increase",
        variant: "outline",
        className: "text-primary dark:text-primary-light",
      },
      {
        deltaType: "decrease",
        variant: "outline",
        className: "text-red-700 dark:text-red-500",
      },
      {
        deltaType: "neutral",
        variant: "outline",
        className: "text-secondary-dark dark:text-secondary",
      },
      // Solid variants
      {
        deltaType: "increase",
        variant: "solid",
        className: "bg-primary-light/20 text-primary-dark",
      },
      {
        deltaType: "decrease",
        variant: "solid",
        className: "bg-red-100 text-red-800",
      },
      {
        deltaType: "neutral",
        variant: "solid",
        className: "bg-secondary/20 text-secondary-dark",
      },
      // Solid outline variants
      {
        deltaType: "increase",
        variant: "solidOutline",
        className: "bg-primary-light/10 text-primary-dark ring-primary/10",
      },
      {
        deltaType: "decrease",
        variant: "solidOutline",
        className: "bg-red-100 text-red-800 ring-red-600/10",
      },
      {
        deltaType: "neutral",
        variant: "solidOutline",
        className: "bg-secondary/10 text-secondary-dark ring-secondary/10",
      },
    ],
  }
)

interface BadgeDeltaProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeDeltaVariants> {
  value: string | number
}

const DeltaIcon = ({
  deltaType,
  iconStyle,
}: {
  deltaType: "increase" | "decrease" | "neutral"
  iconStyle: "filled" | "line"
}) => {
  const icons = {
    increase: ArrowUp,
    decrease: ArrowDown,
    neutral: ArrowRight,
  }

  const Icon = icons[deltaType]
  return <Icon className="-ml-0.5 h-4 w-4" aria-hidden={true} />
}

export function BadgeDelta({
  className,
  variant = "outline",
  deltaType = "neutral",
  iconStyle = "filled",
  value,
  ...props
}: BadgeDeltaProps) {
  if (variant === "complex") {
    return (
      <span
        className={cn(badgeDeltaVariants({ variant, className }))}
        {...props}
      >
        <span
          className={cn(
            "text-sm font-semibold",
            deltaType === "increase" && "text-primary dark:text-primary-light",
            deltaType === "decrease" && "text-red-700 dark:text-red-500",
            deltaType === "neutral" && "text-secondary-dark dark:text-secondary"
          )}
        >
          {value}
        </span>
        <span
          className={cn(
            "rounded-sm px-2 py-1 text-sm font-medium",
            deltaType === "increase" && "bg-primary-light/10",
            deltaType === "decrease" && "bg-red-100",
            deltaType === "neutral" && "bg-secondary/10"
          )}
        >
          <DeltaIcon deltaType={deltaType} iconStyle="line" />
        </span>
      </span>
    )
  }

  return (
    <span
      className={cn(badgeDeltaVariants({ variant, deltaType, className }))}
      {...props}
    >
      <DeltaIcon deltaType={deltaType} iconStyle={iconStyle} />
      {value}
    </span>
  )
}