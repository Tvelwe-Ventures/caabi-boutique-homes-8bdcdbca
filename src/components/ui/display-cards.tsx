"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Star, Home, Heart, DollarSign, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative flex h-[200px] w-full select-none flex-col justify-between rounded-xl border-2 shadow-lg px-6 py-4 transition-all duration-300",
        "bg-gradient-to-br from-white via-primary-light/5 to-primary/10",
        "hover:border-primary/20 hover:shadow-primary/20",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-block rounded-full bg-primary/10 p-2">
          {icon}
        </span>
        <p className={cn("text-xl font-semibold text-primary-dark", titleClassName)}>{title}</p>
      </div>
      <p className="text-lg font-medium text-gray-700">{description}</p>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </motion.div>
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
    },
    {
      icon: <Star className="size-4 text-primary-light" />,
      title: "4.94",
      description: "Guest Satisfaction",
      subtitle: "Based on verified guest reviews",
    },
    {
      icon: <Heart className="size-4 text-primary-light" />,
      title: "65+",
      description: "5-Star Reviews",
      subtitle: "From satisfied guests worldwide",
    },
    {
      icon: <DollarSign className="size-4 text-primary-light" />,
      title: "32%",
      description: "Higher Revenue",
      subtitle: "Compared to traditional long-term rentals",
    },
    {
      icon: <Clock className="size-4 text-primary-light" />,
      title: "24/7",
      description: "Support Available",
      subtitle: "Round-the-clock assistance for hosts and guests",
    },
    {
      icon: <Award className="size-4 text-primary-light" />,
      title: "Top 10",
      description: "Property Management",
      subtitle: "Ranked among the best in the region",
    }
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="relative py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/5 opacity-50" />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {displayCards.map((cardProps, index) => (
          <DisplayCard key={index} {...cardProps} />
        ))}
      </motion.div>
    </div>
  );
}

export { DisplayCard };