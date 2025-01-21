import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeroAction {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "ghost";
}

interface HeroProps {
  title: ReactNode | string;
  subtitle?: string;
  actions?: HeroAction[];
  className?: string;
}

export const Hero = ({
  title,
  subtitle,
  actions,
  className,
}: HeroProps) => {
  return (
    <div className={cn("py-20 text-center", className)}>
      <div className="container px-4 md:px-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {title}
            </div>
            {subtitle && (
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {actions && actions.length > 0 && (
            <div className="mx-auto max-w-[600px] space-x-4">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  onClick={() => window.location.href = action.href}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};