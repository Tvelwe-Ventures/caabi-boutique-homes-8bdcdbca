import { motion } from "framer-motion";
import { CardSpotlight } from "../ui/card-spotlight";

export const RightSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-3 space-y-6"
    >
      <CardSpotlight className="bg-card-gradient p-6">
        <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
        <p className="text-gray-600">No upcoming events</p>
      </CardSpotlight>
      
      <CardSpotlight className="bg-card-gradient p-6">
        <h3 className="font-semibold text-lg mb-4">Activity Feed</h3>
        <p className="text-gray-600">No recent activity</p>
      </CardSpotlight>
    </motion.div>
  );
};