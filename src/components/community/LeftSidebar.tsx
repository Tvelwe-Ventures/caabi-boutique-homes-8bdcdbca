import { Users, BookOpen, MessageSquare, Calendar, TrendingUp } from "lucide-react";
import { CardSpotlight } from "../ui/card-spotlight";
import { CommunityStats } from "./CommunityStats";
import { TrendingTopics } from "./TrendingTopics";
import { motion } from "framer-motion";

export const LeftSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-3 space-y-6"
    >
      <CardSpotlight className="bg-card-gradient space-y-4">
        <div className="flex items-center gap-2 text-primary-dark">
          <Users className="h-5 w-5" />
          <h2 className="font-semibold">Community Stats</h2>
        </div>
        <CommunityStats />
      </CardSpotlight>

      <CardSpotlight className="bg-card-gradient space-y-4">
        <div className="flex items-center gap-2 text-primary-dark">
          <TrendingUp className="h-5 w-5" />
          <h2 className="font-semibold">Trending Topics</h2>
        </div>
        <TrendingTopics />
      </CardSpotlight>

      <nav className="space-y-2">
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition-colors">
          <BookOpen className="h-5 w-5" />
          <span>Resources</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition-colors">
          <MessageSquare className="h-5 w-5" />
          <span>Discussions</span>
        </a>
        <a href="#" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-white/80 rounded-lg transition-colors">
          <Calendar className="h-5 w-5" />
          <span>Events</span>
        </a>
      </nav>
    </motion.div>
  );
};