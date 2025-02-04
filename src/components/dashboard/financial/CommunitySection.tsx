import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CommunityStats } from "../../community/CommunityStats";

export const CommunitySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gray-50 rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Community Engagement</h2>
      <CardSpotlight className="bg-white">
        <CommunityStats />
      </CardSpotlight>
    </motion.div>
  );
};