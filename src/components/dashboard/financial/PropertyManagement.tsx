import { Clock, Plus, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/ui/activity-card";

export const PropertyManagement = () => {
  const activityMetrics = [
    { label: "Move", value: "92", trend: 92, unit: "min" as const },
    { label: "Exercise", value: "85", trend: 85, unit: "min" as const },
    { label: "Stand", value: "12", trend: 78, unit: "hrs" as const }
  ];

  const sampleGoals = [
    { id: "1", title: "Complete monthly financial reports", isCompleted: true },
    { id: "2", title: "Schedule property inspections", isCompleted: false },
    { id: "3", title: "Review tenant applications", isCompleted: false }
  ];

  return (
    <ActivityCard
      title="Property Management"
      category="Daily Tasks & Goals"
      metrics={activityMetrics}
      dailyGoals={sampleGoals}
      onAddGoal={() => console.log('Add property management goal')}
      onToggleGoal={(id) => console.log('Toggle goal', id)}
      onViewDetails={() => console.log('View property management details')}
    />
  );
};