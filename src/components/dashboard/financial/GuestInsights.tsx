import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { GuestStats } from "../guests/GuestStats";
import { GuestTypeDistribution } from "../guests/GuestTypeDistribution";

export const GuestInsights = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-50 rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Guest Insights</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardSpotlight className="bg-white">
          <GuestStats
            totalGuests={1250}
            averageRating={4.8}
            repeatGuests={280}
          />
        </CardSpotlight>
        <CardSpotlight className="bg-white">
          <GuestTypeDistribution data={[
            { name: 'Business', value: 30 },
            { name: 'Leisure', value: 45 },
            { name: 'Long-term', value: 15 },
            { name: 'Group', value: 10 }
          ]} />
        </CardSpotlight>
      </div>
    </motion.div>
  );
};