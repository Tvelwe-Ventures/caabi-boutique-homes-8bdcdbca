import { Gravity, MatterBody } from "./gravity";
import { Loader2 } from "lucide-react";

export const LoadingState = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <Gravity className="h-24 w-24" debug={false}>
        <MatterBody x="50%" y="50%" bodyType="circle">
          <div className="p-3 bg-primary/10 rounded-full animate-spin">
            <Loader2 className="h-6 w-6 text-primary" />
          </div>
        </MatterBody>
      </Gravity>
    </div>
  );
};