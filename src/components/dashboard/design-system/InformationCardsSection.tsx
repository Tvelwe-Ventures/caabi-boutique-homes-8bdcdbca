import { BentoGrid } from "@/components/ui/bento-grid";
import { StandardCard } from "@/components/ui/standard-card";
import { SidebarNewsCard } from "./SidebarNewsCard";
import { Calendar, CreditCard } from "lucide-react";
import { DesignSystemSection } from "./DesignSystemSection";

const mockNewsItems = [
  {
    title: "New property listed in Dubai Marina",
    date: "Today",
    category: "Property Update",
    priority: "high" as const,
  },
  {
    title: "Market analysis report available",
    date: "Yesterday",
    category: "Market Update",
    priority: "medium" as const,
  },
  {
    title: "Maintenance scheduled",
    date: "2 days ago",
    category: "Maintenance",
    priority: "low" as const,
  },
];

export const InformationCardsSection = () => {
  return (
    <DesignSystemSection 
      title="Information Cards" 
      description="Use these cards to display important updates and notifications to users."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <BentoGrid className="grid-cols-1 md:grid-cols-2 gap-4">
            <StandardCard
              icon={CreditCard}
              title="Financial Overview"
              description="Track your financial metrics and performance"
              className="glass-card"
            />
            <StandardCard
              icon={Calendar}
              title="Upcoming Events"
              description="View your scheduled appointments"
              className="glass-card"
            />
          </BentoGrid>
        </div>
        <div className="md:col-span-1">
          <SidebarNewsCard items={mockNewsItems} />
        </div>
      </div>
    </DesignSystemSection>
  );
};