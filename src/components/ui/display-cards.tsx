"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Star, Home, Heart, DollarSign, Clock, Award } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  subtitle?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-primary-light" />,
  title = "Featured",
  description = "Discover amazing content",
  subtitle = "",
  iconClassName = "text-primary",
  titleClassName = "text-primary",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
        "hover:border-white/20 hover:bg-muted",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-primary/20 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      icon: <Home className="size-4 text-primary-light" />,
      title: "88%",
      description: "Average Occupancy Rate",
      subtitle: "Consistently outperforming market average of 65%",
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Star className="size-4 text-primary-light" />,
      title: "4.94",
      description: "Guest Satisfaction",
      subtitle: "Based on verified guest reviews",
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Heart className="size-4 text-primary-light" />,
      title: "65+",
      description: "5-Star Reviews",
      subtitle: "From satisfied guests worldwide",
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
    {
      icon: <DollarSign className="size-4 text-primary-light" />,
      title: "32%",
      description: "Higher Revenue",
      subtitle: "Compared to traditional long-term rentals",
      className: "[grid-area:stack] translate-x-48 translate-y-30 hover:translate-y-20",
    },
    {
      icon: <Clock className="size-4 text-primary-light" />,
      title: "24/7",
      description: "Support Available",
      subtitle: "Round-the-clock assistance for hosts and guests",
      className: "[grid-area:stack] translate-x-64 translate-y-40 hover:translate-y-30",
    },
    {
      icon: <Award className="size-4 text-primary-light" />,
      title: "Top 10",
      description: "Property Management",
      subtitle: "Ranked among the best in the region",
      className: "[grid-area:stack] translate-x-80 translate-y-50 hover:translate-y-40",
    }
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}

export { DisplayCard };