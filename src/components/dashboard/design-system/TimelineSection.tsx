import { DesignSystemSection } from "./DesignSystemSection";
import { Circle } from "lucide-react";

export const TimelineSection = () => {
  const timelineItems = [
    {
      title: "Project Started",
      description: "Initial project setup and planning",
      date: "March 1, 2024"
    },
    {
      title: "Design Phase",
      description: "UI/UX design and prototyping",
      date: "March 15, 2024"
    },
    {
      title: "Development",
      description: "Core features implementation",
      date: "April 1, 2024"
    }
  ];

  return (
    <DesignSystemSection 
      title="Timeline" 
      description="Visual representation of chronological events and milestones."
    >
      <div className="relative">
        {timelineItems.map((item, index) => (
          <div key={index} className="mb-8 flex">
            <div className="flex flex-col items-center mr-4">
              <div>
                <Circle className="h-4 w-4 text-primary" />
              </div>
              {index !== timelineItems.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mt-2" />
              )}
            </div>
            <div>
              <div className="flex flex-col">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <time className="text-sm text-gray-500 mb-1">{item.date}</time>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DesignSystemSection>
  );
};