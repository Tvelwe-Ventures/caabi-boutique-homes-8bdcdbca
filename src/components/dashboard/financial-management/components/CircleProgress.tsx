
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CircleProgressProps {
  title: string;
  value: string;
  label: string;
  progress: number;
  color: string;
}

export const CircleProgress = ({ title, value, label, progress, color }: CircleProgressProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-700"
            />
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              stroke={color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-sm text-gray-400">{label}</span>
          </div>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      </motion.div>
    </Card>
  );
};
