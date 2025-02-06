import { KPICard } from "./KPICard";
import { useMarketKPIs } from "@/hooks/useMarketKPIs";

const MarketKPIs = () => {
  const { kpiData, isLoading, marketData } = useMarketKPIs();

  if (isLoading) {
    console.log("Loading market data...");
    return <div>Loading...</div>;
  }

  console.log("Rendered KPIs with PriceLabs data:", marketData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((metric, index) => (
        <KPICard
          key={index}
          index={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          tooltip={metric.tooltip}
        />
      ))}
    </div>
  );
};

export default MarketKPIs;