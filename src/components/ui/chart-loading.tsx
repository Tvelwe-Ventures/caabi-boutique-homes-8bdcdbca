import { Gravity, MatterBody } from "./gravity";
import { BarChart } from "lucide-react";

export const ChartLoading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative h-[300px]", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background animate-pulse" />
      <Gravity className="h-full" debug={false}>
        {Array.from({ length: 5 }).map((_, i) => (
          <MatterBody
            key={i}
            x={`${(i + 1) * 20}%`}
            y="50%"
            bodyType="rectangle"
            className="opacity-20"
          >
            <div className="h-32 w-8 bg-primary/20 rounded-lg" />
          </MatterBody>
        ))}
        <MatterBody x="50%" y="50%" bodyType="circle">
          <div className="p-4 bg-primary/10 rounded-full">
            <BarChart className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </MatterBody>
      </Gravity>
    </div>
  );
};