
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flag } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RevenueMetricsCardProps {
  title: string;
  progress: number;
  lastUpdated: string;
  issues?: number;
  value?: number;
  loading?: boolean;
}

export const RevenueMetricsCard = ({ 
  title, 
  progress, 
  lastUpdated, 
  issues = 0,
  value,
  loading = false 
}: RevenueMetricsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              {loading ? "Loading..." : "Updated"}
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          {issues > 0 && (
            <div className="flex items-center gap-2 text-amber-600">
              <Flag className="h-5 w-5" />
              <span className="text-sm">{issues} alerts</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {value !== undefined && (
            <p className="text-3xl font-bold text-primary">
              {loading ? "..." : formatCurrency(value)}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                per month
              </span>
            </p>
          )}
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Performance</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Last updated: {lastUpdated}</span>
            {issues > 0 && (
              <span className="text-amber-600 font-medium">Action needed</span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
