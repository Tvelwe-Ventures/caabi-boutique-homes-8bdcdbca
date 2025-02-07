
import { KPICard } from "./KPICard";
import { useMarketKPIs } from "@/hooks/useMarketKPIs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const MarketKPIs = () => {
  const { kpiData, isLoading, error } = useMarketKPIs();

  if (isLoading) {
    console.log("Loading market data...");
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    console.error("Error loading market data:", error);
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          There was an error loading the market data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {kpiData.map((metric, index) => (
        <KPICard
          key={index}
          index={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          tooltip={metric.tooltip}
          variant={metric.variant}
        />
      ))}
    </div>
  );
};

export default MarketKPIs;
