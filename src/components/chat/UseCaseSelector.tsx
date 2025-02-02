import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const USE_CASES = [
  {
    id: "general",
    label: "General Assistance",
    example: 'E.g., "What services do you offer?"',
  },
  {
    id: "property",
    label: "Property Analysis",
    example: 'E.g., "Analyze this 3-bed property in Abu Dhabi for short-term rental potential"',
  },
  {
    id: "market",
    label: "Market Research",
    example: 'E.g., "What are the current trends in the Ras Al Khaimah real estate market?"',
  },
  {
    id: "roi",
    label: "ROI Calculator Help",
    example: 'E.g., "Help me understand the ROI calculation for a $500k property"',
  },
  {
    id: "investment",
    label: "Investment Strategy",
    example: 'E.g., "What investment strategy would you recommend for $1M budget?"',
  },
  {
    id: "document",
    label: "Document Analysis",
    example: 'E.g., "Can you explain this lease agreement terms?"',
  },
  {
    id: "scheduling",
    label: "Scheduling Assistance",
    example: 'E.g., "Help me plan viewings for 5 properties next week"',
  },
];

interface UseCaseSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const UseCaseSelector: React.FC<UseCaseSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="p-4 border-b">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select use case" />
        </SelectTrigger>
        <SelectContent>
          {USE_CASES.map((useCase) => (
            <SelectItem
              key={useCase.id}
              value={useCase.id}
              className="flex flex-col items-start py-3"
            >
              <span className="font-medium">{useCase.label}</span>
              <span className="text-sm text-muted-foreground mt-1">
                {useCase.example}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};