
import { DollarSign, TrendingUp, Users, Wallet } from "lucide-react";
import { DesignSystemSection } from "./DesignSystemSection";
import { KPICard } from "@/components/ui/kpi-card";

export const KPICardsSection = () => {
  return (
    <DesignSystemSection 
      title="KPI Cards" 
      description="Display key performance indicators and metrics with various styles and animations."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Revenue"
            value="$124,500"
            change="+12.3%"
            changeType="positive"
            trendType="up"
            icon={<DollarSign className="h-4 w-4 text-green-700" />}
          />
          <KPICard
            title="Monthly Users"
            value="2,450"
            change="-2.5%"
            changeType="negative"
            trendType="down"
            icon={<Users className="h-4 w-4 text-red-700" />}
          />
          <KPICard
            title="Portfolio Value"
            value="$1.2M"
            change="+5.2%"
            changeType="positive"
            trendType="up"
            icon={<TrendingUp className="h-4 w-4 text-green-700" />}
          />
          <KPICard
            title="Average Revenue"
            value="$8,250"
            change="0%"
            changeType="neutral"
            trendType="neutral"
            icon={<Wallet className="h-4 w-4 text-yellow-700" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Revenue"
            value="$124,500"
            change="+12.3%"
            changeType="positive"
            trendType="up"
            variant="gradient"
            icon={<DollarSign className="h-4 w-4 text-green-700" />}
          />
          <KPICard
            title="Monthly Users"
            value="2,450"
            change="-2.5%"
            changeType="negative"
            trendType="down"
            variant="gradient"
            icon={<Users className="h-4 w-4 text-red-700" />}
          />
          <KPICard
            title="Portfolio Value"
            value="$1.2M"
            change="+5.2%"
            changeType="positive"
            trendType="up"
            variant="gradient"
            icon={<TrendingUp className="h-4 w-4 text-green-700" />}
          />
          <KPICard
            title="Average Revenue"
            value="$8,250"
            change="0%"
            changeType="neutral"
            trendType="neutral"
            variant="gradient"
            icon={<Wallet className="h-4 w-4 text-yellow-700" />}
          />
        </div>
      </div>
    </DesignSystemSection>
  );
};
