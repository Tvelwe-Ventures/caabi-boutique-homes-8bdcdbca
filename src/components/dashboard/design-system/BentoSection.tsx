import { BentoGrid } from "@/components/ui/bento-grid";
import { StandardCard } from "@/components/ui/standard-card";
import { ProjectStatusCard } from "@/components/ui/project-status-card";
import { Calendar, CreditCard } from "lucide-react";
import { DesignSystemSection } from "./DesignSystemSection";

const mockContributors = [
  { name: "John Doe", image: "/placeholder.svg" },
  { name: "Jane Smith", image: "/placeholder.svg" },
  { name: "Mike Johnson", image: "/placeholder.svg" },
];

const mockTasks = [
  { title: "Design Review", completed: true },
  { title: "Frontend Implementation", completed: true },
  { title: "Testing Phase", completed: false },
];

export const BentoSection = () => {
  return (
    <DesignSystemSection 
      title="Bento Grid Layout" 
      description="Flexible grid layout for displaying content in an engaging way."
    >
      <BentoGrid>
        <StandardCard
          icon={CreditCard}
          title="Financial Overview"
          description="Track your financial metrics and performance"
        />
        <StandardCard
          icon={Calendar}
          title="Calendar"
          description="Schedule and manage appointments"
        />
        <ProjectStatusCard
          title="Project Status"
          progress={75}
          dueDate="2024-03-01"
          contributors={mockContributors}
          tasks={mockTasks}
          githubStars={128}
          openIssues={5}
        />
      </BentoGrid>
    </DesignSystemSection>
  );
};